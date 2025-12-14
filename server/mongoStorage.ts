import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import {
  UserModel,
  AddressModel,
  CategoryModel,
  ProductModel,
  OrderModel,
  OrderItemModel,
  BannerModel,
  MotoboyModel,
  StockLogModel,
  SettingsModel,
  DeliveryZoneModel,
  NeighborhoodModel,
  TrendingProductModel,
} from "./models";
import type {
  User, InsertUser,
  Address, InsertAddress,
  Category, InsertCategory,
  Product, InsertProduct,
  Order, InsertOrder,
  OrderItem, InsertOrderItem,
  Banner, InsertBanner,
  Motoboy, InsertMotoboy,
  StockLog, InsertStockLog,
  Settings, InsertSettings,
  DeliveryZone, InsertDeliveryZone,
  Neighborhood, InsertNeighborhood,
  TrendingProduct, InsertTrendingProduct
} from "@shared/schema";

function docToUser(doc: any): User {
  return {
    id: doc._id,
    name: doc.name,
    whatsapp: doc.whatsapp,
    role: doc.role,
    password: doc.password,
    isBlocked: doc.isBlocked,
    createdAt: doc.createdAt,
  };
}

function docToAddress(doc: any): Address {
  return {
    id: doc._id,
    userId: doc.userId,
    street: doc.street,
    number: doc.number,
    complement: doc.complement,
    neighborhood: doc.neighborhood,
    city: doc.city,
    state: doc.state,
    zipCode: doc.zipCode,
    notes: doc.notes,
    isDefault: doc.isDefault,
  };
}

function docToCategory(doc: any): Category {
  return {
    id: doc._id,
    name: doc.name,
    iconUrl: doc.iconUrl,
    sortOrder: doc.sortOrder,
    isActive: doc.isActive,
    createdAt: doc.createdAt,
  };
}

function docToProduct(doc: any): Product {
  return {
    id: doc._id,
    categoryId: doc.categoryId,
    name: doc.name,
    description: doc.description,
    imageUrl: doc.imageUrl,
    costPrice: doc.costPrice,
    profitMargin: doc.profitMargin,
    salePrice: doc.salePrice,
    stock: doc.stock,
    isActive: doc.isActive,
    isPrepared: doc.isPrepared,
    comboEligible: doc.comboEligible,
    productType: doc.productType,
    sortOrder: doc.sortOrder,
    createdAt: doc.createdAt,
  };
}

function docToOrder(doc: any): Order {
  return {
    id: doc._id,
    userId: doc.userId,
    addressId: doc.addressId,
    orderType: doc.orderType,
    status: doc.status,
    subtotal: doc.subtotal,
    deliveryFee: doc.deliveryFee,
    originalDeliveryFee: doc.originalDeliveryFee,
    deliveryFeeAdjusted: doc.deliveryFeeAdjusted,
    deliveryFeeAdjustedAt: doc.deliveryFeeAdjustedAt,
    deliveryDistance: doc.deliveryDistance,
    discount: doc.discount,
    total: doc.total,
    paymentMethod: doc.paymentMethod,
    changeFor: doc.changeFor,
    notes: doc.notes,
    customerName: doc.customerName,
    motoboyId: doc.motoboyId,
    createdAt: doc.createdAt,
    acceptedAt: doc.acceptedAt,
    preparingAt: doc.preparingAt,
    readyAt: doc.readyAt,
    dispatchedAt: doc.dispatchedAt,
    arrivedAt: doc.arrivedAt,
    deliveredAt: doc.deliveredAt,
  };
}

function docToOrderItem(doc: any): OrderItem {
  return {
    id: doc._id,
    orderId: doc.orderId,
    productId: doc.productId,
    productName: doc.productName,
    quantity: doc.quantity,
    unitPrice: doc.unitPrice,
    totalPrice: doc.totalPrice,
  };
}

function docToBanner(doc: any): Banner {
  return {
    id: doc._id,
    title: doc.title,
    description: doc.description,
    imageUrl: doc.imageUrl,
    linkUrl: doc.linkUrl,
    sortOrder: doc.sortOrder,
    isActive: doc.isActive,
    createdAt: doc.createdAt,
  };
}

