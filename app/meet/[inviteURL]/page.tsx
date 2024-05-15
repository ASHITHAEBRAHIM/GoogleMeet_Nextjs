"use client";

import '@livekit/components-styles';
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { redirect, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { MdOutlineChatBubble } from "react-icons/md";
import ChatMsg from '@/components/ChatMsg';


export default function Page() {
    const params = useSearchParams();

    const [inviteUrl, setInviteUrl] = useState<string>("");
    const[email,setEmail] = useState<string>("");
    const [token, setToken] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [showChat, setShowChat] = useState(false);
  

    useEffect(() => {
      async function checkAuth() {

        const supabase = createClient();
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Error checking authentication:', error.message);
          return false;
        }
        if (!user) {
          redirect('/signup');
        }

        const invite = window.location.href;
        console.log(invite);
      if (!invite) {
          console.error('Invite URL is missing');
          return false;
      }

    const { data: meeting, error: meetingError } = await supabase
        .from('meetings')
        .select('*')
        .eq('invite_url', invite)
        .single();

    if (meetingError) {
        console.error('Error fetching meeting:', meetingError.message);
        return false;
    }

    if (!meeting) {
        console.error('Meeting not found for the given invite URL');
        return false;
    }

    if (meeting.userid !== user.id) {
        console.error('Authenticated user is not the creator of this meeting');
        console.log('meeting.userid:', meeting.userid);
        console.log('user.id:', user.id);
        return false;
    }

        setAuthenticated(true);
        return true;
      }

      async function meetAuth() {

        const supabase = createClient();
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Error checking authentication:', error.message);
          return false;
        }
        if (!user) {
          redirect('/signup');
        }
        const { data: inviteUser, error: inviteError } = await supabase
        .from('invite_user')
        .select('*')
        .eq('email', user.email)
        .single();
      if (inviteError) {
        console.error('Error checking invite:', inviteError.message);
        return false;
      }
    
      if (!inviteUser) {
        console.error('User is not invited');
        return false;
      }

        setAuthenticated(true);
        return true;
      }

      async function initialize() {
        const isAuthenticated =  await checkAuth() || await meetAuth();
        if (isAuthenticated) {
          const inviteUrl = params.get("invite_url");
          const email = params.get("email");
          if (inviteUrl && email) {
            setInviteUrl(inviteUrl);
            setEmail(email);
            getToken();
          }
        }
      }
  
      initialize();
    }, []);
    
  async function getToken(){
    if(!inviteUrl || !email){
        return;
    }

    const isInviteAuthenticated = await checkInviteAuthentication(inviteUrl);

    if (!isInviteAuthenticated) {
        console.error('Invite URL is not authenticated in Supabase');
        return;
    }
    try{
        const resp = await fetch(
            `/api/get-participant-token?room=${inviteUrl}&email=${email}`
        );
        const datas = await resp.json();
        console.log('Token Response:', datas);
        setToken(datas.token);
    } catch (e){
        console.error(e)
    }
  }
 
  async function checkInviteAuthentication(inviteUrl: string) {
    try {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('meetings')
            .select('*')
            .eq('invite_url', inviteUrl)
            .single();

        if (error) {
            console.error('Error querying Supabase:', error.message);
            return false;
        }

        if (!data) {
            console.error('Meeting not found for the given inviteUrl:', inviteUrl);
            return false;
        }

        const meetingid = data.id;
        const userid = data.userid;
        const { data: insertData, error: insertError } = await supabase
            .from('participants')
            .insert([
                {
                    meetingid,
                    userid,
                }
            ]);

        if (insertError) {
            console.error('Error saving participant details:', insertError.message);
            return false;
        }

        console.log('Participant details saved successfully:', insertData);
        return true; 
    } catch (error) {
        console.error('Error saving participant details:', error);
        return false;
    }
}
if (!authenticated) {
  return (
      <Link
      href='/login'
      >
      You Are Not Authorised to Access This Link !
      </Link>
  );
}

  if (token === "") {
    return (
        <form 
        onSubmit={(e) => {
            e.preventDefault();
            getToken();
        }}
        className='flex flex-col justify-center items-center min-h-screen'>
            <Input
            type = "text"
            placeholder='Enter the Link'
            value = {inviteUrl}
            className='mb-4'
            onChange={(e) => setInviteUrl(e.target.value)}
            />
             <Input
            type = "text"
            placeholder='Username'
            value = {email}
            className='mb-4'
            onChange={(e) => setEmail(e.target.value)}
            />
            <Button type='submit'>Join Now</Button>
        </form>
    );
  }
  const handleCloseChat = () => {
   setShowChat(false);
  };

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      onDisconnected={() => setToken("")}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ height: '100dvh' }}
    >
      {/* Your custom component with basic video conferencing functionality. */}
      <MyVideoConference />
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />
            {/* Chat component */}
            <div className="flex fixed right-4 bottom-4 z-10">
          <Button className='border bg-gray-700' onClick={() => setShowChat(!showChat)}> <MdOutlineChatBubble />Chat </Button>
        </div>
        {/* Chat component */}
        {showChat && (
          <div className="fixed inset-y-0 right-0 w-64 bg-black z-10">
            <ChatMsg participantName={email} onClose={handleCloseChat} inviteUrl ={inviteUrl}/>
          </div>
        )}
      {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
      <ControlBar />
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}