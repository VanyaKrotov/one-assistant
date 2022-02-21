import { Route, Routes, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Screens } from 'definitions/screens';
import { profile } from 'renderer/store';

import { Notes } from './notes';
import { Tasks } from './tasks';
import { Passwords } from './passwords';
import { Settings } from './settings';
import { SignIn, AddProfile } from './auth';

const PublicRoutes = () => (
  <Routes>
    <Route path={Screens.SignIn} element={<SignIn />} />

    <Route path={Screens.AddProfile} element={<AddProfile />} />

    <Route path="*" element={<Navigate to={Screens.SignIn} />} />
  </Routes>
);

const PrivateRoutes = () => (
  <Routes>
    {/* Redirect to notes from root page */}
    <Route path={Screens.Root} element={<Navigate to={Screens.Notes} />} />

    <Route path={Screens.Notes} element={<Notes />} />

    <Route path={Screens.Tasks} element={<Tasks />} />

    <Route path={Screens.Passwords} element={<Passwords />} />

    <Route path={Screens.Settings} element={<Settings />} />

    <Route path="*" element={<Navigate to={Screens.Notes} />} />
  </Routes>
);

const AppRoutes = () =>
  profile.isAuthorized ? <PrivateRoutes /> : <PublicRoutes />;

export default observer(AppRoutes);
