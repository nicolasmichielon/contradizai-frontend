import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {

  return (
    <div className="root-layout relative w-full h-full">
      {children}
    </div>
  );
};

export default Layout;