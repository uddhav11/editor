const User = require("../models/userModel");

module.exports = async function generateUserCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  
  const generateCode = () => {
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  let unique = false;
  let newCode;

  while (!unique) {
    newCode = generateCode();
    const existingUser = await User.findOne({ userCode: newCode });
    if (!existingUser) {
      unique = true;
    }
  }

  return newCode;
};



