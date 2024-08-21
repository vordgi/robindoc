import "./breadcrumbs.scss";
import React from "react";
import { type Breadcrumbs as BreadcrumbsType } from "../../types/content";

export type BreadcrumbsProps = {
    title: string;
    breadcrumbs: BreadcrumbsType;
    link?: React.ElementType;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = async ({ title, breadcrumbs, link: Link = "a" }) => {
    return (
        <ul className="r-breadcrumbs">
            {breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.pathname} className="r-breadcrumb _previous">
                    <Link href={breadcrumb.pathname} className="r-breadcrumb-link">
                        {breadcrumb.title}
                    </Link>
                </li>
            ))}
            <li className="r-breadcrumb _target">
                <p className="r-breadcrumb-title">{title}</p>
            </li>
        </ul>
    );
};
