var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.json());

router.post('/saveExperienceDetails', async function (req, res) {

    async function saveExperienceDetails() {
        console.log(req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        console.log("Connection has been successfully created!");
        const [error, results] = await conn.query('INSERT INTO `student_experience_details` ( fk_student_id, company_name, jobTitle, city, country, start_date, end_date, work_description) VALUES (?,?,?,?,?,?,?,?)', [req.body.id, req.body.companyName, req.body.jobTitle, req.body.city, req.body.country, req.body.startDate, req.body.endDate, req.body.workDesc]);
        console.log("after", results);
        await conn.end();
        if (error) {
            console.log("error");
            return error;
        }
        else {
            return results;
        }
    }
    let data = saveExperienceDetails().then(r => console.log(r)).catch(e => e.message)
});


router.post('/getExperienceDetails', async function (req, res) {

    async function getExperienceDetails() {
        console.log("Inside get Experience Details ", req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });

        const [rows, fields] = await conn.query('Select * from student_experience_details where fk_student_id = ?', [req.body.id]);
        //console.log("after", rows[0]);
        await conn.end();
        console.log("Experience details: ", rows[0]);

        return (rows[0]);
    }
    let data = getExperienceDetails();
    data.then(r => {
        console.log(r);
        res.send(r)
    })
        .catch(e => e.message)
});


module.exports = router;