const express = require('express');
const router = express.Router()
const Mongoose = require('mongoose');

const Admin = require('./Model-Admin/RegisterAdminModel');
const Facultys=require('./Model-Admin/FacultyRegisterModel');
const Students=require('./Model-Admin/StudentRegisterModel');
 
router.post("/SignIn", async (request, response) => {
  try {
      var result = await Admin.find({ email: request.body.email, password:request.body.password}).exec();
      if(result==''){
        var result1 = await Facultys.find({ faculty_email: request.body.email, password:request.body.password}).exec();
        if(result1==''){
          var result2 = await Students.find({ student_email: request.body.email, password:request.body.password}).exec();
          if(result2==''){
            response.json('1');
          }else{
            response.json(result2);
          }
        }else{
          response.json(result1);
        }
      }else{
        response.json(result);
      }
  } catch (error) {
      response.status(500).json('0');
  }
});


module.exports = router;