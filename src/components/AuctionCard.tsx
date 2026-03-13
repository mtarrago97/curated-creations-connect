import { Eye, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import LiveBadge from "./LiveBadge";
import type { Auction } from "@/data/auctions";

interface AuctionCardProps {
  auction: Auction;
  featured?: boolean;
}

const AuctionCard = ({ auction, featured }: AuctionCardProps) => {
  return (
    <Link
      to={`/auction/${auction.id}`}
      className={`group block overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg ${
        featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""
      }`}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={auction.image}
          alt={auction.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          {auction.isLive && <LiveBadge />}
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-foreground/60 px-2 py-1 text-xs text-primary-foreground backdrop-blur-sm">
          <Eye className="h-3 w-3" />
          {auction.watchers}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <img
            src={auction.creatorAvatar}
            alt={auction.creator}
            className="h-6 w-6 rounded-full"
          />
          <span className="text-xs text-muted-foreground">{auction.creator}</span>
        </div>
        <h3 className="font-display text-sm font-semibold leading-snug">{auction.title}</h3>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Current Bid</p>
            <p className="font-display text-lg font-bold">${auction.currentBid.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{auction.bids} bids</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Ends in</p>
            <p className="flex items-center gap-1 font-display text-sm font-medium">
              <Clock className="h-3.5 w-3.5" />
              {auction.endsIn}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AuctionCard;
