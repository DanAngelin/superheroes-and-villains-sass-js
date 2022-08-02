

    // Function Image Character
export const imgCharacter = (selector, url) => {
    return selector.innerHTML = 
    `<img src="${url}" alt="Hero photo" class="hero__section--img-jpg">`;
}

export const spanContent = (selectClass, content) => {
    const ifNotHaveStat = ["null", "undefined", ""];
    document.querySelector(`.${selectClass}`).textContent = ifNotHaveStat.includes(content) ? "-" : content;
}