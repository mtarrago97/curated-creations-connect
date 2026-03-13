import { motion } from "framer-motion";
import { ArrowRight, Shield, Eye, Scale, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuctionCard from "@/components/AuctionCard";
import ExperienceCard from "@/components/ExperienceCard";
import CreatorCard from "@/components/CreatorCard";
import LiveBadge from "@/components/LiveBadge";
import heroImage from "@/assets/hero-objects.jpg";
import { auctions, creators } from "@/data/auctions";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const Index = () => {
  const navigate = useNavigate();
  const liveAuctions = auctions.filter((a) => a.isLive);
  const experiences = auctions.filter((a) => a.type === "experience");
  const objects = auctions.filter((a) => a.type === "object");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="container py-20 text-center md:py-32">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.h1
            variants={fadeUp}
            className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl"
          >
            Own a piece of{" "}
            <span className="italic">your creator's universe.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
          >
            The auction marketplace where creators sell exclusive objects and
            experiences to their biggest fans.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex items-center justify-center gap-4">
            <Button size="lg" onClick={() => navigate("/")}>
              Explore Auctions
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
              Start Selling <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 overflow-hidden rounded-2xl"
        >
          <img src={heroImage} alt="Curated collectibles" className="w-full object-cover" />
        </motion.div>

        <div className="mt-12 grid grid-cols-3 gap-8">
          {[
            { value: "12K+", label: "Active Creators" },
            { value: "$4.2M", label: "Total Volume" },
            { value: "98%", label: "Satisfaction" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl font-bold md:text-3xl">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Now */}
      <section id="live-now" className="border-t bg-secondary py-16">
        <div className="container">
          <div className="flex items-center gap-3">
            <LiveBadge />
            <h2 className="font-display text-2xl font-bold md:text-3xl">Live Now</h2>
          </div>
          <p className="mt-2 text-muted-foreground">
            Happening right now. Don't miss out.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {liveAuctions.length} auctions live
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {liveAuctions.slice(0, 4).map((a) => (
              <AuctionCard key={a.id} auction={a} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline">View All Live</Button>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section id="experiences" className="container py-16">
        <span className="text-sm font-medium text-muted-foreground">Experiences</span>
        <h2 className="mt-1 font-display text-2xl font-bold md:text-3xl">
          Moments money can't buy.
        </h2>
        <p className="mt-2 max-w-lg text-muted-foreground">
          Bid on once-in-a-lifetime experiences with your favorite creators.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((a) => (
            <ExperienceCard key={a.id} auction={a} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline">View All Experiences</Button>
        </div>
      </section>

      {/* Objects */}
      <section id="objects" className="border-t bg-secondary py-16">
        <div className="container">
          <span className="text-sm font-medium text-muted-foreground">Objects</span>
          <h2 className="mt-1 font-display text-2xl font-bold md:text-3xl">
            Tangible. Authentic. Yours.
          </h2>
          <p className="mt-2 max-w-lg text-muted-foreground">
            Own one-of-a-kind objects straight from the people who made them.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {objects.slice(0, 6).map((a) => (
              <AuctionCard key={a.id} auction={a} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline">View All Objects</Button>
          </div>
        </div>
      </section>

      {/* Creators */}
      <section className="container py-16">
        <h2 className="font-display text-2xl font-bold md:text-3xl">Meet the creators.</h2>
        <p className="mt-2 max-w-lg text-muted-foreground">
          Connect with verified creators selling one-of-a-kind items and experiences.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {creators.map((c) => (
            <CreatorCard key={c.id} creator={c} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t bg-secondary py-16">
        <div className="container">
          <span className="text-sm font-medium text-muted-foreground">How It Works</span>
          <h2 className="mt-1 font-display text-2xl font-bold md:text-3xl">
            Simple. Seamless. Secure.
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "List", desc: "Creators upload items or experiences in seconds. Set your terms, start price, and duration." },
              { step: "02", title: "Bid", desc: "Fans compete in transparent, timed auctions. Watch bids update live and feel the excitement." },
              { step: "03", title: "Pay", desc: "Secure checkout with instant payment processing. Multiple payment methods supported." },
              { step: "04", title: "Receive", desc: "Full traceability from creator to fan doorstep. Track every step of the journey." },
            ].map((s) => (
              <div key={s.step}>
                <p className="font-display text-4xl font-bold text-muted-foreground/30">{s.step}</p>
                <h3 className="mt-2 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="container py-16">
        <span className="text-sm font-medium text-muted-foreground">Trust & Safety</span>
        <h2 className="mt-1 font-display text-2xl font-bold md:text-3xl">Built on trust.</h2>
        <p className="mt-2 max-w-lg text-muted-foreground">
          We've designed every layer of Auctio with safety and integrity in mind.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Shield, title: "Verified Creators", desc: "Every creator is identity-verified. Know exactly who you're buying from." },
            { icon: Eye, title: "Full Transparency", desc: "All bids are public. Complete auction history and provenance tracking." },
            { icon: Scale, title: "Fair Bidding", desc: "Anti-shill protections and bid verification ensure a level playing field." },
            { icon: Lock, title: "Secure Payments", desc: "Escrow-based payments. Your money is protected until you receive your item." },
          ].map((t) => (
            <div key={t.title} className="rounded-xl border bg-card p-6">
              <t.icon className="h-8 w-8 text-foreground" />
              <h3 className="mt-3 font-display font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary py-20 text-center text-primary-foreground">
        <div className="container">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Ready to start?</h2>
          <p className="mt-3 text-primary-foreground/70">
            Join thousands of creators and fans already on the platform.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/")}
            >
              Explore Auctions
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => navigate("/auth")}
            >
              Start Selling <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
