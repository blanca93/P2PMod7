var express = require('express');
var router = express.Router();

var quizController = require ('../controllers/quiz_controller');

// Página de entrada (homepage)
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId

/* GET home page. */
//DISEÑO ANTIGUO SIN BASE DE DATOS
// router.get('/quizes/question', quizController.question);
// router.get('/quizes/answer', quizController.answer);

//DISEÑO NUEVO CON BASE DE DATOS
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/author', quizController.author);

module.exports = router;
