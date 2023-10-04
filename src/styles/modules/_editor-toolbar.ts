import styled from 'styled-components';

export const _editorToolbar = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 5px;
  margin-bottom: 5px;

  button {
    all: unset;
    color: rgb(${({ theme }) => theme.font});
    width: fit-content;
    cursor: pointer;
    display: grid;
    place-content: center;
    padding: 5px;
    border-radius: 50%;

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
  }
`;
