import { Patient } from "./Pacient";
import { Study } from "./Studie";
import { Image } from "./Image";
import { Label } from "./Label";
import { StudyLabel } from "./StudieLabel";

import { Doctor } from "./Doctor";
import { Technologist } from "./Technologist";
import { Team } from "./Team";
import { Modalidad } from "./Modalitie";
import { Quote } from "./Quote";
import { Report } from "./Report";
import { Payment } from "./Payment";
import { User } from "./authorization/User";
import { RefreshToken } from "./authorization/RefreshToken";
import { Role } from "./authorization/Role";
import { RoleUser } from "./authorization/RoleUser";
import { Resource } from "./authorization/Resource";
import { ResourceRole } from "./authorization/ResourceRole";

/* === relaciones ya existentes === */
// Paciente -> Estudios
Patient.hasMany(Study, {
  foreignKey: "patient_id",
  sourceKey: "id",
});
Study.belongsTo(Patient, {
  foreignKey: "patient_id",
  targetKey: "id",
  as: "patient",
});

// Estudio -> Imágenes
Study.hasMany(Image, {
  sourceKey: "id",
  foreignKey: "estudioId",
  as: "imagenes",
});
Image.belongsTo(Study, {
  targetKey: "id",
  foreignKey: "estudioId",
  as: "estudio",
});

// Estudios <-> Labels (muchos a muchos)
Study.belongsToMany(Label, {
  through: StudyLabel,
  foreignKey: "study_id",
  otherKey: "label_id",
  as: "labels",
});
Label.belongsToMany(Study, {
  through: StudyLabel,
  foreignKey: "label_id",
  otherKey: "study_id",
  as: "studies",
});

// Doctor -> Estudios
Doctor.hasMany(Study, {
  foreignKey: "medico_id",
  sourceKey: "id",
});
Study.belongsTo(Doctor, {
  foreignKey: "medico_id",
  targetKey: "id",
  as: "doctor",
});

// Doctor -> Reportes
Doctor.hasMany(Report, {
  foreignKey: "medico_id",
  sourceKey: "id",
});
Report.belongsTo(Doctor, {
  foreignKey: "medico_id",
  targetKey: "id",
  as: "firmante",
});

// Technologist -> Estudios
Technologist.hasMany(Study, {
  foreignKey: "technologist_id",
  sourceKey: "id",
});
Study.belongsTo(Technologist, {
  foreignKey: "technologist_id",
  targetKey: "id",
  as: "technologist_user",
});

// Modalidad -> Estudios
Modalidad.hasMany(Study, {
  foreignKey: "modality_id",
  sourceKey: "id",
});
Study.belongsTo(Modalidad, {
  foreignKey: "modality_id",
  targetKey: "id",
  as: "modalidad_obj",
});

// Team -> Estudios
Team.hasMany(Study, {
  foreignKey: "team_id",
  sourceKey: "id",
});
Study.belongsTo(Team, {
  foreignKey: "team_id",
  targetKey: "id",
  as: "team_obj",
});

// Modalidad -> Team
Modalidad.hasMany(Team, {
  foreignKey: "modality_id",
  sourceKey: "id",
});
Team.belongsTo(Modalidad, {
  foreignKey: "modality_id",
  targetKey: "id",
  as: "modalidad_obj",
});

// Quote -> Estudios
Quote.hasMany(Study, {
  foreignKey: "quote_id",
  sourceKey: "id",
});
Study.belongsTo(Quote, {
  foreignKey: "quote_id",
  targetKey: "id",
  as: "cita_obj",
});

// Patient -> Quote
Patient.hasMany(Quote, {
  foreignKey: "patient_id",
  sourceKey: "id",
});
Quote.belongsTo(Patient, {
  foreignKey: "patient_id",
  targetKey: "id",
  as: "paciente_obj",
});

// Payments -> Patient
Patient.hasMany(Payment, {
  foreignKey: "patient_id",
  sourceKey: "id",
});
Payment.belongsTo(Patient, {
  foreignKey: "patient_id",
  targetKey: "id",
});

// Payments -> Quote
Quote.hasMany(Payment, {
  foreignKey: "quote_id",
  sourceKey: "id",
});
Payment.belongsTo(Quote, {
  foreignKey: "quote_id",
  targetKey: "id",
});

/* === módulo de autorización === */

User.hasMany(RefreshToken, {
  foreignKey: "user_id",
  sourceKey: "id",
});
RefreshToken.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
});

User.hasMany(RoleUser, {
  foreignKey: "user_id",
  sourceKey: "id",
});
RoleUser.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
});

Role.hasMany(RoleUser, {
  foreignKey: "role_id",
  sourceKey: "id",
});
RoleUser.belongsTo(Role, {
  foreignKey: "role_id",
  targetKey: "id",
});

Resource.hasMany(ResourceRole, {
  foreignKey: "resource_id",
  sourceKey: "id",
});
ResourceRole.belongsTo(Resource, {
  foreignKey: "resource_id",
  targetKey: "id",
});

Role.hasMany(ResourceRole, {
  foreignKey: "role_id",
  sourceKey: "id",
});
ResourceRole.belongsTo(Role, {
  foreignKey: "role_id",
  targetKey: "id",
});

/* === asociaciones N:N === */

// Doctor <-> Modalidad
Doctor.belongsToMany(Modalidad, {
  through: "doctor_modalidades",
  foreignKey: "doctor_id",
  otherKey: "modality_id",
  as: "modalidades",
});
Modalidad.belongsToMany(Doctor, {
  through: "doctor_modalidades",
  foreignKey: "modality_id",
  otherKey: "doctor_id",
  as: "doctores",
});

// Technologist <-> Team
Technologist.belongsToMany(Team, {
  through: "technologist_teams",
  foreignKey: "technologist_id",
  otherKey: "team_id",
  as: "teams",
});
Team.belongsToMany(Technologist, {
  through: "technologist_teams",
  foreignKey: "team_id",
  otherKey: "technologist_id",
  as: "technologists",
});

// Technologist -> Quote
Technologist.hasMany(Quote, {
  foreignKey: "technologist_id",
  sourceKey: "id",
  as: "quotes", 
});

Quote.belongsTo(Technologist, {
  foreignKey: "technologist_id",
  targetKey: "id",
  as: "technologist_obj", 
});

// Study -> Report (1:1)
Study.hasOne(Report, {
  foreignKey: "estudio_id", 
  sourceKey: "id",
  as: "informe",
});

Report.belongsTo(Study, {
  foreignKey: "estudio_id",
  targetKey: "id",
  as: "estudio",
});