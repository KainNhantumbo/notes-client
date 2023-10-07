import styled from 'styled-components';
import { StyledCornerButton } from '../defaults';

export const _properties = styled.section`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 260px;
  height: 100vh;
  user-select: none;
  z-index: 2000;

  .main-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 20px 0 0 20px;
    backdrop-filter: blur(8px);
    background: rgba(${({ theme }) => theme.foreground}, 0.8);
    border-left: 1px solid rgba(${({ theme }) => theme.font}, 0.15);

    hr {
      all: unset;
      border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
      margin: 8px 0;
      border-radius: 3px;
    }
  }

  .header-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    user-select: none;
    border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
    padding: 12px 20px;

    h3 {
      width: 100%;
      max-width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 1.6rem;
      font-weight: 500;
    }

    button {
      ${StyledCornerButton}
      width: 100%;
      max-width: 18px;
      height: 18px;
      border-radius: 10px;

      :hover {
        color: rgb(${({ theme }) => theme.error});
      }
    }
  }

  .data-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 8px;

    h2 {
      font-weight: 500;
      color: rgb(${({ theme }) => theme.primary_shade});
    }

    section {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding-left: 5px;

      .item-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        align-items: center;
        font-size: 0.9rem;

        h3 {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 5px;

          span {
            font-weight: 500;
          }
        }
      }

      .priority-container {
        white-space: normal;
        span {
          text-transform: capitalize;
        }
      }

      .tags-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 12px;

        .tags-container_content {
          display: flex;
          flex-flow: row wrap;
          gap: 3px;

          div {
            width: fit-content;
            padding: 5px;
            border-radius: 12px;
            font-size: .8rem;
            color: rgb(${({ theme }) => theme.white});
          }
        }
      }
    }
  }

  .actions-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 8px;

    h2 {
      font-weight: 500;
      color: rgb(${({ theme }) => theme.primary_shade});
    }

    section {
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 0.9rem;
      padding-left: 5px;

      button {
        all: unset;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        border-radius: 5px;
        padding: 10px 8px;
        font-weight: 500;

        :hover {
          background: rgb(${({ theme }) => theme.primary}, 0.2);
          color: rgb(${({ theme }) => theme.primary_shade});

          :before {
            position: absolute;
            content: '';
            width: 3.5px;
            height: 24px;
            border-radius: 5px;
            background: rgba(${({ theme }) => theme.primary_shade}, 0.8);
            top: calc(50% - 12px);
            left: -8px;
          }
        }
      }

      .delete-button {
        :hover {
          color: rgb(${({ theme }) => theme.error});
        }
      }
    }
  }
`;
