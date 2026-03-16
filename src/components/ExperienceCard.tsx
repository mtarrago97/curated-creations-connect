import { Eye, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import LiveBadge from "./LiveBadge";
import type { DBAuction } from "@/hooks/useAuctions";
import { resolveImageUrl, getTimeRemaining } from "@/hooks/useAuctions";

const ExperienceCard = ({ auction }: { auction: DBAuction }) => (
  <Link
    to={`/auction/${auction.id}`}
    className="group block overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={resolveImageUrl(auction.image_url)}
        alt={auction.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute left-3 top-3 flex items-center gap-2">
        {auction.is_live && <LiveBadge />}
        <span className="rounded-full bg-foreground/60 px-2.5 py-0.5 text-xs font-medium text-primary-foreground backdrop-blur-sm">
          {auction.category}
        </span>
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-display text-sm font-semibold">{auction.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">by {auction.creator_name}</p>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="font-display font-bold">${Number(auction.current_bid).toLocaleString()}</span>
        <span className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3 w-3" />
          {getTimeRemaining(auction.ends_at)}
        </span>
      </div>
    </div>
  </Link>
);

export default ExperienceCard;
