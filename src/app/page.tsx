import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        
        <div className="mx-auto max-w-2xl py-8">
          <div className="text-center">
            <Image
              src="/logo.png"
              width="200"
              height="200"
              alt="DorePocket logo"
              className="inline-block mb-8"
            />

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Keep your files in Dora&apos;s 4 dimensional Pocket!
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Just sign in and you&apos;re good to go!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard/files"
                className="rounded-md bg-success px-3.5 py-2.5 text-sm font-semibold text-success-foreground shadow-sm hover:bg-[#b13f54] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}