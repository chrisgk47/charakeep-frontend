const newBtn = document.querySelector("#new-character > input[type=submit]:nth-child(18)")
const charMenu = document.getElementById("char-menu")
const charactersDiv = document.querySelector(".characters")
let addChar = true
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

const achH3 = document.querySelector("h3.achievements")

newBtn.addEventListener('click', () => {
  addChar = !addChar;
  if (addChar) {
    contDiv.style.display = "block";
    const newCharForm = document.getElementById("new-character")
  } else {
    contDiv.style.display = "none";
  }

  newCharForm.addEventListener('submit', eve=> {
    eve.preventDefault()

    let newChar = {
      id: '',
      name: eve.target.name.value,
      race: eve.target.selectedIndex.value,
      class: eve.target.selectedIndex.value,
      image: eve.target.image.value,
      description: eve.target.description.value,
      stats: {
          agility: eve.target.selectedIndex.value,
          charisma: eve.target.selectedIndex.value,
          dexterity: eve.target.selectedIndex.value
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
      .then(console.log)

  })
  
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
  let firstC = charArray[0]
  detImg.src = firstC.image
  h2Name.textContent = firstC.name
  h3Race.textContent = `Race: ${firstC.race}`
  h3Class.textContent = `Class: ${firstC.class}`

  descP.textContent = ""
  descP.textContent = `${charArray[0].description}`
  hDesc.append(descP)
  
  agiP.innerHTML = ""
  charP.textContent = ""
  dextP.textContent = ""
  agiP.textContent = `AGI: ${charArray[0].stats.agility}`
  charP.textContent = `CHA: ${charArray[0].stats.charisma}`
  dextP.textContent = `DEX: ${charArray[0].stats.dexterity}`

  achH3.innerHTML = ""

  fetch("http://localhost:3000/achievements")
    .then(res => res.json())
    .then(achArr => achArr.forEach(achObj => {
      if(achObj.imageId === firstC.id){
        let achP = document.createElement('p')
        achP.textContent = achObj.content
        achH3.append(achP)
      }
    }))
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

  achH3.innerHTML = ""

  fetch("http://localhost:3000/achievements")
    .then(res => res.json())
    .then(achArr => achArr.forEach(achObj => {
      if(achObj.imageId === menuObj.id){
        let achP = document.createElement('p')
        achP.textContent = achObj.content
        achH3.append(achP)
      }
    }))
  descP.textContent = ''
  descP.textContent = menuObj.description
  hDesc.innerHTML = ''
  hDesc.append(descP)
 
}


