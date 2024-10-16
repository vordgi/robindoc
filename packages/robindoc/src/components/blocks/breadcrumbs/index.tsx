import React from "react";

import { type Breadcrumbs as BreadcrumbsType } from "@src/core/types/content";
import { NavLink } from "../nav-link";

import "./breadcrumbs.scss";

export type BreadcrumbsProps = {
    title: string;
    breadcrumbs: BreadcrumbsType;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = async ({ title, breadcrumbs }) => {
    return (
        <ul className="r-breadcrumbs">
            {breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.pathname} className="r-breadcrumb _previous">
                    <NavLink href={breadcrumb.pathname} className="r-breadcrumb-link">
                        {breadcrumb.title}
                    </NavLink>
                </li>
            ))}
            <li className="r-breadcrumb _target">
                <p className="r-breadcrumb-title">{title}</p>
            </li>
        </ul>
    );
};
