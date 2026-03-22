/**
 * LBC Hub Core – Marketplace Types
 * Phase 1 type definitions for the Social-Marketplace Bridge.
 */

export type VerificationStatus = 'lumina_verified' | 'pending' | 'unverified';

export interface ProductSeller {
  id: string;
  name: string;
  /** When true, the Founder's Signature UI element is shown on the product card. */
  isFounder: boolean;
  avatarUrl?: string;
}

export interface ProductPrice {
  /** Amount in USDC (the on-chain settlement currency). */
  usdc: number;
  /** Optional display price in USD fiat for reference. */
  usdFiat?: number;
}

export interface MarketplaceProduct {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  /** Additional gallery images. */
  images?: string[];
  price: ProductPrice;
  seller: ProductSeller;
  verificationStatus: VerificationStatus;
  /** ISO 8601 timestamp of when the product was listed. */
  listedAt: string;
  category: string;
  tags?: string[];
}

/** A post in the social feed.  May be a regular post or an injected product feature. */
export type FeedItemKind = 'post' | 'product_feature';

export interface SocialPost {
  id: string;
  kind: 'post';
  authorId: string;
  authorName: string;
  authorAvatarUrl?: string;
  content: string;
  imageUrl?: string;
  likedBy: string[];
  createdAt: string;
}

export interface ProductFeaturePost {
  id: string;
  kind: 'product_feature';
  product: MarketplaceProduct;
  createdAt: string;
}

export type FeedItem = SocialPost | ProductFeaturePost;
