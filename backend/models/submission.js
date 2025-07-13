const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  sourceCode: {
    type: String,
    required: true
  },
  languageId: {
    type: Number,
    required: true
  },
  languageName: {
    type: String,
    required: true
  },
  stdin: {
    type: String,
    default: ''
  },
  stdout: {
    type: String
  },
  stderr: {
    type: String
  },
  status: {
    id: Number,
    description: String
  },
  compileOutput: {
    type: String
  },
  time: {
    type: String
  },
  memory: {
    type: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  },
  executedBy: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String,
    profilepic: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Submission', submissionSchema);