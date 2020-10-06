var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.json());

router.post('/createJob', async function (req, res) {

    async function createJob() {
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        const [error, results] = await conn.query('INSERT INTO `job_details` ( company_id, job_title, job_description, job_category, posting_date, application_deadline, city, state, country, salary) VALUES ( ?, ?,?,?,?,?,?,?,?,?)', [req.body.idCompany, req.body.jobTitle, req.body.jobDescription, req.body.jobCategory, req.body.postingDate, req.body.applicationDeadline, req.body.city, req.body.state, req.body.country, req.body.salary]);
        console.log("after creating Job BACKEND", results);
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
    let data = createJob().then(r => {
        //console.log("Response before sending to UI ", r); 
        res.send(r)
    })
        .catch(e => e.message)
});


router.post('/getCompanyJobs', async function (req, res) {

    async function getCompanyJobs() {
        //console.log("Inside getCompanyJobs ", req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        //console.log("Connection has been successfully created!");
        const [rows, fields] = await conn.query('Select * from job_details where company_id = ?', req.body.id);
        // console.log("basic Details : ", rows);
        await conn.end();
        //console.log("Company jobs are: ", rows);
        return rows;
    }
    let data = getCompanyJobs();
    data.then(r => res.send(r)).catch(e => e.message)
});

router.post('/getStudents', async function (req, res) {

    async function getStudentsAppliedForJob() {
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        const [rows, fields] = await conn.query('select * from student where id_student In (select fk_id_student from job_student_map where fk_id_job = ?)', req.body.id);
        console.log("student ids applied for jobs are: ", rows);
        await conn.end();
        console.log("Company jobs are: ", rows);
        return rows;
    }
    let data = getStudentsAppliedForJob();
    data.then(r => res.send(r)).catch(e => e.message)
});


router.post('/getAllJobs', async function (req, res) {

    async function getStudentsAppliedForJob() {
        console.log("Inside getAllJobs ", req);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        //console.log("Connection has been successfully created!");
        const [rows, fields] = await conn.query('select * from job_details');
        console.log("student ids applied for jobs are: ", rows);
        await conn.end();
        console.log("Company jobs are: ", rows);
        return rows;
    }
    let data = getStudentsAppliedForJob();
    data.then(r => res.send(r)).catch(e => e.message)
});

router.post('/applyForJob', async function (req, res) {

    async function applyForJob() {
        console.log("Inside applyForJob  ", req);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });

        const [error, results] = await conn.query('INSERT INTO `job_student_map` ( fk_id_student, fk_id_job) VALUES ( ?, ?)', [req.body.student_id, req.body.job_id]);
        console.log("after applying for Job BACKEND", results);
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
    let data = applyForJob();
    data.then(r => res.send(r)).catch(e => e.message)
});

router.post('/updateApplicationStatus', async function (req, res) {

    async function updateStatus() {
        console.log("Inside updateApplicationStatus  ", req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });

        // UPDATE job_student_map SET application_status = 'reviewed' WHERE fk_id_student = 4 AND fk_id_job = 5
        const [error, results] = await conn.query('UPDATE job_student_map SET application_status = ? WHERE fk_id_student = ? AND fk_id_job = ?', [req.body.application_status, req.body.id_student, req.body.id_job]);
        console.log("updateApplicationStatus -> After query", results);
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

    let data = updateStatus();
    data.then(r => res.send(r)).catch(e => e.message)
});



router.post('/searchJobs', async function (req, res) {

    async function getStudentsAppliedForJob() {
        var first = true;

        console.log("Inside searchJobs ", req);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        //console.log("Connection has been successfully created!");
        var sql_query = "select * from job_details WHERE";
        if (req.body.job_category.length != 0) {
            sql_query += " job_category in ( " + "'" + req.body.job_category.join("','") + "'" + " )";
            first = false;
        }

        if (req.body.job_title.length != 0) {
            if (!first) {
                sql_query += " AND";
            }
            sql_query += " job_title LIKE '%" + req.body.job_title + "%'";
            first = false;
        }

        if (req.body.city.length != 0) {
            if (!first) {
                sql_query += " AND";
            }
            sql_query += " city LIKE '%" + req.body.city + "%'";
            first = false;
        }

        console.log("searchJobs -> sql: ", sql_query);
        const [rows, fields] = await conn.query(sql_query);
        console.log("searchJobs -> response from DB: ", rows);
        await conn.end();
        return rows;
    }
    let data = getStudentsAppliedForJob();
    data.then(r => res.send(r)).catch(e => e.message)
});

module.exports = router;