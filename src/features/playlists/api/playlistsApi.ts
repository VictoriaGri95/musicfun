import type {
  CreatePlaylistArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";
import {baseApi} from "@/app/api/baseApi.ts";

export const playlistsApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({
    fetchPlaylists: builder.query<PlaylistsResponse, void>({
      query: () => `playlists`,
      providesTags: ['Playlist'],
    }),
    createPlaylist: builder.mutation<{
      data: PlaylistData
    }, CreatePlaylistArgs>({
      query: body => ({
        url: 'playlists',
        method: 'post',
        body
      }),
      invalidatesTags: ['Playlist'],
    }),
    deletePlaylist: builder.mutation<void, string>({
      query: (playlistId) => ({
        url: `playlists/${playlistId}`,
        method: 'delete',

      }),
      invalidatesTags: ['Playlist'],
    }),
    updatePlaylist: builder.mutation<void, {
      playlistId: string;
      body: UpdatePlaylistArgs
    }>({
      query: ({playlistId, body}) => ({
        url: `playlists/${playlistId}`,
        method: 'put',
        body,
      }),
      invalidatesTags: ['Playlist'],
    }),
  }),
})

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation, useUpdatePlaylistMutation
} = playlistsApi