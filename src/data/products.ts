import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Radiant Glow Foundation',
    price: 42.99,
    originalPrice: 52.99,
    description: 'A lightweight, buildable foundation that provides natural-looking coverage with a radiant finish. Infused with skin-loving ingredients.',
    category: 'Foundation',
    image: 'https://images.pexels.com/photos/3373725/pexels-photo-3373725.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3373725/pexels-photo-3373725.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/3763855/pexels-photo-3763855.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    tags: ['bestseller', 'vegan', 'cruelty-free'],
    featured: true
  },
  {
    id: '2',
    name: 'Velvet Matte Lipstick',
    price: 24.99,
    description: 'Long-lasting, highly pigmented matte lipstick that feels comfortable on the lips. Available in 12 stunning shades.',
    category: 'Lipstick',
    image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    tags: ['vegan', 'long-lasting'],
    featured: true
  },
  {
    id: '3',
    name: 'Brightening Eye Cream',
    price: 35.99,
    description: 'Revitalizing eye cream that reduces dark circles and puffiness while providing intense hydration.',
    category: 'Skincare',
    image: 'https://images.pexels.com/photos/3373744/pexels-photo-3373744.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3373744/pexels-photo-3373744.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    tags: ['hydrating', 'anti-aging']
  },
  {
    id: '4',
    name: 'Waterproof Mascara',
    price: 19.99,
    description: 'Volume-building, waterproof mascara that lengthens and defines lashes without clumping.',
    category: 'Mascara',
    image: 'https://images.pexels.com/photos/3373715/pexels-photo-3373715.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3373715/pexels-photo-3373715.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/3735780/pexels-photo-3735780.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.5,
    reviewCount: 203,
    inStock: true,
    tags: ['waterproof', 'volumizing']
  },
  {
    id: '5',
    name: 'Highlighting Palette',
    price: 29.99,
    description: 'Multi-dimensional highlighting palette with 4 complementary shades for a natural, luminous glow.',
    category: 'Highlighter',
    image: 'https://images.pexels.com/photos/3373722/pexels-photo-3373722.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3373722/pexels-photo-3373722.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/3735761/pexels-photo-3735761.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.9,
    reviewCount: 87,
    inStock: true,
    tags: ['multi-use', 'glowing']
  },
  {
    id: '6',
    name: 'Cleansing Oil',
    price: 28.99,
    description: 'Gentle yet effective cleansing oil that removes makeup and impurities while nourishing the skin.',
    category: 'Skincare',
    image: 'https://images.pexels.com/photos/3373748/pexels-photo-3373748.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3373748/pexels-photo-3373748.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/3735658/pexels-photo-3735658.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.4,
    reviewCount: 142,
    inStock: true,
    tags: ['gentle', 'nourishing']
  },
  {
    id: '7',
    name: 'Eyeshadow Palette',
    price: 39.99,
    originalPrice: 49.99,
    description: 'Professional 12-shade eyeshadow palette with matte and shimmer finishes for endless looks.',
    category: 'Eyeshadow',
    image: 'https://images.pexels.com/photos/3373717/pexels-photo-3373717.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3373717/pexels-photo-3373717.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/3735775/pexels-photo-3735775.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.6,
    reviewCount: 198,
    inStock: true,
    tags: ['professional', 'versatile'],
    featured: true
  },
  {
    id: '8',
    name: 'Cream Blush',
    price: 22.99,
    description: 'Buildable cream blush that blends seamlessly for a natural, healthy flush of color.',
    category: 'Blush',
    image: 'https://images.pexels.com/photos/3373719/pexels-photo-3373719.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3373719/pexels-photo-3373719.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/3735773/pexels-photo-3735773.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.3,
    reviewCount: 76,
    inStock: true,
    tags: ['buildable', 'natural']
  }
];

export const categories = [
  'All',
  'Foundation',
  'Lipstick',
  'Skincare',
  'Mascara',
  'Highlighter',
  'Eyeshadow',
  'Blush'
];