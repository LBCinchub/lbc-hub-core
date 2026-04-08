import type { TravelItinerary } from '../../types';
import './TravelCard.css';

interface TravelCardProps {
  itinerary: TravelItinerary;
  onBookRiding?: (destination: string) => void;
}

export function TravelCard({ itinerary, onBookRiding }: TravelCardProps) {
  const handleBookRiding = () => {
    onBookRiding?.(itinerary.destination);
  };

  return (
    <article className="travel-card" aria-label={`Travel itinerary for ${itinerary.destination}`}>
      {/* Boarding-pass top strip */}
      <header className="travel-card__header">
        <div className="travel-card__airline">
          <span className="travel-card__logo">✈ LBC HUB</span>
          <span className="travel-card__class">DIAMOND CLASS</span>
        </div>
        <div className="travel-card__route">
          <span className="travel-card__origin" aria-label="Origin">HOME</span>
          <span className="travel-card__arrow" aria-hidden="true">→</span>
          <span className="travel-card__dest" aria-label="Destination">{itinerary.destination.toUpperCase()}</span>
        </div>
      </header>

      {/* Boarding-pass perforation */}
      <div className="travel-card__perforation" aria-hidden="true">
        <span className="travel-card__hole travel-card__hole--left" />
        <div className="travel-card__dashes" />
        <span className="travel-card__hole travel-card__hole--right" />
      </div>

      {/* Main body */}
      <section className="travel-card__body">
        <div className="travel-card__meta">
          <div className="travel-card__meta-item">
            <span className="travel-card__meta-label">DURATION</span>
            <span className="travel-card__meta-value">{itinerary.duration}</span>
          </div>
          <div className="travel-card__meta-item">
            <span className="travel-card__meta-label">EST. PRICE</span>
            <span className="travel-card__meta-value">
              ${itinerary.priceEstimate.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Lumina AI recommendations */}
        <div className="travel-card__recommendations">
          <h3 className="travel-card__rec-title">
            <span className="travel-card__lumina-badge" aria-label="Lumina AI">✦ Lumina Suggests</span>
          </h3>
          <ul className="travel-card__rec-list">
            {itinerary.AI_recommendations.map((rec, index) => (
              <li key={index} className="travel-card__rec-item">{rec}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Boarding-pass footer with CTA */}
      <footer className="travel-card__footer">
        <button
          type="button"
          className="travel-card__cta"
          onClick={handleBookRiding}
          aria-label={`Book LBC Riding to airport for trip to ${itinerary.destination}`}
        >
          🚗⚡ Book LBC Riding to Airport
        </button>
      </footer>
    </article>
  );
}
