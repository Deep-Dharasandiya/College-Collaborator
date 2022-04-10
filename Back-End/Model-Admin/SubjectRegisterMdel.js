const Mongoose = require('mongoose');
const  Subjects = Mongoose.model("subjects", {
  collage_id:{
    type:String,
  },
  subject_name:{
    type:String,
  },
  subject_code:{
    type:String,
  },
});
module.exports = Subjects;