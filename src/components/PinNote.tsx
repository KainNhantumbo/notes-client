import { useAppContext } from '@/context/AppContext';
import actions from '@/shared/actions';
import { DrawingPinFilledIcon, DrawingPinIcon } from '@radix-ui/react-icons';
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
          <DrawingPinFilledIcon
            style={{ color: `rgb(${primaryShadeColor})` }}
          />
          <span>Pinned</span>
        </>
      ) : (
        <>
          <DrawingPinIcon />
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
    background: rgba(${({ theme }) => theme.primary}, 0.25);
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
