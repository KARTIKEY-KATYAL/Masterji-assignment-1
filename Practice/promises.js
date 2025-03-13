const joke = fetch(
  "https://api.freeapi.app/api/v1/public/randomjokes?limit=10&query=science&inc=categories%252Cid%252Ccontent&page=1"
)
.then((joke)=>{
    const result =  joke.json().then((joke)=>{
        const id = joke.data.data
        console.log(id)
        id.forEach(element => {
            console.log(element.content)
            
        });
    })
    
})
// console.log('The joke is ',joke)

// async function getjoke() {
//     const joke = await fetch(
//       "https://api.freeapi.app/api/v1/public/randomjokes?limit=10&query=science&inc=categories%252Cid%252Ccontent&page=1"
//     );
// }

