const newBtn = document.querySelector("#new-character > input[type=submit]:nth-child(18)")
const charMenu = document.getElementById("char-menu")
const charactersDiv = document.querySelector(".characters")
let addChar = false
const contDiv = document.querySelector(".container")

const detImg = document.querySelector("img.detail-image")
const h2Name = document.querySelector("h2.name")
const h3Race = document.querySelector("h3.race")
const h3Class = document.querySelector("h3.class")
const hDesc = document.querySelector("h3.description")

const statsDiv = document.getElementById("stats")
const agiP = document.getElementById("agi")
const charP = document.getElementById("cha")
const dextP = document.getElementById("dex")
const descP = document.createElement("p")

newBtn.addEventListener('click', () => {
  addChar = !addChar;
  if (addChar) {
    contDiv.style.display = "block";
  } else {
    contDiv.style.display = "none";
  }
})

fetch('http://localhost:3000/characters')
  .then(res => res.json())
  .then(charArray => {
    firstCard(charArray)
    charArray.forEach(charObj => {
      menuList(charObj)
    })
  })

function menuList(charObj){
  let img = document.createElement('img')
  img.src = charObj.image
  img.dataset.id = charObj.id

  charMenu.append(img)
}

function firstCard(charArray){
  detImg.src = charArray[0].image
  h2Name.textContent = `Name: ${charArray[0].name}`
  h3Race.textContent = `Race: ${charArray[0].race}`
  h3Class.textContent = `Class: ${charArray[0].class}`
  descP.textContent = ""
  descP.textContent = `${charArray[0].description}`
  hDesc.append(descP)
  
  agiP.innerHTML = ""
  charP.textContent = ""
  dextP.textContent = ""
  agiP.textContent = `AGI: ${charArray[0].stats.agility}`
  charP.textContent = `CHA: ${charArray[0].stats.charisma}`
  dextP.textContent = `DEX: ${charArray[0].stats.dexterity}`

  



}

charMenu.addEventListener('click', event => {

    fetch(`http://localhost:3000/characters/${event.target.dataset.id}`)
    .then(res => res.json())
    .then(menuObj => detailCard(menuObj))
  }
)

function detailCard(menuObj){

  detImg.src = menuObj.image
  
  agiP.innerHTML = ""
  charP.textContent = ""
  dextP.textContent = ""
  agiP.textContent = `AGI: ${menuObj.stats.agility}`
  charP.textContent = `CHA: ${menuObj.stats.charisma}`
  dextP.textContent = `DEX: ${menuObj.stats.dexterity}`



  h2Name.textContent = menuObj.name
  h3Race.textContent = `Race: ${menuObj.race}`
  h3Class.textContent = `Class: ${menuObj.class}`
  descP.textContent = ''
  descP.textContent = menuObj.description
  hDesc.innerHTML = ''
  hDesc.append(descP)
 
}

const newCharForm = document.getElementById("new-character")

newCharForm.addEventListener('submit', eve=> {
  eve.preventDefault()

  let newChar = {
    id: '',
    name: eve.target.name.value,
    race: eve.target.selectedIndex,
    class: eve.target.selectedIndex,
    image: eve.target.image.value,
    description: eve.target.description.value,
    stats: {

    }
}

fetch('http://localhost:3000/characters', {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
    },
    body: JSON.stringify(newChar)
})
.then(res => res.json())
.then(charObj => {
    menuList(charObj)

    commForm.reset()
})

})
