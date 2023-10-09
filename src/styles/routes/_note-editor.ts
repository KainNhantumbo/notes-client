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

  .wrapper-container {
    width: 100%;
    height: 100%;
    max-width: 1080px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  .editor-container,
  .tiptap {
    width: 100%;

    max-height: 100%;
    overflow-y: hidden;
    padding: 12px;

    .placeholder-class:first-child::before {
      color: rgba(${({ theme }) => theme.font}, 0.5);
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
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
  }
`;
