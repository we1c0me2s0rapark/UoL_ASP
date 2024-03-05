const db = require('../sqlite/db')
const tableName = 'furniture'

function selectAll() {
  return new Promise((resolve) => {
    db.all(`SELECT * FROM ${tableName}`, (err, row) => {
      err ? resolve([]) : resolve(row)
    })
  })
}

function selectById(id) {
  return new Promise((resolve) => {
    db.all(`SELECT * FROM ${tableName} WHERE id=${id}`, (err, row) => {
      err ? resolve([]) : resolve(row)
    })
  })
}

function update({ id, name, description, image, type }) {
  return new Promise((resolve) => {
    const handle = db.prepare(`update ${tableName} set name='${name}',description='${description}',image='${image}',type='${type}' where id=${id}`)
    handle.run()
    resolve(true)
  })
}

function buy({ id, status, score, buyer_id, feedback }) {
  return new Promise((resolve) => {
    const handle = db.prepare(`update ${tableName} set status='${status}',score='${score}',buyer_id='${buyer_id}',feedback='${feedback}' where id=${id}`)
    handle.run()
    resolve(true)
  })
}

function insert({ name, description, image, type, create_time, location, user_id, status, score, buyer_id, feedback }) {
  return new Promise((resolve) => {
    const handle = db.prepare(`insert into ${tableName}(name, description, image, type, create_time, location, user_id, status, score, buyer_id, feedback) values ('${name}','${description}','${image}','${type}','${create_time}', '${location}', '${user_id}', '${status}', '${score}', '${buyer_id}', '${feedback}')`)
    handle.run()
    resolve(true)
  })
}

function del(id) {
  return new Promise((resolve) => {
    const handle = db.prepare(`DELETE FROM ${tableName} WHERE id=${id}`)
    handle.run()
    resolve(true)
  })
}

module.exports = {
  selectAll,
  selectById,
  update,
  insert,
  del,
  buy
}

