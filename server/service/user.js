const db = require('../sqlite/db')
const tableName = 'user'

function selectAll() {
  return new Promise((resolve) => {
    db.all(`SELECT * FROM ${tableName}`, (err, row) => {
      err ? resolve([]) : resolve(row)
    })
  })
}

function selectOneByEmail(email) {
  return new Promise((resolve) => {
    db.all(`SELECT * FROM ${tableName} WHERE email='${email}'`, (err, row) => {
      err ? resolve([]) : resolve(row)
    })
  })
}

function selectByEmailAndPassword({ email, password }) {
  return new Promise((resolve) => {
    db.all(`SELECT * FROM ${tableName} WHERE email='${email}' and password='${password}'`, (err, row) => {
      err ? resolve([]) : resolve(row)
    })
  })
}

function update({ id, username, password }) {
  return new Promise((resolve) => {
    const handle = db.prepare(`update ${tableName} set username='${username}',password='${password}' where id=${id}`)
    handle.run()
    resolve(true)
  })
}

function insert({ username, password, email }) {
  return new Promise((resolve) => {
    const handle = db.prepare(`insert into ${tableName}(username,password,email) values ('${username}','${password}','${email}')`)
    handle.run()
    resolve(true)
  })
}

module.exports = {
  selectAll,
  update,
  insert,
  selectByEmailAndPassword,
  selectOneByEmail
}
