import styled from 'styled-components';

export const _editorToolbar = styled.section`
  width: 100%;

  .toolbar-wrapper-container {
    width: 100%;
    min-width: fit-content;
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    gap: 5px;
    margin: 5px 0;
    margin: 0 auto;

    button {
      all: unset;
      color: rgb(${({ theme }) => theme.font});
      width: 20px;
      height: 20px;
      cursor: pointer;
      display: grid;
      place-content: center;
      padding: 5px;
      border-radius: 8px;

      :hover {
        color: rgb(${({ theme }) => theme.primary_shade});
        background: rgb(${({ theme }) => theme.primary}, 0.2);
      }

      svg {
        pointer-events: none;
        width: 17px;
        height: 17px;
      }

      :disabled {
        color: rgba(${({ theme }) => theme.font}, 0.5);
      }
    }

    .is-active {
      color: rgb(${({ theme }) => theme.primary_shade});
      background: rgb(${({ theme }) => theme.primary}, 0.2);
    }
  }
`;
