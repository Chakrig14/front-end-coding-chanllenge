import { useState, useEffect } from "react";
import "../src/App.css";

const TrafficLight = () => {
    const [currentLight, setCurretnLight] = useState("green");
    function changeLight(currentLight) {
        if (currentLight === "green") {
            setCurretnLight("yellow");
        }
        else if (currentLight === "yellow") {
            setCurretnLight("red");
        }
        else if (currentLight === "red") {
            setCurretnLight("green");
        }
    }
    let timer;
    function changeInterval(interval) {
        timer = setInterval(() => {
            changeLight(currentLight);
        }, interval);

        return () => clearInterval(timer)
    }

    useEffect(() => {
        if (currentLight === "green") {
            changeInterval(4000);
        }
        else if (currentLight === "yellow") {
            changeInterval(300);
        }
        else if (currentLight === "red") {
            changeInterval(3000);
        }
        return () => clearInterval(timer)
    }, [currentLight])

    return (
        <div className="container">
            <div className="traffic-light-stand">
                <div className="traffic-light-row">
                    <div className="traffic-light" style={{ backgroundColor: currentLight === "red" ? "red" : "" }}>

                    </div>
                    <div className="traffic-light" style={{ backgroundColor: currentLight === "yellow" ? "yellow" : "" }}>
                    </div>
                    <div className="traffic-light" style={{ backgroundColor: currentLight === "green" ? "green" : "" }}>

                    </div>
                </div>
            </div>
            <div className="traffic-light-slide">
                <div className="traffic-light-column">
                    <div className="traffic-light" style={{ backgroundColor: currentLight === "red" ? "red" : "" }}>

                    </div>
                    <div className="traffic-light" style={{ backgroundColor: currentLight === "yellow" ? "yellow" : "" }}>
                    </div>
                    <div className="traffic-light" style={{ backgroundColor: currentLight === "green" ? "green" : "" }}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrafficLight;
