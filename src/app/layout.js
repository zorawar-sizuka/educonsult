// import Navbar from "@/components/NavBar";
// import "./globals.css";
// import { Inter, Playfair_Display } from "next/font/google";
// import Footer from "@/components/Footer";
// import FloatingDock from "@/components/FloatingDock";

// const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
// const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en"> 
   
//       <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}> 
//       <Navbar/>
//         {children}  
//         <FloatingDock />
//         <Footer/>
//       </body> 
    
//     </html>
//   );
// }






import Navbar from "@/components/NavBar";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import Footer from "@/components/Footer";
import FloatingDock from "@/components/FloatingDock";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

// ✅ Domain-safe base (works on vercel now, custom domain later)
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Espot International Education Consultancy",
    template: "%s | Espot International Education Consultancy",
  },

  description:
    "Education consultancy helping students with study abroad guidance, admissions, scholarships, and visa support.",

  applicationName: "Espot International Education Consultancy",

  alternates: {
    canonical: "/", // Next will resolve using metadataBase
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Espot International Education Consultancy",
    title: "Espot International Education Consultancy",
    description:
      "Study abroad guidance, admissions support, scholarships, and visa assistance.",
    images: [
      {
        url: "/og.jpg", // put og.jpg in /public
        width: 1200,
        height: 630,
        alt: "Espot International Education Consultancy",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Espot International Education Consultancy",
    description:
      "Study abroad guidance, admissions support, scholarships, and visa assistance.",
    images: ["/og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Optional but good if you have these icons in /public
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// Optional but recommended (prevents zoom bugs + improves lighthouse)
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <FloatingDock />
        <Footer />
      </body>
    </html>
  );
}
