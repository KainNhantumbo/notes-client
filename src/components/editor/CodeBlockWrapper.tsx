import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';

export default function CodeBlockWrapper({
  node: {
    attrs: { language: defaultLanguage }
  },
  updateAttributes,
  extension
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  return (
    <NodeViewWrapper className='code-block'>
      <select
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(event) => {
          updateAttributes({ language: event.target.value });
          console.log(event.target.value);
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
