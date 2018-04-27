//builds the game board of buttons
function playerInit() {
    var letterPos = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']
    var board = document.getElementById('board');
    var template = ''
    for (var j = 0; j < letterPos.length; j++) {
        for (var i = 0; i < letterPos.length; i++) {
            var coords = letterPos[j] + [i];
            template += `
            <div class="col-1">
            <button onclick="missleFire('${coords}', ships); compReturn(coordsList, playerShips)" id="player${coords}"><img src="assets/pics/pics/blank.png" alt="" width="30vh"></button>
            </div>
            `
        }
    }
    board.innerHTML = template;
}

function compInit() {
    var letterPos = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']
    var board = document.getElementById('playerBoard');
    var template = ''
    for (var j = 0; j < letterPos.length; j++) {
        for (var i = 0; i < letterPos.length; i++) {
            var coords = letterPos[j] + [i];
            template += `
            <div class="col-1" id="comp${coords}">
                <img src="assets/pics/pics/blank.png" alt="" width="30vh">
            </div>
            `
        }
    }
    board.innerHTML = template;

}
//creates ships
var ships = [{
    type: 'Aircraft Carrier',
    size: 5,
    position: [],
    hits: 0
}, {
    type: 'Submarine',
    size: 3,
    position: [],
    hits: 0
}, {
    type: 'Battlehip',
    size: 4,
    position: [],
    hits: 0
}, {
    type: 'Cruiser',
    size: 3,
    position: [],
    hits: 0
}, {
    type: 'Destroyer',
    size: 2,
    position: [],
    hits: 0
}]

var coordsList = []

function numChange(ship) {
        var letterPos = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']
        var numPos = Math.floor(Math.random() * (letterPos.length - ship.size))
        var letPos = letterPos[Math.floor(Math.random() * letterPos.length)]
        for (var i = 0; i < ship.size; i++) {
            numPos++
            ship.position.push(letPos + numPos)
        }
}

function letChange(ship) {
        var letterPos = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']
        var numPos = Math.floor(Math.random() * (letterPos.length))
        var randLet = Math.floor(Math.random() * (letterPos.length - ship.size))
        for (var i = 0; i < ship.size; i++) {
            var letPos = letterPos[randLet + i]
            ship.position.push(letPos + numPos)
        }
}

//randomizes the ships coords
function startGame(shipsArr) {
    for (var x = 0; x < shipsArr.length; x++) {
        var letOrNum = Math.floor(Math.random() * 2)
        if (letOrNum == 0) {
            letChange(shipsArr[x])
        } else {
            numChange(shipsArr[x])
        }
    }
}
//checks to see if missle hit or not
function missleCheck(coordCheck, checkArr) {
    var check0 = checkArr[0].position;
    var check1 = checkArr[1].position;
    var check2 = checkArr[2].position;
    var check3 = checkArr[3].position;
    var check4 = checkArr[4].position;

    if (check0.includes(coordCheck)) {
        checkArr[0].hits += 1
        return 'Hit!'
    } else if (check1.includes(coordCheck)) {
        checkArr[1].hits += 1
        return 'Hit!'
    } else if (check2.includes(coordCheck)) {
        checkArr[2].hits += 1
        return 'Hit!'
    } else if (check3.includes(coordCheck)) {
        checkArr[3].hits += 1
        return 'Hit!'
    } else if (check4.includes(coordCheck)) {
        checkArr[4].hits += 1
        return 'Hit!'
    } else {
        return 'Miss!'
    }
}
//changes display to show missle hit or miss
function missleDisplay(fireResult, targetResults, displayId, typeId) {
    if (fireResult == 'Hit!') {
        document.getElementById(displayId).innerText = fireResult
        document.getElementById(typeId + targetResults).innerHTML = '<img src="assets/pics/pics/red x.png" width="30vh">'
    } else {
        document.getElementById(displayId).innerText = fireResult
        document.getElementById(typeId + targetResults).innerHTML = '<img src="assets/pics/pics/blue circle.png" width="30vh">'
    }
}
//checks to see if ship is sunk
function shipSunk(sunkArr, idSunkDisplay) {
    if (sunkArr[0].hits == sunkArr[0].size) {
        document.getElementById(idSunkDisplay).innerText = 'You sunk my ' + sunkArr[0].type + '!'
    } else if (sunkArr[1].hits == sunkArr[1].size) {
        document.getElementById(idSunkDisplay).innerText = 'You sunk my ' + sunkArr[1].type + '!'
    } else if (sunkArr[2].hits == sunkArr[2].size) {
        document.getElementById(idSunkDisplay).innerText = 'You sunk my ' + sunkArr[2].type + '!'
    } else if (sunkArr[3].hits == sunkArr[3].size) {
        document.getElementById(idSunkDisplay).innerText = 'You sunk my ' + sunkArr[3].type + '!'
    } else if (sunkArr[4].hits == sunkArr[4].size) {
        document.getElementById(idSunkDisplay).innerText = 'You sunk my ' + sunkArr[4].type + '!'
    } else {
        document.getElementById(idSunkDisplay).innerText = 'Still afloat!'
    }
}

//player Fire function
function missleFire(target, ships) {
    var display = 'display'
    var sunkDisplay = 'sunkDisplay'
    var playerId = 'player'
    var playerFire = missleCheck(target, ships)
    missleDisplay(playerFire, target, display, playerId)
    shipSunk(ships, sunkDisplay)
}

//temp array of test ships
var playerShips = [{
        type: 'Aircraft Carrier',
        size: 5,
        position: ['a1','a2','a3','a4','a5'],
        hits: 0
    }, {
        type: 'Submarine',
        size: 3,
        position: ['f6','f7','f8'],
        hits: 0
    }, {
        type: 'Battlehip',
        size: 4,
        position: ['l4','l5','l6','l7'],
        hits: 0
    }, {
        type: 'Cruiser',
        size: 3,
        position: ['c5','d5','e5'],
        hits: 0
    }, {
        type: 'Destroyer',
        size: 2,
        position: ['h9','h10'],
        hits: 0
    }]
//comp random fire selection
function compReturn (coordsList, playerShips) {
    debugger
    var compId = 'compDisplay'
    var compCoordId = 'comp'
    var sunkCompDisplay = 'compSunkDisplay'
    var compChoice = compFire(coordsList)
    var compCheck = missleCheck(compChoice, playerShips)
    missleDisplay(compCheck, compChoice, compId, compCoordId)
    shipSunk(playerShips, sunkCompDisplay)
}

//calls comp ships location randomizer
startGame(ships)
//creates array of comps target choices
createCoordsArr(coordsList)
//creates boards for player and comp
compInit()
playerInit()

function createCoordsArr(coordsArr) {
    var letterPos = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']
    for (var j = 0; j < letterPos.length; j++) {
        for (var i = 0; i < letterPos.length; i++) {
            var coords = letterPos[j] + [i];
            coordsArr.push(coords)
        }
    }
}

function compFire(coordsOpen) {
    var randomPos = coordsOpen[Math.floor(Math.random() * coordsOpen.length)] 
    coordsOpen.splice(randomPos, 1)
    return randomPos
}

