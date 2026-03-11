"use client";

import { useState } from "react";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
    Trash2, 
    Mail, 
    User, 
    Calendar,
    MessageSquare,
    MoreHorizontal
} from "lucide-react";
import { deleteContactAction } from "@/actions/contact";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    createdAt: Date;
}

export function ContactList({ initialContacts }: { initialContacts: Contact[] }) {
    const [contacts, setContacts] = useState(initialContacts);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this contact?")) return;

        const res = await deleteContactAction(id);
        if (!res.error) {
            setContacts(contacts.filter((c) => c.id !== id));
        } else {
            alert(res.error);
        }
    };

    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contacts.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                No contacts found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        contacts.map((contact) => (
                            <TableRow key={contact.id}>
                                <TableCell className="font-medium whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <User className="size-4" />
                                        </div>
                                        {contact.firstName} {contact.lastName}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Mail className="size-4 text-muted-foreground" />
                                        {contact.email}
                                    </div>
                                </TableCell>
                                <TableCell className="max-w-[300px] truncate">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="size-4 text-muted-foreground shrink-0" />
                                        <span className="truncate">{contact.message}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                        <Calendar className="size-4" />
                                        {new Date(contact.createdAt).toLocaleDateString()}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Dialog>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DialogTrigger asChild>
                                                    <DropdownMenuItem onClick={() => setSelectedContact(contact)}>
                                                        View Details
                                                    </DropdownMenuItem>
                                                </DialogTrigger>
                                                <DropdownMenuItem 
                                                    className="text-red-600"
                                                    onClick={() => handleDelete(contact.id)}
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <DialogContent className="max-w-2xl">
                                            <DialogHeader>
                                                <DialogTitle>Contact Details</DialogTitle>
                                                <DialogDescription>
                                                    Submitted on {selectedContact && new Date(selectedContact.createdAt).toLocaleString()}
                                                </DialogDescription>
                                            </DialogHeader>
                                            {selectedContact && (
                                                <div className="space-y-4 py-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1">
                                                            <p className="text-sm font-medium text-muted-foreground">First Name</p>
                                                            <p className="p-2 bg-muted rounded-md">{selectedContact.firstName}</p>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-sm font-medium text-muted-foreground">Last Name</p>
                                                            <p className="p-2 bg-muted rounded-md">{selectedContact.lastName}</p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                                                        <p className="p-2 bg-muted rounded-md">{selectedContact.email}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium text-muted-foreground">Message</p>
                                                        <div className="p-4 bg-muted rounded-md whitespace-pre-wrap min-h-[100px]">
                                                            {selectedContact.message}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
