const { send } = require('micro');
const { router, get } = require('microrouter');
const { Client } = require('pg');
const client = new Client({connectionString: process.env.PSQL });


client.connect();

const rquest = async (req,rep)=>{
	let quest;
	try {
		const res = await client.query('SELECT * FROM quests ORDER BY RANDOM() LIMIT 1');
		quest = {
				id: res.rows[0].id,
				quest: res.rows[0].task,
				title: res.rows[0].title,
				description: res.rows[0].description,
				 mind: res.rows[0].mind,
            	body: res.rows[0].body,
            	soul: res.rows[0].soul,
            	community: res.rows[0].community,
            	thriftiness: res.rows[0].thriftiness,
            	pawprint: res.rows[0].pawprint,
            	happiness: res.rows[0].happiness
			};
	} catch(err){
		console.log(err.stack);
	}
	send(rep,200, quest);
}

const findbyid = async (req,rep)=>{
	let quest;
	try {
		const res = await client.query('SELECT * FROM quests WHERE id = $1',[req.params.id]);
		quest = {
				id: res.rows[0].id,
				quest: res.rows[0].task,
				title: res.rows[0].title,
				description: res.rows[0].description,
				 mind: res.rows[0].mind,
            	body: res.rows[0].body,
            	soul: res.rows[0].soul,
            	community: res.rows[0].community,
            	thriftiness: res.rows[0].thriftiness,
            	pawprint: res.rows[0].pawprint,
            	happiness: res.rows[0].happiness
			};
	} catch(err){
		console.log(err.stack);
	}
	send(rep,200, quest);
}

const list5 = async (req,rep)=>{
	let quests = []	;
	try {
		const res = await client.query('SELECT * FROM quests ORDER BY RANDOM() LIMIT 5');
		for(let row of res.rows)
			quests.push({
				id: row.id,
				quest: row.task,
				title: row.title,
				description: row.description,
				 mind: row.mind,
            	body: row.body,
            	soul: row.soul,
            	community: row.community,
            	thriftiness: row.thriftiness,
            	pawprint: row.pawprint,
            	happiness: row.happiness
			});
	} catch(err){
		console.log(err.stack);
	}
	send(rep,200, quests);
}


module.exports = router(
	get('/rquest',rquest),
	get('/find/:id',findbyid),
	get('/list5',list5)
	)