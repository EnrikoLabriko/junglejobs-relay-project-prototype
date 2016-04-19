function Account(id, login, password) {
  this.id = id.toString();
  this.login = login;
  this.password = password;
}

function News(id, title, content, type, name) {
  this.id = id.toString();
  this.title = title;
  this.content = content;
  this.type = type;
  this.name = name;
}

var accounts = [new Account(1, 'admin', 'admin1234')];

var newsList = [
  new News(1, 'Title-1', 'Content-1', 'breaking', 'Name-1'),
  new News(2, 'Title-2', 'Content-2', 'common', 'Name-2'),
  new News(3, 'Title-3', 'Content-3', 'common', 'Name-3'),
  new News(4, 'Title-4', 'Content-4', 'common', 'Name-4'),
  new News(5, 'Title-5', 'Content-5', 'breaking', 'Name-5'),
  new News(6, 'Title-6', 'Content-6', 'common', 'Name-6'),
  new News(7, 'Title-7', 'Content-7', 'common', 'Name-7'),
  new News(8, 'Title-8', 'Content-8', 'common', 'Name-8'),
  new News(9, 'Title-9', 'Content-9', 'breaking', 'Name-9'),
  new News(10, 'Title-10', 'Content-10', 'common', 'Name-10')
];

module.exports = {
  Account: Account,
  News: News,
  getAccount: function(id) { return accounts.filter(function(u) { return u.id == id })[0] },
  getAnonymousAccount: function() { return accounts[0] },
  getNewsById: function(id) { return newsList.filter(function(n) { return n.id == id }) },
  getAllNews: function() { return newsList }
};

