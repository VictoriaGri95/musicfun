import type {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister
} from "react-hook-form";
import type {
  PlaylistFormValues
} from "@/features/playlists/api/playlistsApi.types.ts";
import {
  useUpdatePlaylistMutation
} from "@/features/playlists/api/playlistsApi.ts";


type Props = {
  playlistId: string
  register: UseFormRegister<PlaylistFormValues>
  handleSubmit: UseFormHandleSubmit<PlaylistFormValues>
  editPlaylist: (playlist: null) => void
  setPlaylistId: (playlistId: null) => void
}

export const EditPlaylistForm = ({
                                   playlistId,
                                   handleSubmit,
                                   register,
                                   editPlaylist,
                                   setPlaylistId,
                                 }: Props) => {

  const [updatePlaylist] = useUpdatePlaylistMutation()

  const onSubmit: SubmitHandler<PlaylistFormValues> = (data) => {
    if (playlistId) {
      updatePlaylist({
        playlistId,
        body: {
          data: {
            type: "playlists",
            attributes: data
          }
        }
      })
      setPlaylistId(null)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit playlist</h2>
      <div>
        <input {...register('title')} placeholder={'title'} />
      </div>
      <div>
        <input {...register('description')} placeholder={'description'} />
      </div>
      <button type={'submit'}>save</button>
      <button
        type={'button'}
        onClick={() => editPlaylist(null)}
      >
        cancel
      </button>
    </form>
  );
};

