

import { useState, useRef } from "react";
import { FaExchangeAlt, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { useLanguage } from "./context/LanguageContext";

export default function SearchForm() {
  const { t } = useLanguage();

  const [from, setFrom] = useState("Hyderabad");
  const [to, setTo] = useState("Bangalore");

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const format = (d) =>
    d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const [date, setDate] = useState(format(today));

  const swapCities = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 -mt-20 md:-mt-24 relative z-20">

      {/* OUTER CONTAINER */}
      <div className="bg-[#EDEDED] p-4 md:p-6 rounded-3xl shadow-md border border-gray-300">

        {/* INNER STRIP */}
      


        <div className="bg-white border border-gray-300 rounded-2xl flex flex-col md:flex-row md:items-center relative overflow-hidden">

 

  {/* FROM */}
<div className="flex items-center gap-3 px-5 py-4 md:py-0 md:h-[90px] md:w-[30%]">
  <div>
    <p className="text-sm text-gray-500 font-medium">From</p>
    <p className="text-lg md:text-xl font-semibold">{from}</p>
  </div>
</div>

{/* DIVIDER WITH SWAP INSIDE (MOBILE) */}
<div className="relative md:hidden flex items-center justify-center">
  <div className="h-px w-full bg-gray-300"></div>

  <button
    onClick={swapCities}
    className="absolute bg-[#1A73E8] text-white p-3 rounded-full shadow-md rotate-90"
  >
    <FaExchangeAlt />
  </button>
</div>

  {/* SWAP */}
 <button
  onClick={swapCities}
  className="
    hidden md:block
    absolute left-[30%] -translate-x-1/2
    bg-[#1A73E8] text-white
    p-4
    rounded-full shadow-md
    z-10
  "
>
  <FaExchangeAlt />
</button>

  {/* DIVIDER MOBILE */}
  <div className="h-px w-full bg-gray-300 md:hidden" />

  {/* TO (MIDDLE ON DESKTOP) */}
 

 

<div className="flex items-center px-5 py-4 md:py-0 md:h-[90px] md:w-[30%] md:border-l md:border-r border-gray-300 md:justify-center">

  {/* wrapper */}
  <div className="w-full md:w-auto text-left md:text-center">

    {/* LABEL */}
    <p className="text-sm text-gray-500 font-medium">
      To
    </p>

    {/* VALUE */}
    <input
      value={to}
      onChange={(e) => setTo(e.target.value)}
      className="
        w-full md:w-auto
        outline-none
        text-lg md:text-xl
        font-semibold
        bg-transparent

        text-left md:text-center
      "
    />

  </div>
</div>
  {/* DIVIDER MOBILE */}
  <div className="h-px w-full bg-gray-300 md:hidden" />

  {/* DATE */}
 


  {/* <div className="flex items-center justify-between px-5 py-4 md:py-0 md:h-[90px] md:w-[40%] gap-3"> */}
  <div className="flex items-center justify-between px-4 py-4 md:py-0 md:h-[90px] md:w-[40%] gap-2 min-w-0">

  {/* LEFT → DATE TEXT */}
  {/* <div className="flex items-center gap-3"> */}
  <div className="flex items-center gap-3 min-w-0">
    <FaCalendarAlt className="text-gray-500 text-lg" />
    <div>
      {/* <p className="text-sm text-gray-500 font-medium"> */}
      <p className="text-xs md:text-sm text-gray-500 font-medium">
        Date of Journey
      </p>
     {/* <p className="text-lg md:text-xl font-semibold whitespace-nowrap"> */}
    <p className="text-sm md:text-xl font-semibold truncate">
  {date}
</p>
    </div>
  </div>

  {/* RIGHT → BUTTONS */}
  {/* <div className="flex gap-2"> */}
<div className="flex gap-2 flex-shrink-0">
    {/* <button
      onClick={() => setDate(format(today))}
      className="px-4 py-1.5 rounded-full bg-gray-300 text-sm font-medium"
    >
      Today
    </button>

    <button
      onClick={() => setDate(format(tomorrow))}
      className="px-4 py-1.5 rounded-full bg-[#1A73E8] text-white text-sm font-medium"
    >
      Tomorrow
    </button> */}


    <button
  onClick={() => setDate(format(today))}
  className="px-2.5 md:px-4 py-1 rounded-full bg-gray-400 text-white text-[11px] md:text-sm font-medium whitespace-nowrap"
>
  Today
</button>

<button
  onClick={() => setDate(format(tomorrow))}
  className="px-3 md:px-4 py-1.5 rounded-full bg-[#1A73E8] text-white text-xs md:text-sm font-medium whitespace-nowrap"
>
  Tomorrow
</button>
  </div>

</div>
</div>

        {/* SEARCH BUTTON */}
        <div className="flex justify-center">
          <button className="
            bg-[#1A73E8] text-white
            w-full md:w-auto
            px-10 md:px-20
            py-4
            mt-2 md:mt-4
            rounded-2xl
            text-xl md:text-2xl
            font-semibold
            shadow-lg
            md:-mb-16
          ">
            Search
          </button>
        </div>

      </div>
    </div>
  );
}
