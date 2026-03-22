import { LuminaVerifyBadge } from './LuminaVerifyBadge'
import './ProductCard.css'

export interface RingListing {
  id: string
  title: string
  description: string
  priceUsdc: number
  seller: string
  caratWeight: string
  metalType: string
  certifiedBy: string
  imageAlt: string
}

export const LAB_DIAMOND_RING_LISTING: RingListing = {
  id: 'lbc-ring-001',
  title: 'Lab Diamond Gold Ring',
  description:
    '2ct lab-grown diamond set in 18k gold. IGI certified, conflict-free, and radiant with ethical luxury. A symbol of modern prestige.',
  priceUsdc: 1250,
  seller: 'LBC Founders Vault',
  caratWeight: '2.00 ct',
  metalType: '18k Gold',
  certifiedBy: 'IGI',
  imageAlt: 'Lab Diamond Gold Ring — 2ct, 18k gold setting',
}

interface ProductCardProps {
  listing?: RingListing
  onBuyNow?: (listing: RingListing) => void
}

/**
 * Initiates a Solana/USDC transaction for the given listing.
 * Connects to the user's Solana wallet and requests a USDC transfer
 * to the seller's address. Replace the stub implementation with the
 * actual @solana/web3.js + SPL-token logic once wallet adapters are
 * wired up to the app.
 */
async function requestSolanaUsdcTransaction(listing: RingListing): Promise<void> {
  console.info(
    `[Solana/USDC] Requesting transaction: ${listing.priceUsdc} USDC for "${listing.title}" (id: ${listing.id})`,
  )

  // TODO: Replace with real Solana wallet-adapter + SPL-token transaction:
  //
  // import { Connection, PublicKey, Transaction } from '@solana/web3.js'
  // import { createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'
  //
  // const connection = new Connection(clusterApiUrl('mainnet-beta'))
  // const usdcMint = new PublicKey('<USDC_MINT_ADDRESS>')
  // const sellerPublicKey = new PublicKey('<SELLER_WALLET_ADDRESS>')
  // const amount = BigInt(listing.priceUsdc * 1_000_000) // USDC uses 6 decimals
  //
  // Build, sign and send the transfer instruction via the connected wallet adapter.

  return Promise.resolve()
}

export function ProductCard({ listing = LAB_DIAMOND_RING_LISTING, onBuyNow }: ProductCardProps) {
  const handleBuyNow = async () => {
    await requestSolanaUsdcTransaction(listing)
    onBuyNow?.(listing)
  }

  return (
    <article className="product-card" aria-label={listing.title}>
      {/* Gem illustration */}
      <div className="product-card__image-wrapper" aria-hidden="true">
        <svg
          className="product-card__gem-icon"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Diamond shape */}
          <polygon
            points="40,8 64,28 56,68 24,68 16,28"
            fill="rgba(212,175,55,0.18)"
            stroke="rgba(212,175,55,0.7)"
            strokeWidth="1.5"
          />
          {/* Inner facets */}
          <polygon
            points="40,8 64,28 40,40"
            fill="rgba(255,255,255,0.08)"
            stroke="rgba(212,175,55,0.4)"
            strokeWidth="0.8"
          />
          <polygon
            points="40,8 16,28 40,40"
            fill="rgba(212,175,55,0.1)"
            stroke="rgba(212,175,55,0.4)"
            strokeWidth="0.8"
          />
          <polygon
            points="64,28 56,68 40,40"
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(212,175,55,0.3)"
            strokeWidth="0.8"
          />
          <polygon
            points="16,28 24,68 40,40"
            fill="rgba(212,175,55,0.08)"
            stroke="rgba(212,175,55,0.3)"
            strokeWidth="0.8"
          />
          {/* Sparkle */}
          <circle cx="30" cy="20" r="2" fill="rgba(255,255,255,0.7)" />
          <circle cx="52" cy="16" r="1.2" fill="rgba(255,255,255,0.5)" />
        </svg>
      </div>

      {/* Header */}
      <div className="product-card__header">
        <h3 className="product-card__title">{listing.title}</h3>
        <LuminaVerifyBadge />
      </div>

      {/* Specs */}
      <dl className="product-card__specs">
        <div className="product-card__spec">
          <dt>Carat</dt>
          <dd>{listing.caratWeight}</dd>
        </div>
        <div className="product-card__spec">
          <dt>Metal</dt>
          <dd>{listing.metalType}</dd>
        </div>
        <div className="product-card__spec">
          <dt>Certified</dt>
          <dd>{listing.certifiedBy}</dd>
        </div>
      </dl>

      {/* Description */}
      <p className="product-card__description">{listing.description}</p>

      {/* Footer */}
      <div className="product-card__footer">
        <div className="product-card__price-block">
          <span className="product-card__price" aria-label={`Price: ${listing.priceUsdc} USDC`}>
            {listing.priceUsdc.toLocaleString()} USDC
          </span>
          <span className="product-card__seller">by {listing.seller}</span>
        </div>
        <button
          className="product-card__buy-btn"
          onClick={handleBuyNow}
          aria-label={`Buy ${listing.title} for ${listing.priceUsdc} USDC via Solana`}
        >
          <svg
            className="product-card__buy-icon"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            width="16"
            height="16"
          >
            {/* Solana-style lightning bolt */}
            <path
              d="M11 2L4 11H10L9 18L16 9H10L11 2Z"
              fill="currentColor"
            />
          </svg>
          Buy Now · Solana/USDC
        </button>
      </div>
    </article>
  )
}