function docToMotoboy(doc: any): Motoboy {
  return {
    id: doc._id,
    name: doc.name,
    whatsapp: doc.whatsapp,
    photoUrl: doc.photoUrl,
    isActive: doc.isActive,
    createdAt: doc.createdAt,
  };
}

function docToStockLog(doc: any): StockLog {
  return {
    id: doc._id,
    productId: doc.productId,
    previousStock: doc.previousStock,
    newStock: doc.newStock,
    change: doc.change,
    reason: doc.reason,
    createdAt: doc.createdAt,
  };
}

function docToSettings(doc: any): Settings {
  return {
    id: doc._id,
    storeAddress: doc.storeAddress,
    storeLat: doc.storeLat,
    storeLng: doc.storeLng,
    deliveryRatePerKm: doc.deliveryRatePerKm,
    minDeliveryFee: doc.minDeliveryFee,
    maxDeliveryDistance: doc.maxDeliveryDistance,
    pixKey: doc.pixKey,
    openingHours: doc.openingHours,
    isOpen: doc.isOpen,
  };
}

function docToDeliveryZone(doc: any): DeliveryZone {
  return {
    id: doc._id,
    code: doc.code,
    name: doc.name,
    description: doc.description,
    fee: doc.fee,
    sortOrder: doc.sortOrder,
    isActive: doc.isActive,
  };
}

function docToNeighborhood(doc: any): Neighborhood {
  return {
    id: doc._id,
    name: doc.name,
    zoneId: doc.zoneId,
    isActive: doc.isActive,
  };
}

function docToTrendingProduct(doc: any): TrendingProduct {
  return {
    id: doc._id,
    productId: doc.productId,
    sortOrder: doc.sortOrder,
    createdAt: doc.createdAt,
  };
}

export interface IStorage {
  getUsers(): Promise<User[]>;
  getUser(id: string): Promise<User | undefined>;
  getUserByWhatsapp(whatsapp: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;

  getAddresses(userId: string): Promise<Address[]>;
  getAddress(id: string): Promise<Address | undefined>;
  createAddress(address: InsertAddress): Promise<Address>;
  updateAddress(id: string, address: Partial<InsertAddress>): Promise<Address | undefined>;
  deleteAddress(id: string): Promise<boolean>;

  getCategories(): Promise<Category[]>;
  getCategoriesBySales(): Promise<(Category & { salesCount: number })[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: string): Promise<boolean>;

  getProducts(): Promise<Product[]>;
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  getTrendingProducts(limit?: number): Promise<{ product: Product; salesCount: number }[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;

  getOrders(): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrdersByUser(userId: string): Promise<Order[]>;
  getOrdersByStatus(status: string): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, order: Partial<Order>): Promise<Order | undefined>;
  deleteOrder(id: string): Promise<boolean>;

  getOrderItems(orderId: string): Promise<OrderItem[]>;
  getAllOrderItems(): Promise<OrderItem[]>;
  getOrderItemsByOrderIds(orderIds: string[]): Promise<OrderItem[]>;
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;

  getBanners(): Promise<Banner[]>;
  getBanner(id: string): Promise<Banner | undefined>;
  createBanner(banner: InsertBanner): Promise<Banner>;
  updateBanner(id: string, banner: Partial<InsertBanner>): Promise<Banner | undefined>;
  deleteBanner(id: string): Promise<boolean>;

  getMotoboys(): Promise<Motoboy[]>;
  getMotoboy(id: string): Promise<Motoboy | undefined>;
  getMotoboyByWhatsapp(whatsapp: string): Promise<Motoboy | undefined>;
  getOrdersByMotoboy(motoboyId: string, startDate?: Date, endDate?: Date): Promise<Order[]>;
  createMotoboy(motoboy: InsertMotoboy): Promise<Motoboy>;
  updateMotoboy(id: string, motoboy: Partial<InsertMotoboy>): Promise<Motoboy | undefined>;
  deleteMotoboy(id: string): Promise<boolean>;

  getSettings(): Promise<Settings | undefined>;
  updateSettings(settings: Partial<InsertSettings>): Promise<Settings>;

  createStockLog(log: InsertStockLog): Promise<StockLog>;

  getDeliveryZones(): Promise<DeliveryZone[]>;
  getDeliveryZone(id: string): Promise<DeliveryZone | undefined>;
  createDeliveryZone(zone: InsertDeliveryZone): Promise<DeliveryZone>;
  updateDeliveryZone(id: string, zone: Partial<InsertDeliveryZone>): Promise<DeliveryZone | undefined>;
  deleteDeliveryZone(id: string): Promise<boolean>;

  getNeighborhoods(): Promise<Neighborhood[]>;
  getNeighborhoodsByZone(zoneId: string): Promise<Neighborhood[]>;
  getNeighborhood(id: string): Promise<Neighborhood | undefined>;
  createNeighborhood(neighborhood: InsertNeighborhood): Promise<Neighborhood>;
  updateNeighborhood(id: string, neighborhood: Partial<InsertNeighborhood>): Promise<Neighborhood | undefined>;
  deleteNeighborhood(id: string): Promise<boolean>;

  getCuratedTrendingProducts(): Promise<(TrendingProduct & { product: Product })[]>;
  addTrendingProduct(productId: string): Promise<TrendingProduct>;
  removeTrendingProduct(id: string): Promise<boolean>;
  updateTrendingProductOrder(id: string, sortOrder: number): Promise<TrendingProduct | undefined>;
  reorderTrendingProducts(orderedIds: string[]): Promise<void>;
}

export class MongoStorage implements IStorage {
  async getUsers(): Promise<User[]> {
    const docs = await UserModel.find();
    return docs.map(docToUser);
  }

