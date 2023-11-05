'use client';
import { Photo, PhotoSearchResponse } from "../types";
import {
  FC,
  useState,
  useTransition,
  KeyboardEvent,
} from 'react';
import { VscSearch } from 'react-icons/vsc';
import { Loading } from "./Loading";
import { PhotoList } from "./PhotoList";

const PhotoListWrapper: FC<{
  loading: boolean;
  searchedPhotos: Photo[] | null;
  randamPhotos: Photo[];
  query?: string;
}> = ({ loading, searchedPhotos, randamPhotos, query }) => {
  if (loading) return <Loading />;
  if (searchedPhotos?.length) {
    return <PhotoList photos={searchedPhotos} query={query} />
  }
  return <PhotoList photos={randamPhotos} query={query} />;
}


export const Search: FC<{randomPhotos: Photo[]}> = ({ randomPhotos }) => {
  const [query, setQuery] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchedPhotos, setSearchedPhotos] = useState<Photo[] | null>(null);
  const [loading, startTransition] = useTransition();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && handleSubmit()
  }
  
  const handleSubmit = async () => {
    if (!query) return;
    try {
      setSearching(true);
      const response = await fetch(`http://localhost:3000/api/search?page=1`, {
        method: 'POST',
        body: JSON.stringify({
          query
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    if(!response.ok) throw response;
    const json: PhotoSearchResponse = await response.json();
    startTransition(() => {
      setSearchedPhotos(json.results);
    })
    } catch(error) {
      console.error(error);
      alert('検索中にエラーが発生しました');
      setSearchedPhotos(null);
    } finally {
      setSearching(false);
    }
  }

  return (
    <>
      <div className="my-8 flex justify-center">
        <input
          className="w-96 mr-4 p-2 bg-gray-700"
          value={query ?? ''}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-gray-700 py-2 px-4"
          onClick={async () => await handleSubmit()}
        >
          <VscSearch />
        </button>
      </div>
      { query
        ? <PhotoListWrapper
            loading={searching || loading}
            searchedPhotos={searchedPhotos}
            randamPhotos={randomPhotos}
            query={query}
          />
        : <PhotoListWrapper
            loading={searching || loading}
            searchedPhotos={searchedPhotos}
            randamPhotos={randomPhotos}
          />
      }
      
    </>
  )
}