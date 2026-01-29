
import { Products } from "@/components/home/Products";
import { Portfolio } from "@/components/home/Portfolio";
import { Technologies } from "@/components/home/Technologies";
import { Contact } from "@/components/home/Contact";
import Banner from "@/components/home/banner";
import NewServices from "@/components/home/new_services";

export default function Home() {
  return (
    <div className={"dark contents"}>
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        <div className="flex flex-col gap-0 w-full min-h-screen">
          <Banner />
          <NewServices />
          {/* <Hero /> */}
          {/* <Services /> */}
          <Products />
          <Portfolio />
          <Technologies />
          <Contact />
        </div>
      </div>
    </div>

  );
}
