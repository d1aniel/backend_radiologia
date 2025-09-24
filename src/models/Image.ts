// src/models/image.ts
import { DataTypes, Model } from "sequelize";
import  sequelize  from "../database/connection";

export type TipoImagen = "DICOM" | "JPG" | "PNG" | "Serie";

export interface ImageI {
  id?: number;
  estudioId: number;         // FK -> studies.id
  tipo: TipoImagen;          // DICOM/JPG/PNG/Serie
  url: string;               // ruta/URL donde quedó almacenado
  nombreArchivo: string;     // ej. IMG_001.dcm
  tamanoBytes: number;       // tamaño del archivo en bytes
  serie?: string | null;     // opcional (series DICOM, etc.)
  orden?: number | null;     // opcional (para ordenar visualización)
  fechaCarga?: Date;         // se setea por defecto con NOW
}

export class Image extends Model<ImageI> implements ImageI {
  public id!: number;
  public estudioId!: number;
  public tipo!: TipoImagen;
  public url!: string;
  public nombreArchivo!: string;
  public tamanoBytes!: number;
  public serie!: string | null;
  public orden!: number | null;
  public fechaCarga!: Date;
}

Image.init(
  {
    // id autoincrement por defecto (no es necesario declararlo salvo que quieras personalizarlo)
    estudioId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "FK al estudio (studies.id)",
      references: {
        model: "studies", // asegúrate de que tu tabla de estudios se llame 'studies'
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      validate: {
        isInt: { msg: "estudioId debe ser entero" },
        min: { args: [1], msg: "estudioId debe ser mayor a 0" },
      },
    },
    tipo: {
      type: DataTypes.ENUM("DICOM", "JPG", "PNG", "Serie"),
      allowNull: false,
      defaultValue: "DICOM",
      validate: {
        isIn: {
          args: [["DICOM", "JPG", "PNG", "Serie"]],
          msg: "tipo inválido (use DICOM|JPG|PNG|Serie)",
        },
      },
    },
    url: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La url/ruta es obligatoria" },
        len: { args: [1, 1024], msg: "La url debe tener 1-1024 caracteres" },
      },
    },
    nombreArchivo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre de archivo es obligatorio" },
        len: { args: [1, 255], msg: "El nombreArchivo debe tener 1-255 caracteres" },
      },
    },
    tamanoBytes: {
      type: DataTypes.BIGINT.UNSIGNED, // por si hay DICOM grandes
      allowNull: false,
      validate: {
        isInt: { msg: "tamanoBytes debe ser entero" },
        min: { args: [0], msg: "tamanoBytes no puede ser negativo" },
      },
    },
    serie: {
      type: DataTypes.STRING(120),
      allowNull: true,
      validate: {
        len: { args: [0, 120], msg: "serie debe tener 0-120 caracteres" },
      },
    },
    orden: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      validate: {
        isInt: { msg: "orden debe ser entero" },
        min: { args: [0], msg: "orden no puede ser negativo" },
      },
      comment: "Para ordenar la visualización (opcional)",
    },
    fechaCarga: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: "Fecha/hora en que se registró la imagen",
    },
  },
  {
    sequelize,
    modelName: "Image",
    tableName: "images",
    timestamps: false, // seguimos el estilo del ejemplo Client
    indexes: [
      { fields: ["estudioId"] },
      { fields: ["estudioId", "orden"] },
      { fields: ["fechaCarga"] },
    ],
  }
);

// (Opcional) Asociación si tienes el modelo Study definido
// import { Study } from "./study";
// Image.belongsTo(Study, { foreignKey: "estudioId", as: "estudio" });

export default Image;
