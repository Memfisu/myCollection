import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {tags} from 'sanity-plugin-tags'

export default defineConfig({
  name: 'default',
  title: 'myCollection',

  projectId: 'mjg92dfx',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), tags({})],

  schema: {
    types: schemaTypes,
  },
})
