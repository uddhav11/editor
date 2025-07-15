// import React, { useEffect } from 'react';
// import MonacoEditor from '@monaco-editor/react';

// const CodeEditor = ({ code, language, onChange }) => {
//   const languageMap = {
//     javascript: 'javascript',
//     python: 'python',
//     java: 'java',
//     c: 'cpp',
//     cpp: 'cpp',
//     csharp: 'csharp',
//     php: 'php',
//     ruby: 'ruby',
//     swift: 'swift',
//     go: 'go',
//     typescript: 'typescript'
//   };

//   const editorLanguage = languageMap[language] || 'javascript';

//   return (
//     <MonacoEditor
//       height="100%"
//       language={editorLanguage}
//       theme="vs-dark"
//       value={code}
//       options={{
//         automaticLayout: true,
//         fontSize: 14,
//         minimap: { enabled: false },
//         scrollBeyondLastLine: false,
//         wordWrap: 'on'
//       }}
//       onChange={onChange}
//     />
//   );
// };

// export default CodeEditor;


// import React, { useEffect, useRef } from 'react';
// import MonacoEditor from '@monaco-editor/react';
// import { useRoom } from '../context/RoomContext';
// import useCodeExecution from '../hooks/useCodeExecution';
// import OutputDisplay from './OutputDisplay';
// import {BsTerminal, IoMdTime} from 'react-icons/bs';
// import { getRoomSubmissions } from '../redux/executionSlice';
// import { useDispatch } from 'react-redux';
// import SubmissionsHistory from './SubmissionHistory';

// const CodeEditor = ({roomId}) => {
//   const {
//     code,
//     language,
//     members,
//     cursorPositions,
//     updateCode,
//     updateLanguage,
//     updateCursorPosition
//   } = useRoom();
  
//   const editorRef = useRef(null);
//   const decorationsRef = useRef([]);

//   const handleEditorDidMount = (editor, monaco) => {
//     editorRef.current = editor;
    
//     // Set up cursor tracking
//     editor.onDidChangeCursorPosition((e) => {
//       updateCursorPosition({
//         lineNumber: e.position.lineNumber,
//         column: e.position.column
//       }, '#FF5722'); // Your user's cursor color
//     });
//   };

//   const handleChange = (value) => {
//     updateCode(value);
//   };

//   // Update decorations for other users' cursors
//   useEffect(() => {
//     if (!editorRef.current) return;

//     const newDecorations = Object.values(cursorPositions).map((data) => ({
//       range: new monaco.Range(
//         data.position.lineNumber,
//         data.position.column,
//         data.position.lineNumber,
//         data.position.column + 1
//       ),
//       options: {
//         className: 'cursor-decoration',
//         glyphMarginClassName: 'cursor-glyph-margin',
//         stickiness: 1,
//         inlineClassName: 'cursor-inline',
//         hoverMessage: {
//           value: `**${data.user.username}**`,
//           isTrusted: true
//         }
//       }
//     }));

//     decorationsRef.current = editorRef.current.deltaDecorations(
//       decorationsRef.current,
//       newDecorations
//     );
//   }, [cursorPositions]);

//   return (

//     <>
    
    
//     {/* // <div className="h-full w-full">
//     //   <MonacoEditor
//     //     height="100%"
//     //     language={language}
//     //     theme="vs-dark"
//     //     value={code}
//     //     options={{
//     //       automaticLayout: true,
//     //       fontSize: 14,
//     //       minimap: { enabled: false },
//     //       scrollBeyondLastLine: false,
//     //       wordWrap: 'on'
//     //     }}
//     //     onChange={handleChange}
//     //     onMount={handleEditorDidMount}
//     //   />
//     // </div> */}

    
//                   <div className="flex flex-1 h-full flex-col md:flex-row">
//                     {/* Code Editor - 60% */}
//                     <div className="w-full md:w-[60%] border-r border-neutral-700">
//                       <CodeEditor />
//                     </div>
    
//                     {/* Output Panel - 40% */}
//                     <div className="w-full md:w-[40%] bg-neutral-900 text-white flex flex-col">
//                       {/* Output Tabs */}
//                       <div className="flex border-b border-neutral-700">
//                         <button
//                           className={`flex items-center px-4 py-3 text-sm font-medium ${
//                             activeTab === "output"
//                               ? "border-b-2 border-blue-500 text-blue-400"
//                               : "text-neutral-400 hover:text-white"
//                           }`}
//                           onClick={() => setActiveTab("output")}
//                         >
//                           <BsTerminal className="mr-2" />
//                           Output
//                         </button>
//                         <button
//                           className={`flex items-center px-4 py-3 text-sm font-medium ${
//                             activeTab === "history"
//                               ? "border-b-2 border-blue-500 text-blue-400"
//                               : "text-neutral-400 hover:text-white"
//                           }`}
//                           onClick={() => setActiveTab("history")}
//                         >
//                           <IoMdTime className="mr-2" />
//                           History
//                         </button>
//                       </div>
    
