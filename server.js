// const mysql = require('mysql2');
// const express = require('express');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const notifier = require('node-notifier');

// const app = express();

// //Connection with Mysql database(Hackthon)
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   port: 3306,
//   database: 'Hackthon',
//   password: "Password"
// });

// app.use(express.static('Public'));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({
//   secret: 'sohel@123',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }));

// con.connect(function (err) {
//   if (err) {
//     console.log("error", err);
//   } else {
//     console.log('Connected');
//   }
// });

// //for Patient Signup
// module.exports = {
//     patientSignupHandler:app.post("/psignup", (req, res) => {
//   var name = req.body.name;
//   var phone = req.body.phone;
//   var email = req.body.email;
//   var password = req.body.password;
//   var birthdate = req.body.birthdate;
//   var pincode = req.body.pincode;
//   var gender = req.body.gender;
//   var Conditions = req.body.conditions;

//   const ConditionStr = Conditions ? Conditions.join(',') : '';
//   var sql = `INSERT INTO PatientInfo VALUES(?,?,?,?,?,?,?,?,?);`;
//   con.query(sql, [, name, phone, email, password, birthdate, pincode, gender, ConditionStr], function (err, result) {
//     if (err) {
//       throw err;
//     }
//     else {
//       console.log("Insertion successfull")
//       res.redirect('PatientLogin.html');
//     }
//   })
// })
// };

// //for Doctor Signup
// app.post("/dsignup", (req, res) => {
//   var name = req.body.name;
//   var phone = req.body.phone;
//   var email = req.body.email;
//   var password = req.body.password;
//   var birthdate = req.body.birthdate;
//   var pincode = req.body.pincode;
//   var cname = req.body.Cname;
//   var address = req.body.address;
//   var Degree = req.body.Degree;
//   var Gender = req.body.Gender;
//   var special = req.body.special;

//   var sql = `INSERT INTO DoctorInfo VALUES(?,?,?,?,?,?,?,?,?,?,?,?);`;
//   con.query(sql, [, name, phone, email, password, birthdate, pincode, cname, address, Degree, Gender, special], function (err, result) {
//     if (err) {
//       throw err;
//     }
//     else {
//       console.log("Insertion successfull")
//       res.redirect('DrLogin.html');
//     }
//   })
// });

// // Patient Login API
// app.post('/PLogin', (req, res) => {
//   var email = req.body.email;
//   var password = req.body.password;

//   var sql = 'SELECT Email, Password FROM PatientInfo WHERE Email = ? AND Password = ?';
//   con.query(sql, [email, password], function (err, results) {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//       return;
//     }

//     if (results.length > 0) {
//       req.session.email = email;
//       res.status(200).send("Login successful");
//     } else {
//       res.status(401).send("Incorrect email or password");
//     }
//   });
// });

// // Doctor Login API
// app.post('/DLogin', (req, res) => {
//     var email = req.body.email;
//     var password = req.body.password;
    
//     var sql = 'SELECT Email, Password FROM DoctorInfo WHERE Email = ? AND Password = ?';
//     con.query(sql, [email, password], function (err, results) {
//     if (err) {
//     res.status(500).send(err.message);
//     } else {
//     if (results.length > 0) {
//     req.session.email = email;
//     res.redirect('DrDash.html');
//     } else {
//     notifier.notify({
//     title: 'Login Error!!!',
//     message: 'Error while login please check mail or password'
//     });
//     res.redirect('DrLogin.html');
//     }
//     }
//     });
//     });
    
//     // Logout API
//     app.get('/logout', (req, res) => {
//     req.session.destroy(function (err) {
//     if (err) {
//     res.status(500).send(err.message);
//     } else {
//     res.redirect('/');
//     }
//     });
//     });
    
//     app.get('/', (req, res) => {
//     res.set({
//     'Allow-access-Allow-Origin': '*'
//     });
//     return res.redirect('PatientSignup.html');
//     }).listen(3000);
    
//     module.exports = app;

//     // ---------------------------------------------------------------------------------------------------------
//     // Connection with Mysql database (Hackthon)
// const mysql = require('mysql2');
// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   port: 3306,
//   database: 'Hackthon',
//   password: 'Password',
// });

