document.addEventListener("DOMContentLoaded", function () {
  function isValidHexaCode(str) {
    if (str[0] !== "#") return false;
    if (str.length !== 4 && str.length !== 7) return false;

    const validChars = /^[0-9A-Fa-f]+$/;
    return validChars.test(str.slice(1));
  }

  function copyColor() {
    const colorInput = document.getElementById("colorInput");
    let color = colorInput.value.trim(); // Trim the value

    if (!isValidHexaCode(color)) {
      alert("Enter a valid hex value");
      return;
    }

    navigator.clipboard.writeText(color).then(() => {
      alert("Copied!!");
    });
  }

  function complimentaryStr(color) {
    const base = color.slice(1); // Remove the '#'
    const baseValue = parseInt(base, 16);
    const comp = 0xffffff ^ baseValue; // Complement the color

    const compStr = comp.toString(16).padStart(6, "0"); // Ensure 6-digit hex
    return `#${compStr}`;
  }

  function onEnterColor() {
    const originalColorBox = document.getElementById("selectedColor");
    const compColorBox = document.getElementById("complementaryColor");

    if (!colorInput || !originalColorBox || !compColorBox) {
      console.error("One or more elements are missing.");
      return;
    }

    let color = colorInput.value.trim(); // Trim input

    if (!isValidHexaCode(color)) return;

    const complimentaryColor = complimentaryStr(color);

    originalColorBox.style.backgroundColor = color;
    compColorBox.style.backgroundColor = complimentaryColor;
  }

  function saveelement() {
    let color = colorInput.value.trim();
    savedarr.push(color);
    console.log(savedarr);
    const newbox = document.createElement("div");
    newbox.classList.add("color-box");
    newbox.style.backgroundColor = color;
    const outerbox = document.getElementById("savedColors");
    outerbox.appendChild(newbox);
  }

  const colorInput = document.getElementById("colorInput");
  const copybtn = document.getElementById("copy-btn");
  const savebtn = document.getElementById("save-btn");
  const savedarr = [];
  copybtn.addEventListener("click", copyColor);
  savebtn.addEventListener("click", saveelement);
  if (colorInput) {
    colorInput.addEventListener("input", onEnterColor);
  }
});
