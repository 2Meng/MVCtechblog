const User = require('./Users');
const Posts = require('./Posts');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Posts.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Posts };
