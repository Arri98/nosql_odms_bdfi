// Cargamos los modelos para usarlos posteriormente
const Patient = require('../models/patient');

/**
 * Busca en la base de datos todos los pacientes existentes en la coleccion "Paciente"
 * @return object pacients
 */
exports.list = async function() {
    let result = await Patients.find();
    console.log(result);
    return result;
}

/**
 * Busca en la colección "Paciente" el paciente cuyo id corresponde con el de patientId
 * @param patientId - Id del paciente a buscar
 * @return Un objeto con todos los atributos del paciente
 */
exports.read = async function(patientId) {
    let result = await Patient.find(_id: patientId);
    console.log(result);
    return result;
}

/**
 * Crea un nuevo paciente en la colleción "Paciente" de Mongo
 * @param body - Objeto que contiene los datos rellenados a través de la web
 * @return El nuevo objeto paciente creado
 */
exports.create = async function(body) {
    let result = await body.save();
    console.log(result);
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
}

/**
 * Elimina un paciente de la base dadtos
 * @param patientId - Id del paciente a eliminar
 * @return El resultado de la operacion de borrado
 */
exports.delete = async function(patientId) {
    // Rellene aqui ...
}

/**
 * Obtiene todos los pacientes de la base de datos de Mongo en base a su ciudad de origen
 * @param patientId - Id del paciente a buscar
 * @return Un objeto con todos los atributos del paciente
 */
exports.filterPatientsByCity = async function (city) {
    // Rellene aqui ...
}

/**
 * Obtiene todos los pacientes de la base de datos de Mongo en base a sus diagnosticos
 * @param diagnosis - String que representa el diagnostico de un paciente
 * @return Un array de objetos de pacientes
 */
exports.filterPatientsByDiagnosis = async function (diagnosis) {
    // Rellene aqui ...
}

/**
 * Obtiene todos los pacientes de la base de datos de Mongo en base al especialista y que la consulta se hiciese dentro de un rango de fechas
 * @param specialist - String con el especialista medico
 * @param sdate - Fecha de inicio de la busqueda de consultas (Ej: 2016-03-24)
 * @param fdate - Fecha de final de la busqueda de consultas (Ej: 2019-08-14)
 * @return Un array de objetos de pacientes
 */
exports.filterPatientsBySpeacialistAndDate = async function (specialist, sDate,fDate) {
    // Rellene aqui ...
}

/**
 * Añade un nueva consulta al historial medico del paciente representado por patientId
 * @param patientId - Id del paciente al que se le añade una nueva consulta al historial
 * @param medicalRecord - Objeto con los datos de la consulta
 * @return El objeto paciente con los datos actualizados incluido la nueva consulta
 */
exports.addPatientHistory = async function (patientId, medicalRecord) {
    // Rellene aqui ...
}