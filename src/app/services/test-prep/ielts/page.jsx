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

     
    </>
  );
}
