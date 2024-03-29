import database from "../database/connection.js";
import { NotExistValue } from "../utils/Error.js";
import ActivityModel from "../Schemas/activities.js";
import slugify from "slugify";

class Activities {
  async search(text){
    try{
      const res = await ActivityModel.find({tags:{$all:(slugify(text).toUpperCase()).split('-')}})
      const ids_activities = res.map(activity => {return activity.activity_id})
      const activities_select = await database.select(["activities.*", "matter.name as name_matter"])
      .table("matter")
      .innerJoin("activities", "activities.matter_id", "matter.id").whereIn('activities.id', ids_activities)
      return activities_select
    }catch(err){
      throw err
    }
  }
  async findOne(filter) {
    if (!filter) throw new Error("Falta de parametros no findOne");
    const key = Object.keys(filter);
    try {
      const data = await database
        .select([
          "activities.*",
          "archives_activity.url",
          "matter.name as matter_name",
          "matter.important as matter_important",
          "bimester.number as bimester",
          "bimester.year as bimester_year",
        ])
        .table("activities")
        .where(`activities.${key[0]}`, filter[key[0]])
        .innerJoin("matter", "matter.id", "activities.matter_id")
        .innerJoin(
          "archives_activity",
          "archives_activity.activity_id",
          "activities.id"
        )
        .innerJoin("bimester", "bimester.id", "activities.bimester_id");
      if (!data[0]) throw new NotExistValue("Não existe está atividade");
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
          "activities.*",
          "archives_activity.url",
          "matter.name as matter_name",
          "matter.important as matter_important",
          "bimester.number as bimester",
          "bimester.year as bimester_year",
        ])
        .table("activities")
        .where({ "activities.id": id })
        .innerJoin("matter", "matter.id", "activities.matter_id")
        .innerJoin(
          "archives_activity",
          "archives_activity.activity_id",
          "activities.id"
        )
        .innerJoin("bimester", "bimester.id", "activities.bimester_id");
      if (!data[0]) throw new NotExistValue("Não existe está atividade");
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
  async create({
    title,
    description,
    delivery,
    shipping,
    bimester_id,
    matter_id,
    classrooms,
  }) {
    try {

      return await database.transaction(async () => {
        let activity_id = await database
        .insert({
          title,
          description,
          delivery,
          shipping,
          bimester_id,
          matter_id,
        })
        .into("activities");
        const TAGS = this.CreateTags({title, description})
        await ActivityModel.create({activity_id:activity_id[0], tags:TAGS})
        classrooms.forEach(async (classroom_id) => {
          await database.insert({ activity_id:activity_id[0], classroom_id }).into('classroom_activities')
        });
        return activity_id;
      });

    } catch (err) {
      console.error(err)
      throw err;
    }
  }
   CreateTags({title, description}){
    var DATA_TAGS = []
    const DESCRIPTION_UPPER_FORMAT = (slugify(description).toUpperCase()).split('-')
    const TITLE_UPPER_FORMAT = (slugify(title).toUpperCase()).split('-')
    
    DATA_TAGS.push( ...DESCRIPTION_UPPER_FORMAT, ...TITLE_UPPER_FORMAT)
    return DATA_TAGS
  }
  async delete(id) {
    try {
      const value = await database.where({ id }).delete().table("activities");
      await ActivityModel.find({activity_id:id}).deleteOne()
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
      if (!activity) throw new NotExistValue("Atividade não encontradoa");
      const activityEdit = await this.updateProcessEdit(data, activity);
      await database.update(activityEdit).where({ id }).table("activities");
    } catch (err) {
      throw err;
    }
  }
  async findAll({ finished, matters, user_id, bimester_id }) {
    try {
      let query = database
        .select(["activities.*", "matter.name as name_matter"])
        .table("matter")
        .innerJoin("activities", "activities.matter_id", "matter.id");

      if (matters) {
        query = query.whereIn("matter_id", matters);
      }
      if (bimester_id) query = query.where({ bimester_id });
      if (finished == "true" && user_id) {
        query = query
          .innerJoin(
            "activity_status",
            "activities.id",
            "activity_status.activity_id"
          )
          .where({
            "activity_status.user_id": user_id,
            "activity_status.status": 1,
          });
      }

      return await query;
    } catch (err) {
      throw err;
    }
  }
  async finished({ id, user_id }) {
    try {
      const result = await database
        .select()
        .table("activity_status")
        .where({ user_id, activity_id: id })
        .update({ status: 1 });
      if (result[0] <= 0) throw new NotExistValue("Não existe esta atividade!");
    } catch (err) {
      throw err;
    }
  }
  async deselect({ id, user_id }) {
    try {
      const result = await database
        .select()
        .table("activity_status")
        .where({ user_id, activity_id: id })
        .update({ status: 0 });
      if (result[0] <= 0) throw new NotExistValue("Não existe esta atividade!");
    } catch (err) {
      throw err;
    }
  }
}

export default new Activities();
