import styled from 'styled-components';

export const _home = styled.main`
  position: relative;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 50vh;
  margin-top: 90px;

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.1);
      color: rgb(${({ theme }) => theme.primary_shade});
    }
  }

  .wrapper-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
    justify-items: center;
    max-width: 980px;
    align-self: center;
    margin: 0 auto;
    padding-top: 90px;
  }

  article {
    width: 100%;
    padding: 30px 40px;

    @media screen and (max-width: 620px) {
      padding: 30px 20px;
    }

  }
`;
