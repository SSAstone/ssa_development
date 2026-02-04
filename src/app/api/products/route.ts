// import { NextResponse } from "next/server";
// import { getProducts } from "@/actions/product";

// export async function GET() {
//     try {
//         const products = await getProducts();
//         return NextResponse.json(products);
//     } catch (error) {
//         return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
//     }
// }

import { NextResponse } from "next/server";
import { getProducts } from "@/actions/product";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    // use "*" only if this is a public API
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: corsHeaders,
    });
}

export async function GET() {
    try {
        const products = await getProducts();

        return new NextResponse(JSON.stringify(products), {
            status: 200,
            headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: "Failed to fetch products" }),
            {
                status: 500,
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
