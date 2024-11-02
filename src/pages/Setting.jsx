import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mobile, PC } from "../styles/Global_d"; 
import styled, { createGlobalStyle } from "styled-components";
// 차트를 넣기 위한 라이브러리
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Chart.js 구성 요소 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Setting = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const personId = location.state?.personId; // 전달받은 personId
    const [person, setPerson] = useState(null);
    const [specialNotes, setSpecialNotes] = useState('');
    const [randomElectricUsage, setRandomElectricUsage] = useState(0);
    const [randomWaterUsage, setRandomWaterUsage] = useState(0);

    useEffect(() => {
        if (personId) {
            fetch(`http://localhost:3000/people/${personId}`)
                .then(response => response.json())
                .then(data => {
                    setPerson(data);
                    // 랜덤값 생성
                    setRandomElectricUsage(Math.floor(Math.random() * 100) + 50); // 50~150 kWh
                    setRandomWaterUsage(Math.floor(Math.random() * 50) + 30); // 30~80 L
                })
                .catch((error) => {
                    console.error('피관리자 정보 가져오기 실패:', error);
                });
        }
    }, [personId]);

    if (!person) {
        return <div>로딩 중...</div>;
    }

    // 차트 데이터 부분
    const data = {
        labels: ['1일', '2일', '3일', '4일', '5일', '6일', '7일', '8일', '9일', '10일', '11일', '12일'],
        datasets: [
            {
                label: '전기 사용량',
                data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 50), // 랜덤 데이터
                borderColor: 'rgb(255, 136, 26)',
                backgroundColor: 'rgba(255, 136, 26, 0.3)',
                fill: true,
                tension: 0.4,
            },
            {
                label: '수도 사용량',
                data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50) + 30), // 랜덤 데이터
                borderColor: 'rgb(102, 51, 0)',
                backgroundColor: 'rgba(102, 51, 0, 0.3)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const onClickMain = () => {
        navigate("/Main");
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

                        {/* 성함 */}
                        <div id="name">{person.name}</div>
                        {/* 이미지 */}
                        {/* 나이 */}
                        <div id="write">나이</div>
                        <div id="age">{new Date().getFullYear() - parseInt(person.birth.substring(0, 4))}세</div>
                        {/* 본인 전화번호 */}
                        <div id="write">본인 전화번호</div>
                        <div id="my_phone">{person.phone}</div>
                        {/* 주소 */}
                        <div id="write">주소</div>
                        <div id="address">{person.address}</div>
                        {/* 특이사항 */}
                        <div id="write">특이 사항</div>
                        <div id="significant_box">
                            <div id="significant">{person.etc}</div>
                        </div>

                        {/* Line Chart 부분 */}
                        <div style={{ margin: '20px' }}>
                            <Line data={data} />
                        </div>

                        {/* 삭제 버튼 */}
                        <div id="delete_btn" style={{ position: "relative", textAlign: "center", marginTop: "30px" }}>
                            <img
                                src="/images/setting/delete_btn.svg"
                                style={{ position: "relative" }}
                            />
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
    height: 120vh; /* 컨테이너 높이를 뷰포트 높이에 맞추기 */
    width: 100%;
    max-width: 390px;
    background-color: #FFF7F0;
    overflow: hidden; /* 가로 및 세로 스크롤을 막기 위한 추가 */

    #name {
        font-family: 'SOYOMapleBoldTTF';
        font-size: 27px;
        text-align: left;
        margin-left: 20px;
        margin-top: 50px;
        width: 80px;
    }

    #write {
        font-family: 'SOYOMapleBoldTTF';
        font-size: 17px;
        text-align: left;
        margin-top: 20px;
        margin-left: 25px;
    }

    #address, #age, #my_phone, #guardian_phone, #significant {
        margin-left: 25px;
        margin-top: 7px;
        text-align: left;
    }
`;

const ContainerP = styled.div`
    min-height: 100vh;
    background-color: #FFF7F0;
`;

export default Setting;
