var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.json());


router.post('/saveContactDetails', async function (req, res) {

    async function saveContactDetails() {
        //console.log(req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        //console.log("Connection has been successfully created!");
        const [error, results] = await conn.query('UPDATE student SET email_id = ?, phone_number= ? where id_student = ?', [req.body.emailId, req.body.phoneNumber, req.body.id]);
        //console.log("after");
        await conn.end();
        if (error) {
            console.log("error");
            return error;
        }
        else {
            return results;
        }
    }
    let data = saveContactDetails().then(r => console.log(r)).catch(e => e.message)
});


router.post('/getContactDetails', async function (req, res) {

    async function getContactDetails() {
        //console.log("Inside get Contact Details ", req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });

        const [rows, fields] = await conn.query('Select phone_number, email_id from student where id_student = ?', [req.body.id]);
        //console.log("after", rows[0]);
        await conn.end();
        //console.log("Contact details: ", rows[0]);

        return (rows[0]);
    }
    let data = getContactDetails();
    data.then(r => {
        //console.log(r);
        res.send(r)
    })
        .catch(e => e.message)
});

module.exports = router;