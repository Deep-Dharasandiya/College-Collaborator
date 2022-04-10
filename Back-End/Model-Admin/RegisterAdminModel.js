const Mongoose = require('mongoose');
const Admin = Mongoose.model("Admin", {
  collage_name:{
    type:String,
  },
  email:{
      type:String,
  },
  password:{
      type:String,
  },
  local_add:{
      type:String,
  },
  city:{
      type:String,
  },
  state:{
      type:String,
  },
  pin:{
      type:String,
  },
  icon:{
    type:String,
  },
  role:{
    type:String,
},
});
module.exports = Admin;