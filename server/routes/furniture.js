var express = require('express');
var router = express.Router();
var service = require('../service/furniture')
const multer = require('multer');
var path = require('path')

// set multer storage choice
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext
    req.uploadName = name
    cb(null, name); // self-defined file name
  }
});
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res) => {
  res.send(req.uploadName);
});

router.get('/', async function (req, res) {
  const list = await service.selectAll()
  res.send({
    code: 200,
    data: list
  })
});

router.get('/:id', async function (req, res) {
  const list = await service.selectById(req.params.id)
  res.send({
    code: list.length ? 200 : 500,
    data: list.length ? list[0] : null
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

router.delete('/:id', async function (req, res) {
  const bool = await service.del(req.params.id)
  res.send({
    code: bool ? 200 : 500
  })
});

module.exports = router;

      