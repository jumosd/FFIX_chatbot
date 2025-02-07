import React from 'react';
import ChatBox from './components/ChatBox';
import styled from 'styled-components';


const App = () => {
  return (
    <AppContainer>
      <ChatBox />
    </AppContainer>
  );
};

export default App;



const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

