import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-secondary py-12">
    <div className="container text-center text-sm text-muted-foreground">
      <Link to="/" className="font-display text-lg font-bold text-foreground">auctio</Link>
      <p className="mt-2">The auction marketplace for creators and fans.</p>
      <p className="mt-4">© 2026 Auctio. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
