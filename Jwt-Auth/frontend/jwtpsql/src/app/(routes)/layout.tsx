import RedirectWrapper from "@/context/RedirectWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <>
        <RedirectWrapper>
            {children}
        </RedirectWrapper>
    </>
  );
}