import Image from 'next/image';
import { Container } from 'robindoc/lib/components/ui/container'
import { Heading } from 'robindoc/lib/components/ui/heading'
import { Paragraph } from 'robindoc/lib/components/ui/paragraph'
import { ContentLink } from 'robindoc/lib/components/ui/content-link'

import { SourcesImg } from './images/sources';
import { ToolsImg } from './images/tools';

import './features.scss';
import { VisibleWrapper } from '../../ui/visible-wrapper';

export const Features: React.FC = () => {
    return (
        <Container className='features'>
            <div className='features-card features-card-1'>
                <div>
                    <Heading component='h2' className='features-heading'>
                        Unified documentation format
                    </Heading>
                    <Paragraph>
                        Any of your documentation will work great in Robindoc
                        <br />
                        Any of Robindoc documentation will work great in any service
                    </Paragraph>
                </div>
                <Image src={require('./images/views.png').default} alt='' className='features-img' loading='lazy' />
            </div>
            <div className='features-card features-card-2'>
                <div>
                    <Heading component='h2' className='features-heading'>
                        Built on React.js only
                    </Heading>
                    <Paragraph>
                        Robindoc is built on RSC. This gives flexibility and dynamics. But the most important thing is freedom of choice!
                        <br />
                        Use any bundler and any configuration in any project!
                    </Paragraph>
                </div>
                <ToolsImg className='features-img' />
            </div>
            <div className='features-card features-card-3'>
                <Heading component='h2' className='features-heading'>
                    Fast and friendly
                </Heading>
                <Paragraph>
                    Optimized for metrics and accessibility. Minimum data to client, minimum logic to server
                </Paragraph>
            </div>
            <VisibleWrapper className='features-card features-card-5 features-sources'>
                <Heading component='h2' className='features-heading'>
                    Load content from any sources
                </Heading>
                <SourcesImg className='features-img' />
            </VisibleWrapper>
            <div className='features-card features-card-4'>
                <Heading component='h2' className='features-heading'>
                    Easy to use
                </Heading>
                <Paragraph>
                    <ContentLink href="/docs/getting-started">
                        Install
                    </ContentLink>
                    {', '}
                    <ContentLink href="/docs/structure">
                        Configure
                    </ContentLink>
                    {', '}
                    Deploy!
                </Paragraph>
            </div>
        </Container>
    );
}
