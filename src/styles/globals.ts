import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {    
    scroll-padding-top: 90px;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    max-width: 100%;

    ::selection {
      background: rgb(${({ theme }) => theme.background_shade});
      color: rgb(${({ theme }) => theme.primary_shade});
    }
  }
  
  label {
    user-select: none;
  }
  
  body {
    width: 100%;
    position: relative;
    color: rgb(${({ theme }) => theme.font});
    background: rgb(${({ theme }) => theme.foreground});
    font-family: Inter, Roboto, 'Open Sans','Helvetica Neue', -apple-system, sans-serif;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar {
    width: 5px;
    background: rgba(${({ theme }) => theme.background}, 0.3);

    :hover {
      transition: all 0.2s ease-in-out;
    }
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: rgb(${({ theme }) => theme.font});

    :hover {
      transition: all 0.2s ease-in-out;
    }
  }
  
  ::-webkit-scrollbar-thumb::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    min-width: 44px;
    min-height: 44px;
  }
`;
