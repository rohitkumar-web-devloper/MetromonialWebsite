'use client'
import React from 'react'
import { NavBarComp } from './nav-bar';
import { When } from '@/components/when';
import { usePathname } from 'next/navigation';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Footer } from './footer';
const MainComp = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const pathname = usePathname()

    const shouldHideNavbar = ['/sign-in', '/sign-up'].some((route) => {
        return typeof route === "string"
            ? pathname === route
            : route.test(pathname);
    });
    const uploadLink = createUploadLink({
        // uri: 'http://localhost:7575/graphql', // Update with your GraphQL endpoint
        uri: process.env.BASE_URL, // Update with your GraphQL endpoint

    });
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,

                Authorization: localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '',
            },
        };
    });
    const client = new ApolloClient({
        link: authLink.concat(uploadLink),
        cache: new InMemoryCache(),
        defaultOptions: {
            query: { errorPolicy: 'all' },
            mutate: { errorPolicy: 'all' },
        },
    });
    console.log(process.env.BASE_URL);
    

    return (
        <>
            <When isHide={shouldHideNavbar}>
                <NavBarComp />
            </When>
            <ApolloProvider client={client}>
                {children}
            </ApolloProvider>
            <When isHide={shouldHideNavbar}>
                <Footer />
            </When>
        </>
    )
}

export { MainComp }
