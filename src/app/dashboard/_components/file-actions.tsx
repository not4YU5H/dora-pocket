import { Doc, Id } from "../../../../convex/_generated/dataModel";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { DownloadIcon, MoreVertical, StarHalfIcon, StarIcon, TrashIcon, UndoIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { Protect } from "@clerk/nextjs";


export function FileCardActions({ file, isFavorited }: { file: Doc<"files">; isFavorited: boolean }) {
    const deleteFile = useMutation(api.files.deleteFile);
    const restoreFile = useMutation(api.files.restoreFile);
    const toggleFavorite = useMutation(api.files.toggleFavorite);
    
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const { toast } = useToast();
    const me = useQuery(api.users.getMe);
    return(
        <>
        <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action will mark your file for deletion. The file will be unrecoverable after deletion.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
                await deleteFile({
                    fileId: file._id
                });
                toast({
                    variant: "default",
                    title: "File marked for deletion",
                    description: "Your file will be deleted soon",
                });
            }}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>


        <DropdownMenu>
        <DropdownMenuTrigger><MoreVertical /></DropdownMenuTrigger>
        <DropdownMenuContent>
        <DropdownMenuItem 
            onClick={() => {
                window.open(getFileUrl(file.fileId), "_blank");
            }}
            className="flex gap-1 items-center cursor-pointer">
                <DownloadIcon className="w-4 h-4" /> Download
            </DropdownMenuItem>
            <DropdownMenuSeparator />
        <DropdownMenuItem 
            onClick={() => {
                toggleFavorite({
                    fileId: file._id,
                });
            }}
            className="flex gap-1 items-center cursor-pointer">
                {isFavorited ? 
                ( <div className="flex gap-1 items-center">
                <StarHalfIcon className="w-4 h-4" /> Unfavorite
                </div>
                ) :
                ( <div className="flex gap-1 items-center">
                <StarIcon className="w-4 h-4" /> Favorite
                </div>
                )
                }
            </DropdownMenuItem>
            
            


            <Protect
            condition={(check) => {
                return check({
                    role: "org:admin",
                }) || file.userId === me?._id
            }}
            fallback={<></>} >
            <DropdownMenuSeparator />
            <DropdownMenuItem 
            onClick={() => {
                if(file.shouldDelete) {
                    restoreFile({
                        fileId: file._id,
                    })
                } else {
                    setIsConfirmOpen(true)
                }
            }}
            className="flex gap-1 items-center cursor-pointer">
            {file.shouldDelete ? (
                <div className="flex gap-1 text-green-600 items-center cursor-pointer">
                    <UndoIcon className="w-4 h-4" /> Restore
                </div>
            ) : (
                <div className="flex gap-1 text-red-600 items-center cursor-pointer">
                    <TrashIcon className="w-4 h-4" /> Delete
                </div>
            )}
            </DropdownMenuItem>
            </Protect>
        </DropdownMenuContent>
        </DropdownMenu>
        </>
    );
}

export function getFileUrl(fileId: Id<"_storage">): string {
    return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
}

