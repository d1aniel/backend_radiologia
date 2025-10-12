"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyLabel = void 0;
// src/models/StudyLabel.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class StudyLabel extends sequelize_1.Model {
}
exports.StudyLabel = StudyLabel;
StudyLabel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    study_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: 'studies', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    label_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: 'labels', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
}, {
    sequelize: connection_1.default,
    modelName: 'StudyLabel',
    tableName: 'study_labels',
    timestamps: false,
    indexes: [
        { unique: true, fields: ['study_id', 'label_id'] }, // evita duplicados
        { fields: ['label_id'] }
    ],
});
exports.default = StudyLabel;
//# sourceMappingURL=StudieLabel.js.map