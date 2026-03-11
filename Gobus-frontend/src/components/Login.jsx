import { useState, useEffect } from "react";
import { FaTimes, FaChevronDown, FaGoogle, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.avif";
import recaptcha from "../assets/recaptcha.png";
import google from "../assets/g-logo.png";


export default function Login({ onClose }) {

  const countryCodes = [
    { code: "+91", name: "India", flag: "🇮🇳" },
    { code: "+1", name: "USA", flag: "🇺🇸" },
    { code: "+44", name: "UK", flag: "🇬🇧" },
    { code: "+61", name: "Australia", flag: "🇦🇺" },
    { code: "+971", name: "UAE", flag: "🇦🇪" },
    { code: "+92", name: "Pakistan", flag: "🇵🇰" },
  ];
 
  const [mobile, setMobile] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // Fallback to localhost if env variable is missing
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const isMobileValid = /^[0-9]{10}$/.test(mobile);
  const isOtpValid = /^[0-9]{6}$/.test(otp);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isResendDisabled && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled, resendTimer]);

  const handleGenerateOtp = async () => {
    setLoading(true);
    setApiError("");
    try {
      const fullPhoneNumber = `${selectedCountry.code}${mobile}`;
      // The backend expects a JSON body. The validation on the backend needs to be fixed to accept full phone numbers.
      const response = await fetch(`${API_URL}/api/auth/register/phone/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhoneNumber })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to send OTP. Please try again.' }));
        throw new Error(errorData.message);
      }

      setShowOtpInput(true);
      setIsResendDisabled(true);
      setResendTimer(30);
    } catch (error) {
      console.error("OTP Error:", error);
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (isResendDisabled || loading) return;
    setLoading(true);
    setOtpError("");
    try {
      const fullPhoneNumber = `${selectedCountry.code}${mobile}`;
      await fetch(`${API_URL}/api/auth/register/phone/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhoneNumber })
      });
      setIsResendDisabled(true);
      setResendTimer(30); // Restart the timer
    } catch (error) {
      setOtpError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setOtpError("");
    try {
      const fullPhoneNumber = `${selectedCountry.code}${mobile}`;
      const response = await fetch(`${API_URL}/api/auth/register/phone/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhoneNumber, otp: otp })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Invalid OTP. Please try again.' }));
        throw new Error(errorData.message);
      }

      const token = await response.text();
      localStorage.setItem('jwtToken', token);

      try {
        if (token && token.includes('.')) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const userData = JSON.parse(jsonPayload);
            login(userData);
        }
      } catch (error) {
        console.error("Token decode failed, logging in with mobile only", error);
        login({ mobile: fullPhoneNumber });
      }
      
      onClose();
      navigate("/");
    } catch (error) {
      setOtpError(error.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  

return (
  <div
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-3"
    onClick={onClose}
  >
    <div
      // className="bg-white w-full max-w-[500px] rounded-2xl shadow-xl relative p-5 sm:p-6"
      className="bg-white w-full max-w-[500px] rounded-2xl shadow-xl relative p-4 sm:p-6"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
      >
        <FaTimes size={18} />
      </button>
 {!showOtpInput ? (
  <>

      {/* Logo + Name */}
     {/* Logo + Name */}
<div className="flex items-center justify-center gap-2">
  <img src={logo} alt="GoBus" className="h-10 w-auto" />
  <span className="text-[#1A73E8] text-2xl font-semibold">
    GoBus
  </span>
</div>
      {/* Title */}
      {/* <h2 className="text-2xl font-bold text-center mt-6"> */}
        <h2 className="text-2xl font-bold text-center mt-4 sm:mt-6">
        Login or Sign up
      </h2>
      <p className="text-gray-500 text-center mt-2 text-sm">
        Welcome back! Let’s get you on board
      </p>

      {/* Mobile Input Box */}
     




      {/* Centered Form Container (IMPORTANT) */}
{/* <div className="flex flex-col items-center mt-6"> */}
  <div className="flex flex-col items-center mt-4 sm:mt-6">
  <div className="w-full max-w-[360px]">
    
  

   {/* Mobile Input Box */}
{/* Mobile Input Box */}
<div className="border border-gray-300 rounded-xl flex items-center bg-gray-50 relative">
  
  {/* Country Selector */}
  <div
    onClick={(e) => {
      e.stopPropagation();
      setDropdownOpen(!dropdownOpen);
    }}
    className="flex items-center gap-2 px-4 py-3 bg-gray-100 cursor-pointer border-r border-gray-300 rounded-l-xl"
  >
    <span className="text-lg">{selectedCountry.flag}</span>
    <span className="font-semibold text-sm">
      {selectedCountry.code}
    </span>
    <FaChevronDown className="text-xs text-gray-500" />
  </div>

  {/* Mobile Input */}
  <input
    type="text"
    placeholder="Mobile Number"
    value={mobile}
    onChange={(e) => {
      const numericValue = e.target.value.replace(/[^0-9]/g, "");
      setMobile(numericValue);
    }}
    className="flex-1 px-4 py-3 outline-none bg-transparent text-sm"
    maxLength={10}
    inputMode="numeric"
  />

  {/* Dropdown List */}
  {dropdownOpen && (
    <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-gray-200 shadow-lg rounded-xl z-50 max-h-48 overflow-y-auto">
      {countryCodes.map((c, index) => (
        <div
          key={index}
          onClick={() => {
            setSelectedCountry(c);
            setDropdownOpen(false);
          }}
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm"
        >
          <span className="text-lg">{c.flag}</span>
          <span className="text-gray-700">{c.name}</span>
          <span className="ml-auto font-semibold text-gray-500">
            {c.code}
          </span>
        </div>
      ))}
    </div>
  )}
</div>

    {/* reCAPTCHA */}
<div
  onClick={() => setCaptchaVerified(!captchaVerified)}
  className={`mt-4 border border-gray-300 rounded-xl px-4 py-3 flex items-center cursor-pointer ${
    captchaVerified ? "border-green-500 bg-green-50" : "bg-gray-50"
  }`}
>
  {/* Checkbox */}
  <div
    className={`w-5 h-5 border rounded mr-3 flex items-center justify-center ${
      captchaVerified ? "bg-blue-500 border-blue-500" : ""
    }`}
  >
    {captchaVerified && (
      <FaCheckCircle className="text-white text-xs" />
    )}
  </div>

  <span className="text-sm text-gray-700">I’m not a robot</span>

  {/* reCAPTCHA Logo + Text (RIGHT SIDE like image) */}
  <div className="ml-auto flex items-center gap-2">
    <img
      src={recaptcha}
      alt="reCAPTCHA"
      className="h-5 w-5 opacity-70"
    />
    <span className="text-xs text-gray-400 font-medium">
      reCAPTCHA
    </span>
  </div>
</div>

    {/* Get OTP Button */}
    <button
      onClick={handleGenerateOtp}
      disabled={!isMobileValid || !captchaVerified || loading}
       className={`w-full mt-5 py-3 rounded-xl font-semibold transition ${
    isMobileValid && captchaVerified && !loading
      ? "bg-[#1A73E8] hover:bg-[#1A73E8] text-white"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
 
    >
      {loading ? "Sending..." : "Generate OTP"}
    </button>

    {/* OR Divider */}
    <div className="flex items-center my-6">
      <div className="flex-1 h-px bg-gray-300"></div>
      <span className="px-3 text-gray-400 text-sm">or</span>
      <div className="flex-1 h-px bg-gray-300"></div>
    </div>

    {/* Google Sign In */}
    <button
      onClick={() =>
        (window.location.href = `${API_URL}/oauth2/authorization/google`)
      }
      className="w-full border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-gray-50"
    >
       <img
    src={google}
    alt="Google"
    className="h-5 w-5"
  />
      <span className="font-medium text-gray-800">
        Sign in with Google
      </span>
    </button>

  </div>
</div>

      {/* Terms */}
      <p className="text-[11px] text-gray-400 text-center mt-4 leading-relaxed">
        By logging in, I agree to{" "}
        <span className="text-blue-500 cursor-pointer">
          Terms & Conditions
        </span>{" "}
        &{" "}
        <span className="text-blue-500 cursor-pointer">
          Privacy Policy
        </span>
      </p>
      </>
 ):(
  <>
            {/* Back Button */}
           <button 
              onClick={() => {
                setShowOtpInput(false);
                setOtpError(""); // Clear error on going back
              }} 
              className="absolute top-3 left-3 bg-gray-100 p-2 rounded-full hover:bg-gray-200"
            >
              <FaArrowLeft />
            </button>

         

            {/* <div className="mt-6 flex flex-col items-center"> */}
            <div className="mt-4 sm:mt-6 flex flex-col items-center">
             {/* <div className="flex items-center justify-center gap-2 mb-6"> */}
             <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
  <img src={logo} alt="GoBus" className="h-10 w-auto" />
  <span className="text-[#1A73E8] text-2xl font-semibold">
    GoBus
  </span>
</div>
  {/* Title */}
  <h2 className="text-2xl font-semibold text-gray-800 text-center">
    OTP Verification
  </h2>

  {/* Subtitle */}
  <p className="text-gray-500 text-sm text-center mt-2">
    Enter OTP sent to{" "}
    <span className="font-medium">
      {selectedCountry.code} {mobile}
    </span>
  </p>

  {/* OTP BOXES */}
  <div className="flex gap-3 mt-6 justify-center">
    {Array.from({ length: 6 }).map((_, index) => (
      <input
        key={index}
        type="text"
        maxLength={1}
        inputMode="numeric"
        value={otp[index] || ""}
        onChange={(e) => {
          const value = e.target.value.replace(/[^0-9]/g, "");
          if (!value) return;

          const newOtp = otp.split("");
          newOtp[index] = value;
          const updatedOtp = newOtp.join("");
          setOtp(updatedOtp);

          // Auto focus next box
          const next = e.target.nextElementSibling;
          if (next) next.focus();

          if (otpError) setOtpError("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Backspace") {
            const newOtp = otp.split("");
            newOtp[index] = "";
            setOtp(newOtp.join(""));

            // Focus previous box on backspace
            const prev = e.target.previousElementSibling;
            if (prev) prev.focus();
          }
        }}
        // className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 border border-gray-200 rounded-lg text-center text-lg font-semibold outline-none focus:ring-2 focus:ring-blue-500"
        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-100 border border-gray-200 rounded-lg text-center text-base sm:text-lg font-semibold outline-none focus:ring-2 focus:ring-blue-500"
      />
    ))}
  </div>

  {/* Error */}
  {otpError && (
    <p className="text-red-500 text-xs mt-3 text-center">
      {otpError}
    </p>
  )}



  <div className="text-sm mt-4 text-center">
  <span className="text-gray-400">
    Didn’t receive?
  </span>{" "}
  <span
    onClick={!isResendDisabled ? handleResendOtp : undefined}
    className={`font-medium ${
      isResendDisabled
        ? "text-gray-400 cursor-not-allowed"
        : "text-blue-600 cursor-pointer hover:underline"
    }`}
  >
    {isResendDisabled ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
  </span>
</div>

  {/* Verify Button (Big Rounded like image) */}
  <button
    onClick={handleVerifyOtp}
    disabled={otp.length !== 6 || loading}
    className={`w-full mt-5 py-3 rounded-xl font-semibold transition ${
      otp.length === 6 && !loading
        ? "bg-[#1A73E8] hover:bg-[#1A73E8] text-white"
        : "bg-blue-300 text-white cursor-not-allowed"
    }`}
   
  >
    {loading ? "Verifying..." : "Verify"}
  </button>
</div>
          </>

 )}
    </div>
  </div>
);
}
