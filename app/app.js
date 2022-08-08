import { API, KEY } from "./config.js";
import { superhero } from "./superhero.js"
import * as view from './view.js';

const nameCharacter = document.querySelector(".hero__section--name h3")
const imageCharacter = document.querySelector(".hero__section--img");
const input = document.querySelector(".search__section-form_input");
const allVersions = document.querySelector(".hero__section--name-version");
const btnRandom = document.querySelector(".search__section-btn")
const btnSearch = document.querySelector(".search__section-form_label")



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

    view.spanContent("span_fullname", objectBio[0]);
    view.spanContent("span_aliases", objectBio[2].join(", "));
    view.spanContent("span_gender", gender);
    view.spanContent("span_placeofbirth", objectBio[3]);
    view.spanContent("span_publisher", objectBio[5]);
    view.spanContent("span_race", race);
    view.spanContent("span_height", height.join(" | "));
    view.spanContent("span_weight", weight.join(" | "));


/*-------------- Powerstats -------------- */
view.spanContent("span_intelligence", intelligence);
view.spanContent("span_strength", strength);
view.spanContent("span_speed", speed);
view.spanContent("span_durability", durability);
view.spanContent("span_power", power);
view.spanContent("span_combat", combat);

/*-------------- Character description -------------- */
const groupAffiliation = Object.values(connections);

view.spanContent("span_occupation", occupation);
view.spanContent("span_base", base);
view.spanContent("span_group_affiliation", groupAffiliation[0]);

  } catch(err) {
    throw err;
  }
}


/*-------------- Random Characters -------------- */

let randomId = Math.floor(Math.random() * superhero.length);

btnRandom.addEventListener('click', () => {
  allVersions.innerHTML = "";
  randomId = Math.floor(Math.random() * superhero.length)
  character(`search/${superhero[randomId]}`);
})

character(`search/${superhero[randomId]}`);

/*-------------- Search Input -------------- */
btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  character(`search/${input.value}`);
  input.value = "";
  allVersions.innerHTML = "";
});

input.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    btnSearch.click()
  }
})

allVersions.addEventListener('click', (event) => {
  event.preventDefault();
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }

  const id = +(event.target.value)
  character(`${id}`)
})