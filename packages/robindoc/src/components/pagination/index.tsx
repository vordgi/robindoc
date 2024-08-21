import "./pagination.scss";
import React from "react";

export type PaginationProps = {
    prev?: { title: string; pathname: string };
    next?: { title: string; pathname: string };
    link?: React.ElementType;
};

export const Pagination: React.FC<PaginationProps> = async ({ prev, next, link: Link = "a" }) => {
    return (
        <div className="r-pagination">
            {prev ? (
                <Link href={prev.pathname} className="r-pagination-item _prev">
                    <span className="r-pagination-icon _prev">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </span>
                    <span className="r-pagination-text">
                        <span>Previous</span>
                        <br />
                        <span className="r-pagination-title">{prev.title}</span>
                    </span>
                </Link>
            ) : (
                <span />
            )}
            {next ? (
                <Link href={next.pathname} className="r-pagination-item _next">
                    <span className="r-pagination-icon _next">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </span>
                    <span className="r-pagination-text">
                        <span>Next</span>
                        <br />
                        <span className="r-pagination-title">{next.title}</span>
                    </span>
                </Link>
            ) : (
                <span />
            )}
        </div>
    );
};
