fetch(window.location.href + '.json', {
  headers: {
    'Accept': 'application/json',
  },
})
.then(result => result.json())
.then(data => {
  console.log(data)
})

fetch('/ping', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    value: 42,
  })
})
.then(result => result.json())
.then(data => console.log(json))

window.addEventListener('load', () => {
  const boardEl = document.querySelector('#board')
  const parts = ['<div id="board" class="p4-board">']
  for(let col = 0; col < 6 ; col++){
    parts.push('<div class="col" data-col="${col}">')
    for (let row = 0; row <7 ; row++){
      part.push('<div class="cell" data-row="${row}">${col},${row}</div>')
    }
    parts.push('</div>')
  }
  parts.push('</div>')
  boardEl.innerHTMl = parts.join('')
})
