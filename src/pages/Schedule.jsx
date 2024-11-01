import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Mobile } from "../styles/Global_d"; 
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
    const [schedules, setSchedules] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        // 스케줄 데이터를 가져오는 함수
        fetch('http://localhost:3000/schedules')
            .then(response => response.json())
            .then(data => {
                setSchedules(data);
            })
            .catch((error) => {
                console.error('스케줄 데이터 가져오기 실패:', error);
            });
    }, []);

    const handleClick = () => {
        navigate("/Sadd"); 
    };

    const handleClicks = () => {
        navigate("/Main"); 
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Mobile>
                <ContainerM>
                    <div id='B_Btn' onClick={handleClicks}>
                        <img src="/images/Btn_back.svg" alt="Back Button"></img>
                    </div>

                    <div id="title">
                        오늘의 일정
                    </div>

                    {schedules.map((schedule, index) => (
                        <div key={index} id="box" style={{ marginTop: "10px", position: 'relative' }}>
                            <img
                                src="/images/Schedule/box.svg"
                                style={{ width: "100%", height: "auto" }}
                            />
                            <p id="name" style={{ position: "absolute", top: "10px", left: "30px", textAlign: "left", margin: 0 }}>
                                {schedule.name}
                            </p>
                            
                            <p id="Date" style={{ position: "absolute", top: "40px", left: "30px", textAlign: "left", margin: 0 }}>
                                {new Date(schedule.date).toLocaleString()} {/* 날짜 형식 변환 */}
                            </p>
                        </div>
                    ))}

                    <BtnContainer>
                        <div id='btn_A' onClick={handleClick}>
                            <img src="/images/Schedule/add_Btn.svg" alt="Add Button"></img>
                        </div>
                    </BtnContainer>

                    <img
                        id="logo"
                        src="/images/Slogo.svg"
                    />
                </ContainerM>
            </Mobile>
        </motion.div>
    );
};

// 버튼을 하단 중앙에 위치시키기 위한 새로운 styled-component
const BtnContainer = styled.div`
    position: absolute; /* 절대 위치 */
    bottom: 20px; /* 하단에서 20px 떨어진 위치 */
    left: 50%; /* 왼쪽 50% */
    transform: translateX(-50%); /* 중앙 정렬을 위한 변환 */
`;

const ContainerM = styled.div`
    height: 100vh; /* 컨테이너 높이를 뷰포트 높이에 맞추기 */
    width: 100%;
    max-width: 390px;
    background-color: #FFF7F0;
    overflow-x: hidden; /* 가로 및 세로 스크롤을 막기 위한 추가 */

    #B_Btn {
        align-self: flex-start; 
        width: 100%; 
        text-align: left; 
        align-items: center; 
    }

    #title {
        color: #333;
        font-size: 24px;
        font-weight: bold;
        margin-top: 20px;
        margin-left: 10px;
        margin-bottom: 20px; 
    }
    
    #logo {
        position: absolute;
        top: 10px;
        right: 10px;
    }
`;

export default Schedule;
