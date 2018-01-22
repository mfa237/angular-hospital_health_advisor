import { MenuType, RouteInfo } from './navbar.metadata';

export const ROUTES: RouteInfo[] = [
  { path: '', title: 'Home', menuType: MenuType.BRAND },
  { path: 'doctors', title: 'Doctors', menuType: MenuType.RIGHT },
  { path: 'appointment', title: 'Apponitments', menuType: MenuType.RIGHT }
];