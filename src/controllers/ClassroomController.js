import PasswordToken from "../models/PasswordToken.js";
import Validation from "../utils/Validation.js";
import Classroom from "../models/Classroom.js";
import { ConflictData, NotExistValue, NotValid } from "../utils/Error.js";

class ClassroomController {
  async Create(req, res) {
    try {
      const { num } = req.body;
      new Validation({ num }).Check();
      const class_id = await Classroom.create({ num });
      return res.json({
        message: "Sucesso. Sala cadastrada",
        classroom: { id: class_id, num },
      });
    } catch (err) {
      if (err.status) return res.status(err.status).json({ err: err.message });
      res.sendStatus(500);
    }
  }
  async Delete(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id)) throw new NotValid("Passe o id valido");
      await Classroom.delete(id);
      res.json({ message: "Sucesso. Sala deletada" });
    } catch (err) {
      if (err.status) return res.status(err.status).json({ err: err.message });
      res.sendStatus(500);
    }
  }
}

export default new ClassroomController();
