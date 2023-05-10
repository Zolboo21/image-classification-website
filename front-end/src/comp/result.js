import React, { useState, useEffect } from 'react';
import '../Res.css';

function Result() {
    const { imageUrl } = useParams();
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetch(`/api/get-image?imageUrl=${imageUrl}`)
            .then((response) => response.blob())
            .then((data) => {
                setImage(URL.createObjectURL(data));
            })
            .catch((error) => {
                console.error("Error loading image", error);
            });
    }, [imageUrl]);

    return (
        <div className="main-page"> 
            <div className="slidebar">
                <Slidebar />        //슬라이드바 구현
            </div>
            <div className="image-frame">
                <canvas className="image">
                    {image ? (      //받아온 이미지를 화면에 표시
                        <img src={image} alt="uploaded" style={{ maxWidth: "100%" }} />
                    ) : (
                        <div>Loading...</div>
                    )}
                </canvas>
            </div>
        </div>
    );
}

export default Result;