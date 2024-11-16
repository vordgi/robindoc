export const detectGitType = (uri: string) => {
    if (uri.match(/^https?:\/\/github.com/)) {
        return { name: "GitHub", key: "github" } as const;
    } else if (uri.match(/^https?:\/\/gitlab.com/)) {
        return { name: "GitLab", key: "gitlab" } as const;
    } else {
        return { name: "Git", key: "git" } as const;
    }
};
