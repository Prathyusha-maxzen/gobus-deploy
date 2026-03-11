


import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle, FaUser, FaTicketAlt, FaGift, FaSignOutAlt } from "react-icons/fa";
import { MdLocalOffer, MdHelp, MdCancel } from "react-icons/md";
import Login from "./Login";
// import Signup from "./Signup";
import logo from "../assets/logo.avif";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "./context/LanguageContext";
import { useAuth } from "./context/AuthContext";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const { language, changeLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-[#F3F4F6] px-6 md:px-16 py-3 flex items-center justify-between relative">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="GoBus" className="h-10 w-auto" />
        <span className="text-[#1A73E8] text-2xl font-semibold">GoBus</span>
      </div>

      {/* Desktop Right Section */}
      <div className="hidden md:flex items-center relative">

        {!user ? (
          <button
            onClick={() => setIsLoginOpen(true)}
            className="flex items-center gap-2 border-2 border-[#1A73E8] text-[#1A73E8] px-5 py-2 rounded-xl font-medium hover:bg-[#1A73E8] hover:text-white transition"
          >
            <FaUserCircle className="text-lg" />
            Login / Sign up
          </button>
        ) : (
          <>
          
            {/* <div
  onClick={() => setAccountOpen(!accountOpen)}
className="flex items-center gap-2 cursor-pointer select-none 
           border-2 border-[#1A73E8] 
           px-4 py-2 rounded-xl 
           text-[#1A73E8] font-semibold
          hover:bg-[#1A73E8] hover:text-white transition
           "
>
  <FaUserCircle className="text-3xl text-[#1A73E8]" />

  <span className="font-semibold text-[#1A73E8]">My Account</span>

  <FaChevronDown
    className={`text-sm text-[#1A73E8] transition ${
      accountOpen ? "rotate-180" : ""
    }`}
  />
</div> */}


<div
  onClick={() => setAccountOpen(!accountOpen)}
  className="group flex items-center gap-2 cursor-pointer select-none
             border-2 border-[#1A73E8]
             px-4 py-2 rounded-xl
             text-[#1A73E8] font-semibold
             hover:bg-[#1A73E8]
             hover:text-white
             transition"
>
  <FaUserCircle className="text-3xl group-hover:text-white" />

  <span className="group-hover:text-white">My Account</span>

  <FaChevronDown
    className={`text-sm transition group-hover:text-white ${
      accountOpen ? "rotate-180" : ""
    }`}
  />
</div>

            {accountOpen && (
              <div className="absolute right-0 top-14 w-56 bg-white rounded-xl shadow-lg border py-2 z-50">

                <DropdownItem label="Profile" icon={FaUser} onClick={() => navigate("/profile")} />
                <DropdownItem label="My Bookings" icon={FaTicketAlt} onClick={() => navigate("/bookings")} />
                <DropdownItem label="Offers" icon={MdLocalOffer} onClick={() => navigate("/offers")} />
                <DropdownItem label="Refer & Earn" icon={FaGift} onClick={() => navigate("/refer")} />
                <DropdownItem label="Help" icon={MdHelp} onClick={() => navigate("/help")} />
                <DropdownItem label="Cancel Ticket" icon={MdCancel} onClick={() => navigate("/cancel")} />

                <div className="border-t my-2"></div>

                <DropdownItem
                  label="Logout"
                  icon={FaSignOutAlt}
                  danger
                  onClick={() => {
                    logout();
                    setAccountOpen(false);
                    navigate("/");
                  }}
                />
              </div>
            )}
          </>
        )}

      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>

          <div className="absolute top-14 left-0 w-full bg-white shadow-md p-4 md:hidden z-50">

            {!user ? (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="border px-4 py-2 rounded-md w-full"
              >
                Login / Sign up
              </button>
            ) : (
              <div className="flex flex-col gap-3">

                <DropdownItem label="Profile" icon={FaUser} onClick={() => navigate("/profile")} />
                <DropdownItem label="My Bookings" icon={FaTicketAlt} onClick={() => navigate("/bookings")} />
                <DropdownItem label="Offers" icon={MdLocalOffer} onClick={() => navigate("/offers")} />
                <DropdownItem label="Refer & Earn" icon={FaGift} onClick={() => navigate("/refer")} />
                <DropdownItem label="Help" icon={MdHelp} onClick={() => navigate("/help")} />
                <DropdownItem label="Cancel Ticket" icon={MdCancel} onClick={() => navigate("/cancel")} />

                <DropdownItem
                  label="Logout"
                  icon={FaSignOutAlt}
                  danger
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                    navigate("/");
                  }}
                />
              </div>
            )}

          </div>
        </>
      )}

      {/* Modals */}
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
      {/* {isSignupOpen && <Signup onClose={() => setIsSignupOpen(false)} />} */}

      <LanguageSelector
        isOpen={isLanguageOpen}
        onClose={() => setIsLanguageOpen(false)}
        onSelect={changeLanguage}
        selected={language}
      />
    </nav>
  );
}

/* Dropdown Item */
function DropdownItem({ label, icon: Icon, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-3 ${
        danger ? "text-red-600 hover:bg-red-50" : "text-gray-700"
      }`}
    >
      {/* {Icon && <Icon className="text-lg" />} */}
      {Icon && (
  <Icon
    className={`text-lg ${
      danger ? "text-red-600" : "text-[#1A73E8]"
    }`}
  />
)}
      {label}
    </button>
  );
}