import { Container } from "robindoc/lib/components/ui/container";
import Image from "next/image";
import Link from "next/link";

import './showcases.scss';

const Showcases = () => (
    <Container className="showcases">
        <h1>
            Tools chosen <span className="showcases-name">RobinDoc</span> for their documentation
        </h1>
        <div className="showcases-btns">
            <Link
                href="https://github.com/vordgi/robindoc/discussions/278"
                target="_blank"
                rel="noopener noreferrer"
                className="showcases-btn"
            >
                Add Yours
            </Link>
            <Link href="/docs" className="showcases-btn showcases-btn_primary">
                Getting Started
            </Link>
        </div>
        <div className="showcases-list">
            <a href="https://nimpl.tech" target="_blank" rel="noopener noreferrer" className="showcases-card">
                <Image src={require('./images/nimpl.png').default} alt="" className="showcases-img" />
                <h2 className="showcases-product">
                    Nimpl
                </h2>
            </a>
        </div>
    </Container>
)

export default Showcases;
