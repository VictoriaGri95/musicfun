import {baseApi} from "@/app/api/baseApi.ts";
import type {Images} from "@/common/types";
import type {
  CreatePlaylistArgs,
  FetchPlaylistsArgs, PlaylistData,
  PlaylistsResponse, UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";

export const playlistsApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({
    fetchPlaylists: builder.query<PlaylistsResponse, FetchPlaylistsArgs>({
      query: params => ({url: `playlists`, params}),
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
        body
      }),
      async onQueryStarted({playlistId, body}, {
        dispatch,
        queryFulfilled,
        getState
      }) {
        const args = playlistsApi.util.selectCachedArgsForQuery(getState(), 'fetchPlaylists')

        const patchCollections: any[] = []

        args.forEach(arg => {
          patchCollections.push(
            dispatch(
              playlistsApi.util.updateQueryData(
                'fetchPlaylists',
                {
                  pageNumber: arg.pageNumber,
                  pageSize: arg.pageSize,
                  search: arg.search,
                },
                state => {
                  if (!state.data) return

                  const playlist = state.data.find(p => p.id === playlistId)

                  if (playlist) {
                    playlist.attributes = {
                      ...playlist.attributes,
                      ...body.data.attributes
                    }
                  }
                }
              )
            )
          )
        })

        try {
          await queryFulfilled
        } catch {
          patchCollections.forEach(p => p.undo())
        }
      },
      invalidatesTags: ['Playlist'],
    }),


    uploadPlaylistCover: builder.mutation<Images, {
      playlistId: string;
      file: File
    }>({
      query: ({playlistId, file}) => {
        const formData = new FormData()
        formData.append('file', file)
        return {
          url: `playlists/${playlistId}/images/main`,
          method: 'post',
          body: formData,
        }
      },
      invalidatesTags: ['Playlist'],
    }),
    deletePlaylistCover: builder.mutation<void, { playlistId: string }>({
      query: ({playlistId}) => ({
        url: `playlists/${playlistId}/images/main`,
        method: 'delete'
      }),
      invalidatesTags: ['Playlist'],
    }),
  }),
})

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
  useUploadPlaylistCoverMutation,
  useDeletePlaylistCoverMutation
} = playlistsApi