
import { DataTypes, Model } from 'sequelize';
import  sequelize  from '../database/connection';

export interface LabelI {
  id?: number;
  nombre: string;
  descripcion?: string;
  status: 'ACTIVATE' | 'INACTIVE';
}

export class Label extends Model {
  public id!: number;
  public nombre!: string;
  public descripcion?: string;
  public status!: 'ACTIVATE' | 'INACTIVE';
}

Label.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'El nombre no puede estar vacío' },
        len: { args: [2, 120], msg: 'El nombre debe tener entre 2 y 120 caracteres' },
      },
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        len: { args: [0, 255], msg: 'La descripción no puede exceder 255 caracteres' },
      },
    },
    status: {
      type: DataTypes.ENUM('ACTIVATE', 'INACTIVE'),
      allowNull: false,
      defaultValue: 'ACTIVATE', 
    },
  },
  {
    sequelize,
    modelName: 'Label',
    tableName: 'labels', 
    timestamps: false,
    indexes: [
      { unique: true, fields: ['nombre'] },
    ],
  }
);
