import { randomUUID } from "crypto";
import * as fs from "fs";
import * as path from "path";

// Lazy initialization for object storage client
let objectStorageClient: any = null;
let useLocalFallback = false;

const BUCKET_PREFIX = "vibedrinks";
const LOCAL_STORAGE_PATH = "./uploads";

// Ensure local storage directory exists
if (!fs.existsSync(LOCAL_STORAGE_PATH)) {
  fs.mkdirSync(LOCAL_STORAGE_PATH, { recursive: true });
}

async function getClient() {
  if (objectStorageClient) return objectStorageClient;
  if (useLocalFallback) return null;
  
  try {
    const { Client } = await import("@replit/object-storage");
    objectStorageClient = new Client();
    console.log("Object Storage client initialized successfully");
    return objectStorageClient;
  } catch (error) {
    console.log("Object Storage not available, using local filesystem fallback");
    useLocalFallback = true;
    return null;
  }
}

export async function uploadFile(
  file: Buffer,
  fileName: string,
  contentType: string,
  folder: string = 'uploads'
): Promise<{ path: string; publicUrl: string }> {
  const uniqueFileName = `${folder}/${randomUUID()}-${fileName}`;
  
  const client = await getClient();
  
  if (client) {
    const fullPath = `${BUCKET_PREFIX}/${uniqueFileName}`;
    await client.uploadFromBytes(fullPath, file);
  } else {
    // Local fallback
    const localDir = path.join(LOCAL_STORAGE_PATH, folder);
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    const localPath = path.join(LOCAL_STORAGE_PATH, uniqueFileName);
    fs.writeFileSync(localPath, file);
  }
  
  const publicUrl = getStorageUrl(uniqueFileName);
  
  return {
    path: uniqueFileName,
    publicUrl
  };
}

export async function deleteFile(filePath: string): Promise<void> {
  if (!filePath || filePath.startsWith('http')) {
    return;
  }
  
  try {
    const client = await getClient();
    
    if (client) {
      const fullPath = `${BUCKET_PREFIX}/${filePath}`;
      await client.delete(fullPath);
    } else {
      // Local fallback
      const localPath = path.join(LOCAL_STORAGE_PATH, filePath);
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
      }
    }
  } catch (error) {
    console.error(`Failed to delete file: ${error}`);
  }
}

export function getStorageUrl(filePath: string): string {
  if (!filePath) return '';
  if (filePath.startsWith('http')) return filePath;
  return `/api/storage/files/${encodeURIComponent(filePath)}`;
}

export async function getFile(filePath: string): Promise<Buffer | null> {
  try {
    const client = await getClient();
    
    if (client) {
      const fullPath = `${BUCKET_PREFIX}/${filePath}`;
      const result = await client.downloadAsBytes(fullPath);
      if (result.ok) {
        return Buffer.from(result.value);
      }
      return null;
    } else {
      // Local fallback
      const localPath = path.join(LOCAL_STORAGE_PATH, filePath);
      if (fs.existsSync(localPath)) {
        return fs.readFileSync(localPath);
      }
      return null;
    }
  } catch (error) {
    console.error(`Failed to get file: ${error}`);
    return null;
  }
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    const client = await getClient();
    
    if (client) {
      const fullPath = `${BUCKET_PREFIX}/${filePath}`;
      const result = await client.downloadAsBytes(fullPath);
      return result.ok;
    } else {
      // Local fallback
      const localPath = path.join(LOCAL_STORAGE_PATH, filePath);
      return fs.existsSync(localPath);
    }
  } catch {
    return false;
  }
}
