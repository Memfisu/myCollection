import {InputTemplate} from '../fields/InputTemplate';
import {ImageUploaderTemplate} from '../fields/ImageUploaderTemplate';
import {TagsInputTemplate} from '../fields/TagsInputTemplate';

export const fieldTypeConfig = {
    string: <InputTemplate />,
    text: <InputTemplate />,
    image: <ImageUploaderTemplate />,
    tags: <TagsInputTemplate />,
};