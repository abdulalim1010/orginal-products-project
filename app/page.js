import Image from "next/image";
import BannerSection from "./components/BannerSection";
import MainProducts from "./components/MainProducts";

export default function Home() {
  return (
    <div>
      <BannerSection/>
      <MainProducts/>
    </div>
  );
}
