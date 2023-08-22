import styled from 'styled-components';

export const _home = styled.main`
  font-family: 'Zilla Slab', serif;
  .title {
    font-size: 1.6rem;
    text-transform: uppercase;
    font-weight: 500;
    color: rgb(${({ theme }) => theme.primary});
  }
`;
