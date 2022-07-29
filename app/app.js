import { API, KEY } from "./config.js";
import { superhero } from "./superhero.js"
import * as view from './view.js';

const nameCharacter = document.querySelector(".hero__section--name h3")
const imageCharacter = document.querySelector(".hero__section--img");
const detailsCharacter = document.querySelector(".hero__section--1-details");
const powerCharacter = document.querySelector(".hero__section--2-power");
const descriptionCharacter = document.querySelector(".hero__section--3-description");
const input = document.querySelector(".search__section-form_input");
const allVersions = document.querySelector(".hero__section--name-version");
const btnRandom = document.querySelector(".search__section-btn")
const ifNotHaveStat = ["null", "undefined"]


/*-------------- Async function -------------- */
const character = async(idName) => {
  try{
    const response = await fetch(`${API}/${KEY}/${idName}`);
    const result = await response.json();
    let data = null
    result.results ? data = result.results[0] : data = result;

    const { name, 
            image: {url},
            biography,
            appearance: {gender, race, height, weight},
            powerstats: {combat, durability, intelligence, power, speed, strength},
            work: {base, occupation},
            connections }= data;

            
/*-------------- List All Version Character -------------- */
        result.results?.length > 1 ? result.results.map(item => {
          allVersions.insertAdjacentHTML('beforeend', `<button value=${item.id}>${item.name}</button>`)
    }) : "";
    

/*-------------- Image Character -------------- */
view.imgCharacter(imageCharacter, url);

/*-------------- Name Character -------------- */
nameCharacter.textContent = name;


/*-------------- Details Character -------------- */
    const objectBio = Object.values(biography);
    detailsCharacter.innerHTML =
    `
    <p><span class="title--paragraph">Full Name: </span>${objectBio[0]}</p>
    <p><span class="title--paragraph">Aliases: </span>${objectBio[2].join(", ")}</p>
    <p><span class="title--paragraph">Gender: </span>${gender}</p>
    <p><span class="title--paragraph">Place of Birth: </span>${objectBio[3]}</p>
    <p><span class="title--paragraph">Publisher: </span>${objectBio[5]}</p>
    <p><span class="title--paragraph">Race: </span>${ifNotHaveStat.includes(race) ? "-" : race}</p>
    <p><span class="title--paragraph">Height: </span>${height.join(" | ")}</p>
    <p><span class="title--paragraph">Weight: </span>${weight.join(" | ")}</p>
    `;


/*-------------- Powerstats -------------- */
    powerCharacter.innerHTML = 
    `
    <p><span class="title--paragraph">Intelligence: </span>${ifNotHaveStat.includes(intelligence) ? "-" : intelligence}</p>
    <p><span class="title--paragraph">Strength: </span>${ifNotHaveStat.includes(strength) ? "-" : strength}</p>
    <p><span class="title--paragraph">Speed: </span>${ifNotHaveStat.includes(speed) ? "-" : speed}</p>
    <p><span class="title--paragraph">Durability: </span>${ifNotHaveStat.includes(durability) ? "-" : durability}</p>
    <p><span class="title--paragraph">Power: </span>${ifNotHaveStat.includes(power) ? "-" : power}</p>
    <p><span class="title--paragraph">Combat: </span> ${ifNotHaveStat.includes(combat) ? "-" : combat}</p>
    `;


/*-------------- Character description -------------- */
    const groupAffiliation = Object.values(connections);
    descriptionCharacter.innerHTML =
    `
    <p><span class="title--paragraph">Occupation: </span>${occupation}</p>
    <p><span class="title--paragraph">Base: </span>${base}</p>
    <p><span class="title--paragraph">Group Affiliation: </span>${groupAffiliation[0]}</p>
    `
  } catch(err) {
    throw err;
  }
}


/*-------------- Random Characters -------------- */

const arrayHeroes = ["Exodus", "Batgirl", "Professor X", "Ben 10", "General Zod", "Loki", "Boba Fett", "Enchantress", "Captain America", "Thor", "Thor Girl", "Spider-Man", "Green Arrow", "Yoda", "Quicksilver", "Groot", "Deadpool", "Robin", "Aquaman", "Flash", "Goku"]
let randomId = Math.floor(Math.random() * superhero.length);

btnRandom.addEventListener('click', () => {
  allVersions.innerHTML = "";
  randomId = Math.floor(Math.random() * superhero.length)
  character(`search/${superhero[randomId]}`);
})

character(`search/${superhero[randomId]}`);



/*-------------- Search Input -------------- */
document.querySelector(".search__section-form_label").addEventListener("click", (e) => {
  e.preventDefault();
  character(`search/${input.value}`);
  input.value = "";
  allVersions.innerHTML = "";
});

allVersions.addEventListener('click', (event) => {
  event.preventDefault();
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }

  const id = +(event.target.value)
  character(`${id}`)
})