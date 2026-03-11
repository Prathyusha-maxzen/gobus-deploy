import image1 from "../assets/Bangalore.png";
import image2 from "../assets/vizag.jpg";
import image3 from "../assets/chennai.jpg";
import image4 from "../assets/vizag.jpg";
import bg1 from "../assets/bg-1.jpg";

const routes = [
  {
    from: "Hyderabad",
    to: "Banglore",
    price: 2200,
    image: image1,
  },
  {
    from: "Hyderabad",
    to: "Vizag",
    price: 2200,
    image: image2,
  },
  {
    from: "Hyderabad",
    to: "Chennai",
    price: 2200,
    image: image3,
  },
  {
    from: "Hyderabad",
    to: "Vijayawada",
    price: 2200,
    image: image4,
  },
  {
    from: "Hyderabad",
    to: "Banglore",
    price: 2200,
    image: image1,
  },
  {
    from: "Hyderabad",
    to: "Vizag",
        price: 2200,
    image: image2,
  },

];

export default function PopularRoutes() {
  return (
    <section
  className="py-28 bg-center -mt-16 bg-cover relative"
  style={{ backgroundImage: `url(${bg1})` }}
>
  {/* Light overlay */}
  <div className="absolute inset-0 bg-white/80"></div>

  <div className="relative w-full px-20 mx-auto px-4">
    <h2 className="text-center text-blue-600 text-3xl font-bold mb-12">
      POPULAR ROUTES
    </h2>

    <p className="text-center text-gray-700 max-w-4xl text-lg text-start mx-auto mb-24">
      Popular routes in a bus ticket booking app represent travel corridors with consistently high demand due to factors like daily commuting patterns, economic ties between cities, tourism flow, and limited alternative transport options. Highlighting these routes helps users discover commonly traveled journeys quickly, reduces search effort, and increases booking efficiency by leveraging collective user behavior and historical booking data.
    </p>

    <style>
      {`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}
    </style>
    <div className="w-full flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
      {routes.map((route, index) => (
        <div
          key={index}
          className="min-w-[260px] bg-white rounded-xl shadow-md hover:shadow-lg transition"
        >
          <img
            src={route.image}
            alt={route.to}
            className="w-full h-44 object-cover rounded-t-xl"
          />

          <div className="p-4">
            <p className="text-sm text-gray-500 mb-1">{route.from} →</p>

            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">{route.to}</h3>
              <p className="text-sm text-gray-600">
                Price - <span className="font-semibold">{route.price}</span>
              </p>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              BOOK NOW
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
}