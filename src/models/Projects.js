import database from "../database/connection.js";
import { NotExistValue } from "../utils/Error.js";

class Project {
  async findOne(filter) {
    if (!filter) throw new Error("Falta de parametros no findOne");
    const key = Object.keys(filter);
    try {
      const data = await database
        .select([
          "projects.*",
          "archives_project.url",
          "matter.name as matter_name",
          "matter.important as matter_important",
          "bimester.number as bimester",
          "bimester.year as bimester_year",
        ])
        .table("projects")
        .where(`projects.${key[0]}`, filter[key[0]])
        .innerJoin("matter", "matter.id", "projects.matter_id")
        .innerJoin(
          "archives_project",
          "archives_project.project_id",
          "projects.id"
        )
        .innerJoin("bimester", "bimester.id", "projects.bimester_id");
      if (!data[0]) throw new NotExistValue("Não existe o projeto");
      var defaultData = {
        id: data[0].id,
        description: data[0].description,
        title: data[0].title,
        delivery: data[0].delivery,
        shipping: data[0].shipping,
        matter_id: data[0].matter_id,
        matter_name: data[0].matter_name,
        matter_important: data[0].matter_important,
        bimester_year: data[0].bimester_year,
        min_members: data[0].min_members,
        max_members: data[0].max_members,
        bimester: data[0].bimester,
        archives: [],
      };
      data.forEach((object) => {
        defaultData.archives.push({ url: object.url });
      });
      return defaultData;
    } catch (err) {
      throw err;
    }
  }
  async findById(id) {
    if (!id) throw new Error("Falta de parametros no findById");
    try {
      const data = await database
        .select([
          "projects.*",
          "archives_project.url",
          "matter.name as matter_name",
          "matter.important as matter_important",
          "bimester.number as bimester",
          "bimester.year as bimester_year",
        ])
        .table("projects")
        .where("projects.id", id)
        .innerJoin("matter", "matter.id", "projects.matter_id")
        .innerJoin(
          "archives_project",
          "archives_project.project_id",
          "projects.id"
        )
        .innerJoin("bimester", "bimester.id", "projects.bimester_id");
      if (!data[0]) throw new NotExistValue("Não existe o projeto");
      var defaultData = {
        id: data[0].id,
        description: data[0].description,
        title: data[0].title,
        delivery: data[0].delivery,
        shipping: data[0].shipping,
        matter_id: data[0].matter_id,
        matter_name: data[0].matter_name,
        matter_important: data[0].matter_important,
        bimester_year: data[0].bimester_year,
        bimester: data[0].bimester,
        min_members: data[0].min_members,
        max_members: data[0].max_members,
        archives: [],
      };
      data.forEach((object) => {
        defaultData.archives.push({ url: object.url });
      });
      return defaultData;
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
    if (dataRelationObject["projects.semester_id"])
      delete dataRelationObject.bimester_id;
    if (dataRelationObject.bimester_id)
      delete dataRelationObject["projects.semester_id"];
    return query.where(dataRelationObject);
  }
  async findAll({ finished, matters, user_id, semester_id, bimester_id }) {
    try {
      let query = database
        .select(["projects.*", "matter.name as name_matter"])
        .table("matter")
        .innerJoin("projects", "projects.matter_id", "matter.id");

      if (matters) {
        console.log("ok");
        query = query.whereIn("matter_id", matters);
      }

      if (finished == "true" && user_id) {
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
      if (semester_id || bimester_id)
        query = this.findAllQueryDate(query, {
          bimester_id,
          "projects.semester_id": semester_id,
        });
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
