import React, { useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';

const CodeEditor = ({ code, language, onChange }) => {
  const languageMap = {
    javascript: 'javascript',
    python: 'python',
    java: 'java',
    c: 'cpp',
    cpp: 'cpp',
    csharp: 'csharp',
    php: 'php',
    ruby: 'ruby',
    swift: 'swift',
    go: 'go',
    typescript: 'typescript'
  };

  const editorLanguage = languageMap[language] || 'javascript';

  return (
    <MonacoEditor
      height="100%"
      language={editorLanguage}
      theme="vs-dark"
      value={code}
      options={{
        automaticLayout: true,
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: 'on'
      }}
      onChange={onChange}
    />
  );
};

export default CodeEditor;