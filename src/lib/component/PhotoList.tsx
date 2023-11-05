'use client';

import { Photo } from "../types";
import Image from 'next/image';
import { PhotoSearchResponse } from "../types";
import { FC, useState, Dispatch, SetStateAction } from 'react';

const handleLoadmore = async (
  setPhotoList: Dispatch<SetStateAction<Photo[]>>,
  setPagenation: Dispatch<SetStateAction<number>>,
  pagenation: number,
  query: string
  ) => {
  if (query) {
    try {
      const response = await fetch(`http://localhost:3000/api/search?page=${pagenation}`, {
      method: 'POST',
      body: JSON.stringify({
        query
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(!response.ok) throw response;
    setPagenation((pagenation) => pagenation + 1);
    const json: PhotoSearchResponse = await response.json();
    setPhotoList((photos) => [ ...photos, ...json.results ]);
    } catch(error) {
      console.error(error);
      alert('取得中にエラーが発生しました');
    } finally {
      return;
    }
  }

  try {
    const response = await fetch(`http://localhost:3000/api/getRandomPhoto?page=${pagenation}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if(!response.ok) throw response;
  setPagenation((pagenation) => pagenation + 1);
  const json: Photo[] = await response.json();
  setPhotoList((photos) => [ ...photos, ...json ]);
  } catch(error) {
    console.error(error);
    alert('取得中にエラーが発生しました');
  }
}

export const PhotoList: FC<{photos: Photo[], query?: string }> = ({ photos, query = '' }) => {
  const [photoList, setPhotoList] = useState<Photo[]>(photos);
  const [pagenation, setPagenation] = useState(2);
  console.log('photoList = ', photoList)

  if (!photos) return <>no result</>;

  return (
    <div className='grid grid-cols-3 gap-4 w-[1200px] mx-auto'>
      {
        [0,1,2].map((columnIndex) => (
          <div key={columnIndex}>
            {
              photoList.map((photo, idx) => {
                if (idx % 3 === columnIndex) {
                  return (
                    <div key={photo.id} className='mb-4 last:mb-0'>
                      <Image
                        src={photo.urls.small}
                        width={400}
                        height={photo.height * (400 / photo.width)}
                        alt={photo.slug || 'photo image'}
                        onClick={() => {
                          window.open(photo.links.html, '_blank')
                        }}
                        priority={true}
                      />
                    </div>
                  )
                }
                return null;
              })
            }
          </div>
        ))
      }
      <button
        onClick={async () => handleLoadmore(setPhotoList, setPagenation, pagenation, query)}
      >
        MORE
      </button>
    </div>
  )
}