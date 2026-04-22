import {z} from "zod";
import {CurrentUserReaction} from "@/common/enums";

export const tagSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const coverSchema = z.object({
  type: z.enum(['original', 'medium', 'thumbnail']),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  fileSize: z.number().int().positive(),
  url: z.url(),
})

export const imagesSchema = z.object({
  main: z.array(coverSchema),
})

export const currentUserReactionSchema = z.union([
  z.literal(CurrentUserReaction.Like),
  z.literal(CurrentUserReaction.None),
  z.literal(CurrentUserReaction.Dislike),
])




