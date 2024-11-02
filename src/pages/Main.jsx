import React, { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Mobile, PC } from "../styles/Global_d"; 
import styled, { createGlobalStyle } from "styled-components";

const Main = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [person, setPerson] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();

    useEffect(() => {
        if (location.state) {
            const { name, phoneNumber } = location.state;
            setPerson({ name, phoneNumber });
        }
    }, [location.state]);

    const onClickSchedule = () => {
        navigate("/Schedule");
    };
    const onClickLogout = () => {
        navigate("/");
    };
    const onClickMypage = () => {
        navigate("/My");
    };
    const onClickSetting = () => {
        navigate("/Setting");
    };      
    const onClickAdd = () => {
        navigate("/Add");
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'relative', zIndex: modalOpen ? 100 : 0 }}
        >
            <GlobalStyle />
            <Mobile>
                <ContainerM>
                    <img
                        id="logo"
                        src="/images/main/logo_s.svg"
                        style={{ position: "relative", top: "10px", left: "19px" }}
                    />
                    {/* 스케쥴 바로가기 */}
                    <img
                        id="schedule_btn"
                        src="/images/main/schedule.svg"
                        style={{ position: "relative", top: "1.2px", left: "120px" }}
                        onClick={onClickSchedule}
                    />
                    {/* 로그아웃 바로가기 */}
                    <img
                        className={'modal-open-btn'} 
                        src="/images/main/logout.svg"
                        style={{ position: "relative", left: "140px" }}
                        onClick={() => setModalOpen(true)}
                    />
                    {
                        modalOpen &&
                        <div className={'modal-container'} ref={modalBackground} onClick={e => {
                            if (e.target === modalBackground.current) {
                                setModalOpen(false);
                            }
                        }}>
                            <div className={'modal-content'}>
                                <img
                                    src="/images/main/logout_img.svg"
                                    style={{ position: "relative", width: "180px", left: "30px", top: "35px"}}
                                />
                                <img
                                    src="/images/main/cancel_btn.svg"
                                    style={{ position: "relative", left: "-2px", top: "100px", width: "120px"}}
                                    className={'modal-close-btn'} onClick={() => setModalOpen(false)}
                                />
                                <img
                                    src="/images/main/logout_btn.svg"
                                    style={{ position: "relative", left: "10px", top: "100px", width: "120px"}}
                                    className={'modal-close-btn'} onClick={onClickLogout}
                                />
                            </div>
                        </div>
                    }
                    {/* 마이페이지 바로가기 */}
                    <img
                        id="profile_btn"
                        src="/images/main/profile.svg"
                        style={{ position: "relative", top: "9px", left: "165px", width: "33px", zIndex: "10" }}
                        onClick={onClickMypage}
                    />

                    {/* 담당 노인분들을 확인할 수 있는 박스들 */}
                    <div id="boxes" style={{ marginTop: "20px", zIndex: modalOpen ? 0 : 10 }}>
                        {person && (
                            <div id="box" style={{ marginTop: "20px", marginBottom: "20px" }}>
                                <img
                                    src="/images/main/box.svg"
                                    style={{ position: "relative", left: "25px", height: "170px" }}
                                />
                                <p id="name" style={{ position: "relative", top: "-180px", left: "45px", textAlign:"left"}}>{person.name}</p>
                                <p id="phone" style={{ position: "relative", top: "-195px", left: "48px", textAlign:"left"}}>전화번호 : {person.phoneNumber}</p>
                                <p id="address" style={{ position: "relative", top: "-225px", left: "48px", textAlign:"left"}}>주소 : 경기도 구리시 XX동</p>
                            </div>
                        )}
                    </div>

                    {/* 담당하는 노인분 추가 */}
                    <div id="addbox" style={{ marginTop: "20px", zIndex: modalOpen ? 0 : 10 }}>
                        <img
                            src="/images/main/addBox.svg"
                            style={{ position: "relative", marginTop: "20px", left: "25px", height: "170px"}}
                            onClick={onClickAdd}
                        />
                    </div>
                </ContainerM>
            </Mobile>
            <PC>
                <ContainerP>pc</ContainerP>
            </PC>
        </motion.div>
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
    overflow-x: hidden; /* 가로 및 세로 스크롤을 막기 위한 추가 */
`;

const ContainerP = styled.div`
    min-height: 100vh;
    background-color: #FFF7F0;
`;

export default Main;
