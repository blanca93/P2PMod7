
var models = require ("../models/models.js");

// Autoload - factoriza el código si la ruta incluye quizId

exports.load = function (req, res, next, quizId) {
	models.Quiz.find(quizId).then(function(quiz){
		if (quiz) {
			req.quiz = quiz;
			next();
		} else {
			next (new Error ('No existe quizId= ' + quizId));
		}
	}).catch (function (error) {next(error);});	
};

// GET /quizes

exports.index = function (req, res, next) {
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', {quizes: quizes, errors: []});
	}).catch (function (error) {next(error);});		
};

// GET /quizes/:id

exports.show = function (req, res) {
	//models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: req.quiz, errors: []});
	//})	
};

// GET /quizes/:id/answer

exports.answer = function (req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === req.quiz.respuesta) {
			res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcto', errors: []});
		} else {
			res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecto', errors: []});
		}
	})
};

// GET /quizes/new

exports.new = function (req, res) {
	var quiz = models.Quiz.build({pregunta: "Pregunta", respuesta: "Respuesta"}); //crea objeto quiz
	res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create

exports.create = function (req, res) {
	var quiz = models.Quiz.build(req.body.quiz); //crea objeto quiz
	quiz.validate().then(function(err) {
		if (err) {
			res.render('quizes/new', {quiz: quiz, errors: err.errors});
		} else {
			quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
				res.redirect('/quizes'); // URL relativo a la lista de preguntas
			})
		}
	});		
};

// GET /author

exports.author = function (req, res) {
	res.render('author', {autor: 'Blanca Sierra', errors: []});
};