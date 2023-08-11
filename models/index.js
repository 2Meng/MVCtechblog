const Users = require('./Users');
const Posts = require('./Posts');
const Comments = require('./comments')

Users.hasMany(Posts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Posts.belongsTo(Users, {
  foreignKey: 'user_id',
});

Comments.belongsTo(Users, {
  foreignKey: 'user_id'
});

module.exports = { Users, Posts, Comments };
