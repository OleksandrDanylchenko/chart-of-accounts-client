import React from 'react';
import { Route } from 'react-router-dom';

interface IPublicRoute {
  component: React.ElementType;
  path: string;
  title?: string;
  exact?: boolean;
}

type PublicRouteProps = IPublicRoute;

const PublicRoute: React.FunctionComponent<PublicRouteProps> = ({
  component: Component,
  title,
  path,
  exact
}) => (
  <Route
    path={path}
    exact={exact}
    render={(routeProps) => {
      if (title) document.title = title;
      return <Component {...routeProps} />;
    }}
  />
);

export default PublicRoute;
