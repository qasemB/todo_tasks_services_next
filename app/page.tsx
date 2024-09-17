import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full text-center block py-6">
      <Link className="text-blue-700" href={"/swagger"}>مستندات</Link>
    </div>
  );
}
