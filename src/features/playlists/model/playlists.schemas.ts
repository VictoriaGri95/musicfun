import {z} from "zod";
import {
  currentUserReactionSchema,
  imagesSchema,
  tagSchema,
  userSchema
} from "@/common/schemas/schemas.ts";

// Схема для создания плейлиста
export const createPlaylistSchema = z.object({
  data: z.object({
    type: z.literal('playlists'),
    attributes: z.object({
      title: z.string()
        .min(1, 'Playlist title must be at least 1 character')
        .max(100, 'Playlist title must not exceed 100 characters')
        .trim(),
      description: z.string()
        .max(1000, 'Playlist description must not exceed 1000 characters')
        .nullable()
        .optional()
        .transform(val => val ?? undefined),
    }),
  }),
});


// Схема для формы плейлиста
export const playlistFormSchema = z.object({
  title: z.string()
    .min(1, 'Playlist title must be at least 1 character')
    .min(3, 'Playlist title must be at least 3 characters')
    .max(100, 'Playlist title must not exceed 100 characters')
    .trim(),
  description: z.string()
    .max(1000, 'Playlist description must not exceed 1000 characters')
    .nullable()
    .optional()
    .transform(val => val ?? ''),
  tagIds: z.array(z.string())
    .max(20, 'Cannot add more than 20 tags')
    .optional(),
});

export const playlistMetaSchema = z.object({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  totalCount: z.number().int().nonnegative(),
  pagesCount: z.number().int().positive(),
})

export const playlistAttributesSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  addedAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  order: z.number().int(),
  dislikesCount: z.number().int().nonnegative(),
  likesCount:z.number().int().nonnegative(),
  tags: z.array(tagSchema),
  images: imagesSchema,
  user: userSchema,
  currentUserReaction: currentUserReactionSchema,
  tracksCount: z.number().int().nonnegative(),
  duration: z.number().int().nonnegative(),
})

export const playlistDataSchema = z.object({
  id: z.string(),
  type: z.literal('playlists'),
  attributes: playlistAttributesSchema,
})

export const playlistsResponseSchema = z.object({
  data: z.array(playlistDataSchema),
  meta: playlistMetaSchema,
})