import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => (
  <div className="flex flex-col items-center gap-y-4">
   
    <div className="bg-white rounded-full p-1"> <Image src="/blackcat.svg" alt = "GameWave" height="80" width="80" /> </div>
    <p className= {cn("text-xl font-semibold text-white",font.className)}>Game Wave</p>
    <p className= "text-xxl font-semibold text-stone-300">Let's Play</p>
  </div>
);
