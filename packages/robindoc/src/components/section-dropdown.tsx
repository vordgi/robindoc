import React from "react";

type SectionDropdownOption = {
    key: string;
    href: string;
    title: string;
    shortTitle?: string;
};

export type SectionDropdownProps = {
    defaultOption: string;
    options: SectionDropdownOption[];
    link?: React.ElementType;
};

export const SectionDropdown: React.FC<SectionDropdownProps> = ({ defaultOption, options, link: Link = "a" }) => {
    const defaultOptionDetailed = options.find((option) => option.key === defaultOption);

    if (!defaultOptionDetailed) {
        console.error("Invalid default option");
        return <></>;
    }
    return (
        <div className="r-dropdown">
            <div className="r-dropdown-summary">{defaultOptionDetailed.shortTitle || defaultOptionDetailed.title}</div>
            <ul className="r-dropdown-drop">
                {options.map((option) => (
                    <li key={option.key}>
                        <Link
                            href={option.href}
                            className={`r-dropdown-link${option.key === defaultOption ? " _active" : ""}`}
                        >
                            {option.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
