// ===== 像素畫板 =====

// 1. 找到 HTML 裡需要用到的元素
const board = document.getElementById("pixel-board");
const colorPicker = document.getElementById("color-picker");
const clearBtn = document.getElementById("clear-btn");
const sizeSelect = document.getElementById("size-select");

// 2. 用一個變數記錄「現在是不是按著滑鼠左鍵」
//    true = 正在拖曳畫畫，false = 沒有
let isDrawing = false;

// 3. 把一個格子塗上目前選的顏色
function paint(cell) {
  cell.style.backgroundColor = colorPicker.value;
}

// 4. 建立畫板：size 是邊長，例如 16 就是 16 x 16 格
function buildBoard(size) {
  // 先把舊的格子全部清掉，這樣換尺寸時才不會疊在一起
  board.innerHTML = "";

  // 告訴 CSS Grid 要分成幾欄，例如 "repeat(16, 1fr)" 就是 16 欄等寬
  board.style.gridTemplateColumns = "repeat(" + size + ", 1fr)";

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.className = "pixel";

    // 在格子上按下左鍵：開始畫，同時塗上這一格
    cell.addEventListener("mousedown", function () {
      isDrawing = true;
      paint(cell);
    });

    // 滑鼠移進格子：如果正按著左鍵，就塗上這一格
    cell.addEventListener("mouseover", function () {
      if (isDrawing) {
        paint(cell);
      }
    });

    board.appendChild(cell);
  }
}

// 5. 放開左鍵就停止畫畫
//    綁在整個 document 上，這樣就算滑鼠拖到畫板外面才放開也有效
document.addEventListener("mouseup", function () {
  isDrawing = false;
});

// 6. 換尺寸：下拉選單的值是文字，要用 Number() 轉成數字
sizeSelect.addEventListener("change", function () {
  buildBoard(Number(sizeSelect.value));
});

// 7. 清空畫板：把每一格的背景色還原成空字串，就會回到 CSS 原本的白色
clearBtn.addEventListener("click", function () {
  const allCells = document.querySelectorAll(".pixel");
  for (let i = 0; i < allCells.length; i++) {
    allCells[i].style.backgroundColor = "";
  }
});

// 8. 網頁一打開，依照下拉選單目前的值（預設 16）先建立一次
buildBoard(Number(sizeSelect.value));