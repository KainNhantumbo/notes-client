import { useAppContext } from '@/context/AppContext';
import actions from '@/shared/actions';
import { DrawingPinFilledIcon, DrawingPinIcon } from '@radix-ui/react-icons';
import { RiPushpinFill, RiPushpinLine } from 'react-icons/ri';
import styled, { useTheme } from 'styled-components';

export default function TooglePinNote() {
  const { state, dispatch } = useAppContext();
  const { primary_shade: primaryShadeColor } = useTheme();

  return (
    <Container
      onClick={() =>
        dispatch({
          type: actions.CURRENT_NOTE,
          payload: {
            ...state,
            currentNote: {
              ...state.currentNote,
              metadata: {
                ...state.currentNote.metadata,
                pinned: !state.currentNote.metadata.pinned
              }
            }
          }
        })
      }>
      {state.currentNote.metadata.pinned ? (
        <>
          <RiPushpinFill style={{ color: `rgb(${primaryShadeColor})` }} />
          <span style={{ color: `rgb(${primaryShadeColor})` }}>Pinned</span>
        </>
      ) : (
        <>
          <RiPushpinLine />
          <span>Pin</span>
        </>
      )}
    </Container>
  );
}

const Container = styled.button`
  all: unset;
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
  border-radius: 8px;
  padding: 5px 8px;

  :hover {
    transition: all 200ms ease-in-out;
    color: rgb(${({ theme }) => theme.primary_shade});
    background: rgb(${({ theme }) => theme.primary}, 0.2);
  }

  span {
    font-weight: 500;
    font-size: 0.9rem;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;
