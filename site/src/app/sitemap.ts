import { type MetadataRoute } from 'next';

import { getStaticParams } from './docs/robindoc';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const staticParams = await getStaticParams('', 'path');
  staticParams.push({ path: [] });

  return staticParams.map(({ path }) => ({
    url: `https://robindoc.com/${path.join('/')}/`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));
}

export default sitemap;
