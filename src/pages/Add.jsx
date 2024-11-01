import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mobile, PC } from "../styles/Global_d"; 
import styled, { createGlobalStyle } from "styled-components";

const Add = () => {
    const navigate = useNavigate();
    
    const onClickMain = () => {
        navigate("/Main");
    };

    // 박스 선택 시 빨간 줄 테두리가 생기도록 기능함
    const [isBoxRed, setIsBoxRed] = useState(false);

    const toggleBoxImage = () => {
        setIsBoxRed(prevState => !prevState);
    };

    // 모달창 부분
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();

    return (
        <>
            <GlobalStyle />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Mobile>
                    <ContainerM>
                        {/* 백 버튼 */}
                        <img
                            id="back"
                            src="/images/main/back.svg"
                            style={{ position: "relative", top: "10px", left: "10px" }}
                            onClick={onClickMain}
                        />
                        <img
                            id="logo"
                            src="/images/main/logo_s.svg"
                            style={{ position: "relative", top: "10px", left: "285px" }}
                        />
                        <img
                            src="/images/add/lo.svg"
                            style={{ position: "relative", top: "60px", left: "-59px" }}
                        />
        
                        {/* 성함 */}
                        <img
                            src="/images/add/name.svg"
                            style={{ position: "relative", top: "112px", left: "-215px" }}
                        />
                        <input 
                            style={{ position: "relative", top: "120px", left: "20px" }}
                            id="nameInput"
                            type="text"
                            placeholder="성함을 입력해주세요."
                        />           
        
                         {/* 전화번호  */}
                        <img
                            src="/images/add/phone.svg"
                            style={{ position: "relative", top: "140px", left: "22px" }}
                        />
                        <input 
                            style={{ position: "relative", top: "148px", left: "20px" }}
                            id="phoneInput"
                            type="text"
                            placeholder="010-XXXX-XXXX 형식으로 입력해주세요."
                        />         

                        {/* 찾아보기 버튼 */}
                        <div style={{ textAlign: "center", position: "relative", height: "35px",  marginTop: "180px" }}>
                            <img
                                src="/images/add/s_btn.svg"
                                style={{ position: "relative" }}
                            />
                        </div>

                        {/* 찾아보기 버튼을 눌렀을 경우, 정보가 있다면 뿅하고 나타나는 영역 */}
                        <div id="found">
                            {/* 찾는 노인분 정보가 있을 경우, 나타나는 박스 */}
                            <div id="box" style={{ marginTop: "50px", height: "108px"}} onClick={toggleBoxImage}>
                                <img
                                    src={isBoxRed ? "/images/add/box_red.svg" : "/images/add/box.svg"}
                                    style={{ position: "relative", left: "22px", height: "110px" }}
                                />
                                <p id="findName" style={{ position: "relative", top: "-122px", left: "45px", textAlign:"left"}}> 고길동 </p>
                                <p id="phone" style={{ position: "relative", top: "-135px", left: "48px", textAlign:"left"}}> 010-0000-0000 </p>
                                <p id="address" style={{ position: "relative", top: "-145px", left: "48px", textAlign:"left"}}> 주소 : </p>
                                <p id="address" style={{ position: "relative", top: "-180.5px", left: "88px", textAlign:"left"}}> 경기도 구리시 XX동 </p>
                            </div>

                            {/* 연결 버튼 */}
                            <div className={'btn-wrapper'} style={{ textAlign: "center", position: "relative", marginTop: "240px"}}>
                                <img
                                    src="/images/add/btn.svg"
                                    style={{ top: "-210px", position: "relative" }}
                                    className={'modal-open-btn'} 
                                    onClick={() => setModalOpen(true)}
                                />
                            </div>
                            {
                                modalOpen &&
                                <div className={'modal-container'} ref={modalBackground} onClick={e => {
                                if (e.target === modalBackground.current) {
                                    setModalOpen(false);
                                }
                                }}>
                                <div className={'modal-content'}>
                                    <img
                                        src="/images/add/picture.svg"
                                        style={{ position: "relative", width: "150px", left: "43px", top: "50px"}}
                                    />
                                    <img
                                        src="/images/add/write.svg"
                                        style={{ position: "relative", left: "35px", top: "60px"}}
                                    />
                                    <img
                                        src="/images/add/modal_btn.svg"
                                        style={{ position: "relative", left: "55px", top: "120px"}}
                                        className={'modal-close-btn'} onClick={() => setModalOpen(false)}
                                />
                                </div>
                                </div>
                            }
                        </div>
                    </ContainerM>
                </Mobile>
                <PC>
                    <ContainerP>pc</ContainerP>
                </PC>
            </motion.div>
        </>
    );
};

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'SOYOMapleBoldTTF';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/SOYOMapleBoldTTF.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
    }
`;

const ContainerM = styled.div`
    height: 100vh; /* 컨테이너 높이를 뷰포트 높이에 맞추기 */
    width: 100%;
    max-width: 390px;
    background-color: #FFF7F0;
    overflow: hidden; /* 가로 및 세로 스크롤을 막기 위한 추가 */

    #name {
        font-family: 'SOYOMapleBoldTTF';
        font-size: 25px;
    }

    #findName {
        font-family: 'SOYOMapleBoldTTF';
        font-size: 20px;
    }

    input {
        width: 330px;
        height: 40px; /* 높이를 키워 클릭 영역을 확실히 확보 */
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        background-color: transparent;
        color: #000;
        font-family: "Gothic A1";
        font-size: 16px;
        font-weight: 400;  
    }

    input::placeholder {
        color: rgba(0, 0, 0, 0.3);
    }

    /* 모달 css */
    .btn-wrapper {
        display: flex;
        justify-content: center;
        margin-top: 5rem;
        z-index: 0;
    }

    .modal-open-button, .modal-close-btn {
        cursor: pointer;
        margin-left: auto;
    }

    .modal-container {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
        background-color: #FFF7F0;
        width: 250px;
        height: 360px;
        padding: 15px;
        border-radius: 10px;
    }
`;

const ContainerP = styled.div`
    min-height: 100vh;
    background-color: #FFF7F0;
`;

export default Add;
