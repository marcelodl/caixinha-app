var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
	name: String,
	value: {type: Number, min: 0.01},
	itemType: {type: Number}
});

var PurchaseSchema = new mongoose.Schema({
	items: [ItemSchema],
	date: {type: Date, default: Date.now()},
	totalValue: {type: Number, min: 0.01}
});

mongoose.model('Item',ItemSchema);
mongoose.model('Purchase',PurchaseSchema);