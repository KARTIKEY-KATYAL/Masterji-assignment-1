function changeBG() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6,0);
  document.body.style.backgroundColor = "#" + randomColor;
}
async function changeIMAGE() {
 try {
   const ImageURL = `https://picsum.photos/2000/1000?grayscale&blur=2&random=${Math.floor(Math.random() * 100)}`;

   const imageResponse = await fetch(ImageURL);
   if (imageResponse.ok) {
    // console.log(console.log(imageResponse.ok))
     document.body.style.backgroundImage = `url('${imageResponse.url}')`;
   } else {
     console.error("Failed to load image.");
   }
 } catch (error) {
   console.error("Error fetching image:", error);
 }
}


document.getElementById("btn1").addEventListener("click", changeBG);
document.getElementById("btn2").addEventListener("click", changeIMAGE);
