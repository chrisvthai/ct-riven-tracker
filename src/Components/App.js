import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import logo from '../logo.svg';
//import '../App.css';

import Banner from './Banner.js';
import NavBar from './NavBar.js';
import StatCard from './StatCard.js';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#230d3d',
      main: '#230d3d',
      dark: '#230d3d',
    },
    secondary: {
      main: '#230d3d',
    },
  },
  typography: { useNextVariants: true },
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weapon: null,
      platform: null,
      loading: true,
      pc : [],
      ps4 : [],
      xbox : [],
      switch : [],
    };
    this.get_riven_type_callback = this.get_riven_type_callback.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {

    const pc_json = async () => {
      const url = "https://n9e5v4d8.ssl.hwcdn.net/repos/weeklyRivensPC.json";
      const res = await fetch(url);
      const res_json = await res.json();
      this.setState( {pc: res_json});
    };

    const ps4_json = async () => {
      const url = "https://n9e5v4d8.ssl.hwcdn.net/repos/weeklyRivensPS4.json";
      const res = await fetch(url);
      const res_json = await res.json();
      this.setState( {ps4: res_json});
    };

    const xbox_json = async () => {
      const url = "https://n9e5v4d8.ssl.hwcdn.net/repos/weeklyRivensXB1.json";
      const res = await fetch(url);
      const res_json = await res.json();
      this.setState( {xbox: res_json});
    };

    const switch_json = async () => {
      const url = "https://n9e5v4d8.ssl.hwcdn.net/repos/weeklyRivensSWI.json";
      const res = await fetch(url);
      const res_json = await res.json();
      this.setState( {switch: res_json});
    };

    pc_json();
    ps4_json();
    xbox_json();
    switch_json();
  }

  get_riven_type_callback(wep_name, platform)  {
    this.setState({
      weapon: wep_name,
      platform: platform,
    });
  }

  render() {
    // First see which platform I should pull from
    var json;
    switch (this.state.platform) {
      case "pc":
        json = this.state.pc;
        break;
      case "ps4":
        json = this.state.ps4;
        break;
      case "xbox":
        json = this.state.xbox;
        break;
      case "switch":
        json = this.state.switch;
        break;
      default:
        json = null;
    }

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Banner />
          <NavBar get_riven_type={this.get_riven_type_callback}/>
          <StatCard all_stats={json} weapon={this.state.weapon} platform={this.state.platform} />
        </MuiThemeProvider>
      </div>
      
    );
  }
}

export default App;
