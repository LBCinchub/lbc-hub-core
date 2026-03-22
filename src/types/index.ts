/**
 * LBC Hub Core — Shared TypeScript Interfaces
 * Architected for the Diamond Standard 🌐⚡
 */

// ---------------------------------------------------------------------------
// User
// ---------------------------------------------------------------------------

export type PrestigeLevel = 'Diamond' | 'Gold' | 'Silver';

export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  isFounder: boolean;
  prestigeLevel: PrestigeLevel;
  createdAt: Date;
  updatedAt: Date;
  solanaWallet?: SolanaWallet;
}

// ---------------------------------------------------------------------------
// Social Post
// ---------------------------------------------------------------------------

export type PostMediaType = 'image' | 'video' | 'audio' | 'document';

export interface PostMedia {
  id: string;
  url: string;
  type: PostMediaType;
  thumbnailUrl?: string;
  altText?: string;
}

export interface SocialPost {
  id: string;
  authorId: string;
  author?: User;
  content: string;
  media?: PostMedia[];
  likes: number;
  commentsCount: number;
  sharesCount: number;
  isPublished: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------------------------------------
// Marketplace Product
// ---------------------------------------------------------------------------

export type ProductCategory =
  | 'LabDiamondJewelry'
  | 'LuxuryAccessories'
  | 'DigitalAssets'
  | 'RealEstate'
  | 'Experiences'
  | 'Other';

export type ProductCondition = 'New' | 'LikeNew' | 'Good' | 'Fair';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'SOL' | 'USDC';

export interface ProductPrice {
  amount: number;
  currency: CurrencyCode;
}

export interface MarketplaceProduct {
  id: string;
  sellerId: string;
  seller?: User;
  title: string;
  description: string;
  category: ProductCategory;
  condition: ProductCondition;
  price: ProductPrice;
  images: string[];
  /** Carat weight — relevant for Lab Diamond rings 💍 */
  caratWeight?: number;
  /** Metal type, e.g. "Platinum", "18K White Gold" */
  metalType?: string;
  /** Gemstone certification identifier */
  certificationId?: string;
  isAvailable: boolean;
  isFeatured: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------------------------------------
// Solana Wallet
// ---------------------------------------------------------------------------

export type SolanaNetwork = 'mainnet-beta' | 'devnet' | 'testnet';

export interface SolanaWallet {
  publicKey: string;
  network: SolanaNetwork;
  /** SOL balance in lamports */
  balanceLamports: number;
  /** Human-readable SOL balance */
  balanceSol: number;
  /** Connected wallet provider, e.g. "Phantom", "Solflare" */
  provider?: string;
  isConnected: boolean;
  lastSyncedAt?: Date;
}
