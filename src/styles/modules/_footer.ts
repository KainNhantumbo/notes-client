import styled from 'styled-components';

export const _footer = styled.footer`
  width: 100%;
  font-weight: 500;
  font-size: 1rem;
  z-index: 10000;
  gap: 12px;
  display: flex;
  flex-direction: column;
  background: rgba(${({ theme }) => theme.foreground_shade}, 0.5);
  backdrop-filter: blur(10px);
  position: relative;

  * {
    ::selection {
      background: rgb(${({ theme }) => theme.background_shade});
      color: rgb(${({ theme }) => theme.primary_shade});
    }
  }

  nav {
    width: 100%;
    max-width: 1280px;
    display: flex;
    flex-flow: row wrap;
    gap: 20px;
    padding: 0 30px;
    justify-content: flex-start;
    margin: 0 auto;
    margin-top: 20px;

    a {
      font-size: 0.9rem;
      span {
        line-height: 1rem;
        :hover {
          cursor: pointer;
          color: rgb(${({ theme }) => theme.primary_shade});
        }
      }
    }
  }

  .base-container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1280px;
    position: relative;
    padding: 0 30px;
    margin: 0 auto;
    margin-bottom: 12px;

    @media screen and (max-width: 470px) {
      flex-direction: column-reverse;
      gap: 30px;
      .copyright-sentence {
        text-align: center;
        line-height: 1.2rem;
        margin-top: 12px;
      }
    }
  }
`;
