'use client';

import { FC } from "react";
import { VscLoading } from "react-icons/vsc";

export const Loading: FC = () => {
    return (
        <div className="h-96 flex justify-center">
            <VscLoading
                className={`
                    animate-spin 
                    text-gray-400 
                    text-4xl 
                    h-auto 
                    my-auto 
                `}
            />
        </div>
    )
}