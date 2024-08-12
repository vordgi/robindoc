import "./section-dropdown.scss";
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
            <button className="r-dropdown-summary">
                <span>{defaultOptionDetailed.shortTitle || defaultOptionDetailed.title}</span>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="r-dropdown-chevron"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
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