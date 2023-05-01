import Info from "./info.js"
import useNav from "./useNav.js"
import Cards from "./cards.js"

document.addEventListener("DOMContentLoaded", () => {
    const info = Info().reverse()
    Cards(info)
    useNav(info)

})