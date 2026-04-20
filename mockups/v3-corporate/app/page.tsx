import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import ServicesGrid from "@/components/ServicesGrid";
import ArtistRoster from "@/components/ArtistRoster";
import Testimonials from "@/components/Testimonials";
import NewsletterCapture from "@/components/NewsletterCapture";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <ServicesGrid />
        <ArtistRoster />
        <Testimonials />
        <NewsletterCapture />
      </main>
      <Footer />
    </>
  );
}
