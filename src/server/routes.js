const express = require('express');
const {
  createGame,
  listAllGames,
  findGame,
} = require('./data.js');
const router = express.Router()

module.exports = router

router.get('/', (req,res) => {
  listAllGames()
  .then(games =>{
    const html = renderGames(games)
    res.send(html)
  })
  .catch(err => {
    console.error('Failed',err.stack);
    res.status(500).send('Ooops')
  })
  return
})

router.get('/game/:id.json', (req,res) => {
  const id = req.params.id
  findGame(id)
  .then(game => {
    if(game === null){
      res.status(404).send({error: 'not found'})
    }else{

      res.send(game)
    }
  })
  .catch(err => {
    console.error('Failed to serve /game/....json',err.stack);
    res.status(500).send({error: 'server error'})
  })
})

router.get('/game/:id', (req,res) => {
  const id = req.params.id
  findGame(id)
  .then(game => {
    if(game === null){
      res.status(404).send('Partie inexistante')
    }else{

      res.send(`
        <html>
        <head>
        <link rel="stylesheet" href="/static/game.css"/>
        <script src="/static/game.js"></script>
        <title> Jeu ${game._id} </title>
        </head>
        <body>
        <a href="/">Retour</a>
        <h1>Jeu ${game._id}</h1>
        <div>Tour n°${game.turn}</div>
        <div id="board"></div>
        </body>

        `)
      }
    })
    .catch(err => {
      console.error('Failed to serve /game/...',err.stack);
      res.status(500).send('Ooops')
    })
  })

  router.post('/game', (req,res) => {
    const {player1,player2} = req.body
    console.log(player2);
    createGame({
      player1: player1,
      player2: player2,
    })
    .then(result => {
      res.redirect(303, '/game/' + result._id)
    })
    .catch(err => {
      console.error('Failed to create game',err.stack);
      res.status(500).send('Ooops')
    })
  })

  router.post('/ping' , (req,res) => {
    const value = req.body ? req.body.value : null
    res.send({
      response: value
    })
  })

  function renderGames(games){
    const list = games.map(game => {
      return (
        `<li>
        <a href="/game/${game._id}">${game._id}</a>
        </li>`
      );
    })
    .join('')
    console.log("list:", games, list);
    return (
      `<html>
      <head>
      <title>Puissance 4 </title>
      </head>
      <body>
      <h1>Bienvenue</h1>
      <section>
      <form action="/game" method="post">
      <input type="text" name="player1"/>
      <input type="text" name="player2"/>
      <input type="submit"/>
      </form>
      <h2>Toutes les parties</h2>
      <ul>
      ${list}
      </ul>
      </section>
      </body>
      </html>`
    );
  }
