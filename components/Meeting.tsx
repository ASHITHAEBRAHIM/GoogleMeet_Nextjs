'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { FaCopy } from "react-icons/fa";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useOrigin } from "@/lib/useOrigin";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { createClient } from '@/utils/supabase/client';

interface MeetingProps {
    userId: string; 
}

function generateMeetingId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 9;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        if ((i + 1) % 3 === 0 && i !== length - 1) { 
            result += '-';
        }
    }
    return result;
}

export default function Meeting({ userId }: MeetingProps) {
    const[copied,setCopied] = useState(false);
    const origin = useOrigin();
    const [inviteURL, setInviteURL] = useState("");
    const [showMeetingInfo, setShowMeetingInfo] = useState(false);

    const handleNewMeetingClick = () => {
        const meetingId = generateMeetingId(); 
        const url = `${origin}/meet/${meetingId}`;
        setInviteURL(url);
        setShowMeetingInfo(true);
    }

    useEffect(() => {
        console.log("inviteURL changed:", inviteURL);
        if (inviteURL && userId) {
            const supabaseClient = createClient();
            console.log("Inserting data into Supabase:", { userId, inviteURL });
            (async () => {
                try {
                    const response = await supabaseClient
                        .from('meetings')
                        .insert([{ userid: userId, invite_url: inviteURL }]);
                   return console.log("Insertion successful:", response);
                } catch (error) {
                    console.error("Insertion failed:", error);
                }
            })();
        }
    }, [inviteURL, userId]);
    const onCopy = () => {
        navigator.clipboard.writeText(inviteURL);
        setCopied(true);

        setTimeout(()=>{
            setCopied(false);
        },1000);
    }

    return(
<div className="mt-10 flex items-center justify-center gap-x-8">
<Dialog>
<DialogTrigger className="rounded-md border border-indigo-500 bg-indigo-600 px-12 py-2.5 text-lg"  onClick={handleNewMeetingClick}>NewMeeting</DialogTrigger>
<DialogContent>
<DialogHeader>
<DialogTitle className="text-2xl font-bold">
    Here's your joining info
</DialogTitle>
<DialogDescription className=" text-zinc-500">
  Send this to people you want to meet with. Be sure to save it so you can use it later, too.
</DialogDescription>
</DialogHeader>
<div>
      <div className="flex items-center mt-2 gap-x-2">
        <Input
          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
          defaultValue={inviteURL} 
        />
        <Button onClick={onCopy} size="icon">
            {copied
            ? <Check className="w-4 h-4"/>
            : <FaCopy className="w-4 h-4" />
            }
        </Button>
      </div>
    </div>
</DialogContent>
</Dialog>
<Link
href='/invite'
className="rounded-md border border-indigo-500 bg-indigo-600 px-12 py-2.5 text-lg"
>
 Invite
</Link>
<Link
href={`/meet/${inviteURL}`}
className="rounded-md border border-indigo-500 bg-indigo-600 px-12 py-2.5 text-lg"
>
 Join
</Link>
</div>
    )
}

