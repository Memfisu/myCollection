import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'item',
  title: 'Collection item',
  type: 'document',
  fields: [
    defineField({
      name: 'itemIcon',
      title: 'Collection item icon',
      type: 'image',
    }),
    defineField({
      name: 'title',
      title: 'Item title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Item description',
      type: 'text',
    }),
  ],
})