  async getUser(id: string): Promise<User | undefined> {
    const doc = await UserModel.findById(id);
    return doc ? docToUser(doc) : undefined;
  }

  async getUserByWhatsapp(whatsapp: string): Promise<User | undefined> {
    const doc = await UserModel.findOne({ whatsapp });
    return doc ? docToUser(doc) : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const doc = await UserModel.create({
      _id: id,
      name: insertUser.name,
      whatsapp: insertUser.whatsapp,
      role: insertUser.role ?? "customer",
      password: insertUser.password ?? null,
      isBlocked: insertUser.isBlocked ?? false,
    });
    return docToUser(doc);
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const doc = await UserModel.findByIdAndUpdate(id, updates, { new: true });
    return doc ? docToUser(doc) : undefined;
  }

  async deleteUser(id: string): Promise<boolean> {
    const userOrders = await OrderModel.find({ userId: id });
    for (const order of userOrders) {
      await OrderItemModel.deleteMany({ orderId: order._id });
    }
    await OrderModel.deleteMany({ userId: id });
    await AddressModel.deleteMany({ userId: id });
    await UserModel.findByIdAndDelete(id);
    return true;
  }

  async getAddresses(userId: string): Promise<Address[]> {
    const docs = await AddressModel.find({ userId });
    return docs.map(docToAddress);
  }

  async getAddress(id: string): Promise<Address | undefined> {
    const doc = await AddressModel.findById(id);
    return doc ? docToAddress(doc) : undefined;
  }

  async createAddress(insertAddress: InsertAddress): Promise<Address> {
    const id = randomUUID();
    const doc = await AddressModel.create({
      _id: id,
      userId: insertAddress.userId,
      street: insertAddress.street,
      number: insertAddress.number,
      complement: insertAddress.complement ?? null,
      neighborhood: insertAddress.neighborhood,
      city: insertAddress.city,
      state: insertAddress.state,
      zipCode: insertAddress.zipCode,
      notes: insertAddress.notes ?? null,
      isDefault: insertAddress.isDefault ?? true,
    });
    return docToAddress(doc);
  }

  async updateAddress(id: string, updates: Partial<InsertAddress>): Promise<Address | undefined> {
    const doc = await AddressModel.findByIdAndUpdate(id, updates, { new: true });
    return doc ? docToAddress(doc) : undefined;
  }

  async deleteAddress(id: string): Promise<boolean> {
    await AddressModel.findByIdAndDelete(id);
    return true;
  }

  async getCategories(): Promise<Category[]> {
    const docs = await CategoryModel.find({ isActive: true }).sort({ sortOrder: 1 });
    return docs.map(docToCategory);
  }

