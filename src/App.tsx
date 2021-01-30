import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import AccountsContainer from './pages/Accounts/AccountsContainer';
import { store } from './redux/store';

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <AccountsContainer />
    </Provider>
  );
};

export default App;
