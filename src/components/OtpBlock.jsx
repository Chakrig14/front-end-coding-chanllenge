import { useEffect, useRef, useState } from "react";

const OtpBlock = ({ length, onOtpSubmit = () => { } }) => {
    const [otp, setotp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [])

    function handleOtp(index, e) {
        let val = e.target.value;
        let newOtp = [...otp];
        newOtp[index] = val.substring(val.length - 1);
        setotp(newOtp);
        const combinedOtp = newOtp.join("");
        if (val && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
        if (combinedOtp.length === length) {
            setTimeout(() => {
                onOtpSubmit(combinedOtp);
            }, 2000)
        }
    }

    function handleKeyDown(index, e) {
        if (e.key === "Backspace" && index > 0 && !otp[index] && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    }

    return (
        <div className="flex flex-row mt-4">
            {otp && otp.map((item, index) =>
                <input
                    value={item}
                    ref={(input) => (inputRefs.current[index] = input)}
                    key={index}
                    type="text"
                    className="border-2 border-sky-500 text-center focus:bg-red-100 ml-2 w-12 h-12 text-black"
                    onChange={(e) => handleOtp(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)} />)}
        </div>
    )
}

export default OtpBlock;