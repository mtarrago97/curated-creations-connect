const LiveBadge = () => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-live px-2.5 py-0.5 text-xs font-medium text-live-foreground">
    <span className="h-1.5 w-1.5 animate-pulse-live rounded-full bg-live-foreground" />
    Live
  </span>
);

export default LiveBadge;
