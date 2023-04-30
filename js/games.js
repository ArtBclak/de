
const Games = (info) => {
    info = info[window.obj.id]
    
    let num = null
    let fail = false

    let a = info.substantive
    const aP = document.querySelector(".p__a")
    const aSpan = document.querySelector(".span__a")
    const aPanel = document.querySelector(".buttons__a")
    const aBtns = document.querySelectorAll(".btn__a")
    const aCount = document.querySelector(".count__a")
    const aStars = document.querySelectorAll(".star__a")

    const getRandom = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const gameA = () => {
        for(let i = 0; i < aBtns.length; i++) {
            aBtns[i].classList.remove("btn__a--fail")
        }
        if (a.length > 0) {
            aCount.innerHTML = "Осталось выучить : " + a.length
            num = getRandom(0, a.length)
            fail = false
            let data = a[num]
            aP.innerHTML = data.word
            aSpan.innerHTML = data.trans.join(', ')
            for(let i = 0; i < aStars.length; i++) {
                if (i+1 <= data.points) {
                    aStars[i].style.color = "orange"
                } else {
                    aStars[i].style.color = "#cccccc"
                }
            }            
        } else {
            for(let i = 0; i < aStars.length; i++) {
                aStars[i].style.color = "orange"
            }
            aCount.innerHTML = "Задание пройдено ✓"
        }
    }
    gameA()
            
    aPanel.addEventListener("click", e => {
        if (a.length > 0) {
            e = e.target
            let data = a[num]
            if (e.id && data.art === e.id) {
                info.substantive
                if(!fail) a[num].points = a[num].points ? 1 + a[num].points : 1
                if(a[num].points === 3) a.splice(num, 1)
                gameA()
            } 
            if (e.id && data.art !== e.id) {
                e.classList.add("btn__a--fail")
                fail = true
            }
        }
    })

}
export default Games 