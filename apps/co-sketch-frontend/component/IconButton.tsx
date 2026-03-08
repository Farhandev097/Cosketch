import { ReactNode } from "react";


export function IconButton ({icon, onClick, activated } : {icon : ReactNode, onClick : () => void, activated : boolean}) {
    return <div onClick={onClick} className={`${activated ? `text-red-400` : `text-white` }   rounded-4xl bg-black hover:bg-gray-800 border p-2 mx-1 mt-2 text-center `} > 
        {icon}
    </div>
}