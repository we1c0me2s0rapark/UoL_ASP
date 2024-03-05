const db = require('../sqlite/db')
const tableName = 'message'

function selectAll() {
  return new Promise((resolve) => {
    db.all(`
      SELECT
        message.id,message.content,message.send_id,message.receive_id,message.create_time,user.username
      FROM
        message
      LEFT JOIN
        user
        ON user.id = message.receive_id`, (err, row) => {
      err ? resolve([]) : resolve(row)
    })
  })
}

function insert({ content, send_id, receive_id, create_time  }) {
  return new Promise((resolve) => {
    const handle = db.prepare(`insert into ${tableName}(content, send_id, receive_id, create_time) values ('${content}','${send_id}','${receive_id}','${create_time}')`)
    handle.run()
    resolve(true)
  })
}

module.exports = {
  selectAll,
  insert
}

