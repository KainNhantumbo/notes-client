import styled from 'styled-components';
import { BaseButton } from '../defaults';

export const _home = styled.main`
  position: relative;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 50vh;

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
    padding-top: 60px;
  }

  article {
    width: 100%;
    padding: 30px 40px;

    @media screen and (max-width: 620px) {
      padding: 30px 20px;
    }

    .introduction-container {
      display: flex;
      flex-direction: column;
      gap: 20px;

      h1 {
        font-size: 2.8rem;
        font-weight: 600;
        line-height: 3.8rem;
        text-align: center;
        width: 100%;
        max-width: 600px;
        align-self: center;
      }

      p {
        text-align: center;
        font-weight: 500;
        line-height: 1.6rem;
      }

      .action-buttons {
        display: flex;
        flex-flow: row wrap;
        gap: 20px;
        align-self: center;

        button {
          ${BaseButton}
          border-radius: 10px;
        }

        a {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 5px;
          border-radius: 8px;
          color: rgb(${({ theme }) => theme.font});
          width: fit-content;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding: 10px 12px;
          overflow: hidden;
          background: rgba(${({ theme }) => theme.primary_shade}, 0.2);
          font-weight: 500;

          :hover {
            color: rgb(${({ theme }) => theme.primary_shade});
          }

          svg {
            width: 20px;
            height: 20px;
            box-shadow: 0 12px 35px rgba(${({ theme }) => theme.black}, 0.5);
            border-radius: 5px;
            background: rgb(${({ theme }) => theme.foreground});
          }
        }
      }
      img {
        width: 100%;
        height: 100%;
        max-width: 900px;
        max-height: 480px;
        object-fit: cover;
        border-radius: 10px;
        margin: 10px auto;
        box-shadow: 0 12px 35px rgba(${({ theme }) => theme.black}, 0.2);
      }
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
