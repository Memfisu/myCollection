import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'collectionFields',
  title: 'Collection fields',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Field label',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'order',
      title: 'Field order',
      type: 'number',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      title: 'Is required',
      name: 'isRequired',
      type: 'boolean'
    }),
    defineField({
      title: 'Field type',
      name: 'type',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Input', value: 'string' },
          { title: 'Text area', value: 'text' },
          { title: 'Image', value: 'image' },
          { title: 'Tags', value: 'tags' },
        ],
      },
    }),
    defineField({
      name: 'schemeName',
      title: 'Field name in scheme',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
  ],
})
