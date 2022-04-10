const express = require('express');
const router = express.Router()
const Mongoose = require('mongoose');
const Admin = require('../Model-Admin/RegisterAdminModel');

router.post("/SignUp", async (request, response) => {
    try {
      var check = await Admin.find({ email: request.body.email},{_id:1}).exec()
      if(check==''){
        var data = new Admin(request.body);
        var result = await data.save();
        response.json("1");
      }else{
          response.json("2");
      }
    } catch (error) {
        response.status(500).json('0');
    }
  });
  module.exports = router;