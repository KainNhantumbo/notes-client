import styled from 'styled-components';
import { BaseButton, StyledCornerButton } from '../defaults';

export const _workspace = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  .notes-renderer-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: rgb(${({ theme }) => theme.background});

    .header-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      padding: 20px;
      gap: 12px;
      z-index: 200;
      position: relative;

      h2 {
        font-size: 1.2rem;
        line-height: 1.6rem;
        font-weight: 500;
        margin: 0 auto;
        text-transform: capitalize;
      }

      .form-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 3px;
        padding: 5px 8px;
        background: rgb(${({ theme }) => theme.foreground});
        border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
        border-radius: 8px;

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
      }

      .compose-button {
        ${BaseButton}
        z-index: 200;
        position: absolute;
        right: -4vw;
        bottom: -78vh;
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
        }
      }
    }

    .header-hr {
      all: unset;
      border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
      margin: 2px 0;
      border-radius: 3px;
    }

    .wrapper-container {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr;
      justify-items: center;
      max-width: 780px;
      align-self: center;
      margin: 0 auto;
    }

    .notes-list-container {
      width: 100%;
      height: 100%;
      max-height: 83vh;
      display: flex !important;
      flex-direction: column !important;

      .note-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 7px 8px;
        font-size: 0.9rem;
        user-select: none;
        cursor: pointer;
        position: relative;
        border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.1);
        line-height: 1.2rem;
        gap: 12px;
        background: rgb(${({ theme }) => theme.foreground});

        :hover {
          background: rgba(${({ theme }) => theme.primary}, 0.2);
        }

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
            svg {
              width: 18px;
              height: 18px;
              color: rgb(${({ theme }) => theme.secondary});
            }
          }

          p,
          span {
            width: 100%;
            max-width: 380px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .bottom-side {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 12px;

          .tags-container {
            width: 100%;
            display: flex;
            flex-direction: row;
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

          h5 {
            justify-self: flex-end;
            white-space: nowrap;
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

      overflow: hidden;
      --scrollbar-size: 3px;
      .ScrollAreaViewport {
        width: 100%;
        height: 100%;
        border-radius: inherit;
      }
      .ScrollAreaScrollbar {
        display: flex;
        user-select: none;
        touch-action: none;
        padding: 2px;
        background: transparent;
        transition: background 160ms ease-out;
      }
      .ScrollAreaScrollbar:hover {
        background: rgba(${({ theme }) => theme.font}, 0.05);
      }
      .ScrollAreaScrollbar[data-orientation='vertical'] {
        width: 8px;
      }
      .ScrollAreaThumb {
        flex: 1;
        background: rgba(${({ theme }) => theme.font}, 0.3);
        border-radius: 8px;
        position: relative;
      }
      .ScrollAreaThumb::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        min-width: 4px;
        min-height: 4px;
      }
      .ScrollAreaCorner {
        background: rgba(${({ theme }) => theme.font}, 0.1);
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
  }
`;
