-- Drop FK constraint so auctions can reference non-auth creators (demo data)
ALTER TABLE public.auctions DROP CONSTRAINT auctions_creator_id_fkey;

-- Add creator_name and creator_avatar columns for display purposes
ALTER TABLE public.auctions ADD COLUMN IF NOT EXISTS creator_name text NOT NULL DEFAULT 'Unknown';
ALTER TABLE public.auctions ADD COLUMN IF NOT EXISTS creator_avatar text;