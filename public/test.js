const bcrypt = require('bcryptjs');


result = bcrypt.hashSync("gaps@12345",10);

console.log(result);