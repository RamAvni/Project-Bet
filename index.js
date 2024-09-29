const player = document.getElementById("player");
const playerVelocity = 10;
let platforms = document.getElementsByClassName("platform");
const keysPressedNow = {};

function entityMove(entity, direction) {
  let currentBottomValue = Number(
    getComputedStyle(entity).bottom.replace(/px/, "")
  );

  let currentLeftValue = Number(
    getComputedStyle(entity).left.replace(/px/, "")
  );

  switch (direction) {
    case "up":
      entity.style.bottom = `${currentBottomValue + playerVelocity}px`;
      break;
    case "down":
      entity.style.bottom = `${currentBottomValue - playerVelocity}px`;
      break;
    case "left":
      entity.style.left = `${currentLeftValue - playerVelocity}px`;
      break;
    case "right":
      entity.style.left = `${currentLeftValue + playerVelocity}px`;
      break;
  }
}

addEventListener("keydown", setKeysPressedNow);
addEventListener("keyup", unsetReleasedKeys);

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
      console.log(keysPressedNow);
    }
  }
}

// // reset
// for (let property in keysPressedNow) keysPressedNow[property] = false;

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
      keysPressedNow["up"] = false;
      break;
    case "ArrowDown":
      keysPressedNow["down"] = false;
      break;
  }
}
