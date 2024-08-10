import React from "react";
import { HeaderMenu } from "./header-menu";
import { Search } from "./search";
import { SectionDropdown } from "./section-dropdown";
import { HeaderSocial } from "./header-social";

type SectionOption = {
    key: string;
    hrefKey?: string;
    title: string;
    shortTitle?: string;
};

type SectionType = {
    default?: string;
    target: string;
    list: SectionOption[];
};

export type HeaderProps = {
    logo: React.ReactElement;
    link?: React.ElementType;
    links?: {
        title: string;
        href: string;
    }[];
    git?: string | { uri: string; logo: React.ElementType };
    versions?: SectionType;
    locales?: SectionType;
};

export const Header: React.FC<HeaderProps> = ({ logo, versions, locales, link: Link = "a", links = [], git }) => {
    const targetVersion = versions?.list.find((version) => version.key === versions.target);
    const versionPrefix =
        !targetVersion || targetVersion.key === versions?.default
            ? ""
            : `/${targetVersion.hrefKey || targetVersion.key}`;
    const targetLocale = locales?.list.find((locale) => locale.key === locales.target);
    const localePrefix =
        !targetLocale || targetLocale.key === locales?.default ? "" : `/${targetLocale.hrefKey || targetLocale.key}`;

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
                    <div className="r-header-actions">
                        <div className="r-header-sections">
                            {versions && targetVersion && (
                                <SectionDropdown
                                    defaultOption={targetVersion.key}
                                    options={versions.list.map((version) => ({
                                        href: `${localePrefix}${version.key === versions.default ? "" : `/${version.hrefKey || version.key}`}/`,
                                        key: version.key,
                                        title: version.title,
                                        shortTitle: version.shortTitle,
                                    }))}
                                />
                            )}
                            {locales && targetLocale && (
                                <SectionDropdown
                                    defaultOption={targetLocale.key}
                                    options={locales.list.map((locale) => ({
                                        href: `${locale.key === locales.default ? "" : `/${locale.hrefKey || locale.key}`}${versionPrefix}/`,
                                        key: locale.key,
                                        title: locale.title,
                                        shortTitle: locale.shortTitle,
                                    }))}
                                />
                            )}
                        </div>
                        <Search link={Link} />
                    </div>
                </HeaderMenu>
                {git && <HeaderSocial git={git} />}
            </div>
        </header>
    );
};
