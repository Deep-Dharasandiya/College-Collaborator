const Mongoose = require('mongoose');
const  Class = Mongoose.model("classes", {
  collage_id:{
    type:Mongoose.Schema.Types.ObjectId,
    ref:'admins'
  },
  program:{
    type:String,
  },
  course:{
    type:String,
  },
  year:{
    type:String,
  },
  semester:{
      type:String,
  },
  counselor:{
    type:Mongoose.Schema.Types.ObjectId,
    ref:'facultys'
  },
  classname:{
    type:String,
  },
  subclass_flage:{
      type:String,
  },
  subclasses:[{
      subclassname:{
        type:String,
      },
      students:[{
        type:Mongoose.Schema.Types.ObjectId,
        ref:'students'
      }],
    }],
  subjects:[{
      subject:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:'subjects'
      },
      students:[{
        type:Mongoose.Schema.Types.ObjectId,
        ref:'students'
      }],
      facultys:[{
        type:Mongoose.Schema.Types.ObjectId,
        ref:'facultys'
      }],
    }],
  shedual:[{
      day:{
        type:String,
      },
      starth:{
        type:String,
      },
      startm:{
        type:String,
      },
      endh:{
        type:String,
      },
      endm:{
        type:String,
      },
      subjectid:{
        type: Mongoose.Schema.Types.ObjectId,
        ref:'studentss' ,
      },
      facultyid:{
        type: Mongoose.Schema.Types.ObjectId,
        ref:'facultys',
      },
      type:{
        type:String,
      },
      for:{
        type:String,
      }
  
  }]

});
module.exports = Class;