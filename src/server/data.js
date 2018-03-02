const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const game = require('../../index.js')

const url = `mongodb://mongo:27017`
const dbName = 'connect4'
const colName = 'games'

const connectionPromise = MongoClient.connect(url)

module.exports = {
  getCollection,
  createGame,
  findGame,
  saveGameTurn,
  listAllGames,
}

//Récupération de le collection
function getCollection() {
  return connectionPromise
  .then(client => {
    const db = client.db(dbName)
    const col = db.collection(colName)
    return col
  })
}

//Création du jeu
function createGame() {
  const doc = Object.assign({
    turn: 0,
    history: [{
      board: game.createEmptyBoard(),
    }]
  },/*data*/)
  return getCollection()
  .then(col => {
    return col.insertOne(doc)
  })
  .then(opResult => {
    if (opResult.result.ok === 1) {
      return opResult.ops[0]
    } else {
      throw new Error('Failed to insert document')
    }
  })
}
//Transforme un string en un id mongo
function toObjectId(id) {
  if (typeof id === 'string') {
    if(ObjectID.isValid(id)){
      return ObjectID(id)
    }else{
      return null;
    }
  } else {
    return id
  }
}
//Trouver une partie
function findGame(id) {
  return getCollection()
  .then(col => {
    return col.findOne({
      _id: toObjectId(id),
    })
  })
}
//Sauvegarde les tours
function saveGameTurn(id, turn, board) {
  return getCollection()
  .then(col => {
    const filter = {_id: toObjectId(id)}
    const update = {
      $set: {turn: turn},
      $push: {history: {board}},
    }
    return col.updateOne(filter, update)
  })
}

createGame()
.then(doc => {
  const id = doc._id
  return saveGameTurn(id, 3, [1, 2, 3])
  .then(result => {
    console.log(result)
    // return findGame(String(id))
  })
})
.then(result => {
  console.log(result)
})
.catch(err => {
  console.error(err.stack)
  process.exit(1)
})

function testCreateGame() {
  createGame()
  .then(result => {
    console.log(result)
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
}
// Liste toutes les games
function listAllGames(){
  return getCollection()
  .then(col => col.find({}))
  .then(cursor =>{
    return cursor
    .sort({_id: -1})
    .project({turn: 0})
    .toArray()
  })
}
