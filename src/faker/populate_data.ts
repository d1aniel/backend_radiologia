import { faker } from "@faker-js/faker/locale/es";
import { Transaction } from "sequelize";
import sequelize from "../database/connection";
import { Patient } from "../models/Pacient";
import { Doctor } from "../models/Doctor";
import { Technologist } from "../models/Technologist";
import { Modalidad } from "../models/Modalitie";
import { Team } from "../models/Team";
import { Quote } from "../models/Quote";
import { Study, Prioridad } from "../models/Studie";
import { Payment, MetodoPago, EstadoPago } from "../models/Payment";
import { Report, InformeEstado } from "../models/Report";
import { Label } from "../models/Label";
import { StudyLabel } from "../models/StudieLabel";
import { Image, TipoImagen } from "../models/Image";
import "../models/associations";

faker.seed(13);

const DOCUMENT_TYPES = ["CC", "TI", "PAS", "CE"] as const;
const PATIENT_STATUS = ["ACTIVATE", "INACTIVE"] as const;
const TECH_STATUS = ["ACTIVE", "INACTIVE"] as const;
const QUOTE_STATUS = ["PENDIENTE", "CONFIRMADA", "ATENDIDA", "CANCELADA"] as const;
const STUDY_STATUS = ["ACTIVE", "INACTIVE"] as const;
const PAYMENT_METHODS: MetodoPago[] = ["EFECTIVO", "TARJETA", "TRANSFERENCIA", "OTRO"];
const PAYMENT_STATUS: EstadoPago[] = ["PAID", "PENDING", "VOID"];
const REPORT_STATUS: InformeEstado[] = ["BORRADOR", "FIRMADO"];
const IMAGE_TYPES: TipoImagen[] = ["DICOM", "JPG", "PNG", "Serie"];
const TEAM_STATUS = ["DISPONIBLE", "MANTENIMIENTO", "OCUPADO"] as const;

type ModalityPreset = {
  nombre: string;
  descripcion: string;
};

const MODALITY_PRESETS: ModalityPreset[] = [
  {
    nombre: "Radiografía",
    descripcion:
      "Estudios de rayos X para diagnóstico general de extremidades, tórax y abdomen.",
  },
  {
    nombre: "Tomografía Computarizada",
    descripcion:
      "Exploraciones TAC multislice para estudios de cráneo, tórax y abdomen.",
  },
  {
    nombre: "Resonancia Magnética",
    descripcion:
      "Resonancias de alto campo para neurología, músculo-esquelético y cuerpo entero.",
  },
  {
    nombre: "Ultrasonido",
    descripcion:
      "Ecografías doppler, obstétricas y de partes blandas con equipos de última generación.",
  },
];

function randomMobile(): string {
  return `3${faker.string.numeric({ length: 9 })}`;
}

function randomInternationalMobile(): string {
  return `+57 ${randomMobile()}`;
}

function buildEmail(nombre: string, apellido: string, suffix: number) {
  const slug = faker.helpers
    .slugify(`${nombre}.${apellido}`)
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
  return `${slug}${suffix}@example.com`;
}

function randomPrioridad(): Prioridad {
  return faker.helpers.arrayElement<Prioridad>(["BAJA", "MEDIA", "ALTA", "URGENTE"]);
}

async function createPatients(transaction: Transaction) {
  const patients: Patient[] = [];
  for (let i = 0; i < 40; i++) {
    const nombre = faker.person.firstName();
    const apellido = faker.person.lastName();
    const patient = await Patient.create(
      {
        nombre,
        apellido,
        tpdocumento: faker.helpers.arrayElement(DOCUMENT_TYPES),
        sexo: faker.helpers.arrayElement(["M", "F", "O"]),
        documento: 10000000 + i,
        telefono: randomMobile(),
        eps: faker.company.name(),
        correo: buildEmail(nombre, apellido, i),
        status: faker.helpers.arrayElement(PATIENT_STATUS),
      },
      { transaction }
    );
    patients.push(patient);
  }
  return patients;
}

async function createDoctors(transaction: Transaction) {
  const especialidades = [
    "Radiología",
    "Neurorradiología",
    "Radiología Intervencionista",
    "Medicina Nuclear",
  ];

  const doctors: Doctor[] = [];
  for (let i = 0; i < 12; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const nombre = `${firstName} ${lastName}`;
    const doctor = await Doctor.create(
      {
        nombre,
        especialidad: faker.helpers.arrayElement(especialidades),
        telefono: randomInternationalMobile(),
        correo: buildEmail(firstName, lastName, i),
        registro: faker.datatype.boolean()
          ? faker.string.alphanumeric({ length: 8 }).toUpperCase()
          : null,
        status: faker.helpers.arrayElement(PATIENT_STATUS),
      },
      { transaction }
    );
    doctors.push(doctor);
  }
  return doctors;
}

