var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.json());

router.post('/saveSkills', async function (req, res) {

    async function saveSkills() {
        // console.log("saveSkills => ", req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });
        //console.log("Connection has been successfully created!");
        const [error, results] = await conn.query('INSERT INTO `student_skillset` (skill_name, fk_student_num) VALUES(?, ?)', [req.body.skill, req.body.id]);

        await conn.end();
        if (error) {
            console.log("error");
            return error;
        }
        else {
            return results;
        }
    }
    let data = saveSkills().then(r => console.log("saveSkills =>", r)).catch(e => e.message)
});


router.post('/getSkills', async function (req, res) {

    async function getSkills() {
        console.log("GETSkills => ", req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({ host: 'handshake.cxm6k5gbbru4.us-east-1.rds.amazonaws.com', user: 'admin', password: 'aditi123', database: 'handshake' });

        const [rows, fields] = await conn.query('Select * from student_skillset where fk_student_num = ?', [req.body.id]);
        console.log("GETSkills => after", rows);
        await conn.end();
        console.log("GETSkills => Skills: ", rows);

        return (rows);
    }
    let data = getSkills();
    data.then(r => {
        console.log(r);
        res.send(r)
    })
        .catch(e => e.message)
});


module.exports = router;