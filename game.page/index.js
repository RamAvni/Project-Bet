const player = {
  element: document.getElementById("player"),
  isJumping: false,
  jumpsCount: 0,
  isOnPlatform: false,
};

const gameVelocity = 1;
let platforms = document.getElementsByClassName("platform");
const keysPressedNow = {};

function getEntityElement(entity) {
  const entityEl = typeof entity === "object" ? entity.element : entity;
  return entityEl;
}

function entityMove(entity, direction, amount = 0) {
  // Element OR Object --> X
  // Moves an entity by gameVelocity to the specified direction
  let entityEl = getEntityElement(entity);
  const rect = entityEl.getBoundingClientRect();

  let currentBottomValue = Number(
    getComputedStyle(entityEl).bottom.replace(/px/, "")
  );

  let currentLeftValue = Number(
    getComputedStyle(entityEl).left.replace(/px/, "")
  );

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
  // Check if jumping
  if (e.code === "Space" || e.code === "ArrowUp") {
    jump(player);
    player.isJumping = true;
  }

  // move player
  for (let property in keysPressedNow) {
    if (keysPressedNow[property]) {
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
  if (!(player.jumpsCount > 5)) {
    player.isJumping = true;
    entityMove(player, "up", 30);
  }

  player.jumpsCount++;
}

function resetJump() {
  player.isJumping = false;
  player.jumpsCount = 0;
}

addEventListener("keydown", setKeysPressedNow);
addEventListener("keyup", unsetReleasedKeys);

setInterval(() => {
  playerGravity(player);
}, 1);
