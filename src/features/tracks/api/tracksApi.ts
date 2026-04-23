import type {
  FetchTracksResponse
} from "@/features/tracks/api/tracksApi.types.ts";
import {baseApi} from "@/app/api/baseApi.ts";
import {
  fetchTracksResponseSchema
} from "@/features/tracks/model/tracks.schemas.ts";
import {withZodCatch} from "@/common/utils";

export const tracksApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchTracks: builder.infiniteQuery<FetchTracksResponse, void, string | undefined>({
      infiniteQueryOptions: {
        initialPageParam: undefined,
        getNextPageParam: lastPage => {
          return lastPage.meta.nextCursor || undefined
        },
      },
      query: ({pageParam}) => {
        return {
          url: 'playlists/tracks',
          params: {cursor: pageParam, pageSize: 6, paginationType: 'cursor'}
        }
      },
      ...withZodCatch(fetchTracksResponseSchema),
    }),
  }),
})
export const {useFetchTracksInfiniteQuery} = tracksApi