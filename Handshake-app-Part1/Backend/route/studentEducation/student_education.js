var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.json());


router.post('/saveEducationDetails', async function (req, res) {

    async function saveEducationDetails() {
        //console.log(req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        //console.log("Connection has been successfully created!");
        const [error, results] = await conn.query('INSERT INTO `student_education_details` ( college_name, degree, major, yop, cgpa, id_student) VALUES (?,?,?,?,?,?)', [req.body.collegeName, req.body.degree, req.body.major, req.body.yop, req.body.cgpa, req.body.id]);
        //console.log("after");
        await conn.end();
        // return Object.assign({}, rows);
        if (error) {
            console.log("error");
            return error;
        }
        else {
            return results;
        }
    }
    let data = saveEducationDetails().then(r => console.log(r)).catch(e => e.message)
});

router.post('/getEducationDetails', async function (req, res) {

    async function getEducationDetails() {
        //console.log("Inside get Education ",req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        //xconsole.log("Connecttion has been succesfully created!");
        const [rows, fields] = await conn.query('Select * from student_education_details where id_student = ?', [req.body.id]);
        console.log("after", rows[0]);
        await conn.end();
        // return Object.assign({}, rows);
        //console.log("Education details: ", rows[0]);

        return (rows[0]);
    }
    let data = getEducationDetails();
    data.then(r => {
        console.log(r);
        res.send(r)
    })
        .catch(e => e.message)
});

module.exports = router;