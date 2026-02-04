import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/actions/product";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: corsHeaders,
    });
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const product = await getProductById(parseInt(id));

        if (!product) {
            return NextResponse.json(JSON.stringify({ error: "Failed to fetch product" }),
                {
                    status: 500,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                });
        }

        return new NextResponse(JSON.stringify(product), {
            status: 200,
            headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
            },
        });

    } catch (error) {
        return NextResponse.json(JSON.stringify({ error: "Failed to fetch product" }),
            {
                status: 500,
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
            });
    }
}
