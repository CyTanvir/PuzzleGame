let stepCount = 0;
let gameTimer;
let totalTime = 0;
let gameActive = false;

function swapElements(cellA, cellB) {
    let tempClass = document.getElementById(cellA).className;
    document.getElementById(cellA).className = document.getElementById(cellB).className;
    document.getElementById(cellB).className = tempClass;
}

function shuffleTiles() {
    resetPuzzle();

    for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 4; col++) {
            let randRow = Math.floor(Math.random() * 4 + 1);
            let randCol = Math.floor(Math.random() * 4 + 1);
            swapElements("tile" + row + col, "tile" + randRow + randCol);
        }
    }

    startGameClock();
}

function startNewGame() {
    resetPuzzle();
    let num = 1;
    for (let row = 1; row <= 4; row++) {
        for (let col = 1; col <= 4; col++) {
            document.getElementById("tile" + row + col).className = "piece" + num;
            num++;
        }
    }
    swapElements("tile43", "tile44");

    startGameClock();
}

function onTileClick(row, col) {
    if (!gameActive) startGameClock();

    let currentTile = document.getElementById("tile" + row + col);
    let tileClass = currentTile.className;

    if (tileClass !== "piece16") {
        if (col < 4 && document.getElementById("tile" + row + (col + 1)).className === "piece16") {
            swapElements("tile" + row + col, "tile" + row + (col + 1));
            increaseStepCount();
            checkForCompletion();
            return;
        }
        if (col > 1 && document.getElementById("tile" + row + (col - 1)).className === "piece16") {
            swapElements("tile" + row + col, "tile" + row + (col - 1));
            increaseStepCount();
            checkForCompletion();
            return;
        }
        if (row > 1 && document.getElementById("tile" + (row - 1) + col).className === "piece16") {
            swapElements("tile" + row + col, "tile" + (row - 1) + col);
            increaseStepCount();
            checkForCompletion();
            return;
        }
        if (row < 4 && document.getElementById("tile" + (row + 1) + col).className === "piece16") {
            swapElements("tile" + row + col, "tile" + (row + 1) + col);
            increaseStepCount();
            checkForCompletion();
            return;
        }
    }
}

function increaseStepCount() {
    stepCount++;
    document.getElementById("stepCount").innerText = "Steps: " + stepCount;
}

function startGameClock() {
    if (!gameActive) {
        gameActive = true;
        totalTime = 0;
        gameTimer = setInterval(() => {
            totalTime++;
            let minutes = Math.floor(totalTime / 60);
            let seconds = totalTime % 60;
            let timeDisplay = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
            document.getElementById("timeDisplay").innerText = "Time: " + timeDisplay;
        }, 1000);
    }
}

function resetPuzzle() {
    stepCount = 0;
    totalTime = 0;
    gameActive = false;
    clearInterval(gameTimer);
    document.getElementById("stepCount").innerText = "Steps: 0";
    document.getElementById("timeDisplay").innerText = "Time: 0s";
}

function checkForCompletion() {
    if (
        document.getElementById("tile11").className == "piece1" &&
        document.getElementById("tile12").className == "piece2" &&
        document.getElementById("tile13").className == "piece3" &&
        document.getElementById("tile14").className == "piece4" &&
        document.getElementById("tile21").className == "piece5" &&
        document.getElementById("tile22").className == "piece6" &&
        document.getElementById("tile23").className == "piece7" &&
        document.getElementById("tile24").className == "piece8" &&
        document.getElementById("tile31").className == "piece9" &&
        document.getElementById("tile32").className == "piece10" &&
        document.getElementById("tile33").className == "piece11" &&
        document.getElementById("tile34").className == "piece12" &&
        document.getElementById("tile41").className == "piece13" &&
        document.getElementById("tile42").className == "piece14" &&
        document.getElementById("tile43").className == "piece15" &&
        document.getElementById("tile44").className == "piece16"
    ) {
        clearInterval(gameTimer); 
        setTimeout(() => {
            let replay = window.confirm(
                "Well Done!!\n\n" +
                "Time Taken: " + totalTime + " seconds\n" +
                "Steps Used: " + stepCount + "\n\n" +
                "Do you want to play again?"
            );
            if (replay) {
                window.location.reload();
            }
        }, 100);
    }
}
