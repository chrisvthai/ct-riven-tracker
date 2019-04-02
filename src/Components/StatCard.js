import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'

const styles = {
	root: {
		marginTop: '5px',
	},
	paper: {
		width: '90%',
		maxWidth: '800px',
		minHeight: '80vh',
		margin: 'auto',
		marginTop: '20px',
		paddingTop: '20px',
		marginBottom: '20px',
		paddingBottom: '20px',
	},
	heading: {
		textAlign: 'center',
		marginTop: '5px',
		marginLeft: 'auto',
		marginRight: 'auto',
		width: '85%',
		maxWidth: '350px', 
	},
	body: {
		textAlign: 'left',
		marginTop: '5px',
		marginLeft: 'auto',
		marginRight: 'auto',
		width: '85%',
		maxWidth: '300px', 
	}
};

class StatCard extends Component {

	render() {
		const { classes } = this.props;

		var text;
		if (this.props.weapon == null || this.props.platform == null) {
			text = 
				<div>
				<Typography variant='h6' className={classes.heading}> 
					Directions:
				</Typography>
				<Typography variant='body1' className={classes.body}> 
					1. Start typing a weapon name in the left searchbar
				</Typography>
				<Typography variant='body1' className={classes.body}> 
					2. Choose your gaming platform from the right searchbar
				</Typography>
				<Typography variant='body1' className={classes.body}> 
					3. View trade data for that weapon on that platform, as provided by DE!
				</Typography>
				</div>
		} else {
			if (this.props.weapon.startsWith("VEILED")) { // We're looking for veiled mods
				var stats = null;
				var type;

				switch (this.props.weapon) {
					case "VEILED KITGUN":
						type = "Kitgun Riven Mod";
						break;
					case "VEILED MELEE":
						type = "Melee Riven Mod";
						break;
					case "VEILED PISTOL":
						type = "Pistol Riven Mod";
						break;
					case "VEILED RIFLE":
						type = "Rifle Riven Mod";
						break;
					case "VEILED SHOTGUN":
						type = "Shotgun Riven Mod";
						break;
				}

				for (var i = 0; i < this.props.all_stats.length; ++i) {
					if (this.props.all_stats[i].itemType == type && this.props.all_stats[i].compatibility == null) {
						stats = this.props.all_stats[i];
						break;
					}
				}
				text = 
					<div>
						<Typography variant='h3' className={classes.heading}> {this.props.weapon} </Typography>
						<Typography variant='body1' className={classes.body}> Average price: {stats.avg} </Typography>
						<Typography variant='body1' className={classes.body}> Minimum price: {stats.min} </Typography>
						<Typography variant='body1' className={classes.body}> Maximum price: {stats.max} </Typography>
						<Typography variant='body1' className={classes.body}> Standard Deviation: {stats.stddev} </Typography>
						<Typography variant='body1' className={classes.body}> Popularity: {stats.pop} </Typography>
					</div>

			} else { // We need to find unrolled and rerolled stats for a given weapon
				var unrolled_stats = null, rerolled_stats = null;

				for (var i = 0; i < this.props.all_stats.length; ++i) {
					if (this.props.all_stats[i].compatibility == this.props.weapon) {
						if (this.props.all_stats[i].rerolled)
							rerolled_stats = this.props.all_stats[i];
						else
							unrolled_stats = this.props.all_stats[i];
					}
				}

				// Conditional rendering components
				var unrolled_data, rerolled_data;

				// Work on unrolled_data
				if (unrolled_stats == null) {
					unrolled_data =
						<Typography variant='body1' className={classes.body}> 
							Unrolled riven data not available. Perhaps nobody traded for this type of riven mod.
						</Typography>
				} else {
					unrolled_data = 
						<div>
							<Typography variant='h5' className={classes.heading}> Unrolled stats: </Typography>
							<Typography variant='body1' className={classes.body}> Average price: {unrolled_stats.avg} </Typography>
							<Typography variant='body1' className={classes.body}> Minimum price: {unrolled_stats.min} </Typography>
							<Typography variant='body1' className={classes.body}> Maximum price: {unrolled_stats.max} </Typography>
							<Typography variant='body1' className={classes.body}> Standard Deviation: {unrolled_stats.stddev} </Typography>
							<Typography variant='body1' className={classes.body}> Popularity: {unrolled_stats.pop} </Typography>
						</div>
				}

				// Work on rerolled_data
				if (rerolled_stats == null) {
					rerolled_data =
						<Typography variant='body1' className={classes.body}> 
							Rerolled riven data not available. Perhaps nobody traded for this type of riven mod.
						</Typography>
				} else {
					rerolled_data = 
						<div>
							<Typography variant='h5' className={classes.heading}> Rerolled stats: </Typography>
							<Typography variant='body1' className={classes.body}> Average price: {rerolled_stats.avg} </Typography>
							<Typography variant='body1' className={classes.body}> Minimum price: {rerolled_stats.min} </Typography>
							<Typography variant='body1' className={classes.body}> Maximum price: {rerolled_stats.max} </Typography>
							<Typography variant='body1' className={classes.body}> Standard Deviation: {rerolled_stats.stddev} </Typography>
							<Typography variant='body1' className={classes.body}> Popularity: {rerolled_stats.pop} </Typography>
						</div>
				}

				text = 
					<div>
						<Typography variant='h2' className={classes.heading}> {this.props.weapon} </Typography>
						{ unrolled_data }
						<Typography variant='h4' className={classes.heading}> -------------------- </Typography>
						{ rerolled_data }
					</div>
			}
		}

		return (
			<div className={classes.root}>
				<Paper className={classes.paper} elevation={4}>
					{text}
				</Paper>
			</div>
		)
	}

}

StatCard.propTypes = {
	all_stats: PropTypes.array,
	weapon: PropTypes.string,
	platform: PropTypes.string,
}

export default withStyles(styles)(StatCard);