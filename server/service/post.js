const db = require('../sqlite/db')
const tableName = 'post'

function selectAll() {
  return new Promise((resolve) => {
    db.all(`SELECT * FROM ${tableName}`, (err, row) => {
      err ? resolve([]) : resolve(row)
    })
  })
}

function selectByName (name) {
  return new Promise((resolve) => {
    db.all(`SELECT * FROM ${tableName} where name like '%${name}%'`, (err, row) => {
      err ? resolve([]) : resolve(row)
    })
  })
}

function update({ id, title, content }) {
  return new Promise((resolve) => {
    const handle = db.prepare(`update ${tableName} set title='${title}',content='${content}' where id=${id}`)
    handle.run()
    resolve(true)
  })
}

function insert({ title, content }) {
  return new Promise((resolve) => {
    const handle = db.prepare(`insert into ${tableName}(title, content) values ('${title}','${content}')`)
    handle.run()
    resolve(true)
  })
}

module.exports = {
  selectAll,
  selectByName,
  update,
  insert
}

      