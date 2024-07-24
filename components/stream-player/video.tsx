import { useConnectionState, useRemoteParticipant, useTracks } from '@livekit/components-react';
import { ConnectionState, Track } from 'livekit-client';
import { OfflineVideo } from './offline-video';
import { LoadingVideo } from './loading-video';
import { LiveVideo } from './live-video';


interface VideoProps {
    hostName: string;
    hostIdentity: string;
}

export const  Video: React.FC<VideoProps> = ({ hostName, hostIdentity }) => {
    console.log( "identity" + hostIdentity);
    console.log( "connection" + hostIdentity);
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    console.log(participant)
    console.log( connectionState)


    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone,
    ]).filter((track) => track.participant.identity === hostIdentity);

    let content;
    //If the participant is not available and the connection is not established
    if (!participant && connectionState === ConnectionState.Connected){
        content = <OfflineVideo username={hostName}></OfflineVideo>
    //If the participant is not available or the tracks are not ready
    }else if(!participant|| tracks.length==0){
        content = <LoadingVideo label={connectionState}></LoadingVideo>
    }else{
        //If the participant is available and the connection is established
        content = <LiveVideo participant={participant}></LiveVideo>
    };


    return (
        <div className="aspect-video border-b border-gray-300 group relative">
            <p>Video</p>
            <p>Host Name: {hostName}</p>
            <p>Host Identity: {hostIdentity}</p>
            {content}
        </div>
    );
};
