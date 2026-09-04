/**
 * Farm2Fair — Central Mock Database & Schema
 * Designed for SIH 2026 prototype, ready for MongoDB/PostgreSQL & Node.js/FastAPI backend integration.
 */

export const mockDb = {
  users: [
    {
      id: 'usr-f-1',
      name: 'Ramesh Patel',
      role: 'farmer',
      phone: '+91 98450 12345',
      email: 'ramesh.patel@kolarfarms.in',
      location: 'Kolar, Karnataka',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      farmSize: '4.5 Acres',
      rating: 4.9,
      totalSoldKg: 14200
    },
    {
      id: 'usr-f-2',
      name: 'Suresh Gowda',
      role: 'farmer',
      phone: '+91 98450 67890',
      email: 'suresh.gowda@malurfarms.in',
      location: 'Malur, Karnataka (8 km from Kolar)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      farmSize: '3 Acres',
      rating: 4.8,
      totalSoldKg: 9500
    },
    {
      id: 'usr-b-1',
      name: 'Green Valley Fresh Supermarkets',
      role: 'buyer',
      type: 'Supermarket Chain',
      phone: '+91 80 2345 6789',
      email: 'procure@greenvalleyfresh.com',
      location: 'Bengaluru East Distribution Hub',
      contactPerson: 'Arun Varma (Procurement Head)',
      verified: true
    },
    {
      id: 'usr-b-2',
      name: 'SpiceCraft Cloud Kitchens & Restaurants',
      role: 'buyer',
      type: 'Restaurant / Cloud Kitchen',
      phone: '+91 80 4455 1122',
      email: 'chef@spicecraftkitchens.com',
      location: 'Indiranagar, Bengaluru',
      contactPerson: 'Chef Meenakshi Sundaram',
      verified: true
    },
    {
      id: 'usr-c-1',
      name: 'Priya Sharma',
      role: 'consumer',
      phone: '+91 99887 76655',
      email: 'priya.sharma@example.com',
      location: 'Whitefield, Bengaluru',
      verified: true
    },
    {
      id: 'usr-a-1',
      name: 'SIH Platform Monitor (Admin)',
      role: 'admin',
      phone: '+91 11 2026 8888',
      email: 'admin@farm2fair.gov.in.demo',
      location: 'New Delhi HQ',
      verified: true
    }
  ],

  crops: [
    {
      id: 'crop-101',
      farmerId: 'usr-f-1',
      farmerName: 'Ramesh Patel',
      farmerLocation: 'Kolar, Karnataka',
      crop: 'Hybrid Tomato (Sahu Red)',
      category: 'Vegetables',
      quantity: 500,
      unit: 'kg',
      quality: 'Grade A (Firm, Uniform Size)',
      farmerPrice: 28.00,
      aiSuggestedMin: 28.00,
      aiSuggestedMax: 34.00,
      harvestDate: '2026-09-02',
      distanceKm: 42,
      shelfLifeDays: 8,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      status: 'active',
      description: 'Vine-ripened, naturally cultivated Grade-A tomatoes with high shelf-life, ready for bulk pickup or retail distribution.'
    },
    {
      id: 'crop-102',
      farmerId: 'usr-f-1',
      farmerName: 'Ramesh Patel',
      farmerLocation: 'Kolar, Karnataka',
      crop: 'Red Onion (Bellary Medium)',
      category: 'Vegetables',
      quantity: 1200,
      unit: 'kg',
      quality: 'Grade A (Well-cured)',
      farmerPrice: 24.50,
      aiSuggestedMin: 24.00,
      aiSuggestedMax: 29.00,
      harvestDate: '2026-08-28',
      distanceKm: 42,
      shelfLifeDays: 45,
      image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
      status: 'active',
      description: 'Sun-dried and sorted Bellary red onions. Low moisture content suitable for storage or immediate distribution.'
    },
    {
      id: 'crop-103',
      farmerId: 'usr-f-2',
      farmerName: 'Suresh Gowda',
      farmerLocation: 'Malur, Karnataka',
      crop: 'Fresh Green Chillies (G4)',
      category: 'Vegetables',
      quantity: 300,
      unit: 'kg',
      quality: 'Grade A (Sharp Pungency)',
      farmerPrice: 42.00,
      aiSuggestedMin: 40.00,
      aiSuggestedMax: 48.00,
      harvestDate: '2026-09-03',
      distanceKm: 34,
      shelfLifeDays: 12,
      image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80',
      status: 'active',
      description: 'Crisp, hot green chillies harvested this morning. Ideal for restaurants, hotels, and spice processing.'
    },
    {
      id: 'crop-104',
      farmerId: 'usr-f-2',
      farmerName: 'Suresh Gowda',
      farmerLocation: 'Malur, Karnataka',
      crop: 'Potatoes (Jyoti Grade-1)',
      category: 'Vegetables',
      quantity: 1800,
      unit: 'kg',
      quality: 'Grade A (Unblemished)',
      farmerPrice: 21.00,
      aiSuggestedMin: 20.00,
      aiSuggestedMax: 25.00,
      harvestDate: '2026-08-25',
      distanceKm: 34,
      shelfLifeDays: 30,
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
      status: 'active',
      description: 'Clean, sorted table-variety potatoes. High dry-matter content preferred by cloud kitchens and supermarkets.'
    },
    {
      id: 'crop-105',
      farmerId: 'usr-f-1',
      farmerName: 'Ramesh Patel',
      farmerLocation: 'Kolar, Karnataka',
      crop: 'Organic Turmeric Rhizomes',
      category: 'Spices',
      quantity: 450,
      unit: 'kg',
      quality: 'Premium Curcumin > 3.8%',
      farmerPrice: 85.00,
      aiSuggestedMin: 82.00,
      aiSuggestedMax: 98.00,
      harvestDate: '2026-08-15',
      distanceKm: 42,
      shelfLifeDays: 180,
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
      status: 'active',
      description: 'Naturally grown raw turmeric fingers with rich aromatic oils and high active curcumin.'
    },
    {
      id: 'crop-106',
      farmerId: 'usr-f-2',
      farmerName: 'Suresh Gowda',
      farmerLocation: 'Malur, Karnataka',
      crop: 'Basmati Paddy Grain (Pusa 1121)',
      category: 'Grains',
      quantity: 2500,
      unit: 'kg',
      quality: 'Grade A (Moisture < 12%)',
      farmerPrice: 38.50,
      aiSuggestedMin: 37.00,
      aiSuggestedMax: 43.00,
      harvestDate: '2026-08-10',
      distanceKm: 34,
      shelfLifeDays: 365,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
      status: 'active',
      description: 'Long grain aged aromatic paddy. Directly sourced from certified growers.'
    }
  ],

  buyers: [
    {
      id: 'byr-01',
      name: 'Green Valley Fresh Supermarkets',
      type: 'Supermarket Chain (8 Outlets)',
      location: 'Bengaluru East Distribution Hub',
      distanceKm: 38,
      matchScore: 94,
      preferredCrops: ['Hybrid Tomato (Sahu Red)', 'Red Onion (Bellary Medium)', 'Potatoes (Jyoti Grade-1)'],
      requiredVolumeKg: 600,
      maxPriceTolerance: 33.50,
      deliveryWindow: 'Within 24 Hours',
      reasons: [
        'High demand for Grade-A Tomatoes (600 kg requested)',
        'Direct logistic corridor along NH-75 (Kolar → Bengaluru)',
        'Accepts AI Fair-Price corridor without delay',
        'Guaranteed next-day electronic settlement'
      ]
    },
    {
      id: 'byr-02',
      name: 'SpiceCraft Cloud Kitchens',
      type: 'Hospitality / Food Chain',
      location: 'Indiranagar & Whitefield Hub',
      distanceKm: 44,
      matchScore: 89,
      preferredCrops: ['Hybrid Tomato (Sahu Red)', 'Fresh Green Chillies (G4)', 'Red Onion (Bellary Medium)'],
      requiredVolumeKg: 350,
      maxPriceTolerance: 34.00,
      deliveryWindow: 'Next Morning 6:00 AM',
      reasons: [
        'Requires 350 kg firm tomatoes + 50 kg chillies',
        'Direct bulk kitchen consumption',
        'Offers premium for same-day morning harvest',
        'Can combine pickup with nearby Malur farm'
      ]
    },
    {
      id: 'byr-03',
      name: 'Aroma Food Processors Ltd.',
      type: 'Food Processing / Puree Plant',
      location: 'Hosakote Industrial Area',
      distanceKm: 26,
      matchScore: 82,
      preferredCrops: ['Hybrid Tomato (Sahu Red)', 'Red Onion (Bellary Medium)'],
      requiredVolumeKg: 1500,
      maxPriceTolerance: 30.00,
      deliveryWindow: 'Within 3 Days',
      reasons: [
        'Very close location (26 km)',
        'High volume intake capacity',
        'Takes both Grade A & B for puree extraction',
        'Ideal backup partner for large harvests'
      ]
    },
    {
      id: 'byr-04',
      name: 'Koramangala Community Organic Co-op',
      type: 'Consumer Co-operative',
      location: 'Koramangala, Bengaluru',
      distanceKm: 48,
      matchScore: 78,
      preferredCrops: ['Hybrid Tomato (Sahu Red)', 'Organic Turmeric Rhizomes'],
      requiredVolumeKg: 200,
      maxPriceTolerance: 36.00,
      deliveryWindow: 'Weekend Delivery',
      reasons: [
        'Willing to pay premium fair price',
        'Direct consumer visibility for farmer brand',
        'Requires smaller batches'
      ]
    }
  ],

  transportationPools: [
    {
      id: 'tr-pool-01',
      clusterName: 'Kolar - Malur Agri Corridor',
      destination: 'Bengaluru East Central Hub (Whitefield/K.R. Puram)',
      farmers: [
        { name: 'Ramesh Patel', village: 'Vokkaleri, Kolar', crop: 'Tomatoes', qty: 500 },
        { name: 'Suresh Gowda', village: 'Torlakki, Malur', crop: 'Green Chillies', qty: 300 },
        { name: 'Venkatesh R.', village: 'Tekal, Malur', crop: 'Capsicum', qty: 400 }
      ],
      totalPayloadKg: 1200,
      vehicleCapacityKg: 1500,
      capacityUtilization: '80%',
      vehicleType: 'Tata 407 Eco-Agri Van',
      totalRouteKm: 58,
      individualTransportCostTotal: 4600,
      pooledTransportCostTotal: 2850,
      farmerCostSavingsPercent: 38,
      status: 'Ready for Dispatch',
      estimatedDeparture: 'Today, 4:30 PM'
    }
  ],

  priceBreakdownData: {
    'Hybrid Tomato (Sahu Red)': {
      farmerShare: 28.00,
      transportation: 3.20,
      storageHandling: 1.80,
      platformService: 1.00,
      finalConsumerPrice: 34.00,
      traditionalMiddlemanPrice: 46.00,
      farmerGainPercent: '+33%',
      consumerSavingPercent: '-26%'
    },
    'Red Onion (Bellary Medium)': {
      farmerShare: 24.50,
      transportation: 2.80,
      storageHandling: 2.20,
      platformService: 1.00,
      finalConsumerPrice: 30.50,
      traditionalMiddlemanPrice: 42.00,
      farmerGainPercent: '+28%',
      consumerSavingPercent: '-27%'
    },
    'Fresh Green Chillies (G4)': {
      farmerShare: 42.00,
      transportation: 3.50,
      storageHandling: 2.50,
      platformService: 1.50,
      finalConsumerPrice: 49.50,
      traditionalMiddlemanPrice: 65.00,
      farmerGainPercent: '+31%',
      consumerSavingPercent: '-24%'
    },
    'Potatoes (Jyoti Grade-1)': {
      farmerShare: 21.00,
      transportation: 2.50,
      storageHandling: 2.00,
      platformService: 0.90,
      finalConsumerPrice: 26.40,
      traditionalMiddlemanPrice: 36.00,
      farmerGainPercent: '+25%',
      consumerSavingPercent: '-27%'
    }
  },

  demandForecasts: [
    {
      crop: 'Tomatoes',
      demandLevel: 'High',
      confidence: '89%',
      trend: 'Upward (+14% over 2 weeks)',
      seasonality: 'Early Festive Surge (Navratri preparation)',
      buyerInquiriesToday: 38,
      priceOutlook: 'Strong corridor (₹29 - ₹35/kg)'
    },
    {
      crop: 'Red Onions',
      demandLevel: 'High',
      confidence: '86%',
      trend: 'Stable / High Demand',
      seasonality: 'Monsoon buffer stocking by urban buyers',
      buyerInquiriesToday: 54,
      priceOutlook: 'Tight supply expected (₹25 - ₹31/kg)'
    },
    {
      crop: 'Green Chillies',
      demandLevel: 'Medium',
      confidence: '82%',
      trend: 'Moderate (+5%)',
      seasonality: 'Normal consumption pattern',
      buyerInquiriesToday: 19,
      priceOutlook: 'Balanced (₹40 - ₹46/kg)'
    },
    {
      crop: 'Potatoes',
      demandLevel: 'Medium-High',
      confidence: '84%',
      trend: 'Slight Rise (+8%)',
      seasonality: 'Continuous institutional kitchen demand',
      buyerInquiriesToday: 42,
      priceOutlook: 'Steady (₹21 - ₹26/kg)'
    }
  ],

  unsoldRescueOptions: [
    {
      channel: 'Local Food Processing & Sauce Units',
      suitability: 'Very High (for 2nd grade / surplus ripe tomatoes & fruits)',
      priceRealization: '70% - 85% of fresh market price',
      turnaround: 'Within 12 - 24 Hours',
      icon: 'factory'
    },
    {
      channel: 'High-Volume Commercial Kitchens & Caterers',
      suitability: 'High (for immediate next-day consumption)',
      priceRealization: '75% - 90% of fresh market price',
      turnaround: 'Same day evening delivery',
      icon: 'utensils'
    },
    {
      channel: 'NGOs & Community Food Rescue Partners',
      suitability: 'High (preventing total post-harvest spoilage waste)',
      priceRealization: 'Subsidized community purchase / logistics reimbursement',
      turnaround: 'Immediate pickup',
      icon: 'heart'
    },
    {
      channel: 'Livestock Feed & Organic Compost Processors',
      suitability: 'Medium-Low (for over-ripe / damaged surplus)',
      priceRealization: 'Base salvage value (₹3 - ₹7/kg)',
      turnaround: 'Within 48 Hours',
      icon: 'sprout'
    }
  ],

  orders: [
    {
      id: 'ord-901',
      cropId: 'crop-101',
      cropName: 'Hybrid Tomato (Sahu Red)',
      farmerName: 'Ramesh Patel',
      buyerName: 'Green Valley Fresh Supermarkets',
      quantity: 500,
      unit: 'kg',
      farmerPricePerKg: 28.00,
      totalAmount: 14000.00,
      status: 'In Shared Logistics Transit',
      orderDate: '2026-09-04 09:30 AM',
      deliveryAddress: 'Bengaluru East Central Hub, KR Puram'
    },
    {
      id: 'ord-902',
      cropId: 'crop-103',
      cropName: 'Fresh Green Chillies (G4)',
      farmerName: 'Suresh Gowda',
      buyerName: 'SpiceCraft Cloud Kitchens',
      quantity: 150,
      unit: 'kg',
      farmerPricePerKg: 42.00,
      totalAmount: 6300.00,
      status: 'Confirmed - Awaiting Pickup',
      orderDate: '2026-09-04 10:15 AM',
      deliveryAddress: 'SpiceCraft Central Kitchen, Indiranagar'
    }
  ],

  adminMetrics: {
    totalFarmers: 142,
    activeBuyers: 38,
    activeListings: 86,
    activeOrders: 29,
    activeSharedTransitRuns: 7,
    totalLogisticsSavingsRupees: '₹1,48,200',
    unsoldProduceRescuedKg: '18,500 kg',
    recentActivity: [
      { time: '10 mins ago', text: 'New crop listed: 500 kg Tomatoes by Ramesh Patel (Kolar)' },
      { time: '18 mins ago', text: 'AI Fair Price Corridor predicted: ₹28 - ₹34/kg for Kolar Tomatoes' },
      { time: '25 mins ago', text: 'Green Valley Fresh Supermarket matched with 94% fit score' },
      { time: '38 mins ago', text: 'Shared transport route #TR-01 clustered (Kolar + Malur farmers)' },
      { time: '52 mins ago', text: 'Price transparency report generated for Order #ORD-901' }
    ]
  }
};
