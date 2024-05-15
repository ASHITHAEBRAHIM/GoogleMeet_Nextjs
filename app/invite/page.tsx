'use client'
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function Invite({ searchParams }: { searchParams: { message: string } }) {
    const [message, setMessage] = useState("");

    const sendInvitation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const link = formData.get('link');
    
        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser(); 
            const userid = user?.id;
            if (!userid) {
                throw new Error("User not authenticated");
            }
    
            const { data, error } = await supabase.from('invite_user').insert([
                { email, invite_url: link, userid } 
            ]);
    
            if (error) {
                throw error;
            }
    
            setMessage("Invitation sent successfully!");
        } catch (error) {
            setMessage("Error sending invitation. Please try again.");
            console.error("Error sending invitation:", error);
        }
    };
    

    return (
        <div className="w-full">
            
            <Link
                href="/"
                className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>{" "}
                Back
            </Link>
            <div className="w-full px-8 sm:max-w-md mx-auto mt-4">
                <form onSubmit={sendInvitation}
                    className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-2"
                >
                    <label className="text-md" htmlFor="email">
                        Enter Email Address
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-2"
                        name="email"
                        placeholder="you@example.com"
                        required
                    />
                    <label className="text-md" htmlFor="link">
                        Enter the Link
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-2"
                        name="link"
                        placeholder="Meeting Link"
                        required
                    />
                    <button className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2">
                        Send
                    </button>
                    {message && (
                        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
