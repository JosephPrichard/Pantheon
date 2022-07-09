/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { AppProps } from "next/app";
import Head from "next/head";
import { GlobalStyles, MantineProvider, NormalizeCSS } from "@mantine/core";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <meta name="next-head-count" content="5"/>
                <meta name="color-scheme" content="light dark"/>
                <title> Pantheon </title>
                <link rel="shortcut icon" href="/static/favicon.ico" />
                <html lang="en"/>
            </Head>

            <MantineProvider
                theme={{
                    colorScheme: "dark"
                }}
            >
                <NormalizeCSS />
                <GlobalStyles />
                <Component {...pageProps} />
            </MantineProvider>
        </>
    );
};

export default App;
