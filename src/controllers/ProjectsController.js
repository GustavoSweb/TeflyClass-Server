import Validation from "../utils/Validation.js";
import Projects from "../models/Projects.js";
import { ConflictData, NotExistValue, NotValid } from "../utils/Error.js";
import moment from "moment";

class ProjectsController {
  async Create(req, res) {
    try {
      var {
        title,
        description,
        delivery,
        shipping,
        bimester_id,
        matter_id,
        min_members,
        max_members,
        semester_id,
      } = req.body;
      new Validation({
        title,
        description,
        delivery,
        shipping,
        matter_id,
        min_members,
        max_members,
      }).Check();
      delivery = moment(delivery).format("YYYY-MM-DD HH:mm:ss");
      shipping = moment(shipping).format("YYYY-MM-DD HH:mm:ss");
      const project_id = await Projects.create({
        title,
        description,
        delivery,
        shipping,
        bimester_id,
        matter_id,
        min_members,
        max_members,
        semester_id,
      });
      return res.json({
        message: "Sucesso. Projeto cadastrado",
        project: {
          id: project_id,
          title,
          description,
          delivery,
          shipping,
          bimester_id,
          matter_id,
          min_members,
          max_members,
          semester_id,
        },
      });
    } catch (err) {
      if (err.status) return res.status(err.status).json({ err: err.message });
      console.log(err);
      res.sendStatus(500);
    }
  }
  async Delete(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id)) throw new NotValid("Passe o id valido");
      await Projects.delete(id);
      res.json({ message: "Sucesso. Projeto deletado" });
    } catch (err) {
      if (err.status) return res.status(err.status).json({ err: err.message });
      res.sendStatus(500);
    }
  }
  async GetAll(req, res) {
    try {
      var { finished, matters, semester_id, bimester_id } = req.query;
      if (matters) matters = JSON.parse(matters);
semester_id = Number(semester_id)
      let data = await Projects.findAll({ finished, matters, user_id: 1, semester_id, bimester_id });
      console.log(data)
      res.json(data);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
  async GetOne(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id)) throw new NotValid("Passe o id valido");
      let data = await Projects.findById(id);
      if (!data) throw new NotExistValue("Não existe este Projeto");
      res.json(data);
    } catch (err) {
      if (err.status) return res.status(err.status).json({ err: err.message });
      res.sendStatus(500);
    }
  }
  async FinishedProject(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id)) throw new NotValid("Passe o id valido");
      await Projects.finished({ id, user_id: 1 });
      res.json({ message: "Foi atualizado o status do Projeto!" });
    } catch (err) {
      if (err.status) return res.status(err.status).json({ err: err.message });
      res.sendStatus(500);
    }
  }
  async DeselectProject(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id)) throw new NotValid("Passe o id valido");
      await Projects.finished({ id, user_id: 1 });
      res.json({ message: "Foi marcado como pendente o status do Projeto!" });
    } catch (err) {
      if (err.status) return res.status(err.status).json({ err: err.message });
      res.sendStatus(500);
    }
  }
  async Update(req, res) {
    try {
      const { title, description, delivery, shipping, bimester_id, matter_id } =
        req.body;
      const { id } = req.params;
      if (isNaN(id)) throw new NotValid("Passe o id valido");
      await Projects.update({
        data: {
          title,
          description,
          delivery,
          shipping,
          bimester_id,
          matter_id,
        },
        id,
      });
      res.json({ message: "Sucesso. Projeto atualizado!" });
    } catch (err) {
      console.log(err);
      if (err.status) return res.status(err.status).json({ err: err.message });
      res.sendStatus(500);
    }
  }
}
export default new ProjectsController()