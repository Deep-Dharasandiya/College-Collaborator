const express = require('express');
const router = express.Router()
const Students = require('../Model-Admin/StudentRegisterModel');

router.post("/StudentRegister", async (request, response) => {
    try {
      var check = await Students.find({ student_email: request.body.student_email},{_id:1}).exec()
      if(check==''){
        var data = new Students(request.body);
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