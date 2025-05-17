import LoginForm from "@/components/auth/LoginForm";
import { HeroSection } from "@/components/auth/HeroSection";

export default function LoginPage() {
  return (
    <main className="flex w-full h-screen bg-white">
      <div className="flex w-full h-full">
        <div className="flex flex-col flex-1 h-full items-start justify-start pl-32 pt-16">
          <LoginForm />
        </div>
        <div className="w-[50vw] h-full">
          <HeroSection />
        </div>
      </div>
    </main>
  );
}