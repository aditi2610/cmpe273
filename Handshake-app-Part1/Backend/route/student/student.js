var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/saveBasicDetails', async function (req, res) {

    async function saveBasicStudentDetails(err) {
        //console.log(req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });

        const [error, results] = await conn.query('UPDATE `student` SET date_of_birth = ?, city= ?, state = ? , country = ?, career_objective= ? where id_student = ?', [req.body.dob, req.body.city, req.body.state, req.body.country, req.body.careerObjective, req.body.id_student]);
        //console.log("after");
        await conn.end();
        // return Object.assign({}, rows);
        if (error instanceof multer.MulterError) {
            console.log("error");
            return results.status(500).json(error);
        } else if (error) {
            return results.status(500).json(error);
        }
        else {
            results.status(200).send(req.file)
            return results;
        }
    }
    let data = saveBasicStudentDetails().then(r => console.log(r)).catch(e => e.message)
});


router.post('/getBasicDetails', async function (req, res) {

    async function getBasicStudentDetails() {
        //console.log("Inside getBasic Details of student.js", req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        //console.log("Connection has been succesfully created!");
        const [rows, fields] = await conn.query('Select * from student where id_student = ?', [req.body.id]);
        // console.log("basic Details : ", rows);
        await conn.end();
        return rows[0];
    }
    let data = getBasicStudentDetails();
    data.then(r => res.send(r)).catch(e => e.message)
});

router.post('/searchStudents', async function (req, res) {

    async function getStudentsForSearch() {
        var first = true;

        console.log("[BE] - searchStudents -> ", req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        //console.log("Connection has been successfully created!");
        // var sql_query = "SELECT * FROM student s INNER JOIN student_education_details sed ON s.id_student = sed.id_student ";
        var sql_query = "SELECT * FROM student s INNER JOIN student_education_details sed ON s.id_student = sed.id_student INNER JOIN student_skillset ss ON ss.fk_student_num = sed.id_student ";

        if (req.body.student_name.length != 0) {
            if (first)
                sql_query += "WHERE"
            sql_query += "  s.first_name LIKE '%" + req.body.student_name + "%'";
            first = false;
        }

        if (req.body.student_school.length != 0) {
            if (first)
                sql_query += "WHERE"
            else {
                sql_query += " AND";
            }
            sql_query += " sed.college_name LIKE '%" + req.body.student_school + "%'";
            first = false;
        }

        if (req.body.student_major.length != 0) {
            if (first)
                sql_query += "WHERE"
            else {
                sql_query += " AND";
            }
            sql_query += " sed.major LIKE '%" + req.body.student_major + "%'";
        }
        if (req.body.student_skill.length != 0) {
            if (first)
                sql_query += "WHERE"
            else {
                sql_query += " AND";
            }
            sql_query += " ss.skill_name LIKE '%" + req.body.student_skill + "%'";
        }
        console.log("searchStudents -> sql: ", sql_query);
        const [rows, fields] = await conn.query(sql_query);
        console.log("searchStudents -> response from DB: ", rows);
        await conn.end();
        return rows;
    }
    let data = getStudentsForSearch();
    data.then(r => res.send(r)).catch(e => e.message)
});

module.exports = router;