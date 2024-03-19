import { RiAlignCenter, RiAlignJustify, RiAlignLeft, RiAlignRight } from 'react-icons/ri';
import Dropdown from 'rc-dropdown';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { Tooltip } from 'react-tooltip';
import styled from 'styled-components';
import { useCurrentEditor } from '@tiptap/react';

type AlignOptions = 'left' | 'center' | 'right' | 'justify';

const options: { icon: IconType; type: AlignOptions }[] = [
  { type: 'left', icon: RiAlignLeft },
  { type: 'center', icon: RiAlignCenter },
  { type: 'right', icon: RiAlignRight },
  { type: 'justify', icon: RiAlignJustify }
];

export default function TextAlign() {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const setAlignment = (type: AlignOptions) => {
    editor.chain().focus().setTextAlign(type).run();
  };

  const renderDropdownItems = (): JSX.Element => (
    <DropdownContainer>
      {options.map(({ icon: Icon, type }, index) => (
        <div
          key={index.toString()}
          onClick={() => setAlignment(type)}
          className={editor.isActive('textAlign', type) ? 'is-active' : ''}>
          <Icon />
          <span>Align {type}</span>
        </div>
      ))}
    </DropdownContainer>
  );

  return (
    <Dropdown
      trigger={['click']}
      animation='slide-up'
      align={{ autoArrow: true }}
      arrow={true}
      visible={isDropdownVisible}
      onVisibleChange={(state) => setIsDropdownVisible(state)}
      overlay={renderDropdownItems}>
      <button
        data-tooltip-id='text-align'
        data-tooltip-content='Align Text'
        className={editor.isActive('textAlign') ? 'is-active' : ''}>
        <RiAlignCenter />
        <Tooltip
          classNameArrow='tooltip-border-class'
          className='tooltip-class'
          id='text-align'
        />
      </button>
    </Dropdown>
  );
}

const DropdownContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  background: rgba(${({ theme }) => theme.foreground}, 0.85);
  border: 1px solid rgba(${({ theme }) => theme.font}, 0.1);
  user-select: none;
  cursor: pointer;
  font-family: 'Inter';
  font-size: 0.85rem;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    padding: 5px 8px;
    border-radius: 5px;
    position: relative;
    svg {
      width: 18px;
      height: 18px;
    }

    :hover {
      background: rgba(${({ theme }) => theme.primary}, 0.25);
      ::after {
        position: absolute;
        content: '';
        width: 3.5px;
        height: 24px;
        border-radius: 5px;
        background: rgba(${({ theme }) => theme.primary_shade}, 0.8);
        top: calc(50% - 12px);
        left: -7px;
      }
    }
  }
  .is-active {
    color: rgb(${({ theme }) => theme.primary_shade});
    background: rgb(${({ theme }) => theme.primary}, 0.2);
  }
`;
