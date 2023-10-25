import styled from 'styled-components';

export const _noteEditor = styled.main`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 12px;

  .tooltip-class {
    border-radius: 8px;
    color: rgb(${({ theme }) => theme.white});
    background: rgba(${({ theme }) => theme.primary_shade}, 0.8);
    border: 1px solid rgba(${({ theme }) => theme.white}, 0.9);
    backdrop-filter: blur(20px);
    font-family: 'Inter';
    padding: 5px 10px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .tooltip-border-class {
    border-right: 1px solid rgba(${({ theme }) => theme.white}, 0.9);
    border-bottom: 1px solid rgba(${({ theme }) => theme.white}, 0.9);
  }

  .loading-indicator {
    width: 100vw;
    height: 100vh;
    display: grid;
    place-content: center center;
    place-items: center center;
    gap: 20px;
    font-weight: 500;
    font-size: 0.95rem;
    color: rgb(${({ theme }) => theme.primary_shade});
    padding: calc(20% - 1px) 12px;

    .loader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
  }

  .wrapper-container {
    width: 100%;
    height: 100%;
    max-width: 1080px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    overflow: hidden;
  }

  .bubble-menu-container {
    width: 100%;
    min-width: fit-content;
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    gap: 5px;
    margin: 5px 0;
    margin: 0 auto;
    padding: 5px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    background: rgba(${({ theme }) => theme.foreground}, 0.7);
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.15);
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.1);

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

  .ProseMirror {
    min-height: 250px;
    overflow-y: auto;

    :focus {
      outline: none;
    }

    ::-webkit-scrollbar {
      width: 8px;
      cursor: grab;

      :hover {
        width: 12px;
        transition: all 0.2s ease-in-out;
      }
    }
  }

  .editor-container,
  .tiptap {
    width: 100%;
    height: auto;
    padding: 12px;

    .placeholder-class:first-child::before {
      color: rgba(${({ theme }) => theme.font}, 0.5);
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }

    hr,
    .hr-class {
      color: rgb(${({ theme }) => theme.font});
      border-bottom: 2px solid rgb(${({ theme }) => theme.font});
      margin: 8px 0;
      border-radius: 3px;
    }

    em,
    .italic-class {
      font-style: italic;
    }

    a,
    .link-class {
      color: #1a8eff;
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    p {
      width: 100%;
      margin-bottom: 16px;
      word-wrap: break-word;
      display: block;
      line-height: 1.6rem;
    }

    h3,
    h2 {
      margin-bottom: 10px;
      font-size: 1.4rem;
    }

    h2 {
      font-size: 1.6rem;
      line-height: 2rem;
    }

    h4 {
      font-size: 1.2rem;
      line-height: 2rem;
    }

    h5,
    h6 {
      font-size: 1.1rem;
      line-height: 1.8rem;
    }

    ul,
    ol {
      margin-bottom: 1.2rem;
      li {
        list-style: disc;
        margin-left: 2rem;
      }
    }

    ol {
      li {
        list-style: decimal;
      }
    }

    .task-list-class {
      width: 100%;

      .task-item-class {
        width: 100%;

        list-style: disc;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;

        label {
          width: fit-content;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0;
        }

        div {
          position: relative;
          top: 7px;
        }

        input[type='checkbox'] {
          :checked {
            color: rgb(${({ theme }) => theme.primary_shade});
            background: rgb(${({ theme }) => theme.primary_shade});
          }
        }
      }
    }

    img {
      width: 100%;
      height: 100%;
      max-width: 700px;
      max-height: 480px;
      object-fit: cover;
      border-radius: 3px;
      margin: 10px auto;
    }

    blockquote,
    .blockquote-class {
      width: 100%;
      background: rgba(${({ theme }) => theme.primary}, 0.1);
      border-left: 3px solid rgba(${({ theme }) => theme.font}, 0.1);
      text-align: left;
      font-size: 1.2rem;
      padding: 18px;
      margin: 12px 0;

      p {
        line-height: 2rem;
      }

      @media screen and (max-width: 530px) {
        padding: 12px;
        font-size: 1.1rem;

        p {
          line-height: 1.8rem;
        }
      }
    }

    code {
      line-height: 1.4rem;
    }

    .code-class {
      white-space: pre;
      padding: 2px 5px;
      background: rgba(${({ theme }) => theme.font}, 0.1);
      border-radius: 5px;
      margin: 0 5px;
      line-height: 1.6rem;
      font-family: Menlo, 'JetBrains Mono', Consolas, 'Liberation Mono',
        'Courier New', ui-monospace, monospace;
    }

    .code-block-class {
      white-space: pre;
    }

    pre {
      border-radius: 8px !important;
      padding: 12px;
      background: rgba(${({ theme }) => theme.font}, 0.1);
      border: 1px solid rgba(${({ theme }) => theme.black}, 0.1);
      white-space: pre-wrap;
      word-break: break-all;
      word-wrap: break-word;
      text-align: justify;
    }

    pre code {
      word-spacing: normal;
      tab-size: 2 !important;
      hyphens: none;
      -webkit-font-smoothing: antialiased;
      line-height: 1.6rem;
      white-space: inherit;
      border: none;
      padding: 0;
      overflow: auto;
      font-size: 1rem;
      margin: 2rem 0;
      word-wrap: break-word;
      word-break: break-all;
      font-family: 'JetBrains Mono', Consolas, 'Liberation Mono',
        'Courier New', ui-monospace, monospace;
    }

    .text-style-class {
      color: rgb(${({ theme }) => theme.primary_shade});
    }

    i {
      font-style: italic;
    }

    u {
      text-underline-offset: 3px;
    }

    s {
      text-decoration: line-through;
    }
  }
`;
