

    // Function Image Character
export const imgCharacter = (selector, url) => {
    return selector.innerHTML = 
    `<img src="${url}" alt="Hero photo" class="hero__section--img-jpg">`;
}

export const spanContent = (selectClass, content) => {
    const ifNotHaveStat = ["null", "undefined", ""];
    document.querySelector(`.${selectClass}`).textContent = ifNotHaveStat.includes(content) ? "-" : content;
}

export const progressBar = (selectClass, content) => {
    const ifNotHaveStat = ["null", "undefined", ""];
    const ifContent = ifNotHaveStat.includes(content) ? 0 : content;
    document.querySelector(`.${selectClass}`).innerHTML = `
    <div class="progress">
        <div class="progress-bar" style="width: ${ifContent}%">
            <div class="progress-bar-text">
                ${ifContent}%
            </div>
        </div>
    </div>`;
}