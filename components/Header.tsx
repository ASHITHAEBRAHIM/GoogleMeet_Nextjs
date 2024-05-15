import Link from "next/link"
import { SiGooglemeet } from "react-icons/si";
import User from "./User";

const Header = ()=> {
return(
  <nav className="w-full flex justify-between px-5 h-14">
    <div className="flex items-center gap-4">
      <SiGooglemeet size={32} />
      <Link className="text-xl font-bold" href='/'>Google Meet</Link>
    </div>
    <User/>
  </nav>
)
}
export default Header