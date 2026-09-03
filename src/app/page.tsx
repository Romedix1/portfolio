import { HeroSection, TechnologiesBar } from "@/app/_components";
import { Navigation } from "@/app/_components/navigation";

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <TechnologiesBar />
    </main>
  );
}
