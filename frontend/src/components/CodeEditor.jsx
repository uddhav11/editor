import React from 'react';
import MonacoEditor from '@monaco-editor/react';

const CodeEditor = ({ code, language }) => {
  return (
    <MonacoEditor
      height="100%"
      language={language || 'javascript'}

      theme="vs-dark"
      value={code || '// Start coding here...'}
      options={{
        automaticLayout: true,
        fontSize: 14,
        minimap: { enabled: false }
      }}
    />
  );
};

export default CodeEditor;