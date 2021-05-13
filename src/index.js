const charMenu = document.getElementById("char-menu")
const charactersDiv = document.querySelector(".characters")
let addChar = true
const contDiv = document.querySelector(".container")
const detImg = document.querySelector("img.detail-image")
const h2Name = document.getElementById("c-name")
const h3Race = document.getElementById("c-race")
const h3Class = document.getElementById("c-class")
const hDesc = document.getElementById("c-descrip")
const agiP = document.getElementById("agi")
const charP = document.getElementById("cha")
const dextP = document.getElementById("dex")
const descP = document.createElement("p")
const achUl = document.getElementById('ach-ul')
const achLi = document.createElement('li')

const newBtn = document.querySelector("#form-container > button")
const newCharForm = document.getElementById('new-character')
const achForm = document.querySelector(".ach-form")
const achDeleteBtn = document.getElementById('achdel-btn')
const deleteBtn = document.querySelector('.delete-button')
const editForm = document.getElementById('edit-form')


//hide and seek new char form
newBtn.addEventListener('click', () => {
  addChar = !addChar;
  if (addChar) {
    contDiv.style.display = "block";
    const newCharForm = document.getElementById("new-character")
  } else {
    contDiv.style.display = "none";
  }
})
//create menu from chars
fetch('http://localhost:3000/characters')
  .then(res => res.json())
  .then(charArray => {
    firstCard(charArray)
    charArray.forEach(charObj => {
      menuList(charObj)
    })
  })
//add obj to menu
function menuList(charObj){
  let img = document.createElement('img')
  img.src = charObj.image
  img.dataset.id = charObj.id
  achForm.dataset.id = charObj.id
  charMenu.append(img)
}
//define first card
function firstCard(charArray){
  let firstC = charArray[0]
  detImg.dataset.id = firstC.id
  //front card
  detImg.src = firstC.image
  h2Name.textContent = firstC.name
  h3Race.textContent = `Race: ${firstC.race}`
  h3Class.textContent = `Class: ${firstC.class}`
  agiP.innerHTML = ""
  charP.textContent = ""
  dextP.textContent = ""
  agiP.textContent = `AGI: ${charArray[0].stats.agility}`
  charP.textContent = `CHA: ${charArray[0].stats.charisma}`
  dextP.textContent = `DEX: ${charArray[0].stats.dexterity}`
  //back card
  descP.textContent = ""
  descP.textContent = `${charArray[0].description}`
  descP.dataset.id = `${charArray[0].id}`
  hDesc.append(descP)
  editForm.dataset.id = `${charArray[0].id}`
  
  achUl.innerHTML = ""
  fetch("http://localhost:3000/achievements")
    .then(res => res.json())
    .then(achArr => achArr.forEach(achObj => {
      if(achObj.imageId == firstC.id){
        let achLi = document.createElement('li')
        achLi.textContent = achObj.content
        let achBtn = document.createElement('BUTTON')
        achBtn.classList.add("achdel-btn")
        achBtn.dataset.id = achObj.id
        achBtn.textContent = "X"
        achLi.appendChild(achBtn)
        achUl.append(achLi)
      }
    }))
}
//load char card on click from menu
charMenu.addEventListener('click', event => {
    fetch(`http://localhost:3000/characters/${event.target.dataset.id}`)
    .then(res => res.json())
    .then(menuObj => detailCard(menuObj))
  }
)
//define data for cards from db
function detailCard(menuObj){
  //front card
  deleteBtn.dataset.id = menuObj.id
  detImg.dataset.id = menuObj.id
  detImg.src = menuObj.image
  h2Name.textContent = menuObj.name
  h3Race.textContent = `Race: ${menuObj.race}`
  h3Class.textContent = `Class: ${menuObj.class}`
  agiP.innerHTML = ""
  charP.textContent = ""
  dextP.textContent = ""
  agiP.textContent = `AGI: ${menuObj.stats.agility}`
  charP.textContent = `CHA: ${menuObj.stats.charisma}`
  dextP.textContent = `DEX: ${menuObj.stats.dexterity}`

  editForm.dataset.id = menuObj.id

  fetch("http://localhost:3000/achievements")
  .then(res => res.json())
  .then(achArr => achArr.forEach(achObj => {
    if(achObj.imageId === menuObj.id){
      let achLi = document.createElement('li')
      achLi.textContent = achObj.content
      let achBtn = document.createElement('BUTTON')
      achBtn.classList.add("achdel-btn")
      achBtn.dataset.id = achObj.id
      achBtn.textContent = "X"
      achLi.appendChild(achBtn)
      achUl.append(achLi)

      achBtn.addEventListener('click', ev => {
        fetch(`http://localhost:3000/achievements/${ev.target.dataset.id}`, {
            method: "DELETE"
          })
          .then(res => res.json())
          .then(achObj => {
            ev.target.remove();
            refreshPage();
            console.log("removed");
          })
      })
    }
  }))
  achForm.dataset.id = menuObj.id
  descP.dataset.id = menuObj.id
  achUl.innerHTML = ""
  descP.textContent = ''
  descP.textContent = menuObj.description
  hDesc.innerHTML = ''
  hDesc.append(descP)
}
//create new char
newCharForm.addEventListener('submit', eve => {
  eve.preventDefault()
  function getRandomNum(min, max){
    const r = Math.random()*(max-min)+min
    return Math.floor(r)
  }
  let newChar = {
      "id": '',
      "name": eve.target.name.value,
      "race": eve.target.race.value,
      "class": eve.target.class.value,
      "image": eve.target.image.value,
      "description": eve.target.description.value,
      "stats": {
          agility: getRandomNum(0, 21),
          charisma: getRandomNum(0, 21),
          dexterity: getRandomNum(0, 21)
      }
  }
  console.log(newChar)
  fetch('http://localhost:3000/characters', {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
          'accept': 'application/json'
      },
      body: JSON.stringify(newChar)
  })
    .then(res => res.json())
    .then(newObj => {
      detailCard(newObj)
      menuList(newObj)
    })
    newCharForm.reset()
})
//submit new achv
achForm.addEventListener('submit', ev => {
  ev.preventDefault()
  
  let intAch = parseInt(ev.target.dataset.id)
  
  fetch('http://localhost:3000/achievements', {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
    },
    body: JSON.stringify({
      id: '',
      imageId: intAch,
      content: ev.target.achievement.value
    })
  })
  .then(res => res.json())
  .then(achObj => {
        achLi.textContent = achObj.content
        let achBtn = document.createElement('BUTTON')
        achBtn.classList.add("achdel-btn")
        achBtn.dataset.id = achObj.id
        achBtn.textContent = "X"
        achLi.appendChild(achBtn)
        achUl.append(achLi)
  })

  // fetch('http://localhost:3000/achievements', {})

})
//delete a char
deleteBtn.addEventListener('click', e => {
    fetch(`http://localhost:3000/characters/${e.target.dataset.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(e.target.remove())
    refreshPage()
  console.log("removed")
})
//refresh function
function refreshPage(){
  if(confirm("Are you sure you want to delete this character?")){
    location.reload();
  }
}


editForm.addEventListener('submit', e => {
  e.preventDefault()

  const editInput = e.target.edit.value
  let patchedDes = {description: editInput}
  
  fetch(`http://localhost:3000/characters/${e.target.dataset.id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(patchedDes)
  })
  .then(res => res.json())
  .then(editObj => {
    descP.innerHTML = ""
    descP.textContent = editObj.description
    console.log(editObj)
    editForm.reset()
  })
})
