const shipFactory = (length, location) => {
   const generateShipArray = () => {
     let shipArray = [];
     for(i=0 ; i < length ; i++){
       shipArray.push("");
     }
     return shipArray;
   }

   let shipStatus = generateShipArray();

   const hit = () => {
     shipStatus.shift();
     shipStatus.push("x");
     return shipStatus;
   }

   const isSunk = () => {
     arrayCheck = [];
     for(i=0 ; i<shipStatus.length ; i++){
       if(shipStatus[i] == "x"){
         arrayCheck.push("x");
       }
     }
     if (arrayCheck.length == shipStatus.length){
       return true;
     }
     else {
       return false;
     }
   }
   const checkStatus = () => {return shipStatus};

   return {isSunk,hit,checkStatus,length};

}

///gameboardFactory

const gameboardFactory = () => {
  const shipsArray = [];

  let damageCounter = 0;

  const ptBoat = shipFactory(2);
  const submarine = shipFactory(3);
  const destroyer = shipFactory(3);
  const battleship = shipFactory(4);
  const carrier = shipFactory(5);

  shipsArray.push(ptBoat,submarine,destroyer,battleship,carrier);

  const generateGameboard = () => {
    let thisArray = [];
    for (i=0 ; i < 10 ; i++) {
      thisArray.push(["","","","","","","","","",""]);
    }
    return thisArray;
  }

  const playerGameboard = generateGameboard();

  const enemyGameboard = generateGameboard();

  const placeShip = (coordX, coordY, shipIndex, orien) => {

    const checkValidPlacement = (coordinates) => {
      if(coordinates + shipsArray[shipIndex].length-1 < 10){
        for (i=0 ; i<shipsArray[shipIndex].length ; i++){
          if (coordinates == coordX){
            if(playerGameboard[coordY][coordX + i] != ""){
              return false;
            }
          }
          else {
            if(playerGameboard[coordY + i][coordX] != ""){
              return false;
            }
          }
        }
        return true;
      }
      else {
        return false;
      }
    }

    const createShips = (orientation) => {

      if (orientation == "h"){
        if (checkValidPlacement(coordX)){
          for (i=0 ; i<shipsArray[shipIndex].length ; i++){
            playerGameboard[coordY][coordX + i] = shipIndex;
          }
          return playerGameboard;
        }
        else {
          return "Not a Valid Placement!";
        }
      }
      else {
        if (checkValidPlacement(coordY)){
          for (i=0 ; i<shipsArray[shipIndex].length ; i++){
            playerGameboard[coordY + i][coordX] = shipIndex;
          }
          return playerGameboard;
        }
        else {
          return "Not a Valid Placement!";
        }
      }
    }

    return createShips(orien);
  }

  const recieveAttack = (coordX, coordY) => {
    let selectedCoordinates = playerGameboard[coordY][coordX];
      let ship = selectedCoordinates;
      shipsArray[ship].hit();
      playerGameboard[coordY][coordX] = "x";
      damageCounter++;
      return [coordX,coordY];
  }

  const checkAttackValidity = (coordX, coordY) => {
    let selectedCoordinates = playerGameboard[coordY][coordX];
    if (selectedCoordinates == "x"){
      return false;
    }
    else if (selectedCoordinates != ""){
      return true;
    }
    else{
      playerGameboard[coordY][coordX] = "x";
      return [coordY][coordX];
    }
  }

  const checkGameOver = () => {
    let arrayCheck = [];
    for(i = 0 ; i<shipsArray.length ; i++){
      if(shipsArray[i].isSunk()){
        arrayCheck.push("x");
      }
      else {
        return false;
      }
    }
    if (arrayCheck.length == shipsArray.length){
      return true;
    }
    else {
      return false;
    }
  }


  return {playerGameboard,enemyGameboard, placeShip, checkAttackValidity, recieveAttack, checkGameOver};
}

const playerFactory = (type) => {
  const sendAttack = (coordX, coordY, playerToAttack, currentPlayer) => {
    if(playerToAtttack.checkAttackValidity(coordX,coordY)){
      playerToAttack.recieveAttack(coordX,coordY);
    }
    else if (playerToAtttack.checkAttackValidity(coordX,coordY) != true ||playerToAtttack.checkAttackValidity(coordX,coordY) != false ){
      currentPlayer.enemyGameboard()
    }
  }
}

const gameLoop = () => {
  let player1 = {"player":playerFactory(), "gameboard": gameboardFactory()};
  let player2 = {"player":playerFactory(), "gameboard": gameboardFactory()};

  const renderPlayerGameboard = (player) => {
    let html = `"<div class="gameBoard">`;
    for (i=0 ; i<player.gameboard.playerGameboard.length ; i++){
      html += `
        <div class="row">
      `
      for (p=0 ; p=player.gameboard.playerGameboard[i].length ; p++){
        html += `
          <span class="cell" data-coordX ="${p}" data-coordY = "${i}"></span>
        `
      }
      html += `</div>`;
    }
    html += `</div>`;
    return html;
  }

  return renderPlayerGameboard(player1);
}
