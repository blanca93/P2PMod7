module.exports = function (sequelize, DataTypes) {
	
	return sequelize.define ('Comment', {
		texto: {type: DataTypes.STRING, validate: {notEmpty: {msg: "Comentario vacío. Por favor, escriba algo."}}}
	});

}