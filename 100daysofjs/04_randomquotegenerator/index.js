// alert("hello")

const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
  "Do what you can, with what you have, where you are. - Theodore Roosevelt",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Your time is limited, so don’t waste it living someone else’s life. - Steve Jobs",
  "The best way to predict the future is to create it. - Peter Drucker",
  "Happiness depends upon ourselves. - Aristotle",
  "It does not matter how slowly you go as long as you do not stop. - Confucius",
  "Opportunities don't happen. You create them. - Chris Grosser",
  "The harder I work, the luckier I get. - Gary Player",
  "Don’t watch the clock; do what it does. Keep going. - Sam Levenson",
  "Everything you’ve ever wanted is on the other side of fear. - George Addair",
  "The way to get started is to quit talking and begin doing. - Walt Disney",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us. - Ralph Waldo Emerson",
  "Dream big and dare to fail. - Norman Vaughan",
]

let remainingIndex =[...quotes]

function genquote()
{
    if (remainingIndex.length == 0) {
      remainingIndex = [...quotes];
    }

    const outer = document.getElementById("quote");
    const randomindex = Math.floor(Math.random() * remainingIndex.length);
    const quote = remainingIndex[randomindex];
    remainingIndex.splice(randomindex,1)

    outer.innerHTML=`<h2 class="quote">${quote}</h2>`
}

const button = document.getElementById('btn')

button.addEventListener('click',genquote)
