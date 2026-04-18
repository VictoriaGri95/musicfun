import {MainPage} from "@/app/ui/MainPage/MainPage.tsx";
import {Route, Routes} from "react-router";
import {
  PlaylistsPage
} from "@/features/playlists/ui/PlaylistsPage/PlaylistsPage.tsx";
import {TracksPage} from "@/features/tracks/ui/TracksPage.tsx";
import {ProfilePage} from "@/features/auth/ui/ProfilePage/ProfilePage.tsx";

import {PageNotFound} from "@/common/components";
import {Path} from "@/common/constants";


export const Routing = () => (
  <Routes>
    <Route
      path={Path.Main}
      element={<MainPage />}
    />
    <Route
      path={Path.Playlists}
      element={<PlaylistsPage />}
    />
    <Route
      path={Path.Tracks}
      element={<TracksPage />}
    />
    <Route
      path={Path.Profile}
      element={<ProfilePage />}
    />
    <Route
      path={Path.NotFound}
      element={<PageNotFound />}
    />
  </Routes>
)