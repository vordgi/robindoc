import React from "react";
import { HeaderMenu } from "./header-menu";
import { Search } from "./search";

export type HeaderProps = {
    logo: React.ReactElement;
    link?: React.ElementType;
    links?: {
        title: string;
        href: string;
    }[];
};

export const Header: React.FC<HeaderProps> = ({ logo, link: Link = "a", links = [] }) => {
    return (
        <header className="r-header">
            <div className="r-container r-header-body">
                <div>
                    <Link href="/" className="r-header-logo">
                        {logo}
                    </Link>
                </div>
                <HeaderMenu>
                    <nav className="r-header-nav">
                        {links.map((link) => (
                            <Link href={link.href} className="r-header-link" key={link.title}>
                                {link.title}
                            </Link>
                        ))}
                    </nav>
                    <Search link={Link} />
                </HeaderMenu>
                <div className="r-header-social">
                    <a
                        href="https://github.com/vordgi/robindoc"
                        className="r-header-git"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32">
                            <title>Github</title>
                            <g clipPath="url(#mark)">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M15.9523 0C7.1311 0 0 7.18367 0 16.0709C0 23.1749 4.56914 29.1882 10.9078 31.3166C11.7002 31.4766 11.9905 30.9708 11.9905 30.5453C11.9905 30.1727 11.9644 28.8957 11.9644 27.5651C7.52686 28.5231 6.60278 25.6493 6.60278 25.6493C5.88963 23.7868 4.83298 23.3081 4.83298 23.3081C3.38057 22.3236 4.93878 22.3236 4.93878 22.3236C6.54988 22.43 7.39527 23.9732 7.39527 23.9732C8.82123 26.4209 11.119 25.7293 12.0434 25.3035C12.1753 24.2658 12.5982 23.5474 13.0472 23.1484C9.50792 22.7758 5.78416 21.3923 5.78416 15.2193C5.78416 13.4632 6.41763 12.0264 7.42139 10.9091C7.26302 10.51 6.70825 8.86008 7.58008 6.65176C7.58008 6.65176 8.92702 6.22596 11.9641 8.30139C13.2644 7.9496 14.6053 7.77065 15.9523 7.76914C17.2993 7.76914 18.6723 7.95559 19.9402 8.30139C22.9776 6.22596 24.3246 6.65176 24.3246 6.65176C25.1964 8.86008 24.6413 10.51 24.4829 10.9091C25.5131 12.0264 26.1205 13.4632 26.1205 15.2193C26.1205 21.3923 22.3967 22.7491 18.831 23.1484C19.4122 23.6539 19.9138 24.6116 19.9138 26.1283C19.9138 28.2834 19.8877 30.0131 19.8877 30.545C19.8877 30.9708 20.1783 31.4766 20.9705 31.3169C27.3091 29.1879 31.8782 23.1749 31.8782 16.0709C31.9043 7.18367 24.7471 0 15.9523 0Z"
                                    fill="currentColor"
                                />
                            </g>
                            <defs>
                                <clipPath id="mark">
                                    <rect width="32" height="31.3469" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                </div>
            </div>
        </header>
    );
};
