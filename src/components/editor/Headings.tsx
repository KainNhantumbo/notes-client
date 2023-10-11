import { useState } from 'react';
import { IconType } from '@/types';
import Dropdown from 'rc-dropdown';
import styled from 'styled-components';
import { Tooltip } from 'react-tooltip';
import { useCurrentEditor } from '@tiptap/react';
import { RiH1, RiH2, RiH3, RiH4, RiH5, RiH6, RiHeading } from 'react-icons/ri';

const headings: { icon: IconType; level: number }[] = [
  { icon: RiH1, level: 1 },
  { icon: RiH2, level: 2 },
  { icon: RiH3, level: 3 },
  { icon: RiH4, level: 4 },
  { icon: RiH5, level: 5 },
  { icon: RiH6, level: 6 }
];

export default function Headings() {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleHeading = (level: any) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  const renderDropdownItems = (): JSX.Element => (
    <DropdownContainer>
      {headings.map(({ icon: Icon, level }, index) => (
        <div
          key={index.toString()}
          onClick={() => toggleHeading(level)}
          className={editor.isActive('heading', { level }) ? 'is-active' : ''}>
          <Icon />
          <span>Heading {String(level)}</span>
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
        data-tooltip-id='headings'
        data-tooltip-content='Insert Heading'
        className={editor.isActive('heading') ? 'is-active' : ''}>
        <RiHeading />
        <Tooltip
          classNameArrow='tooltip-border-class'
          className='tooltip-class'
          id='headings'
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
