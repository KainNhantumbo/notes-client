import styled from 'styled-components';
import { BaseButtonOutline, StyledCornerButton } from '../defaults';

export const _navigationDrawer = styled.section`
  top: 0;
  left: 0;
  width: 100%;
  max-width: 220px;
  z-index: 11000;
  position: fixed;
  height: 100vh;
  backdrop-filter: blur(2px);
  user-select: none;
  border-radius: 0 8px 8px 0;
  background: rgba(${({ theme }) => theme.foreground}, 0.8);
  border-right: 1px solid rgba(${({ theme }) => theme.font}, 0.15);

  .main-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(10px);
    z-index: 5000;
    height: 100%;
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

    .logo-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
      img {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        object-fit: cover;
      }

      h3 {
        text-transform: uppercase;
        font-size: 0.8rem;
        font-weight: 600;
      }
    }
  }

  ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .top-container {
      display: flex;
      flex-direction: column;
      width: 100%;

      .element {
        width: 100%;
        position: relative;

        :hover {
          background: rgba(${({ theme }) => theme.font}, 0.1);
        }

        .item-container {
          padding: 3px 20px;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          line-height: 1.6rem;
        }

        :hover {
          cursor: pointer;
        }
      }

      .active-element {
        background: rgb(${({ theme }) => theme.background_shade});
        :hover {
          background: rgb(${({ theme }) => theme.background_shade});
        }
      }
    }

    .bottom-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 20px 12px;
      border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 3000;
      background: rgb(${({ theme }) => theme.foreground});

      button {
        ${BaseButtonOutline}
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
      }
    }
  }
`;
