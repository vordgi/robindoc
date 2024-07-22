import React from "react";

export type FooterProps = {
    copyright: string;
    hidePoweredBy?: boolean;
};

export const Footer: React.FC<FooterProps> = ({ copyright, hidePoweredBy }) => (
    <footer className="r-footer">
        <div className="r-container">
            <div className="r-footer-row">
                <div className="r-copyright">{copyright}</div>
                <div className="r-theme"></div>
            </div>
            {!hidePoweredBy && (
                <div className="r-footer-row r-footer-additional">
                    <div className="r-powered">
                        Powered by{" "}
                        <a href="https://robindoc.com" className="r-powered-link">
                            ROBINDOC
                        </a>
                    </div>
                </div>
            )}
        </div>
    </footer>
);
