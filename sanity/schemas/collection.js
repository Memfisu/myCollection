import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({
      name: 'collectionIcon',
      title: 'Collection icon',
      type: 'image',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'myTags',
      title: 'Tags',
      type: 'tags',
    }),
      defineField({
        name: 'items',
        title: 'Items',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'item' }] }],
    })
  ],
})
