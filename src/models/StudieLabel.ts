
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connection';

export interface StudyLabelI {
  id?: number;
  study_id: number;
  label_id: number;
}

export class StudyLabel extends Model implements StudyLabelI {
  public id!: number;
  public study_id!: number;
  public label_id!: number;
}

StudyLabel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    study_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'studies', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    label_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'labels', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
  },
  {
    sequelize,
    modelName: 'StudyLabel',
    tableName: 'study_labels',
    timestamps: false,
    indexes: [
      { unique: true, fields: ['study_id', 'label_id'] }, 
      { fields: ['label_id'] }
    ],
  }
);

export default StudyLabel;
