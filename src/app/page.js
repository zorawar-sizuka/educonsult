
import Hero1 from "@/components/Hero-Comp/Hero1"; 
import Hero2 from "@/components/Hero-Comp/Hero2"; 
import DestinationsCluster from "@/components/DestinationsCluster";
import Hero3 from "@/components/Hero-Comp/Hero3"; 
import ServicesEditorial from "@/components/ServicesEditorial";
import Founder from "@/components/Founder"; 
import Stats from "@/components/Stats";
import ContactSection from "@/components/Contact";
import TestimonialsCarousel from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero1 backgroundImageUrl="/hero/hero1.jpg" />   
      <Hero2/> 
      <DestinationsCluster/>  
      <Hero3/>
 
      <ServicesEditorial/>
      <Founder/>  
      <Stats/> 

      <TestimonialsCarousel/>  
      <ContactSection/> 
     
   </>
  );
}
