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
// throw an error if unable to connect.
connection.connect(function(err) {
	if (err) throw err;

	console.log('connected as id ' + connection.threadId);

	connection.query('SELECT * from products', function(err, res) {
		// if(err) thow err;
		console.log("id | product name | price");
		for (var i=0; i < res.length; i++)
			console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price);
		// put inquirer within connection to ensure that inquirer happens after products
		// are listed.
		inquirer.prompt([
			{
				name:"product_id",
				message: "Please pick the id of the product you would like to buy."
			},
			{
				name:"amount",
				message: "Please type the number of units you wish to buy."
			}
		]).then(function(answers) {
			item_id = answers.product_id;
			orderedUnits = answers.amount;
			// console.log(item_id);
			connection.query('SELECT * FROM products WHERE item_id = ?',[item_id], function(err, res) {
				if(err) throw err;
				var availableQuantity = res[0].stock_quantity;
				// console.log(availableQuantity);
				if(availableQuantity < orderedUnits) {
					console.log('Sorry we do not have enough in stock.');
					connection.end();
				} else {
					availableQuantity -= orderedUnits;
					var totalPrice = orderedUnits * res[0].price;
					console.log('Congrats you just bought ' + orderedUnits + " of " + res[0].product_name + " for a total price of $" + totalPrice);
					
					// console.log('available quantity should now be: ' + availableQuantity);
					connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', 
						[availableQuantity, item_id], function(err, res) {
							if(err) throw err;

							// console.log(res);
						}
					);

					connection.end();
				}	
			});
		});
	});
	
});

