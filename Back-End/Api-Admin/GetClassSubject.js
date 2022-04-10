const express = require('express');
const router = express.Router()
const Class = require('../Model-Admin/CreateClassroomModel');
const Facultys = require('../Model-Admin/FacultyRegisterModel');
const Subjects = require('../Model-Admin/SubjectRegisterMdel');
const Students = require('../Model-Admin/StudentRegisterModel');
router.post("/GetClassSubject", async (request, response) => {
    try {
      var ClassroomDetails = await Class.find({_id:request.body._id}).exec();
      for(var j=0 ;j< ClassroomDetails[0].subjects.length ; j++){
       var SubjectsDetails = await Subjects.find({ _id: ClassroomDetails[0].subjects[j].sub_id}).exec()
        ClassroomDetails[0].subjects[j].sub_id=SubjectsDetails[0]
      
        }
         for(var j=0 ;j< ClassroomDetails[0].subjects.length ; j++){
          for(var k=0 ;k< ClassroomDetails[0].subjects[j].students.length ; k++){
         var StudentDetails = await Students.find({ _id:ClassroomDetails[0].subjects[j].students[k]},{_id:1,student_firstname:1,student_lastname:1,student_en_no:1,student_email:1,profile:1}).exec()
         ClassroomDetails[0].subjects[j].students[k]=StudentDetails[0]
          }
        }
        for(var j=0 ;j< ClassroomDetails[0].subjects.length ; j++){
          for(var k=0 ;k< ClassroomDetails[0].subjects[j].facultys.length ; k++){
         var FacultyDetails = await Facultys.find({ _id:ClassroomDetails[0].subjects[j].facultys[k]},{_id:1,faculty_firstname:1,faculty_lastname:1,faculty_email:1,profile:1}).exec()
         ClassroomDetails[0].subjects[j].facultys[k]=FacultyDetails[0]
          }
        }
      response.json(ClassroomDetails[0].subjects);
    } catch (error) {
        response.status(500).json('0');
    }
  });
  module.exports = router;