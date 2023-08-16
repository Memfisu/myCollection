import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
    projectId: 'mjg92dfx',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-08-11'
})

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;