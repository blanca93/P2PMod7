
var models = require ("../models/models.js");

// Autoload - factoriza el código si la ruta incluye quizId

exports.load = function (req, res, next, quizId) {
	models.Quiz.find({
		where: {id: Number(quizId)},
		include: [{model: models.Comment}]
	}).then(function(quiz){
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
	if (req.query.search){
		var search = "%"+req.query.search.replace("/[ ]+/g","%")+"%";
	 	models.Quiz.findAll({where: ["lower(pregunta) like lower(?)", search], order:"pregunta"}).then(function(quizes){
	 		res.render('quizes/index', {quizes: quizes, errors: []});
	 	}).catch (function (error) {next(error);});	
	} else {
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index', {quizes: quizes, errors: []});
	}).catch (function (error) {next(error);});	
	}	
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
	var quiz = models.Quiz.build({tema: "Tema", pregunta: "Pregunta", respuesta: "Respuesta"}); //crea objeto quiz
	res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create

exports.create = function (req, res) {
	var quiz = models.Quiz.build(req.body.quiz); //crea objeto quiz
	quiz.validate().then(function(err) {
		if (err) {
			res.render('quizes/new', {quiz: quiz, errors: err.errors});
		} else {
			quiz.save({fields: ["tema", "pregunta", "respuesta"]}).then(function(){
				res.redirect('/quizes'); // URL relativo a la lista de preguntas
			})
		}
	});		
};

// GET /quizes/:id/edit

exports.edit = function (req, res) {
	var quiz = req.quiz; //autoload de la instancia quiz
	res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id

exports.update = function (req, res) {
	req.quiz.tema = req.body.quiz.tema;
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	
	req.quiz.validate().then(function(err) {
		if (err) {
			res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
		} else {
			req.quiz.save({fields: ["tema", "pregunta", "respuesta"]}).then(function(){
				res.redirect('/quizes'); // URL relativo a la lista de preguntas
			})
		}
	});
};	


// DELETE /quizes/:id

exports.destroy = function (req, res) {
	req.quiz.destroy().then(function() {
		res.redirect('/quizes'); // URL relativo a la lista de preguntas
	}).catch(function(error){next(error)});			
};


// GET /author

exports.author = function (req, res) {
	res.render('author', {autor: 'Blanca Sierra', errors: []});
};