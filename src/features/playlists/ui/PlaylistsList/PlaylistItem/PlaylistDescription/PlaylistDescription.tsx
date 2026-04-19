import type {
  PlaylistAttributes
} from "@/features/playlists/api/playlistsApi.types.ts";

type Props = {
  attributes: PlaylistAttributes
}

export const PlaylistDescription = ({attributes}: Props) => {
  return (
    <div>
      <div>title: {attributes.title}</div>
      {/*<div>description: {playlist.attributes.description}</div>*/}
      <div>userName: {attributes.user.name}</div>
    </div>
  );
};

