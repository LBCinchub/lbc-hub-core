import { Router } from 'express';
import type { MarketplaceProduct } from '@lbc/shared';

export const productsRouter = Router();

// GET /api/v1/products — placeholder
productsRouter.get('/', (_req, res) => {
  const products: Partial<MarketplaceProduct>[] = [
    {
      id: '1',
      title: '2.5ct Round Brilliant Lab Diamond Solitaire Ring 💍',
      category: 'LabDiamondJewelry',
      condition: 'New',
      price: { amount: 4999, currency: 'USD' },
      caratWeight: 2.5,
      metalType: 'Platinum',
      isAvailable: true,
      isFeatured: true,
    },
  ];
  res.json({ data: products });
});