// con.connect(function(err) {
//   if (err) {
//     console.log('error', err);
//   } else {
//     console.log('Connected');
//   }
// });

// // Import required modules
// const express = require('express');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const notifier = require('node-notifier');

// const app = express();

// // Serve static files from the Public folder
// app.use(express.static('Public'));

// // Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));

// // Configure session middleware
// app.use(session({
//   secret: 'sohel@123',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {secure: false},
// }));

// // Handle patient signup form submission
// app.post('/psignup', (req, res) => {
//   const name = req.body.name;
//   const phone = req.body.phone;
//   const email = req.body.email;
//   const password = req.body.password;
//   const birthdate = req.body.birthdate;
//   const pincode = req.body.pincode;
//   const gender = req.body.gender;
//   const conditions = req.body.conditions;

//   const conditionStr = conditions ? conditions.join(',') : '';
//   const sql = `INSERT INTO PatientInfo VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
//   con.query(
//     sql,
//     [null, name, phone, email, password, birthdate, pincode, gender, conditionStr],
//     function(err, result) {
//       if (err) {
//         console.error('Error while inserting patient info:', err);
//         res.status(500).send('Internal server error');
//       } else {
//         console.log('Patient insertion successful');
//         res.redirect('PatientLogin.html');
//       }
//     }
//   );
// });

// // Handle doctor signup form submission
// app.post('/dsignup', (req, res) => {
//   const name = req.body.name;
//   const phone = req.body.phone;
//   const email = req.body.email;
//   const password = req.body.password;
//   const birthdate = req.body.birthdate;
//   const pincode = req.body.pincode;
//   const cname = req.body.Cname;
//   const address = req.body.address;
//   const degree = req.body.Degree;
//   const gender = req.body.Gender;
//   const special = req.body.special;

//   const sql = `INSERT INTO DoctorInfo VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
//   con.query(
//     sql,
//     [
//       null,
//       name,
//       phone,
//       email,
//       password,
//       birthdate,
//       pincode,
//       cname,
//       address,
//       degree,
//       gender,
//       special,
//     ],
//     function(err, result) {
//       if (err) {
//         console.error('Error while inserting doctor info:', err);
//         res.status(500).send('Internal server error');
//       } else {
//         console.log('Doctor insertion successful');
//         res.redirect('DrLogin.html');
//       }
//     }
//   );
// });

// // Handle patient login form submission
// app.post('/PLogin', (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const sql = 'SELECT Email, password FROM PatientInfo WHERE Email=? AND password=?;';
//   con.query(sql, [email, password], function(err, results) {
//     if (err) {
//       console.error('Error while executing query:', err);
//       res.status(500).send('Internal Server Error');
//       } else {
//       const em = results.map(result => result.Email);
//       const pass = results.map(result => result.password);
//       if (em == email && pass == password) {
//       req.session.email = em;
//       res.redirect('Patientdash.html');
//       } else {
//       notifier.notify({
//       title: 'Login Error!!!',
//       message: 'Error while login please check email or password'
//       });
//       res.redirect('PatientLogin.html');
//       }
//       }
//       });
//       });
      
//       //Doctor Login Access
//       app.post('/DLogin', (req, res) => {
//       const email = req.body.email;
//       const password = req.body.password;
//       const sql = 'SELECT email, password FROM DoctorInfo WHERE Email=? AND password=?;';
//       con.query(sql, [email, password], function(err, results) {
//       if (err) {
//       console.error('Error while executing query:', err);
//       res.status(500).send('Internal Server Error');
//       } else {
//       const em = results.map(result => result.Email);
//       const pass = results.map(result => result.password);
//       if (em == email && pass == password) {
//       req.session.email = em;
//       res.redirect('DrDash.html');
//       } else {
//       notifier.notify({
//       title: 'Login Error!!!',
//       message: 'Error while login please check email or password'
//       });
//       res.redirect('DrLogin.html');
//       }
//       }
//       });
//       });
      
//       app.get('/', (req, res) => {
//       res.set({
//       'Allow-access-Allow-Origin': '*'
//       });
//       return res.redirect('PatientSignup.html');
//       }).listen(3000);
      
//       module.exports = app;
