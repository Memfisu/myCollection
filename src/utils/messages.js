// Link.js
export const LINK_OPEN_ERROR = (url) => `Unable to open, check the link ${url}`;

// Modal.js
export const MODAL_OK_BUTTON = 'Yes';
export const MODAL_CANCEL_BUTTON = 'No';

// DatePickerTemplate.js
export const DATE_PICKER_HINT = 'Tap on the date to select';
export const DATE_PICKER_SELECT_DATE = 'Select a date';

// ImageUploaderTemplate.js
export const IMAGE_UPLOADER_HINT = 'Pick an icon from your gallery';

// SettingsModal.js
export const SETTINGS_HEADER = 'Settings';
export const SETTINGS_CLOSE_BUTTON = 'Done';
export const SETTINGS_DARK_MODE_LABEL = 'Dark mode';

// CollectionViewScreen.js
export const COLLECTION_REMOVE_MODAL_TEXT = (title) =>
  `Do you really want to remove collection ${title}?`;
export const COLLECTION_SEARCH_PLACEHOLDER = 'Search item';
export const COLLECTIONS_LIST_EMPTY_TEXT =
  'There are no items yet. Add a new one!';
export const COLLECTION_ADD_BUTTON_LABEL = 'Add item';

// FormScreen.js
export const FORM_HEADER = (context) => `Add new collection ${context}`;
export const FORM_TITLE_VALIDATION_ERROR = 'Please fill at least Title field';
export const FORM_SAVE_BUTTON_LABEL = 'Save';

// HomeScreen.js
export const HOME_SCREEN_SEARCH_PLACEHOLDER = 'Search collection';
export const HOME_SCREEN_LIST_EMPTY_TEXT =
  'There are no collections yet. Add a new one!';
export const HOME_SCREEN_ADD_BUTTON_LABEL = 'Add collection';

// ItemViewScreen.js
export const ITEM_REMOVE_MODAL_TEXT = (title) =>
  `Do you really want to remove item ${title}?`;
export const ITEM_RELEASE_DATE_LABEL = 'Release date:';
export const ITEM_ACQUIRED_DATE_LABEL = 'Acquired date:';
