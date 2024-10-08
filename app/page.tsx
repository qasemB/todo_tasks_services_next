import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div  className="w-full text-center block py-6 h-screen bg-gradient-to-t from-indigo-500">
      <Link className="text-blue-700 fixed top-2 left-5" href={"/swagger"}>مستندات</Link>
      <div className="flex justify-center items-center flex-col">
        <Image className="opacity-50" alt="" src={"/logo.png"} width={300} height={300}/>
        <Link className="text-blue-700" href={"/auth/login"}>ورود به کاربری</Link>
      </div>
    </div>
  );
}
