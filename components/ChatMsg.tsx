import { useEffect, useState, useCallback } from "react";
import { Button } from "./ui/button";
import { Icons } from "./ui/icons";
import { Textarea } from "./ui/textarea";
import { IoMdClose } from "react-icons/io";
import { createClient } from "@/utils/supabase/client";

interface Props {
  participantName: string;
  inviteUrl: string;
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  send_by: string;
  created_at: Date;
}

export default function ChatMsg({ participantName, inviteUrl, onClose }: Props) {

  const [isOpen, setIsOpen] = useState(true);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const supabase = createClient();
    fetchMessages();

    const subscription = supabase
     .channel('messagebox')
     .on('postgres_changes', {
      event: '*',
      schema: 'public' ,
      table: 'messages' 
    }, (payload: any) => {
       
        setAllMessages(prevMessages => [
          ...prevMessages,
          {
            id: payload.new.id,
            text: payload.new.text,
            send_by: payload.new.send_by,
            created_at: new Date(payload.new.created_at),
          },
        ]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const supabase = createClient();
      const { data: meetingData, error: meetingError } = await supabase
        .from("meetings")
        .select("id")
        .eq("invite_url", inviteUrl)
        .single();

      if (meetingError) {
        console.error("Error querying meeting details:", meetingError.message);
        return;
      }

      const meetingId = meetingData?.id;
      if (!meetingId) {
        console.error("Meeting ID not found");
        return;
      }

      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("meeting_id", meetingId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error.message);
        return;
      }

      const formattedMessages = data?.map((msg: any) => ({
        id: msg.id,
        text: msg.text,
        send_by: msg.send_by,
        created_at: new Date(msg.created_at)
      })) || [];

      setAllMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const onSend = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data: meetingData, error: meetingError } = await supabase
        .from("meetings")
        .select("id")
        .eq("invite_url", inviteUrl)
        .single();

      if (meetingError) {
        console.error("Error querying meeting details:", meetingError.message);
        return;
      }

      const meetingId = meetingData?.id;
      if (!meetingId) {
        console.error("Meeting ID not found");
        return;
      }

      const { data: insertData, error: insertError } = await supabase
        .from("messages")
        .insert([
          {
            text: message,
            send_by: participantName,
            meeting_id: meetingId,
          },
        ]);
    
        setMessage("");
      if (insertError) {
        console.error("Error saving message details:", insertError.message);
        return;
      }

      if (!insertData) {
        console.error("No data returned after inserting message.");
        return;
      }
      console.log("Message saved successfully:", insertData);
     
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [message]);

  return (
    <>
      {isOpen && (
        <div className="flex flex-col h-full justify-between">
          <div className="overflow-y-auto">
            <div className="flex justify-between items-center mt-4">
              <h1 className="text-center text-bold text-lg ml-4">Messages</h1>
              <IoMdClose onClick={handleClose} />
            </div>

            {allMessages.map((message) => (
              <div key={message.id} className="flex items-center gap-2 p-2">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-semibold">
                      {message.send_by}
                      {participantName === message.send_by && " (you)"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(message.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="text-sm">{message.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full gap-2 my-4">
            <div className="flex flex-1 rounded-lg">
              <Textarea
  value={message}
  className="border-none  dark:text-black  rounded-lg p-2 flex-1"
  onChange={(e) => {
    setMessage(e.target.value);
  }}
  onKeyDown={(e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      onSend(); 
      setMessage(""); 
    }
  }}
  placeholder="Type a message..."
/>
              <Button disabled={message.trim().length === 0} onClick={onSend}>
                <div className="flex items-center gap-2 px-2">
                  <Icons.send className="h-4 w-4" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
