import { useRef, useState } from "react";
import OtpBlock from "./OtpBlock";

const OtpValidation = () => {
    const [phoneNum, setphoneNum] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const inputRef = useRef();
    function validatePhoneNumber(e) {
        setphoneNum(e.target.value.replace(/[^0-9]/g, ''));
    }
    function handleOtpSubmit(e) {
        e.preventDefault();
        if (phoneNum.length !== 10) {
            alert("Mandatory fields should be filled");
            console.log(phoneNum);
        }
        else {
            setShowOtp(true);
        }
    }
    function otpSubmit(val) {
        setShowOtp(false);
        setphoneNum("");
        alert("OTP validated successfully " + val);
    }
    return (
        <div className="bg-slate-900 text-white w-screen h-screen">
            <h1>OTP</h1>
            <form onSubmit={(e) => handleOtpSubmit(e)}>
                <input value={phoneNum} className="text-black" ref={inputRef} type="text" placeholder="Enter your telephone number" onChange={(e) => validatePhoneNumber(e)} />
                <button type="submit">Submit</button>
            </form>
            {showOtp ? <div>
                <p>Entered Phone Number is {phoneNum}</p>
                <OtpBlock length={4} onOtpSubmit={otpSubmit} /></div> : ""}
        </div>
    )
}

export default OtpValidation;