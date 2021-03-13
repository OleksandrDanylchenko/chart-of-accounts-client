import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from 'react-loader-spinner';
import { Router } from 'react-router-dom';
import Routing, { history } from './navigation/RouterConfig';

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <Loader type={'TailSpin'} color={'black'} height={150} width={150} />
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        persistor={persistor}
      >
        <Router history={history}>
          <Routing />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
