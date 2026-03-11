import React from 'react'
import { getContacts } from "@/actions/contact"
import { ContactList } from "./ContactList"

export const dynamic = "force-dynamic";

export default async function Page() {
    const contacts = await getContacts()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Contact Submissions</h1>
                <p className="text-muted-foreground">Review and manage inquiry messages from your website visitors.</p>
            </div>

            <ContactList initialContacts={contacts} />
        </div>
    )
}
