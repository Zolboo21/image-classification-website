import React from "react";
import "./Slidebar.css";

const SlideBar = () => {
    const [position, setPosition] = useState(0);

    useEffect(() => {
        const slideTimer = setInterval(() => {
            setPosition((position + 1) % 5);
        })
    })

    return (
        <div className="slide-bar">
            <div className="slide-container">
                <div className="slide-item">
                    <h3>슬라이드 1</h3>
                </div>
                <div className="slide-item">
                    <h3>슬라이드 2</h3>
                </div>
                <div className="slide-item">
                    <h3>슬라이드 3</h3>
                </div>
                <div className="slide-item">
                    <h3>슬라이드 4</h3>
                </div>
                <div className="slide-item">
                    <h3>슬라이드 5</h3>
                </div>
            </div>
        </div>
    )
}