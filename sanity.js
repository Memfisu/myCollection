import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
    projectId: 'mjg92dfx',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-08-11',
    token: 'sk01iQD43v05JOGGVFgqAnTkdOefHeqZM9JzJNiRPnkCkubwdN2A3XUnKHWllvIIabedAYqXt7iX7GetZe9h79Th5QVCZjjQkimNonfZgqn5608V2wR7rXdiSlqGxWfmifQyY1ldufpLnQQp21Ur0fqcDsCBlBUTBQEsgYYxvDgctvkcZpCG'
})

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;