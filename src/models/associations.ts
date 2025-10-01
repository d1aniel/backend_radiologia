import { Patient } from "./Pacient";
import { Study } from "./Studie";
import { Image } from "./Image";
import { Label } from "./Label";
import { StudyLabel } from "./StudieLabel";

// Paciente -> Estudios
Patient.hasMany(Study, {
  foreignKey: "patient_id",
  sourceKey: "id",
});

Study.belongsTo(Patient, {
  foreignKey: "patient_id",
  targetKey: "id",
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

// Estudios <-> Labels (relación muchos a muchos)
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
