import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';
import Delete from '@material-ui/icons/Delete';
import styles from './DraggableColourBox.styles';

const DraggableColourBox = SortableElement(
	({ classes, handleClick, name, colour }) => (
		<div className={classes.root} style={{ backgroundColor: colour }}>
			<div className={classes.boxContent}>
				<span> {name}</span>
				<Delete className={classes.deleteIcon} onClick={handleClick} />
			</div>
		</div>
	)
);

export default withStyles(styles)(DraggableColourBox);
