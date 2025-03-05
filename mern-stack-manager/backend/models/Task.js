const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {type: String,required: true},
    description: {type: String},
    status: {type:String,default: 'pending',enum: ['pending', 'in-progress', 'completed']},
    due_date: {type: Date},
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;