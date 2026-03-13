import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Creator } from "@/data/auctions";

const CreatorCard = ({ creator }: { creator: Creator }) => (
  <div className="flex flex-col items-center rounded-xl border bg-card p-6 text-center transition-all hover:shadow-md">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
      {creator.avatar}
    </div>
    <h3 className="mt-3 font-display font-semibold">{creator.name}</h3>
    <p className="text-xs text-muted-foreground">{creator.category}</p>
    <div className="mt-4 flex w-full justify-between text-center text-xs">
      <div>
        <p className="font-display font-bold">{creator.auctions}</p>
        <p className="text-muted-foreground">Auctions</p>
      </div>
      <div>
        <p className="font-display font-bold">{creator.followers}</p>
        <p className="text-muted-foreground">Followers</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="flex items-center gap-0.5 font-display font-bold">
          {creator.rating}
          <Star className="h-3 w-3 fill-foreground" />
        </p>
        <p className="text-muted-foreground">Rating</p>
      </div>
    </div>
    <Button variant="outline" size="sm" className="mt-4 w-full">
      Follow
    </Button>
  </div>
);

export default CreatorCard;
