import { Model } from 'sequelize';
export interface StudyLabelI {
    id?: number;
    study_id: number;
    label_id: number;
}
export declare class StudyLabel extends Model implements StudyLabelI {
    id: number;
    study_id: number;
    label_id: number;
}
export default StudyLabel;
//# sourceMappingURL=StudieLabel.d.ts.map