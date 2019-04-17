/* global chrome */

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Level, Section } from 'react-bulma-components';


const EXTENSION_ID = 'abhjpphflgkfkmcfphlbonifnaadeecc';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ''
    };
  }

  componentDidMount() {
    console.log('%c chrome runtime', 'color: #b0b', chrome.runtime);

    this.port = chrome.runtime.connect(EXTENSION_ID, { name: 'web' });
    this.port.onDisconnect.addListener((event) => {
      console.log('%c port disconnected', 'color: #b0b', event);
      this.setState({
        response: event
      });
    });
    this.port.onMessage.addListener((message) => {
      console.log('%c web port message', 'color: #b0b', message);
      this.setState({
        response: message
      });
    });

    // external runtime cannot listen to messages
  }

  sendMessage = (event) => {
    chrome.runtime.sendMessage(EXTENSION_ID, {
      action: 'web',
    }, (response) => {
      console.log('%c web send message response', 'color: #0bb', response);
      this.setState({
        response
      });
    });
  }

  postMessage = (event) => {
    // console.log('%c post message', 'color: #b0b', this.port);
    this.port.postMessage({
      prompt: 'web'
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Section className="App-content-section">
          <h2 className="App-section-title">Content buttons</h2>
          <Level>
            <Level.Item>
              <Button className="send-message-button">
                Send Message
              </Button>
            </Level.Item>
            <Level.Item>
              <Button className="post-message-button">
                Post Message
              </Button>
            </Level.Item>
          </Level>
        </Section>
        <Section className="App-webpage-section">
          <h2 className="App-section-title">Webpage buttons</h2>
          <Level>
            <Level.Item>
              <Button
                className="send-message-button"
                onClick={this.sendMessage}
              >
                Send Message
              </Button>
            </Level.Item>
            <Level.Item>
              <Button
                className="post-message-button"
                onClick={this.postMessage}
              >
                Post Message
              </Button>
            </Level.Item>
          </Level>
        </Section>
        <Section className="App-response-section">
          <h2 className="App-section-title">Response</h2>
          <p className="App-response-json">
            {JSON.stringify(this.state.response, null, 2)}
          </p>
        </Section>
      </div>
    );
  }
}

export default App;
