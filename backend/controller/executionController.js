const axios= require("axios");
const Submission = require("../models/submission");
const User = require("../models/userModel");
const Room = require("../models/Room");

const judge0ApiKey = process.env.judge0ApiKey;
const judge0Endpoint = process.env.judge0EndPoint;
const rapidApiHost = process.env.rapidApiHost;

// Supported languages mapping (Judge0 language IDs)
const languages = {
  'javascript': { id: 63, version: 'Node.js 18.15.0' },
  'python': { id: 71, version: 'Python 3.10.0' },
  'java': { id: 62, version: 'Java 11.0.4' },
  'c': { id: 50, version: 'GCC 9.4.0' },
  'cpp': { id: 54, version: 'GCC 9.4.0' },
  'csharp': { id: 51, version: '.NET 6.0.102' },
  'php': { id: 68, version: 'PHP 8.2.3' },
  'ruby': { id: 72, version: 'Ruby 3.2.2' },
  'swift': { id: 83, version: 'Swift 5.7.3' },
  'go': { id: 60, version: 'Go 1.18.2' },
  'typescript': { id: 74, version: 'TypeScript 5.0.3' }
};

// Execute code from a room context
exports.executeCode = async (req, res) => {
  try {
    const { sourceCode, language, stdin, roomId } = req.body;
    const userId = req.user?.id;
    
    if (!sourceCode || !language) {
      return res.status(400).json({ error: 'Source code and language are required' });
    }

    const languageInfo = languages[language.toLowerCase()];
    if (!languageInfo) {
      return res.status(400).json({ error: 'Unsupported language' });
    }

    // Check room permissions if roomId is provided
    let room = null;
    if (roomId) {
      room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }

      // Verify user is a member of the room
      const isMember = room.members.some(member => member.user.equals(userId));
      if (!isMember) {
        return res.status(403).json({ error: 'You are not a member of this room' });
      }
    }

    const options = {
      method: 'POST',
      url: `${judge0Endpoint}/submissions`,
      params: {
        base64_encoded: 'false',
        wait: 'true',
        fields: '*'
      },
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': judge0ApiKey,
        'X-RapidAPI-Host': rapidApiHost
      },
      data: {
        source_code: sourceCode,
        language_id: languageInfo.id,
        stdin: stdin || ''
      }
    };

    const response = await axios.request(options);
    const result = response.data;

    // Get user details for executedBy field
    const user = await User.findById(userId);

    // Save submission to database
    const submission = new Submission({
      sourceCode,
      languageId: languageInfo.id,
      languageName: language,
      stdin: stdin || '',
      stdout: result.stdout,
      stderr: result.stderr,
      status: {
        id: result.status.id,
        description: result.status.description
      },
      compileOutput: result.compile_output,
      time: result.time,
      memory: result.memory,
      user: userId,
      room: roomId,
      executedBy: {
        userId: user._id,
        username: user.username,
        profilepic: user.profilepic
      }
    });

    await submission.save();

    // If execution was from a room, update the room's code and language
    if (room) {
      room.code = sourceCode;
      room.language = language;
      await room.save();
    }

    res.json({
      stdout: result.stdout,
      stderr: result.stderr,
      status: result.status,
      time: result.time,
      memory: result.memory,
      compileOutput: result.compile_output,
      submissionId: submission._id,
      language: languageInfo
    });

  } catch (error) {
    console.error('Execution error:', error);
    res.status(500).json({ 
      error: 'Failed to execute code',
      details: error.response?.data || error.message 
    });
  }
};

// Get submissions for a room
exports.getRoomSubmissions = async (req, res) => {
  try {
    const { roomId } = req.params;
    const submissions = await Submission.find({ room: roomId })
      .sort({ createdAt: -1 })
      .populate('user', 'username profilepic')
      .populate('room', 'name roomCode');
      
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching room submissions:', error);
    res.status(500).json({ error: 'Failed to fetch room submissions' });
  }
};

// Get user's submissions across all rooms
exports.getUserSubmissions = async (req, res) => {
  try {
    const userId = req.user?.id;
    const submissions = await Submission.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('room', 'name roomCode');
      
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching user submissions:', error);
    res.status(500).json({ error: 'Failed to fetch user submissions' });
  }
};


const http = require('https');

const options = {
	method: 'POST',
	hostname: 'judge0-ce.p.rapidapi.com',
	port: null,
	path: '/submissions?base64_encoded=true&wait=false&fields=*',
	headers: {
		'x-rapidapi-key': 'e2102b6f61msh6afc4b2bc90dde2p163473jsna681b2ffba6c',
		'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.write(JSON.stringify({
  language_id: 52,
  source_code: 'I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=',
  stdin: 'SnVkZ2Uw'
}));
req.end();