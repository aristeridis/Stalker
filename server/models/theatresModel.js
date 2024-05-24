const mongoose = require('mongoose');
const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',    
},
},{timestamps:true});
module.exports=mongoose.model("theatres",theatreSchema);