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
      name: 'link',
      title: 'Link to some outer website',
      type: 'string',
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release date',
      type: 'date',
    }),
    defineField({
      name: 'acquiredDate',
      title: 'Date acquired',
      type: 'date',
    }),
    defineField({
      name: 'description',
      title: 'Item description',
      type: 'text',
    }),
  ],
})
