"use server";

import getCollection, { LINKS_COLLECTION } from "@/db";
import { URLMapping } from "@/types";

function isValidURLSyntax(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

async function isResolvableURL(url: string): Promise<boolean> {
    try {
        const res = await fetch(url, { method: "HEAD" });
        return res.ok;
    } catch {
        return false;
    }
}

export default async function createAlias(
    alias: string,
    url: string,
): Promise<URLMapping> {
    if (!isValidURLSyntax(url)) {
        throw new Error("Invalid URL format");
    }

    if (!(await isResolvableURL(url))) {
        throw new Error("URL does not resolve to an active site");
    }

    const collection = await getCollection(LINKS_COLLECTION);
    const existing = await collection.findOne({ alias });

    if (existing) {
        throw new Error("Alias already taken");
    }

    const res = await collection.insertOne({ alias, url });
    if (!res.acknowledged) throw new Error("DB insert failed");

    return {
        id: res.insertedId.toHexString(),
        alias,
        url,
    };
}