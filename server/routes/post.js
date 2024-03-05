var express = require('express');
var router = express.Router();
var service = require('../service/post')

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

      