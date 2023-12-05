import { useState } from "react"

export default function TabActive({ items }) {
    const [clickTab, setClickTab] = useState("html");
    function btnClick(val) {
        setClickTab(val);
    }
    return (
        <div>
            <div>
                {items.items.map((tab, index) => (
                    <button onClick={() => btnClick(tab.value)} key={index}>{tab.label}</button>
                ))}
            </div>
            <div>
                {items.items.map((tabDesc, index) => (
                    clickTab === tabDesc.value ? <p key={index}>{tabDesc.desc}</p> : ""
                ))}
            </div>
        </div>
    )
}