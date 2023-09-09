import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'moments_app',

  projectId: '7iz5ghiu',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    name:"moments_jsm",
    types: schemaTypes,
  },
})
