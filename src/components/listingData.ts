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
