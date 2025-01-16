import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
  return (
    <>
      <div className="bg-white shadow-md sticky top-0">
        <div className="max-w-5xl m-auto p-4">
          <Link href="/">
            <Image alt="logo" width={125} height={28} src="/logo.svg" />
          </Link>
        </div>
      </div>
    </>
  );
}
