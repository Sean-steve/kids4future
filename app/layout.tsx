import "./globals.css";
import "./system.css";
import "./forms.css";
import "./admin.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: {
    default: "FutureRise Foundation",
    template: "%s | FutureRise Foundation",
  },
  description:
    "FutureRise Foundation supports men through brotherhood, wellbeing and practical guidance, then equips suitable men to reach back and strengthen boys through safeguarded mentorship.",
  metadataBase: new URL("https://sean-steve.github.io/kids4future/"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
