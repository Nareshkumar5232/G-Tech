import { Product } from '@/types';

export const initialProducts: Product[] = [
  // New Laptops
  {
    id: '1',
    name: 'Dell XPS 15',
    category: 'New Laptops',
    condition: 'New',
    price: 125000,
    description: 'Premium ultrabook with stunning display and powerful performance',
    specs: [
      'Intel Core i7 13th Gen',
      '16GB DDR5 RAM',
      '512GB NVMe SSD',
      '15.6" FHD Display',
      'NVIDIA RTX 3050 4GB'
    ],
    images: [
      'https://images.unsplash.com/photo-1759668358660-0d06064f0f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjgyNDY1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1762341116197-fb94a4f37173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxhcHRvcCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjgyODczMTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    brand: 'Dell',
    location: 'Chennai',
    createdAt: '2026-01-10T10:30:00Z',
    featured: true
  },
  {
    id: '2',
    name: 'HP Pavilion Gaming',
    category: 'New Laptops',
    condition: 'New',
    price: 85000,
    description: 'High-performance gaming laptop with RGB keyboard',
    specs: [
      'AMD Ryzen 7 5800H',
      '16GB DDR4 RAM',
      '512GB SSD + 1TB HDD',
      '15.6" FHD 144Hz',
      'NVIDIA GTX 1650 4GB'
    ],
    images: [
      'https://images.unsplash.com/photo-1640955014216-75201056c829?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBsYXB0b3B8ZW58MXx8fHwxNzY4MjczMDc5fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    brand: 'HP',
    location: 'Chennai',
    createdAt: '2026-01-11T14:20:00Z',
    featured: true
  },
  {
    id: '3',
    name: 'Lenovo ThinkPad E14',
    category: 'New Laptops',
    condition: 'New',
    price: 65000,
    description: 'Business-class laptop with enterprise-grade security',
    specs: [
      'Intel Core i5 12th Gen',
      '8GB DDR4 RAM',
      '256GB NVMe SSD',
      '14" FHD Display',
      'Intel Iris Xe Graphics'
    ],
    images: [
      'https://images.unsplash.com/photo-1759668358660-0d06064f0f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjgyNDY1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    brand: 'Lenovo',
    location: 'Coimbatore',
    createdAt: '2026-01-09T09:15:00Z'
  },
  {
    id: '4',
    name: 'ASUS VivoBook 15',
    category: 'New Laptops',
    condition: 'New',
    price: 48000,
    description: 'Affordable and reliable laptop for everyday computing',
    specs: [
      'Intel Core i3 11th Gen',
      '8GB DDR4 RAM',
      '256GB SSD',
      '15.6" HD Display',
      'Intel UHD Graphics'
    ],
    images: [
      'https://images.unsplash.com/photo-1762341116197-fb94a4f37173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxhcHRvcCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjgyODczMTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    brand: 'ASUS',
    location: 'Chennai',
    createdAt: '2026-01-12T11:00:00Z'
  },

  // Used Laptops
  {
    id: '5',
    name: 'Dell Latitude 7490',
    category: 'Used Laptops',
    condition: 'Used',
    price: 35000,
    description: 'Refurbished business laptop in excellent condition',
    specs: [
      'Intel Core i5 8th Gen',
      '8GB DDR4 RAM',
      '256GB SSD',
      '14" FHD Display',
      'Tested & Certified'
    ],
    images: [
      'https://images.unsplash.com/photo-1759668358660-0d06064f0f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjgyNDY1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    brand: 'Dell',
    location: 'Madurai',
    createdAt: '2026-01-08T16:45:00Z',
    featured: true
  },
  {
    id: '6',
    name: 'HP EliteBook 840 G5',
    category: 'Used Laptops',
    condition: 'Used',
    price: 32000,
    description: 'Premium business laptop with solid build quality',
    specs: [
      'Intel Core i5 8th Gen',
      '8GB DDR4 RAM',
      '256GB SSD',
      '14" FHD Display',
      '6 Months Warranty'
    ],
    images: [
      'https://images.unsplash.com/photo-1762341116197-fb94a4f37173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxhcHRvcCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjgyODczMTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    brand: 'HP',
    location: 'Chennai',
    createdAt: '2026-01-07T13:20:00Z'
  },
  {
    id: '7',
    name: 'Lenovo ThinkPad T480',
    category: 'Used Laptops',
    condition: 'Used',
    price: 28000,
    description: 'Durable ThinkPad with legendary keyboard',
    specs: [
      'Intel Core i5 8th Gen',
      '8GB DDR4 RAM',
      '256GB SSD',
      '14" FHD Display',
      'Good Battery Backup'
    ],
    images: [
      'https://images.unsplash.com/photo-1759668358660-0d06064f0f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjgyNDY1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    brand: 'Lenovo',
    location: 'Tiruchirappalli',
    createdAt: '2026-01-06T10:30:00Z'
  },

  // Accessories
  {
    id: '8',
    name: 'Logitech MX Master 3',
    category: 'Accessories',
    condition: 'New',
    price: 8500,
    description: 'Advanced wireless mouse for professionals',
    specs: [
      'Wireless Connectivity',
      'Ergonomic Design',
      'Customizable Buttons',
      'Long Battery Life',
      '1 Year Warranty'
    ],
    images: [
      'https://images.unsplash.com/photo-1599696978819-f7accae35356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMG1vdXNlJTIwaGVhZHBob25lc3xlbnwxfHx8fDE3NjgyODczMTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    brand: 'Other',
    location: 'Chennai',
    createdAt: '2026-01-13T08:00:00Z'
  },
  {
    id: '9',
    name: 'Mechanical Keyboard RGB',
    category: 'Accessories',
    condition: 'New',
    price: 4500,
    description: 'Gaming keyboard with RGB backlight',
    specs: [
      'Mechanical Switches',
      'RGB Backlighting',
      'Anti-Ghosting',
      'Durable Build',
      'USB Connection'
    ],
    images: [
      'https://images.unsplash.com/photo-1722437697506-2f42ab2ec3ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGFjY2Vzc29yaWVzJTIwa2V5Ym9hcmR8ZW58MXx8fHwxNzY4Mjg3MzEzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    brand: 'Other',
    location: 'Salem',
    createdAt: '2026-01-11T15:30:00Z'
  },
  {
    id: '10',
    name: 'Wireless Headphones',
    category: 'Accessories',
    condition: 'New',
    price: 3200,
    description: 'Comfortable headphones with noise cancellation',
    specs: [
      'Bluetooth 5.0',
      'Noise Cancellation',
      '20hr Battery Life',
      'Foldable Design',
      'Built-in Microphone'
    ],
    images: [
      'https://images.unsplash.com/photo-1599696978819-f7accae35356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMG1vdXNlJTIwaGVhZHBob25lc3xlbnwxfHx8fDE3NjgyODczMTV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    brand: 'Other',
    location: 'Chennai',
    createdAt: '2026-01-10T12:00:00Z',
    featured: true
  },
  {
    id: '14',
    name: 'Samsung 1TB NVMe SSD',
    category: 'Accessories',
    condition: 'New',
    price: 7500,
    description: 'High-speed solid state drive for lightning fast performance',
    specs: [
      '1TB Storage Capacity',
      'NVMe M.2 Interface',
      'Read: 3500 MB/s',
      'Write: 3000 MB/s',
      '5 Year Warranty'
    ],
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzc2QlMjBkcml2ZSUyMHN0b3JhZ2V8ZW58MXx8fHwxNzM2NzkxMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    brand: 'Samsung',
    location: 'Chennai',
    createdAt: '2026-01-13T09:00:00Z',
    featured: true
  },
  {
    id: '15',
    name: 'Crucial 16GB DDR4 RAM',
    category: 'Accessories',
    condition: 'New',
    price: 4200,
    description: 'Upgrade your laptop with high-performance memory',
    specs: [
      '16GB Capacity',
      'DDR4 3200MHz',
      'SO-DIMM Form Factor',
      'Low Voltage',
      'Lifetime Warranty'
    ],
    images: [
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW0lMjBtZW1vcnklMjBjb21wdXRlcnxlbnwxfHx8fDE3MzY3OTEyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    brand: 'Other',
    location: 'Chennai',
    createdAt: '2026-01-12T14:30:00Z',
    featured: true
  },
  {
    id: '16',
    name: 'Universal Laptop Charger 65W',
    category: 'Accessories',
    condition: 'New',
    price: 1200,
    description: 'Compatible with multiple laptop brands',
    specs: [
      '65W Power Output',
      'Multiple Pin Tips',
      'Dell, HP, Lenovo Compatible',
      'Compact Design',
      '6 Months Warranty'
    ],
    images: [
      'https://images.unsplash.com/photo-1625948515291-69613efd103f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjaGFyZ2VyJTIwYWRhcHRlcnxlbnwxfHx8fDE3MzY3OTEyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    brand: 'Other',
    location: 'Chennai',
    createdAt: '2026-01-13T10:15:00Z',
    featured: true
  },
  {
    id: '17',
    name: 'Premium Laptop Bag',
    category: 'Accessories',
    condition: 'New',
    price: 1800,
    description: 'Stylish and protective laptop bag with multiple compartments',
    specs: [
      'Fits 15.6" Laptops',
      'Water Resistant',
      'Padded Protection',
      'Multiple Pockets',
      'Adjustable Shoulder Strap'
    ],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBiYWclMjBiYWNrcGFja3xlbnwxfHx8fDE3MzY3OTEyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    brand: 'Other',
    location: 'Chennai',
    createdAt: '2026-01-11T16:00:00Z',
    featured: true
  },
  {
    id: '18',
    name: 'Wireless Gaming Mouse',
    category: 'Accessories',
    condition: 'New',
    price: 2500,
    description: 'Ergonomic wireless mouse with RGB lighting',
    specs: [
      'Wireless 2.4GHz',
      'RGB Backlight',
      '6 Programmable Buttons',
      'Adjustable DPI',
      'Rechargeable Battery'
    ],
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZSUyMHdpcmVsZXNzfGVufDF8fHx8MTczNjc5MTIwMHww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    brand: 'Other',
    location: 'Chennai',
    createdAt: '2026-01-13T11:30:00Z',
    featured: true
  },

  // Networking & CCTV
  {
    id: '11',
    name: '16-Port Network Switch',
    category: 'Networking & CCTV',
    condition: 'New',
    price: 8500,
    description: 'Gigabit Ethernet switch for office networks',
    specs: [
      '16 Gigabit Ports',
      'Plug & Play',
      'Metal Housing',
      'Auto-MDI/MDIX',
      'Fanless Design'
    ],
    images: [
      'https://images.unsplash.com/photo-1733810763720-4c83af0668ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwc2VydmVyJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2ODI4NzMxNHww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    brand: 'Other',
    location: 'Chennai',
    createdAt: '2026-01-09T14:15:00Z'
  },
  {
    id: '12',
    name: '4-Channel CCTV DVR System',
    category: 'Networking & CCTV',
    condition: 'New',
    price: 15000,
    description: 'Complete CCTV system with 4 cameras',
    specs: [
      '4 HD Cameras',
      'Night Vision',
      '1TB HDD Included',
      'Mobile App Access',
      'Motion Detection'
    ],
    images: [
      'https://images.unsplash.com/photo-1566060475410-1159300f046f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjY3R2JTIwc2VjdXJpdHklMjBjYW1lcmF8ZW58MXx8fHwxNzY4MjczMzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    brand: 'Other',
    location: 'Vellore',
    createdAt: '2026-01-08T09:45:00Z',
    featured: true
  },
  {
    id: '13',
    name: 'IP Camera 2MP',
    category: 'Networking & CCTV',
    condition: 'New',
    price: 4500,
    description: 'High-definition IP security camera',
    specs: [
      '1080p Resolution',
      'Night Vision 30m',
      'Weatherproof',
      'POE Support',
      'Mobile Viewing'
    ],
    images: [
      'https://images.unsplash.com/photo-1566060475410-1159300f046f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjY3R2JTIwc2VjdXJpdHklMjBjYW1lcmF8ZW58MXx8fHwxNzY4MjczMzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    brand: 'Other',
    location: 'Erode',
    createdAt: '2026-01-12T17:00:00Z'
  }
];
