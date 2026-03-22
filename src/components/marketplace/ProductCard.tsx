import React from 'react';
import { MarketplaceProduct } from '../../types/marketplace';

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/**
 * LuminaVerifyBadge
 * A small, pulsing diamond icon that signifies the product is verified by
 * LBC Hub.  Rendered only when verificationStatus === 'lumina_verified'.
 */
const LuminaVerifyBadge: React.FC = () => (
  <span
    title="LuminaVerified by LBC Hub"
    aria-label="LuminaVerified by LBC Hub"
    className="inline-flex items-center gap-1 rounded-full bg-sky-500/20 px-2 py-0.5 text-xs font-semibold text-sky-300 ring-1 ring-sky-400/40"
  >
    {/* Pulsing diamond icon */}
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-300" />
    </span>
    ◆ LuminaVerified
  </span>
);

/**
 * FounderSignature
 * A unique UI element that appears when the product belongs to the Founder
 * (Mokhtar Tarek Samara). 🏛️
 */
const FounderSignature: React.FC<{ founderName: string }> = ({ founderName }) => (
  <div
    aria-label={`Founder's Signature – ${founderName}`}
    className="mt-3 flex items-center gap-2 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-1.5"
  >
    <span className="text-base" role="img" aria-hidden="true">🏛️</span>
    <span className="text-xs font-medium tracking-wide text-amber-300">
      Founder&rsquo;s Edition &mdash; {founderName}
    </span>
    {/* Decorative shimmer line */}
    <span className="ml-auto h-px w-8 bg-gradient-to-r from-amber-400/60 to-transparent" />
  </div>
);

// ---------------------------------------------------------------------------
// ProductCard props
// ---------------------------------------------------------------------------

export interface ProductCardProps {
  product: MarketplaceProduct;
  /** Called when the user clicks "Buy with Solana".
   *  The parent component is responsible for triggering the checkout flow. */
  onBuyWithSolana: (product: MarketplaceProduct) => void;
  /** Optional loading/pending state for the buy button (e.g. while wallet connects). */
  isBuyPending?: boolean;
}

// ---------------------------------------------------------------------------
// ProductCard
// ---------------------------------------------------------------------------

/**
 * ProductCard
 *
 * A high-end glassmorphism card for a MarketplaceProduct.
 *
 * Features:
 *  - Glassmorphism design (backdrop-blur-lg, border-white/20)
 *  - LuminaVerifyBadge for lumina_verified products
 *  - Founder's Signature element when the seller is the Founder
 *  - "Buy with Solana" button wired to a USDC checkout flow
 */
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onBuyWithSolana,
  isBuyPending = false,
}) => {
  const isVerified = product.verificationStatus === 'lumina_verified';

  return (
    <article
      data-testid="product-card"
      className={[
        // Glassmorphism base
        'relative overflow-hidden rounded-2xl',
        'bg-white/10 backdrop-blur-lg',
        'border border-white/20',
        'shadow-[0_8px_32px_rgba(0,0,0,0.37)]',
        'transition-transform duration-200 hover:scale-[1.02]',
        // Founder glow
        product.seller.isFounder
          ? 'ring-1 ring-amber-400/40 shadow-amber-500/20'
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Product image */}
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Verification badge – top-right */}
        {isVerified && (
          <div className="absolute right-3 top-3">
            <LuminaVerifyBadge />
          </div>
        )}

        {/* Category pill – bottom-left */}
        <span className="absolute bottom-3 left-3 rounded-full bg-black/40 px-2 py-0.5 text-xs text-white/80 backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Title */}
        <h3 className="truncate text-base font-semibold text-white">
          {product.title}
        </h3>

        {/* Description */}
        <p className="mt-1 line-clamp-2 text-sm text-white/60">
          {product.description}
        </p>

        {/* Seller info */}
        <div className="mt-3 flex items-center gap-2">
          {product.seller.avatarUrl ? (
            <img
              src={product.seller.avatarUrl}
              alt={product.seller.name}
              className="h-6 w-6 rounded-full object-cover ring-1 ring-white/20"
            />
          ) : (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs text-white">
              {product.seller.name.charAt(0).toUpperCase()}
            </span>
          )}
          <span className="text-xs text-white/70">{product.seller.name}</span>
        </div>

        {/* Founder's Signature */}
        {product.seller.isFounder && (
          <FounderSignature founderName={product.seller.name} />
        )}

        {/* Price + Buy button */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-white">
              {product.price.usdc.toLocaleString()} <span className="text-sm font-normal text-white/70">USDC</span>
            </p>
            {product.price.usdFiat !== undefined && (
              <p className="text-xs text-white/50">
                ≈ ${product.price.usdFiat.toLocaleString()} USD
              </p>
            )}
          </div>

          <button
            type="button"
            disabled={isBuyPending}
            onClick={() => onBuyWithSolana(product)}
            aria-label={`Buy ${product.title} with Solana`}
            className={[
              'flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold',
              'bg-gradient-to-r from-purple-600 to-indigo-500',
              'text-white shadow-lg shadow-purple-500/30',
              'transition-all duration-150 hover:brightness-110 active:scale-95',
              'disabled:cursor-not-allowed disabled:opacity-50',
            ].join(' ')}
          >
            {isBuyPending ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Connecting…
              </>
            ) : (
              <>
                ⚡ Buy with Solana
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
