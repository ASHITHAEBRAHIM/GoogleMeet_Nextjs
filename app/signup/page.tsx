import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Signup({
    searchParams,
}:{
    searchParams: { message: string};
}){
    const supabase = createClient();
    const {
        data: { user },
      } = await supabase.auth.getUser();

  if(user){
    return redirect('/')
  }

    const signUp = async(formData: FormData) => {
    "use server";
    const  origin = headers().get('origin');
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;


    if(password != confirmPassword){
        redirect('/signup?message=Passwords do not match');
    }
    console.log(email)
    console.log(password)
    console.log(confirmPassword)
    console.log(origin)

    const supabase = createClient()
    
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
        },
      });
console.log(error)
      if(error){
        console.error('Error during sign-up:', error.message);
        redirect('/signup?message=could not authenticate user');
      }
      redirect(`/confirm?message= Check email(${email}) to continue sign in process`
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
                <form action={signUp} className="animate-in flex-1 flex flex-col space-y-4 w-full justify-center">
                    <label className="text-md" htmlFor="email">
                        Email
                    </label>
                    <input
                    id="email"
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    />
                    <label className="text-md" htmlFor="password">
                        Password
                    </label>
                    <input
                    id="password"
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    type="password"
                    name="password"
                    placeholder="........."
                    required
                    autoComplete="new-password"
                    />
                    <label className="text-md" htmlFor="password">
                        Confirm Password
                    </label>
                    <input 
                    id="confirmPassword"
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    type="password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    placeholder="........."
                    required
                    />
                    <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
                        Sign up
                    </button>
                    {searchParams?.message && (
                        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                            {searchParams.message}
                        </p>
                    )}
                </form>
                <Link
                href='/login'
                className="rounded-md no-underline text-foreground text-sm"
                >
                    Already have an account? Sign In
                </Link>
            </div>
        </div>
    )
}