import { connectMongoDB } from "./mongodb";
import {
  UserModel,
  CategoryModel,
  ProductModel,
  SettingsModel,
  BannerModel,
  DeliveryZoneModel,
  NeighborhoodModel,
} from "./models";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

const SALT_ROUNDS = 10;

async function seedDatabase() {
  try {
    await connectMongoDB();
    console.log("Connected to MongoDB for seeding...");

    // Create internal users
    const internalUsers = [
      { name: "admin", whatsapp: "11999990001", role: "admin", password: "939393" },
      { name: "cozinha", whatsapp: "11999990002", role: "kitchen", password: "939393" },
      { name: "balcao", whatsapp: "11999990003", role: "pdv", password: "939393" },
    ];

    for (const userData of internalUsers) {
      const existing = await UserModel.findOne({ whatsapp: userData.whatsapp });
      if (!existing) {
        const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
        await UserModel.create({
          _id: randomUUID(),
          name: userData.name,
          whatsapp: userData.whatsapp,
          role: userData.role,
          password: hashedPassword,
          isBlocked: false,
        });
        console.log(`Created user: ${userData.name}`);
      } else {
        console.log(`User ${userData.name} already exists`);
      }
    }

    // Create categories
    const categories = [
      { name: "Bebidas", iconUrl: null, sortOrder: 1 },
      { name: "Destilados", iconUrl: null, sortOrder: 2 },
      { name: "Cervejas", iconUrl: null, sortOrder: 3 },
      { name: "Vinhos", iconUrl: null, sortOrder: 4 },
      { name: "Petiscos", iconUrl: null, sortOrder: 5 },
      { name: "Gelo", iconUrl: null, sortOrder: 6 },
    ];

    const categoryIds: Record<string, string> = {};

    for (const catData of categories) {
      const existing = await CategoryModel.findOne({ name: catData.name });
      if (!existing) {
        const id = randomUUID();
        await CategoryModel.create({
          _id: id,
          ...catData,
          isActive: true,
        });
        categoryIds[catData.name] = id;
        console.log(`Created category: ${catData.name}`);
      } else {
        categoryIds[catData.name] = existing._id;
        console.log(`Category ${catData.name} already exists`);
      }
    }

    // Create products
    const products = [
      { categoryName: "Bebidas", name: "Coca-Cola 2L", costPrice: "6.00", profitMargin: "30", salePrice: "8.00", stock: 50 },
      { categoryName: "Bebidas", name: "Coca-Cola Lata 350ml", costPrice: "3.50", profitMargin: "30", salePrice: "4.50", stock: 100 },
      { categoryName: "Bebidas", name: "Guarana Antarctica 2L", costPrice: "5.50", profitMargin: "30", salePrice: "7.00", stock: 40 },
      { categoryName: "Bebidas", name: "Agua Mineral 500ml", costPrice: "1.50", profitMargin: "50", salePrice: "3.00", stock: 200 },
      { categoryName: "Bebidas", name: "Suco Del Valle 1L", costPrice: "5.00", profitMargin: "40", salePrice: "7.00", stock: 30 },
      { categoryName: "Bebidas", name: "Red Bull 250ml", costPrice: "8.00", profitMargin: "25", salePrice: "12.00", stock: 60 },
      { categoryName: "Bebidas", name: "Monster Energy 473ml", costPrice: "7.00", profitMargin: "30", salePrice: "10.00", stock: 45 },
      
      { categoryName: "Destilados", name: "Vodka Absolut 1L", costPrice: "60.00", profitMargin: "25", salePrice: "85.00", stock: 20 },
      { categoryName: "Destilados", name: "Whisky Jack Daniels 1L", costPrice: "120.00", profitMargin: "20", salePrice: "160.00", stock: 15 },
      { categoryName: "Destilados", name: "Gin Tanqueray 750ml", costPrice: "90.00", profitMargin: "25", salePrice: "125.00", stock: 18 },
      { categoryName: "Destilados", name: "Tequila Jose Cuervo 750ml", costPrice: "70.00", profitMargin: "30", salePrice: "100.00", stock: 12 },
      { categoryName: "Destilados", name: "Rum Bacardi 1L", costPrice: "45.00", profitMargin: "30", salePrice: "65.00", stock: 25 },
      { categoryName: "Destilados", name: "Cachaca 51 1L", costPrice: "15.00", profitMargin: "40", salePrice: "25.00", stock: 40 },
      
      { categoryName: "Cervejas", name: "Heineken Long Neck 330ml", costPrice: "4.50", profitMargin: "30", salePrice: "7.00", stock: 150 },
      { categoryName: "Cervejas", name: "Budweiser Lata 350ml", costPrice: "3.50", profitMargin: "35", salePrice: "5.50", stock: 200 },
      { categoryName: "Cervejas", name: "Brahma Lata 350ml", costPrice: "3.00", profitMargin: "35", salePrice: "4.50", stock: 180 },
      { categoryName: "Cervejas", name: "Stella Artois 275ml", costPrice: "4.00", profitMargin: "30", salePrice: "6.00", stock: 120 },
      { categoryName: "Cervejas", name: "Corona Extra 330ml", costPrice: "5.00", profitMargin: "30", salePrice: "8.00", stock: 100 },
      { categoryName: "Cervejas", name: "Skol Lata 350ml", costPrice: "2.80", profitMargin: "40", salePrice: "4.00", stock: 250 },
      
      { categoryName: "Vinhos", name: "Vinho Tinto Casillero del Diablo", costPrice: "45.00", profitMargin: "25", salePrice: "65.00", stock: 25 },
      { categoryName: "Vinhos", name: "Vinho Branco Santa Helena", costPrice: "35.00", profitMargin: "30", salePrice: "50.00", stock: 20 },
      { categoryName: "Vinhos", name: "Espumante Chandon 750ml", costPrice: "85.00", profitMargin: "20", salePrice: "110.00", stock: 15 },
      
      { categoryName: "Petiscos", name: "Amendoim Japones 100g", costPrice: "4.00", profitMargin: "50", salePrice: "6.00", stock: 80 },
      { categoryName: "Petiscos", name: "Batata Chips Lays 96g", costPrice: "5.00", profitMargin: "40", salePrice: "8.00", stock: 60 },
      { categoryName: "Petiscos", name: "Salaminho 100g", costPrice: "8.00", profitMargin: "35", salePrice: "12.00", stock: 40 },
      { categoryName: "Petiscos", name: "Queijo Provolone 100g", costPrice: "10.00", profitMargin: "30", salePrice: "15.00", stock: 35 },
      
      { categoryName: "Gelo", name: "Gelo Saco 2kg", costPrice: "3.00", profitMargin: "50", salePrice: "5.00", stock: 100, productType: "gelo" },
      { categoryName: "Gelo", name: "Gelo Saco 5kg", costPrice: "6.00", profitMargin: "40", salePrice: "10.00", stock: 50, productType: "gelo" },
    ];

    for (const prodData of products) {
      const categoryId = categoryIds[prodData.categoryName];
      if (!categoryId) {
        console.log(`Category not found for product: ${prodData.name}`);
        continue;
      }

      const existing = await ProductModel.findOne({ name: prodData.name });
      if (!existing) {
        await ProductModel.create({
          _id: randomUUID(),
          categoryId,
          name: prodData.name,
          description: null,
          imageUrl: null,
          costPrice: prodData.costPrice,
          profitMargin: prodData.profitMargin,
          salePrice: prodData.salePrice,
          stock: prodData.stock,
          isActive: true,
          isPrepared: false,
          comboEligible: prodData.categoryName === "Destilados" || prodData.categoryName === "Gelo",
          productType: prodData.productType || null,
          sortOrder: 0,
        });
        console.log(`Created product: ${prodData.name}`);
      } else {
        console.log(`Product ${prodData.name} already exists`);
      }
    }

    // Create settings
    const existingSettings = await SettingsModel.findOne();
    if (!existingSettings) {
      await SettingsModel.create({
        _id: randomUUID(),
        storeAddress: "Rua Exemplo, 123 - Centro, Sao Jose dos Campos - SP",
        storeLat: "-23.1791",
        storeLng: "-45.8872",
        deliveryRatePerKm: "2.50",
        minDeliveryFee: "5.00",
        maxDeliveryDistance: "15",
        pixKey: "adega@exemplo.com.br",
        openingHours: {
          monday: { open: "10:00", close: "22:00" },
          tuesday: { open: "10:00", close: "22:00" },
          wednesday: { open: "10:00", close: "22:00" },
          thursday: { open: "10:00", close: "22:00" },
          friday: { open: "10:00", close: "23:00" },
          saturday: { open: "10:00", close: "23:00" },
          sunday: { open: "12:00", close: "20:00" },
        },
        isOpen: true,
      });
      console.log("Created settings");
    } else {
      console.log("Settings already exist");
    }

    // Create delivery zones
    const zones = [
      { code: "Z1", name: "Centro", description: "Regiao central", fee: "5.00", sortOrder: 1 },
      { code: "Z2", name: "Zona Sul", description: "Bairros zona sul", fee: "7.00", sortOrder: 2 },
      { code: "Z3", name: "Zona Norte", description: "Bairros zona norte", fee: "8.00", sortOrder: 3 },
      { code: "Z4", name: "Zona Leste", description: "Bairros zona leste", fee: "10.00", sortOrder: 4 },
    ];

    const zoneIds: Record<string, string> = {};

    for (const zoneData of zones) {
      const existing = await DeliveryZoneModel.findOne({ code: zoneData.code });
      if (!existing) {
        const id = randomUUID();
        await DeliveryZoneModel.create({
          _id: id,
          ...zoneData,
          isActive: true,
        });
        zoneIds[zoneData.code] = id;
        console.log(`Created delivery zone: ${zoneData.name}`);
      } else {
        zoneIds[zoneData.code] = existing._id;
        console.log(`Delivery zone ${zoneData.name} already exists`);
      }
    }

    // Create neighborhoods
    const neighborhoods = [
      { name: "Centro", zoneCode: "Z1" },
      { name: "Jardim Paulista", zoneCode: "Z1" },
      { name: "Vila Ema", zoneCode: "Z2" },
      { name: "Jardim Satelite", zoneCode: "Z2" },
      { name: "Alto da Ponte", zoneCode: "Z3" },
      { name: "Bosque dos Eucaliptos", zoneCode: "Z3" },
      { name: "Jardim Oriente", zoneCode: "Z4" },
      { name: "Campo dos Alemaes", zoneCode: "Z4" },
    ];

    for (const neighData of neighborhoods) {
      const zoneId = zoneIds[neighData.zoneCode];
      if (!zoneId) continue;

      const existing = await NeighborhoodModel.findOne({ name: neighData.name });
      if (!existing) {
        await NeighborhoodModel.create({
          _id: randomUUID(),
          name: neighData.name,
          zoneId,
          isActive: true,
        });
        console.log(`Created neighborhood: ${neighData.name}`);
      } else {
        console.log(`Neighborhood ${neighData.name} already exists`);
      }
    }

    console.log("\nDatabase seeded successfully!");
    console.log("\nInternal users created:");
    console.log("- admin (senha: 939393)");
    console.log("- cozinha (senha: 939393)");
    console.log("- balcao (senha: 939393)");
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
