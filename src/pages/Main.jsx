import React, { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Mobile, PC } from "../styles/Global_d"; 
import styled, { createGlobalStyle } from "styled-components";

const Main = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [people, setPeople] = useState([]); // 피관리자 목록 상태
    const [modalOpen, setModalOpen] = useState(false); // 로그아웃 모달 상태
    const modalBackground = useRef();

    useEffect(() => {
        // localStorage에서 피관리자 목록 불러오기
        const storedPeople = JSON.parse(localStorage.getItem('people')) || [];
        setPeople(storedPeople); // 상태 업데이트

        // location.state가 있을 경우 추가된 피관리자 정보 처리
        if (location.state && location.state.personId) {
            fetch(`http://localhost:3000/people/${location.state.personId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // 필요한 정보가 모두 있는지 확인
                    const { name, phone, address, electricUsage, waterUsage } = data;
                    setPeople(prev => [...prev, { name, phoneNumber: phone, address, electricUsage, waterUsage }]); // 새로운 피관리자 추가
                })
                .catch((error) => {
                    console.error('피관리자 정보 가져오기 실패:', error);
                });
        }
    }, [location.state]);

    const onClickSchedule = () => {
        navigate("/Schedule");
    };
    
    const onClickLogout = () => {
        setModalOpen(true); // 모달 열기
    };

    const handleLogout = () => {
        navigate("/"); // 로그아웃 처리
        setModalOpen(false); // 모달 닫기
    };

    const onClickMypage = () => {
        navigate("/My");
    };

    const onClickSetting = (personId) => {
        navigate("/Setting", { state: { personId } });
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
                    {/* 로그아웃 버튼 */}
                    <img
                        className={'modal-open-btn'} 
                        src="/images/main/logout.svg"
                        style={{ position: "relative", left: "140px" }}
                        onClick={onClickLogout}
                    />
                    {/* 마이페이지 바로가기 */}
                    <img
                        id="profile_btn"
                        src="/images/main/profile.svg"
                        style={{ position: "relative", top: "9px", left: "165px", width: "33px", zIndex: "10" }}
                        onClick={onClickMypage}
                    />

                    {/* 담당 노인분들을 확인할 수 있는 박스들 */}
                    <div id="boxes" style={{ marginTop: "20px", zIndex: modalOpen ? 0 : 10 }}>
                        {people.map((person, index) => (
                            <PersonBox key={index}>
                                <p id="name">{person.name}</p>
                                <p id="address">주소: {person.address}</p>
                                <p id="electricUsage">전기사용량: {person.electricUsage} kWh</p>
                                <p id="waterUsage">수도사용량: {person.waterUsage} L</p>
                                {/* 설정 버튼 */}
                                <img
                                    src="/images/main/sett.svg"
                                    style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}
                                    onClick={() => onClickSetting(person.id)} // 각 사람의 설정 페이지로 이동
                                />
                            </PersonBox>
                        ))}
                    </div>

                    {/* 담당하는 노인분 추가 */}
                    <div id="addbox" style={{ marginTop: "20px", zIndex: modalOpen ? 0 : 10 }}>
                        <img
                            src="/images/main/addBox.svg"
                            style={{ position: "relative", marginTop: "20px", left: "25px", height: "170px" }}
                            onClick={onClickAdd}
                        />
                    </div>
                </ContainerM>
            </Mobile>
            <PC>
                <ContainerP>pc</ContainerP>
            </PC>

            {/* 로그아웃 모달 */}
            {modalOpen && (
                <ModalBackground ref={modalBackground} onClick={e => {
                    if (e.target === modalBackground.current) {
                        setModalOpen(false);
                    }
                }}>
                    <ModalContent>
                        <img
                            src="/images/main/logout_img.svg"
                            style={{ width: "180px", marginBottom: "20px" }}
                        />

                        <div>
                            <img
                                src="/images/main/logout_btn.svg"
                                style={{ cursor: "pointer", margin: "10px" }}
                                onClick={handleLogout}
                            />
                            <img
                                src="/images/main/cancel_btn.svg"
                                style={{ cursor: "pointer", margin: "10px" }}
                                onClick={() => setModalOpen(false)}
                            />
                        </div>
                    </ModalContent>
                </ModalBackground>
            )}
        </motion.div>
    );
};

// 모달 스타일
const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;

    h2 {
        margin: 20px 0;
    }
`;

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

const PersonBox = styled.div`
    position: relative;
    margin: 10px 0; /* 위아래 마진을 줄임 */
    padding: 8px; /* 패딩을 줄임 */
    background-color: #ffd99f; /* 연한 회색으로 배경색 변경 */
    border-radius: 15px; /* 둥글게 만들기 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
    max-width: 90%; /* 최대 너비 조정 */
    margin-left: 10px; /* 왼쪽 화면과의 간격 추가 */
    
    /* 내부 텍스트 정렬 */
    display: flex;
    flex-direction: column; /* 세로 정렬 */
    align-items: flex-start; /* 왼쪽 정렬 */

    /* 내부 텍스트 간격 조정 */
    p {
        margin: 2px 0; /* 위아래 마진을 줄여서 간격을 줄임 */
        font-family: 'SOYOMapleBoldTTF'; /* 폰트 설정 */
        font-size: 13px; /* 폰트 크기 설정 */
    }

    #name {
        font-size: 20px; /* 이름의 폰트 크기 조정 */
        font-weight: bold; /* 이름을 강조 */
    }
    
    #phone, #address, #electricUsage, #waterUsage {
        font-family: 'SOYOMapleBoldTTF';
        font-size: 13px;
    }
`;

const ContainerP = styled.div`
    min-height: 100vh;
    background-color: #FFF7F0;
`;

export default Main;
