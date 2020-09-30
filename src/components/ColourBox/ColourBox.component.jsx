import React, { useState, useEffect } from 'react';
import styles from './ColourBox.styles';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';

const ColourBox = ({
	background,
	name,
	moreURL,
	showingFullPalette,
	classes,
}) => {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (copied) setTimeout(() => setCopied(false), 1500);
	}, [copied]);

	return (
		<CopyToClipboard text={background} onCopy={() => setCopied(true)}>
			<div style={{ background }} className={classes.ColourBox}>
				<div
					style={{ background }}
					className={classNames(classes.copyOverlay, {
						[classes.showOverlay]: copied,
					})}
				/>
				<div
					className={classNames(classes.copyMessage, {
						[classes.showMessage]: copied,
					})}
				>
					<h1>Copied!</h1>
					<p className={classes.copyText}>{background}</p>
				</div>
				<div>
					<div className={classes.boxContent}>
						<span className={classes.colourName}>{name}</span>
					</div>
					<button className={classes.copyButton}>Copy</button>
				</div>
				{showingFullPalette && (
					<Link to={moreURL} onClick={e => e.stopPropagation()}>
						<span className={classes.seeMore}>MORE</span>
					</Link>
				)}
			</div>
		</CopyToClipboard>
	);
};

export default withStyles(styles)(ColourBox);
