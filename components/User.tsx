import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function User() {
    
 const supabase = createClient();

 const {
  data: { user },
} = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    redirect('/login');
  };

    return (
        user && (
        <div className="flex items-center gap-4">
            Hey, {user?.email}
            <form action={signOut}>
                <button className="py-2 px-4 rounded-md no-underline bg-btn-background">
                    Logout
                </button>
            </form>
        </div>
    )
);
}