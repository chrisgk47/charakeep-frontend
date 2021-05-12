//define vars
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


const newCharForm = document.getElementById("new-character")
const charDb = "http://localhost:3000/characters"
const achvDb = "http://localhost:3000/achievements"

const newChar = {}
let intAch = parseInt(ev.target.dataset.id)

//form hide and seek and post--working
newBtn.addEventListener('click', () => {
  addChar = !addChar;
  if (addChar) {
    contDiv.style.display = "block";
    newCharForm
    // const newCharForm = document.getElementById("new-character") --when defined here it doesn't get called
  } else {
    contDiv.style.display = "none";
  }
  
  //submit form listener -- working
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
    // function newCard(newChar){  //thought that maybe adding card function to post would help sync data. maybe just need to define a function below and call it like how we did with post method

    //   detImg.src = newChar.image
      
    //   agiP.innerHTML = ""
    //   charP.textContent = ""
    //   dextP.textContent = ""
    //   agiP.textContent = `AGI: ${newChar.stats.agility}`
    //   charP.textContent = `CHA: ${newChar.stats.charisma}`
    //   dextP.textContent = `DEX: ${newChar.stats.dexterity}`
    
    //   h2Name.textContent = menuObj.name
    //   h3Race.textContent = `Race: ${newChar.race}`
    //   h3Class.textContent = `Class: ${newChar.class}`
    //   descP.textContent = ''
    //   descP.textContent = `${newChar.description}`
    //   hDesc.innerHTML = ''
    //   hDesc.append(descP)
     
    // }

    //call post function -- adds new char instance but not fully functioning
    postChar(newCard)
  })
})

//define post function
//what is currently happening with post: does not add to db, loads first card instead of input data
const postChar = () => {
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

        // newCharForm.reset() removed temp as for some reason prevents new instance from being added
      })
}
//fetch all chars -- working
fetch('http://localhost:3000/characters')
  .then(res => res.json())
  .then(charArray => {
    firstCard(charArray)
    charArray.forEach(charObj => {
      menuList(charObj)
    })
  })

//create menu list -- working
function menuList(charObj){
  let img = document.createElement('img')
  img.src = charObj.image
  img.dataset.id = charObj.id

  charMenu.append(img)
}

//set first card value -- working
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



//listen for click on menu obj and load char -- working
charMenu.addEventListener('click', event => {
    fetch(`http://localhost:3000/characters/${event.target.dataset.id}`)
    .then(res => res.json())
    .then(menuObj => detailCard(menuObj))
  }
)

//define details for char loaded -- working for predefined chars but not for newly added
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

//post ach
achForm.addEventListener('submit', ev => {
  ev.preventDefault()
  intAch // let intAch = parseInt(ev.target.dataset.id) //for some reason not getting called
  fetch(`http://localhost:3000/achievements`, {
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
  }
  .then(res => res.json())
  .then(achObj => {
        achP.textContent = achObj.content
        achH3.append(achP)
  })
)

//delete char
deleteBtn.addEventListener('click', e => {
    fetch(`http://localhost:3000/characters/${e.target.dataset.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(e.target.remove())
  console.log("removed")
})



//TO DO: 
  //>problem with post could stem from
    //-menuObj in detailCard? would charObj get our detail? would still want detailCard as a function for menu
      //-create another that takes charObj as an argument?
  //edit/patch function --will require slight addition to css/html
  //delete function -- will require slight addition to css/html