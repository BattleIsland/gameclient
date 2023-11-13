import logo from './logo.svg';
import './App.css';
import {Client} from '@stomp/stompjs';
import {useEffect, useRef} from 'react';


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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
