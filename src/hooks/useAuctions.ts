import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DBAuction {
  id: string;
  title: string;
  creator_id: string;
  creator_name: string;
  creator_avatar: string | null;
  starting_price: number;
  current_bid: number;
  bid_count: number;
  starts_at: string;
  ends_at: string;
  is_live: boolean;
  description: string | null;
  image_url: string | null;
  category: string;
  type: string;
  status: string;
}

// Map DB image paths to local imports
const imageMap: Record<string, string> = {};

// Dynamically import images
const importImages = async () => {
  const modules = import.meta.glob("/src/assets/*.jpg", { eager: true }) as Record<string, { default: string }>;
  for (const [path, mod] of Object.entries(modules)) {
    const filename = path.split("/").pop() || "";
    imageMap[`/assets/${filename}`] = mod.default;
  }
};
importImages();

export const resolveImageUrl = (url: string | null): string => {
  if (!url) return "/placeholder.svg";
  if (url.startsWith("http")) return url;
  return imageMap[url] || "/placeholder.svg";
};

export const getTimeRemaining = (endsAt: string): string => {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return "00:00:00";
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

export const useAuctions = () => {
  return useQuery({
    queryKey: ["auctions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("auctions")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as DBAuction[];
    },
  });
};

export const useAuction = (id: string | undefined) => {
  return useQuery({
    queryKey: ["auction", id],
    queryFn: async () => {
      if (!id) throw new Error("No auction ID");
      const { data, error } = await supabase
        .from("auctions")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as DBAuction;
    },
    enabled: !!id,
  });
};

export const useBidHistory = (auctionId: string | undefined) => {
  return useQuery({
    queryKey: ["bids", auctionId],
    queryFn: async () => {
      if (!auctionId) throw new Error("No auction ID");
      const { data, error } = await supabase
        .from("bids")
        .select("*")
        .eq("auction_id", auctionId)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
    enabled: !!auctionId,
  });
};
