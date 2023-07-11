import {useState, useRef} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Example() {

    const cropperRef = useRef(null);  // 크롭 컴포넌트의 ref

    const [processedData, setProcessedData] = useState([]);  // 서버로부터 받은 데이터
    const [divContent, setDivContent] = useState(null);  // 결과 이미지를 담을 div의 내용

    const [hideList, setHideList] = useState(false); // 추가된 상태 변수 가리기용
    const [showUpload, setShowUpload] = useState(false); // 추가된 상태 변수 가리기용

    const [resultCount, setResultCount] = useState(12);  // 결과 이미지 출력 갯수
    const [onCNN, setOnCNN] = useState(true);  // CNN 사용 여부

    const [inputImage, setInputImage] = useState(null);  // 유저가 첨부한 이미지

    const [croppedImage, setCroppedImage] = useState(null);  // 유저가 선택한 영역만큼 크롭된 이미지

    // 유저가 선택한 영역만큼 이미지를 크롭
    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    };

    // 입력값의 범위를 제한하는 함수
    const handleResultCountChange = (e) => {
        if (e.target.value < 0) {
            e.target.value = 0;
        }
        if (e.target.value > 500) {
            e.target.value = 500;
        }
    }

    // 결과 이미지 출력 갯수를 변경하는 함수
    const handleButtonClick = () => {
        let value = document.getElementById('input').value;
        setResultCount(Number(value));
    }

    // CNN 사용 여부를 변경하는 함수
    const handleCNNButtonClick = () => {
        let onCnn = document.getElementById("on-cnn").checked;
        if(onCnn){
            setOnCNN(true);
        }else{
            setOnCNN(false);
        }
    }



    // 이미지를 서버로 전송하는 함수
    const handleImageSend = () => {
        setDivContent(<div style={{'text-align': "center"}}>
            <FontAwesomeIcon icon="fa-solid fa-spinner-third" spin/>로딩중</div>); // myDiv의 내용을 비웁니다.
        setHideList(true);
        if (croppedImage) {
            const imageElement = cropperRef?.current;
            const cropper = imageElement?.cropper;
            const data = new FormData();
            const croppedImage = cropper.getCroppedCanvas().toDataURL('image/jpeg');
            const blob = dataURItoBlob(croppedImage);
            data.append('filepath', blob, 'croppedImage.jpg');

            const setting = {
                output_limit: resultCount,
                on_cnn: onCNN
            }; // 보낼 JSON 데이터
            data.append('setting', JSON.stringify(setting));


            fetch(`http://210.115.229.250:5000/process_image`, {
                method: 'POST',
                body: data,
            })
                .then(response => response.json())
                .then(data => {
                    setDivContent(''); // 컴포넌트가 처음으로 렌더링될 때 myDiv의 내용을 비웁니다.
                    setProcessedData(data);
                    console.log(data);
                    setHideList(false);
                })
                .catch(error => {
                    console.error('Error sending image:', error);
                });
        }
    };


    // Data URL을 Blob으로 변환하는 함수
    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = 'image/jpeg';
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: mimeString});
    }

    // 드롭된 파일에 접근하여 이미지를 변수에 저장하는 함수
    const handleDrop = (e) => {
        setShowUpload(true);
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setInputImage(URL.createObjectURL(file));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };


    const research = () => {
        setShowUpload(false);
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);


    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);


    return (
        <>
            <link rel="stylesheet"
                  href={"https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css"}/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-auto bg-light sticky-top">
                        <div
                            className="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
                            <a href="/" className="d-block p-3 link-dark text-decoration-none" title=""
                               data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                                <i className="bi-house fs-1"></i>
                            </a>
                            <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center justify-content-between w-100 px-3 align-items-center">
                                <li>
                                    <a href="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip"
                                       onClick={research} data-bs-placement="right" data-bs-original-title="Dashboard">
                                        <i className="bi bi-arrow-clockwise fs-1"/>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip"
                                       onClick={handleShow} data-bs-placement="right"
                                       data-bs-original-title="Customers">
                                        <i className="bi-people fs-1"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip"
                                       onClick={handleShow2} data-bs-placement="right"
                                       data-bs-original-title="Customers">
                                        <i className="bi bi-question-square fs-1"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip"
                                       onClick={handleShow3}
                                       data-bs-placement="right" data-bs-original-title="Customers">
                                        <i className="bi bi-gear fs-1"></i>
                                    </a>
                                </li>

                            </ul>

                        </div>
                    </div>
                    <div className="col-sm p-3 min-vh-100">
                        <div className="container">
                            {/* 드래그앤드랍 + 이미지 첨부 */}
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                style={{
                                    width: '100%',
                                    minHeight: '300px',
                                    border: '2px dashed gray',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: showUpload ? 'none' : 'flex'
                                }}
                            >
                                <input type="file" accept="image/*"
                                       onChange={e =>
                                           setInputImage(URL.createObjectURL(e.target.files[0]))
                                       }/>
                            </div>
                            {/* 종료 */}
                            <br></br>

                            {/* 이미지 자르기 영역 */}
                            <div className="col-12">
                                <Cropper
                                    src={inputImage}
                                    crop={onCrop}
                                    ref={cropperRef}

                                />
                            </div>
                            {/* 종료 */}
                            <br></br>
                            <button type="button" className="btn btn-info col-12" onClick={handleImageSend}>이미지 보내기
                            </button>

                            <br/><br/>
                            <div id="myDiv">
                                {divContent}

                                <div className="row" id="list" style={{display: hideList ? 'none' : 'flex'}}>
                                    {processedData.map((item, index) => (
                                        <div id="{key}" className="col-md-4 col-lg-2 col-12">
                                            <div className="card">
                                                <img style={{"height": "200px"}}
                                                     src={`http://210.115.229.250:5000/static/img/${item.class}/${item.path}`}
                                                     alt={'img'}/>
                                            </div>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <hr></hr>
                            <p>copyright&copy;oslab</p>
                        </div>

                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>개발자 소개</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    구윤형 -> Backend (weaviate, flask, docker, tensorflow)<br></br>
                    강명재 -> Frontend (react, bootstrap, figma)<br></br>
                    절버 -> Frontend (react, design, documentation)<br></br>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn_close" variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header>
                    <Modal.Title>이미지 검색 사용법</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>1. 이미지 업로드</h2>
                    <p>↓ 이미지를 드래그앤드랍 또는 이미지 파일 선택을 통해 업로드합니다.</p>
                    <img alt={'drag&drop'} src={require('./Img/dragAndDropWindow.png')} style={{width: '100%'}}/>
                    <br/>
                    <p>↓ 이미지 보내기 버튼을 클릭하면 서버에 저장된 패션 데이터를 결과로 반환해줍니다.</p>
                    <img alt={'send'} src={require('./Img/sendButton.png')} style={{width: '100%'}}/>
                    <h2>2. 이미지 자르기</h2>
                    <p>↓ 클리핑할 영역을 마우스로 드래그하여 이미지를 자릅니다.</p>
                    <img alt={'crop'} src={require('./Img/crop.png')} style={{width: '50%'}}/>
                    <br/>
                    <p>* 클리핑의 활용 예 -> 유사 이미지 결과 오류에 대한 정확도 향상</p>
                    <p>↓ 클리핑 기능을 활용하지 않았을 때 나온 결과물</p>
                    <img alt={'noCrop'} src={require('./Img/errorResult.png')} style={{width: '100%'}}/>
                    <p>↓ 클리핑 기능을 활용했을 때 나온 결과물</p>
                    <img alt={'crop'} src={require('./Img/successResult.png')} style={{width: '100%'}}/>
                    <h2>3. 옵션 기능 - 출력 이미지 갯수 조정</h2>
                    <p>출력 이미지 갯수를 조정하여 원하는 결과물을 얻을 수 있습니다.</p>
                    <p>↓ 왼쪽 메뉴바의 설정 아이콘을 클릭합니다.</p>
                    <img alt={'option'} src={require('./Img/option.png')} style={{width: '20%'}}/>
                    <p>↓ 출력 이미지 갯수를 조정한 후 change 버튼을 클릭하면 반영됩니다.</p>
                    <img alt={'option'} src={require('./Img/option2.png')} style={{width: '100%'}}/>
                    <p>↓ 반영된 결과 모습</p>
                    <img alt={'option'} src={require('./Img/option3.png')} style={{width: '100%'}}/>
                    <p>↓ 홈 버튼 아이콘을 누르면 옵션 기능이 초기화 됩니다. (기본값: 12개)</p>
                    <img alt={'option'} src={require('./Img/option4.png')} style={{width: '20%'}}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn_close" variant="secondary" onClick={handleClose2}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show3} onHide={handleClose3}>
                <Modal.Header>
                    <Modal.Title>옵션</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>출력할 이미지 개수 지정</p>
                    <input type="number" id="input" onChange={handleResultCountChange}></input>
                    <button onClick={handleButtonClick}>change</button>
                    <br/>
                    <p>현재 설정된 값: {resultCount}</p>
                    <p>cnn-model 적용 여부 지정</p>
                    <input type="radio" id="on-cnn" name="cnn" value="cnn 적용" defaultChecked={true}></input>
                    <label htmlFor="on-cnn">cnn 적용</label>
                    <input type="radio" id="off-cnn" name="cnn" value="cnn 미적용" ></input>
                    <label htmlFor="off-cnn">cnn 미적용</label>
                    <button onClick={handleCNNButtonClick}>change</button>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn_close" variant="secondary" onClick={handleClose3}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;
