import styled from 'styled-components';
import { BaseButton, StyledCornerButton } from '../defaults';

export const _workspace = styled.main`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: rgb(${({ theme }) => theme.background});

  .tooltip-class {
    border-radius: 8px;
    color: rgb(${({ theme }) => theme.white});
    background: rgba(${({ theme }) => theme.primary_shade}, 0.8);
    border: 1px solid rgba(${({ theme }) => theme.white}, 0.9);
    backdrop-filter: blur(20px);
    font-family: 'Inter';
    padding: 5px 10px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .tooltip-border-class {
    border-right: 1px solid rgba(${({ theme }) => theme.white}, 0.9);
    border-bottom: 1px solid rgba(${({ theme }) => theme.white}, 0.9);
  }

  .header-container {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    gap: 12px;
    z-index: 20;
    background: rgb(${({ theme }) => theme.background});
    border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.15);

    h2 {
      font-size: 1.2rem;
      line-height: 1.6rem;
      font-weight: 500;
      margin: 0 auto;
      text-transform: capitalize;
    }

    .form-container {
      width: 100%;
      max-width: 600px;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 3px;
      padding: 5px 8px;
      background: rgb(${({ theme }) => theme.foreground});
      border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
      border-radius: 8px;
      margin: 0 auto;
      position: relative;

      button {
        ${StyledCornerButton}
        padding: 0;
        border: none;
      }

      input {
        width: 100%;
        height: fit-content;
        border: none;
        padding: 5px;
        line-height: 1.2rem;
        font-weight: 400;
        outline: none;
        background: none;
        color: rgb(${({ theme }) => theme.font});

        ::placeholder {
          color: rgba(${({ theme }) => theme.font}, 0.8);
          font-size: 0.9rem;
        }
      }

      .compose-button {
        ${BaseButton}
        z-index: 2000;
        position: absolute;
        right: -20px;
        bottom: -82vh;
        background: rgba(${({ theme }) => theme.primary}, 0.15);
        backdrop-filter: blur(10px);
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: center;
        border-radius: 18px;
        padding: 12px;
        box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.2);
        border: 1px solid rgba(${({ theme }) => theme.font}, 0.15);

        :hover {
          background: rgba(${({ theme }) => theme.primary}, 0.25);
        }
        svg {
          pointer-events: none;
          width: 20px;
          height: 20px;
          stroke-width: 5px;
        }

        @media screen and (max-width: 660px) {
          right: 5px;
        }
      }
    }
  }

  .wrapper-container {
    width: 100%;
    height: 100%;
    display: grid;
    padding-top: 130px;
    padding-bottom: 12px;
    grid-template-columns: 1fr;
    max-width: 780px;
    align-self: center;
    margin: 0 auto;
    gap: 12px;

    .groups-container {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 8px;

      .group-title {
        display: flex;
        flex-direction: row;
        gap: 5px;
        align-items: center;
        font-weight: 500;
        line-height: 1.6rem;
        text-transform: capitalize;
        padding-left: 12px;
        color: rgb(${({ theme }) => theme.primary_shade});
      }

      .notes-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 0 12px;

        .note-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 7px 8px;
          padding-top: 12px;
          font-size: 0.9rem;
          user-select: none;
          cursor: pointer;
          position: relative;
          line-height: 1.2rem;
          gap: 16px;
          background: rgb(${({ theme }) => theme.foreground});
          border-radius: 12px;

          .top-side {
            width: 100%;
            display: flex;
            align-items: center;
            flex-flow: row wrap;
            gap: 12px;

            h3 {
              width: 100%;
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 5px;
              font-weight: 500;
              font-size: 0.96rem;
              max-width: 380px;
              svg {
                width: 18px;
                height: 18px;
                color: rgb(${({ theme }) => theme.secondary});
              }
              span {
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              @media screen and (max-width: 410px) {
                max-width: 320px;
              }
            }
          }

          .tags-container {
            width: 100%;
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            gap: 3px;

            p {
              width: fit-content;
              padding: 3px 5px;
              user-select: none;
              font-size: 0.8rem;
              font-weight: 500;
              color: rgb(${({ theme }) => theme.white});
              border-radius: 12px;
            }
          }

          .bottom-side {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 12px;

            .priority-container,
            .status-container {
              user-select: none;
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 3px;
              border-radius: 12px;
              padding: 6px 8px;
              color: rgb(${({ theme }) => theme.primary_shade});
              background: rgb(${({ theme }) => theme.primary}, 0.2);

              span {
                font-weight: 500;
                font-size: 0.9rem;
              }

              .dot-icon {
                width: 18px;
                height: 18px;
                transform: scale(50px);
              }
            }

            h5 {
              justify-self: flex-end;
              white-space: nowrap;
              font-weight: 500;
            }
          }

          button {
            ${StyledCornerButton}
            border: none;
            position: absolute;
            top: 10px;
            right: 10px;

            :hover {
              background: rgba(${({ theme }) => theme.font}, 0.1);
            }
          }
        }
      }
    }
  }

  .empty-notes-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: calc(20% - 1px) 20px;
    gap: 20px;
    align-items: center;

    h3 {
      font-size: 1.2rem;
      font-weight: 500;
    }

    p {
      text-align: center;
      line-height: 1.6rem;
      font-size: 0.95rem;

      i {
        color: rgb(${({ theme }) => theme.primary_shade});
      }
    }

    svg {
      width: 60px;
      height: 60px;
      color: rgb(${({ theme }) => theme.primary});
    }
  }

  .loading-indicator {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    font-weight: 500;
    font-size: 0.95rem;
    color: rgb(${({ theme }) => theme.primary_shade});
    padding: calc(20% - 1px) 12px;
  }

  .error-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    color: rgb(${({ theme }) => theme.error});
    font-weight: 500;
    font-size: 0.95rem;
    line-height: 1.6rem;
    padding: calc(20% - 1px) 12px;

    button {
      ${BaseButton}
    }
  }
`;
