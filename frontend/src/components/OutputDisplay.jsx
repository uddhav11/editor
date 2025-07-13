import React from 'react';
import { BsCheckCircleFill, BsXCircleFill, BsHourglassSplit } from 'react-icons/bs';

const OutputDisplay = ({ output, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-blue-400">
        <BsHourglassSplit className="animate-spin text-3xl mb-2" />
        <span>Executing your code...</span>
      </div>
    );
  }

  if (!output) {
    return (
      <div className="text-sm text-neutral-400 italic h-32 flex items-center justify-center">
        Run your code to see the output here
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        {output.status.id === 3 ? (
          <BsCheckCircleFill className="text-green-500 text-xl" />
        ) : (
          <BsXCircleFill className="text-red-500 text-xl" />
        )}
        <span className="font-bold">
          {output.status.description}
        </span>
      </div>

      {output.stderr && (
        <div className="bg-red-900/30 p-3 rounded">
          <h3 className="font-bold text-red-400">Error Output</h3>
          <pre className="text-sm whitespace-pre-wrap font-mono">{output.stderr}</pre>
        </div>
      )}

      {output.compileOutput && (
        <div className="bg-yellow-900/30 p-3 rounded">
          <h3 className="font-bold text-yellow-400">Compilation Output</h3>
          <pre className="text-sm whitespace-pre-wrap font-mono">{output.compileOutput}</pre>
        </div>
      )}

      {output.stdout && (
        <div className="bg-green-900/30 p-3 rounded">
          <h3 className="font-bold text-green-400">Standard Output</h3>
          <pre className="text-sm whitespace-pre-wrap font-mono">{output.stdout}</pre>
        </div>
      )}

      <div className="flex justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-700">
        <div className="flex items-center space-x-2">
          <span>Time: {output.time || '0'}s</span>
          <span className="text-neutral-600">|</span>
          <span>Memory: {output.memory || '0'}KB</span>
        </div>
        <span>Exit Code: {output.status.id}</span>
      </div>
    </div>
  );
};

export default OutputDisplay;