async function createTechnologists(transaction: Transaction) {
  const tecnologists: Technologist[] = [];
  for (let i = 0; i < 15; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const nombre = `${firstName} ${lastName}`;
    const mobile = randomMobile();
    const technologist = await Technologist.create(
      {
        nombre,
        especialidad: faker.helpers.arrayElement(["RX", "TAC", "RM"]),
        telefono: Number(mobile),
        correo: buildEmail(firstName, lastName, i),
        status: faker.helpers.arrayElement(TECH_STATUS),
      },
      { transaction }
    );
    tecnologists.push(technologist);
  }
  return tecnologists;
}

async function createModalities(transaction: Transaction) {
  const modalidades: Modalidad[] = [];
  for (const preset of MODALITY_PRESETS) {
    const record = await Modalidad.create(
      {
        nombre: preset.nombre,
        descripcion: preset.descripcion,
        activa: faker.datatype.boolean({ probability: 0.9 }),
      },
      { transaction }
    );
    modalidades.push(record);
  }
  return modalidades;
}

async function createTeams(modalidades: Modalidad[], transaction: Transaction) {
  const equipos: Team[] = [];
  for (let i = 0; i < 12; i++) {
    const modalidad = faker.helpers.arrayElement(modalidades);
    const nombreEquipo = `${modalidad.nombre.substring(0, 2).toUpperCase()}-${faker.string.numeric({
      length: 2,
    })}${i}`;
    const observaciones = faker.datatype.boolean()
      ? faker.lorem.sentence({ min: 5, max: 12 })
      : undefined;

    const equipo = await Team.create(
      {
        nombre: nombreEquipo,
        modalidad: modalidad.nombre,
        ubicacion: `Sala ${faker.location.buildingNumber()} - Piso ${faker.number.int({
          min: 1,
          max: 4,
        })}`,
        estado: faker.helpers.arrayElement(TEAM_STATUS),
        ...(observaciones ? { observaciones } : {}),
        modality_id: modalidad.id,
      } as any,
      { transaction }
    );
    equipos.push(equipo);
  }
  return equipos;
}

async function linkTechnologistsToTeams(
  technologists: Technologist[],
  teams: Team[],
  transaction: Transaction
) {
  if (teams.length === 0) return;

  for (const technologist of technologists) {
    const maxAssignable = Math.min(3, teams.length);
    const assignCount = faker.number.int({ min: 1, max: maxAssignable });
    const selectedTeams = faker.helpers.arrayElements(teams, assignCount);
    await (technologist as any).addTeams(selectedTeams, { transaction });
  }
}

async function createQuotes(
  patients: Patient[],
  technologists: Technologist[],
  transaction: Transaction
) {
  const quotes: Quote[] = [];
  for (let i = 0; i < 35; i++) {
    const patient = faker.helpers.arrayElement(patients);
    const technologist = faker.helpers.arrayElement(technologists);
    const modalityPreset = faker.helpers.arrayElement(MODALITY_PRESETS);
    const quote = await Quote.create(
      {
        paciente: `${patient.nombre} ${patient.apellido}`,
        modalidad: modalityPreset.nombre,
        equipo: `Sala ${faker.location.buildingNumber()}`,
        tecnologo: technologist.nombre,
        fechaHora: faker.date.soon({ days: 30 }).toISOString(),
        motivo: faker.lorem.sentence({ min: 8, max: 18 }),
        estado: faker.helpers.arrayElement(QUOTE_STATUS),
        patient_id: patient.id,
      } as any,
      { transaction }
    );
    quotes.push(quote);
  }
  return quotes;
}

async function createLabels(transaction: Transaction) {
  const etiquetasBase = [
    "Urgente",
    "Requiere contraste",
    "Segunda opinión",
    "Seguimiento",
    "Informe pendiente",
    "Patología sospechada",
  ];

  const labels: Label[] = [];
  for (let i = 0; i < etiquetasBase.length; i++) {
    const label = await Label.create(
      {
        nombre: `${etiquetasBase[i]} ${i + 1}`,
        descripcion: faker.lorem.sentence({ min: 6, max: 12 }),
        status: faker.helpers.arrayElement(PATIENT_STATUS),
      },
      { transaction }
    );
    labels.push(label);
  }
  return labels;
}

async function createStudies(
  patients: Patient[],
  doctors: Doctor[],
  technologists: Technologist[],
  teams: Team[],
  quotes: Quote[],
  transaction: Transaction
) {
  const studies: Study[] = [];
  for (let i = 0; i < 60; i++) {
    const patient = faker.helpers.arrayElement(patients);
    const doctor = faker.helpers.arrayElement(doctors);
    const technologist = faker.helpers.arrayElement(technologists);
    const team = faker.helpers.arrayElement(teams);
    const modalidad = team.modalidad ?? faker.helpers.arrayElement(MODALITY_PRESETS).nombre;
    const modalityId = (team as any).getDataValue("modality_id") ?? null;
    const patientQuotes = quotes.filter(
      (q) => (q as any).getDataValue("patient_id") === patient.id
    );
    const relatedQuote =
      patientQuotes.length > 0
        ? faker.helpers.arrayElement(patientQuotes)
        : quotes.length > 0
        ? faker.helpers.arrayElement(quotes)
        : null;
    const studyDate =
      relatedQuote?.fechaHora != null
        ? new Date(relatedQuote.fechaHora)
        : faker.date.recent({ days: 120 });

    const study = await Study.create(
      {
        patient_id: patient.id,
        modalidad,
        equipo: team.nombre ?? modalidad,
        tecnologo: technologist.nombre,
        medico: doctor.nombre,
        fechaHora: studyDate,
        prioridad: randomPrioridad(),
        motivo: relatedQuote?.motivo ?? faker.lorem.sentence({ min: 10, max: 22 }),
        status: faker.helpers.arrayElement(STUDY_STATUS),
        team_id: team.id,
        quote_id: relatedQuote ? relatedQuote.id : null,
        modality_id: modalityId,
        technologist_id: technologist.id,
        medico_id: doctor.id,
      } as any,
      { transaction }
    );
    studies.push(study);
  }
  return studies;
}

