import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return <div className="h-40 bg-success mt-12 flex items-center">
        <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="flex gap-2 items-center text-2xl text-success-foreground hover:text-[#b13f54]">
                    <Image src="/logo.png" width="80" height="80" alt="Dora Pocket" />
                    DoraPocket
                    </Link>
            <div className="text-success-foreground">Copyright © 2024, DoraPocket. All Rights Reserved.</div>
        </div>
    </div>
}