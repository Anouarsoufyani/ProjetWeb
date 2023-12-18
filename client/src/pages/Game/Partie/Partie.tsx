// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const Partie: React.FC = () => {

    const socket = io('http://localhost:5000/'); // Utilisez le même port que votre serveur
    const sendMessage = () => {
        socket.emit("send_message", { message: "Hello" })
    }

    // socket.emit('joueur', games.owner);

    // socket.on('mainDeCartes', (nouvelleMain) => {
    //     console.log({ main: nouvelleMain });
    // });

    return (
        <div>
            <h1>Chat de la partie</h1>
            {/* <h2 style={{ color: "white" }}>{games.owner}</h2> */}
            <input type="text" />
            <button onClick={sendMessage}>Envoyer le message</button>
        </div>
    );
};

export default Partie;

// const Partie: React.FC = () => {
//     const [mainDeCartes, setMainDeCartes] = useState<string[]>([]);
//     const [message, setMessage] = useState<string>('');
//     const socket = io('http://localhost:5000/game/start'); // Utilisez le même port que votre serveur

//     useEffect(() => {
//         // Écoutez l'événement 'mainDeCartes' émis par le serveur
//         socket.on('mainDeCartes', (nouvelleMain: string[]) => {
//             setMainDeCartes(nouvelleMain);
//         });

//         // Écoutez l'événement 'message' émis par le serveur
//         socket.on('message', (data: string) => {
//             setMessage(data);
//         });

//         // Nettoyez le socket lors du démontage du composant
//         return () => {
//             socket.disconnect();
//         };
//     }, [socket]);

//     const genererOptions = () => {
//         // Émettez un événement au serveur pour demander la nouvelle main
//         socket.emit('demanderMainDeCartes');
//     };

//     return (
//         <div>
//             <h1>Page de la partie</h1>

//             <label htmlFor="cartes">Choisissez vos cartes :</label>
//             <select id="cartes" name="cartes" multiple>
//                 {mainDeCartes.map((carte, index) => (
//                     <option key={index} value={carte}>
//                         {carte}
//                     </option>
//                 ))}
//             </select>

//             <button type="button" onClick={genererOptions}>
//                 Générer Options
//             </button>

//             <div>
//                 <p>Message du serveur : {message}</p>
//             </div>
//         </div>
//     );
// };

// export default Partie;