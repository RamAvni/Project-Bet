const player = document.getElementById("player");
let platforms = document.getElementsByClassName("platform");

setInterval(function () {
    let j = platforms.length;
    let platY;
    let placeY;
    for (let i = 0; i < platforms.length; i++) {
        platY = Number(getComputedStyle(platforms[i]).bottom.replace(/px/, ""));
        placeY = Number(getComputedStyle(player).bottom.replace(/px/, ""));
        let platX = Number(getComputedStyle(platforms[i]).left.replace(/px/, ""));
        let platWidth = Number(getComputedStyle(platforms[i]).width.replace(/px/, ""))
        let placeX = Number(getComputedStyle(player).left.replace(/px/, ""));
        let playerWidth = Number(getComputedStyle(player).width.replace(/px/, ""));
        if (platY <= placeY && (platX < placeX && placeX< (platX + platWidth)) || (platX < (placeX + playerWidth) && (placeX + playerWidth)< (platX + platWidth))) {
            j = i;
        }
    }
    console.log("platform", j);
    platY = Number(getComputedStyle(platforms[j]).bottom.replace(/px/, ""));
    let height = Number(getComputedStyle(platforms[j]).height.replace(/px/, ""));
    let stop = platY + height;
    if (placeY !== stop) {
        entityFall(player)
    }
    else {
        return;
    }
    console.log(Number(getComputedStyle(player).bottom.replace(/px/, "")));
    console.log("stop", stop);

}, 5)

function entityFall(entity) {
    let currentBottomValue = entity.style.bottom ? Number(entity.style.bottom.replace(/px/, ""))
        : Number(getComputedStyle(entity).bottom.replace(/px/, ""))
    entity.style.bottom = `${--currentBottomValue}px`
}
