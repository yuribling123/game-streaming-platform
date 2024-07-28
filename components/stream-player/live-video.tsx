"use-client"

import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { FullscreenControl } from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";
import { Volume } from "lucide-react";
import { VolumeControl } from "./volumn-control";

interface LiveVideoProps {
    participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [volume, setVolume] = useState(0);

    // useTracks to get the camera and microphone tracks, filters the tracks to get
    // those that match the participant's identity and then attaches the video track to a reference if it exists.
    useTracks([Track.Source.Camera, Track.Source.Microphone])
        .filter((track) => track.participant.identity === participant.identity)
        .forEach((track) => {
            if (videoRef.current) {
                track.publication.track?.attach(videoRef.current);
            }
        });



    const onVolumeChange = (value: number) => {
        setVolume(+value);
        if (videoRef?.current) {
            videoRef.current.muted = value === 0;
            videoRef.current.volume = +value * 0.01;
        }
    };

    const toggleMute = () => {
        const isMuted = volume === 0; // no volume <=> isMuted true
        console.log("ismuted property:"+isMuted)
        const newVolume = isMuted ? 50 : 0; // isMuted true  <=> volume = 50
        setVolume(newVolume);

        console.log("stored volume"+volume)

        if (videoRef.current) {
            videoRef.current.muted = newVolume === 0;
            videoRef.current.volume = newVolume * 0.01;

            console.log("toggle muted:", videoRef.current.muted);
            console.log("my volume:", videoRef.current.volume);
        }
    };


    useEffect(() => { onVolumeChange(10); })


    const toggleFullscreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();

        } else if (wrapperRef.current) {
            wrapperRef.current.requestFullscreen();

        }
        setIsFullscreen(!isFullscreen);
    };

    const handleFullscreenChange = () => {
        const isCurrentlyFullscreen = document.fullscreenElement !== null;
        setIsFullscreen(isCurrentlyFullscreen);
    };
    // Use the custom hook to listen for fullscreen changes
    useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);





    return (
        <div ref={wrapperRef} className="relative h-full flex">
            <video ref={videoRef} width="100%">   </video>

            <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">

                <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
                    <VolumeControl onChange={onVolumeChange} value={volume} onToggle={toggleMute}></VolumeControl>
                    <FullscreenControl isFullscreen={isFullscreen} onToggle={() => { toggleFullscreen }} />
                </div>

            </div>

        </div>

    )
}