async function createImages(studies: Study[], transaction: Transaction) {
  for (const study of studies) {
    const imageCount = faker.number.int({ min: 1, max: 4 });
    for (let idx = 0; idx < imageCount; idx++) {
      await Image.create(
        {
          estudioId: study.id,
          tipo: faker.helpers.arrayElement(IMAGE_TYPES),
          url: faker.internet.url(),
          nombreArchivo: `${faker.string.uuid()}.${faker.helpers.arrayElement(["dcm", "zip", "jpg"])}`,
          tamanoBytes: faker.number.int({ min: 5_000_000, max: 60_000_000 }),
          serie: faker.datatype.boolean({ probability: 0.4 }) ? faker.string.alphanumeric(6) : null,
          orden: idx + 1,
          fechaCarga: faker.date.past({ years: 1 }),
        },
        { transaction }
      );
    }
  }
}

async function createStudyLabels(
  studies: Study[],
  labels: Label[],
  transaction: Transaction
) {
  for (const study of studies) {
    const selectedLabels = faker.helpers.arrayElements(labels, { min: 1, max: 3 });
    for (const label of selectedLabels) {
      await StudyLabel.create(
        {
          study_id: study.id!,
          label_id: label.id!,
        },
        { transaction }
      );
    }
  }
}

async function createReports(studies: Study[], doctors: Doctor[], transaction: Transaction) {
  for (const study of studies) {
    if (faker.datatype.boolean({ probability: 0.6 })) {
      const doctor = faker.helpers.arrayElement(doctors);
      await Report.create(
        {
          estudioId: study.id!,
          estado: faker.helpers.arrayElement(REPORT_STATUS),
          cuerpo: faker.lorem.paragraphs({ min: 2, max: 5 }),
          medicoId: doctor.id!,
          doctor_id: doctor.id!,
          fechaCreacion: faker.date.between({
            from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
            to: new Date(),
          }),
        } as any,
        { transaction }
      );
    }
  }
}

async function createPayments(
  patients: Patient[],
  studies: Study[],
  quotes: Quote[],
  transaction: Transaction
) {
  for (let i = 0; i < 50; i++) {
    const patient = faker.helpers.arrayElement(patients);
    const maybeStudy = faker.datatype.boolean({ probability: 0.75 })
      ? faker.helpers.arrayElement(studies)
      : null;
    const patientQuotes = quotes.filter(
      (q) => (q as any).getDataValue("patient_id") === patient.id
    );
    const quote =
      patientQuotes.length > 0
        ? faker.helpers.arrayElement(patientQuotes)
        : quotes.length > 0
        ? faker.helpers.arrayElement(quotes)
        : null;

    await Payment.create(
      {
        pacienteId: patient.id!,
        estudioId: maybeStudy?.id ?? null,
        monto: Number(faker.finance.amount({ min: 80_000, max: 1_200_000, dec: 2 })),
        metodo: faker.helpers.arrayElement(PAYMENT_METHODS),
        fecha: faker.date.past({ years: 1 }).toISOString().slice(0, 10),
        estado: faker.helpers.arrayElement(PAYMENT_STATUS),
        patient_id: patient.id!,
        quote_id: quote ? quote.id : null,
      } as any,
      { transaction }
    );
  }
}

async function createFakeData() {
  console.log("🩻 Iniciando generación de datos falsos...");
  await sequelize.authenticate();

  const transaction = await sequelize.transaction();

  try {
    const patients = await createPatients(transaction);
    const doctors = await createDoctors(transaction);
    const technologists = await createTechnologists(transaction);
    const modalities = await createModalities(transaction);
    const teams = await createTeams(modalities, transaction);
    await linkTechnologistsToTeams(technologists, teams, transaction);
    const quotes = await createQuotes(patients, technologists, transaction);
    const labels = await createLabels(transaction);
    const studies = await createStudies(
      patients,
      doctors,
      technologists,
      teams,
      quotes,
      transaction
    );

    await Promise.all([
      createImages(studies, transaction),
      createStudyLabels(studies, labels, transaction),
      createReports(studies, doctors, transaction),
    ]);

    await createPayments(patients, studies, quotes, transaction);

    await transaction.commit();
    console.log("✅ Datos falsos creados exitosamente.");
  } catch (error) {
    await transaction.rollback();
    console.error("❌ Error al crear datos falsos:", error);
  } finally {
    await sequelize.close();
  }
}

createFakeData();
