import React from "react";
import { detectGitType } from "../utils/git-data";
import { GithubLogo, GitlabLogo, GitLogo } from "./git-logos";

const gitLogos = {
    github: GithubLogo,
    gitlab: GitlabLogo,
    git: GitLogo,
};

export const HeaderSocial: React.FC<{ git: string | { uri: string; logo: React.ElementType } }> = ({ git }) => {
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
