'use client';

import { Photo, PhotoSearchResponse } from "../types";
import Image from 'next/image';
import { FC, useState, Dispatch, SetStateAction } from 'react';

const handleLoadmore = async (setPhotoList: Dispatch<SetStateAction<Photo[]>>) => {
  try {
    const response = await fetch('http://localhost:3000/api/getRandomPhoto', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if(!response.ok) throw response;
  const json: Photo[] = await response.json();
  console.log('Response JSON:', json);
  setPhotoList((photos) => [ ...photos, ...json ]);
  } catch(error) {
    console.error(error);
    alert('取得中にエラーが発生しました');
  }
}

export const PhotoList: FC<{photos: Photo[]}> = ({ photos }) => {
  const [photoList, setPhotoList] = useState<Photo[]>(photos);
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
      <button onClick={async () => handleLoadmore(setPhotoList)}>MORE</button>
    </div>
  )
}