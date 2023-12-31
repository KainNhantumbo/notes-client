import styled from 'styled-components';
import { BaseButton, StyledInputs, StyledLabels } from '../defaults';

export const _settings = styled.main`
  position: relative;
  background: rgb(${({ theme }) => theme.background});
  width: 100%;
  height: 100%;
  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.1);
      color: rgb(${({ theme }) => theme.primary_shade});
    }
  }

  .wrapper-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
    justify-items: center;
    max-width: 980px;
    align-self: center;
    margin: 0 auto;
    padding-top: 50px;
  }

  article {
    padding: 30px 40px;

    display: flex;
    flex-direction: column;
    gap: 20px;

    .title-bar-container {
      border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
      padding-bottom: 20px;

      h1 {
        font-size: 2rem;
        padding: 0;
        margin: 0;
        line-height: 2.2rem;
        display: flex;
        flex-direction: row;
        gap: 12px;
        align-items: center;

        svg {
          width: 30px;
          height: 30px;
        }
      }
    }

    @media screen and (max-width: 620px) {
      padding: 30px 20px;
    }
  }

  .group-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
    padding: 8px 12px;
    border-radius: 12px;
    background: rgb(${({ theme }) => theme.foreground});

    h2 {
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.6rem;
      border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
      padding-bottom: 2px;
      color: rgb(${({ theme }) => theme.secondary_shade});
    }

    hr {
      all: unset;
      border-bottom: 2px solid rgba(${({ theme }) => theme.font}, 0.15);
      margin: 8px 0;
      border-radius: 3px;
    }

    .sub-title {
      font-weight: 500;
      color: rgb(${({ theme }) => theme.secondary_shade});
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: 8px;
      padding-left: 5px;
      svg {
        width: 18px;
        height: 18px;
      }
    }

    .content-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 0.9rem;

      h3 {
        font-weight: 500;
        line-height: 1.6rem;
      }

      p {
        line-height: 1.6rem;
      }

      .password-settings {
        display: flex;
        flex-direction: column;
        gap: 20px;

        .save-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
      }

      .account-data {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .data-container {
        button {
          ${BaseButton}
        }

        .form-section {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 10px;

          .form-element {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            label {
              ${StyledLabels};
            }
            ${StyledInputs}

            .counter {
              align-self: end;
              font-size: 0.8rem;
            }

            i {
              color: rgb(${({ theme }) => theme.error});
            }
          }

          .auto-save_elements {
            gap: 16px;
          }
        }
      }
    }
  }
`;
