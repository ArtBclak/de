const Cards = (info) => {
    const ul = document.querySelector(".ul__cards")
    //_____Created_Cards___
    info.forEach( (i, index) => { 
        ul.innerHTML += `
        <li class="li__cards" style='background-image: url("${i.img}");'>
        <p id=${index}>Тема ${info.length - index}: ${i.title}</p>
        </li>
        `
    })
}

export default Cards