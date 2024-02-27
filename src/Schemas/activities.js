import mongoose, { Schema, model} from "mongoose";

const activities = new Schema({
    activity_id:Number,
    tags:Array
})

var ActivityModel = new model('activities', activities)

export default ActivityModel