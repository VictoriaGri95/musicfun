import {
  createPlaylistSchema,
  playlistAttributesSchema,
  playlistDataSchema, playlistFormSchema,
  type playlistMetaSchema,
  playlistsResponseSchema
} from "@/features/playlists/model/playlists.schemas.ts";
import {z} from "zod";

export type PlaylistMeta = z.infer<typeof playlistMetaSchema>
export type PlaylistAttributes = z.infer<typeof playlistAttributesSchema>
export type PlaylistData = z.infer<typeof playlistDataSchema>
export type PlaylistsResponse = z.infer<typeof playlistsResponseSchema>

export type CreatePlaylistArgs = z.infer<typeof createPlaylistSchema>
export type PlaylistFormValues  = z.infer<typeof playlistFormSchema>

//
// export type PlaylistsResponse = {
//   data: PlaylistData[]
//   meta: PlaylistMeta
// }
//
// export type PlaylistData = {
//   id: string
//   type: 'playlists'
//   attributes: PlaylistAttributes
// }
//
// export type PlaylistMeta = {
//   page: number
//   pageSize: number
//   totalCount: number
//   pagesCount: number
// }
//
// export type PlaylistAttributes = {
//   title: string
//   description?: string
//   addedAt: string
//   updatedAt: string
//   order: number
//   dislikesCount: number
//   likesCount: number
//   tags: Tag[]
//   images: Images
//   user: User
//   currentUserReaction: CurrentUserReaction
//   tracksCount: number
//   duration: number
// }

// Arguments
export type FetchPlaylistsArgs = {
  pageNumber?: number
  pageSize?: number
  search?: string
  sortBy?: 'addedAt' | 'likesCount'
  sortDirection?: 'asc' | 'desc'
  tagsIds?: string[]
  userId?: string
  trackId?: string
  onlyLikedByMe?: boolean
}

// export type CreatePlaylistArgs = {
//   data: {
//     type: 'playlists'
//     attributes: Pick<PlaylistAttributes, 'title' | 'description'>
//   }
// }
// export type PlaylistFormValues = {
//   title: string
//   description: string
//   tagIds?: string[]
// }


// export type CreatePlaylistArgs = {
//   data: {
//     type: PlaylistData['type']
//     attributes: {
//       title: string
//       description: string
//     }
//   }
// }


export type UpdatePlaylistArgs = {
  data: {
    type: PlaylistData['type']
    attributes: Pick<PlaylistAttributes, 'title' | 'description'> & {
      tagIds?: string[]
    }
  }
}