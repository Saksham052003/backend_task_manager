
const mongoose= require('mongoose')

const Schema=mongoose.Schema

const TaskManagerSchema=new Schema({
    taskname: {
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        default: false,
    },
    priority:{
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    }
},{timestamps:true})

module.exports=mongoose.model('tasks',TaskManagerSchema)
