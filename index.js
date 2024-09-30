const player = {
  element: document.getElementById("player"),
  isJumping: false,
  isOnPlatform: false,
};

const gameVelocity = 1;
let platforms = document.getElementsByClassName("platform");
const keysPressedNow = {};

function getEntityElement(entity) {
  const entityEl = typeof entity === "object" ? entity.element : entity;
  return entityEl;
}

function entityMove(entity, direction) {
  // Element OR Object --> X
  // Moves an entity by gameVelocity to the specified direction
  let entityEl = getEntityElement(entity);
  const rect = entity.getBoundingClientRect();

  let currentBottomValue = Number(
    getComputedStyle(entityEl).bottom.replace(/px/, "")
  );

  let currentLeftValue = Number(
    getComputedStyle(entityEl).left.replace(/px/, "")
  );

  switch (direction) {
    case "up":
      entityEl.position.x = `${currentBottomValue + gameVelocity}px`;
      break;
    case "down":
      entityEl.style.bottom = `${currentBottomValue - gameVelocity}px`;
      break;
    case "left":
      entityEl.style.left = `${currentLeftValue - gameVelocity}px`;
      break;
    case "right":
      entityEl.style.left = `${currentLeftValue + gameVelocity}px`;
      break;
  }
}

function setKeysPressedNow(e) {
  // set
  switch (e.code) {
    case "ArrowRight":
      keysPressedNow["right"] = true;
      break;
    case "ArrowLeft":
      keysPressedNow["left"] = true;
      break;
    case "ArrowUp":
      player.isJumping = true;
      keysPressedNow["up"] = true;
      break;
    case "ArrowDown":
      keysPressedNow["down"] = true;
      break;
  }

  // move player
  for (let property in keysPressedNow) {
    if (keysPressedNow[property]) {
      entityMove(player, property);
    }
  }
}

function unsetReleasedKeys(e) {
  // unset
  switch (e.code) {
    case "ArrowRight":
      keysPressedNow["right"] = false;
      break;
    case "ArrowLeft":
      keysPressedNow["left"] = false;
      break;
    case "ArrowUp":
      player.isJumping = false;
      keysPressedNow["up"] = false;
      break;
    case "ArrowDown":
      keysPressedNow["down"] = false;
      break;
  }
}

function getStrippedNumberFromString(string) {
  return Math.floor(Number(string.replace(/[^0-9\.]/g, "")));
}

function playerGravity(player) {
  const playerStyle = getComputedStyle(player.element);
  const currentBottomValue = getStrippedNumberFromString(playerStyle.bottom);
  const currentLeftValue = getStrippedNumberFromString(playerStyle.left);
  player.isOnPlatform = false
  if (!player.isJumping && !player.isOnPlatform) {
    let onAnyPlatforms = false;

    for (let platform of platforms) {
      
      const platformStyle = getComputedStyle(platform);
      const platformBottomValue = getStrippedNumberFromString(platformStyle.bottom);
      const platformHeightValue = getStrippedNumberFromString(platformStyle.height);
      const platformLeftValue = getStrippedNumberFromString(platformStyle.left);
      const platformWidthValue = getStrippedNumberFromString(platformStyle.width);

      // Collision
      if (
        
        currentBottomValue === platformBottomValue + platformHeightValue &&
        platformLeftValue <= currentLeftValue &&
        currentLeftValue <= platformLeftValue + platformWidthValue
      ) {
        player.isOnPlatform = true;
        onAnyPlatforms = true;
      } else if (!onAnyPlatforms){
        entityMove(player, "down");
        player.isOnPlatform = false;
        onAnyPlatforms = false;
      }
    }
  }

  console.log(`player.isJumping = ${player.isJumping}, player.isOnPlatform = ${player.isOnPlatform}`)
}

addEventListener("keydown", setKeysPressedNow);
addEventListener("keyup", unsetReleasedKeys);

setInterval(() => {
  playerGravity(player);
}, 5);

console.log(getComputedStyle(platforms[0]).bottom);
