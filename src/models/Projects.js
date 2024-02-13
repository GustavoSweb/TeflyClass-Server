import database from "../database/connection.js";
import { NotExistValue } from "../utils/Error.js";

class Project {
  async findOne(filter) {
    if (!filter) throw new Error("Falta de parametros no findOne");
    const key = Object.keys(filter);
    try {
      const data = await database
        .select()
        .table("projects")
        .where(`${key[0]}`, filter[key[0]]);

      return data[0];
    } catch (err) {
      throw err;
    }
  }
  async findById(id) {
    if (!id) throw new Error("Falta de parametros no findById");
    try {
      const data = await database.select().table("projects").where({ id });
      return data[0];
    } catch (err) {
      throw err;
    }
  }
  async create(data) {
    if (data.semester_id) delete data.bimester_id;
    if (data.bimester_id) delete data.semester_id;
    try {
      let sala = await database.insert(data).into("projects");
      return sala;
    } catch (err) {
      throw err;
    }
  }
  async delete(id) {
    try {
      const value = await database.where({ id }).delete().table("projects");
      if (value == 0)
        throw new NotExistValue("A sala a ser deletada não existe");
    } catch (err) {
      throw err;
    }
  }
  deleteCampEdit(data, activity) {
    Object.keys(data).forEach((key) => {
      if (!data[key] || data[key] == activity[key]) delete data[key];
    });
    return data;
  }
  async updateProcessEdit(data, activity) {
    try {
      data = this.deleteCampEdit(data, activity);
      if (Object.keys(data).length <= 0)
        throw new NotValid("Não houve nenhuma modificação");
      return data;
    } catch (err) {
      throw err;
    }
  }
  async update({ data, id }) {
    try {
      const activity = await this.findById(id);
      if (!activity) throw new NotExistValue("Projeto não encontradoa");
      const activityEdit = await this.updateProcessEdit(data, activity);
      await database.update(activityEdit).where({ id }).table("projects");
    } catch (err) {
      throw err;
    }
  }
  async findAllQueryDate(query, dataRelationObject) {
    if (dataRelationObject["projects.semester_id"]) delete dataRelationObject.bimester_id;
    if (dataRelationObject.bimester_id) delete dataRelationObject["projects.semester_id"];
    return query.where(dataRelationObject);
  }
  async findAll({ finished, matters, user_id, semester_id, bimester_id }) {
    try {
      let query = database
        .select(["projects.*", "matter.name as name_matter"])
        .table("matter")
        .innerJoin("projects", "projects.matter_id", "matter.id");
        console.log("ok")

      if (matters) {
        console.log("ok")
        query = query.whereIn("matter_id", matters);
      }

      if ((finished == "true" && user_id)) {

        query = query
          .innerJoin(
            "project_status",
            "projects.id",
            "project_status.project_id"
          )
          .where({
            "project_status.user_id": user_id,
            "project_status.status": 1,
          });
      }
      if(semester_id || bimester_id) query = this.findAllQueryDate(query, { bimester_id, "projects.semester_id":semester_id }) 
      return await query;
    } catch (err) {
      throw err;
    }
  }
  async finished({ id, user_id }) {
    try {
      const result = await database
        .select()
        .table("project_status")
        .where({ user_id, project_id: id })
        .update({ status: 1 });
      if (result[0] <= 0) throw new NotExistValue("Não existe esta projeto!");
    } catch (err) {
      throw err;
    }
  }
  async deselect({ id, user_id }) {
    try {
      const result = await database
        .select()
        .table("project_status")
        .where({ user_id, project_id: id })
        .update({ status: 0 });
      if (result[0] <= 0) throw new NotExistValue("Não existe esta atividade!");
    } catch (err) {
      throw err;
    }
  }
}

export default new Project();
