import styled from 'styled-components';
import { StyledCornerButton } from '../defaults';

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
    align-items: center;
    gap: 12px;
    user-select: none;
    padding: 8px 12px;
    border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 12000;
    background: rgb(${({ theme }) => theme.foreground});
    border-top-right-radius: 12px;

    h3 {
      padding-top: 2px;
      text-transform: uppercase;
      font-size: 0.92rem;
      font-weight: 600;

      i {
        color: rgb(${({ theme }) => theme.primary_shade});
      }
    }

    button {
      ${StyledCornerButton}
      width: 100%;
      max-width: 18px;
      height: 18px;
      border-radius: 10px;
      border: none;

      :hover {
        color: rgb(${({ theme }) => theme.error});
        background: rgb(${({ theme }) => theme.primary}, 0.2);
      }
    }
  }

  ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: scroll;
    padding-bottom: 200px;

    ::-webkit-scrollbar {
      width: 1px;
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 1px;
      background: transparent;
    }

    .top-navigator {
      width: 100%;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 8px 12px;
      gap: 12px;
      padding-top: 50px;

      .navigation-item {
        width: 100%;
        display: flex;
        flex-direction: column;

        .navigation-box-container {
          width: 100%;
          position: relative;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

          :hover {
            background: rgba(${({ theme }) => theme.primary}, 0.5);
          }

          .navigation-item-title {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 5px;
            text-transform: capitalize;
          }

          .navigation-item-length {
            width: fit-content;
            height: fit-content;
            display: grid;
            place-content: center center;
            place-items: center center;
            font-size: 0.8rem;
            padding: 5px;
            border-radius: 4px;
            font-weight: 500;
            background: rgb(${({ theme }) => theme.foreground});
            color: rgb(${({ theme }) => theme.primary_shade});
            border: 1px solid rgba(${({ theme }) => theme.primary}, 0.3);
          }

          .navigation-item-actions {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 5px;
          }

          .navigation-item_state-indicator-button {
            all: unset;
            width: fit-content;
            height: fit-content;
            color: rgb(${({ theme }) => theme.primary_shade});
            cursor: pointer;
            display: grid;
            place-content: center;
            padding: 0px;

            :hover {
              color: rgb(${({ theme }) => theme.primary_shade});
            }

            svg {
              width: 60px;
              height: 25px;
            }
          }
        }

        .navigation-box-container-active {
          background: rgb(${({ theme }) => theme.primary}, 0.2);
          color: rgb(${({ theme }) => theme.primary_shade});

          .navigation-item-length {
            border: 1px solid transparent;
          }

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

        .childrens-container {
          width: 100%;

          .collapsable-container {
            width: 100%;
            transition: height 500ms;

            .tags-collapsable {
              width: 100%;
              display: flex;
              flex-direction: column;
              gap: 12px;
              padding: 12px;
              border: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
              border-top: none;
              border-radius: 12px 12px;

              .tags-container {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                cursor: pointer;

                h4 {
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  gap: 5px;

                  .tag-icon {
                    width: 20px;
                    height: 20px;
                  }
                }

                .tag-count {
                  width: fit-content;
                  height: fit-content;
                  display: grid;
                  place-content: center center;
                  place-items: center center;
                  font-size: 0.8rem;
                  padding: 5px;
                  border-radius: 4px;
                  font-weight: 500;
                  background: rgb(${({ theme }) => theme.foreground});
                  color: rgb(${({ theme }) => theme.primary_shade});
                  border: 1px solid rgba(${({ theme }) => theme.primary}, 0.3);
                }
              }
            }
          }
        }
      }
    }

    .bottom-navigator {
      width: 100%;
      display: flex;
      padding: 20px 12px;
      flex-direction: column;
      gap: 5px;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 3000;
      border-radius: 12px 12px;
      background: rgb(${({ theme }) => theme.foreground});
      border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.15);

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
