let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let preview = document.getElementById("preview");
let hex = document.getElementById("hex");
let color;

let image = new Image();
image.crossOrigin = "anonymous";
image.src="https://imgs.search.brave.com/6DeTpoBLnFCDXIuvuX7lbq5Hz1T3q82bEcf3aXZyS0Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odG1s/Y29sb3Jjb2Rlcy5j/b20vYXNzZXRzL2lt/YWdlcy9odG1sLWNv/bG9yLWNvZGVzLWNv/bG9yLXR1dG9yaWFs/cy5qcGc"
image.width = 200
image.height = 200
// document.querySelector("body").appendChild(image); not appening the image to the document as it just created to get referenced by the canvas

image.onload = function () {
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);
};

canvas.addEventListener("mousemove", (e) => {
  let x = canvas.getBoundingClientRect();
  let data = ctx.getImageData(e.clientX - x.left, e.clientY - x.top, 1, 1).data;
  let [r, g, b, a] = data;
  let cssColor = `rgba(${r} , ${g} , ${b}, ${a})`;
  color = rgbaToHex(r, g, b, a);
  hex.innerHTML = `Hex value is ${color}`;
  preview.style.backgroundColor = cssColor;
});

canvas.addEventListener(
  "mouseleave",
  () => (preview.style.backgroundColor = "white")
);

canvas.addEventListener("click", (e) => {
  e.preventDefault();
  navigator.clipboard.writeText(color);
  hex.innerHTML = "<button style='background-color : #0180ffff; border : 1px solid transparent;width : max-content; height : 2rem; border-radius : 5px'>Copied to clipboard</button>";
  setTimeout(() => {
    hex.innerHTML = `Hex value is ${color}`;
  }, 1000);
});

function rgbaToHex(r, g, b, a) {
  const toHex = (num) => {
    const hex = num.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const alphaHex = toHex(Math.round(a)); // Convert alpha from 0-1 to 0-255 and then to hex

  return `#${toHex(r)}${toHex(g)}${toHex(b)}${alphaHex}`;
}
