import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Meeting from "./Meeting";
import React from "react";

export default async function AuthButton() {
 
  const supabase = createClient();
  const fetchUserId = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user ? user.id : null;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching user data:", error.message);
      } else {
        console.error("An unknown error occurred while fetching user data:", error);
      }
    }
  };

  const userId = await fetchUserId();

  if (userId) {
    return <Meeting userId={userId} />;
  }
  
  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
       <Link
      href="/login"
      className="rounded-md border border-indigo-500 bg-indigo-600 px-12 py-2.5 text-lg"
    >
      Login
    </Link>
    <Link
    href='/signup'
    className="text-lg font-semibold leading-6 text-gray-200 rounded-md"
    >
      Sign Up
    </Link>
    </div>
  );
};
