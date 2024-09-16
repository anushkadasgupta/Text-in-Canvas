const canvas=document.getElementById("myCanvas");
const ctx=canvas.getContext("2d");
const undo=document.getElementById("undo-icon");
const redo=document.getElementById("redo-icon");
const textInput=document.getElementById("textInput");
const bold=document.getElementById("bold-icon");
const italic=document.getElementById("italic-icon");
const center=document.getElementById("center-icon");
const underline=document.getElementById("underline-icon");
const modal=document.getElementById("myModal");
const s1=document.getElementById("style1");
const s2=document.getElementById("style2");
const s3=document.getElementById("style3");
const s4=document.getElementById("style4");
const s5=document.getElementById("style5");
const minus=document.getElementById("minus-button");
const plus=document.getElementById("plus-button");
const states = [];

let currentfontsize="20"; 
let currentfontstyle="normal";
let currentfontfamily="sans-serif";
let currentStateIndex = -1;

textInput.addEventListener("input", () => {
  ctx.font = `${currentfontstyle} ${currentfontsize}px ${currentfontfamily}`;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(textInput.value, 10, 30);
  ctx.fillStyle = "red";
  saveState();
});

function displayfont() {
  modal.style.display="block";
  window.onclick = function(event) {
    if (event.target == modal)
    {
      modal.style.display = "none";
    }
  }
}

s1.addEventListener("click", () => {
  currentfontfamily="Arial";
  ctx.font = `${currentfontstyle} ${currentfontsize}px ${currentfontfamily}`;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(textInput.value, 10, 30);
  saveState();
}); 

s2.addEventListener("click", () => {
  currentfontfamily="cursive";
  ctx.font = `${currentfontstyle} ${currentfontsize}px ${currentfontfamily}`;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(textInput.value, 10, 30);
  saveState();
});

s3.addEventListener("click", () => {
  currentfontfamily="Times New Roman";
  ctx.font = `${currentfontstyle} ${currentfontsize}px ${currentfontfamily}`;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(textInput.value, 10, 30);
  saveState();
});

s4.addEventListener("click", () => {
  currentfontfamily="Courier New";
  ctx.font = `${currentfontstyle} ${currentfontsize}px ${currentfontfamily}`;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(textInput.value, 10, 30);
  saveState();
});

s5.addEventListener("click", () => {
  currentfontfamily="Verdana";
  ctx.font = `${currentfontstyle} ${currentfontsize}px ${currentfontfamily}`;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(textInput.value, 10, 30);
  saveState();
});

minus.addEventListener("click", () => {
  if (currentfontsize > 10) {
  currentfontsize -= 1;
  ctx.font = `${currentfontstyle} ${currentfontsize}px ${currentfontfamily}`; 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(textInput.value, 10, 30);
  saveState();
  }
});

plus.addEventListener("click", () => {
  currentfontsize += 1;
  ctx.font = `${currentfontstyle} ${currentfontsize}px ${currentfontfamily}`; 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(textInput.value, 10, 30);
  saveState();
});

bold.onclick=function() {
  currentfontstyle="bold";
  ctx.font = `${currentfontstyle} ${currentfontsize}px ${currentfontfamily}`;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(textInput.value, 10, 30);
  saveState();
}

italic.onclick=function() {
  currentfontstyle="italic";
  ctx.font = `${currentfontstyle} ${currentfontsize}px ${currentfontfamily}`;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(textInput.value, 10, 30);
  saveState();
}

center.onclick=function() {
  ctx.font = `${currentfontstyle} ${currentfontsize}px ${currentfontfamily}`;
  ctx.textBaseline="middle";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(textInput.value, 120, 70);
  saveState();
}

underline.onclick=function() {
  ctx.font = `${currentfontstyle} ${currentfontsize}px ${currentfontfamily}`;
  const textwidth=ctx.measureText(textInput).width;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(textInput.value, 10, 30);
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(10, 40);
  ctx.lineTo(10 + textwidth, 40);
  ctx.stroke();
  saveState();
}

function saveState() {
  const state = {
      font: ctx.font,
      fillStyle: ctx.fillStyle,
      text: textInput.value,
      textBaseline: ctx.textBaseline
  };

  if (currentStateIndex < states.length - 1) {
      states.splice(currentStateIndex + 1);
  }

  states.push(state);
  currentStateIndex = states.length - 1;
}

undo.addEventListener("click", () => {
  if (currentStateIndex > 0) {
      currentStateIndex--;
      const state = states[currentStateIndex];
      applyState(state);
  }
});

redo.addEventListener("click", () => {
  if (currentStateIndex < states.length - 1) {
      currentStateIndex++;
      const state = states[currentStateIndex];
      applyState(state);
  }
});

function applyState(state) {
  ctx.font = state.font;
  ctx.fillStyle = state.fillStyle;
  ctx.textBaseline = state.textBaseline;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(state.text, 10, 30);
}





