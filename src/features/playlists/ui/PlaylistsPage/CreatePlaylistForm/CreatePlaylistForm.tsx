import {
  useCreatePlaylistMutation
} from "@/features/playlists/api/playlistsApi.ts";
import type {
  CreatePlaylistArgs, CreatePlaylistFormValues
} from "@/features/playlists/api/playlistsApi.types.ts";
import {type SubmitHandler, useForm} from "react-hook-form";


export const CreatePlaylistForm = () => {
  const { register, handleSubmit, reset } =
    useForm<CreatePlaylistFormValues>()


  const [createPlaylist] = useCreatePlaylistMutation()

  const onSubmit: SubmitHandler<CreatePlaylistFormValues> = async (data) => {
    const payload: CreatePlaylistArgs = {
      data: {
        type: 'playlists',
        attributes: {
          ...data
        }
      }
    }

    try {
      await createPlaylist(payload).unwrap()
      reset()
    } catch (error) {
      console.error("Create playlist error:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new playlist</h2>
      <div>
        <input
          {...register('title')}
          placeholder="title"
        />
      </div>
      <div>
        <input
          {...register('description')}
          placeholder="description"
        />
      </div>
      <button>create playlist</button>
    </form>
  )
}