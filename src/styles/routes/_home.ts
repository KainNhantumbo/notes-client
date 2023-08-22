import styled from 'styled-components';

export const _home = styled.main`
position: relative;
  
  .title {
    font-size: 1.6rem;
    font-weight: 500;
    color: rgb(${({ theme }) => theme.font});
  }
`;
