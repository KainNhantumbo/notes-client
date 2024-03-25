import type { Action, State } from '@/types/reducer';
import actions from '../shared/actions';

export const initialState: State = {
  notes: [],
  folders: [],
  isAboutModal: false,
  isLogoutModal: false,
  isNavigationDrawer: false,
  isPropertiesDrawer: false,
  isEditorToolsTogglerModal: false,
  auth: { id: '', email: '', name: '', token: '' },
  user: { first_name: '', last_name: '', email: '' },
  toast: {
    title: '',
    message: '',
    status: false,
    handleFunction: () => {},
    actionButtonMessage: ''
  },
  prompt: {
    title: '',
    message: '',
    status: false,
    handleFunction: () => {},
    actionButtonMessage: ''
  },
  currentNote: {
    _id: '',
    title: '',
    content: '',
    created_by: '',
    folder_id: '',
    deleted: false,
    pinned: false,
    status: 'none',
    priority: 'none',
    tags: [],
    updatedAt: '',
    createdAt: ''
  },
  query: { search: '', sort: '-updatedAt', status: '', priority: '' },
  settings: {
    _id: '',
    created_by: '',
    editor: {
      auto_save: { enabled: true, delay: 500 },
      toolbar: {
        undo: true,
        redo: true,
        bold: true,
        italic: true,
        headings: true,
        underline: true,
        strike: true,
        textAlign: true,
        highlight: true,
        superscript: true,
        subscript: true,
        code: true,
        image: true,
        paragraph: true,
        bulletList: true,
        orderedList: true,
        taskList: true,
        codeBlock: true,
        blockquote: true,
        horizontalRuler: true,
        hardBreak: true
      },
      font: {
        font_size: 16,
        line_height: 1.6,
        font_family:
          "Inter, 'SF Display', 'Segoe UI', 'Noto Sans', Roboto, 'Open Sans', Helvetica, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        font_weight: 400
      },
      editing: { enable_toolbar: true }
    },
    theme: { scheme: 'light', is_automatic: true }
  }
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case actions.AUTH:
      return { ...state, auth: action.payload.auth };

    case actions.LOGOUT_MODAL:
      return { ...state, isLogoutModal: action.payload.isLogoutModal };

    case actions.ABOUT_MODAL:
      return { ...state, isAboutModal: action.payload.isAboutModal };

    case actions.NOTES:
      return { ...state, notes: action.payload.notes };

    case actions.FOLDERS:
      return { ...state, folders: action.payload.folders };

    case actions.TOAST:
      return { ...state, toast: action.payload.toast };

    case actions.PROMPT:
      return { ...state, prompt: action.payload.prompt };

    case actions.CURRENT_NOTE:
      return { ...state, currentNote: action.payload.currentNote };

    case actions.PROPERTIES_DRAWER:
      return { ...state, isPropertiesDrawer: action.payload.isPropertiesDrawer };

    case actions.QUERY_NOTES:
      return { ...state, query: action.payload.query };

    case actions.SETTINGS:
      return { ...state, settings: action.payload.settings };

    case actions.USER:
      return { ...state, user: action.payload.user };

    case actions.NAVIGATION_DRAWER:
      return { ...state, isNavigationDrawer: action.payload.isNavigationDrawer };

    case actions.EDITOR_TOOLS_TOGGLER_MODAL:
      return {
        ...state,
        isEditorToolsTogglerModal: action.payload.isEditorToolsTogglerModal
      };

    default:
      return { ...state };
  }
}
