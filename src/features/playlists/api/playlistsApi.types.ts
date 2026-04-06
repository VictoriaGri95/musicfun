import type {Images, Tag, User} from "@/common/types";
import type {CurrentUserReaction} from "@/common/enums";


export type PlaylistsResponse = {
  data: PlaylistData[]
  meta: PlaylistMeta
}

export type PlaylistData = {
  id: string
  type: 'playlists'
  attributes: PlaylistAttributes
}

export type PlaylistMeta = {
  page: number
  pageSize: number
  totalCount: number
  pagesCount: number
}

export type PlaylistAttributes = {
  title: string
  description?: string
  addedAt: string
  updatedAt: string
  order: number
  dislikesCount: number
  likesCount: number
  tags: Tag[]
  images: Images
  user: User
  currentUserReaction: CurrentUserReaction
  tracksCount: number
  duration: number
}

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
export type CreatePlaylistFormValues = {
  title: string
  description?: string
}


export type CreatePlaylistArgs = {
  data: {
    type: 'playlists'
    attributes: {
      title: string
      description?: string
    }
  }
}


export type UpdatePlaylistArgs = {
  data: {
    type: PlaylistData['type']
    attributes: Pick<PlaylistAttributes, 'title' | 'description'> & {
      tagIds?: string[]
    }
  }
}