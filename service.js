const micro = require('micro');
const index = require('./index');

const server = micro(async (req,res)=>{
	index;
});
server.listen(3000);