import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TravelCard } from '../components/travel/TravelCard';
import type { TravelItinerary } from '../types';

const mockItinerary: TravelItinerary = {
  id: 'test-paris',
  destination: 'Paris, France',
  duration: '7 days',
  AI_recommendations: [
    'Visit the Louvre at opening time',
    'Dine in Le Marais',
    'Take a sunset Seine river cruise',
  ],
  priceEstimate: 2800,
};

describe('TravelCard', () => {
  it('renders the destination name', () => {
    render(<TravelCard itinerary={mockItinerary} />);
    expect(screen.getByLabelText(/travel itinerary for Paris, France/i)).toBeInTheDocument();
    expect(screen.getByText(/PARIS, FRANCE/i)).toBeInTheDocument();
  });

  it('renders duration and price estimate', () => {
    render(<TravelCard itinerary={mockItinerary} />);
    expect(screen.getByText('7 days')).toBeInTheDocument();
    expect(screen.getByText('$2,800')).toBeInTheDocument();
  });

  it('renders all AI recommendations', () => {
    render(<TravelCard itinerary={mockItinerary} />);
    mockItinerary.AI_recommendations.forEach((rec) => {
      expect(screen.getByText(rec)).toBeInTheDocument();
    });
  });

  it('renders the Lumina Suggests badge', () => {
    render(<TravelCard itinerary={mockItinerary} />);
    expect(screen.getByText(/Lumina Suggests/i)).toBeInTheDocument();
  });

  it('renders the Book LBC Riding CTA button', () => {
    render(<TravelCard itinerary={mockItinerary} />);
    expect(
      screen.getByRole('button', { name: /Book LBC Riding to airport/i }),
    ).toBeInTheDocument();
  });

  it('calls onBookRiding with the destination when CTA is clicked', () => {
    const onBookRiding = vi.fn();
    render(<TravelCard itinerary={mockItinerary} onBookRiding={onBookRiding} />);
    fireEvent.click(screen.getByRole('button', { name: /Book LBC Riding to airport/i }));
    expect(onBookRiding).toHaveBeenCalledWith('Paris, France');
  });

  it('renders without crashing when onBookRiding is not provided', () => {
    render(<TravelCard itinerary={mockItinerary} />);
    expect(
      () => fireEvent.click(screen.getByRole('button', { name: /Book LBC Riding to airport/i })),
    ).not.toThrow();
  });

  it('renders DIAMOND CLASS label', () => {
    render(<TravelCard itinerary={mockItinerary} />);
    expect(screen.getByText(/DIAMOND CLASS/i)).toBeInTheDocument();
  });
});
