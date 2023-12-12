# Welcome to MyCollection project! 

This app was created to learn React Native.

## Project Technology Stack
### Frontend
    Note: some libraries don't have the newest versions - it's connected to the necessity keep node v.14.21.3 on my machine
- React Native (v0.71.14): A JavaScript framework for building mobile applications.  
- Expo (v48.0.0): A set of tools, libraries, and services for building React Native applications.
- React (v18.2.0) / React DOM (v18.2.0): A JavaScript library for building user interfaces.
- React Navigation (v6.1.6) / React Navigation Stack (v6.9.12): Navigation library for React Native applications.
- Redux Toolkit (v1.9.3) / React Redux (v8.0.5): State management library for React applications.
- Tailwind CSS (v3.3.2): A utility-first CSS framework for rapidly building custom designs.
- Nativewind (v2.0.11): A utility-first tailwind-in-JS library for React Native.
### UI/UX
- @gorhom/bottom-sheet (v4): A performant interactive bottom sheet library for React Native.
- @react-native-async-storage/async-storage (v1.17.11): An asynchronous, persistent, key-value storage system for React Native.
- @react-native-community/datetimepicker (v6.7.3): A React Native datetime picker component.
- expo-image-picker (v14.1.1): Image picker component for Expo-based applications.
- react-native-animatable (v1.3.3): Declarative transitions and animations for React Native.
- react-native-draggable-flatlist (v4.0.1): A flatlist with drag-and-drop support for React Native.
- react-native-gesture-handler (v2.9.0): Declarative API exposing gestures and their states for React Native.
- react-native-heroicons (v3.2.0): A set of free MIT-licensed high-quality SVG icons for you to use in your web projects.
- react-native-progress (v5.0.0): Cross-platform progress bar component for React Native.
- react-native-reanimated (v2.14.4): React Native's Animated library reimplemented.
- react-native-safe-area-context (v4.5.0): React Native library to handle safe area insets.
- react-native-screens (v3.20.0): Native navigation primitives for your React Native app.
- react-native-svg (v13.4.0): SVG library for React Native.
- react-native-swiper (v1.6.0): The best Swiper component for React Native.
### Data Management
- @sanity/client (v6.4.5): JavaScript client for the Sanity Content API.
- @sanity/image-url (v1.0.2): A utility for generating URLs for images stored in Sanity.
- uuid-random (v1.3.2): A simple UUID (Universally Unique Identifier) generator.
### Build and Configuration
- Webpack (via @expo/webpack-config v18.0.1): A module bundler for JavaScript applications.
### Development Tools
- Babel (v7.20.0): JavaScript compiler that allows the use of the latest ECMAScript features.
- ESLint (v7.32.0) / Prettier (v2.7.1): Linting and code formatting tools to ensure code consistency.
- Prop Types (v15.8.1): Runtime type checking for React props.

        Note: this project uses Expo for a simplified development workflow and deployment
        Note: due to the simplicity of the project, I did not consider it necessary to introduce a TypeScript, but I am thinking about adding it in future versions
        Note: Sanity was chosen to easily manage the backend through the CMS in order to focus on the frontend. However, it turned out that it has quite poor documentation and a lot of limitations, so it might be worth digging deeper into the backend and replacing it with something more serious

## What is already implemented
- **loading page with a logo**
- **home page (collections list)**
    - search by collection name / description (implemented on the frontend)
    - tag cloud with a swiper (new tags are being added while editing / creating collection), filtering via tap on a tag (implemented on the frontend)
    - Settings button (navigates to Settings modal window)
    - collections list: icon, name, amount of items inside (this amount is updating after removing / adding items), collection description, tags
    - drag-n-drop sorting
    - tap on list item navigates to Collection view page
    - Add new collection button (navigates to Add new collection form)
