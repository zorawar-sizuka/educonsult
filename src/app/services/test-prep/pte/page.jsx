// src/app/ielts/page.jsx
import HeroBanner from "@/components/Test-Comp/Hero";
import Introduction from "@/components/Test-Comp/Intro";
import Stat from "@/components/Test-Comp/Stat";
import table from "@/data/pte/table";
import intro from "@/data/pte/intro"; 
import hero from "@/data/pte/hero" 
import stat from "@/data/pte/stat" 
import faq from "@/data/pte/faq"   
import format from "@/data/pte/format"  
import register from "@/data/pte/register" 

import TableSection from "@/components/Test-Comp/Table";
import Faq from "@/components/Test-Comp/FAQ";
import Format from "@/components/Test-Comp/Format";
import Register from "@/components/Test-Comp/Register";


export default function PTEPage() {
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
