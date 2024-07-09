import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => (
  <Link href="/">
  <div className="flex items-center gap-x-4 hover:opacity-70 transtion">
    {/* on large screen: display discriptions; on small screen: display only logo */}
    <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink"> <Image src="/blackcat.svg" alt = "GameWave" height="32" width="32" /> </div>
    <div className={cn("hidden lg:block",   font.className)}>
    <p className= {cn("text-lg font-semibold text-white",font.className)}>Game Wave</p>
    <p className= "text-xs text-muted-foreground text-stone-300">Creator Dashboard</p>
    </div>
  </div>
  </Link>
);
