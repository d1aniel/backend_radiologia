"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pacient_1 = require("./Pacient");
const Studie_1 = require("./Studie");
const Image_1 = require("./Image");
const Label_1 = require("./Label");
const StudieLabel_1 = require("./StudieLabel");
const Doctor_1 = require("./Doctor");
const Technologist_1 = require("./Technologist");
const Team_1 = require("./Team");
const Modalitie_1 = require("./Modalitie");
const Quote_1 = require("./Quote");
const Report_1 = require("./Report");
const Payment_1 = require("./Payment");
const User_1 = require("./authorization/User");
const RefreshToken_1 = require("./authorization/RefreshToken");
const Role_1 = require("./authorization/Role");
const RoleUser_1 = require("./authorization/RoleUser");
const Resource_1 = require("./authorization/Resource");
const ResourceRole_1 = require("./authorization/ResourceRole");
/* === relaciones ya existentes === */
// Paciente -> Estudios
Pacient_1.Patient.hasMany(Studie_1.Study, {
    foreignKey: "patient_id",
    sourceKey: "id",
});
Studie_1.Study.belongsTo(Pacient_1.Patient, {
    foreignKey: "patient_id",
    targetKey: "id",
});
// Estudio -> Imágenes
Studie_1.Study.hasMany(Image_1.Image, {
    sourceKey: "id",
    foreignKey: "estudioId",
    as: "imagenes",
});
Image_1.Image.belongsTo(Studie_1.Study, {
    targetKey: "id",
    foreignKey: "estudioId",
    as: "estudio",
});
// Estudios <-> Labels (muchos a muchos)
Studie_1.Study.belongsToMany(Label_1.Label, {
    through: StudieLabel_1.StudyLabel,
    foreignKey: "study_id",
    otherKey: "label_id",
    as: "labels",
});
Label_1.Label.belongsToMany(Studie_1.Study, {
    through: StudieLabel_1.StudyLabel,
    foreignKey: "label_id",
    otherKey: "study_id",
    as: "studies",
});
// Doctor -> Estudios
Doctor_1.Doctor.hasMany(Studie_1.Study, {
    foreignKey: "medico_id",
    sourceKey: "id",
});
Studie_1.Study.belongsTo(Doctor_1.Doctor, {
    foreignKey: "medico_id",
    targetKey: "id",
    as: "doctor",
});
// Doctor -> Reportes
Doctor_1.Doctor.hasMany(Report_1.Report, {
    foreignKey: "medico_id",
    sourceKey: "id",
});
Report_1.Report.belongsTo(Doctor_1.Doctor, {
    foreignKey: "medico_id",
    targetKey: "id",
    as: "firmante",
});
// Technologist -> Estudios
Technologist_1.Technologist.hasMany(Studie_1.Study, {
    foreignKey: "technologist_id",
    sourceKey: "id",
});
Studie_1.Study.belongsTo(Technologist_1.Technologist, {
    foreignKey: "technologist_id",
    targetKey: "id",
    as: "technologist_user",
});
// Modalidad -> Estudios
Modalitie_1.Modalidad.hasMany(Studie_1.Study, {
    foreignKey: "modality_id",
    sourceKey: "id",
});
Studie_1.Study.belongsTo(Modalitie_1.Modalidad, {
    foreignKey: "modality_id",
    targetKey: "id",
    as: "modalidad_obj",
});
// Team -> Estudios
Team_1.Team.hasMany(Studie_1.Study, {
    foreignKey: "team_id",
    sourceKey: "id",
});
Studie_1.Study.belongsTo(Team_1.Team, {
    foreignKey: "team_id",
    targetKey: "id",
    as: "team_obj",
});
// Modalidad -> Team
Modalitie_1.Modalidad.hasMany(Team_1.Team, {
    foreignKey: "modality_id",
    sourceKey: "id",
});
Team_1.Team.belongsTo(Modalitie_1.Modalidad, {
    foreignKey: "modality_id",
    targetKey: "id",
    as: "modalidad_obj",
});
// Quote -> Estudios
Quote_1.Quote.hasMany(Studie_1.Study, {
    foreignKey: "quote_id",
    sourceKey: "id",
});
Studie_1.Study.belongsTo(Quote_1.Quote, {
    foreignKey: "quote_id",
    targetKey: "id",
    as: "cita_obj",
});
// Patient -> Quote
Pacient_1.Patient.hasMany(Quote_1.Quote, {
    foreignKey: "patient_id",
    sourceKey: "id",
});
Quote_1.Quote.belongsTo(Pacient_1.Patient, {
    foreignKey: "patient_id",
    targetKey: "id",
    as: "paciente_obj",
});
// Payments -> Patient
Pacient_1.Patient.hasMany(Payment_1.Payment, {
    foreignKey: "patient_id",
    sourceKey: "id",
});
Payment_1.Payment.belongsTo(Pacient_1.Patient, {
    foreignKey: "patient_id",
    targetKey: "id",
});
// Payments -> Quote
Quote_1.Quote.hasMany(Payment_1.Payment, {
    foreignKey: "quote_id",
    sourceKey: "id",
});
Payment_1.Payment.belongsTo(Quote_1.Quote, {
    foreignKey: "quote_id",
    targetKey: "id",
});
/* === módulo de autorización === */
User_1.User.hasMany(RefreshToken_1.RefreshToken, {
    foreignKey: "user_id",
    sourceKey: "id",
});
RefreshToken_1.RefreshToken.belongsTo(User_1.User, {
    foreignKey: "user_id",
    targetKey: "id",
});
User_1.User.hasMany(RoleUser_1.RoleUser, {
    foreignKey: "user_id",
    sourceKey: "id",
});
RoleUser_1.RoleUser.belongsTo(User_1.User, {
    foreignKey: "user_id",
    targetKey: "id",
});
Role_1.Role.hasMany(RoleUser_1.RoleUser, {
    foreignKey: "role_id",
    sourceKey: "id",
});
RoleUser_1.RoleUser.belongsTo(Role_1.Role, {
    foreignKey: "role_id",
    targetKey: "id",
});
Resource_1.Resource.hasMany(ResourceRole_1.ResourceRole, {
    foreignKey: "resource_id",
    sourceKey: "id",
});
ResourceRole_1.ResourceRole.belongsTo(Resource_1.Resource, {
    foreignKey: "resource_id",
    targetKey: "id",
});
Role_1.Role.hasMany(ResourceRole_1.ResourceRole, {
    foreignKey: "role_id",
    sourceKey: "id",
});
ResourceRole_1.ResourceRole.belongsTo(Role_1.Role, {
    foreignKey: "role_id",
    targetKey: "id",
});
/* === asociaciones N:N === */
// Doctor <-> Modalidad
Doctor_1.Doctor.belongsToMany(Modalitie_1.Modalidad, {
    through: "doctor_modalidades",
    foreignKey: "doctor_id",
    otherKey: "modality_id",
    as: "modalidades",
});
Modalitie_1.Modalidad.belongsToMany(Doctor_1.Doctor, {
    through: "doctor_modalidades",
    foreignKey: "modality_id",
    otherKey: "doctor_id",
    as: "doctores",
});
// Technologist <-> Team
Technologist_1.Technologist.belongsToMany(Team_1.Team, {
    through: "technologist_teams",
    foreignKey: "technologist_id",
    otherKey: "team_id",
    as: "teams",
});
Team_1.Team.belongsToMany(Technologist_1.Technologist, {
    through: "technologist_teams",
    foreignKey: "team_id",
    otherKey: "technologist_id",
    as: "technologists",
});
//# sourceMappingURL=associations.js.map