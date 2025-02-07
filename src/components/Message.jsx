import React from 'react';
import styled from 'styled-components';

const Message = ({ content, sender }) => {
    return (
        <MessageWrapper sender={sender}>
            {sender === 'bot' &&
                <ProfileImage src="https://pbs.twimg.com/profile_images/1216754595717771266/VJt9PO9v_400x400.jpg" alt="profile" />
            }
            <MessageContainer sender={sender}>
                {content}
            </MessageContainer>
        </MessageWrapper>
    );
};

export default Message;
const MessageWrapper = styled.div`
    display: flex;
    align-self: ${({ sender }) => (sender === 'bot' ? 'flex-start' : 'flex-end')};
    justify-content: ${({ sender }) => (sender === 'bot' ? 'flex-start' : 'flex-end')};
    margin: 10px 0;
`;

const ProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
`;

const MessageContainer = styled.div`
   
    padding: 10px 15px;
    border-radius: 20px;
    max-width: 70%;
    background-color: ${({ sender }) => (sender === 'bot' ? '#666' : '#444444')};
    color: #ffffff;
    border: 1px solid ${({ sender }) => (sender === 'bot' ? '#666' : '#555555')};
`;