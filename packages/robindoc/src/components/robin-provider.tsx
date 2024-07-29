import React from "react";

export const RobinProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <script
                id="detect-theme"
                dangerouslySetInnerHTML={{
                    __html: `const userTheme = localStorage.getItem('theme');
if (userTheme && ['light', 'dark'].includes(userTheme)) {
    document.documentElement.classList.add(\`theme-\${userTheme}\`)
} else {
    document.documentElement.classList.add(\`theme-system\`);
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('theme-dark');
    } else {
        document.documentElement.classList.add('theme-light');
    }
}`,
                }}
            />
            {children}
        </>
    );
};
