import featuredAuction from "@/assets/featured-auction.jpg";
import auctionSneakers from "@/assets/auction-sneakers.jpg";
import auctionCamera from "@/assets/auction-camera.jpg";
import auctionArt from "@/assets/auction-art.jpg";
import auctionVase from "@/assets/auction-vase.jpg";
import expBackstage from "@/assets/exp-backstage.jpg";
import expCooking from "@/assets/exp-cooking.jpg";
import expStudio from "@/assets/exp-studio.jpg";
import expCourtside from "@/assets/exp-courtside.jpg";

export interface Auction {
  id: string;
  title: string;
  image: string;
  creator: string;
  creatorAvatar: string;
  currentBid: number;
  bids: number;
  endsIn: string;
  isLive: boolean;
  watchers: number;
  category: string;
  type: "object" | "experience";
  description: string;
  startingPrice: number;
}

export const auctions: Auction[] = [
  {
    id: "signed-stratocaster",
    title: "Signed '59 Stratocaster — Tour Edition",
    image: featuredAuction,
    creator: "John Mayer",
    creatorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=John%20Mayer&backgroundColor=1d1d1f",
    currentBid: 8450,
    bids: 42,
    endsIn: "03:59:58",
    isLive: true,
    watchers: 128,
    category: "Music",
    type: "object",
    description: "A genuine 1959 Fender Stratocaster played and signed by John Mayer during his 2026 world tour. This one-of-a-kind instrument comes with a certificate of authenticity and a custom hardshell case. The guitar features a sunburst finish with visible wear from live performances.",
    startingPrice: 5000,
  },
  {
    id: "custom-air-max",
    title: "1-of-1 Custom Air Max — Hand-Painted",
    image: auctionSneakers,
    creator: "Virgil Studios",
    creatorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=Virgil%20Studios&backgroundColor=1d1d1f",
    currentBid: 3200,
    bids: 28,
    endsIn: "01:59:58",
    isLive: true,
    watchers: 89,
    category: "Fashion",
    type: "object",
    description: "A completely unique pair of Nike Air Max 1s, hand-painted by the Virgil Studios team. Each stroke tells a story — bold colors, intricate detailing, and a wearable piece of art. Size US 10. Comes with a signed certificate.",
    startingPrice: 1500,
  },
  {
    id: "polaroid-sx70",
    title: "Vintage Polaroid SX-70 — Restored & Signed",
    image: auctionCamera,
    creator: "RetroTech Co",
    creatorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=RetroTech%20Co&backgroundColor=1d1d1f",
    currentBid: 420,
    bids: 31,
    endsIn: "01:29:58",
    isLive: true,
    watchers: 112,
    category: "Collectibles",
    type: "object",
    description: "A meticulously restored Polaroid SX-70, brought back to pristine working condition. Signed by the restoration artist. Includes 2 packs of Polaroid film and a leather carrying case.",
    startingPrice: 200,
  },
  {
    id: "vip-backstage",
    title: "VIP Backstage — NYC Show Dec 2026",
    image: expBackstage,
    creator: "The Weeknd",
    creatorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=The%20Weeknd&backgroundColor=1d1d1f",
    currentBid: 5100,
    bids: 54,
    endsIn: "05:59:58",
    isLive: true,
    watchers: 234,
    category: "Music",
    type: "experience",
    description: "Full VIP backstage access to The Weeknd's sold-out NYC show in December 2026. Meet the artist, watch soundcheck, and enjoy the show from an exclusive viewing area. Includes 2 tickets, backstage passes, and a signed poster.",
    startingPrice: 2000,
  },
  {
    id: "cooking-masterclass",
    title: "Private Cooking Masterclass",
    image: expCooking,
    creator: "Chef Marcus",
    creatorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=Chef%20Marcus&backgroundColor=1d1d1f",
    currentBid: 1200,
    bids: 12,
    endsIn: "48:04:00",
    isLive: false,
    watchers: 45,
    category: "Culinary",
    type: "experience",
    description: "A private 3-hour cooking masterclass with Chef Marcus at his Brooklyn studio. Learn his signature techniques, enjoy the meal together, and take home a signed cookbook. Limited to 4 guests.",
    startingPrice: 500,
  },
  {
    id: "studio-visit",
    title: "Personal Studio Visit & Art Session",
    image: expStudio,
    creator: "Maya Chen Art",
    creatorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=Maya%20Chen%20Art&backgroundColor=1d1d1f",
    currentBid: 3400,
    bids: 22,
    endsIn: "36:12:00",
    isLive: true,
    watchers: 67,
    category: "Art",
    type: "experience",
    description: "Spend an afternoon in Maya Chen's private studio. Get a behind-the-scenes look at her creative process, paint together, and walk away with a co-created piece. Includes lunch and a signed print.",
    startingPrice: 1000,
  },
  {
    id: "courtside-seats",
    title: "Courtside Seats + Meet & Greet",
    image: expCourtside,
    creator: "All-Star Foundation",
    creatorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=All-Star%20Foundation&backgroundColor=1d1d1f",
    currentBid: 8200,
    bids: 38,
    endsIn: "03:45:00",
    isLive: true,
    watchers: 156,
    category: "Sports",
    type: "experience",
    description: "Two courtside seats at a premier basketball game, plus a private meet & greet with select players. Includes VIP parking, locker room tour, and signed memorabilia.",
    startingPrice: 3000,
  },
  {
    id: "digital-dreams",
    title: "Original Canvas — 'Digital Dreams' 48×36",
    image: auctionArt,
    creator: "Maya Chen Art",
    creatorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=Maya%20Chen%20Art&backgroundColor=1d1d1f",
    currentBid: 1850,
    bids: 15,
    endsIn: "07:59:58",
    isLive: false,
    watchers: 45,
    category: "Art",
    type: "object",
    description: "An original 48×36 inch canvas painting from Maya Chen's 'Digital Dreams' series. Mixed media on canvas with vibrant colors and intricate digital-inspired patterns. Comes framed and ready to hang.",
    startingPrice: 800,
  },
  {
    id: "ceramic-vase",
    title: "Handcrafted Ceramic Vase — 'Earth Series' #7",
    image: auctionVase,
    creator: "Studio Kintsugi",
    creatorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=Studio%20Kintsugi&backgroundColor=1d1d1f",
    currentBid: 680,
    bids: 9,
    endsIn: "23:59:58",
    isLive: false,
    watchers: 23,
    category: "Art",
    type: "object",
    description: "Number 7 in the limited 'Earth Series' — a handcrafted ceramic vase with natural earth-tone glazes and kintsugi-inspired gold repair details. Each piece is unique. Approximately 14 inches tall.",
    startingPrice: 300,
  },
  {
    id: "prototype-shoe",
    title: "Prototype Running Shoe — Never Released",
    image: auctionSneakers,
    creator: "AthleteLab",
    creatorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=AthleteLab&backgroundColor=1d1d1f",
    currentBid: 1450,
    bids: 19,
    endsIn: "11:59:58",
    isLive: false,
    watchers: 67,
    category: "Fashion",
    type: "object",
    description: "An unreleased prototype running shoe from AthleteLab's R&D department. This shoe never made it to production — making it a true collector's item. Size US 10.",
    startingPrice: 500,
  },
  {
    id: "hasselblad-500c",
    title: "Limited Hasselblad 500C — Film Legend",
    image: auctionCamera,
    creator: "CameraVault",
    creatorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=CameraVault&backgroundColor=1d1d1f",
    currentBid: 2100,
    bids: 22,
    endsIn: "04:59:58",
    isLive: true,
    watchers: 78,
    category: "Collectibles",
    type: "object",
    description: "A beautifully preserved Hasselblad 500C — the camera that went to the moon. Comes with a Zeiss 80mm f/2.8 lens, film back, and original leather case. Fully functional.",
    startingPrice: 1000,
  },
];

export interface Creator {
  id: string;
  name: string;
  category: string;
  avatar: string;
  auctions: number;
  followers: string;
  rating: number;
}

export const creators: Creator[] = [
  { id: "maya-chen", name: "Maya Chen", category: "Visual Artist", avatar: "MC", auctions: 24, followers: "45K", rating: 4.9 },
  { id: "the-weeknd", name: "The Weeknd", category: "Music", avatar: "TW", auctions: 8, followers: "2.1M", rating: 4.9 },
  { id: "virgil-studios", name: "Virgil Studios", category: "Fashion", avatar: "VS", auctions: 12, followers: "320K", rating: 4.9 },
  { id: "retrotech", name: "RetroTech Co", category: "Collectibles", avatar: "RT", auctions: 56, followers: "89K", rating: 4.9 },
  { id: "chef-marcus", name: "Chef Marcus", category: "Culinary", avatar: "CM", auctions: 6, followers: "210K", rating: 4.9 },
  { id: "athletelab", name: "AthleteLab", category: "Sports", avatar: "AL", auctions: 18, followers: "150K", rating: 4.9 },
];
