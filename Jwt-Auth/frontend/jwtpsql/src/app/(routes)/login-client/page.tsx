import LoginForm from "@/components/LoginForm";

export default function LoginPage() {

  return (
    <div className="flex flex-col items-center justify-center gap-y-10 min-h-[120vh]">

      <div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-semibold underline">
          Login-Client
        </h2>
      </div>

      <LoginForm />

    </div>
  );
}
