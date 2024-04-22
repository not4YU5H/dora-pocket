import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export function Header() {
    return <div className="border-b py-4 bg-gray-50">
        <div className="items-center container mx-auto justify-between flex">
            
                <Link href="/" className="flex gap-2 items-center text-xl text-[#51a1c4]">
                    <Image src="/logo.png" width="80" height="80" alt="Dora Pocket" />
                    DoraPocket
                </Link>
                <Button variant="outline">
                <Link href="/dashboard/files">
                    Files
                </Link>
                </Button>
        
            <div className="flex gap-2">
            <OrganizationSwitcher />
            <UserButton />
            <SignedOut>
                <SignInButton>
                    <Button>Sign In</Button>
                </SignInButton>
            </SignedOut>
            </div>
        </div>
    </div>
}