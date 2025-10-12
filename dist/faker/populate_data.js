"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const es_1 = require("@faker-js/faker/locale/es");
const connection_1 = __importDefault(require("../database/connection"));
const Pacient_1 = require("../models/Pacient");
const Doctor_1 = require("../models/Doctor");
const Technologist_1 = require("../models/Technologist");
const Modalitie_1 = require("../models/Modalitie");
const Team_1 = require("../models/Team");
const Quote_1 = require("../models/Quote");
const Studie_1 = require("../models/Studie");
const Payment_1 = require("../models/Payment");
const Report_1 = require("../models/Report");
const Label_1 = require("../models/Label");
const StudieLabel_1 = require("../models/StudieLabel");
const Image_1 = require("../models/Image");
require("../models/associations");
es_1.faker.seed(13);
const DOCUMENT_TYPES = ["CC", "TI", "PAS", "CE"];
const PATIENT_STATUS = ["ACTIVATE", "INACTIVE"];
const TECH_STATUS = ["ACTIVE", "INACTIVE"];
const QUOTE_STATUS = ["PENDIENTE", "CONFIRMADA", "ATENDIDA", "CANCELADA"];
const STUDY_STATUS = ["ACTIVE", "INACTIVE"];
const PAYMENT_METHODS = ["EFECTIVO", "TARJETA", "TRANSFERENCIA", "OTRO"];
const PAYMENT_STATUS = ["PAID", "PENDING", "VOID"];
const REPORT_STATUS = ["BORRADOR", "FIRMADO"];
const IMAGE_TYPES = ["DICOM", "JPG", "PNG", "Serie"];
const TEAM_STATUS = ["DISPONIBLE", "MANTENIMIENTO", "OCUPADO"];
const MODALITY_PRESETS = [
    {
        nombre: "Radiografía",
        descripcion: "Estudios de rayos X para diagnóstico general de extremidades, tórax y abdomen.",
    },
    {
        nombre: "Tomografía Computarizada",
        descripcion: "Exploraciones TAC multislice para estudios de cráneo, tórax y abdomen.",
    },
    {
        nombre: "Resonancia Magnética",
        descripcion: "Resonancias de alto campo para neurología, músculo-esquelético y cuerpo entero.",
    },
    {
        nombre: "Ultrasonido",
        descripcion: "Ecografías doppler, obstétricas y de partes blandas con equipos de última generación.",
    },
];
function randomMobile() {
    return `3${es_1.faker.string.numeric({ length: 9 })}`;
}
function randomInternationalMobile() {
    return `+57 ${randomMobile()}`;
}
function buildEmail(nombre, apellido, suffix) {
    const slug = es_1.faker.helpers
        .slugify(`${nombre}.${apellido}`)
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
    return `${slug}${suffix}@example.com`;
}
function randomPrioridad() {
    return es_1.faker.helpers.arrayElement(["BAJA", "MEDIA", "ALTA", "URGENTE"]);
}
function createPatients(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const patients = [];
        for (let i = 0; i < 40; i++) {
            const nombre = es_1.faker.person.firstName();
            const apellido = es_1.faker.person.lastName();
            const patient = yield Pacient_1.Patient.create({
                nombre,
                apellido,
                tpdocumento: es_1.faker.helpers.arrayElement(DOCUMENT_TYPES),
                sexo: es_1.faker.helpers.arrayElement(["M", "F", "O"]),
                documento: 10000000 + i,
                telefono: randomMobile(),
                eps: es_1.faker.company.name(),
                correo: buildEmail(nombre, apellido, i),
                status: es_1.faker.helpers.arrayElement(PATIENT_STATUS),
            }, { transaction });
            patients.push(patient);
        }
        return patients;
    });
}
function createDoctors(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const especialidades = [
            "Radiología",
            "Neurorradiología",
            "Radiología Intervencionista",
            "Medicina Nuclear",
        ];
        const doctors = [];
        for (let i = 0; i < 12; i++) {
            const firstName = es_1.faker.person.firstName();
            const lastName = es_1.faker.person.lastName();
            const nombre = `${firstName} ${lastName}`;
            const doctor = yield Doctor_1.Doctor.create({
                nombre,
                especialidad: es_1.faker.helpers.arrayElement(especialidades),
                telefono: randomInternationalMobile(),
                correo: buildEmail(firstName, lastName, i),
                registro: es_1.faker.datatype.boolean()
                    ? es_1.faker.string.alphanumeric({ length: 8 }).toUpperCase()
                    : null,
                status: es_1.faker.helpers.arrayElement(PATIENT_STATUS),
            }, { transaction });
            doctors.push(doctor);
        }
        return doctors;
    });
}
function createTechnologists(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const tecnologists = [];
        for (let i = 0; i < 15; i++) {
            const firstName = es_1.faker.person.firstName();
            const lastName = es_1.faker.person.lastName();
            const nombre = `${firstName} ${lastName}`;
            const mobile = randomMobile();
            const technologist = yield Technologist_1.Technologist.create({
                nombre,
                especialidad: es_1.faker.helpers.arrayElement(["RX", "TAC", "RM"]),
                telefono: Number(mobile),
                correo: buildEmail(firstName, lastName, i),
                status: es_1.faker.helpers.arrayElement(TECH_STATUS),
            }, { transaction });
            tecnologists.push(technologist);
        }
        return tecnologists;
    });
}
function createModalities(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const modalidades = [];
        for (const preset of MODALITY_PRESETS) {
            const record = yield Modalitie_1.Modalidad.create({
                nombre: preset.nombre,
                descripcion: preset.descripcion,
                activa: es_1.faker.datatype.boolean({ probability: 0.9 }),
            }, { transaction });
            modalidades.push(record);
        }
        return modalidades;
    });
}
function createTeams(modalidades, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const equipos = [];
        for (let i = 0; i < 12; i++) {
            const modalidad = es_1.faker.helpers.arrayElement(modalidades);
            const nombreEquipo = `${modalidad.nombre.substring(0, 2).toUpperCase()}-${es_1.faker.string.numeric({
                length: 2,
            })}${i}`;
            const observaciones = es_1.faker.datatype.boolean()
                ? es_1.faker.lorem.sentence({ min: 5, max: 12 })
                : undefined;
            const equipo = yield Team_1.Team.create(Object.assign(Object.assign({ nombre: nombreEquipo, modalidad: modalidad.nombre, ubicacion: `Sala ${es_1.faker.location.buildingNumber()} - Piso ${es_1.faker.number.int({
                    min: 1,
                    max: 4,
                })}`, estado: es_1.faker.helpers.arrayElement(TEAM_STATUS) }, (observaciones ? { observaciones } : {})), { modality_id: modalidad.id }), { transaction });
            equipos.push(equipo);
        }
        return equipos;
    });
}
function linkTechnologistsToTeams(technologists, teams, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        if (teams.length === 0)
            return;
        for (const technologist of technologists) {
            const maxAssignable = Math.min(3, teams.length);
            const assignCount = es_1.faker.number.int({ min: 1, max: maxAssignable });
            const selectedTeams = es_1.faker.helpers.arrayElements(teams, assignCount);
            yield technologist.addTeams(selectedTeams, { transaction });
        }
    });
}
function createQuotes(patients, technologists, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const quotes = [];
        for (let i = 0; i < 35; i++) {
            const patient = es_1.faker.helpers.arrayElement(patients);
            const technologist = es_1.faker.helpers.arrayElement(technologists);
            const modalityPreset = es_1.faker.helpers.arrayElement(MODALITY_PRESETS);
            const quote = yield Quote_1.Quote.create({
                paciente: `${patient.nombre} ${patient.apellido}`,
                modalidad: modalityPreset.nombre,
                equipo: `Sala ${es_1.faker.location.buildingNumber()}`,
                tecnologo: technologist.nombre,
                fechaHora: es_1.faker.date.soon({ days: 30 }).toISOString(),
                motivo: es_1.faker.lorem.sentence({ min: 8, max: 18 }),
                estado: es_1.faker.helpers.arrayElement(QUOTE_STATUS),
                patient_id: patient.id,
            }, { transaction });
            quotes.push(quote);
        }
        return quotes;
    });
}
function createLabels(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const etiquetasBase = [
            "Urgente",
            "Requiere contraste",
            "Segunda opinión",
            "Seguimiento",
            "Informe pendiente",
            "Patología sospechada",
        ];
        const labels = [];
        for (let i = 0; i < etiquetasBase.length; i++) {
            const label = yield Label_1.Label.create({
                nombre: `${etiquetasBase[i]} ${i + 1}`,
                descripcion: es_1.faker.lorem.sentence({ min: 6, max: 12 }),
                status: es_1.faker.helpers.arrayElement(PATIENT_STATUS),
            }, { transaction });
            labels.push(label);
        }
        return labels;
    });
}
function createStudies(patients, doctors, technologists, teams, quotes, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const studies = [];
        for (let i = 0; i < 60; i++) {
            const patient = es_1.faker.helpers.arrayElement(patients);
            const doctor = es_1.faker.helpers.arrayElement(doctors);
            const technologist = es_1.faker.helpers.arrayElement(technologists);
            const team = es_1.faker.helpers.arrayElement(teams);
            const modalidad = (_a = team.modalidad) !== null && _a !== void 0 ? _a : es_1.faker.helpers.arrayElement(MODALITY_PRESETS).nombre;
            const modalityId = (_b = team.getDataValue("modality_id")) !== null && _b !== void 0 ? _b : null;
            const patientQuotes = quotes.filter((q) => q.getDataValue("patient_id") === patient.id);
            const relatedQuote = patientQuotes.length > 0
                ? es_1.faker.helpers.arrayElement(patientQuotes)
                : quotes.length > 0
                    ? es_1.faker.helpers.arrayElement(quotes)
                    : null;
            const studyDate = (relatedQuote === null || relatedQuote === void 0 ? void 0 : relatedQuote.fechaHora) != null
                ? new Date(relatedQuote.fechaHora)
                : es_1.faker.date.recent({ days: 120 });
            const study = yield Studie_1.Study.create({
                patient_id: patient.id,
                modalidad,
                equipo: (_c = team.nombre) !== null && _c !== void 0 ? _c : modalidad,
                tecnologo: technologist.nombre,
                medico: doctor.nombre,
                fechaHora: studyDate,
                prioridad: randomPrioridad(),
                motivo: (_d = relatedQuote === null || relatedQuote === void 0 ? void 0 : relatedQuote.motivo) !== null && _d !== void 0 ? _d : es_1.faker.lorem.sentence({ min: 10, max: 22 }),
                status: es_1.faker.helpers.arrayElement(STUDY_STATUS),
                team_id: team.id,
                quote_id: relatedQuote ? relatedQuote.id : null,
                modality_id: modalityId,
                technologist_id: technologist.id,
                medico_id: doctor.id,
            }, { transaction });
            studies.push(study);
        }
        return studies;
    });
}
function createImages(studies, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const study of studies) {
            const imageCount = es_1.faker.number.int({ min: 1, max: 4 });
            for (let idx = 0; idx < imageCount; idx++) {
                yield Image_1.Image.create({
                    estudioId: study.id,
                    tipo: es_1.faker.helpers.arrayElement(IMAGE_TYPES),
                    url: es_1.faker.internet.url(),
                    nombreArchivo: `${es_1.faker.string.uuid()}.${es_1.faker.helpers.arrayElement(["dcm", "zip", "jpg"])}`,
                    tamanoBytes: es_1.faker.number.int({ min: 5000000, max: 60000000 }),
                    serie: es_1.faker.datatype.boolean({ probability: 0.4 }) ? es_1.faker.string.alphanumeric(6) : null,
                    orden: idx + 1,
                    fechaCarga: es_1.faker.date.past({ years: 1 }),
                }, { transaction });
            }
        }
    });
}
function createStudyLabels(studies, labels, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const study of studies) {
            const selectedLabels = es_1.faker.helpers.arrayElements(labels, { min: 1, max: 3 });
            for (const label of selectedLabels) {
                yield StudieLabel_1.StudyLabel.create({
                    study_id: study.id,
                    label_id: label.id,
                }, { transaction });
            }
        }
    });
}
function createReports(studies, doctors, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const study of studies) {
            if (es_1.faker.datatype.boolean({ probability: 0.6 })) {
                const doctor = es_1.faker.helpers.arrayElement(doctors);
                yield Report_1.Report.create({
                    estudioId: study.id,
                    estado: es_1.faker.helpers.arrayElement(REPORT_STATUS),
                    cuerpo: es_1.faker.lorem.paragraphs({ min: 2, max: 5 }),
                    medicoId: doctor.id,
                    doctor_id: doctor.id,
                    fechaCreacion: es_1.faker.date.between({
                        from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
                        to: new Date(),
                    }),
                }, { transaction });
            }
        }
    });
}
function createPayments(patients, studies, quotes, transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        for (let i = 0; i < 50; i++) {
            const patient = es_1.faker.helpers.arrayElement(patients);
            const maybeStudy = es_1.faker.datatype.boolean({ probability: 0.75 })
                ? es_1.faker.helpers.arrayElement(studies)
                : null;
            const patientQuotes = quotes.filter((q) => q.getDataValue("patient_id") === patient.id);
            const quote = patientQuotes.length > 0
                ? es_1.faker.helpers.arrayElement(patientQuotes)
                : quotes.length > 0
                    ? es_1.faker.helpers.arrayElement(quotes)
                    : null;
            yield Payment_1.Payment.create({
                pacienteId: patient.id,
                estudioId: (_a = maybeStudy === null || maybeStudy === void 0 ? void 0 : maybeStudy.id) !== null && _a !== void 0 ? _a : null,
                monto: Number(es_1.faker.finance.amount({ min: 80000, max: 1200000, dec: 2 })),
                metodo: es_1.faker.helpers.arrayElement(PAYMENT_METHODS),
                fecha: es_1.faker.date.past({ years: 1 }).toISOString().slice(0, 10),
                estado: es_1.faker.helpers.arrayElement(PAYMENT_STATUS),
                patient_id: patient.id,
                quote_id: quote ? quote.id : null,
            }, { transaction });
        }
    });
}
function createFakeData() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🩻 Iniciando generación de datos falsos...");
        yield connection_1.default.authenticate();
        const transaction = yield connection_1.default.transaction();
        try {
            const patients = yield createPatients(transaction);
            const doctors = yield createDoctors(transaction);
            const technologists = yield createTechnologists(transaction);
            const modalities = yield createModalities(transaction);
            const teams = yield createTeams(modalities, transaction);
            yield linkTechnologistsToTeams(technologists, teams, transaction);
            const quotes = yield createQuotes(patients, technologists, transaction);
            const labels = yield createLabels(transaction);
            const studies = yield createStudies(patients, doctors, technologists, teams, quotes, transaction);
            yield Promise.all([
                createImages(studies, transaction),
                createStudyLabels(studies, labels, transaction),
                createReports(studies, doctors, transaction),
            ]);
            yield createPayments(patients, studies, quotes, transaction);
            yield transaction.commit();
            console.log("✅ Datos falsos creados exitosamente.");
        }
        catch (error) {
            yield transaction.rollback();
            console.error("❌ Error al crear datos falsos:", error);
        }
        finally {
            yield connection_1.default.close();
        }
    });
}
createFakeData();
//# sourceMappingURL=populate_data.js.map