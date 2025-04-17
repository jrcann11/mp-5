import getURLByAlias from "@/lib/getURLByAlias";
import { redirect } from "next/navigation";

export default async function AliasRedirect({params,}: { params: Promise<{ alias: string }>; }) {
    const {alias} = await params;
    const url = await getURLByAlias(alias);

    if (!url) {
        return redirect("/");
    }

    return redirect(url);
}