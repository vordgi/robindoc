import React from "react";
import clsx from "clsx";

import "./td.scss";

interface TdProps {
    className?: string;
}

export const Td: React.FC<React.PropsWithChildren<TdProps>> = ({ className, children }) => {
    return <td className={clsx("r-td", className)}>{children}</td>;
};
