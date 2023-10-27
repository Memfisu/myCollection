import React from 'react';
import { InputTemplate } from '../fields/InputTemplate';
import { ImageUploaderTemplate } from '../fields/ImageUploaderTemplate';
import { TagsInputTemplate } from '../fields/TagsInputTemplate';
import { DatePickerTemplate } from '../fields/DatePickerTemplate';

export const fieldTypeConfig = {
  string: <InputTemplate />,
  text: <InputTemplate />,
  image: <ImageUploaderTemplate />,
  tags: <TagsInputTemplate />,
  date: <DatePickerTemplate />,
};
