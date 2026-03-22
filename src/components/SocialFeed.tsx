import { ProductCard, LAB_DIAMOND_RING_LISTING, type RingListing } from './ProductCard'
import './SocialFeed.css'

interface FeedPost {
  id: string
  author: string
  avatarInitials: string
  content: string
  timestamp: string
  likes: number
}

const SAMPLE_POSTS: FeedPost[] = [
  {
    id: 'post-1',
    author: 'Aria Chen',
    avatarInitials: 'AC',
    content:
      'Just received my LBC order — the packaging alone felt like a gift. This platform is redefining luxury e-commerce. 💛',
    timestamp: '2h ago',
    likes: 48,
  },
  {
    id: 'post-2',
    author: 'Marcus Obi',
    avatarInitials: 'MO',
    content:
      'Seamless Solana checkout. Paid in USDC, confirmed in seconds. The future of peer-to-peer luxury is here.',
    timestamp: '5h ago',
    likes: 31,
  },
  {
    id: 'post-3',
    author: 'Priya Nair',
    avatarInitials: 'PN',
    content:
      'The Lumina Verify badge gave me full confidence — every detail of the ring was exactly as described. Zero surprises, pure radiance. ✨',
    timestamp: '1d ago',
    likes: 74,
  },
]

interface SocialFeedProps {
  onBuyFeaturedItem?: (listing: RingListing) => void
}

export function SocialFeed({ onBuyFeaturedItem }: SocialFeedProps) {
  return (
    <div className="social-feed">
      {/* Featured Founder's Item — pinned at top for all users */}
      <section className="social-feed__featured" aria-labelledby="featured-heading">
        <div className="social-feed__featured-label" aria-hidden="true">
          <span className="social-feed__featured-dot" />
          Featured Founder's Item
        </div>
        <h2 id="featured-heading" className="visually-hidden">
          Featured Founder's Item
        </h2>
        <ProductCard listing={LAB_DIAMOND_RING_LISTING} onBuyNow={onBuyFeaturedItem} />
      </section>

      {/* Divider */}
      <div className="social-feed__divider" role="separator" aria-hidden="true">
        <span>Community</span>
      </div>

      {/* Community posts */}
      <ul className="social-feed__posts" aria-label="Community posts">
        {SAMPLE_POSTS.map((post) => (
          <li key={post.id} className="social-feed__post-item">
            <article className="feed-post" aria-label={`Post by ${post.author}`}>
              <div className="feed-post__avatar" aria-hidden="true">
                {post.avatarInitials}
              </div>
              <div className="feed-post__body">
                <header className="feed-post__header">
                  <span className="feed-post__author">{post.author}</span>
                  <time className="feed-post__time" dateTime={post.timestamp}>
                    {post.timestamp}
                  </time>
                </header>
                <p className="feed-post__content">{post.content}</p>
                <div className="feed-post__actions">
                  <button
                    className="feed-post__like-btn"
                    aria-label={`Like post by ${post.author}. ${post.likes} likes.`}
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    {post.likes}
                  </button>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
