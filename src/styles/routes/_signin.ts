import styled from 'styled-components';
import { BaseButton, StyledLabels, StyledInputs } from '../defaults';

export const _signin = styled.main`
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-content: center center;
  place-items: center center;
  margin-top: 20px;

  @media screen and (max-width: 1140px) {
    display: flex;
    margin-top: 0px;
  }

  .wrapper-container {
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    background: rgb(${({ theme }) => theme.background});
    border-radius: 12px;
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.15);

    @media screen and (max-width: 1140px) {
      align-self: center;
      margin: 40px 12px;
    }

    @media screen and (max-width: 790px) {
      border: none;
      box-shadow: unset;
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
    height: 100%;
    display: grid;
    place-content: center;
    place-items: center;
    padding: 25px;

    .form-container {
      width: 100%;
      height: 100%;
      max-width: 500px;
      display: flex;
      gap: 20px;
      justify-content: flex-start;
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
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        gap: 20px;

        .input-field {
          display: flex;
          flex-direction: column;
          gap: 10px;
          label {
            ${StyledLabels};
          }
          ${StyledInputs}

          input {
            :invalid {
              border-color: red;
            }
          }
        }

        .error-message {
          text-align: left;
          color: rgb(${({ theme }) => theme.error});
          font-weight: 500;
          font-size: 0.8rem;
          line-height: 1.4rem;
        }

        button {
          ${BaseButton}
          align-self: center;
          width: 100%;
        }

        .password-reset {
          a {
            color: rgb(${({ theme }) => theme.primary_shade});
            font-size: 0.9rem;
            font-weight: 500;
            line-height: 1.2rem;
            cursor: pointer;

            :hover {
              color: rgb(${({ theme }) => theme.primary});
              transition: all 200ms ease;
            }
          }
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
