import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

import Navbar from '../Navbar/Navbar.component';
import ColourBox from '../ColourBox/ColourBox.component';
import PaletteFooter from '../PaletteFooter/PaletteFooter.component';
import styles from '../Palette/Palette.styles';

const SingleColourPalette = ({
	palette,
	palette: { paletteName, emoji, id },
	colourId,
	classes,
}) => {
	const [format, setFormat] = useState('hex');

	const gatherShades = (palette, colourFilter) => {
		let shades = [];
		let allColours = palette.colours;

		for (let key in allColours) {
			shades = shades.concat(
				allColours[key].filter(colour => colour.id === colourFilter)
			);
		}
		return shades.slice(1);
	};

	const _shades = gatherShades(palette, colourId);

	const changeFormat = val => {
		setFormat(val);
	};

	const colourBoxes = _shades.map(colour => (
		<ColourBox
			key={colour.name}
			name={colour.name}
			background={colour[format]}
			showingFullPalette={false}
		/>
	));

	return (
		<div className={classes.Palette}>
			<Navbar handleChange={changeFormat} showingAllColors={false} />
			<div className={classes.colours}>
				{colourBoxes}
				<div className={classes.goBack}>
					<Link to={`/palette/${id}`}>GO BACK</Link>
				</div>
			</div>
			<PaletteFooter paletteName={paletteName} emoji={emoji} />
		</div>
	);
};

export default withStyles(styles)(SingleColourPalette);
