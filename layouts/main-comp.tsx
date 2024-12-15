'use client'
import React from 'react'
import { NavBarComp } from './nav-bar';
import { When } from '@/components/when';
import { usePathname } from 'next/navigation';

const MainComp = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const pathname = usePathname()

    const shouldHideNavbar = ['/sign-in'].some((route) => {
        return typeof route === "string"
            ? pathname === route
            : route.test(pathname);
    });

    return (
        <>
            <When isHide={shouldHideNavbar}>
                <NavBarComp />
            </When>
            {children}
        </>
    )
}

export { MainComp }
