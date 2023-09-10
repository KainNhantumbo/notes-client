import styled from 'styled-components';

export const _workspace = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  .empty-editor-cover {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 200;
    display: grid;
    place-content: center center;
    place-items: center center;
    background: rgb(${({ theme }) => theme.background});

    .content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: calc(50% - 1px) 20px;
      gap: 20px;
      align-items: center;

      h3 {
        font-size: 1.2rem;
        font-weight: 500;
      }

      p {
        text-align: center;
        line-height: 1.6rem;
        font-size: 0.95rem;

        i {
          color: rgb(${({ theme }) => theme.primary_shade});
        }
      }

      svg {
        width: 60px;
        height: 60px;
        color: rgb(${({ theme }) => theme.primary});
      }
    }
  }

  .md-editor {
    border-radius: 0px;
    box-shadow: none;
  }

  .md-editor-toolbar,
  .md-editor-toolbar-wrap {
    background: transparent !important;
    border: none !important;
    border-radius: 0px;
  }

  .md-editor-toolbar-warp:not(.md-editor-toolbar-bottom) {
    border-bottom: none;
  }

  .cm-editor {
    border: none !important;
    border-radius: 0px !important;
  }

  .cm-scroller {
    border: none;
    border-radius: 0px !important;
  }
`;
