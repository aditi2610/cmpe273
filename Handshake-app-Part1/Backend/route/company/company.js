var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.json());

router.post('/signUp', async function (req, res) {

    async function saveCompanyDetails() {
        //console.log(req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        const [error, results] = await conn.query('INSERT INTO `company` ( company_name, description, email, phone_number, password, city, state, country) VALUES (?,?,?,?,?,?,?,?)', [req.body.companyName, req.body.description, req.body.email, req.body.phoneNumber, req.body.password, req.body.city, req.body.state, req.body.country]);
        //console.log("after");
        await conn.end();
        //return Object.assign({}, rows);
        if (error) {
            console.log("error");
            return error;
        }
        else {
            return results;
        }
    }



    let data = saveCompanyDetails().then(r => res.send(r)).catch(e => e.message)
});


router.post('/getCompanyDetails', async function (req, res) {

    async function getCompanyDetails() {
        console.log(req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        // const [rows, fields] = await conn.query('SELECT * FROM `company` WHERE id_company=?', [req.body.id]);
        const [rows, fields] = await conn.query('Select * from company where id_company = ?', req.body.id);
        console.log("after", rows[0]);
        await conn.end();

        return rows[0];
    }
    let data = getCompanyDetails().then(r => res.send(r)).catch(e => e.message)
});



router.post('/updateCompanyDetails', async function (req, res) {

    async function updateCompanyDetails(err) {
        console.log(req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        const [error, results] = await conn.query('UPDATE company SET phone_number = ?, city= ?, state = ? , country = ?, description= ? where id_company = ?', [req.body.phoneNumber, req.body.city, req.body.state, req.body.country, req.body.description, req.body.id_company]);
        var re = results;
        var er = error;
        console.log("updateCompanyDetails =>  ", error);
        console.log("updateCompanyDetails => result", re);
        await conn.end();
        // return Object.assign({}, rows);
        if (error) {
            console.log("error");
            return error;
        }
        else {
            results.status(200);
            return results;
        }
    }

    let data = updateCompanyDetails().then(r => {
        console.log("Sending it to FRontend: ", r);
        res.sendStatus(200)
    }).catch(e => e.message)
});


module.exports = router;

