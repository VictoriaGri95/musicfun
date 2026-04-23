import {baseApi} from "@/app/api/baseApi.ts";
import type {
  CreatePlaylistArgs,
  FetchPlaylistsArgs,
  UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";
import {
  playlistCreateResponseSchema,
  playlistsResponseSchema
} from "@/features/playlists/model/playlists.schemas.ts";
import {withZodCatch} from "@/common/utils";
import {imagesSchema} from "@/common/schemas";

export const playlistsApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({
    fetchPlaylists: builder.query({
      query: (params: FetchPlaylistsArgs) => ({url: `playlists`, params}),
      ...withZodCatch(playlistsResponseSchema),
      providesTags: ['Playlist'],
    }),
    createPlaylist: builder.mutation({
      query: (body: CreatePlaylistArgs) => ({
        url: 'playlists',
        method: 'post',
        body
      }),
      ...withZodCatch(playlistCreateResponseSchema),
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


    uploadPlaylistCover: builder.mutation({
      query: ({playlistId, file}) => {
        const formData = new FormData()
        formData.append('file', file)
        return {
          url: `playlists/${playlistId}/images/main`,
          method: 'post',
          body: formData,
        }
      },

      ...withZodCatch(imagesSchema),
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