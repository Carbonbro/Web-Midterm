// ===== 隨機配色產生器 =====

// 1. 用 id 找到 HTML 裡的按鈕和放色塊的區塊
const generateBtn = document.getElementById("generate-btn");
const paletteOutput = document.getElementById("palette-output");

// 2. 產生一個隨機的色碼，例如 "#3A9F7C"
function randomColor() {
  // 顏色共有 (256 x 256 x 256)種
  const number = Math.floor(Math.random() * 256 * 256 * 256);

  // toString(16) 把數字轉成 16 進位
  // padStart(6, "0") 如果不足 6 位，前面補 0
  const hex = number.toString(16).padStart(6, "0");

  return "#" + hex.toUpperCase();
}

// 3. 產生一組 5 個顏色，並顯示在網頁上
function generatePalette() {
  // 先把上一次的色塊清空
  paletteOutput.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const color = randomColor();

    // 建立一個外框，裡面放色塊和色碼文字
    const box = document.createElement("div");
    box.className = "swatch-box";

    const swatch = document.createElement("div");
    swatch.className = "swatch";
    swatch.style.backgroundColor = color;   // 用 JS 直接設定背景色

    const label = document.createElement("p");
    label.className = "swatch-label";
    label.textContent = color;              // 在色塊下面顯示色碼

    // 把元素一層一層放進去：色塊、文字 -> 外框 -> 頁面上的區塊
    box.appendChild(swatch);
    box.appendChild(label);
    paletteOutput.appendChild(box);
  }
}

// 4. 按下按鈕時，執行 generatePalette
generateBtn.addEventListener("click", generatePalette);

// 5. 網頁一打開就先產生一組，避免畫面是空的
generatePalette();