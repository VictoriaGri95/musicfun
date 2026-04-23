import {baseApi} from "@/app/api/baseApi.ts";
import type {
  LoginArgs,
} from "@/features/auth/api/authApi.types.ts";
import {AUTH_KEYS} from "@/common/constants";
import {withZodCatch} from "@/common/utils";
import {
  loginResponseSchema,
  meResponseSchema
} from "@/features/auth/model/auth.schemas.ts";

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query({
      query: () => `auth/me`,
      ...withZodCatch(meResponseSchema),
      providesTags: ['Auth']
    }),
    login: builder.mutation({
      query: (payload: LoginArgs) => ({
        url: `auth/login`,
        method: 'post',
        body: {...payload, accessTokenTTL: '15m'},
      }),
      ...withZodCatch(loginResponseSchema),
      async onQueryStarted(_arg, {dispatch, queryFulfilled}) {
        const {data} = await queryFulfilled
        localStorage.setItem(AUTH_KEYS.accessToken, data.accessToken)
        localStorage.setItem(AUTH_KEYS.refreshToken, data.refreshToken)
        // Invalidate after saving tokens
        dispatch(authApi.util.invalidateTags(['Auth']))
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => {

        const refreshToken = localStorage.getItem(AUTH_KEYS.refreshToken)
        return {url: 'auth/logout', method: 'post', body: {refreshToken}}
      },
      async onQueryStarted(_args, {queryFulfilled, dispatch}) {
        await queryFulfilled
        localStorage.removeItem(AUTH_KEYS.accessToken)
        localStorage.removeItem(AUTH_KEYS.refreshToken)
        dispatch(baseApi.util.resetApiState())
      },
    }),
  }),
})

export const {useGetMeQuery, useLoginMutation, useLogoutMutation} = authApi