const { send } = require('micro');
const { router, get } = require('microrouter');
const jwtAuth = require('micro-jwt-auth');
const { Client } = require('pg');
const client = new Client({connectionString: process.env.PSQL });
const secret = process.env.JWT_SECRET;


client.connect();

const rquest = async (req,rep)=>{
  let quest;
  try {
    const res = await client.query('SELECT * FROM quests ORDER BY RANDOM() LIMIT 1');
    quest = {
        id: res.rows[0].id,
        quest: res.rows[0].quest,
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
  if (!req.params.id) {
    send(rep,400, "Missing parameters");
    return;
  }

  let quest;
  try {
    const res = await client.query('SELECT * FROM quests WHERE id = $1',[req.params.id]);
    quest = {
        id: res.rows[0].id,
        quest: res.rows[0].quest,
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
  let quests = [] ;
  try {
    const res = await client.query('SELECT * FROM quests ORDER BY RANDOM() LIMIT 5');
    for(let row of res.rows)
      quests.push({
        id: row.id,
        quest: row.quest,
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

const list = async (req,rep)=>{
  if (!req.params.count) {
    send(rep,400, "Missing parameters");
    return;
  }

  let quests = [];
  try {
    const res = await client.query('SELECT * FROM quests ORDER BY RANDOM() LIMIT $1',[req.params.count]);
    for(let row of res.rows)
      quests.push({
        id: row.id,
        quest: row.quest,
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

const typedlist = async (req,rep)=>{
  if (!(req.params.count || req.params.type)) {
    send(rep,400,"Missing parameters");
    return;
  }

  let quests = [];
  try {
    const res = await client.query('SELECT * FROM quests WHERE $1 > 0 ORDER BY RANDOM() LIMIT $2',[req.params.type,req.params.count]);
    for(let row of res.rows)
      quests.push({
        id: row.id,
        quest: row.quest,
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

const current = jwtAuth(token)(async(req,rep)=>{
    let quests = [];
    try {
      const res = await client.query('SELECT * FROM current_quests WHERE user_id = $1',[req.jwt.user]);
    for(let row of res.rows)
      quests.push({
        id: row.id,
        quest: row.quest,
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
    send(rep,500,json.stringify(err.stack));
  }
  send(rep,200,quests)
  })

const questStatus = jwtAuth(token)(async(req,rep)=>{
  if (!(req.params.id || req.params.code)) {
    send(rep,400,"Missing parameters");
    return;
  }
  try {
    const res = await client.query('SELECT quest_id FROM quest.history WHERE user_id = $1 AND quest_id = $2',[req.jwt.user,req.params.id]);
    if (res.rowCount < 1) {
      const res = await client.query('INSERT INTO quest.history VALUES($1,$2,$3,$4)',[req.jwt.user,req.params.id,req.params.status,json(req.body)]);
      send(req,201,rowCount);
    }
    const res = await client.query(
      'UPDATE quest.history SET status = $3, inserted_at = $4 WHERE user_id = $1 AND quest_id = $2',
      [req.jwt.user,req.params.id,req.params.status,json(req.body)])
    send(req,200,res.rowCount)
  } catch(err){
    console.log(err.stack);
    send(rep,500,json.stringify(err.stack));
  }
  })


module.exports = router(
  get('/rquest',rquest),
  get('/find/:id',findbyid),
  get('/list5',list5),
  get('/list/:count',list),
  get('/list/:count/:type',typedlist),
  // account related quest routes
  get('/current',current),
  post('/status/:id/:code',questStatus)
  )