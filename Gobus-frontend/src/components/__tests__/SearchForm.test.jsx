// // components/SearchForm.jsx
// export default function SearchForm() {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto -mt-16 relative z-10">
//       <div className="grid md:grid-cols-4 gap-4">
        
//         <input
//           type="text"
//           placeholder="From City"
//           className="border p-3 rounded-md w-full"
//         />

//         <input
//           type="text"
//           placeholder="To City"
//           className="border p-3 rounded-md w-full"
//         />

//         <input type="date" className="border p-3 rounded-md w-full" />

//         <button className="bg-red-600 text-white p-3 rounded-md font-semibold hover:bg-red-700">
//           Search Buses
//         </button>

//       </div>
//     </div>
//   );
// }


import { render, screen } from "@testing-library/react";
import SearchForm from "../SearchForm";

test("renders SearchForm inputs and button", () => {
  render(<SearchForm />);

  // Check From City input
  expect(screen.getByPlaceholderText("From City")).toBeInTheDocument();

  // Check To City input
  expect(screen.getByPlaceholderText("To City")).toBeInTheDocument();

  // Check Search button
  expect(screen.getByText("Search Buses")).toBeInTheDocument();
});

