import React from 'react';
import { WindowWidthProvider } from '../components/hooks/useWindowWidth';
import PropTypes from 'prop-types';


const App = ({ Component, pageProps }) => (
  <WindowWidthProvider>
  <React.Fragment>
    <Component {...pageProps} />
  </React.Fragment>
  </WindowWidthProvider>
);

export default App;

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
}