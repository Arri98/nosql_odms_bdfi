// Cargamos los modelos para usarlos posteriormente
const Patient = require('../models/patient');

exports.list = async function() {
    return await Patient.find();
}

exports.read = async function(patientId) {
    return await Patient.findOne({_id: patientId});
}

exports.create = async function(body) {
    return await Patient.create(body);
}

exports.update= async function(patientId, body) {
     return await Patient.findOneAndUpdate({_id: patientId},body,{ new: true });
}

exports.delete = async function(patientId) {
   return await Patient.findOneAndRemove({_id: patientId});
}

exports.filterPatientsByCity = async function (city) {
    return await Patient.find({city: city});
}

exports.filterPatientsByDiagnosis = async function (diagnosis) {
    return await Patient.find({'medicalHistory.diagnosis':diagnosis});
}

exports.filterPatientsBySpeacialistAndDate = async function (specialist, sDate,fDate) {
    //Patient.findOne({'medicalHistory':{$and:[{specialist: specialist} ,{date:{$and:[{$gt:sDate},{$lt:fDate}]}}]}});
    let a = await Patient.findOne()
    return [a];
}

exports.addPatientHistory = async function (patientId, medicalRecord) {
    return await Patient.findOneAndUpdate({_id: patientId}, {$push: {medicalHistory:medicalRecord}}, {new:true}).exec();
}
