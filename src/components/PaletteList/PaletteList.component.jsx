import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
	Dialog,
	DialogTitle,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
} from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import { Check, Close } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import styles from './PaletteList.styles';

import MiniPalette from '../MiniPalette/MiniPalette.component';

const PaletteList = ({ history, deletePalette, palettes, classes }) => {
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
	const [deletingID, setDeletingID] = useState('');

	const openDialog = id => {
		setIsOpenDeleteDialog(true);
		setDeletingID(id);
	};

	const closeDialog = id => {
		setIsOpenDeleteDialog(false);
		setDeletingID('');
	};

	const goToPalette = id => {
		history.push(`/palette/${id}`);
	};

	const handleDelete = () => {
		deletePalette(deletingID);
		closeDialog();
	};

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<nav className={classes.nav}>
					<h1 className={classes.heading}>React Colours</h1>
					<Link to='/palette/new'>Create Palette</Link>
				</nav>
				<TransitionGroup className={classes.palettes}>
					{palettes.map(palette => (
						<CSSTransition key={palette.id} className='fade' timeout={500}>
							<MiniPalette
								{...palette}
								goToPalette={goToPalette}
								openDialog={openDialog}
								key={palette.id}
								id={palette.id}
							/>
						</CSSTransition>
					))}
				</TransitionGroup>
			</div>
			<Dialog
				open={isOpenDeleteDialog}
				aria-labelledby='delete-dialog-title'
				onClose={closeDialog}
			>
				<DialogTitle id='delete-dialog-title'>Delete this Palette?</DialogTitle>
				<List>
					<ListItem button onClick={handleDelete}>
						<ListItemAvatar>
							<Avatar style={{ backgroundColour: blue[100], color: blue[600] }}>
								<Check />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='Delete' />
					</ListItem>
					<ListItem button onClick={closeDialog}>
						<ListItemAvatar>
							<Avatar style={{ backgroundColor: red[100], color: red[600] }}>
								<Close />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary='Cancel' />
					</ListItem>
				</List>
			</Dialog>
		</div>
	);
};

export default withStyles(styles)(PaletteList);
