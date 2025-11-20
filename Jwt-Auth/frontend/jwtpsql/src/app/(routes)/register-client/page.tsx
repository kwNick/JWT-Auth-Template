import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {

  return (
      <div className="flex flex-col items-center justify-center gap-y-10 min-h-[120vh] ">

    <div>
      <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-semibold underline">
        Register-Client
      </h2>
    </div>

    <RegisterForm />

  </div>
  );
}