  async getCategoriesBySales(): Promise<(Category & { salesCount: number })[]> {
    const allCategories = await CategoryModel.find({ isActive: true });
    const deliveredOrders = await OrderModel.find({ status: 'delivered' });
    const deliveredOrderIds = deliveredOrders.map(o => o._id);

    if (deliveredOrderIds.length === 0) {
      return allCategories.map(c => ({ ...docToCategory(c), salesCount: 0 })).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    }

    const allOrderItems = await OrderItemModel.find({ orderId: { $in: deliveredOrderIds } });
    const productIds = [...new Set(allOrderItems.map(item => item.productId))];

    if (productIds.length === 0) {
      return allCategories.map(c => ({ ...docToCategory(c), salesCount: 0 })).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    }

    const allProducts = await ProductModel.find({ _id: { $in: productIds } });
    const productCategoryMap = new Map(allProducts.map(p => [p._id, p.categoryId]));

    const categorySalesMap = new Map<string, number>();
    for (const item of allOrderItems) {
      const categoryId = productCategoryMap.get(item.productId);
      if (categoryId) {
        const currentCount = categorySalesMap.get(categoryId) || 0;
        categorySalesMap.set(categoryId, currentCount + item.quantity);
      }
    }

    return allCategories
      .map(c => ({ ...docToCategory(c), salesCount: categorySalesMap.get(c._id) || 0 }))
      .sort((a, b) => b.salesCount - a.salesCount);
  }

  async getCategory(id: string): Promise<Category | undefined> {
    const doc = await CategoryModel.findById(id);
    return doc ? docToCategory(doc) : undefined;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const doc = await CategoryModel.create({
      _id: id,
      name: insertCategory.name,
      iconUrl: insertCategory.iconUrl ?? null,
      sortOrder: insertCategory.sortOrder ?? 0,
      isActive: insertCategory.isActive ?? true,
    });
    return docToCategory(doc);
  }

  async updateCategory(id: string, updates: Partial<InsertCategory>): Promise<Category | undefined> {
    const doc = await CategoryModel.findByIdAndUpdate(id, updates, { new: true });
    return doc ? docToCategory(doc) : undefined;
  }

  async deleteCategory(id: string): Promise<boolean> {
    await CategoryModel.findByIdAndDelete(id);
    return true;
  }

  async getProducts(): Promise<Product[]> {
    const docs = await ProductModel.find({ isActive: true }).sort({ sortOrder: 1 });
    return docs.map(docToProduct);
  }

