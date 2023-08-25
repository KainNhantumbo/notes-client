export type SettingName =
  | 'disableBeforeInput'
  | 'measureTypingPerf'
  | 'isRichText'
  | 'isCharLimit'
  | 'isMaxLength'
  | 'isCharLimitUtf8'
  | 'isAutocomplete'
  | 'shouldUseLexicalContextMenu'
  | 'showTreeView'
  | 'showNestedEditorTreeView'
  | 'emptyEditor'
  | 'showTableOfContents'
  | 'tableCellMerge'
  | 'tableCellBackgroundColor';

export type Settings = Record<SettingName, boolean>;

export const isDevPlayground: boolean = false

export const DEFAULT_SETTINGS: Settings = {
  disableBeforeInput: false,
  emptyEditor: isDevPlayground,
  isAutocomplete: false,
  isCharLimit: false,
  isCharLimitUtf8: false,
  isMaxLength: false,
  isRichText: true,
  measureTypingPerf: false,
  shouldUseLexicalContextMenu: false,
  showNestedEditorTreeView: false,
  showTableOfContents: false,
  showTreeView: true,
  tableCellBackgroundColor: true,
  tableCellMerge: true,
};
