const db = require('../sqlite/db')
const tableName = 'comment'

function selectAll() {
  return new Promise((resolve) => {
    db.all(`SELECT * FROM ${tableName}`, (err, row) => {
      err ? resolve([]) : resolve(row)
    })
  })
}

function selectByFid(fid) {
  return new Promise((resolve) => {
    db.all(`
      SELECT
        comment.furniture_id,comment.user_id,comment.content,comment.create_time,user.username,user.email
      FROM
        comment
      LEFT JOIN
        user
          ON comment.furniture_id=${fid} and user.id = comment.user_id`, (err, row) => {
      err ? resolve([]) : resolve(row)
    })
  })
}

function update({ id, content }) {
  return new Promise((resolve) => {
    const handle = db.prepare(`update ${tableName} set content='${content}' where id=${id}`)
    handle.run()
    resolve(true)
  })
}

function insert({ furniture_id, user_id, content, create_time }) {
  return new Promise((resolve) => {
    const handle = db.prepare(`insert into ${tableName}(furniture_id, user_id, content, create_time) values ('${furniture_id}','${user_id}','${content}','${create_time}')`)
    handle.run()
    resolve(true)
  })
}

module.exports = {
  selectAll,
  selectByFid,
  update,
  insert
}

