import React from 'react';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { formatDistanceToNow } from 'date-fns';

const SubmissionsHistory = ({ submissions }) => {
  if (!submissions || submissions.length === 0) {
    return (
      <div className="text-sm text-neutral-400 italic">
        No submission history yet
      </div>
    );
  }

  console.log('Submissions:', submissions);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold mb-2">Recent Executions</h2>
      {submissions.map((submission) => (
        <div
          key={submission._id}
          className="bg-neutral-800 p-3 rounded-lg border border-neutral-700"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-2">
                {submission.status.id === 3 ? (
                  <BsCheckCircleFill className="text-green-500" />
                ) : (
                  <BsXCircleFill className="text-red-500" />
                )}
                <span className="font-medium">
                  {submission.status.description}
                </span>
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                {formatDistanceToNow(new Date(submission.createdAt), {
                  addSuffix: true,
                })}
              </div>
            </div>
            <div className="text-xs text-neutral-400">
              <div>Time: {submission.time || '0'}s</div>
              <div>Memory: {submission.memory || '0'}KB</div>
            </div>
          </div>
          {submission.stderr && (
            <pre className="text-xs text-red-400 mt-2 whitespace-pre-wrap">
              {submission.stderr}
            </pre>
          )}
          {submission.stdout && (
            <pre className="text-xs text-green-400 mt-2 whitespace-pre-wrap">
              {submission.stdout.substring(0, 100)}
              {submission.stdout.length > 100 && '...'}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubmissionsHistory;