import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import styles from './PaletteFormNav.styles';
import classNames from 'classnames';
import {
	CssBaseline,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Button,
} from '@material-ui/core';
import { AddToPhotos } from '@material-ui/icons';

import PaletteMetaForm from '../PaletteMetaForm/PaletteMetaForm.component';

const PaletteFormNav = ({
	classes,
	open,
	palettes,
	handleSubmit,
	handleDrawerOpen,
}) => {
	const [isFormShowing, setIsFormShowing] = useState(false);

	const showForm = () => setIsFormShowing(true);

	const hideForm = () => setIsFormShowing(false);
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='fixed'
				color='default'
				className={classNames(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar disableGutters={!open}>
					<IconButton
						color='inherit'
						aria-label='Open drawer'
						onClick={handleDrawerOpen}
						className={classNames(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<AddToPhotos />
					</IconButton>
					<Typography variant='h6' color='inherit' noWrap>
						Create A Palette
					</Typography>
				</Toolbar>
				<div className={classes.navBtns}>
					<Link to='/'>
						<Button
							variant='contained'
							color='secondary'
							className={classes.button}
						>
							Go Back
						</Button>
					</Link>
					<Button
						variant='contained'
						color='primary'
						onClick={showForm}
						className={classes.button}
					>
						Save
					</Button>
				</div>
			</AppBar>
			{isFormShowing && (
				<PaletteMetaForm
					palettes={palettes}
					handleSubmit={handleSubmit}
					hideForm={hideForm}
				/>
			)}
		</div>
	);
};

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
