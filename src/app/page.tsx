import { HeroSection } from "@/app/_components/hero";
import { Navigation } from "@/app/_components/navigation";

export default function Home() {
  return (
    <main className="x">
      <Navigation />
      <HeroSection />
    </main>
  );
}
