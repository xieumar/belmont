export interface FeatureCategory {
  category: string;
  items: string[];
}

export interface Room {
  id: string;
  name: string;
  price: string;
  shortDescription: string;
  longDescription: string;
  primaryImage: string;
  gallery: string[];
  amenities: string[]; // Keep for the summary list
  highlights: string[];
  features: FeatureCategory[];
  services: string[];
  policies: string[];
  size: string;
  occupancy: string;
  bedType: string;
}

export const rooms: Room[] = [
  {
    id: "deluxe-king",
    name: "Deluxe King Room",
    price: "$350 / night",
    shortDescription:
      "A spacious room with a king-size bed and stunning city views.",
    longDescription:
      "The Deluxe King Room offers a perfect blend of comfort and style. Featuring a plush king-size bed, a comfortable seating area, and floor-to-ceiling windows, this room is designed for relaxation. Enjoy modern amenities, a luxurious marble bathroom with a rain shower, and complimentary high-speed Wi-Fi.",
    primaryImage: "/room.jpg",
    gallery: ["/room1.jpg", "/room2.jpg", "/room3.jpg"],
    amenities: ["King Size Bed", "City View", "Free Wi-Fi", "Mini Bar"],
    highlights: [
      "Panoramic City Views",
      "Luxurious Marble Bathroom",
      "Spacious Work Area",
    ],
    features: [
      {
        category: "Bathroom",
        items: [
          "Rainfall showerhead",
          "Double vanity",
          "Luxury bath amenities",
          "Plush bathrobes & slippers",
          "Hairdryer",
        ],
      },
      {
        category: "Entertainment",
        items: [
          "55-inch Smart TV",
          "Premium cable channels",
          "Bluetooth speaker",
          "High-speed Wi-Fi",
        ],
      },
      {
        category: "Comfort",
        items: [
          "Premium bedding & linens",
          "Blackout curtains",
          "Individually controlled climate",
          "In-room safe",
          "Mini-bar",
        ],
      },
    ],
    services: [
      "Twice-daily housekeeping",
      "24/7 Room Service",
      "Complimentary bottled water",
      "Shoeshine service",
    ],
    policies: [
      "Check-in: 3:00 PM",
      "Check-out: 12:00 PM",
      "100% Non-smoking",
      "Pets are not allowed",
    ],
    size: "45 sq.m / 484 sq.ft",
    occupancy: "2 Adults",
    bedType: "1 King Bed",
  },
  {
    id: "ocean-view-suite",
    name: "Ocean View Suite",
    price: "$550 / night",
    shortDescription:
      "Elegant suite featuring panoramic ocean views and a private balcony.",
    longDescription:
      "Wake up to the sound of waves in our Ocean View Suite. This expansive suite features a separate living area, a private balcony overlooking the ocean, and bespoke furnishings. The luxurious bathroom includes a deep soaking tub and a walk-in shower. Perfect for extended stays or romantic getaways.",
    primaryImage: "/room1.jpg",
    gallery: ["/room.jpg", "/room4.jpg", "/room2.jpg"],
    amenities: [
      "Ocean View",
      "Private Balcony",
      "Separate Living Area",
      "Deep Soaking Tub",
    ],
    highlights: [
      "Direct Ocean Views",
      "Spacious Private Balcony",
      "Separate Living and Sleeping Areas",
    ],
    features: [
      {
        category: "Bathroom",
        items: [
          "Deep soaking tub",
          "Separate walk-in rain shower",
          "Luxury bath amenities",
          "Double vanity",
          "Plush bathrobes",
        ],
      },
      {
        category: "Entertainment",
        items: [
          "Two 65-inch Smart TVs",
          "Bose sound system",
          "High-speed Wi-Fi",
          "International channels",
        ],
      },
      {
        category: "Room Features",
        items: [
          "Espresso machine",
          "Dining table for two",
          "Walk-in closet",
          "Lounge seating",
        ],
      },
    ],
    services: [
      "Dedicated concierge",
      "Twice-daily housekeeping",
      "24/7 Room Service",
      "Welcome fruit basket",
    ],
    policies: [
      "Check-in: 3:00 PM",
      "Check-out: 12:00 PM",
      "100% Non-smoking",
      "Pets are not allowed",
    ],
    size: "65 sq.m / 700 sq.ft",
    occupancy: "2 Adults",
    bedType: "1 King Bed",
  },
  {
    id: "executive-twin",
    name: "Executive Twin Room",
    price: "$380 / night",
    shortDescription:
      "Ideal for business or leisure travelers requiring twin beds with premium amenities.",
    longDescription:
      "The Executive Twin Room provides ultimate comfort for friends or colleagues traveling together. With two premium twin beds, an ergonomic workspace, and access to the exclusive Executive Lounge, this room ensures a productive and relaxing stay.",
    primaryImage: "/room2.jpg",
    gallery: ["/room3.jpg", "/room1.jpg", "/room.jpg"],
    amenities: [
      "Two Twin Beds",
      "Executive Lounge Access",
      "Work Desk",
      "Free Wi-Fi",
    ],
    highlights: [
      "Exclusive Executive Lounge Access",
      "Ergonomic Workspace",
      "Premium Twin Beds",
    ],
    features: [
      {
        category: "Workspace",
        items: [
          "Ergonomic desk chair",
          "Large executive desk",
          "Multiple international power outlets",
          "High-speed wired & wireless internet",
        ],
      },
      {
        category: "Bathroom",
        items: [
          "Rainfall shower",
          "Luxury bath amenities",
          "Bathrobes & slippers",
        ],
      },
      {
        category: "Comfort",
        items: ["Premium bedding", "Blackout drapes", "Nespresso machine"],
      },
    ],
    services: [
      "Executive Lounge access (breakfast, evening cocktails)",
      "Complimentary pressing of one suit/dress",
      "Twice-daily housekeeping",
      "24/7 Room Service",
    ],
    policies: [
      "Check-in: 3:00 PM",
      "Check-out: 12:00 PM",
      "100% Non-smoking",
      "Children under 12 not permitted in Executive Lounge",
    ],
    size: "45 sq.m / 484 sq.ft",
    occupancy: "2 Adults",
    bedType: "2 Twin Beds",
  },
  {
    id: "belmont-penthouse",
    name: "The Belmont Penthouse",
    price: "$1,200 / night",
    shortDescription:
      "Our signature penthouse offering unparalleled luxury and space.",
    longDescription:
      "Experience the pinnacle of luxury in The Belmont Penthouse. Located on the top floor, this extraordinary suite features a grand living room, a dining area for six, a private terrace with a plunge pool, and breathtaking 360-degree views. Enjoy dedicated butler service and VIP amenities throughout your stay.",
    primaryImage: "/room3.jpg",
    gallery: ["/room4.jpg", "/room5.jpg", "/room1.jpg", "/room.jpg"],
    amenities: [
      "Private Terrace",
      "Plunge Pool",
      "Dedicated Butler",
      "Panoramic Views",
    ],
    highlights: [
      "Private Outdoor Plunge Pool",
      "Expansive 360-Degree Views",
      "Grand Entertaining Space",
    ],
    features: [
      {
        category: "Master Bathroom",
        items: [
          "Freestanding soaking tub with a view",
          "Dual walk-in rain showers",
          "Bespoke designer amenities",
          "Heated floors",
        ],
      },
      {
        category: "Living Space",
        items: [
          "Dining table for six",
          "Fully equipped kitchenette",
          "Baby grand piano",
          "Curated art collection",
        ],
      },
      {
        category: "Technology",
        items: [
          "Smart home iPad controls",
          "Bang & Olufsen sound system",
          "85-inch OLED TV",
        ],
      },
    ],
    services: [
      "24/7 Dedicated Butler Service",
      "Complimentary airport transfers",
      "Unpacking and packing service",
      "Private chef available upon request",
    ],
    policies: [
      "Check-in: Flexible",
      "Check-out: Flexible",
      "100% Non-smoking",
      "Events require prior management approval",
    ],
    size: "150 sq.m / 1614 sq.ft",
    occupancy: "2 Adults",
    bedType: "1 King Bed",
  },
  {
    id: "family-suite",
    name: "Family Garden Suite",
    price: "$480 / night",
    shortDescription:
      "Spacious suite designed for families, featuring direct garden access.",
    longDescription:
      "The Family Garden Suite is perfectly designed for those traveling with children. It features a spacious layout with a king bed and a separate alcove with twin beds. Step directly from your private patio into our lush gardens. The suite includes child-friendly amenities and ample space for everyone to relax.",
    primaryImage: "/room4.jpg",
    gallery: ["/room5.jpg", "/room.jpg", "/room2.jpg", "/room3.jpg"],
    amenities: [
      "Garden Access",
      "Private Patio",
      "Family Amenities",
      "Spacious Bathroom",
    ],
    highlights: [
      "Direct Access to Lush Gardens",
      "Private Outdoor Patio",
      "Dedicated Children's Alcove",
    ],
    features: [
      {
        category: "Family Layout",
        items: [
          "King bed for parents",
          "Separate alcove with two twin beds",
          "Child-proofing available",
          "Spacious open plan",
        ],
      },
      {
        category: "Outdoor Space",
        items: [
          "Private furnished patio",
          "Direct path to resort pools",
          "Outdoor dining area",
        ],
      },
      {
        category: "Bathroom",
        items: [
          "Large soaking tub",
          "Separate shower",
          "Kid-friendly bath amenities",
          "Step stools provided",
        ],
      },
    ],
    services: [
      "Complimentary kids' club access",
      "Babysitting services (arranged upon request)",
      "Twice-daily housekeeping",
      "Nightly turn-down service with treats",
    ],
    policies: [
      "Check-in: 3:00 PM",
      "Check-out: 12:00 PM",
      "100% Non-smoking",
      "Maximum 2 adults, 2 children",
    ],
    size: "80 sq.m / 860 sq.ft",
    occupancy: "2 Adults, 2 Children",
    bedType: "1 King, 2 Twins",
  },
  {
    id: "presidential-suite",
    name: "Presidential Suite",
    price: "$2,500 / night",
    shortDescription:
      "The ultimate Belmont experience with unparalleled luxury, space, and a private dining room.",
    longDescription:
      "Our Presidential Suite is the crown jewel of Belmont Hotel. Featuring a massive master bedroom, a private study, a grand dining room for 12, and a private cinema. This suite includes 24/7 dedicated butler service, complimentary airport transfers in a luxury vehicle, and exclusive access to all premium amenities.",
    primaryImage: "/room5.jpg",
    gallery: ["/room3.jpg", "/room1.jpg", "/room4.jpg"],
    amenities: [
      "Private Cinema",
      "Dining Room for 12",
      "Private Study",
      "Spa Bathroom",
    ],
    highlights: [
      "Private State-of-the-Art Cinema",
      "Grand Dining Room for 12",
      "Dedicated Private Study",
    ],
    features: [
      {
        category: "Exclusive Spaces",
        items: [
          "Private 8-seat cinema room",
          "Executive wood-paneled study",
          "Grand formal dining room",
          "Private fitness and massage room",
        ],
      },
      {
        category: "Master Sanctuary",
        items: [
          "Oversized King bed",
          "His-and-hers walk-in dressing rooms",
          "Private furnished balcony",
        ],
      },
      {
        category: "Spa Bathroom",
        items: [
          "Circular marble soaking tub",
          "Multi-jet steam shower",
          "Double vanities",
          "Exclusive Hermes amenities",
        ],
      },
    ],
    services: [
      "24/7 Dedicated VIP Butler Service",
      "Luxury vehicle airport transfers",
      "In-suite spa treatments available",
      "Priority bookings across the resort",
    ],
    policies: [
      "Check-in: Flexible",
      "Check-out: Flexible",
      "100% Non-smoking",
      "Deposit required at booking",
    ],
    size: "250 sq.m / 2690 sq.ft",
    occupancy: "2 Adults",
    bedType: "1 King Bed",
  },
];

export function getRoomById(id: string): Room | undefined {
  return rooms.find((room) => room.id === id);
}
