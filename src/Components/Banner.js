import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'


const bannerStyle = {
	paddingTop: '25px',
	paddingBottom: '15px',
	paddingLeft: '5px',
	paddingRight: '5px',
	backgroundColor: '#9672b2',
}

class Banner extends Component {
	render() {
		return (
			<div align="center" style={bannerStyle}>
				<div >
					<Typography color="primary" variant='h1'>
						Riven Tracker
					</Typography>
					<Typography color="primary" variant='subtitle1'>
						A no-nonsense tool that displays the latest Riven trading info provided by DE!
					</Typography>
				</div>
			</div>
		)
	}
}

export default Banner;