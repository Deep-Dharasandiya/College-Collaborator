const Mongoose = require('mongoose');
const  Lecture = Mongoose.model("lectures", {
  collage_id:{
    type:Mongoose.Schema.Types.ObjectId,
    ref:'admins'
  },
  class_id:{
    type:Mongoose.Schema.Types.ObjectId,
    ref:'classes'
  },
  subject_id:{
    type:Mongoose.Schema.Types.ObjectId,
    ref:'subjects'
  },
  faculty_id:{
    type:Mongoose.Schema.Types.ObjectId,
    ref:'facultys'
  },
  type:{
    type:String,
  },
  start_time:{
    type:String,
  },
  duration:{
    type:String,
  },
  date:{
    type:String,
  },
  for:{
    type:String,
  },
  attendance:[{
      present:{
        type:String,
      },
      student:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:'students'
      },
    }],
});
module.exports = Lecture;