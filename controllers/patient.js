// Cargamos los modelos para usarlos posteriormente
const Patient = require('../models/patient');

/**
 * Busca en la base de datos todos los pacientes existentes en la coleccion "Paciente"
 * @return object pacients
 */
exports.list = async function() {
    let result = await Patient.find();
    console.log("List: \n" + result);
    return result;
}

/**
 * Busca en la colección "Paciente" el paciente cuyo id corresponde con el de patientId
 * @param patientId - Id del paciente a buscar
 * @return Un objeto con todos los atributos del paciente
 */
exports.read = async function(patientId) {
    let result = await Patient.findById(patientId);
    console.log("Read: \n" +result);
    return result;
}

/**
 * Crea un nuevo paciente en la colleción "Paciente" de Mongo
 * @param body - Objeto que contiene los datos rellenados a través de la web
 * @return El nuevo objeto paciente creado
 */
exports.create = async function(body) {
    // console.log(body);
    var newPatient = new Patient(body);
    // console.log(newPatient);
    let result = await newPatient.save();
    console.log("Create: \n" +result);
    return result;
}

/**
 * Actualiza los datos del paciente en la base datos
 * @param patientId - Id del paciente a actualizar
 * @param body - Objeto que contiene los datos rellenados a través de la web
 * @return El objeto paciente con los datos actualizados
 */
exports.update= async function(patientId, body) {
    let result = await Patient.findOneAndUpdate(
    {_id: patientId}, body, {new: true}
    )
    console.log("Update: \n" +result);
    return result;
}

/**
 * Elimina un paciente de la base dadtos
 * @param patientId - Id del paciente a eliminar
 * @return El resultado de la operacion de borrado
 */
exports.delete = async function(patientId) {
    let result = await Patient.deleteOne({_id: patientId})
    console.log("Delete: \n" +result);
    return result;
}

/**
 * Obtiene todos los pacientes de la base de datos de Mongo en base a su ciudad de origen
 * @param city - String del nombre de la ciudad
 * @return Un objeto con todos los atributos del paciente
 */
exports.filterPatientsByCity = async function (city) {
    let result = await Patient.find({city: city});
    console.log("filterPatientsByCity: \n" +result);
    return result;
}

/**
 * Obtiene todos los pacientes de la base de datos de Mongo en base a sus diagnosticos
 * @param diagnosis - String que representa el diagnostico de un paciente
 * @return Un array de objetos de pacientes
 */
exports.filterPatientsByDiagnosis = async function (diagnosis) {
    let result = await Patient.find({"medicalHistory.diagnosis": { $in: diagnosis } } );
    console.log("filterPatientsByDiagnosis: \n" + result);
    return result;
}

/**
 * Obtiene todos los pacientes de la base de datos de Mongo en base al especialista y que la consulta se hiciese dentro de un rango de fechas
 * @param specialist - String con el especialista medico
 * @param sdate - Fecha de inicio de la busqueda de consultas (Ej: 2016-03-24)
 * @param fdate - Fecha de final de la busqueda de consultas (Ej: 2019-08-14)
 * @return Un array de objetos de pacientes
 */
exports.filterPatientsBySpeacialistAndDate = async function (specialist, sDate,fDate) {
    // Se den convertir de streing a dates
    console.log("typeof \n \n"+ typeof sDate);
    console.log("typeof \n \n"+ typeof fDate);
    console.log("typeof \n \n"+ typeof sDate);
    console.log("typeof \n \n"+ typeof fDate);
    let result = await Patient.find({
        "medicalHistory.specialist": specialist,
        "date":
            {"$gte": new Date(sDate),
            "$lte": new Date(fDate)
            }
        }
     );
    // let result = await Patient.find({ );
    console.log("filterPatientsBySpeacialistAndDate: \n" + result);
    return result;
}

exports.addPatientHistory = async function (patientId, medicalRecord) {
    // var medicalRecordFiltered = medicalRecord;
    //medicalRecord.forEach(elm => delete elm._id)
    // console.log("medicalRecordFiltered: \n" + medicalRecordFiltered );
    let result = await Patient.findOneAndUpdate(
    {_id: patientId},
    {$push: { medicalHistory: medicalRecord}}
    )
    console.log("addPatientHistory: \n" + result);
    return result;
}

/**
 * Añade un nueva consulta al historial medico del paciente representado por patientId
 * @param patientId - Id del paciente al que se le añade una nueva consulta al historial
 * @param medicalRecord - Objeto con los datos de la consulta
 * @return El objeto paciente con los datos actualizados incluido la nueva consulta
 */