import { Hero } from '../../components/landing/Hero';
import { Features } from '../../components/landing/Features';
import { Pricing } from '../../components/landing/Pricing';
import { FAQ } from '../../components/landing/FAQ';
import { CTA } from '../../components/landing/CTA';
import { Testimonials } from '../../components/landing/Testimonials';
import { Navbar } from '../../components/landing/Navbar';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
