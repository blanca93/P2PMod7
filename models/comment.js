module.exports = function (sequelize, DataTypes) {

	return sequelize.define ('Comment', {
		texto: {type: DataTypes.STRING, validate: {notEmpty: {msg: "Comentario vacio. Por favor, escriba algo."}}}
	});

}