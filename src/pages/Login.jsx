import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mobile, PC } from "../styles/Global_d"; 
import styled from "styled-components";

const Login = () => {
    const [phonenumber, setPhonenumber] = useState('');
    const [passwd, setPasswd] = useState('');
    const navigate = useNavigate();

    const onClickMain = () => {
        // 로그인 처리
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(users => {
                // 전화번호와 비밀번호가 일치하는 사용자 찾기
                const user = users.find(u => u.phonenumber === phonenumber && u.passwd === passwd);
                if (user) {
                    console.log('로그인 성공:', user);
                    navigate("/Main"); // 로그인 성공 후 메인 페이지로 이동
                } else {
                    alert('전화번호 또는 비밀번호가 올바르지 않습니다.');
                }
            })
            .catch((error) => {
                console.error('로그인 실패:', error);
            });
    };

    const onClickSignup = () => {
        navigate("/Signup");
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Mobile>
                <ContainerM>
                    <div id="title">
                        <img src="/images/login/m_title.svg" style={{ position: "relative", top: "40px", left: "30px" }}/>
                    </div>
                    <div>
                        <input 
                            style={{ position: "relative", top: "60px", left: "60px" }}
                            name="phonenumber"
                            type="text"
                            placeholder="전화번호"
                            value={phonenumber}
                            onChange={(e) => setPhonenumber(e.target.value)}
                        />
                        <input 
                            style={{ position: "relative", top: "70px", left: "60px" }}
                            name="passwd"
                            type="password"
                            placeholder="비밀번호"
                            value={passwd}
                            onChange={(e) => setPasswd(e.target.value)}
                        />
                    </div>
                    <div>
                        <img 
                            src="/images/login/m_membership.svg" 
                            style={{ position: "relative", top: "90px", left: "170px" }} 
                            onClick={onClickSignup}
                        />
                    </div>
                    <div>
                        <img 
                            src="/images/login/m_btn.svg" 
                            style={{ position: "relative", top: "140px", left: "67px" }} 
                            onClick={onClickMain}
                        />
                        <img 
                            src="/images/login/m_k_btn.svg" 
                            style={{ position: "relative", top: "155px", left: "67px" }}
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

const ContainerM = styled.div`
    height: 100vh; 
    width: 100%;
    max-width: 390px;
    background-color: #FFF7F0;
    overflow-x: hidden; 

    input {
        width: 250px;
        height: 31px;
        border: none;
        border-bottom: 1px solid black;
        outline: none;
        background-color: transparent;
        color: black;
        font-family: "HBIOS-SYS";
        text-align: left;
        font-size: 13px;
    }

    ::placeholder {
        color: gray;
        font-size: 13px;
    }
`;

const ContainerP = styled.div`
    min-height: 100vh;
    background-color: #FFF7F0;
`;

export default Login;
