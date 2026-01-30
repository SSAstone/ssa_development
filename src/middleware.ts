import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.AUTH_SECRET!);

async function verify(token: string) {
    try {
        const { payload } = await jwtVerify(token, secretKey);
        return payload;
    } catch (e) {
        return null;
    }
}

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const session = req.cookies.get("session")?.value;

    console.log("session----", session);

    const protectedRoutes = [
        "/dashboard/student",
        "/dashboard/teacher",
        "/dashboard/admin",
        "/admin",
    ];

    const isProtected = protectedRoutes.some((route) =>
        path.startsWith(route)
    );

    console.log("isProtected----", isProtected);

    if (!isProtected) return NextResponse.next();

    if (!session) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const payload: any = await verify(session);

    console.log("payload----", payload);

    if (!payload) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if ((path.startsWith("/admin")) && payload?.user?.role !== "admin")
        return NextResponse.redirect(new URL("/login", req.url));

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
    ],
};
