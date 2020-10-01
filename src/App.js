import React, { useState, useEffect } from 'react';

import seedColours from './utils/seedColours';
import { generatePalette } from './utils/colourHelpers';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Palette from './components/Palette/Palette.component';
import PaletteList from './components/PaletteList/PaletteList.component';
import SingleColourPalette from './components/SingleColourPallete/SingleColourPallete.component';
import Page from './components/Page/Page.component.jsx';
import NewPaletteForm from './components/NewPaletteForm/NewPaletteForm.component';

const App = () => {
	const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));

	const [palettes, setPalletes] = useState(savedPalettes || seedColours);

	useEffect(() => {
		window.localStorage.setItem('palettes', JSON.stringify(palettes));
	}, [palettes]);

	const savePalette = newPallete => {
		setPalletes([...palettes, newPallete]);
	};

	const findPalette = id => {
		return palettes.find(palette => {
			return palette.id === id;
		});
	};

	const deletePalette = id => {
		setPalletes(palettes.filter(p => p.id !== id));
	};

	return (
		<Route
			render={({ location }) => (
				<TransitionGroup>
					<CSSTransition key={location.key} className='pages' timeout={500}>
						<Switch location={location}>
							<Route
								exact
								path='/palette/new'
								render={routeProps => (
									<Page>
										<NewPaletteForm
											savePalette={savePalette}
											palettes={palettes}
											{...routeProps}
										/>
									</Page>
								)}
							/>
							<Route
								exact
								path='/palette/:paletteId/:colourId'
								render={routeProps => (
									<Page>
										<SingleColourPalette
											colourId={routeProps.match.params.colourId}
											palette={generatePalette(
												findPalette(routeProps.match.params.paletteId)
											)}
										/>
									</Page>
								)}
							/>
							<Route
								exact
								path='/'
								render={routeProps => (
									<Page>
										<PaletteList
											palettes={palettes}
											deletePalette={deletePalette}
											{...routeProps}
										/>
									</Page>
								)}
							/>
							<Route
								exact
								path='/palette/:id'
								render={routeProps => (
									<Page>
										<Palette
											palette={generatePalette(
												findPalette(routeProps.match.params.id)
											)}
										/>
									</Page>
								)}
							/>
							<Route
								render={routeProps => (
									<Page>
										<PaletteList
											palettes={palettes}
											deletePalette={deletePalette}
											{...routeProps}
										/>
									</Page>
								)}
							/>
						</Switch>
					</CSSTransition>
				</TransitionGroup>
			)}
		/>
	);
};

export default App;
