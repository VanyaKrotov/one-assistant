import { CustomProvider } from 'rsuite';
import { observer } from 'mobx-react-lite';

import WindowFrame from 'renderer/components/window-frame';
import MainPreloader from './components/main-preloader';
import Modals from './components/modals';

import { profile, view } from './store';
import AppRoutes from './screens';

const App = () => (
  <CustomProvider theme={view.theme}>
    <WindowFrame>
      {profile.isAuthorizeChecked ? <AppRoutes /> : <MainPreloader />}
    </WindowFrame>
    <Modals />
  </CustomProvider>
);

export default observer(App);
