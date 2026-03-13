import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Eye, Heart, Share2, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveBadge from "@/components/LiveBadge";
import AuctionCard from "@/components/AuctionCard";
import { auctions } from "@/data/auctions";
import { toast } from "sonner";

const AuctionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auction = auctions.find((a) => a.id === id);
  const [bidAmount, setBidAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState(auction?.endsIn || "00:00:00");

  // Simple countdown simulation
  useEffect(() => {
    if (!auction) return;
    const parts = auction.endsIn.split(":").map(Number);
    let totalSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];

    const interval = setInterval(() => {
      totalSeconds--;
      if (totalSeconds <= 0) {
        clearInterval(interval);
        setTimeLeft("00:00:00");
        return;
      }
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      setTimeLeft(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [auction]);

  if (!auction) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="container flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold">Auction not found</h1>
            <Button className="mt-4" onClick={() => navigate("/")}>
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const minBid = auction.currentBid + 50;
  const relatedAuctions = auctions.filter((a) => a.id !== auction.id && a.type === auction.type).slice(0, 3);

  const handlePlaceBid = () => {
    const amount = Number(bidAmount);
    if (!amount || amount < minBid) {
      toast.error(`Minimum bid is $${minBid.toLocaleString()}`);
      return;
    }
    // In a real app this would go through auth + Stripe
    toast.info("Please sign in to place a bid", {
      action: {
        label: "Sign In",
        onClick: () => navigate("/auth"),
      },
    });
  };

  // Simulated bid history
  const bidHistory = Array.from({ length: 5 }, (_, i) => ({
    bidder: `User${Math.floor(Math.random() * 900) + 100}`,
    amount: auction.currentBid - i * Math.floor(Math.random() * 200 + 50),
    time: `${Math.floor(Math.random() * 30) + 1}m ago`,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="container py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="capitalize">{auction.type}s</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{auction.title}</span>
        </div>
      </div>

      <div className="container pb-16">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={auction.image}
                alt={auction.title}
                className="aspect-square w-full object-cover"
              />
              <div className="absolute left-4 top-4 flex items-center gap-2">
                {auction.isLive && <LiveBadge />}
              </div>
              <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-foreground/60 px-3 py-1.5 text-sm text-primary-foreground backdrop-blur-sm">
                <Eye className="h-4 w-4" />
                {auction.watchers} watching
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Creator */}
            <div className="flex items-center gap-3">
              <img
                src={auction.creatorAvatar}
                alt={auction.creator}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{auction.creator}</p>
                <p className="text-xs text-muted-foreground">Verified Creator</p>
              </div>
            </div>

            <h1 className="mt-4 font-display text-2xl font-bold md:text-3xl">
              {auction.title}
            </h1>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              {auction.description}
            </p>

            {/* Timer + Price */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl border bg-secondary p-4">
                <p className="text-xs text-muted-foreground">Current Bid</p>
                <p className="font-display text-3xl font-bold">
                  ${auction.currentBid.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">{auction.bids} bids</p>
              </div>
              <div className="rounded-xl border bg-secondary p-4">
                <p className="text-xs text-muted-foreground">Ends in</p>
                <p className="flex items-center gap-2 font-display text-3xl font-bold">
                  <Clock className="h-6 w-6" />
                  {timeLeft}
                </p>
                <p className="text-xs text-muted-foreground">
                  Started at ${auction.startingPrice.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Bid Input */}
            <div className="mt-6 rounded-xl border bg-card p-6">
              <p className="text-sm font-medium">Place a Bid</p>
              <p className="text-xs text-muted-foreground">
                Minimum bid: ${minBid.toLocaleString()}
              </p>
              <div className="mt-3 flex gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    type="number"
                    placeholder={minBid.toLocaleString()}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="pl-7"
                  />
                </div>
                <Button onClick={handlePlaceBid} className="px-8">
                  Place Bid
                </Button>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5" />
                Secure escrow-based payment. You only pay if you win.
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-3">
              <Button variant="outline" size="sm">
                <Heart className="mr-1.5 h-4 w-4" /> Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-1.5 h-4 w-4" /> Share
              </Button>
            </div>

            {/* Bid History */}
            <div className="mt-8">
              <h3 className="font-display font-semibold">Recent Bids</h3>
              <div className="mt-3 space-y-2">
                {bidHistory.map((bid, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg bg-secondary px-4 py-3 text-sm"
                  >
                    <span className="font-medium">{bid.bidder}</span>
                    <span className="font-display font-bold">
                      ${bid.amount.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">{bid.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {relatedAuctions.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-xl font-bold">You might also like</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedAuctions.map((a) => (
                <AuctionCard key={a.id} auction={a} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AuctionDetail;
