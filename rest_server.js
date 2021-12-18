const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const PatientController = require('./controllers/patient');
const config = require('./config.js');

const app = express();

const mongoose = require('mongoose');
(async () => {
  try {
    await mongoose.connect(config.mongo || 'mongodb://localhost:27001,localhost:27002,localhost:27003,localhost:27004/bio_bbdd?replicaSet=replica')
    console.log('Connected to Mongo!')
  } catch (err) {
    console.log('Error connecting to Database: ' + err)
  }
})()

app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (req, res, next) => {
	res.redirect('/patients');
})

app.get('/home', (req, res, next) => {
	res.redirect('/patients');
})

app.get('/patients', async (req, res, next) => {
    let patients = await PatientController.list().catch(e => next(e));
    res.render('index', {patients: patients, patientDeleted: req.query.patientDeleted, title: config.title});
});
app.post('/patients', async (req, res, next) => {
	await PatientController.create(req.body).catch(e => next(e));
	res.redirect('/patients');
})
app.get('/patients/new', (req, res, next) => {
	res.render('new');
});

app.post('/patients/filterByCity', async (req, res, next) => {
    let patients = await PatientController.filterPatientsByCity(req.body.city).catch(e => next(e))
	res.render('index', {patients: patients, patientDeleted: false, title: config.title});
});

app.post('/patients/filterByDiagnosis', async (req, res, next) => {
    let patients = await PatientController.filterPatientsByDiagnosis(req.body.diagnosis).catch(e => next(e))
    res.render('index', {patients: patients, patientDeleted: false, title: config.title});
});

app.post('/patients/filterByDate', async (req, res, next) => {
    let patients = await PatientController.filterPatientsBySpeacialistAndDate(req.body.specialist,req.body.start,req.body.end).catch(e => next(e))
    res.render('index', {patients: patients, patientDeleted: false, title: config.title});
});

app.get('/patients/:patientId', async (req, res, next) => {
	let patient = await PatientController.read(req.params.patientId).catch(e => next(e));
	res.render('show', {patient: patient, title: config.title});
});

app.put('/patients/:patientId', async (req, res, next) => {
	let patient = await PatientController.update(req.params.patientId, req.body).catch(e => next(e));
	res.render('show', {patient: patient, title: config.title});
});

app.delete('/patients/:patientId', async (req, res, next) => {
	let deleted = await PatientController.delete(req.params.patientId).catch(e => next(e));
	res.redirect('/patients?patientDeleted=true');
});

app.get('/patients/:patientId/edit', (req, res, next) => {
	let patientToEdit = {
		id: req.params.patientId,
		name: req.query.name,
		surname: req.query.surname,
		dni: req.query.dni,
		city: req.query.city
	}
	res.render('edit', {patient: patientToEdit, title: config.title});
});

app.get('/patients/:patientId/history', async (req, res, next) => {
	let patientToEditHistory = {
		id: req.params.patientId
	}
    res.render('history', { patient: patientToEditHistory, title: config.title });
});

app.put('/patients/:patientId/history', async (req, res, next) => {
    let patient = await PatientController.addPatientHistory(req.params.patientId, req.body).catch(e => next(e))
    res.render('show', {patient: patient, title: config.title});
});


// handle 404 errors
app.use(function(req, res){
    res.status(404).render('notFound');
});

app.use(function(err, req, res, next) {
	console.log(err);
    res.status(500).render('error', { error: err});
});

const port = parseInt(process.env.PORT || '8001', 10);
app.listen(port, function() {
    console.log('App listening on port: ' + 8001);
});
