import { Eye, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import LiveBadge from "./LiveBadge";
import type { DBAuction } from "@/hooks/useAuctions";
import { resolveImageUrl, getTimeRemaining } from "@/hooks/useAuctions";

interface AuctionCardProps {
  auction: DBAuction;
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
          src={resolveImageUrl(auction.image_url)}
          alt={auction.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          {auction.is_live && <LiveBadge />}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <img
            src={auction.creator_avatar || ""}
            alt={auction.creator_name}
            className="h-6 w-6 rounded-full"
          />
          <span className="text-xs text-muted-foreground">{auction.creator_name}</span>
        </div>
        <h3 className="font-display text-sm font-semibold leading-snug">{auction.title}</h3>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Current Bid</p>
            <p className="font-display text-lg font-bold">${Number(auction.current_bid).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{auction.bid_count} bids</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Ends in</p>
            <p className="flex items-center gap-1 font-display text-sm font-medium">
              <Clock className="h-3.5 w-3.5" />
              {getTimeRemaining(auction.ends_at)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AuctionCard;
