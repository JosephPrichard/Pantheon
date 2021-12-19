import { AppProps } from "next/app";
import Head from "next/head";
import { GlobalStyles, MantineProvider, NormalizeCSS } from "@mantine/core";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>Pantheon</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <html></html>
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
