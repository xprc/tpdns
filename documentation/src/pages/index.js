import React from "react";
import Layout from "@theme/Layout";
import LazyLoad from "react-lazyload";
import Head from "@docusaurus/Head";

import { Landing } from "../components/landing";

function Home() {
    React.useEffect(() => {
        return () => {
            // scroll to top after unmount with set timeout
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0);
        };
    }, []);

    return (
        <>
            <Head>
                <html data-page="index" data-customized="true" />
            </Head>
            <Layout
                title={`TomsProject DNS | 下一代DNS服务提供商`}
                description="TomsProject DNS 是一家提供融合DNS服务的综合服务商。"
            >
                <Landing />
            </Layout>
        </>
    );
}

export default Home;
