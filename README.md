# BattleShip Game

A 2 player BattleShip game where players take turns placing their four ships and attacking the enemy player by selecting coordinates.

The first player to sink all of the opponent's ships is the winner.

[Live Demo](https://ezeaspie.github.io/battleship-game/)

## Playing the Game

### Placing Ships

Player 1 starts the game by placing ships in their territory. A player can place their ships horizontally or vertically. Each of the following must be placed:

1. **Submarine** (3 spaces)
1. **Destroyer** (3 spaces)
1. **Battleship** (4 spaces)
1. **Aircraft Carrier** (5 spaces)

Once the first player has finished placing all four of their ships, the screen will switch and show a different "deputy captain". This is the interface for Player 2 to place their ships. Player 2 then follows the same steps as Player 1 to place their ships.

Once Player 2 has finished placing their ships, everything will vanish except for a button that says "Click to take Player 1's turn."

This is to prevent Player 2 from ever seeing Player 1's game boards.

### Attacking the Enemy

After placing each of their ships, the player should see two game boards now, labeled **Our Territory** and **Enemy Territory**.

The current player is able to click on any cell in the **Enemy Territory** board to send an attack to that position.

The deputy captain on the top of the screen will notify the player if the selected area has already been hit, if the shot missed, or if the shot hit an enemy ship. The current player then will get shown a button telling them to pass it to the other player.

When another player is ready to send an attack, the deputy captain will notify them if any part of their fleet was hit during the opponent's attack and mark the **Our Territory** board to reflect it.

Each player's boards are updated every turn to signal a miss or a hit, making it easy to keep track of what spots have been hit before.

## Ending the game

The game ends when a player sinks all the opponent ships. When this happens, the screen will show both players' boards and the deputy captains will notify the player that they have won or lost.

A button will appear that allows players to restart the game.
