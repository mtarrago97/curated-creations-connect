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
import { useAuction, useAuctions, useBidHistory, resolveImageUrl, getTimeRemaining } from "@/hooks/useAuctions";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const AuctionDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: auction, isLoading } = useAuction(id);
  const { data: allAuctions = [] } = useAuctions();
  const { data: bids = [] } = useBidHistory(id);
  const [bidAmount, setBidAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState("00:00:00");
  const [placing, setPlacing] = useState(false);

  // Live countdown
  useEffect(() => {
    if (!auction) return;
    const update = () => setTimeLeft(getTimeRemaining(auction.ends_at));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [auction]);

  // Realtime subscription for bid updates
  useEffect(() => {
    if (!id) return;
    const channel = supabase
      .channel(`auction-${id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "auctions", filter: `id=eq.${id}` }, () => {
        queryClient.invalidateQueries({ queryKey: ["auction", id] });
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "bids", filter: `auction_id=eq.${id}` }, () => {
        queryClient.invalidateQueries({ queryKey: ["bids", id] });
        queryClient.invalidateQueries({ queryKey: ["auction", id] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [id, queryClient]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="container flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Loading auction...</p>
        </div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="container flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold">Auction not found</h1>
            <Button className="mt-4" onClick={() => navigate("/")}>Go Home</Button>
          </div>
        </div>
      </div>
    );
  }

  const minBid = Number(auction.current_bid) + 50;
  const relatedAuctions = allAuctions.filter((a) => a.id !== auction.id && a.type === auction.type).slice(0, 3);

  const handlePlaceBid = async () => {
    const amount = Number(bidAmount);
    if (!amount || amount < minBid) {
      toast.error(`Minimum bid is $${minBid.toLocaleString()}`);
      return;
    }
    if (!user) {
      toast.info("Please sign in to place a bid", {
        action: { label: "Sign In", onClick: () => navigate("/auth") },
      });
      return;
    }

    setPlacing(true);
    try {
      const { error } = await supabase.from("bids").insert({
        auction_id: auction.id,
        bidder_id: user.id,
        amount,
      });
      if (error) throw error;
      toast.success(`Bid of $${amount.toLocaleString()} placed successfully!`);
      setBidAmount("");
    } catch (error: any) {
      toast.error(error.message || "Failed to place bid");
    } finally {
      setPlacing(false);
    }
  };

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
                src={resolveImageUrl(auction.image_url)}
                alt={auction.title}
                className="aspect-square w-full object-cover"
              />
              <div className="absolute left-4 top-4 flex items-center gap-2">
                {auction.is_live && <LiveBadge />}
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
                src={auction.creator_avatar || ""}
                alt={auction.creator_name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{auction.creator_name}</p>
                <p className="text-xs text-muted-foreground">Verified Creator</p>
              </div>
            </div>

            <h1 className="mt-4 font-display text-2xl font-bold md:text-3xl">{auction.title}</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">{auction.description}</p>

            {/* Timer + Price */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl border bg-secondary p-4">
                <p className="text-xs text-muted-foreground">Current Bid</p>
                <p className="font-display text-3xl font-bold">${Number(auction.current_bid).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{auction.bid_count} bids</p>
              </div>
              <div className="rounded-xl border bg-secondary p-4">
                <p className="text-xs text-muted-foreground">Ends in</p>
                <p className="flex items-center gap-2 font-display text-3xl font-bold">
                  <Clock className="h-6 w-6" />
                  {timeLeft}
                </p>
                <p className="text-xs text-muted-foreground">Started at ${Number(auction.starting_price).toLocaleString()}</p>
              </div>
            </div>

            {/* Bid Input */}
            <div className="mt-6 rounded-xl border bg-card p-6">
              <p className="text-sm font-medium">Place a Bid</p>
              <p className="text-xs text-muted-foreground">Minimum bid: ${minBid.toLocaleString()}</p>
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
                <Button onClick={handlePlaceBid} className="px-8" disabled={placing}>
                  {placing ? "Placing..." : "Place Bid"}
                </Button>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5" />
                Secure escrow-based payment. You only pay if you win.
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-3">
              <Button variant="outline" size="sm"><Heart className="mr-1.5 h-4 w-4" /> Save</Button>
              <Button variant="outline" size="sm"><Share2 className="mr-1.5 h-4 w-4" /> Share</Button>
            </div>

            {/* Bid History */}
            <div className="mt-8">
              <h3 className="font-display font-semibold">Recent Bids</h3>
              <div className="mt-3 space-y-2">
                {bids.length === 0 && (
                  <p className="text-sm text-muted-foreground">No bids yet. Be the first!</p>
                )}
                {bids.map((bid) => (
                  <div
                    key={bid.id}
                    className="flex items-center justify-between rounded-lg bg-secondary px-4 py-3 text-sm"
                  >
                    <span className="font-medium">Bidder</span>
                    <span className="font-display font-bold">${Number(bid.amount).toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(bid.created_at).toLocaleTimeString()}
                    </span>
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
