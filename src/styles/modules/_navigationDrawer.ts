import styled from 'styled-components';

export const _navigationDrawer = styled.section`
  top: 0;
  left: 0;
  width: 100%;
  z-index: 11000;
  position: fixed;
  height: 100vh;
  user-select: none;
  max-width: 220px;

  .main-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 0 12px 12px 0;
    backdrop-filter: blur(8px);
    background: rgba(${({ theme }) => theme.foreground}, 0.8);
    border-right: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
  }

  .header {
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
        font-size: 0.9rem;
        font-weight: 600;
      }
    }

    .hamburguer-icon {
      pointer-events: none;
      width: 20px;
      height: 20px;
    }

    :hover {
      .hamburguer-icon {
        color: rgb(${({ theme }) => theme.primary_shade});
      }
    }
  }

  ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .top-navigator {
      width: 100%;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 8px 12px;
      gap: 12px;

      .navigation-item {
        width: 100%;
        position: relative;
        border-radius: 8px;
        padding: 12px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .navigation-item-title {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 5px;
        }

        :hover {
          background: rgba(${({ theme }) => theme.primary}, 0.5);
        }
      }

      .navigation-item-active {
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

      .navigation-item-button {
        padding: 3px 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        line-height: 1.6rem;
        cursor: pointer;
      }
    }

    .bottom-navigator {
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
    }
  }
`;
