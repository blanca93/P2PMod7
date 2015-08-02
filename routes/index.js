var express = require('express');
var router = express.Router();

var quizController = require ('../controllers/quiz_controller');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

/* GET home page. */
//DISEÑO ANTIGUO SIN BASE DE DATOS
// router.get('/quizes/question', quizController.question);
// router.get('/quizes/answer', quizController.answer);

//DISEÑO NUEVO CON BASE DE DATOS
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/author', quizController.author);

module.exports = router;
