import React, { Component } from 'react';
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles} from '@material-ui/core/styles'
import Select from 'react-select';

import options from './riven_menu.js';

const styles = {
	root: {
		width: '100%',
	},
	bar: {
		fbackgroundColor: '#9672b2', boxShadow: 'none'
	},
	title: {
		display: 'block',
		marginRight: '1%',
		textAlign: 'center',
	},
	search1: {
		position: 'absolute',
		marginRight: '5%',
		width: '50%',
	},
	search2: {
		position: 'absolute',
		marginLeftt: '5%',
		width: '45%',
	},
};

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			platform: null,
		}
	}

	// Callbacks since setState is asynchronous
	handleChange_Weapon = selected => {
		if (selected != null) {
			this.setState({
				name: selected.value,
			}, () => { this.props.get_riven_type(this.state.name, this.state.platform); });
		} else {
			this.setState({
				name: null,
			}, () => { this.props.get_riven_type(this.state.name, this.state.platform); })
		}
	}

	

	handleChange_Platform = selected => {
		if (selected != null) {
			this.setState({
				platform: selected.value,
			}, () => { this.props.get_riven_type(this.state.name, this.state.platform); });
		} else {
			this.setState({
				platform: null,
			}, () => { this.props.get_riven_type(this.state.name, this.state.platform); })
		}
	}

	

	render() {
		const {classes} = this.props;
		const colourStyles = {
	    control: styles => ({ 
	    	...styles,
	    	color: 'black', 
	    	border: 0,
	    }),
	    option: styles => ({
	        ...styles,
	        color: 'black',
	    }),
	    singleValue: styles => ({ 
	    	...styles, 
	    	color: 'black' 
	    }),
		};
		const platform_options = [
			{label: "PC", value: "pc"},
			{label: "PS4", value: "ps4"},
			{label: "XBox", value: "xbox"},
			{label: "Switch", value: "switch"},
		]

		return (
			<div className={classes.root}>
				<AppBar position="static" style={{backgroundColor: '#9672b2', boxShadow: 'none'}} >
					<Toolbar style={{ margin: 'auto', width: '85%' }}>
						<Select
							className={classes.search1}
					    label="Single select"
					    options={options}
					    styles={colourStyles}
					    isClearable={true}
					    placeholder={'Weapon'}
					    onChange={this.handleChange_Weapon}
  					/>
  					<Select
							className={classes.search2}
					    label="Single select"
					    options={platform_options}
					    styles={colourStyles}
					    isClearable={true}
					    placeholder={'Platform'}
					    onChange={this.handleChange_Platform}
  					/>
					</Toolbar>
				</AppBar>
			</div>
		)
	}
}

NavBar.propTypes = {
	get_riven_type: PropTypes.func,
}

export default withStyles(styles)(NavBar);