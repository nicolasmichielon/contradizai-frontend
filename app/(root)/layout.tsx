import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

//import { isAuthenticated } from "@/lib/actions/auth.action";

const Layout = async ({ children }: { children: ReactNode }) => {
  //const isUserAuthenticated = await isAuthenticated();
  //if (!isUserAuthenticated) redirect("/sign-in");
  //redirect("/sign-up");

  return (
    <div className="root-layout relative w-full h-full">
      {/* Absolutely/fixed positioned logo in the top right */}
      <div className="fixed top-4 right-4 flex flex-col items-center z-50">
        <Link href="/" className="flex flex-col items-center">
          <Image src="/next.svg" alt="ContradizAI Logo" width={64} height={56} />
        </Link>
      </div>
      {children}
    </div>
  );
};

export default Layout;