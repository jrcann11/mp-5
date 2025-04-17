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

type CreateAliasResult =
    | { success: true; data: URLMapping }
    | { success: false; error: string };

export default async function createAlias(
    alias: string,
    url: string
): Promise<CreateAliasResult> {
    if (!isValidURLSyntax(url)) {
        return { success: false, error: "Invalid URL format" };
    }

    if (!(await isResolvableURL(url))) {
        return { success: false, error: "URL does not resolve to an active site" };
    }

    const collection = await getCollection(LINKS_COLLECTION);
    const existing = await collection.findOne({ alias });

    if (existing) {
        return { success: false, error: "Alias already taken" };
    }

    const res = await collection.insertOne({ alias, url });
    if (!res.acknowledged) {
        return { success: false, error: "DB insert failed" };
    }

    return {
        success: true,
        data: {
            id: res.insertedId.toHexString(),
            alias,
            url,
        },
    };
}