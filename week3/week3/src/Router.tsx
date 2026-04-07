import type { FC, ReactElement } from 'react';
import { Children, useMemo, cloneElement, useCallback } from 'react';
import { useCurrentPath, useSetPath } from './PathContext';
import type { RouteProps } from './Route';

export interface RoutesProps {
  children: ReactElement[];
}

const isRouteElement = (element: any): element is ReactElement<RouteProps> => {
  return element?.type?.name === 'Route';
};

export const Routes: FC<RoutesProps> = ({ children }) => {
  const currentPath = useCurrentPath();
  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children).filter(isRouteElement);
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);

  if (!activeRoute) return null;
  return cloneElement(activeRoute);
};

export interface LinkProps {
  to: string;
  children: React.ReactNode;
}

export const Link: FC<LinkProps> = ({ to, children }) => {
  const setPath = useSetPath();
  
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setPath(to);
  }, [to, setPath]);

  return (
    <a href={to} onClick={handleClick} style={{ cursor: 'pointer' }}>
      {children}
    </a>
  );
};