import type { FC, ComponentType } from 'react';

export interface RouteProps {
  path: string;
  component: ComponentType;
}

export const Route: FC<RouteProps> = ({ component: Component }: RouteProps) => {
  return <Component />;
};