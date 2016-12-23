// installed from npm. Now need to incorporate into js here.
var mysql = require('mysql');
var inquirer = require('inquirer');
var item_id = 0;
var numberOfUnits = 0;

var connection = mysql.createConnection({
  host     : 'localhost',
  // used root as username.
  user     : 'root',
  password : 'KobeBryant24!',

  database : 'Bamazon'
});

connection.connect(function(err) {
	if (err) throw err;

	inquirer.prompt([
		{
			name: 'action',
			message: 'What would you like to do Mr./Ms. Manger?',
			choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
			type: 'list'
		}
	]).then(function(answers) {
		var choice = answers.action;
		if(choice === 'View Products for Sale') {
			connection.query('SELECT * from products', function(err, res) {
				// if(err) thow err;
				console.log("id | product name | price | # in stock");
				for (var i=0; i < res.length; i++) {
					console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price + ' | ' + res[i].stock_quantity);
				}
			});
			connection.end();
		} else if(choice === 'View Low Inventory') {
			console.log('The following items are low in inventory: ');
			connection.query('SELECT * from products WHERE stock_quantity < ?',5, function(err, res) {
				if(err) throw err;
				for (var i=0; i < res.length; i++) {
					console.log(res[i].product_name + ' ,');
				}
				connection.end();
			});
		} else if(choice === 'Add to Inventory') {
			inquirer.prompt([
				{
					name: 'id',
					message: 'Please type the id of the item you would like to add inventory to.'
				}, {
					name: 'amount',
					message: 'How many would you like to add?'
				}
			]).then(function(answers) {
				connection.query('UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?',
					[answers.amount, answers.id], function(err, res) {
						if(err) throw err;

						console.log(res);
					});
				connection.end();
			});
		} else if(choice === 'Add New Product') {
			inquirer.prompt([
				{
					name: 'product',
					message: 'What product would you like to add?'
				},
				{
					name: 'amount',
					message: 'Type the amount you would like to add to inventory.'
				},
				{
					name: 'price',
					message: 'At what price do you want to sell this product (just type integer)?'
				},
				{
					name: 'department',
					message: 'What department would you like this under?'
				}

			]).then(function(answers) {
				connection.query('INSERT INTO products SET ?', {
					product_name: answers.product,
					department_name: answers.department,
					price: answers.price,
					stock_quantity: answers.amount
				}, function(err, res) {
					if(err) throw err;
					console.log(res);
				});
				connection.end();
			});
		}
	});
});
