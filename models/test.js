var mongoose = require('mongoose');
var testSchema = mongoose.Schema({
    name: String,
    id: String
});
var Test = mongoose.model('Test', testSchema);
module.exports = Test;