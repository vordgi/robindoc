import React from "react";
import { HeaderMenu } from "./header-menu";
import { Search } from "./search";
import { detectGitType } from "../utils/git-data";
import { GithubLogo, GitlabLogo, GitLogo } from "./git-logos";

const gitLogos = {
    github: GithubLogo,
    gitlab: GitlabLogo,
    git: GitLogo,
};

export type HeaderProps = {
    logo: React.ReactElement;
    link?: React.ElementType;
    links?: {
        title: string;
        href: string;
    }[];
    git?: string | { uri: string; logo: React.ElementType };
};

const GitLink: React.FC<{ git: string | { uri: string; logo: React.ElementType } }> = ({ git }) => {
    const gitData = typeof git === "string" ? { uri: git, logo: gitLogos[detectGitType(git).key] } : git;
    const Logo = gitData.logo;

    return (
        <div className="r-header-social">
            <a href={gitData.uri} className="r-header-git" target="_blank" rel="noopener noreferrer">
                <Logo />
            </a>
        </div>
    );
};

export const Header: React.FC<HeaderProps> = ({ logo, link: Link = "a", links = [], git }) => {
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
                {git && <GitLink git={git} />}
            </div>
        </header>
    );
};
