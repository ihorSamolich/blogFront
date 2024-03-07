import React from 'react';
import Link from "next/link";

const Footer = () => {
    return (
        <footer>
            <div className="mt-16 bg-blue-100 flex flex-col items-center">
                <div className="mb-3 flex space-x-4">

                {/*    Social icons here    */}

                </div>
                <div className="mb-2 flex space-x-2 text-sm text-black">
                    <div>Ihor Samolich</div>
                    <div>{` • `}</div>
                    <div>{`© ${new Date().getFullYear()}`}</div>
                    <div>{` • `}</div>
                    <Link href="/">MyBlog</Link>
                </div>
                <div className="mb-3 text-sm text-black">
                    <Link href="/">
                        Tailwind NextJS ASP.NET
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;