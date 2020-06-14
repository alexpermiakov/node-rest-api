import searchRoutes from './search/routes';
import authRoutes from './auth/routes';
import topPlacesRoutes from './topPlaces/routes';

export default [...searchRoutes, ...authRoutes, ...topPlacesRoutes];
