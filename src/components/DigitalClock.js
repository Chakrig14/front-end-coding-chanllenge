import { useState, useEffect } from "react";

const DigitalClock = () => {
    const date = new Date();
    const [dateDigit, setDateDigit] = useState("");
    let timer;
    function getDateInterval() {
        timer = setInterval(() => {
            let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            setDateDigit(hours + ":" + minutes + ":" + seconds);
        }, 1000)
    }
    useEffect(() => {
        getDateInterval()
        return () => clearInterval(timer);
    }, [dateDigit]);
    return (
        <div className="clock-container">
            <div className="clock">
                <p>{dateDigit}</p>
            </div>
        </div>
    )
}

export default DigitalClock;