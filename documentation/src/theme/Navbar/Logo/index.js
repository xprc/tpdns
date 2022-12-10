import React from "react";
import Link from "@docusaurus/Link";

export default function NavbarLogo({ className, ...props }) {
    return (
        <Link to="/" className="mx-auto lg:mx-0">
            <img 
                src="https://bucket.projectoms.com/wp-content/uploads/2022/12/ac0a23f74de340287f0c2b191f22746e43adeb1c.png?x-oss-process=image/resize,m_fill,w_1495,h_480/format,webp/quality,Q_100"
                onContextMenu={(event) => {
                    event.preventDefault();
                    window
                        .open(
                            "https://ttdns.net",
                            "_self",
                        )
                        .focus();
                }}
                className={
                    className
                        ? className
                        : "select-none mx-auto pr-6 lg:ml-0 lg:mr-2 lg:pr-0 items-center flex min-w-[110px] w-[110px] h-auto"
                }
                // imageClassName="navbar__logo"
                // titleClassName="navbar__title text--truncate"
                {...props}
            />
        </Link>
    );
}
