import React, { useState } from 'react';
import styled from 'styled-components';

const MessageInput = ({ sendMessage, loadingState }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim() && !loadingState) {
            sendMessage(inputValue);
            setInputValue('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <InputField
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="질문을 입력하세요"
                disabled={loadingState}
            />
            <SendButton type="submit" onKeyDown={handleKeyDown} disabled={loadingState}>전송</SendButton>
        </Form>
    );
};

export default MessageInput;


const Form = styled.form`
    display: flex;
    padding: 20px;
    border-top: 1px solid #444444;
    background-color: #1a1a1a;
    border-radius: 0 0 10px 10px;
`;

const InputField = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #444444;
    border-radius: 20px;
    margin-right: 20px;
    background-color: ${({ disabled }) => (disabled ? '#555555' : '#333333')};
    color: white;

    &:focus {
        outline: none;
        border-color: #9292ff;
        box-shadow: 0 0 10px #9292ff;
    }
`;

const SendButton = styled.button`
    font-weight: 500;
    padding: 10px 30px;
    background-color: ${({ disabled }) => (disabled ? '#999999' : '#007bff')};
    color: white;
    border: none;
    border-radius: 20px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;
