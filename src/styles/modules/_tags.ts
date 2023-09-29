import styled from 'styled-components';

export const _tags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 2px;

  .tags-list-container {
    display: flex;
    flex-direction: row;
    gap: 2px;
    width: fit-content;

    .tag {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 2px;
      padding: 5px;
      border-radius: 5px;
      user-select: none;
      width: 100%;
      min-width: fit-content;
      p {
        font-size: 0.8rem;
        font-weight: 500;
        color: rgb(${({ theme }) => theme.white});
      }

      button {
        all: unset;
        border-radius: 5px;
        display: grid;
        place-content: center center;
        place-items: center center;
        padding: 2px;
        cursor: pointer;

        :hover {
          transition: all 200ms ease-in-out;
          background: rgba(${({ theme }) => theme.foreground}, .8);
          svg {
            color: rgb(${({ theme }) => theme.error});
          }
        }
        svg {
          pointer-events: none;
          color: rgb(${({ theme }) => theme.white});
          size: 2px;
          width: 12px;
          height: 12px;
        }
      }
    }
  }

  form {
    input {
      all: unset;
      width: fit-content;
      max-width: 70px;
      padding: 5px 8px;
      line-height: 1.2rem;
      outline: none;
      color: rgb(${({ theme }) => theme.font});

      ::placeholder {
        color: rgba(${({ theme }) => theme.font}, 0.8);
        font-size: 0.9rem;
      }
    }
  }
`;