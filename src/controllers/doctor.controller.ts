import { Request, Response } from 'express';
import Doctor from '../models/Doctor';
import { UniqueConstraintError, ValidationError } from 'sequelize';

export class DoctorController {
  /**
   * GET /api/doctors
   * List all doctors
   */
  public getAllDoctors = async (req: Request, res: Response) => {
    try {
      const doctors = await Doctor.findAll();
      return res.status(200).json({ ok: true, data: doctors });
    } catch (error) {
      console.error('getAllDoctors error:', error);
      return res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  };

  /**
   * GET /api/doctors/:id
   * Get one doctor by id
   */
  public getDoctorById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const doctor = await Doctor.findByPk(id);
      if (!doctor) {
        return res.status(404).json({ ok: false, message: 'Doctor no encontrado' });
      }
      return res.status(200).json({ ok: true, data: doctor });
    } catch (error) {
      console.error('getDoctorById error:', error);
      return res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  };

  /**
   * POST /api/doctors
   * Create a doctor
   * Body: { nombre, especialidad, telefono, correo, registro? }
   * status se establece por defecto a "ACTIVATE"
   */
  public createDoctor = async (req: Request, res: Response) => {
    const { nombre, especialidad, telefono, correo, registro } = req.body;

    // validación simple del servidor (complementar con express-validator si quieres)
    if (!nombre || !especialidad || !telefono || !correo) {
      return res.status(400).json({ ok: false, message: 'Faltan campos requeridos' });
    }

    try {
      const nuevo = await Doctor.create({
        nombre,
        especialidad,
        telefono: String(telefono),
        correo,
        registro: registro || null,
        // status default ya definido en el modelo, pero lo podemos forzar:
        status: 'ACTIVATE'
      });

      return res.status(201).json({ ok: true, data: nuevo });
    } catch (err) {
      console.error('createDoctor error:', err);
      if (err instanceof UniqueConstraintError) {
        // por ejemplo: correo duplicado
        return res.status(409).json({ ok: false, message: 'Correo ya registrado' });
      }
      if (err instanceof ValidationError) {
        return res.status(400).json({ ok: false, message: err.errors.map(e => e.message) });
      }
      return res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  };

  /**
   * PUT /api/doctors/:id
   * Update doctor (puedes actualizar nombre, especialidad, telefono, correo, registro, status)
   */
  public updateDoctor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, especialidad, telefono, correo, registro, status } = req.body;

    try {
      const doctor = await Doctor.findByPk(id);
      if (!doctor) {
        return res.status(404).json({ ok: false, message: 'Doctor no encontrado' });
      }

      // actualizar solo los campos presentes
      if (nombre !== undefined) doctor.nombre = nombre;
      if (especialidad !== undefined) doctor.especialidad = especialidad;
      if (telefono !== undefined) doctor.telefono = String(telefono);
      if (correo !== undefined) doctor.correo = correo;
      if (registro !== undefined) doctor.registro = registro;
      if (status !== undefined) doctor.status = status;

      await doctor.save();

      return res.status(200).json({ ok: true, data: doctor });
    } catch (err) {
      console.error('updateDoctor error:', err);
      if (err instanceof UniqueConstraintError) {
        return res.status(409).json({ ok: false, message: 'Correo ya registrado' });
      }
      if (err instanceof ValidationError) {
        return res.status(400).json({ ok: false, message: err.errors.map(e => e.message) });
      }
      return res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  };

  /**
   * DELETE /api/doctors/:id
   * Hard delete (si prefieres soft delete, cambia a update status = INACTIVE)
   */
  public deleteDoctor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const doctor = await Doctor.findByPk(id);
      if (!doctor) {
        return res.status(404).json({ ok: false, message: 'Doctor no encontrado' });
      }

      await doctor.destroy();
      return res.status(200).json({ ok: true, message: 'Doctor eliminado' });
    } catch (error) {
      console.error('deleteDoctor error:', error);
      return res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
  };
}
