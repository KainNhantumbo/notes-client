import styled from 'styled-components';

export const _select = styled.div`
  /* reset */
  button {
    all: unset;
  }

  .SelectTrigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 15px;
    font-size: 13px;
    line-height: 1;
    height: 35px;
    gap: 5px;
    background: rgba(${({ theme }) => theme.background}, 0.7);
    color: rgb(${({ theme }) => theme.font});
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
  }
  .SelectTrigger:hover {
    background-color: rgba(${({ theme }) => theme.primary}, 0.3);
  }
  .SelectTrigger:focus {
    box-shadow: 0 0 20px rgba(${({ theme }) => theme.black}, 0.06);
  }
  .SelectTrigger[data-placeholder] {
    color: var(--violet-9);
  }

  .SelectIcon {
    color: rgb(${({ theme }) => theme.font});
  }

  .SelectContent {
    overflow: hidden;
    background-color: rgba(${({ theme }) => theme.foreground}, 0.7);
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(${({ theme }) => theme.black}, 0.06);
  }

  .SelectScrollButton {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    background-color: rgba(${({ theme }) => theme.foreground}, 0.7);
    color: rgb(${({ theme }) => theme.font});
    cursor: default;
  }

  .SelectViewport {
    padding: 5px;
  }

  .SelectItem {
    font-size: 13px;
    line-height: 1;
    color: rgb(${({ theme }) => theme.font});
    border-radius: 3px;
    display: flex;
    align-items: center;
    height: 25px;
    padding: 0 35px 0 25px;
    position: relative;
    user-select: none;
  }
  .SelectItem[data-disabled] {
    color: var(--mauve-8);
    pointer-events: none;
  }
  .SelectItem[data-highlighted] {
    outline: none;
    background-color: var(--violet-9);
    color: var(--violet-1);
  }

  .SelectLabel {
    padding: 0 25px;
    font-size: 12px;
    line-height: 25px;
    color: var(--mauve-11);
  }

  .SelectSeparator {
    height: 1px;
    background-color: var(--violet-6);
    margin: 5px;
  }

  .SelectItemIndicator {
    position: absolute;
    left: 0;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;
