import NavBar from "@/components/NavBar/NavBar";

export default function Page() {
  return (
    <div className="min-h-screen w-full">
      <NavBar />
      <div className="w-full h-full px-10 py-5">
        <div className="w-2/5 h-full">
          <p className="font-bold text-4xl">
            Secure, Anonymous, and Trustless.
          </p>
        </div>
      </div>
    </div>
  );
}
