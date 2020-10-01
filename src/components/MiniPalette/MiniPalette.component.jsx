import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './MinPalette.styles';
import { Delete } from '@material-ui/icons';

const MiniPalette = ({
	id,
	classes,
	paletteName,
	emoji,
	colours,
	openDialog,
	goToPalette,
}) => {
	const deletePalette = e => {
		e.stopPropagation();
		openDialog(id);
	};

	const handleClick = () => goToPalette(id);

	const miniColourBoxes = colours.map(colour => (
		<div
			className={classes.miniColour}
			style={{ backgroundColor: colour.colour }}
			key={colour.name}
		/>
	));

	return (
		<div className={classes.root} onClick={handleClick}>
			<Delete
				className={classes.deleteIcon}
				style={{ transition: 'all 0.3s ease-in-out' }}
				onClick={deletePalette}
			/>

			<div className={classes.colours}>{miniColourBoxes}</div>
			<h5 className={classes.title}>
				{paletteName} <span className={classes.emoji}>{emoji}</span>
			</h5>
		</div>
	);
};

export default withStyles(styles)(MiniPalette);
