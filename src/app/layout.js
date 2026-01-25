import Navbar from "@/components/NavBar";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export default function RootLayout({ children }) {
  return (
    <html lang="en"> 
   
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}> 
      <Navbar/>
        {children} 
        <Footer/>
      </body> 
    
    </html>
  );
}
