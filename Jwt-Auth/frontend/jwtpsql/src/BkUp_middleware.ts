// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
// import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    // console.log("cookies: " + request.cookies.toString()); // In production, refreshToken cookies are HttpOnly and won't be accessible via edge middleware
    // Try to save a value on login and access it here, 'role' saved in-memory - if you can't access that then save a front-end cookie that identifies the role

    // const refreshToken = request.cookies.get('refreshToken'); // use NextRequest in middleware to access cookies
    // console.log("refreshToken: " + refreshToken);

    const role = request.cookies.get('role'); // use NextRequest in middleware to access cookies
    // console.log("role: " + role?.value);

    let isLoggedIn = false; // Default to false
    if (role?.value) {
        isLoggedIn = true; // If token exists, user is logged in
    }
    // console.log("isLoggedIn: " + isLoggedIn);

    let isAdmin = false; // Default to false
    // const roles = role?.value || '';
    if (role?.value.includes('ROLE_ADMIN')) {
        isAdmin = true; // If roles include 'ROLE_ADMIN', user is admin
    }
    // console.log("isAdmin: " + isAdmin);

    // Define protected routes

    // const isLoginPage = request.nextUrl.pathname.startsWith('/login');
    // const isRegisterPage = request.nextUrl.pathname.startsWith('/register');
    // const isAdminDash = request.nextUrl.pathname.startsWith('/admin-dashboard');
    // // const isUserDash = request.nextUrl.pathname.startsWith('/user-dashboard');

    const isProtected = ['/dashboard', '/admin'].some(path =>
        request.nextUrl.pathname.startsWith(path)
    );

    // If the user is trying to access a protected route without a token
    if (isProtected && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login-client', request.url));
    }

    const isAdminDash = request.nextUrl.pathname.startsWith('/admin');
    // If the user w/ token is trying to access the admin dashboard without admin roles
    if (isLoggedIn && isAdminDash && !isAdmin) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    const isLoginPage = request.nextUrl.pathname.startsWith('/login-client');
    // If the user is trying to access the login page while already logged in
    if (isLoginPage && isLoggedIn) {
        if (isAdmin) {        //Or Redirect to admin dashboard if the user has admin roles
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.redirect(new URL('/dashboard', request.url));
        //Or Redirect to admin dashboard if the user is an admin
    }

    const isRegisterPage = request.nextUrl.pathname.startsWith('/register-client');
    // If the user is trying to access the register page while already logged in
    if (isRegisterPage && isLoggedIn) {
        if (isAdmin) {        //Or Redirect to admin dashboard if the user has admin roles
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: ['/admin', '/register-client', '/dashboard', '/login-client'],
};
