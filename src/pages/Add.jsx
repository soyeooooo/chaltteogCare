import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mobile, PC } from "../styles/Global_d"; 
import styled, { createGlobalStyle } from "styled-components";

const Add = () => {
    const navigate = useNavigate();
    
    const [name, setName] = useState(''); // 이름 상태
    const [phoneNumber, setPhoneNumber] = useState(''); // 전화번호 상태
    const [foundPerson, setFoundPerson] = useState(null); // 검색된 사람 정보 상태
    const [modalOpen, setModalOpen] = useState(false); // 모달 상태
    const [people, setPeople] = useState([]); // 피관리자 데이터 상태

    // 목 서버에서 피관리자 데이터를 가져오는 함수
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/people"); // 목 서버 주소
                const data = await response.json();
                setPeople(data); // 피관리자 데이터 저장
            } catch (error) {
                console.error("데이터를 가져오는 데 오류가 발생했습니다:", error);
            }
        };
        fetchData();
    }, []);

    const searchPerson = () => {
        const found = people.find(person => person.name === name && person.phone === phoneNumber); // 이름과 전화번호로 검색
        setFoundPerson(found);
        setModalOpen(true); // 모달 열기
    };

    const onClickMain = () => {
        if (foundPerson) {
            navigate("/Main", { state: { person: foundPerson } }); // Main 컴포넌트에 상태 전달
        }
    };

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
                            value={name} // 상태 연결
                            onChange={(e) => setName(e.target.value)} // 상태 업데이트
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
                            value={phoneNumber} // 상태 연결
                            onChange={(e) => setPhoneNumber(e.target.value)} // 상태 업데이트
                        />         

                        {/* 찾아보기 버튼 */}
                        <div style={{ textAlign: "center", position: "relative", height: "35px",  marginTop: "180px" }}>
                            <img
                                src="/images/add/s_btn.svg"
                                style={{ position: "relative" }}
                                onClick={searchPerson} // 버튼 클릭 시 검색 실행
                            />
                        </div>

                        {/* 모달창 부분 */}
                        {
                            modalOpen && 
                            <div className={'modal-container'} onClick={() => setModalOpen(false)}>
                                <div className={'modal-content'}>
                                    {foundPerson ? (
                                        <>
                                            <h2>{foundPerson.name}</h2>
                                            <p>전화번호: {foundPerson.phone}</p>
                                            <button 
                                                style={{ marginTop: "20px", padding: "10px 20px", borderRadius: "10px", backgroundColor: "#FFB74D", border: "none", cursor: "pointer" }}
                                                onClick={onClickMain}
                                            >
                                                연결하기
                                            </button>
                                            <img
                                                src="/images/add/modal_btn.svg" // 닫기 버튼 이미지
                                                style={{ position: "absolute", bottom: "10px", right: "10px", cursor: "pointer" }} // 오른쪽 아래 위치
                                                onClick={() => setModalOpen(false)} // 모달 닫기
                                            />
                                        </>
                                    ) : (
                                        <p>정보를 찾을 수 없습니다.</p>
                                    )}
                                </div>
                            </div>
                        }
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
        position: relative; /* 상대 위치로 닫기 버튼 조정 */
        text-align: center;
    }
`;

const ContainerP = styled.div`
    min-height: 100vh;
    background-color: #FFF7F0;
`;

export default Add;
