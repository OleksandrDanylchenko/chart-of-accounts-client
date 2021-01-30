import { createBrowserHistory } from 'history';
import React, { FunctionComponent, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import PublicRoute from './PublicRoute';
export const history = createBrowserHistory();

const AccountsContainer = React.lazy(
  () => import('../pages/Accounts/AccountsContainer')
);

const SyntheticAccountsContainer = React.lazy(
  () => import('../pages/SyntheticAccounts/SyntheticAccountsContainer')
);

const Routing: FunctionComponent = () => (
  <Suspense
    fallback={
      <Loader type={'TailSpin'} color={'black'} height={150} width={150} />
    }
  >
    <Switch>
      <PublicRoute
        exact
        path="/accounts/:id?"
        title="Accounts"
        component={AccountsContainer}
      />
      <PublicRoute
        exact
        path="/synthetic-accounts/:accountId/:id?"
        title="Synthetic accounts"
        component={SyntheticAccountsContainer}
      />
      {/*<PublicRoute*/}
      {/*  path="/sub-accounts/:syntheticAccountId/:id"*/}
      {/*  title="Sub accounts"*/}
      {/*  component={AccountsContainer}*/}
      {/*/>*/}
      <Route path="/*">
        <Redirect to="/accounts" />
      </Route>
    </Switch>
  </Suspense>
);

export default Routing;
