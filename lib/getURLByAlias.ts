import getCollection, { LINKS_COLLECTION } from "@/db";

export default async function getURLByAlias(alias: string): Promise<string | null> {
    const collection = await getCollection(LINKS_COLLECTION);
    const data = await collection.findOne({ alias });
    return data?.url ?? null;
}