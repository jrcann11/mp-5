import getCollection, { LINKS_COLLECTION } from "@/db";

export default async function getURLByAlias(alias: string): Promise<string | null> {
    if(!alias) {
        return null;
    }
    const collection = await getCollection(LINKS_COLLECTION);
    const data = await collection.findOne({ alias });

    if(!data) {
        return null;
    }

    return data.url;
}