const express= require('express')
const router= express.Router()

// const {   register,
//   verifyRegister,
//   login,
//   verifyLogin} = require('../controllers/authController')



const {
   register,
  verifyRegister,
  login,
  verifyLogin,
  logout,
  getProfile,
}= require('../controller/authController')


const ProtectRoute = require('../middleware/authMiddleware')

router.post('/register', register);
router.post('/verify-register', verifyRegister);
router.post('/login', login);
router.post('/verify-login', verifyLogin);
router.get('/profile', ProtectRoute, getProfile)
router.post('/logout', ProtectRoute, logout)


module.exports = router;