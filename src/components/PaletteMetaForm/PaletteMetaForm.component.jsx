import React, { useEffect, useState } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

const PaletteMetaForm = ({ palettes, handleSubmit, hideForm }) => {
	const [stage, setStage] = useState('form');
	const [newPaletteName, setNewPaletteName] = useState('');
	// const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
			palettes.every(
				({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
	}, []);

	const showEmojiPicker = () => setStage('emoji');

	const savePalette = emoji => {
		const newPalette = {
			paletteName: newPaletteName,
			emoji: emoji.native,
		};
		handleSubmit(newPalette);
		setStage('');
	};

	const handleChange = e => setNewPaletteName(e.target.value);
	// const handleClickOpen = () => setIsOpen(true);
	// const handleClickClose = () => setIsOpen(false);

	return (
		<div>
			<Dialog open={stage === 'emoji'} onClose={hideForm}>
				<DialogTitle id='form-dialog-title'>Choose a Palette Emoji</DialogTitle>
				<Picker title='Pick a Palette Emoji' onSelect={savePalette} />
			</Dialog>
			<Dialog
				open={stage === 'form'}
				aria-labelledby='form-dialog-title'
				onClose={hideForm}
			>
				<DialogTitle id='form-dialog-title'>Choose a Palette Name</DialogTitle>
				<ValidatorForm onSubmit={showEmojiPicker}>
					<DialogContent>
						<DialogContentText>
							Please Enter a unique name for your new palette!
						</DialogContentText>
						<TextValidator
							label='Palette Name'
							value={newPaletteName}
							name='newPaletteName'
							onChange={handleChange}
							fullWidth
							margin='normal'
							validators={['required', 'isPaletteNameUnique']}
							errorMessages={['Enter Palette Name', 'Name already in use']}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={hideForm} color='primary'>
							Cancel
						</Button>
						<Button variant='container' color='primary' type='submit'>
							Save Palette
						</Button>
					</DialogActions>
				</ValidatorForm>
			</Dialog>
		</div>
	);
};

export default PaletteMetaForm;
