const mongoose = require('mongoose')

const schemaWorkout = new mongoose.Schema({
    title: {
         type: String,
         required: true 
        },
    reps: {
        type: Number,
        required: true 
        },
    load: {
        type: Number,
        required: true
        },
    user_id: {
        type:String,
        required:true
        },
},{timestamps:true})



module.exports =  mongoose.model('Workout', schemaWorkout)
