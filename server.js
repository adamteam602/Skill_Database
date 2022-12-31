const express = require('express')
const app = express()
const bodyParser = require('body-parser');


// app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended : false}),express.static(__dirname))

var mysql = require('mysql');
const e = require('express');
app.use('/images', express.static(__dirname + 'images'))

var con = mysql.createConnection({
  host: "localhost",
  post: 3306,
  user: "root",
  password: "Abhi@123",
  database: "Skill_DataBase_Project"
});

const port = 3000
app.listen(port,start)

function start()
{
    console.log("This app is listening on port 3000")
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.post('/create_contact', (req, res) => {
  console.log("Data Successfully sent from html to server");
  var name = req.body.name1;
  var skill = req.body.skill;
  var YOE = req.body.YOE;
  var skill_level = req.body.Skill_Level;
  var Domain = req.body.Domain;
  // var cnam = req.body.course;

  console.log(name+" "+skill+" "+YOE+" "+skill_level + " "+Domain)
  AddSkill(name,skill,skill_level,YOE,Domain);
  
  // senddata();
  // senddata(name, email, mb, date, cnam);
  res.sendFile(__dirname + '/thank.html', 'utf8');
  //  app.render('/Regirstation_system/thank');



  //console.log(req.body.name1);
})

// function senddata()
// {

  con.connect(function (err) {
    if
      (err)
      console.log(err);
    else
      console.log("Connected!");



  })

function AddSkill(name, skill,level,yoe,Domain)
{
	var sql = "SELECT 1 FROM   information_schema.tables WHERE  table_schema = 'Skill_DataBase_Project' " +
		" AND table_name = '" + name + "';" ;
		console.log(sql)
	con.query(sql, function (err, result, fields) {
		if (err) 
			console.log("Absent");

		if(result.length != 0)
		{
			
			console.log("You have already added the skill if you want to change go update skill tab");
			
		}
		else
		{
			var sql = "CREATE TABLE `"+ name +"` (skill VARCHAR(45), Domain VARCHAR(45),skill_level varchar(45),Experience INT)";
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log("Table created");
			});

			sql = "INSERT INTO `" + name +"` (skill,Domain,skill_level,Experience )VALUES ?";
			var values = [[skill,Domain,level, yoe]];
			con.query(sql, [values], function (err, result) {
				if (err)
				  console.log(err)
				else
				  console.log("Inserted Succeffully");
			})
		} 

	});

}
  
function UpdateSkill()
{
	schema_name = "Skill_DataBase_Project";
	table_name  = "Abhijit Gadhave"

	// var sql = `select TABLE_NAME from INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE' and TABLE_SCHEMA="Skill_DataBase_Project"` ; 
	var sql = "SELECT 1 FROM   information_schema.tables WHERE  table_schema = 'Skill_DataBase_Project' " +
		" AND table_name = '" + table_name + "';" ;
		console.log(sql)
	con.query(sql, function (err, result, fields) {
	if (err) 
		console.log("Absent");

	if(result.length != 0)
	{
		
		console.log("Present");
		
	}
	else
	{
		console.log("Absent")
	} 

	});

}
