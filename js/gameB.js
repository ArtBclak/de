const gameB = (info) => {
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
        // u.addEventListener('start', () => btn.classList.add('start__b'))
        // u.addEventListener('end', () => btn.classList.remove('start__b'))
    }
    generateVoices()
    speechSynthesis.addEventListener('voiceschanged', generateVoices)
    
    //___________________________________
    info = info[window.obj.id]
    let arr = [
        ...info.substantive, ...info.verb, ...info.all
    ]
    const speakBtn = document.querySelector(".speak__b")
    const repBtn = document.querySelector(".rep__b")
    let num = null


    const game = () => {
        num = Math.floor(Math.random() * arr.length)
        speak('Hallo, mein name ist Artem!')
    }


    speakBtn.addEventListener('click', () => recognition.start())

    recognition.onresult = (e) => {
        v = e.results[0][0].transcript.toLowerCase()
    }
    
    const answer = ( a ) => {
        find = true
        let arr = Math.floor(Math.random() * (a.r.length)); 
        speak(a.r[arr]);
    }


    recognition.addEventListener('end', () => {
        console.log(v)
        

        if (v.includes('привет')) {
            answer(hi)
            return
        }
        if (v.includes('называй меня')) {
            let txt = v.split(" ")
            txt.splice(0, txt.findIndex(i => i == "называй меня")+3)
            localStorage.setItem('name', txt.join(' '))
            speak(`хорошо ${localStorage.getItem('name')}`)
            return
        }

  
    }) 



















}

export default gameB