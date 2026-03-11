// pages/Home.jsx
import Navbar from "./Navbar";
import SearchForm from "./SearchForm";
import PopularRoutes from "./PopularRoutes";
import Features from "./Features";
import herosec from "../assets/herosec.png";
import { useLanguage } from "./context/LanguageContext";
// import Footer from "./Footer"; // The Footer.jsx file was not provided in the context.

export default function Home() {
  const { t } = useLanguage();

  return (
    <div>
      <Navbar />

    {/* <section className="relative w-full h-[520px] flex items-center">

 
      <div
        className="absolute inset-0 bg-cover bg-center brightness-105 contrast-105"
        style={{
          backgroundImage: `url(${herosec})`,
          backgroundPosition: "center 100%", 
        }}
      />

  <div className="relative z-12 h-full flex items-start pt-28">
       <div className="max-w-4xl pl-36"> 


   <h1 className="text-5xl md:text-6xl leading-tight text-black">

          
            <span className="font-poppins font-semibold">
              Your Journey
            </span>

          
            <span className="block font-poppins font-semibold">
              of Exploration{" "}
              <span className="font-prociono text-[#0070FF]">
                Begins Here!
              </span>
            </span>

          </h1>
    <p className="mt-6 text-lg text-gray-700 max-w-xl">
      A reliable platform to book bus tickets online. Discover verified
      operators, flexible timings, secure payments, and comfortable
      travel options.
    </p>
</div>
  </div>
</section> */}




<section className="relative w-full min-h-[520px] md:h-[520px] flex items-center">

  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center brightness-105 contrast-105"
    style={{
      backgroundImage: `url(${herosec})`,
    }}
  />

  {/* Content */}
  <div className="relative z-10 h-full flex items-start md:pt-28 pt-20">
    <div className="max-w-4xl md:pl-36 px-6"> {/* responsive padding */}

      <h1 className="text-3xl sm:text-4xl md:text-6xl leading-tight text-black">
        <span className="font-poppins font-semibold">
          Your Journey
        </span>

        <span className="block font-poppins font-semibold">
          of Exploration{" "}
          <span className="font-prociono text-[#0070FF]">
            Begins Here!
          </span>
        </span>
      </h1>

      <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-700 max-w-xl">
        A reliable platform to book bus tickets online. Discover verified
        operators, flexible timings, secure payments, and comfortable
        travel options.
      </p>

    </div>
  </div>
</section>







    <div className="mt-12 md:mt-20">
  <SearchForm />
</div>
<div className="mt-12 md:mt-20">
<PopularRoutes />
</div>
      
      <Features />
     
    
      
    
    </div>
  );
}