  async getAllProducts(): Promise<Product[]> {
    const docs = await ProductModel.find().sort({ sortOrder: 1 });
    return docs.map(docToProduct);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const doc = await ProductModel.findById(id);
    return doc ? docToProduct(doc) : undefined;
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const docs = await ProductModel.find({ categoryId, isActive: true }).sort({ sortOrder: 1 });
    return docs.map(docToProduct);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const doc = await ProductModel.create({
      _id: id,
      categoryId: insertProduct.categoryId,
      name: insertProduct.name,
      description: insertProduct.description ?? null,
      imageUrl: insertProduct.imageUrl ?? null,
      costPrice: insertProduct.costPrice,
      profitMargin: insertProduct.profitMargin,
      salePrice: insertProduct.salePrice,
      stock: insertProduct.stock ?? 0,
      isActive: insertProduct.isActive ?? true,
      isPrepared: insertProduct.isPrepared ?? false,
      productType: insertProduct.productType ?? null,
      sortOrder: insertProduct.sortOrder ?? 0,
      comboEligible: insertProduct.comboEligible ?? false,
    });
    return docToProduct(doc);
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const allowedFields = ['categoryId', 'name', 'description', 'imageUrl', 'costPrice', 'profitMargin', 'salePrice', 'stock', 'isActive', 'isPrepared', 'productType', 'sortOrder', 'comboEligible'];
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([key, value]) => value !== undefined && allowedFields.includes(key))
    );
    if (Object.keys(filteredUpdates).length === 0) {
      return this.getProduct(id);
    }
    const doc = await ProductModel.findByIdAndUpdate(id, filteredUpdates, { new: true });
    return doc ? docToProduct(doc) : undefined;
  }

  async deleteProduct(id: string): Promise<boolean> {
    await ProductModel.findByIdAndUpdate(id, { isActive: false });
    return true;
  }

  async getTrendingProducts(limit: number = 10): Promise<{ product: Product; salesCount: number }[]> {
    const deliveredOrders = await OrderModel.find({ status: 'delivered' });
    const deliveredOrderIds = new Set(deliveredOrders.map(o => o._id));

    if (deliveredOrderIds.size === 0) {
      return [];
    }

    const allOrderItems = await OrderItemModel.find({ orderId: { $in: Array.from(deliveredOrderIds) } });

    const salesMap = new Map<string, number>();
    for (const item of allOrderItems) {
      const currentCount = salesMap.get(item.productId) || 0;
      salesMap.set(item.productId, currentCount + item.quantity);
    }

    const sortedProductIds = Array.from(salesMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([productId]) => productId);

    if (sortedProductIds.length === 0) {
      return [];
    }

    const trendingProducts = await ProductModel.find({ _id: { $in: sortedProductIds } });

    const result = trendingProducts
      .filter(p => p.isActive)
      .map(product => ({
        product: docToProduct(product),
        salesCount: salesMap.get(product._id) || 0
      }))
      .sort((a, b) => b.salesCount - a.salesCount);

    return result;
  }

  async getOrders(): Promise<Order[]> {
    const docs = await OrderModel.find().sort({ createdAt: -1 });
    return docs.map(docToOrder);
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const doc = await OrderModel.findById(id);
    return doc ? docToOrder(doc) : undefined;
  }

  async getOrdersByUser(userId: string): Promise<Order[]> {
    const docs = await OrderModel.find({ userId }).sort({ createdAt: -1 });
    return docs.map(docToOrder);
  }

  async getOrdersByStatus(status: string): Promise<Order[]> {
    const docs = await OrderModel.find({ status }).sort({ createdAt: -1 });
    return docs.map(docToOrder);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const doc = await OrderModel.create({
      _id: id,
      userId: insertOrder.userId,
      addressId: insertOrder.addressId ?? null,
      orderType: insertOrder.orderType ?? "delivery",
      status: insertOrder.status ?? "pending",
      subtotal: insertOrder.subtotal,
      deliveryFee: insertOrder.deliveryFee,
      deliveryDistance: insertOrder.deliveryDistance ?? null,
      discount: insertOrder.discount ?? "0",
      total: insertOrder.total,
      paymentMethod: insertOrder.paymentMethod,
      changeFor: insertOrder.changeFor ?? null,
      notes: insertOrder.notes ?? null,
      customerName: insertOrder.customerName ?? null,
      motoboyId: insertOrder.motoboyId ?? null,
    });
    return docToOrder(doc);
  }

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order | undefined> {
    const doc = await OrderModel.findByIdAndUpdate(id, updates, { new: true });
    return doc ? docToOrder(doc) : undefined;
  }

  async deleteOrder(id: string): Promise<boolean> {
    await OrderItemModel.deleteMany({ orderId: id });
    await OrderModel.findByIdAndDelete(id);
    return true;
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    const docs = await OrderItemModel.find({ orderId });
    return docs.map(docToOrderItem);
  }

  async getAllOrderItems(): Promise<OrderItem[]> {
    const docs = await OrderItemModel.find();
    return docs.map(docToOrderItem);
  }

  async getOrderItemsByOrderIds(orderIds: string[]): Promise<OrderItem[]> {
    if (orderIds.length === 0) return [];
    const docs = await OrderItemModel.find({ orderId: { $in: orderIds } });
    return docs.map(docToOrderItem);
  }

  async createOrderItem(insertItem: InsertOrderItem): Promise<OrderItem> {
    const id = randomUUID();
    const doc = await OrderItemModel.create({ _id: id, ...insertItem });
    return docToOrderItem(doc);
  }

  async getBanners(): Promise<Banner[]> {
    const docs = await BannerModel.find({ isActive: true }).sort({ sortOrder: 1 });
    return docs.map(docToBanner);
  }

  async getBanner(id: string): Promise<Banner | undefined> {
    const doc = await BannerModel.findById(id);
    return doc ? docToBanner(doc) : undefined;
  }

  async createBanner(insertBanner: InsertBanner): Promise<Banner> {
    const id = randomUUID();
    const doc = await BannerModel.create({
      _id: id,
      title: insertBanner.title,
      description: insertBanner.description ?? null,
      imageUrl: insertBanner.imageUrl,
      linkUrl: insertBanner.linkUrl ?? null,
      sortOrder: insertBanner.sortOrder ?? 0,
      isActive: insertBanner.isActive ?? true,
    });
    return docToBanner(doc);
  }

  async updateBanner(id: string, updates: Partial<InsertBanner>): Promise<Banner | undefined> {
    const doc = await BannerModel.findByIdAndUpdate(id, updates, { new: true });
    return doc ? docToBanner(doc) : undefined;
  }

  async deleteBanner(id: string): Promise<boolean> {
    await BannerModel.findByIdAndDelete(id);
    return true;
  }

  async getMotoboys(): Promise<Motoboy[]> {
    const docs = await MotoboyModel.find();
    return docs.map(docToMotoboy);
  }

  async getMotoboy(id: string): Promise<Motoboy | undefined> {
    const doc = await MotoboyModel.findById(id);
    return doc ? docToMotoboy(doc) : undefined;
  }

  async getMotoboyByWhatsapp(whatsapp: string): Promise<Motoboy | undefined> {
    const doc = await MotoboyModel.findOne({ whatsapp });
    return doc ? docToMotoboy(doc) : undefined;
  }

  async getOrdersByMotoboy(motoboyId: string, startDate?: Date, endDate?: Date): Promise<Order[]> {
    const query: any = { motoboyId };

    if (startDate) {
      query.createdAt = { ...query.createdAt, $gte: startDate };
    }
    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      query.createdAt = { ...query.createdAt, $lte: endOfDay };
    }

    const docs = await OrderModel.find(query).sort({ createdAt: -1 });
    return docs.map(docToOrder);
  }

  async createMotoboy(insertMotoboy: InsertMotoboy): Promise<Motoboy> {
    const id = randomUUID();
    const doc = await MotoboyModel.create({
      _id: id,
      name: insertMotoboy.name,
      whatsapp: insertMotoboy.whatsapp,
      photoUrl: insertMotoboy.photoUrl ?? null,
      isActive: insertMotoboy.isActive ?? true,
    });
    return docToMotoboy(doc);
  }

  async updateMotoboy(id: string, updates: Partial<InsertMotoboy>): Promise<Motoboy | undefined> {
    const doc = await MotoboyModel.findByIdAndUpdate(id, updates, { new: true });
    return doc ? docToMotoboy(doc) : undefined;
  }

  async deleteMotoboy(id: string): Promise<boolean> {
    await MotoboyModel.findByIdAndDelete(id);
    return true;
  }

  async getSettings(): Promise<Settings | undefined> {
    const doc = await SettingsModel.findOne();
    return doc ? docToSettings(doc) : undefined;
  }

  async updateSettings(updates: Partial<InsertSettings>): Promise<Settings> {
    const existing = await SettingsModel.findOne();
    if (!existing) {
      const id = randomUUID();
      const doc = await SettingsModel.create({
        _id: id,
        storeAddress: null,
        storeLat: null,
        storeLng: null,
        deliveryRatePerKm: "1.25",
        minDeliveryFee: "5.00",
        maxDeliveryDistance: "15",
        pixKey: null,
        openingHours: null,
        isOpen: true,
        ...updates,
      });
      return docToSettings(doc);
    }
    const doc = await SettingsModel.findByIdAndUpdate(existing._id, updates, { new: true });
    return docToSettings(doc!);
  }

  async createStockLog(insertLog: InsertStockLog): Promise<StockLog> {
    const id = randomUUID();
    const doc = await StockLogModel.create({ _id: id, ...insertLog });
    return docToStockLog(doc);
  }

  async getDeliveryZones(): Promise<DeliveryZone[]> {
    const docs = await DeliveryZoneModel.find().sort({ sortOrder: 1 });
    return docs.map(docToDeliveryZone);
  }

  async getDeliveryZone(id: string): Promise<DeliveryZone | undefined> {
    const doc = await DeliveryZoneModel.findById(id);
    return doc ? docToDeliveryZone(doc) : undefined;
  }

  async createDeliveryZone(insertZone: InsertDeliveryZone): Promise<DeliveryZone> {
    const id = randomUUID();
    const doc = await DeliveryZoneModel.create({
      _id: id,
      code: insertZone.code,
      name: insertZone.name,
      description: insertZone.description ?? null,
      fee: insertZone.fee,
      sortOrder: insertZone.sortOrder ?? 0,
      isActive: insertZone.isActive ?? true,
    });
    return docToDeliveryZone(doc);
  }

  async updateDeliveryZone(id: string, updates: Partial<InsertDeliveryZone>): Promise<DeliveryZone | undefined> {
    const doc = await DeliveryZoneModel.findByIdAndUpdate(id, updates, { new: true });
    return doc ? docToDeliveryZone(doc) : undefined;
  }

  async deleteDeliveryZone(id: string): Promise<boolean> {
    await DeliveryZoneModel.findByIdAndDelete(id);
    return true;
  }

  async getNeighborhoods(): Promise<Neighborhood[]> {
    const docs = await NeighborhoodModel.find();
    return docs.map(docToNeighborhood);
  }

  async getNeighborhoodsByZone(zoneId: string): Promise<Neighborhood[]> {
    const docs = await NeighborhoodModel.find({ zoneId });
    return docs.map(docToNeighborhood);
  }

  async getNeighborhood(id: string): Promise<Neighborhood | undefined> {
    const doc = await NeighborhoodModel.findById(id);
    return doc ? docToNeighborhood(doc) : undefined;
  }

  async createNeighborhood(insertNeighborhood: InsertNeighborhood): Promise<Neighborhood> {
    const id = randomUUID();
    const doc = await NeighborhoodModel.create({
      _id: id,
      name: insertNeighborhood.name,
      zoneId: insertNeighborhood.zoneId,
      isActive: insertNeighborhood.isActive ?? true,
    });
    return docToNeighborhood(doc);
  }

  async updateNeighborhood(id: string, updates: Partial<InsertNeighborhood>): Promise<Neighborhood | undefined> {
    const doc = await NeighborhoodModel.findByIdAndUpdate(id, updates, { new: true });
    return doc ? docToNeighborhood(doc) : undefined;
  }

  async deleteNeighborhood(id: string): Promise<boolean> {
    await NeighborhoodModel.findByIdAndDelete(id);
    return true;
  }

  async getCuratedTrendingProducts(): Promise<(TrendingProduct & { product: Product })[]> {
    const docs = await TrendingProductModel.find().sort({ sortOrder: 1 });
    const result: (TrendingProduct & { product: Product })[] = [];

    for (const doc of docs) {
      const productDoc = await ProductModel.findById(doc.productId);
      if (productDoc && productDoc.isActive) {
        result.push({
          ...docToTrendingProduct(doc),
          product: docToProduct(productDoc),
        });
      }
    }

    return result;
  }

  async addTrendingProduct(productId: string): Promise<TrendingProduct> {
    const id = randomUUID();
    const maxSortOrder = await TrendingProductModel.findOne().sort({ sortOrder: -1 });
    const sortOrder = maxSortOrder ? maxSortOrder.sortOrder + 1 : 0;

    const doc = await TrendingProductModel.create({
      _id: id,
      productId,
      sortOrder,
    });
    return docToTrendingProduct(doc);
  }

  async removeTrendingProduct(id: string): Promise<boolean> {
    await TrendingProductModel.findByIdAndDelete(id);
    return true;
  }

  async updateTrendingProductOrder(id: string, sortOrder: number): Promise<TrendingProduct | undefined> {
    const doc = await TrendingProductModel.findByIdAndUpdate(id, { sortOrder }, { new: true });
    return doc ? docToTrendingProduct(doc) : undefined;
  }

  async reorderTrendingProducts(orderedIds: string[]): Promise<void> {
    for (let i = 0; i < orderedIds.length; i++) {
      await TrendingProductModel.findByIdAndUpdate(orderedIds[i], { sortOrder: i });
    }
  }
}

export const storage = new MongoStorage();
