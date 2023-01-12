const grid = document.querySelector(".grid");

const TARGET_TILE_COUNT = 2000;

const TILE_MARGIN = 1;
const GRID_PADDING = 2 * TILE_MARGIN;

const LETTER_SIZE = 6;
const NEWLINE_GAP = 3;

const DEFAULT_TILE_BORDER_RADIUS = 10;
const MAX_TILE_BORDER_RADIUS = 50;

const ALPHABET = {
    a: [0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
    b: [1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    c: [0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0],
    d: [1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    e: [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    f: [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    g: [0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1],
    h: [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
    i: [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
    j: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0],
    k: [1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1],
    l: [1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    m: [1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    n: [1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
    o: [0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0],
    p: [1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    q: [0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1],
    r: [1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
    s: [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0],
    t: [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
    u: [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0],
    v: [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    w: [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1],
    x: [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
    y: [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
    z: [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
};

const DISPLAY_TEXTS = ["Robert\nRiesebos", "Software\nEngineer"];
const ALTERNATE_SPEED = 8000;

let [rows, columns] = fillGrid();

window.addEventListener("resize", () => {
    console.log("Reflowing grid");
    [rows, columns] = fillGrid();
    drawLetters(DISPLAY_TEXTS[0]);
});

let displayIndex = 0;
draw();
setInterval(draw, ALTERNATE_SPEED);

function draw() {
    drawLetters(DISPLAY_TEXTS[displayIndex++ % DISPLAY_TEXTS.length]);
    randomizeBorderRadius();
}

function fillGrid() {
    grid.style.padding = `${GRID_PADDING}px`;

    // Account for padding on the grid
    const gridWidth = grid.offsetWidth - 2 * GRID_PADDING;
    const gridHeight = grid.offsetHeight - 2 * GRID_PADDING;

    const maxTileSize = Math.ceil(Math.sqrt(((gridWidth * gridHeight) / TARGET_TILE_COUNT) * 1.5));

    // Find the tile size that gets the closest to our target tile count
    let tileSize = 0;
    let minDelta = TARGET_TILE_COUNT;
    let optimalRows = 0;
    let optimalColumns = 0;
    for (let i = 10; i <= maxTileSize; i++) {
        let columns = Math.floor(gridWidth / i);
        let rows = Math.floor(gridHeight / i);
        let delta = Math.abs(TARGET_TILE_COUNT - rows * columns);

        if (delta < minDelta) {
            tileSize = i;
            optimalRows = rows;
            optimalColumns = columns;
            minDelta = delta;
        }
    }

    console.log(`rows: ${optimalRows}, columns: ${optimalColumns}, tileSize: ${tileSize}`);

    // Account for margin on the tiles
    let tileMargin = TILE_MARGIN;
    if (tileSize < 200) {
        tileMargin = 1;
    }

    tileSize -= 2 * tileMargin;

    // Reset grid and add tiles
    grid.innerHTML = `<div class="tile" style="width: ${tileSize}px; margin: ${tileMargin}px"></div>`.repeat(
        optimalRows * optimalColumns
    );

    return [optimalRows, optimalColumns];
}

function randomizeBorderRadius() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let tile = grid.children[i * columns + j];
            tile.style.borderRadius = `${Math.random() * MAX_TILE_BORDER_RADIUS}%`;
        }
    }
}

function animate() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let tile = grid.children[i * columns + j];
            tile.style.background = "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0");
        }
    }
}

function randomHsl() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

function getTextWidth(wordLength) {
    return wordLength * LETTER_SIZE + wordLength - 1;
}

function getTextHeight(wordList, maxLetters) {
    const newLines = wordList.length - 1;

    // Count the number of lines that occur due to wrapping
    let lines = 0;
    for (let word of wordList) {
        if (word.length <= maxLetters) {
            lines += 1;
            continue;
        }

        lines += Math.ceil(word.length / maxLetters);
    }

    // Letter height + newline spacing + spacing between normal lines
    return lines * LETTER_SIZE + newLines * NEWLINE_GAP + lines - newLines - 1;
}

function drawLetter(letter, offsetX, offsetY) {
    const letterGrid = ALPHABET[letter.toLowerCase()];

    for (let i = 0; i < LETTER_SIZE; i++) {
        for (let j = 0; j < LETTER_SIZE; j++) {
            const tile = grid.children[(i + offsetY) * columns + (j + offsetX)];
            const active = letterGrid[i * LETTER_SIZE + j];

            if (active) {
                tile.classList.add("active");
                tile.style.background = randomHsl();
            } else {
                tile.classList.remove("active");
            }
        }
    }
}

function drawLetters(words) {
    clearGrid();

    const wordList = words.split("\n");
    const maxLetters = Math.floor(columns / (LETTER_SIZE + 1));

    const maxWordLength = Math.max(...wordList.map((word) => word.length));
    const wrappedLetters = Math.max(0, maxWordLength - maxLetters);
    const wrappedWordLength = maxWordLength - wrappedLetters;

    // Center text horizontally
    const textWidth = getTextWidth(wrappedWordLength);
    let startOffsetX = Math.floor((columns - textWidth) / 2);
    startOffsetX = Math.max(0, startOffsetX);

    // Center text vertically
    const textHeight = getTextHeight(wordList, maxLetters);
    let startOffsetY = Math.floor((rows - textHeight) / 2);

    let offsetX = startOffsetX;
    let offsetY = startOffsetY;
    for (let letter of words) {
        if (letter === "\n") {
            // Place a gap between new lines
            offsetY += LETTER_SIZE + NEWLINE_GAP;
            offsetX = startOffsetX;
            continue;
        }

        if (offsetX + LETTER_SIZE > columns) {
            // Place a one-tile gap between wrapped letters
            offsetY += LETTER_SIZE + 1;
            offsetX = startOffsetX;
        }

        drawLetter(letter, offsetX, offsetY);
        offsetX += LETTER_SIZE + 1;
    }
}

function resetTile(tile) {
    tile.classList.remove("active");
    tile.style.background = "";
    tile.style.borderRadius = "";
}

function clearGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let tile = grid.children[i * columns + j];
            resetTile(tile);
        }
    }
}
