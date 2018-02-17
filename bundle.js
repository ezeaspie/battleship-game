const shipFactory = (length, name) => {
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

   return {isSunk,hit,checkStatus,length, name};

}

///gameboardFactory

const gameboardFactory = () => {
  const shipsArray = [];

  let damageCounter = 0;

  const ptBoat = shipFactory(2, "Patrol Boat");
  const submarine = shipFactory(3, "Submarine");
  const destroyer = shipFactory(3, "Destroyer");
  const battleship = shipFactory(4, "BattleShip");
  const carrier = shipFactory(5, "Aircraft Carrier");
  const holder = shipFactory(1, "Keep");

  shipsArray.push(ptBoat,submarine,destroyer,battleship,carrier,holder);

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
            else{
              continue;
            }
          }
          else {
            if(playerGameboard[coordY + i][coordX] != ""){
              return false;
            }
            else {
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
          return false;
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
          return false;
        }
      }
    }

    return createShips(orien);
  }

  const recieveAttack = (coordX, coordY) => {
    let selectedCoordinates = playerGameboard[coordY][coordX];
      let ship = selectedCoordinates;
      shipsArray[ship].hit();
      playerGameboard[coordY][coordX] = "o";
      damageCounter++;
      return [coordX,coordY];
  }

  const checkAttackValidity = (coordX, coordY) => {
    let selectedCoordinates = playerGameboard[coordY][coordX];
    if (selectedCoordinates == "x" || selectedCoordinates == "o"){
      return false;
    }
    else if (selectedCoordinates != ""){
      return true;
    }
    else{
      playerGameboard[coordY][coordX] = "x";
      return false;
    }
  }

  const checkGameOver = () => {
    if (damageCounter == 15){
      return true;
    }
    else {
      return false;
    }
  }


  return {playerGameboard,enemyGameboard, placeShip, checkAttackValidity, recieveAttack, checkGameOver, shipsArray};
}

