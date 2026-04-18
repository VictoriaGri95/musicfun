import s from "./PlaylistsList.module.css";
import {
  EditPlaylistForm
} from "@/features/playlists/ui/PlaylistsPage/PlaylistsList/EditPlaylistForm/EditPlaylistForm.tsx";
import {
  PlaylistItem
} from "@/features/playlists/ui/PlaylistsPage/PlaylistsList/PlaylistItem/PlaylistItem.tsx";
import type {
  PlaylistData, PlaylistFormValues
} from "@/features/playlists/api/playlistsApi.types.ts";
import {
  useDeletePlaylistMutation
} from "@/features/playlists/api/playlistsApi.ts";
import {useState} from "react";
import {useForm} from "react-hook-form";


type Props = {
  playlists: PlaylistData[]
  isPlaylistsLoading: boolean
}

export const PlaylistsList = ({playlists, isPlaylistsLoading}: Props) => {
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const [deletePlaylist] = useDeletePlaylistMutation()
  const {register, handleSubmit, reset} = useForm<PlaylistFormValues>()
  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure you want to delete the playlist?')) {
      deletePlaylist(playlistId)
    }
  }


  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      setPlaylistId(playlist.id)
      reset({
        title: playlist.attributes.title,
        description: playlist.attributes.description,
        tagIds: playlist.attributes.tags.map(t => t.id),
      })
    } else {
      setPlaylistId(null)
    }
  }

  return (
    <div className={s.items}>
      {!playlists?.length && !isPlaylistsLoading &&
        <h2>Playlists not found</h2>}
      {playlists?.map(playlist => {
        const isEditing = playlistId === playlist.id
        return (
          <div
            className={s.item}
            key={playlist.id}
          >
            {isEditing ? (
                <EditPlaylistForm
                  playlistId={playlistId}
                  handleSubmit={handleSubmit}
                  register={register}
                  editPlaylist={editPlaylistHandler}
                  setPlaylistId={setPlaylistId}
                />
              ) :
              (
                <PlaylistItem
                  playlist={playlist}
                  deletePlaylist={deletePlaylistHandler}
                  editPlaylist={editPlaylistHandler}
                />
              )
            }

          </div>
        )
      })}
    </div>
  );
};

