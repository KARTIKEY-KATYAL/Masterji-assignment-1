let countdown
function startTimer() {
    clearInterval(countdown)
    const timeInput = document.getElementById("timeInput").value
    let time = parseInt(timeInput)
    const timedisplay = document.getElementById("timer")

    function updateTime() {
        const minutes = Math.floor(time/60)
        const seconds = Math.floor(time%60)

        const min = minutes.toString().padStart(2,'0')
        const sec = seconds.toString().padStart(2,'0')

        timedisplay.textContent = `${min}:${sec}`
    }

    updateTime()

    countdown = setInterval(()=>{
        if (time > 0){
            time--
            updateTime()
        }else{
            clearInterval(countdown)
            alert("Times up")
        }
    },1000)
}