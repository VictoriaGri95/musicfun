export const Path = {
  Main: '/',
  Playlists: '/playlists',
  Tracks: '/tracks',
  Profile: '/profile',
  NotFound: '*',
  OAuthRedirect: '/oauth/callback',
} as const

export const AUTH_KEYS = {
  accessToken: 'musicfun-access-token',
  refreshToken: 'musicfun-refresh-token',
} as const