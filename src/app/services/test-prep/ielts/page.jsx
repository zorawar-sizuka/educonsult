// src/app/ielts/page.jsx
import HeroBanner from "@/components/Test-Comp/Hero";
import Introduction from "@/components/Test-Comp/Intro"; 
import Stat from "@/components/Test-Comp/Stat"; 
import Format from "@/components/Test-Comp/Format";
import Register from "@/components/Test-Comp/Register";


import intro from "@/data/ielts/intro"; 
import hero from "@/data/ielts/hero" 
import stat from "@/data/ielts/stat" 
import format from "@/data/ielts/format"  
import register from "@/data/ielts/register"  
import table from "@/data/ielts/table"  
import faq from "@/data/ielts/faq" 


import TableSection from "@/components/Test-Comp/Table";
import Faq from "@/components/Test-Comp/FAQ";
import BookButton from "@/components/FormButton/BookButton";





export default function IELTSPage() {
  return (
    <>
     <HeroBanner data={hero}/>
      <Introduction data={intro} /> 
      <Stat data={stat}/> 
      <Format data={format} /> 
      <Register data={register} /> 
      <TableSection data={table} /> 
      <Faq data={faq} /> 
            {/* -------------------------------------------------------
          3. CTA / NEXT STEPS
      ------------------------------------------------------- */}
      <section className="py-24 flex justify-center">
        <BookButton className="group relative px-8 py-4 bg-slate-900 text-white rounded-full overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 font-medium tracking-wide flex items-center gap-2">
            Start Your Visa Application
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </span>
        </BookButton>
      </section>

     
    </>
  );
}
