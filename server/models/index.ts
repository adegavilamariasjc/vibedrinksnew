import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  whatsapp: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'customer' },
  password: { type: String, default: null },
  isBlocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const AddressSchema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: String, required: true },
  complement: { type: String, default: null },
  neighborhood: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  notes: { type: String, default: null },
  isDefault: { type: Boolean, default: true },
});

const CategorySchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  iconUrl: { type: String, default: null },
  sortOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const ProductSchema = new Schema({
  _id: { type: String, required: true },
  categoryId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: null },
  imageUrl: { type: String, default: null },
  costPrice: { type: String, required: true },
  profitMargin: { type: String, required: true },
  salePrice: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  isActive: { type: Boolean, default: true },
  isPrepared: { type: Boolean, default: false },
  comboEligible: { type: Boolean, default: false },
  productType: { type: String, default: null },
  sortOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const OrderSchema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  addressId: { type: String, default: null },
  orderType: { type: String, required: true, default: 'delivery' },
  status: { type: String, required: true, default: 'pending' },
  subtotal: { type: String, required: true },
  deliveryFee: { type: String, required: true },
  originalDeliveryFee: { type: String, default: null },
  deliveryFeeAdjusted: { type: Boolean, default: false },
  deliveryFeeAdjustedAt: { type: Date, default: null },
  deliveryDistance: { type: String, default: null },
  discount: { type: String, default: '0' },
  total: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  changeFor: { type: String, default: null },
  notes: { type: String, default: null },
  customerName: { type: String, default: null },
  motoboyId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  acceptedAt: { type: Date, default: null },
  preparingAt: { type: Date, default: null },
  readyAt: { type: Date, default: null },
  dispatchedAt: { type: Date, default: null },
  arrivedAt: { type: Date, default: null },
  deliveredAt: { type: Date, default: null },
});

const OrderItemSchema = new Schema({
  _id: { type: String, required: true },
  orderId: { type: String, required: true },
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: String, required: true },
  totalPrice: { type: String, required: true },
});

const BannerSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: null },
  imageUrl: { type: String, required: true },
  linkUrl: { type: String, default: null },
  sortOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const MotoboySchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  whatsapp: { type: String, required: true, unique: true },
  photoUrl: { type: String, default: null },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const StockLogSchema = new Schema({
  _id: { type: String, required: true },
  productId: { type: String, required: true },
  previousStock: { type: Number, required: true },
  newStock: { type: Number, required: true },
  change: { type: Number, required: true },
  reason: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const SettingsSchema = new Schema({
  _id: { type: String, required: true },
  storeAddress: { type: String, default: null },
  storeLat: { type: String, default: null },
  storeLng: { type: String, default: null },
  deliveryRatePerKm: { type: String, default: '1.25' },
  minDeliveryFee: { type: String, default: '5.00' },
  maxDeliveryDistance: { type: String, default: '15' },
  pixKey: { type: String, default: null },
  openingHours: { type: Schema.Types.Mixed, default: null },
  isOpen: { type: Boolean, default: true },
});

const DeliveryZoneSchema = new Schema({
  _id: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: null },
  fee: { type: String, required: true },
  sortOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
});

const NeighborhoodSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  zoneId: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

const TrendingProductSchema = new Schema({
  _id: { type: String, required: true },
  productId: { type: String, required: true, unique: true },
  sortOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

AddressSchema.index({ userId: 1 });
ProductSchema.index({ categoryId: 1 });
OrderSchema.index({ userId: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ motoboyId: 1 });
OrderItemSchema.index({ orderId: 1 });
NeighborhoodSchema.index({ zoneId: 1 });

export const UserModel = mongoose.model('User', UserSchema);
export const AddressModel = mongoose.model('Address', AddressSchema);
export const CategoryModel = mongoose.model('Category', CategorySchema);
export const ProductModel = mongoose.model('Product', ProductSchema);
export const OrderModel = mongoose.model('Order', OrderSchema);
export const OrderItemModel = mongoose.model('OrderItem', OrderItemSchema);
export const BannerModel = mongoose.model('Banner', BannerSchema);
export const MotoboyModel = mongoose.model('Motoboy', MotoboySchema);
export const StockLogModel = mongoose.model('StockLog', StockLogSchema);
export const SettingsModel = mongoose.model('Settings', SettingsSchema);
export const DeliveryZoneModel = mongoose.model('DeliveryZone', DeliveryZoneSchema);
export const NeighborhoodModel = mongoose.model('Neighborhood', NeighborhoodSchema);
export const TrendingProductModel = mongoose.model('TrendingProduct', TrendingProductSchema);
