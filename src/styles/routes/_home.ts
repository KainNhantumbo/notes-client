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

    .introduction-container {
    }

    .features-container {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      gap: 25px;
      margin-top: 20px;
      user-select: none;

      div {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 15px;
        width: 280px;
        height: 100%;
        border-radius: 10px;
        padding: 20px;
        background: rgb(${({ theme }) => theme.foreground});
        border: 1px solid rgba(${({ theme }) => theme.font}, 0.1);

        h3 {
          font-size: 1rem;
          line-height: 1.2rem;
          font-weight: 500;
        }

        h4 {
          font-weight: 500;
          color: rgb(${({ theme }) => theme.primary});
        }
      }
    }

    .extra-features-container {
    }
  }
`;
