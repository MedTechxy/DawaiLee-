var mysql=require('mysql2');
var express=require('express');
var bodyParser=require('body-parser');
var notifier=require('node-notifier')
var ejs=require('ejs');
const session = require('express-session');
const app=express();
app.set('view engine','ejs');
app.set('views',"./views");

app.use(session({
  secret: 'sohel@123',
  resave: false,
  saveUninitialized: true
}));



var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    port:3306,
    database:'Hackthon',
    password:"Password"
});
app.use(express.static('Public'));
app.use(bodyParser.urlencoded({ extended: true }));

con.connect(function(err){
    if(err){
        console.log("error",err);
    }
    else{
        console.log('Connected');
    }

});

//for Patient Signup
app.post("/psignup",(req,res)=>{
    var name=req.body.name;
    var phone=req.body.phone;
    var email=req.body.email;
    var password=req.body.password;
    var birthdate=req.body.birthdate;
    var pincode=req.body.pincode;
    var gender=req.body.gender;
    var Conditions=req.body.conditions;

    const ConditionStr = Conditions ? Conditions.join(',') : '';
    var sql=`insert into PatientInfo values(?,?,?,?,?,?,?,?,?);`;
    con.query(sql,[,name,phone,email,password,birthdate,pincode,gender,ConditionStr],function(err,result){
        if(err){
            throw err;
        }
        else{
            console.log("Insertion successfull")
            res.redirect('PatientLogin.html');
        }
    })
});

//for Doctor Signup
app.post("/dsignup",(req,res)=>{
    var name=req.body.name;
    var phone=req.body.phone;
    var email=req.body.email;
    var password=req.body.password;
    var birthdate=req.body.birthdate;
    var pincode=req.body.pincode;
    var cname=req.body.Cname;
    var address=req.body.address;
    var Degree=req.body.Degree;
    var Gender=req.body.Gender;
    var special=req.body.special;

    var sql=`insert into DoctorInfo values(?,?,?,?,?,?,?,?,?,?,?,?);`;
    
    con.query(sql,[,name,phone,email,password,birthdate,pincode,cname,address,Degree,Gender,special],function(err,result){
        if(err){
            throw err;
        }
        else{
            console.log("Insertion successfull")
            res.redirect('DrLogin.html');
        }
    })
});

//Patient Login validation
app.post('/PLogin',(req,res)=>{
    var email=req.body.email;
    var Password=req.body.password;
    var sql=`select Email,password,Name from patientinfo where Email=? AND password=?`;
    con.query(sql,[email,Password],function(err,results){
     if(err) throw err;
     else{
        var em = results.map(result => result.Email);
        var pass=results.map(result=> result.password);
        if(em==email && pass==Password){
            var username = results[0].Name; //get the name of the doctor from the query result
            res.render("Patientdash", { username: username }); //pass the username to the EJS file
        }    
        else{
            notifier.notify({
                title: 'Login Error!!!',
                message: 'Error while login please check mail or password'
              });
            res.redirect('PatientLogin.html');
        }
     }
    })
});



//Doctor Login Access
let Did;

app.post('/DLogin',(req,res)=>{
    var email=req.body.email;
    var Password=req.body.password;
    var sql=`select Email,password,Name,Did from DoctorInfo where Email=? AND password=?`;
    con.query(sql,[email,Password],function(err,results){
     if(err) throw err;
     else{
        var em = results.map(result => result.Email);
        var pass=results.map(result=> result.password);
        if(em==email && pass==Password){
            var username = results[0].Name; //get the name of the doctor from the query result
            req.session.Did=results[0].Did;
            var Did=req.session.Did;
            
            const qur = 'SELECT Pid,Medicine_and_time,start_date FROM Prescription where Did=?';
            con.query(qur,[Did], (err, results) => {
            if (err) throw err; 
            else{
                console.log(results);
               var Pid=results[0].Pid;
               var Prep=results[0].Medicine_and_time;
            res.render("DrDash", { username: username,users:results}); //pass the username to the EJS file
            }
        });
        }
        else{
            notifier.notify({
                title: 'Login Error!!!',
                message: 'Error while login please check mail or password'
              });
            res.redirect('DrLogin.html');
            console.log(req.session.Did);
        }
     }
    })
});


// Add Patient
// app.post('/Added', function(req, res) {
//         res.render('AddPatient');
//       });
      
app.post('/AddP', function(req, res) {
        req.session.did=req.session.Did;
        res.render('AddPatient', {name: "-", history: "-",date:"-", Pid:"-"});
      });  
      

//Check if patient Id is present in data base and Display on Addpatient
app.post('/Added', (req, res) => {
    var pid = req.body.Pid;
    req.session.pid=pid;
    var today = new Date();
    today=today.toLocaleDateString(undefined, { dateStyle: 'short' });
    req.session.Did=req.session.did;
    console.log(req.session.Did);
    var sql = 'SELECT Pid, Name, Conditions FROM PatientInfo WHERE Pid = ?';
    con.query(sql, [pid], function(err, results) {
      if (err) throw err;
      else {
        if (results.length > 0) {
          var data = results[0];
          console.log(data);
          res.render('AddPatient', {name: data.Name, history: data.Conditions, date:today,Pid:pid});
        } else {
          notifier.notify({
            title: 'Error!!!',
            message: 'Please check Patient Id'
          });
          res.render('AddPatient',{Pid:" " ,name: "", history:"",date:""});
          console.log('done');
        }
      }
    });
  });

//Adding Patient and prescription to Prescription Table
app.post("/padd",(req,res)=>{
    req.session.did= req.session.Did;
    var Did=req.session.did;
    req.session.Pid=req.session.pid;
    var Pid=req.session.Pid;
    var Diagnosis=req.body.Diagnosis;
    var medicine=req.body.medicine;
    var time=req.body.time;
    var Sdate=req.body.Sdate;
    var Edate=req.body.Edate;
    var medicineAndtime= medicine+ "," +time;
    console.log(Did,Pid);
    
    var sql=`insert into Prescription values(?,?,?,?,?,?);`;
    
    con.query(sql,[Did,Pid,Diagnosis,medicineAndtime,Sdate,Edate],function(err,results){
        if(err){
            throw err;
        }
        else{
            console.log("Insertion successfull")
            res.render("AddPatient",{Pid:"-",name: "-", history:"-",date:"-",});
        }
    })
});




app.get("/",(req,res)=>{
    res.set({
     "Allow-access-Allow-Origin":"*"
    })
    return res.redirect('PatientSignup.html');
 }).listen(3000);