import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './Navbar.styles';
import { Link } from 'react-router-dom';
import { Select, MenuItem, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Navbar = ({
	level,
	changeLevel,
	showingAllColours,
	classes,
	handleChange,
}) => {
	const [format, setFormat] = useState('hex');
	const [isOpen, setIsOpen] = useState(false);

	const handleFormatChange = e => {
		setFormat(e.target.value);
		setIsOpen(true);
		handleChange(e.target.value);
	};

	const closeSnackbar = () => setIsOpen(false);

	return (
		<header className={classes.Navbar}>
			<div className={classes.logo}>
				<Link to='/'>reactcolourpicker</Link>
			</div>
			{showingAllColours && (
				<div>
					<span>Level: {level}</span>
					<div className={classes.slider}>
						<Slider
							defaultValue={level}
							min={100}
							max={900}
							step={100}
							onAfterChange={changeLevel}
						/>
					</div>
				</div>
			)}
			<div className={classes.selectContainer}>
				<Select value={format} onChange={handleFormatChange}>
					<MenuItem value='hex'>HEX - #ffffff</MenuItem>
					<MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
					<MenuItem value='rgba'>RGBA - rgba(255,255,255, 1.0)</MenuItem>
				</Select>
			</div>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				open={isOpen}
				autoHideDuration={3000}
				message={
					<span id='message-id'>Format Changed To {format.toUpperCase()}</span>
				}
				ContentProps={{
					'aria-describedby': 'message-id',
				}}
				onClose={closeSnackbar}
				action={[
					<IconButton
						onClick={closeSnackbar}
						color='inherit'
						key='close'
						aria-label='close'
					>
						<CloseIcon />
					</IconButton>,
				]}
			/>
		</header>
	);
};

export default withStyles(styles)(Navbar);