//                       {/* Tab Content */}
//                       <div className="flex-1 overflow-y-auto p-4">
//                         {activeTab === "output" ? (
//                           <>
//                             <div className="flex justify-between items-center mb-4">
//                               <h2 className="text-lg font-bold">Execution</h2>
//                               <button
//                                 className={`border font-bold px-6 py-1 rounded-xl ${
//                                   isLoading
//                                     ? "bg-gray-600 cursor-not-allowed"
//                                     : "bg-green-600 hover:bg-green-700 cursor-pointer"
//                                 }`}
//                                 onClick={() => handleRun(code, stdin)}
//                                 disabled={isLoading}
//                               >
//                                 {isLoading ? "Running..." : "Run"}
//                               </button>
//                             </div>
    
//                             <div className="mb-4">
//                               <label className="block text-sm font-medium mb-1">
//                                 Standard Input
//                               </label>
//                               <textarea
//                                 value={stdin}
//                                 onChange={handleStdinChange}
//                                 className="w-full bg-neutral-800 text-white p-2 rounded border border-neutral-700"
//                                 rows={3}
//                                 placeholder="Enter input (if needed)"
//                               />
//                             </div>
    
//                             <OutputDisplay output={output} isLoading={isLoading} />
//                           </>
//                         ) : (
//                           <SubmissionsHistory submissions={submissions} />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//         </>

    

    
//   );
// };

// export default CodeEditor;







import React, { useEffect, useRef, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useRoom } from '../context/RoomContext';
import useCodeExecution from '../components/useCodeExecution';
import OutputDisplay from '../components/OutputDisplay';
import { BsTerminal } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { getRoomSubmissions } from '../redux/executionSlice';
import { useDispatch } from 'react-redux';
import SubmissionsHistory from '../components/SubmissionHistory';

const CodeEditor = ({ roomId }) => {
  const {
    code,
    language,
    members,
    cursorPositions,
    updateCode,
    updateLanguage,
    updateCursorPosition
  } = useRoom();
 
  const editorRef = useRef(null);
  const decorationsRef = useRef([]);
  const [activeTab, setActiveTab] = useState("output");
  const [stdin, setStdin] = useState("");
  const { handleRun, output, isLoading } = useCodeExecution(roomId);
  const dispatch = useDispatch();
  const [submissions, setSubmissions] = useState([]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
   
    // Set up cursor tracking
    editor.onDidChangeCursorPosition((e) => {
      updateCursorPosition({
        lineNumber: e.position.lineNumber,
        column: e.position.column
      }, '#FF5722'); // Your user's cursor color
    });
  };

  const handleChange = (value) => {
    updateCode(value);
  };

  const handleStdinChange = (e) => {
    setStdin(e.target.value);
  };

  // Update decorations for other users' cursors
  useEffect(() => {
    if (!editorRef.current) return;

    const newDecorations = Object.values(cursorPositions).map((data) => ({
      range: new monaco.Range(
        data.position.lineNumber,
        data.position.column,
        data.position.lineNumber,
        data.position.column + 1
      ),
      options: {
        className: 'cursor-decoration',
        glyphMarginClassName: 'cursor-glyph-margin',
        stickiness: 1,
        inlineClassName: 'cursor-inline',
        hoverMessage: {
          value: `**${data.user.username}**`,
          isTrusted: true
        }
      }
    }));

    decorationsRef.current = editorRef.current.deltaDecorations(
      decorationsRef.current,
      newDecorations
    );
  }, [cursorPositions]);

  // Fetch submissions when roomId changes
  useEffect(() => {
    if (roomId) {
      dispatch(getRoomSubmissions(roomId)).then((action) => {
        if (action.payload) {
          setSubmissions(action.payload);
        }
      });
    }
  }, [roomId, dispatch]);

  return (
    <div className="flex flex-1 h-full flex-col md:flex-row">
      {/* Editor Section - 60% */}
      <div className="w-full md:w-[60%] border-r border-neutral-700 h-full">
        <MonacoEditor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          options={{
            automaticLayout: true,
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on'
          }}
          onChange={handleChange}
          onMount={handleEditorDidMount}
        />
      </div>

      {/* Output Section - 40% */}
      <div className="w-full md:w-[40%] bg-neutral-900 text-white flex flex-col">
        {/* Output Tabs */}
        <div className="flex border-b border-neutral-700">
          <button
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              activeTab === "output"
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-neutral-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("output")}
          >
            <BsTerminal className="mr-2" />
            Output
          </button>
          <button
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              activeTab === "history"
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-neutral-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("history")}
          >
            <IoMdTime className="mr-2" />
            History
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "output" ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Execution</h2>
                <button
                  className={`border font-bold px-6 py-1 rounded-xl ${
                    isLoading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 cursor-pointer"
                  }`}
                  onClick={() => handleRun(code, stdin)}
                  disabled={isLoading}
                >
                  {isLoading ? "Running..." : "Run"}
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Standard Input
                </label>
                <textarea
                  value={stdin}
                  onChange={handleStdinChange}
                  className="w-full bg-neutral-800 text-white p-2 rounded border border-neutral-700"
                  rows={3}
                  placeholder="Enter input (if needed)"
                />
              </div>

              <OutputDisplay output={output} isLoading={isLoading} />
            </>
          ) : (
            <SubmissionsHistory submissions={submissions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;