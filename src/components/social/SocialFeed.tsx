import React, { useCallback, useEffect, useState } from 'react';
import ProductCard from '../marketplace/ProductCard';
import { FeedItem, MarketplaceProduct, ProductFeaturePost, SocialPost } from '../../types/marketplace';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Every MARKETPLACE_INJECTION_INTERVAL-th post (1-indexed) will be replaced
 *  with a featured product card. */
const MARKETPLACE_INJECTION_INTERVAL = 5;

// ---------------------------------------------------------------------------
// Featured product – Lab Diamond gold ring (seed data)
// ---------------------------------------------------------------------------

const LAB_DIAMOND_RING: MarketplaceProduct = {
  id: 'product-lab-diamond-ring-001',
  title: 'Lab Diamond Gold Ring',
  description:
    'Ethically crafted lab-grown diamond set in 18-karat gold. Certified conflict-free and verified on-chain via LBC Hub.',
  imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
  price: { usdc: 1_499, usdFiat: 1_499 },
  seller: {
    id: 'founder-mts',
    name: 'Mokhtar Tarek Samara',
    isFounder: true,
    avatarUrl: undefined,
  },
  verificationStatus: 'lumina_verified',
  listedAt: new Date().toISOString(),
  category: 'Fine Jewellery',
  tags: ['diamond', 'gold', 'lab-grown', 'verified'],
};

// ---------------------------------------------------------------------------
// useMarketplaceInjection hook
// ---------------------------------------------------------------------------

/**
 * useMarketplaceInjection
 *
 * Accepts a flat array of social posts and an array of featured products.
 * Returns a new array where every MARKETPLACE_INJECTION_INTERVAL-th item
 * (positions 5, 10, 15 …) is replaced by a ProductFeaturePost drawn from the
 * featured products list (cycling if needed).
 */
function useMarketplaceInjection(
  posts: SocialPost[],
  featuredProducts: MarketplaceProduct[],
): FeedItem[] {
  return React.useMemo<FeedItem[]>(() => {
    if (featuredProducts.length === 0) return posts;

    const result: FeedItem[] = [];
    let productIndex = 0;

    for (let i = 0; i < posts.length; i++) {
      const position = i + 1; // 1-indexed

      if (position % MARKETPLACE_INJECTION_INTERVAL === 0) {
        // Inject a featured product in place of the 5th, 10th, … post.
        const product = featuredProducts[productIndex % featuredProducts.length];
        productIndex++;

        const featurePost: ProductFeaturePost = {
          id: `injected-product-${product.id}-${position}`,
          kind: 'product_feature',
          product,
          createdAt: new Date().toISOString(),
        };
        result.push(featurePost);
      } else {
        result.push(posts[i]);
      }
    }

    return result;
  }, [posts, featuredProducts]);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const PostItem: React.FC<{ post: SocialPost }> = ({ post }) => (
  <article
    data-testid="social-post"
    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
  >
    <div className="flex items-start gap-3">
      {post.authorAvatarUrl ? (
        <img
          src={post.authorAvatarUrl}
          alt={post.authorName}
          className="h-9 w-9 rounded-full object-cover ring-1 ring-white/20"
        />
      ) : (
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
          {post.authorName.charAt(0).toUpperCase()}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white">{post.authorName}</p>
        <p className="mt-1 text-sm text-white/70">{post.content}</p>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt=""
            className="mt-3 w-full rounded-xl object-cover"
            loading="lazy"
          />
        )}
        <p className="mt-2 text-xs text-white/40">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  </article>
);

// ---------------------------------------------------------------------------
// SocialFeed props
// ---------------------------------------------------------------------------

export interface SocialFeedProps {
  /** Initial list of social posts to render. */
  posts: SocialPost[];
  /**
   * Featured products to inject into the feed.
   * Defaults to the Lab Diamond gold ring if not provided.
   */
  featuredProducts?: MarketplaceProduct[];
  /** Called when the user taps "Buy with Solana" on an injected product. */
  onBuyWithSolana?: (product: MarketplaceProduct) => void;
}

// ---------------------------------------------------------------------------
// SocialFeed
// ---------------------------------------------------------------------------

/**
 * SocialFeed
 *
 * Renders a social feed with automatic marketplace injection.
 * Every MARKETPLACE_INJECTION_INTERVAL-th post (5, 10, 15 …) is replaced
 * with a featured ProductCard, creating a seamless Social-Marketplace Bridge.
 */
const SocialFeed: React.FC<SocialFeedProps> = ({
  posts,
  featuredProducts = [LAB_DIAMOND_RING],
  onBuyWithSolana,
}) => {
  const [pendingProductId, setPendingProductId] = useState<string | null>(null);

  const feedItems = useMarketplaceInjection(posts, featuredProducts);

  const handleBuy = useCallback(
    (product: MarketplaceProduct) => {
      setPendingProductId(product.id);
      onBuyWithSolana?.(product);
    },
    [onBuyWithSolana],
  );

  // Reset pending state when buy handler resolves (simple timeout fallback).
  useEffect(() => {
    if (!pendingProductId) return;
    const timer = setTimeout(() => setPendingProductId(null), 5_000);
    return () => clearTimeout(timer);
  }, [pendingProductId]);

  return (
    <section
      aria-label="Social Feed"
      data-testid="social-feed"
      className="mx-auto flex max-w-xl flex-col gap-4"
    >
      {feedItems.map((item) => {
        if (item.kind === 'product_feature') {
          return (
            <div key={item.id} data-testid="feed-product-injection">
              {/* Injection label */}
              <p className="mb-2 px-1 text-xs font-medium uppercase tracking-widest text-white/40">
                ✦ Featured on Marketplace
              </p>
              <ProductCard
                product={item.product}
                onBuyWithSolana={handleBuy}
                isBuyPending={pendingProductId === item.product.id}
              />
            </div>
          );
        }

        return <PostItem key={item.id} post={item} />;
      })}

      {feedItems.length === 0 && (
        <p className="py-12 text-center text-white/40">No posts yet.</p>
      )}
    </section>
  );
};

export default SocialFeed;
export { useMarketplaceInjection, LAB_DIAMOND_RING };
