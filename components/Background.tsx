import Link from "next/link";
import AuthButton from "./AuthButton";
import { Label } from "./ui/label";
import Image from "next/image";

export default function Background() {
  return (
    <div className="container w-full flex flex-col">
      <div className="flex justify-between items-center gap-60">
        <div className="flex flex-col space-y-2">
          <Label className="text-4xl">
          Video calls and meetings for everyone
          </Label>
          <Label className="text-2xl text-gray-500">
          Google meet provides secure, easy-to-use video calls and meetings for everyone, on any device.
          </Label>
          <div className="flex gap-4">
            <AuthButton />
          </div>
          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
          <p>
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="text-sm font-bold hover:underline mr-2"
            rel="noreferrer"
          >
             Learn More
            
          </a>
          about Google Meet
        </p>
        </div>
        <div className="relative">
        <Image src="/pic1.jpeg" alt="Picture" height={300} width={300} className="rounded-full" />
          <div className="flex flex-col space-y-2 mt-6">
          <Label className="text-3xl">
          Get a link you can share
          </Label>
          <Label className="text-sm text-gray-500">
          click <Link className="text-white" href='/'>New Meeting</Link> to get a link you can send to people you want to meet with
          </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
