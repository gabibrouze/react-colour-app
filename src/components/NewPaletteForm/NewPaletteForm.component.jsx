import React, { useState } from 'react';
import styles from './NewPaletteForm.styles';
import { withStyles } from '@material-ui/core/styles';
import { arrayMove } from 'react-sortable-hoc';
import classNames from 'classnames';
import {
	Button,
	Drawer,
	Typography,
	Divider,
	IconButton,
} from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';

import seedColours from '../../utils/seedColours';

import DraggableColourList from '../DraggableColourList/DraggableColourList.component';
import PaletteFormNav from '../PaletteFormNav/PaletteFormNav.component';
import ColourPickerForm from '../ColourPickerForm/ColourPickerForm.component';

const NewPaletteForm = ({ palettes, savePalette, history, classes }) => {
	const maxColours = 20;
	const [isOpen, setIsOpen] = useState(true);
	const [colours, setColours] = useState(seedColours[0].colours);
	const [newColourName, setNewColourName] = useState('');

	const handleDrawerOpen = () => setIsOpen(true);
	const handleDrawerClose = () => setIsOpen(false);

	const addNewColour = newColour => {
		setColours([...colours, newColour]);
		setNewColourName('');
	};

	const clearColours = () => {
		setColours([]);
	};

	const addRandomColour = () => {
		const allColours = palettes.map(p => p.colours).flat();
		let rand;
		let randomColour;
		let isDuplicateColour = true;

		while (isDuplicateColour) {
			rand = Math.floor(Math.random() * allColours.length);
			randomColour = allColours[rand];

			isDuplicateColour = colours.some(
				colour => colour.name === randomColour.name
			);
		}
		setColours([...colours, randomColour]);
	};

	const handleSubmit = newPalette => {
		newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
		newPalette.colours = colours;
		savePalette(newPalette);
		history.push('/');
	};

	const removeColour = colourName => {
		setColours(colours.filter(colour => colour.name !== colourName));
	};

	const onSortEnd = ({ oldIndex, newIndex }) => {
		setColours(arrayMove(colours, oldIndex, newIndex));
	};

	const paletteIsFull = colours.length >= maxColours;

	return (
		<div className={classes.root}>
			<PaletteFormNav
				open={isOpen}
				palettes={palettes}
				handleSubmit={handleSubmit}
				handleDrawerOpen={handleDrawerOpen}
			/>
			<Drawer
				className={classes.drawer}
				variant='persistent'
				anchor='left'
				open={isOpen}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeft />
					</IconButton>
				</div>
				<Divider />
				<div className={classes.container}>
					<Typography variant='h4' gutterBottom>
						Design Your Palette
					</Typography>
					<div className={classes.buttons}>
						<Button
							variant='contained'
							color='secondary'
							onClick={clearColours}
							className={classes.button}
						>
							Clear Palette
						</Button>
						<Button
							variant='contained'
							className={classes.button}
							color='primary'
							onClick={addRandomColour}
							disabled={paletteIsFull}
						>
							Random Color
						</Button>
					</div>
					<ColourPickerForm
						paletteIsFull={paletteIsFull}
						addNewColour={addNewColour}
						colours={colours}
					/>
				</div>
			</Drawer>
			<main
				className={classNames(classes.content, {
					[classes.contentShift]: isOpen,
				})}
			>
				<div className={classes.drawerHeader} />
				<DraggableColourList
					colours={colours}
					removeColour={removeColour}
					axis='xy'
					onSortEnd={onSortEnd}
					distance={20}
				/>
			</main>
		</div>
	);
};
export default withStyles(styles, { withTheme: true })(NewPaletteForm);
