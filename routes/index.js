var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

// Definicion de rutas de /quizzes

router.get('/quizzes', quizController.index);
router.get('/quizzes/:quizId(\\d+)', quizController.show);
router.get('/quizzes/:quizId(\\d+)/check', quizController.check);

/*router.get('/question', quizController.question);
router.get('/check', quizController.check);*/

module.exports = router;
