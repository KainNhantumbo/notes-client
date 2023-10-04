import { css } from 'styled-components';

export const BaseButtonOutline = css`
  border: none;
  background: none;
  padding: 7px 10px;
  color: rgb(${({ theme }) => theme.font});
  width: fit-content;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  outline: none;
  :hover {
    color: rgb(${({ theme }) => theme.primary_shade});
  }
  span {
    font-weight: 500;
    pointer-events: none;
  }
`;

export const BaseButton = css`
  all: unset;
  border-radius: 5px;
  padding: 7px 10px;
  width: fit-content;
  cursor: pointer;
  background: rgba(${({ theme }) => theme.primary}, 0.5);
  color: rgb(${({ theme }) => theme.font});
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  border: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
  text-align: center;

  :hover {
    background: rgba(${({ theme }) => theme.primary}, 0.9);
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.3);
  }
  :disabled {
    box-shadow: none;
    background: rgba(${({ theme }) => theme.primary}, 0.4);
    span {
      color: rgb(${({ theme }) => theme.foreground});
    }
  }
  span {
    font-weight: 500;
    pointer-events: none;
  }
`;

export const Button_Mono_A = css`
  border: none;
  border-radius: 8px;
  background: rgb(${({ theme }) => theme.primary});
  color: rgb(${({ theme }) => theme.font_dimmed});
  padding: 10px;
  width: fit-content;
  cursor: pointer;
  outline: none;

  :hover {
    background: rgb(${({ theme }) => theme.secondary});
  }
  svg {
    pointer-events: none;
    width: 20px;
    height: 20px;
    position: absolute;
    top: calc(50% - 10px);
    left: calc(50% - 10px);
  }
`;

export const Button_Mono_B = css`
  border: none;
  border-radius: 8px;
  background: none;
  color: rgb(${({ theme }) => theme.font});
  border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
  position: relative;
  width: fit-content;
  cursor: pointer;
  display: grid;
  place-content: center;
  outline: none;

  :hover {
    color: rgb(${({ theme }) => theme.primary_shade});
  }

  svg {
    pointer-events: none;
    width: 20px;
    height: 20px;
    position: absolute;
    top: calc(50% - 10px);
    left: calc(50% - 10px);
  }
`;

export const StyledCornerButton = css`
  all: unset;
  border-radius: 5px;
  color: rgb(${({ theme }) => theme.font});
  border: 1px solid rgba(${({ theme }) => theme.black}, 0.07);
  width: fit-content;
  cursor: pointer;
  display: grid;
  place-content: center;
  padding: 5px;

  :hover {
    color: rgb(${({ theme }) => theme.primary_shade});
  }

  svg {
    pointer-events: none;
    width: 20px;
    height: 20px;
  }
`;

export const StyledLabels = css`
  position: relative;
  line-height: 1.4rem;

  svg {
    width: 18px;
    height: 18px;
    position: absolute;
    top: 2px;
    left: 0;
    color: rgb(${({ theme }) => theme.font});
  }
  span {
    padding-left: 25px;
    font-weight: 500;
  }
`;

export const StyledInputs = css`
  input,
  textarea,
  select {
    width: 100%;
    height: fit-content;
    border: none;
    padding: 10px 18px;
    line-height: 1.2rem;
    font-weight: 400;
    outline: none;
    border-radius: 5px;
    background: rgba(${({ theme }) => theme.background}, 0.7);
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
    color: rgb(${({ theme }) => theme.font});
    :focus {
      border: 1px solid rgba(${({ theme }) => theme.black}, 0.15);
      box-shadow: 0 0 20px rgba(${({ theme }) => theme.black}, 0.06);
    }
    ::placeholder {
      color: rgba(${({ theme }) => theme.font}, 0.8);
      font-size: 0.9rem;
    }
    :disabled {
      background: rgb(${({ theme }) => theme.foreground});
      border: none;
      ::placeholder {
        color: transparent;
      }
    }
  }

  textarea {
    resize: vertical;
  }
`;

export const statsContainerStyles = css`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
  place-items: center;
  margin: 0 auto;
  margin-top: 12px;

  .fetch-error-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin: 20px 0;
    color: rgb(${({ theme }) => theme.error});
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 1.4rem;
    align-self: flex-end;
    padding-top: 3500px;

    button {
      ${BaseButton}
    }
  }
  p {
    margin-top: 10px;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.6rem;
    color: rgb(${({ theme }) => theme.primary_shade});
  }

  .loading {
    width: 100%;
    height: 100%;
    align-self: flex-end;
    display: flex;

    flex-direction: row;
    align-items: center;
    font-weight: 500;
    font-size: 1.1rem;
    gap: 10px;
    padding: 20px;
    margin: 0 auto;

    color: rgb(${({ theme }) => theme.primary_shade});
  }
`;
