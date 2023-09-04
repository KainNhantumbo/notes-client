import styled from 'styled-components';

export const _notesList = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .container-items__end-mark {
    width: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
    background: rgb(${({ theme }) => theme.foreground});
    color: rgb(${({ theme }) => theme.primary});
    border-radius: 8px;
    margin-top: 5px;
    svg {
      width: 25px;
      height: 25px;
    }

    @media screen and (max-width: 1000px) {
      border-radius: 10px;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
`;
