import {z} from "zod";
import {
  coverSchema,
  imagesSchema,
  tagSchema,
  userSchema
} from "@/common/schemas";
import {CurrentUserReaction} from "@/common/enums";

export type Tag = z.infer<typeof tagSchema>
export type User = z.infer<typeof userSchema>
export type Images = z.infer<typeof imagesSchema>
export type Cover = z.infer<typeof coverSchema>
export const currentUserReactionSchema = z.enum(CurrentUserReaction)