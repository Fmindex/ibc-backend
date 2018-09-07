let express = require('express');
let router = express.Router();
let mysql = require('../config/mysql');
//query
router.get('/', function(req, res, next) {
  mysql.query('SELECT * FROM ClubMember', function(err, result) {
    if (err) console.error(err);
    else res.send(result);
  });
});

// add new member
router.post('/addMember', (req, res, next) => {
  const sql =
    'insert into ClubMember (id,intNo,nname,fname,lname,address,road,subdistrict,district,province,\
      PostCode,homeNo,telNo,telNo2,Email,workplace,gender,position)\
      values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ';
  const editedReqBody = {
    ...req.body,
    intNo: parseInt(req.body.intNo) ? parseInt(req.body.intNo) : 0,
  };
  const reqBody = Object.keys(editedReqBody).map(key => req.body[key]);
  mysql.query(sql, [...reqBody], function(err, result) {
    if (err) console.error(err);
    else res.send(result);
  });
});
// DOES NOT CHECK GRAD AND
router.post('/edit', (req, res, next) => {
  const editedReqBody = { ...req.body.editedInfo, intNo: parseInt(req.body.editedInfo.intNo) };
  const reqBody = Object.keys(editedReqBody)
    .map(key => key + ' = "' + editedReqBody[key] + '"')
    .join();
  const sql = `update ClubMember set ${reqBody} where id = ${req.body.id}`;
  mysql.query(sql, function(err, result) {
    if (err) console.error(err);
    else res.send(result);
  });
});
