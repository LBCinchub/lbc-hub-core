import { useState } from 'react';
import { TravelCard } from '../travel/TravelCard';
import type { TravelItinerary } from '../../types';
import { FEATURED_DESTINATIONS } from '../../data/destinations';
import './SocialFeed.css';

// Keywords that trigger Lumina AI to surface a travel recommendation
const LUMINA_TRAVEL_KEYWORDS = ['vacation', 'trip', 'flight', 'travel', 'holiday', 'journey', 'explore'];

interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface SocialFeedProps {
  initialPosts?: Post[];
}

/**
 * Lumina Suggest — scans post content for travel-related keywords and
 * returns the first matching featured destination itinerary, or null.
 */
export function luminaSuggestTravel(postContent: string): TravelItinerary | null {
  const lower = postContent.toLowerCase();
  const hasKeyword = LUMINA_TRAVEL_KEYWORDS.some((keyword) => lower.includes(keyword));
  if (!hasKeyword) return null;

  // Cycle through featured destinations for variety
  const index = FEATURED_DESTINATIONS.findIndex((d) =>
    lower.includes(d.destination.split(',')[0].toLowerCase()),
  );
  return index !== -1 ? FEATURED_DESTINATIONS[index] : FEATURED_DESTINATIONS[0];
}

const DEFAULT_POSTS: Post[] = [
  {
    id: 'post-1',
    author: 'Mokhtar T.',
    content: 'Just got back from an amazing trip to Paris — the city truly never sleeps! 🗼',
    timestamp: '2 hours ago',
  },
  {
    id: 'post-2',
    author: 'Layla M.',
    content: 'Planning my next vacation, thinking about somewhere warm and exotic ☀️',
    timestamp: '5 hours ago',
  },
  {
    id: 'post-3',
    author: 'Youssef K.',
    content: 'Finished a big project at work — time to relax!',
    timestamp: '1 day ago',
  },
];

export function SocialFeed({ initialPosts = DEFAULT_POSTS }: SocialFeedProps) {
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [luminaSuggestion, setLuminaSuggestion] = useState<TravelItinerary | null>(null);

  const handlePostChange = (value: string) => {
    setNewPostContent(value);
    // Lumina AI interjection: check for travel keywords as the user types
    setLuminaSuggestion(luminaSuggestTravel(value));
  };

  const handleSubmitPost = () => {
    if (!newPostContent.trim()) return;
    const post: Post = {
      id: `post-${Date.now()}`,
      author: 'You',
      content: newPostContent.trim(),
      timestamp: 'Just now',
    };
    setPosts([post, ...posts]);
    setNewPostContent('');
    setLuminaSuggestion(null);
  };

  const handleBookRiding = (destination: string) => {
    // Riding service bridge — integrate with LBC Riding API in production
    alert(`🚗⚡ Booking LBC Riding to the airport for your trip to ${destination}!`);
  };

  return (
    <div className="social-feed">
      <h2 className="social-feed__title">Community Feed</h2>

      {/* Post composer */}
      <div className="social-feed__composer">
        <textarea
          className="social-feed__input"
          placeholder="What's on your mind? (Mention 'vacation', 'trip' or 'flight' for Lumina AI travel suggestions ✨)"
          value={newPostContent}
          onChange={(e) => handlePostChange(e.target.value)}
          rows={3}
          aria-label="Compose a new post"
        />
        <button
          type="button"
          className="social-feed__post-btn"
          onClick={handleSubmitPost}
          disabled={!newPostContent.trim()}
        >
          Post
        </button>
      </div>

      {/* Lumina AI travel suggestion interjection */}
      {luminaSuggestion && (
        <div className="social-feed__lumina-interject" role="region" aria-label="Lumina AI travel suggestion">
          <p className="social-feed__lumina-label">✦ Lumina Suggests — Based on your post:</p>
          <TravelCard itinerary={luminaSuggestion} onBookRiding={handleBookRiding} />
        </div>
      )}

      {/* Post list */}
      <ul className="social-feed__list" aria-label="Social feed posts">
        {posts.map((post) => {
          const suggestion = luminaSuggestTravel(post.content);
          return (
            <li key={post.id} className="social-feed__post">
              <div className="social-feed__post-header">
                <span className="social-feed__post-author">{post.author}</span>
                <span className="social-feed__post-time">{post.timestamp}</span>
              </div>
              <p className="social-feed__post-content">{post.content}</p>

              {/* Lumina AI inline suggestion for existing posts */}
              {suggestion && (
                <div className="social-feed__post-suggestion" role="complementary" aria-label="Lumina travel recommendation">
                  <span className="social-feed__lumina-label">✦ Lumina Suggests:</span>
                  <TravelCard itinerary={suggestion} onBookRiding={handleBookRiding} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
