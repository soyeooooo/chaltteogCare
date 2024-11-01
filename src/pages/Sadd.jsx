import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Mobile, PC } from "../styles/Global_d"; 
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Sadd = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();    

    const handleClick = () => {
        if (name && date) {
            const newSchedule = { name, date };
    
            // 목서버에 일정 추가 요청
            fetch('http://localhost:3000/schedules', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSchedule),
            })
            .then(response => response.json())
            .then(data => {
                console.log('일정 추가 성공:', data);
                navigate("/schedule"); // 일정 추가 후 스케줄 페이지로 이동
            })
            .catch((error) => {
                console.error('일정 추가 실패:', error);
            });
    
            // 입력 필드 초기화
            setName('');
            setDate('');
        } else {
            alert('모든 필드를 입력해주세요.');
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Mobile>
                <ContainerM>
                    <div id='B_Btn' onClick={() => navigate("/schedule")}>
                        <img src="/images/Btn_back.svg" alt="Back Button"></img>
                    </div>

                    <InputGroup>
                        <label htmlFor="name">성함</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="성함을 입력해주세요."
                            value={name}
                            onChange={handleNameChange}
                        />
                    </InputGroup>

                    <InputGroup>
                        <label htmlFor="date">날짜</label>
                        <input
                            name="date"
                            type="datetime-local"
                            value={date}
                            onChange={handleDateChange}
                        />
                    </InputGroup>

                    <div id='btn' onClick={handleClick}>
                        <img src="/images/Schedule/addBtn.svg" alt="Add Button"></img>
                    </div>

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
    background-color: #FFF7F0;
    flex-direction: column;
    padding: 8px;
    min-height: 100vh;
    display: flex;
    position: relative;

    #B_Btn {
        margin-bottom: 20px; 
    }

    #btn {
        display: flex;
        margin: 20px;
        justify-content: center; 
    }
    
    #logo {
        position: absolute;
        top: 10px;
        right: 10px;
    }
`;

const InputGroup = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20px; 

    input {
        padding: 10px;
        width: 300px;
        border: 1px solid #ccc;
        border-radius: 15px;
        font-size: 16px;
        color: #000;
        background-color: transparent; /* Make the background transparent */
        display: block; 
        margin-top: 10px; 
    }
    ::placeholder {
        color: gray;
        font-size: 13px;
    }

    label {
        color: #333;
        font-size: 14px;
        font-weight: bold;
        align-self: flex-start; 
    }
`;

const ContainerP = styled.div`
    min-height: 100vh;
    background-color: #FFF7F0;
`;

export default Sadd;
