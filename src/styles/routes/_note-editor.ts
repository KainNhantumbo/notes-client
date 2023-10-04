import styled from 'styled-components';

export const _noteEditor = styled.main`
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 12px;

  .wrapper-container {
    width: 100%;
    height: 100%;
    max-height: 100%;

    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    max-width: 1080px;
    align-self: center;
  }

  .editor-container,
  .tiptap {
    width: 100%;
    height: 100vh;
    max-height: 100%;

    overflow-y: hidden;
    padding: 12px;

    .editor-placeholder:first-child::before {
      color: rgba(${({ theme }) => theme.font}, .5);
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }

    a {
      color: #1a8eff;
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    p {
      width: 100%;
      margin-bottom: 16px;
      word-wrap: break-word;
      display: block;
    }

    h3,
    h2 {
      margin-bottom: 10px;
      font-size: 1.2rem;
      font-weight: 500;
    }

    h2 {
      font-size: 1.4rem;
      line-height: 2rem;
    }

    ul,
    ol {
      margin-bottom: 1.4rem;
      li {
        list-style: disc;
        margin-left: 2rem;
      }
    }

    img {
      width: 100%;
      height: 100%;
      max-width: 700px;
      max-height: 480px;
      object-fit: cover;
      border-radius: 5px;
      margin: 10px auto;
    }

    blockquote {
      margin: 0 auto;
      text-align: center;
      font-weight: 500;
    }

    i {
      font-style: italic;
    }

    mark {
      background: rgba(${({ theme }) => theme.error}, 0.08);
      color: rgb(${({ theme }) => theme.primary_shade});
    }

    u {
      text-underline-offset: 3px;
    }

    s {
      text-decoration: line-through;
    }

    ::-webkit-scrollbar {
      width: 14px;
      height: 14px;
    }

    ::-webkit-scrollbar-track {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 8px;
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      border: 4px solid rgba(0, 0, 0, 0);
      background-clip: padding-box;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0);
    }

    :hover::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.1);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: rgba(0, 0, 0, 0.15);
    }

    .overflow-dark:hover::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .overflow-dark::-webkit-scrollbar-thumb:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }

    ::-webkit-scrollbar-button {
      display: none;
      width: 0;
      height: 0;
    }

    ::-webkit-scrollbar-corner {
      background-color: transparent;
    }
  }
`;
