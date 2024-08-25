"use client";

import "./last-modified.scss";
import React, { useEffect, useState } from "react";

export interface LastModifiedProps extends React.HTMLAttributes<HTMLDivElement> {
    date: string;
}

export const LastModified: React.FC<LastModifiedProps> = ({ date, className, children, ...props }) => {
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        setFormattedDate(new Date(date).toLocaleDateString());
    }, []);

    return (
        <div className={`r-last-modified${className ? ` ${className}` : ""}`} {...props}>
            {children}{" "}
            <time dateTime={date} title={date}>
                {formattedDate}
            </time>
        </div>
    );
};
