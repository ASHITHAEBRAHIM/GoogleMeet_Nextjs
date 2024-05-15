import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ResetPassword({
    searchParams,
}:{
    searchParams: {message: string, code:string};
}){
    const supabase = createClient();
    const {
        data: { user },
      } = await supabase.auth.getUser();

  if(user){
    return redirect('/')
  }
    const resetPassword = async (formData: FormData) => {
        "use server";
    
        const password = formData.get("password") as string;
        const supabase = createClient();

        if(searchParams.code){
           const supabase = createClient(); 
           const { error } = await supabase.auth.exchangeCodeForSession(
            searchParams.code
           );
           if (error) {
            return redirect(
                `/resetPassword?message=Unable to reset password. Link expired!`
            );
          }
        }
        const {error} = await supabase.auth.updateUser({
            password,
        });
        if (error) {
            return redirect(
                `/resetPassword?message=Unable to reset password. Try again!`
            );
          }
          redirect(
            `/login?message=Password has been reset successfully. Sign in.`
        );
      };
    return(
        <div className="w-full">
            <Header/>
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
        <form action={resetPassword} className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-2">
            <label className="text-md" htmlFor="password">
                New Password
            </label>
            <input
            className="rounded-md px-4 py-2 bg-inherit border mb-2"
            type="password"
            name="password"
            placeholder="......"
            required
            />
            <label className="text-md" htmlFor="password">
                Confirm new Password
            </label>
            <input
            className="rounded-md px-4 py-2 bg-inherit border mb-2"
            type="password"
            name="confirmPassword"
            placeholder="......"
            required
            />
            <button className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2">
                Reset
            </button>
            {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
        </form>
      </div>
        </div>
    )
}