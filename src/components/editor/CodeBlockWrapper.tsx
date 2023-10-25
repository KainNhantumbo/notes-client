import React from 'react';

import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';

export default function CodeBlockWrapper({
  node: {
    attrs: { language: defaultLanguage }
  },
  updateAttributes,
  extension
}: any) {
  return (
    <NodeViewWrapper className='code-block'>
      <select
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(event) => {
          updateAttributes({ language: event.target.value });
          console.log(<NodeViewContent as='code' />);
        }}>
        <option value='null'>auto</option>
        <option disabled>—</option>
        {extension.options.lowlight
          .listLanguages()
          .map((lang: string, index: number) => (
            <option key={index} value={lang}>
              {lang}
            </option>
          ))}
      </select>
      <pre>
        <NodeViewContent as='code' />
      </pre>
    </NodeViewWrapper>
  );
}
