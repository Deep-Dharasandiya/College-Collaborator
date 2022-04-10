const express = require('express')
const app = express();
const mongoose = require('mongoose')
const MongoUrl='mongodb+srv://admin:admin@cluster0.exa4w.mongodb.net/Collage-collaborator?retryWrites=true&w=majority'
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(require('./Api-Admin/RegisterAdmin'));
app.use(require('./Api-SignIn'));
app.use(require('./Api-Admin/StudentRegister'));
app.use(require('./Api-Admin/FacultyRegister'));
app.use(require('./Api-Admin/GetStudentDetails'));
app.use(require('./Api-Admin/GetFacultyDetails'));
app.use(require('./Api-Admin/CreateClassroom'));
app.use(require('./Api-Admin/GetClassroomDetails'));
app.use(require('./Api-Admin/SubjectRegister'));
app.use(require('./Api-Admin/GetSubjectDetails'));
app.use(require('./Api-Admin/GetClassAllDetails'));
app.use(require('./Api-Admin/GetAllClasses'));
app.use(require('./Api-Admin/UpdateSubClass'));
app.use(require('./Api-Admin/UpdateSubjectStudent'));
app.use(require('./Api-Admin/UpdateSubjectFaculty'));
app.use(require('./Api-Admin/GetClassSubject'));
app.use(require('./Api-Admin/UpdateShedul'));

// Faculty-APi
app.use(require('./Api-Faculty/GetMySubjects'));
app.use(require('./Api-Faculty/GetMySubjectClasses'));
app.use(require('./Api-Faculty/GetLectureForAttendance'));
app.use(require('./Api-Faculty/InsertLecture'));
app.use(require('./Api-Faculty/CalculetLectureAttendance'));
mongoose.connect(MongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
mongoose.connection.on("connected",()=>{
    console.log("connected to mongo yeahhh")
})
mongoose.connection.on("error",(err)=>{
    console.log("Error",err)
})
app.get('/',(req,res)=>{
    res.send("hi!")
})
app.listen(port, ()=>{console.log('server is running on port' + port)})