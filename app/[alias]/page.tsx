import getURLByAlias from "@/lib/getURLByAlias";
import { redirect } from "next/navigation";

export default async function AliasRedirect({
                                                params,
                                            }: {
    params: { alias: string };
}) {
    const url = await getURLByAlias(params.alias);

    if (!url) {
        return redirect("/");
    }

    return redirect(url);
}