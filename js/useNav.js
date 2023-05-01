import gameA from "./gameA.js"
import gameB from "./gameB.js"

const useNav = (info) => {
    const cards = document.querySelector(".cards")
    const cardsUl = document.querySelector(".ul__cards")

    const choice = document.querySelector(".choice")
    const choiceH = document.querySelector(".choice__h")
    const choiceBtns = document.querySelector(".btns__choice")

    const games = document.querySelector(".games")
    
    const backChoice = document.querySelector(".back__choice")
    const backGames = document.querySelector(".back__games")
    // _____Games___ 
    const gamesObj = {
        "a": gameA,
        "b": gameB,
    }
    //____Check_Storage___
    const checkStorage = () => {
        const res = JSON.parse(localStorage.getItem("choice")) || null
        if (res) {
            window.obj = res
            cards.style.display = "none"
            choiceH.textContent = res.tema
            if (res.game) {
                games.style.display = "flex"
                games.querySelector("."+res.game).style.display = "flex" 
                gamesObj[res.game](info)
            } else {
                choice.style.display = "flex"
            }
        }
    }
    checkStorage()
    //____Choice_Cards__
    cardsUl.addEventListener("click", (e) => {
        e = e.target;
        if (e.id) {     
            let obj = { id: e.id, tema: e.innerHTML, game: null }
            window.obj = obj
            localStorage.setItem("choice", JSON.stringify(obj))
            choiceH.textContent = e.innerHTML
            cards.style.display = "none"
            choice.style.display = "flex"
        }
    })
    //____Choice_Game__
    choiceBtns.addEventListener("click", e => {
        e = e.target
        if (e.id) {
            window.obj = {...window.obj, game: e.id}
            localStorage.setItem("choice", JSON.stringify(window.obj))
            choice.style.display = "none"
            games.style.display = "flex"
            games.querySelector("."+e.id).style.display = "flex" 
            gamesObj[e.id](info)
        }
    })
    //_____back_____
    backChoice.addEventListener("click", () => {
        localStorage.removeItem("choice")
        cards.style.display = "flex"
        choice.style.display = "none"
    })
    backGames.addEventListener("click", () => {
        const game = games.querySelector("."+window.obj.game)
        window.obj.game = null
        localStorage.setItem("choice", JSON.stringify(window.obj))
        choice.style.display = "flex"
        games.style.display = "none"
        game.style.display = "none"
    })
}

export default useNav