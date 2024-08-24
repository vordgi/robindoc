import "./breadcrumbs.scss";
import React from "react";
import { type Breadcrumbs as BreadcrumbsType } from "../../types/content";
import { NavLink } from "../nav-link";

export type BreadcrumbsProps = {
    title: string;
    breadcrumbs: BreadcrumbsType;
    link?: React.ElementType;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = async ({ title, breadcrumbs, link }) => {
    return (
        <ul className="r-breadcrumbs">
            {breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.pathname} className="r-breadcrumb _previous">
                    <NavLink link={link} href={breadcrumb.pathname} className="r-breadcrumb-link">
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
