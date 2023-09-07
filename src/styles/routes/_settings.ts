import styled from 'styled-components';

export const _settings = styled.main`
  position: relative;
  background: rgb(${({ theme }) => theme.background});
  width: 100%;
  height: 100%;
  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.1);
      color: rgb(${({ theme }) => theme.primary_shade});
    }
  }

  .wrapper-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
    justify-items: center;
    max-width: 980px;
    align-self: center;
    margin: 0 auto;
    padding-top: 50px;
  }

  article {
    padding: 30px 40px;

    @media screen and (max-width: 620px) {
      padding: 30px 20px;
    }
  }

  .group-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .header-container {
      h3 {
        span {
        }
      }

      .data-conatainer {
      }
    }
  }
`;
