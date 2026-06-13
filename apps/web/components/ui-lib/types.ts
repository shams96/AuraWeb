// Base types
export type BaseComponentProps = {
  className?: string
  children?: React.ReactNode
}

// Product types
export interface ProductImage {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  compareAtPrice?: number
  sku: string
  barcode?: string
  trackQuantity: boolean
  quantity: number
  images: ProductImage[]
  variants: ProductVariant[]
  categories: Category[]
  tags: string[]
  seoTitle?: string
  seoDescription?: string
  status: 'active' | 'draft' | 'archived'
  featured: boolean
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface ProductVariant {
  id: string
  productId: string
  name: string
  price: number
  compareAtPrice?: number
  sku: string
  barcode?: string
  trackQuantity: boolean
  quantity: number
  options: Record<string, string>
  image?: ProductImage
  status: 'active' | 'draft' | 'archived'
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
  image?: ProductImage
  seoTitle?: string
  seoDescription?: string
  status: 'active' | 'draft' | 'archived'
  createdAt: Date
  updatedAt: Date
}

// Cart types
export interface CartItem {
  id: string
  productId: string
  variantId: string
  name: string
  sku: string
  price: number
  compareAtPrice?: number
  quantity: number
  image?: ProductImage
  options?: Record<string, string>
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  discount?: number
  discountCode?: string
  createdAt: Date
  updatedAt: Date
}

// User types
export interface User {
  id: string
  email: string
  name: string
  firstName?: string
  lastName?: string
  phone?: string
  avatar?: string
  role: 'customer' | 'admin' | 'owner'
  verified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  id: string
  userId: string
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  province: string
  country: string
  zip: string
  phone?: string
  default: boolean
  createdAt: Date
  updatedAt: Date
}

// Order types
export interface Order {
  id: string
  userId?: string
  orderNumber: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  paymentStatus: 'pending' | 'paid' | 'partially_paid' | 'refunded' | 'voided'
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  discount?: number
  discountCode?: string
  currency: string
  shippingAddress: Address
  billingAddress: Address
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  variantId: string
  name: string
  sku: string
  price: number
  quantity: number
  image?: ProductImage
  options?: Record<string, string>
}

// Search types
export interface SearchResult {
  id: string
  type: 'product' | 'category' | 'article'
  name: string
  slug: string
  description?: string
  image?: ProductImage
  relevance: number
}

// Review types
export interface Review {
  id: string
  userId?: string
  productId: string
  title: string
  comment: string
  rating: number
  verified: boolean
  approved: boolean
  helpful: number
  images?: ProductImage[]
  user?: {
    name: string
    avatar?: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface ReviewData {
  rating: number
  title: string
  comment: string
  images?: File[]
  name: string
  email: string
}

// Form types
export type FormField = {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio'
  placeholder?: string
  required?: boolean
  options?: Array<{ value: string; label: string }>
  validation?: {
    min?: number
    max?: number
    pattern?: RegExp
    custom?: (value: any) => string | undefined
  }
}

export type FormValues = Record<string, any>

// Toast types
export type ToastVariant = 'success' | 'error' | 'warning' | 'info'
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface Toast {
  id: string
  title?: string
  message: string
  variant: ToastVariant
  duration?: number
}

// Alert types
export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

// Skeleton types
export type SkeletonShape = 'circle' | 'rectangle' | 'text' | 'card'
