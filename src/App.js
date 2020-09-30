import React, { Fragment } from 'react';

import seedColours from './utils/seedColours';
import { generatePalette } from './utils/colourHelpers';
import { Route, Switch } from 'react-router-dom';

import Palette from './components/Palette/Palette.component';
import PaletteList from './components/PaletteList/PaletteList.component';

const App = () => {
	const findPalette = id => {
		return seedColours.find(palette => {
			return palette.id === id;
		});
	};

	return (
		<Fragment>
			<Switch>
				<Route
					exact
					path='/'
					render={routeProps => (
						<PaletteList palettes={seedColours} {...routeProps} />
					)}
				/>
				<Route
					exact
					path='/palette/:id'
					render={routeProps => (
						<Palette
							palette={generatePalette(findPalette(routeProps.match.params.id))}
						/>
					)}
				/>
			</Switch>
		</Fragment>
	);
};

export default App;
