import { useLanguage } from "./context/LanguageContext";
import bg2 from "../assets/bg2.jpg";
import sf1 from "../assets/SF1.jpg";
import sf2 from "../assets/SF2.png";
import sf3 from "../assets/SF3.png";

export default function Features() {
  const { t } = useLanguage();

  const features = [
    {
      id: 1,
      image: sf1,
      title: "Smart Cancellation",
      description: t("Travel plans changed suddenly? Your seat goes back on sale, and you earn a refund when it’s rebooked—simple and stress-free."),
    },
    {
      id: 2,
      image: sf2,
      title: "Secure Parcel Booking",
      description: t("Send small parcels like documents or clothes using trusted bus routes. Every parcel is verified and approved to ensure safe and secure delivery"),
    },
    {
      id: 3,
      image: sf3,
      title: "Exclusive 10% Off",
      description: t("Students and professionals can save more by verifying their official email ID with a simple OTP"),
    },
  ];

  return (
    <section
      className="relative py-16 bg-center bg-cover"
      style={{ backgroundImage: `url(${bg2})` }}
    >
      {/* Light overlay */}
      <div className="absolute inset-0 bg-white/75"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="text-center text-blue-600 text-3xl font-bold mb-12">
          Feature Specifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              className="group h-64 [perspective:1000px]"
            >
              <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front Face */}
                <div className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden shadow-lg [backface-visibility:hidden]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold text-center px-4">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Back Face */}
                {/* Back Face (Blurred Image) */}
<div className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
  
  {/* Same image */}
  <img
    src={item.image}
    alt={item.title}
    className="w-full h-full object-cover scale-110"
  />

  {/* Blur + dark overlay */}
  <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

  {/* Description */}
  <div className="absolute inset-0 flex items-center justify-center px-6">
    <p className="text-white text-center text-base leading-relaxed">
      {item.description}
    </p>
  </div>
</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}