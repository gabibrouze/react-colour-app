import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';

import styles from './Palette.styles';

import ColourBox from '../ColourBox/ColourBox.component';
import Navbar from '../Navbar/Navbar.component';
import PaletteFooter from '../PaletteFooter/PaletteFooter.component';

const Palette = ({ palette: { colours, paletteName, emoji, id }, classes }) => {
	const [level, setLevel] = useState(500);
	const [format, setFormat] = useState('hex');

	const changeLevel = lvl => setLevel(lvl);
	const changeFormat = val => setFormat(val);

	const colourBoxes = colours[level].map(colour => (
		<ColourBox
			key={colour.id}
			background={colour[format]}
			name={colour.name}
			moreURL={`/palette/${id}/${colour.id}`}
			showingFullPalette
		/>
	));

	return (
		<div className={classes.Palette}>
			<Navbar
				level={level}
				changeLevel={changeLevel}
				handleChange={changeFormat}
				showingAllColours
			/>
			<div className={classes.colours}>{colourBoxes}</div>
			<PaletteFooter palettName={paletteName} emoji={emoji} />
		</div>
	);
};

export default withStyles(styles)(Palette);
