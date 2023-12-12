document
  .getElementById("restart-button")
  .addEventListener("click", restartGame);

document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("whats your name?");
  if (yourName == null || yourName === " ") {
    document.querySelector(" .name span").innerHTML = "unknown";
  } else {
    document.querySelector(" .name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};
let duration = 500;
let bContainer = document.querySelector(" .memory-game-block");
let blocks = Array.from(bContainer.children);

let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", function () {
    FlipBlock(block);
  });
});

function FlipBlock(selectedBlock) {
  selectedBlock.classList.add("is-rotate");

  let allFBlock = blocks.filter((FlipBlock) =>
    FlipBlock.classList.contains("is-rotate")
  );
  if (allFBlock.length === 2) {
    stopClick();

    checkMatch(allFBlock[0], allFBlock[1]);
  }
}
function stopClick() {
  bContainer.classList.add("no-click");

  setTimeout(() => {
    bContainer.classList.remove("no-click");
  }, duration);
}

function checkMatch(firstBlock, secondBlock) {
  let triesEl = document.querySelector(".tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-rotate");
    secondBlock.classList.remove("is-rotate");
    firstBlock.classList.add("is-match");
    secondBlock.classList.add("is-match");
  } else {
    triesEl.innerHTML = parseInt(triesEl.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-rotate");
      secondBlock.classList.remove("is-rotate");
    }, duration);
  }
}

function shuffle(Array) {
  let current = Array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = Array[current];

    Array[current] = Array[random];

    Array[random] = temp;
  }
  return Array;
}
function restartGame() {
  orderRange = [...Array(blocks.length).keys()];
  shuffle(orderRange);

  blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.classList.remove("is-rotate", "is-match");
  });

  document.querySelector(".tries span").innerHTML = "0";

  document.querySelector(".control-buttons").style.display = "block";
}
