
import { DataTypes, Model } from "sequelize";
import sequelize from "../database/connection";

export type TipoImagen = "DICOM" | "JPG" | "PNG" | "Serie";

export interface ImageI {
  id?: number;
  estudioId: number;         
  tipo: TipoImagen;          
  url: string;
  nombreArchivo: string;
  tamanoBytes: number;
  serie?: string | null;
  orden?: number | null;
  fechaCarga?: Date;
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
    estudioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM("DICOM", "JPG", "PNG", "Serie"),
      allowNull: false,
      defaultValue: "DICOM",
    },
    url: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    nombreArchivo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tamanoBytes: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    serie: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    orden: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
    },
    fechaCarga: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Image",
    tableName: "images",
    timestamps: false,
  }
);

export default Image;
