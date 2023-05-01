const gameB = (info) => {

    info = info[window.obj.id]
    let arr = [...info.substantive, ...info.verb, ...info.all]
    const speakBtn = document.querySelector(".speak__b")
    const repBtn = document.querySelector(".rep__b")
    //___________________________________
    const pB = document.querySelector(".p__b")
    const spanB = document.querySelector(".span__b")
    const resB = document.querySelector(".res__b")    
    const countB = document.querySelector(".count__b")    
    //___________________________________
    let voiceAct = false
    let num = null
    let candidate = ''
    let result = ''
    //___________________________________


    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition();
    recognition.lang = 'de';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    const { speechSynthesis } = window
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance()
    let voices = []
    const generateVoices = () => {
        voices = speechSynthesis.getVoices()
    } 
    const speak = (t) => {
        u.text = t
        u.lang = "de-DE"
        u.pitch = .8
        u.rate = .8
        speechSynthesis.speak(u)
        u.addEventListener( "start", () => voiceAct = true )
        u.addEventListener( "end", () => voiceAct = false )
    }

    generateVoices()
    speechSynthesis.addEventListener('voiceschanged', generateVoices)
    
    //___________________________________

    const game = () => {
        if (arr.length > 0) {
            num = Math.floor(Math.random() * arr.length)
            candidate = ` ${arr[num].art || ''} ${arr[num].word} `
            spanB.innerHTML = arr[num].trans
            pB.innerHTML = candidate
            resB.innerHTML = '_ _ _'
            countB.innerHTML = 'Осталось отработать: '+ arr.length
            resB.style.color = "aliceblue"
            voiceAct = false

            speak(candidate)
        } else {
            countB.innerHTML = 'Gut gemacht ✓'
        }
    }
    game()
    //___________________________________
    repBtn.addEventListener("click", () => {
        if(!voiceAct) {
           speak(candidate) 
        } 
    })

    speakBtn.addEventListener('click', () => {
        if(!voiceAct) recognition.start()
    })

    recognition.onresult = (e) => {
        result = e.results[0][0].transcript.toLowerCase()
        resB.innerHTML = result
    }
    //_____________________________________
    recognition.addEventListener('start', () => {
        speakBtn.classList.add('speak__act')
    }) 
    recognition.addEventListener('end', () => {
        speakBtn.classList.remove('speak__act')
        if (result.replace(/\s/g, "") === candidate.toLowerCase().replace(/\s/g, "")) {
            resB.style.color = "rgb(0, 255, 0)"
            voiceAct = true
            arr.splice(num, 1)
            setTimeout(game, 1000)
        } else {
            resB.style.color = "red"
        }
    }) 


}

export default gameB