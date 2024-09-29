const player = document.getElementById("player");
let platforms = document.getElementsByClassName("platform");

// setInterval(function(){
//     entityFall(platforms[0])
// }, 5)


function entityFall(entity) {
    let currentBottomValue = entity.style.bottom ? Number(entity.style.bottom.replace(/px/, "")) 
        : Number(getComputedStyle(entity).bottom.replace(/px/, ""))
    entity.style.bottom = `${ --currentBottomValue }px`
}
