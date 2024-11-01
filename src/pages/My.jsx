import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Mobile, PC } from "../styles/Global_d"; 
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const My = () => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("김소연");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [affiliation, setAffiliation] = useState("수원시 소속");

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const navigate = useNavigate();    
    const handleClick = () => {
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
                    <div id='B_Btn' onClick={handleClick}>
                        <img src="/images/Btn_back.svg" alt="Back Button"></img>
                    </div>
                    <div id='title'>
                        {name}
                    </div>
                    <div id='affiliation'>
                        {affiliation}
                    </div>
                    <div id='btn_M' onClick={toggleModal}>
                        <img src="/images/My/Btn_mo.svg" alt="Modify Button"></img>
                    </div>
                    {showModal && (
                        <div>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="이름"
                            />
                            <input
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="전화번호"
                            />
                            <input
                                value={affiliation}
                                onChange={(e) => setAffiliation(e.target.value)}
                                placeholder="소속"
                            />
                        </div>
                    )}
                    <img
                        id="logo"
                        src="/images/Slogo.svg"
                    />
                </ContainerM>
            </Mobile>
            <PC>
                <ContainerP>pc</ContainerP>
            </PC>
        </motion.div>
    );
};

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
    }

    #logo {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    
    #title {
        color: #B45404; 
        font-size: 40px;
        font-weight: bold;
        margin-top: 40px;
        margin-bottom: 20px; 
        text-align: center; /* 가운데 정렬 */
    }

    #affiliation {
        color: grey; 
        font-size: 13px;
        margin-top: 10px;
        margin-bottom: 20px;
        text-align: center; /* 가운데 정렬 */
    }

    #btn_M {
        margin-top: 20px;
        margin-bottom: 20px;

        display: flex;
        justify-content: center; 
    }

    input {
        
        padding: 10px;
        width: 300px;
        border: 1px solid #B45404;
        background-color: transparent; 
        border-radius: 15px;
        font-size: 16px;
        display: block; 
        margin: 0 auto 10px; /* 수평 가운데 정렬 */
    }
`;

const ContainerP = styled.div`
    min-height: 100vh;
    background-color: #FFF7F0;
`;

export default My;
