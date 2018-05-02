# meeka quest service

this is a microservice built to serve quests from mindful-meerkats quest database.

## Installation

clone this repo and configure the database connection,
read & run 
```node script.js```
then continue with
```micro```
and you'll be served

## API

this should be selfdocumenting in `index.js` but there's 3 routes currently implemented.

```/rquest```

returns a random quest

```/list5```

returns a list of 5 random quests

```/findbyid/:id```

gets a quest by its id

## TODO

```/list/:count```
shall return a list of the given length filled with random quests

```/list/:count/:type```
shall return a list of the given length filled with random quests of the given `type`
