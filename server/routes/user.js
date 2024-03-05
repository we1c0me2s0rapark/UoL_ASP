var express = require('express');
var router = express.Router();
var service = require('../service/user')

router.post('/login', async function (req, res) {
  let nList = await service.selectOneByEmail(req.body.email)
  console.log(nList)

  if (!nList.length) {
    console.log(123123)
    await service.insert({ username: 'User_' + Math.round(Math.random() * 1E9), email: req.body.email, password: req.body.password })
  }

  let list = await service.selectByEmailAndPassword(req.body)
  res.send({
    code: list.length ? 200 : 500,
    data: list.length ? list[0] : null
  })
});

router.get('/', async function (req, res) {
  const list = await service.selectAll()
  res.send({
    code: 200,
    data: list
  })
});

router.post('/', async function (req, res) {
  const bool = await service.insert(req.body)
  res.send({
    code: bool ? 200 : 500
  })
});

router.put('/', async function (req, res) {
  const bool = await service.update(req.body)
  res.send({
    code: bool ? 200 : 500
  })
});

module.exports = router;
