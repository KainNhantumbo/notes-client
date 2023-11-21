import styled from 'styled-components';
import { BaseButton, StyledInputs, StyledLabels } from '../defaults';

export const _signup = styled.main`
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-content: center;
  place-items: center;
  margin-top: 20px;

  @media screen and (max-width: 1140px) {
    display: flex;
    margin-top: 0px;
  }

  .wrapper-container {
    width: fit-content;
    max-width: 800px;
    display: flex;
    align-items: center;
    flex-direction: row;
    border-radius: 12px;
    background: rgb(${({ theme }) => theme.background});
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
    margin: 40px 12px 12px;

    @media screen and (max-width: 790px) {
      border: none;
      background: inherit;
    }
  }

  img {
    width: 100%;
    height: 100%;
    max-width: 380px;
    object-fit: cover;
    border-radius: 12px 0 0 12px;

    @media screen and (max-width: 790px) {
      display: none;
    }
  }

  article {
    width: 100%;
    padding: 25px;

    .form-container {
      width: 100%;

      display: flex;
      gap: 20px;
      flex-direction: column;

      @media screen and (min-width: 340px) {
        min-width: 330px;
      }

      @media screen and (max-width: 365px) {
        margin-top: 80px;
      }

      h2 {
        text-align: center;
        font-weight: 500;
        line-height: 1.8rem;
        font-size: 1.4rem;
      }

      p {
        font-size: 0.92rem;
        font-weight: 500;
        line-height: 1.4rem;
        text-align: center;
      }

      form {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        gap: 18px;

        .form-section {
          width: 100%;
          display: flex;
          flex-direction: row;
          gap: 10px;

          @media screen and (max-width: 465px) {
            flex-direction: column;
          }

          .form-element {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            label {
              ${StyledLabels};
            }
            ${StyledInputs}
          }
        }

        .error-message {
          color: rgb(${({ theme }) => theme.error});
          font-weight: 500;
          font-size: 0.8rem;
          line-height: 1.4rem;
        }

        button {
          ${BaseButton}
          align-self: center;
          width: 100%;
          max-width: 300px;
        }
      }

      .signup-request {
        text-align: center;
        font-size: 0.92rem;
        font-weight: 500;
        line-height: 1.4rem;

        a {
          color: rgb(${({ theme }) => theme.primary_shade});
          cursor: pointer;
          :hover {
            color: rgb(${({ theme }) => theme.primary});
          }

          span {
            pointer-events: none;
          }
        }
      }
    }
  }
`;
