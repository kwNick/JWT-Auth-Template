'use client';

import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const RedirectWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { role, token } = useAuth();

    const isLoggedIn = token !== null && token !== undefined;
    const isAdmin = role?.includes('ROLE_ADMIN') || false;

    // console.log(pathname);

    useEffect(() => {
        if(!token && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))){
            // If user is not logged in and trying to access protected routes, redirect to login
            router.push('/login-client');
        }
        
        if(token && (pathname === '/login-client' || pathname === '/register-client')){
            if(role?.includes('ROLE_ADMIN')){
                // If user is admin, redirect to admin dashboard
                router.push('/admin');
            }else{
                // If user is not admin, redirect to user dashboard
                router.push('/dashboard');
            }
        }

        if(token && pathname.startsWith('/admin') && !role?.includes('ROLE_ADMIN')){
            // If user is logged in but not admin and trying to access admin dashboard, redirect to user dashboard
            router.push('/dashboard');
        }

    }, [role, token, pathname, router, isLoggedIn, isAdmin]);

  return (
    <>
        { children }
    </>
  )
}
export default RedirectWrapper