- **Collection view page**
    - Go back button (navigates to Home page)
    - collection name
    - Edit button (navigates to Edit collection form)
    - Remove button
    - search by item name / description (implemented on the frontend)
    - collection items list: icon, name, description
    - drag-n-drop sorting
    - tap on list item navigates to Item view page
    - Add new item button (navigates to Add new item form)
    - navigates back by swiping left
- **Edit collection form**
    - Name input (required, simple validation on the frontend)
    - Description textarea
    - Upload picture button - image picker from a camera / gallery, the picture is being displayed after uploading, removing is available by tapping on Remove icon

          note: currently pictures are not being saved on the backend
      
    - Tag input with tag cloud below (removing tags is available by tapping on Remove icon for a certain tag)
    - all fields have pre-filled values, coming from the backend
    - Save button (sends changes to the backend and navigates to Home page - the changes are displayed there at once)
    - navigates back by swiping left
- **Remove collection button**
    - after tapping Remove collection button there is a confirmation modal window appears
    - if removing is confirmed, the collection is being removed from the frontend and from the backend (navigates to Home page, the removed collection and its tags are no longer displayed)
  
          Note: removing is implemented by index instead of unique id because of Sanity limitations
  
- **Add collection form**
    - Name input (required, simple validation on the frontend)
    - Description textarea
    - Upload picture button - image picker from a camera / gallery, the picture is being displayed after uploading, removing is available by tapping on Remove icon

          note: currently pictures are not being saved on the backend
      
    - Tag input with tag cloud below (removing tags is available by tapping on Remove icon for a certain tag)
    - Save button (sends new collection to the backend and navigates to Home page - the new collection is displayed there at once)
    - navigates back by swiping left
- **Item view page**
    - Go back button (navigates to Collection view page)
    - Edit button (navigates to Edit item form)
    - Remove button
    - item's picture (if available)
    - item's name
    - link to an external site (if available) - opens the site in a browser by tap
    - item release and item acquire dates (if available)
    - item's description (if available)
    - navigates back by swiping left
- **Edit item form**
    - Name input (required, simple validation on the frontend)
    - Release date and Acquired date - date pickers, different for Android and iOS
    - Link to an external site input
    - Description textarea
    - Upload picture button - image picker from a camera / gallery, the picture is being displayed after uploading, removing is available by tapping on Remove icon

          note: currently pictures are not being saved on the backend

    - all fields have pre-filled values, coming from the backend
    - Save button (sends changes to the backend and navigates to Collection view page - the changes are displayed there at once)
    - navigates back by swiping left
- **Remove item button**
  - after tapping Remove item button there is a confirmation modal window appears
  - if removing is confirmed, the item is being removed from the frontend and from the backend (navigates to Collection view page, the removed item is no longer displayed)

          Note: removing is implemented by index instead of unique id because of Sanity limitations

- **Add item form**
  - Name input (required, simple validation on the frontend)
  - Release date and Acquired date - date pickers, different for Android and iOS
  - Link to an external site input
  - Description textarea
  - Upload picture button - image picker from a camera / gallery, the picture is being displayed after uploading, removing is available by tapping on Remove icon

        note: currently pictures are not being saved on the backend

  - Save button (sends new item to the backend and navigates to Collection view page - the new item is displayed there at once)
  - navigates back by swiping left
- **Settings modal window**
    - changeable window size, closing by wrapping / Done button
    - Dark mode switcher - switches to dark mode and back, the state is being saved between app loadings

## Future plans
- finish Dark mode + colours list in constants
- get rid of todos
- refactoring
- full testing + test apk on Android
- potentially improve design and fonts
- improved forms validation
- pictures saving
- registration page
- authorization page
- authorization via Google 
- logout
- individual collections and settings for each user
- change user data in Settings modal window
- infinite scroll for collections / items list
- offline mode + warning about lack of internet 
- custom user fields for collections / items
- pictures gallery for item
- removed collection archive
- potentially move from Sanity to another backend and DB
- potentially add TypeScript
