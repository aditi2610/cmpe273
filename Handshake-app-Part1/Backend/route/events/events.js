var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.json());

router.post('/createEvent', async function (req, res) {

    async function createEvent() {
        console.log("request Inside createEvent is: ", req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        const [error, results] = await conn.query('INSERT INTO `event_details` ( fk_company_id, event_name, event_description, event_eligibility, event_date, event_time, city, state, country) VALUES ( ?, ?,?,?,?,?,?,?,?)',
            [req.body.idCompany, req.body.eventName, req.body.description, req.body.eligibility, req.body.eventDate, req.body.eventTime, req.body.city, req.body.state, req.body.country]);
        console.log("after");
        await conn.end();
        console.log("Output is: ", results);
        if (error) {
            console.log("error");
            return error;
        }
        else {
            return results;
        }
    }
    let data = createEvent().then(r => {
        console.log("Response before sending to UI ", r);
        res.send(r)
    })
        .catch(e => e.message)
});


router.post('/getCompanyEvents', async function (req, res) {

    async function getCompanyEvents() {
        console.log("Inside getCompanyEvents ", req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        const [rows, fields] = await conn.query('Select * from event_details where fk_company_id = ?', req.body.id);
        console.log("basic Details : ", rows);
        await conn.end();
        //console.log("Company jobs are: ", rows);
        return rows;
    }
    let data = getCompanyEvents();
    data.then(r => res.send(r)).catch(e => e.message)
});

router.post('/getStudents', async function (req, res) {

    async function getStudentsAppliedForEvent() {
        console.log("Inside getStudentsForEvents ", req);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        const [rows, fields] = await conn.query('select * from student where id_student In (select fk_s_id from event_student_map where fk_e_id = ?)', req.body.id);
        console.log("student ids applied for jobs are: ", rows);
        await conn.end();
        console.log("Company jobs are: ", rows);
        return rows;
    }
    let data = getStudentsAppliedForEvent();
    data.then(r => res.send(r)).catch(e => e.message)
});

router.post('/getAllEvents', async function (req, res) {

    async function getAllEvents() {
        console.log("Inside getAllEvents ", req);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        //console.log("Connection has been successfully created!");
        const [rows, fields] = await conn.query('select * from event_details order By event_date DESC');
        console.log("student ids applied for events are: ", rows);
        await conn.end();
        console.log("Company Events are: ", rows);
        return rows;
    }
    let data = getAllEvents();
    data.then(r => res.send(r)).catch(e => e.message)
});

router.post('/searchEvents', async function (req, res) {

    async function getEventsForStudent() {
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });

        var sql_query = "select * from event_details";

        if (req.body.eventName.length != 0) {
            sql_query += " WHERE event_name LIKE '%" + req.body.eventName + "%'";
        }

        console.log("searchEvents -> sql: ", sql_query);
        const [rows, fields] = await conn.query(sql_query);
        console.log("searchEvents -> response from DB: ", rows);
        await conn.end();
        return rows;
    }
    let data = getEventsForStudent();
    data.then(r => res.send(r)).catch(e => e.message)
});

router.post('/registerForEvents', async function (req, res) {

    async function registerForEvents() {
        console.log("Inside registerForEvents  ", req);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });

        const [error, results] = await conn.query('INSERT INTO `event_student_map` ( fk_s_id, fk_e_id) VALUES ( ?, ?)', [req.body.student_id, req.body.event_id]);
        console.log("after registering for Event BACKEND", results);
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
    let data = registerForEvents();
    data.then(r => res.send(r)).catch(e => e.message)
});

module.exports = router;