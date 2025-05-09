const router = require('express').Router();
const auth = require('../middleware/auth');
const { addScore, getUserScores } = require('../controllers/scoreController');

router.post('/', auth, addScore);
router.get('/', auth, getUserScores);

module.exports = router;