import Link from 'next/link';
import { Container } from 'robindoc/lib/components/ui/container'
import { Heading } from 'robindoc/lib/components/ui/heading'
import { Paragraph } from 'robindoc/lib/components/ui/paragraph'
import { Strong } from 'robindoc/lib/components/ui/strong'
import { Em } from 'robindoc/lib/components/ui/em'

import './intro.scss';

export const Intro: React.FC = () => {
    return (
        <div className='intro-wrapper'>
            <Container className='intro'>
                <div className="intro-content">
                    <Heading component='h1' className='intro-title'>
                        Interface for your documentation on the fly
                    </Heading>
                    <Paragraph>
                        Write the documentation however you want, <Strong className='intro-bold'>Robindoc</Strong> will build it on top
                        <br />
                        <Em className='intro-italic'>
                            Fast, simple, easy
                        </Em>
                    </Paragraph>
                    <div className='intro-actions'>
                        <span className='intro-get-started'>
                            <Link href='/docs' className='intro-get-started-link'>
                                Get Started
                            </Link>
                        </span>
                        <span className='intro-cmd'>
                            <span className='intro-cmd-tool'>
                                npm
                            </span>
                            {' install robindoc'}
                        </span>
                    </div>
                </div>
                <div>
                    <svg className='intro-logo' width="456" height="456" viewBox="0 0 456 456">
                        <path className='intro-logo-inner' d="M187.421 187.351L187.366 187.366L187.351 187.421C183.847 200.354 181.977 213.959 181.977 228C181.977 242.041 183.847 255.646 187.351 268.579L187.366 268.634L187.421 268.649C200.354 272.153 213.959 274.023 228 274.023C242.041 274.023 255.646 272.153 268.579 268.649L268.634 268.634L268.649 268.579C272.153 255.646 274.023 242.041 274.023 228C274.023 213.959 272.153 200.354 268.649 187.421L268.634 187.366L268.579 187.351C255.646 183.847 242.041 181.977 228 181.977C213.959 181.977 200.354 183.847 187.421 187.351Z" fill="var(--neutral800)"/>
                        <path className='intro-logo-outer' d="M187.473 187.544L187.529 187.529L187.544 187.473C194.766 160.817 208.94 137.02 228 118.148C247.06 137.02 261.234 160.817 268.456 187.473L268.471 187.529L268.527 187.544C295.183 194.766 318.98 208.94 337.852 228C318.98 247.06 295.183 261.234 268.527 268.456L268.471 268.471L268.456 268.527C261.234 295.183 247.06 318.98 228 337.852C208.94 318.98 194.766 295.183 187.544 268.527L187.529 268.471L187.473 268.456C160.817 261.234 137.02 247.06 118.148 228C137.02 208.94 160.817 194.766 187.473 187.544ZM228 117.866C200.045 90.2567 161.631 73.2125 119.235 73.2125C110.69 73.2125 102.307 73.9049 94.1379 75.2368C88.8839 76.0934 83.7187 77.2146 78.6565 78.5861L78.6011 78.6011L78.5861 78.6565C77.2146 83.7187 76.0934 88.8839 75.2368 94.1379C73.9049 102.307 73.2125 110.69 73.2125 119.235C73.2125 161.631 90.2567 200.045 117.866 228C90.2567 255.955 73.2125 294.369 73.2125 336.765C73.2125 345.31 73.9049 353.693 75.2368 361.862C76.0934 367.116 77.2146 372.281 78.5861 377.344L78.6011 377.399L78.6565 377.414C83.7187 378.785 88.8839 379.907 94.1379 380.763C102.307 382.095 110.69 382.788 119.235 382.788C161.631 382.788 200.045 365.743 228 338.134C255.955 365.743 294.369 382.788 336.765 382.788C345.31 382.788 353.693 382.095 361.862 380.763C367.116 379.907 372.281 378.785 377.344 377.414L377.399 377.399L377.414 377.344C378.785 372.281 379.907 367.116 380.763 361.862C382.095 353.693 382.788 345.31 382.788 336.765C382.788 294.369 365.743 255.955 338.134 228C365.743 200.045 382.788 161.631 382.788 119.235C382.788 110.69 382.095 102.307 380.763 94.1379C379.907 88.8839 378.785 83.7187 377.414 78.6565L377.399 78.6011L377.344 78.5861C372.281 77.2146 367.116 76.0934 361.862 75.2368C353.693 73.9049 345.31 73.2125 336.765 73.2125C294.369 73.2125 255.955 90.2567 228 117.866Z" fill="var(--neutral800)"/>
                    </svg>
                </div>
            </Container>
        </div>
    );
}