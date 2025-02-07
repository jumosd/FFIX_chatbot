import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Message from './Message';
import MessageInput from './MessageInput';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // 초기 환영 메시지
        appendMessage('bot', '어서오게나..');
    }, []);

    useEffect(() => {
        // 메시지가 추가될 때마다 스크롤을 아래로 이동
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const sendMessage = async (messageContent) => {
        if (messageContent.trim()) {
            appendMessage('user', messageContent);
            setLoading(true);
            const botResponse = await getBotResponse(messageContent);
            appendMessage('bot', botResponse);
            setLoading(false);
        }
    };

    const appendMessage = (sender, messageContent) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { content: messageContent, id: prevMessages.length, sender },
        ]);
    };

    const getBotResponse = async (userMessage) => {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: '파이널판타지14의 수정공이다 수정공의 말투를 따라하며 파판유저의 고충을 잘이해한다' },
                    { role: 'user', content: userMessage },
                ],
            }),
        });

        const data = await response.json();
        return data.choices[0].message.content;
    };

    return (
        <ChatBoxContainer>
            <Title>수정공짱</Title>
            <MessagesContainer>
                {messages.map((message) => (
                    <Message key={message.id} content={message.content} sender={message.sender} />
                ))}
                <div ref={messagesEndRef} />
            </MessagesContainer>
            <MessageInput sendMessage={sendMessage} loadingState={loading} />
        </ChatBoxContainer>
    );
};

export default ChatBox;




const ChatBoxContainer = styled.div`
    max-width: 500px;
    width: 100%;
    height: 800px;
    background-color: #333333;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        height: 100vh;
    }
`;

const Title = styled.div`
    padding: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    background-color: #222222;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 1px solid #333333;
    text-align: center;
`

const MessagesContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #d0d0d0;
`;