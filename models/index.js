var path = require('path');

//Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
//	DATABASE_URL = sqlite:///
//	DATABASE_STORAGE = quiz.sqlite
// Usar BBDD Postgres:
//	DATABASE_URL = postgres://ypikfkzogxussl:Q77fj1hl88nUWM1T84P4HWOnOm@ec2-50-17-255-136.compute-1.amazonaws.com:5432/d7sbp489bl9udf

var url, storage;

if (!process.env.DATABASE_URL) {
	url = "sqlite:///";
	storage = "quiz.sqlite";
} else{
	url = process.env.DATABASE_URL;
	storage = process.env.DATABASE_STORAGE || "";
};

var sequelize = new Sequelize(url, {storage: storage, omitNull:true});

//Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){ // Ya se han creado las tablas necsarias.
	return Quiz.count().then(function (c){
	if (c===0) { //la tabla se inicializa si está vacia
		return Quiz.bulkCreate([{ question: '¿Capital de Italia?', answer: 'Roma'},
			{question: '¿Capital de Portugal?', answer: 'Lisboa'}]).then(function(){
			console.log('Base de datis inicializada con datos');
		});
	}
});
}).catch(function(error){
	console.log("Error sincronizando las tablas de la BBDD:", error);
	process.exit(1);
});

exports.Quiz = Quiz; //exportar definicion de tabla Quiz