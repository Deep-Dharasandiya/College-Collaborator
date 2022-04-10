const express = require('express');
const router = express.Router()
const Facultys = require('../Model-Admin/FacultyRegisterModel');

router.post("/FacultyRegister", async (request, response) => {
    try {
      var check = await Facultys.find({ faculty_email: request.body.faculty_email},{_id:1}).exec()
      if(check==''){
        var data = new Facultys(request.body);
        var result = await data.save();
        response.json('1');
      }else{
          response.json("2");
      }
    } catch (error) {
        response.status(500).json('0');
    }
  });
  module.exports = router;