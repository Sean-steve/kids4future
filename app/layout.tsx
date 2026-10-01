import "./globals.css";

export const metadata = {
  title: "FutureRise Foundation",
  description:
    "FutureRise Foundation supports vulnerable children and young people through protection, family strengthening, education, mentorship, skills and opportunity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