const playerFactory = (id) => {

  const sendAttack = (coordX, coordY, playerToAttack, currentPlayer, situationVar) => {

    if(playerToAttack.gameboard.playerGameboard[coordY][coordX] == "x" || playerToAttack.gameboard.playerGameboard[coordY][coordX] == "s" || playerToAttack.gameboard.playerGameboard[coordY][coordX] == "o"){
      console.log("you already hit that position.");
      return false;
    }
    else if (playerToAttack.gameboard.playerGameboard[coordY][coordX] == "") {
      currentPlayer.gameboard.enemyGameboard[coordY][coordX] = "x";
      playerToAttack.gameboard.playerGameboard[coordY][coordX] = "x";
      console.log("miss");
      return [true,2];
    }
    else {
      playerToAttack.gameboard.recieveAttack(coordX,coordY);
      currentPlayer.gameboard.enemyGameboard[coordY][coordX] = "s";
      console.log("Its a hit!");
      return [true,3];
    }
  }

  const felicia = (situation) => {
    const victoryMessages = ["Great job! We sunk all their ships!", "We did it! Their fleet is resting happy at the bottom of the sea!", "Captain, we've completely defeated the enemy!"];
    const defeatMessages = ["They sunk all of our ships...", "We've lost all out ships sir.", "That's it. Our last ship gone. We lost captain."];
    const missMessages = ["Didn't hit anything on that one.", "Missed shot captain.", "Looks like we missed."];
    const enemyHitMessages = ["Looks like we hit something!", "That one was spot on!", "We've hit a ship!"];
    const recieveAttackMessages = ["One of our ships have been hit!","Took some damage on our ships captain.","Critical hit on part of our fleet sir!"];
    const samePosMessages = ["We've already tried there captain.", "Let's try hitting someplace else.", "Last time we shot there we got nothing."];
    const formErrorMessages = ["We can't place a ship there sir."];

    const randomInt = (min,max) => {
      return Math.floor(Math.random()*(max-min+1)+min);
    }

    if(situation == 0){
      return victoryMessages[randomInt(0,2)];
    }
    if(situation == 1){
      return defeatMessages[randomInt(0,2)];
    }
    if(situation == 2){
      return missMessages[randomInt(0,2)];
    }
    if(situation == 3){
      return enemyHitMessages[randomInt(0,2)];
    }
    if(situation == 4){
      return recieveAttackMessages[randomInt(0,2)];
    }
    if(situation == 5){
      return samePosMessages[randomInt(0,2)];
    }
    if(situation == 6){
      return formErrorMessages[0];
    }
  }

  const nicolas = (situation) => {
    const victoryMessages = ["Looks like we won. They're all down.", "We're just too powerful for their fleet. We won.", "Nice one sir, looks like they can't go on."];
    const defeatMessages = ["We have no ships left. We lost.", "And there goes out last vessel.", "We have nothing left sir, it's time to surrender."];
    const missMessages = ["That one missed.", "Missed. Waste of ammo.", "Nothing there. We'll get them next time."];
    const enemyHitMessages = ["Direct hit on one of their ships!", "We got one. Try hitting around there. Might be more ships around.", "Straight into the hull of one of their ships!"];
    const recieveAttackMessages = ["They hit us sir. Let's hit them back.","Enemy got a nice shot on one of our ships.","Careful sir, we just took a cannon to one of our vessels."];
    const samePosMessages = ["We've already hit there. Don't you remember?", "I don't think there's anything there.", "Somewhere else please."];
    const formErrorMessages = ["We can't place a ship there sir."];

    const randomInt = (min,max) => {
      return Math.floor(Math.random()*(max-min+1)+min);
    }

    if(situation == 0){
      return victoryMessages[randomInt(0,2)];
    }
    if(situation == 1){
      return defeatMessages[randomInt(0,2)];
    }
    if(situation == 2){
      return missMessages[randomInt(0,2)];
    }
    if(situation == 3){
      return enemyHitMessages[randomInt(0,2)];
    }
    if(situation == 4){
      return recieveAttackMessages[randomInt(0,2)];
    }
    if(situation == 5){
      return samePosMessages[randomInt(0,2)];
    }
    if(situation == 6){
      return formErrorMessages[0];
    }
  }

  let deputy;

  if(id==0){
    deputy = felicia;
  }
  else{
    deputy = nicolas;
  }

  return {sendAttack, deputy};
}

