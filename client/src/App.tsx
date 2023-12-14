import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CardDeck, Player } from './CardDeck'


function App() {
  const [count, setCount] = useState(0)

  const player1 = new Player("Anouar", 0);
  const player2 = new Player("Abou", 0);

  const players = [player1, player2];

  const cardDeck = new CardDeck();
  // const paquet = cardDeck.deck;
  // const paquetMelange = cardDeck.shuffleDeck(paquet);
  // console.log(paquetMelange);



  const distribuer = (player: Player, CardDeck: CardDeck) => {
    const deck = CardDeck.deck;
    const shuffledDeck = cardDeck.shuffleDeck(deck);

    const nbCartes = deck.length;
    let currentIndex = nbCartes;
    while (currentIndex > nbCartes / 2) {
      currentIndex--;

      players.forEach(player => {

        player.addCard(shuffledDeck[currentIndex]);
        CardDeck.removeCard();
        currentIndex--;
      });

    }

    return players;
  }
  // console.log(paquetMelange);
  const distribPlayers = distribuer(player1, cardDeck);
  distribPlayers.forEach(p => {
    console.log(p.getHand());

  });



  // player1.addCard({ identifiant: "AS", symbole: "Pique" });
  // const hand = player1.getHand();
  // console.log(hand);


  // const asdetrefle = cardDeck.getCard("AS", "Trefle");
  // console.log(asdetrefle);



  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>{player1.getUsername()}</p>
    </>
  )
}

export default App
