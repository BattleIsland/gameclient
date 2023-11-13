import logo from './logo.svg';
import './App.css';
import {Client} from '@stomp/stompjs';
import {useEffect, useRef} from 'react';
import { GameView } from './GameView';


function App() {
  const client = useRef();

  useEffect(() => {
    const newClient = new Client({
      brokerURL: 'ws://localhost:8080/websocket-endpoint',
      onConnect: () => {
        newClient.subscribe('/topic/messages', message =>
          console.log(`Received: ${message.body}`)
        );
        // client.publish({ destination: '/topic/messages', body: 'First Message' });
      },
    })
    newClient.activate();
  }, [])

  return (
    <GameView/>
  );
}

export default App;
