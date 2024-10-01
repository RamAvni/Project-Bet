const player = {
  element: document.getElementById("player"),
  isJumping: false,
  jumpsCount: 0,
  isOnPlatform: false,
};

const amountOfPlatforms = 8;
const gameVelocity = 1;
let nonElementPlatforms = [];
const keysPressedNow = {};
let platforms = document.getElementsByClassName("platform-floor");

function getEntityElement(entity) {
  const entityEl = typeof entity === "object" ? entity.element : entity;
  return entityEl;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// work
function generatePlatforms() {
  const widthValue = {
    min: 10,
    max: 79,
  };
  const platformHeight = 30;
  while (platforms.length < 6) {
    let width = randomInteger(widthValue.min, widthValue.max);
    const platformStyleLeft = `
    width:${width}%;height:${platformHeight}px;bottom:${(platforms.length+1) * 130
      }px;left:0;
    `;
    const platformStyleRight = `
    width:${90 - width}%;height:${platformHeight}px;bottom:${(platforms.length+1) * 130
      }px;right:0;
    `;

    document.getElementById(
      "screen-container"
    ).innerHTML += `<div class="platform-floor">
    <div class="platform" style=${platformStyleLeft}></div>
    <div class="platform" style=${platformStyleRight}></div>
    </div>`;
    platforms = document.getElementsByClassName("platform-floor");
  }
  platforms = document.getElementsByClassName("platform");
}
function entityMove(entity, direction, amount = 0) {
  // Element OR Object --> X
  // Moves an entity by gameVelocity to the specified direction
  let entityEl = getEntityElement(entity);
  let currentBottomValue = getStrippedNumberFromString(
    getComputedStyle(entityEl).bottom
  );
  let currentLeftValue = Number(
    getComputedStyle(entityEl).left.replace(/px/, "")
  );
  console.log("moving");

  switch (direction) {
    case "up":
    case "ArrowUp":
    case "Space":
      entityEl.style.bottom = `${currentBottomValue + gameVelocity + amount}px`;
      break;
    case "down":
    case "ArrowDown":
      entityEl.style.bottom = `${currentBottomValue - gameVelocity - amount}px`;
      break;
    case "left":
    case "ArrowLeft":
      entityEl.style.left = `${currentLeftValue - gameVelocity - amount}px`;
      break;
    case "right":
    case "ArrowRight":
      entityEl.style.left = `${currentLeftValue + gameVelocity + amount}px`;
      break;
  }
}

function setKeysPressedNow(e) {
  console.log("press");
  // set
  keysPressedNow[e.code] = true;

  // move player
  for (let property in keysPressedNow) {
    if (e.code === "Space" || e.code === "ArrowUp" || e.code === "up") {
      jump(player);
      player.isJumping = true;
      break;
    } else if (keysPressedNow[property]) {
      entityMove(player, property, gameVelocity);
    }
  }
}

function unsetReleasedKeys(e) {
  // unset
  keysPressedNow[e.code] = false;
  if (e.code === "Space" || e.code === "ArrowUp") resetJump();
}

function getStrippedNumberFromString(string) {
  return Math.floor(Number(string.replace(/[^0-9\.]/g, "")));
}

function playerGravity(player) {

  const playerStyle = getComputedStyle(player.element);
  const currentBottomValue = getStrippedNumberFromString(playerStyle.bottom);
  const currentLeftValue = getStrippedNumberFromString(playerStyle.left);
  let onAnyPlatforms = false;

  let isOnPlatformTopHeight;
  let isOnPlatformWidth;

  for (let platform of platforms) {
    const platformStyle = getComputedStyle(platform);
    const platformBottomValue = getStrippedNumberFromString(
      platformStyle.bottom
    );
    const platformHeightValue = getStrippedNumberFromString(
      platformStyle.height
    );
    const platformLeftValue = getStrippedNumberFromString(platformStyle.left);
    const platformWidthValue = getStrippedNumberFromString(platformStyle.width);

    isOnPlatformTopHeight =
      currentBottomValue === platformBottomValue + platformHeightValue;
    // console.log("currentBottomValue: ", currentBottomValue);

    isOnPlatformWidth =
      platformLeftValue <= currentLeftValue &&
      currentLeftValue <= platformLeftValue + platformWidthValue;

    if (isOnPlatformTopHeight && isOnPlatformWidth) break;
  }

  // Collision
  if (isOnPlatformTopHeight && isOnPlatformWidth) {
    player.isOnPlatform = true;
    onAnyPlatforms = true;
    resetJump();
  } else if (!onAnyPlatforms) {
    onAnyPlatforms = false;
    player.isOnPlatform = false;
    if (!player.isJumping) {
      entityMove(player, "down");
    }
  }
}

function jump() {
  if (player.jumpsCount < 15) {
    player.isJumping = true;
    entityMove(player, "up", 10);
  }

  player.jumpsCount++;
}

function resetJump() {
  player.isJumping = false;
  player.jumpsCount = 0;
}

function win(){
  const currentBottomValue = getStrippedNumberFromString(playerStyle.bottom);
  if (currentBottomValue === 0){
    console.log("winner");
  }
}

addEventListener("keydown", setKeysPressedNow);
addEventListener("keyup", unsetReleasedKeys);

generatePlatforms();

setInterval(() => {
  playerGravity(player);
}, 5);

// put in comment the generatePlatforms function and put it instead in setIntervale with 0
