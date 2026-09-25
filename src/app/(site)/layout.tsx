import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";

/**
 * Layout for the public marketing site only. Kept separate from the root
 * layout (and from /admin) so the admin dashboard does not inherit the
 * public announcement bar / navbar / footer / mobile action bar.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pb-14 lg:pb-0">
      <AnnouncementBar />
      <Navbar />
      <div id="main-content">{children}</div>
      <Footer />
      <MobileActionBar />
    </div>
  );
}
