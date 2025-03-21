const dice = document.querySelector('.dice');
const rollbtn = document.getElementById('roll')
const resetbtn = document.getElementById('reset')
const resultmessage = document.getElementById('message')

const dices = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685']
function rolldice() {
    const randomNumber = Math.floor(Math.random() * 6);
    dice.textContent = dices[randomNumber]
    resultmessage.textContent = `You rolled a ${randomNumber + 1}`
}

function resetdice() {
    dice.textContent = "🎲";
    message.textContent = "Roll the dice to see the result";
}
rollbtn.addEventListener('click', rolldice)
resetbtn.addEventListener('click', resetdice)