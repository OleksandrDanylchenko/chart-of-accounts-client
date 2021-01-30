import React, { FunctionComponent } from 'react';
import HomeContainer from './pages/Accounts/AccountsContainer';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <h1>ggg</h1>
      <HomeContainer />
    </Provider>
  );
};

export default App;
