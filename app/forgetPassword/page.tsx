import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ForgetPassword({
    searchParams,
}:{
    searchParams: {message: string}
}) {
    const confirmReset = async (formData: FormData) => {
        "use server";
    
        const origin = headers().get('origin');
        const email = formData.get("email") as string;
        const supabase = createClient();
    
        const { error } = await supabase.auth.resetPasswordForEmail(email, {redirectTo:`${origin}/resetPassword`});
    
        if (error) {
          return redirect("/forgetPassword?message=Could not authenticate user");
        }
    
        return redirect("/confirm?message=Password reset link has been sent to your email address");
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
        <form action={confirmReset} className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-2">
            <label className="text-md" htmlFor="email">
                Enter Email Address
            </label>
            <input
            className="rounded-md px-4 py-2 bg-inherit border mb-2"
            name="email"
            placeholder="you@example.com"
            required
            />
            <button className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2">
                confirm
            </button>
            {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
        </form>
        <Link href='/login'>
        Remember your password?Sign in
        </Link>
      </div>
        </div>
    )
}