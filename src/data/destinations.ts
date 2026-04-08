import type { TravelItinerary } from '../../types';

// Featured destinations sourced from Mokhtar's recent trip history
export const FEATURED_DESTINATIONS: TravelItinerary[] = [
  {
    id: 'dest-paris',
    destination: 'Paris, France',
    duration: '7 days',
    AI_recommendations: [
      'Visit the Louvre at opening time to beat the crowds',
      'Dine at a hidden brasserie in Le Marais',
      'Take a sunset Seine river cruise',
    ],
    priceEstimate: 2800,
  },
  {
    id: 'dest-santorini',
    destination: 'Santorini, Greece',
    duration: '5 days',
    AI_recommendations: [
      'Watch the sunset from Oia — arrive 90 min early for a spot',
      'Explore the volcanic black-sand beaches of Perissa',
      'Book a private catamaran tour of the caldera',
    ],
    priceEstimate: 3400,
  },
  {
    id: 'dest-nyc',
    destination: 'New York City, USA',
    duration: '4 days',
    AI_recommendations: [
      'Visit the High Line for Chelsea art-gallery views',
      'Reserve tickets for a Broadway show at least 2 weeks ahead',
      'Explore Brooklyn DUMBO for skyline photography',
    ],
    priceEstimate: 2100,
  },
];
