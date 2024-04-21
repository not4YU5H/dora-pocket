"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { UploadButton } from "./upload-button";
import { FileCard } from "./file-card";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if(organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles,
    orgId ? {orgId} : "skip"
  );
  const isLoading = files === undefined;
  return (
    <main className="container mx-auto pt-12">

      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
          <Loader2 className="h-32 w-32 animate-spin text-[#51a1c4]" />
          <div className="text-xl font-light text-[#51a1c4]">Searching pocket...</div>
        </div>
      )}

      {!isLoading && files.length === 0 && (
          <div className="flex flex-col gap-8 w-full items-center mt-24">

          <Image alt="image of doraemon sleeping"
          width="300" height="300" 
          src="/dorasleep.svg" />
          <div className="text-xl font-light text-center text-[#51a1c4]">Pocket is empty! <br/> Upload files to put into Dora&apos;s pocket...</div>
          <UploadButton />
          </div>
        )}

        {!isLoading && files.length>0 && (
          <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Your Files</h1>

            <UploadButton />
          </div>
          <div className="grid grid-cols-4 gap-4">
          {files?.map((file) => {
            return <FileCard key={file._id} file={file}/>
          })}
          </div>
          </>
        )}

      
    </main>
  );
}
