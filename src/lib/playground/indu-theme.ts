export const induTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'keyword', foreground: 'C792EA' },
    { token: 'type', foreground: '4ECDC4' },
    { token: 'identifier', foreground: 'F8F6F0' },
    { token: 'string', foreground: 'C3E88D' },
    { token: 'number', foreground: 'F78C6C' },
    { token: 'comment', foreground: '6B7280', fontStyle: 'italic' },
    { token: 'operator', foreground: 'E8A838' },
  ],
  colors: {
    'editor.background': '#12121F',
    'editor.foreground': '#F8F6F0',
    'editorLineNumber.foreground': '#6B7280',
    'editorCursor.foreground': '#E8A838',
    'editor.selectionBackground': '#2D2D4E',
    'editor.inactiveSelectionBackground': '#1A1A2E',
    'editor.lineHighlightBackground': '#1A1A2E',
    'editorWidget.background': '#1A1A2E',
    'editorWidget.border': '#2D2D4E',
  }
};
