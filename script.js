const { Client } = require('pg');
const neatCsv = require('neat-csv');
const fetch = require('node-fetch');
const sheeturl = "http://meeka.org/quests.csv";
let quests;

const client = new Client({connectionString: process.env.PSQL });

client.connect();

// get csv, parse into array and insert into db
/*fetch(sheeturl,{mode:"no-cors"}).then(res => {
	console.log(res.ok);
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.headers.raw());
        console.log(res.headers.get('content-type'));
	return res.text()
}
).then(text => {
	neatCsv(text).then(data => {
		for(let q of data){
			let quest = {
				id: q.id,
				quest: q.task,
				title: q.title,
				description: q.description,
				 mind:0,
            	body: 0,
            	soul: 0,
            	community: 0,
            	thriftiness: 0,
            	pawprint: 0,
            	happiness: 0
			};
			switch(q.color){
            case "Mind":
              quest.mind = 1;
              break;
            case "Body":
              quest.body = 1;
              break;
            case "Soul":
              quest.soul = 1;
              break;
            case "Community":
              quest.community = 1;
              break;
            case "Thriftiness":
              quest.thriftiness = 1;
              break;
            case "Happiness":
              quest.happiness = 1;
              break;
            case "Pawprint":
              quest.pawprint = 1;
              break;
            default:
              break;
          }

          insertDB(quest);
		}
		console.log("DONE")
		return;
	});
	return;
});

function insertDB(quest) {
	const sql = "INSERT INTO quests(id,quest,title,description,mind,body,soul,community,thriftiness,pawprint,happiness,\"createdAt\",\"updatedAt\") Values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW(),NOW())";
	let val = Object.values(quest);
	client.query(sql,val,(err, res) => {
  		if (err) {
    		console.log(err.stack)
  		}
	});
}

*/
	
	client.query('SELECT * FROM quests ORDER BY RANDOM() LIMIT 1')
	.then(res => {
		console.log(res.rows[0]);
	});



//client.query("INSERT INTO quests(id,quest,title,description,mind,body,soul,community,thriftiness,pawprint,happiness,createdAt,updatedAt) Values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)")