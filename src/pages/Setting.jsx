import React from 'react';
import { useNavigate } from "react-router-dom";
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
    
    const onClickMain = () => {
        navigate("/Main");
    };

    // 차트 데이터 부분
    const data = {
        labels: ['1일', '2일', '3일', '4일', '5일', '6일', '7일', '8일', '9일', '10일', '11일', '12일'],
        datasets: [
            {
                label: '통화량',
                data: [2, 5, 10, 8, 9, 3, 4, 2, 1, 2, 3, 4],
                borderColor: 'rgb(255, 136, 26)',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                fill: true,
                tension: 0.4,
            },
            {
                label: '전기 및 수도',
                data: [50, 40, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
                borderColor: 'rgb(102, 51, 0)',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                fill: true,
                tension: 0.4,
            },
        ],
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
                        <div id="name">고길동</div>
                        {/* 이미지 */}
                        <div id="img" style={{marginLeft: "195px", marginTop: "40px", height: "160px", width: "160px"}}>
                            <img src="/images/setting/pubao.jpg" style={{ height: "160px", width: "160px", borderRadius:  "15px", objectFit: "cover" }}/>
                        </div>
                        {/* 나이 */}
                        <div id="write" style={{marginTop: "-170px"}}>나이</div>
                        <div id="age">87</div>
                        {/* 본인 전화번호 */}
                        <div id="write">본인 전화번호</div>
                        <div id="my_phone">010-xxxx-xxxx</div>
                        {/* 보호자 전화번호 */}
                        <div id="write">보호자 전화번호</div>
                        <div id="guardian_phone">010-xxxx-xxxx</div>
                        {/* 주소 */}
                        <div id="write">주소</div>
                        <div id="address">서울시 중랑구 xx동</div>
                        {/* 특이사항 */}
                        <div id="write">특이 사항</div>
                        <div id="significant_box">
                            <div id="significant">허리디스크</div>
                            <div id="significant">당뇨</div>
                        </div>                      

                        {/* Line Chart 부분 */}
                        <div style={{ margin: '20px' }}>
                            <Line data={data} />
                        </div>

                        {/* 삭제 버튼 */}
                        <div id="delete_btn" style={{position: "relative", textAlign: "center", marginTop: "30px"}}>
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
