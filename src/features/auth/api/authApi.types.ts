import {
  loginResponseSchema, meResponseSchema,
} from "@/features/auth/model/auth.schemas.ts";
import {z} from "zod";

export type LoginArgs = {
  code: string
  redirectUri: string
  rememberMe: boolean
  accessTokenTTL?: string // e.g. "3m"
}
export type MeResponse = z.infer<typeof meResponseSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>