const gameLoop = () => {

  const $ = (selector) => document.querySelector(selector);
  //Create Players

  let playerOne = {"name": "playerOne", "player":playerFactory(0), "gameboard": gameboardFactory()};
  let playerTwo = {"name" : "playerTwo", "player":playerFactory(1), "gameboard": gameboardFactory()};

  //function to render the gameboards view (both player and enemy views)

  const renderPlayerView = (player,opponent) => {
    let html = `
    <div class="gameBoard">`;
    for (i=0 ; i<player.gameboard.playerGameboard.length ; i++){
      html += `<div class="row">`
      for (p=0 ; p<player.gameboard.playerGameboard[i].length ; p++){
        let className = "";
        if(player.gameboard.playerGameboard[i][p] == "x"){
          className = " miss";
        }
        if(player.gameboard.playerGameboard[i][p] == "o"){
          className = " hit";
        }
        if(player.gameboard.playerGameboard[i][p] == 1 || player.gameboard.playerGameboard[i][p] == 2 || player.gameboard.playerGameboard[i][p] == 3 || player.gameboard.playerGameboard[i][p] == 4){
          className = " ship";
        }
        html += `<span class="cell${className}" data-coordX ="${p}" data-coordY = "${i}">${player.gameboard.playerGameboard[i][p]}</span>`
      }
      html += `</div>`;
    }
    html += `</div>`;
    $("#" + player.name + "Board").innerHTML = html;

    let enemyHtml = `
    <div class="gameBoard">`;
    for (i=0 ; i<player.gameboard.enemyGameboard.length ; i++){
      enemyHtml += `<div class="row">`
      for (p=0 ; p<player.gameboard.enemyGameboard[i].length ; p++){
        let className = "";
        if(player.gameboard.enemyGameboard[i][p] == "x"){
          className = " miss";
        }
        if(player.gameboard.enemyGameboard[i][p] == "s"){
          className = " hit";
        }
        enemyHtml += `<span class="cell${className}" data-coordX ="${p}" data-coordY = "${i}">${player.gameboard.enemyGameboard[i][p]}</span>`
      }
      enemyHtml += `</div>`;
    }
    enemyHtml += `</div>`;
    $("#" + player.name + "EnemyView").innerHTML = enemyHtml;

    let cells = document.querySelectorAll("#" + player.name + "EnemyView .cell");
    let currentMessage = "";

    const addEventListenersToCells = (playerId, opponentId) => {
      for (var i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", function() {
          //sendAttack = (coordX, coordY, playerToAttack, currentPlayer) in player.
          let coordX = this.dataset.coordx;
          let coordY = this.dataset.coordy;

          console.log(coordX);

          if(this.innerHTML == "x" || this.innerHTML == "s"){
            $("#" + playerId.name + "Message").innerHTML = playerId.player.deputy(5);
          }
          else {
            let result = playerId.player.sendAttack(coordX,coordY,opponentId, playerId);
            console.log(result);
            $("#" + playerId.name + "Message").innerHTML = playerId.player.deputy(result[1]);
            if (result[1] === 3) {
              $("#" + opponentId.name + "Message").innerHTML =opponentId.player.deputy(4);
            }
            if(opponentId.gameboard.checkGameOver()){
              $("#" + playerId.name + "Over").innerHTML = playerId.player.deputy(0);
              $("#" + opponentId.name + "Over").innerHTML = opponentId.player.deputy(1);
              $("#" + opponentId.name + "View").style.display = "block";
              $("#" + playerId.name + "Over").style.display = "block";
              $("#" + opponentId.name + "Over").style.display = "block";
              $("#" + playerId.name + "Message").style.display = "none";
              $("#" + opponentId.name + "Message").style.display = "none";
              $("#" + playerId.name + "EnemyView").style.display = "none";
              $("#" + opponentId.name + "EnemyView").style.display = "none";
              renderPlayerView(playerId,opponentId);
              renderPlayerView(opponentId,playerId);
              hideForms();
              $("#startOver").style.display = "block";
            }
            else{
              renderPlayerView(playerId, opponentId);
              renderPlayerView(opponentId,playerId);
              setTimeout(() => {
                $('#' + playerId.name + 'View').style.display = "none";
                $('#' + playerId.name + 'Switch').style.display = "block";
                $('#' + opponentId.name + 'Switch').style.display = "none";
                console.log(coordX,coordY);
              },200);
              }
            }
        });
      }
    }

    addEventListenersToCells(player,opponent);

  }

  $("#playerOneSwitch").addEventListener("click", function(){
    $("#playerTwoView").style.display = "block";
    $("#playerOneSwitch").style.display = "none";
  });
  $("#playerTwoSwitch").addEventListener("click", function(){
    $("#playerOneView").style.display = "block";
    $("#playerTwoSwitch").style.display = "none";
  });
  //Call that function with playerOne to start playerOne's turn.

  renderPlayerView(playerOne, playerTwo);
  renderPlayerView(playerTwo, playerOne);

  //Allow player to Place Ships. This logic hides and shows the forms.

  const generatePlacementForm = (index, currentPlayer) => {
    let html = `
    <form class="${currentPlayer.name}placement">
      <p>Where should we place the ${currentPlayer.gameboard.shipsArray[index].name}?</p>
      <label>X Coordinate</label>
      <input type="number" id="coordX${index}"></input>
      <label>Y Coordinate</label>
      <input type="number" id="coordY${index}"></input>
      <fieldset>
      <input type="radio" name="orientation" value="h"></input><label>Horizontal</input>
      <input type="radio" name="orientation" value="v"></input><label>Vertical</input>
      </fieldset>
      <input type="submit" value="Place Ship"></input>
    </form>
    `
    $("." + currentPlayer.name + "Form").innerHTML += html;
  }

  for (i = 0 ; i<playerOne.gameboard.shipsArray.length ; i++){
    generatePlacementForm(i, playerOne);
    generatePlacementForm(i,playerTwo);
  }

  let playerOneForms = document.querySelectorAll(".playerOneplacement");
  let playerTwoForms = document.querySelectorAll(".playerTwoplacement");

  let formIndex = 1;
  let newFormIndex = 1;

  const hideForms = () => {
    for (var i = 0; i < playerOneForms.length; i++) {
      playerOneForms[i].style.display = "none";
    }
    for (var i = 0; i < playerTwoForms.length; i++) {
      playerTwoForms[i].style.display = "none";
    }
  }

  for (var i = 0; i < playerOneForms.length; i++) {
    playerOneForms[i].addEventListener("submit", (e) => {
      e.preventDefault();
      var radios = document.getElementsByName("orientation");
      var selectedOrientation = "h";

      for(var i = 0; i < radios.length; i++) {
         if(radios[i].checked)
             selectedOrientation = radios[i].value;
       }
        let coordX = $("#coordX" + formIndex).value;
        let coordY = $("#coordY" + formIndex).value;
        console.log(coordY,coordX);
        if(playerOne.gameboard.placeShip(Number(coordX),Number(coordY),formIndex,selectedOrientation)){
          renderPlayerView(playerOne, playerTwo);
          formIndex++;
          hideForms();
          $("#playerOneEnemyView").style.display = "none";
          playerOneForms[formIndex].style.display = "flex";
          console.log(formIndex);
        }
        else {
          $("#playerOneMessage").innerHTML = playerOne.player.deputy(6);
          console.log("Not a Valid Placement!");
        }
        if(formIndex == 5){
          console.log("DONE FORMING.");
          $('#playerTwoView').style.display = "block";
          $("#playerTwoEnemyView").style.display = "none";
          $('#playerOneView').style.display = "none";
          playerTwoForms[newFormIndex].style.display = "flex";
        }
    });
  }

  for (var i = 0; i < playerTwoForms.length; i++) {
    playerTwoForms[i].addEventListener("submit", (e) => {
      e.preventDefault();
      var radios = document.getElementsByName("orientation");
      var selectedOrientation = "h";

      for(var i = 0; i < radios.length; i++) {
         if(radios[i].checked)
             selectedOrientation = radios[i].value;
       }
        let coordX = $("#coordX" + newFormIndex).value;
        let coordY = $("#coordY" + newFormIndex).value;
        if(playerTwo.gameboard.placeShip(Number(coordX),Number(coordY),newFormIndex,selectedOrientation)){
          renderPlayerView(playerTwo, playerOne);
          newFormIndex++;
          hideForms();
          playerTwoForms[newFormIndex].style.display = "flex";
          console.log(newFormIndex);
        }
        else {
          $("#playerTwoMessage").innerHTML = playerTwo.player.deputy(6);
          console.log("Not a Valid Placement!");
        }
        if(newFormIndex == 5){
          console.log("DONE FORMING BOTH SHIP SETS.");
          $('#playerOneView').style.display = "block";
          $("#playerOneEnemyView").style.display = "block";
          $("#playerTwoEnemyView").style.display = "block";
          $('#playerTwoView').style.display = "none";
          hideForms();
        }
    });
  }

  $("#startOver").addEventListener("click", () => {
    gameLoop();
  });

  hideForms();

  playerOneForms[formIndex].style.display = "flex";
  $('#playerTwoView').style.display = "none";
  $('#playerOneSwitch').style.display = "none";
  $('#playerTwoSwitch').style.display = "none";
  $("#playerOneEnemyView").style.display = "none";
  $("#startOver").style.display = "none";

  return "Ready";

}
gameLoop();
