import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/styles';
import styles from './ColourPickerForm.styles';

const ColourPickerForm = ({
	colours,
	addNewColour,
	paletteIsFull,
	classes,
}) => {
	const validatorRef = useRef('form');
	const [currColour, setCurrColour] = useState('teal');
	const [newColourName, setNewColourName] = useState('');

	useEffect(() => {
		ValidatorForm.addValidationRule('isColourUnique', value =>
			colours.every(({ colour }) => colour !== currColour)
		);
		ValidatorForm.addValidationRule('isColourNameUnique', value =>
			colours.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);
	}, []);

	const updateCurrentColour = newColour => setCurrColour(newColour.hex);

	const handleChange = e => setNewColourName(e.target.value);

	const handleSubmit = () => {
		const newColour = {
			colour: currColour,
			name: newColourName,
		};
		addNewColour(newColour);
		setNewColourName('');
	};

	return (
		<div>
			<ChromePicker
				color={currColour}
				onChangeComplete={updateCurrentColour}
				className={classes.picker}
			/>
			<ValidatorForm
				onSubmit={handleSubmit}
				ref={validatorRef}
				instantValidate={false}
			>
				<TextValidator
					value={newColourName}
					className={classes.colourNameInput}
					placeholder='Colour Name'
					name='newColourName'
					variant='filled'
					margin='normal'
					onChange={handleChange}
					validators={['required', 'isColourNameUnique', 'isColourUnique']}
					errorMessages={[
						'Enter a colour name',
						'Colour name must be unique',
						'Colour already used!',
					]}
				/>
				<Button
					variant='contained'
					type='submit'
					color='primary'
					disabled={paletteIsFull}
					className={classes.addColour}
					style={{
						backgroundColor: paletteIsFull ? 'grey' : currColour,
					}}
				>
					{paletteIsFull ? 'Palette Full' : 'Add Colour'}
				</Button>
			</ValidatorForm>
		</div>
	);
};

export default withStyles(styles)(ColourPickerForm);
