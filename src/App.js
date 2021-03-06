import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pc : [],
      ps4 : [],
      xbox : [],
      switch : [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {

    const pc_json = async () => {
      const url = "http://n9e5v4d8.ssl.hwcdn.net/repos/weeklyRivensPC.json";
      const res = await fetch(url);
      const res_json = await res.json();
      this.setState( {pc: res_json});
    };

    const ps4_json = async () => {
      const url = "http://n9e5v4d8.ssl.hwcdn.net/repos/weeklyRivensPS4.json";
      const res = await fetch(url);
      const res_json = await res.json();
      this.setState( {ps4: res_json});
    };

    const xbox_json = async () => {
      const url = "http://n9e5v4d8.ssl.hwcdn.net/repos/weeklyRivensXB1.json";
      const res = await fetch(url);
      const res_json = await res.json();
      this.setState( {xbox: res_json});
    };

    const switch_json = async () => {
      const url = "http://n9e5v4d8.ssl.hwcdn.net/repos/weeklyRivensSWI.json";
      const res = await fetch(url);
      const res_json = await res.json();
      this.setState( {switch: res_json});
    };

    pc_json();
    ps4_json();
    xbox_json();
    switch_json();
  }

  render() {
    console.log(this.state.pc);
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
}

export default App;
