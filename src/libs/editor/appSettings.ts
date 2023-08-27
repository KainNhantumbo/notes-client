export type SettingName =
  | 'disableBeforeInput'
  | 'measureTypingPerf'
  | 'isRichText'
  | 'isCharLimit'
  | 'isMaxLength'
  | 'isCharLimitUtf8'
  | 'shouldUseLexicalContextMenu'
  | 'showTableOfContents'
  | 'tableCellMerge'
  | 'tableCellBackgroundColor';

export type Settings = Record<SettingName, boolean>;


export const DEFAULT_SETTINGS: Settings = {
  disableBeforeInput: false,
  isCharLimit: false,
  isCharLimitUtf8: false,
  isMaxLength: false,
  isRichText: true,
  measureTypingPerf: false,
  shouldUseLexicalContextMenu: false,
  showTableOfContents: false,
  tableCellBackgroundColor: true,
  tableCellMerge: true,
};
