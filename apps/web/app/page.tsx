"use client"
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";




export default function Home() {
  
  const router = useRouter()
  const [roomId, setRoomId] = useState("")
  return (
    <div style={{
      display : "flex",
      justifyContent : "center",
      alignItems : "center",
      height : "100vh",
      width : "100vw"
    }}>
      <input type="text" style={{padding : 10}} value={roomId} onChange={(e) => {setRoomId(e.target.value)}} placeholder="Enter Room Id" />
      <button style={{padding : 10}} onClick={() => {router.push(`/room/${roomId}`)}}>Join Room</button>                  
    </div>
  );
}
