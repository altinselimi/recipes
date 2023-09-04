# Recipes App

## Start the app

1. `npm install`
2. `npm run dev`
   Open localhost:5173 in your browser

## Architecture decisions

-   Folder structure:
    The source folder is made up of assets, components, composables, skeletons, store, styles and views. The main component is located in App.vue, and it gets mounted in main.js, which initiates the application.
    Assets - In assets we would be storing static images like icons, illustrations and fonts. Currently we are not really doing anything with it since we don't have any branding but that's where it would go.
    Components - These are generic components that can be used to make up bigger components. Its ideal they don't use any business logic, and are as such dumb components, used only for rendering stuff and are not concerned with anything else.
    Composables - The new addition to Vue 3, a way to create re-usable reactive variables and expose them to be used throughout the app. Here we are using page-transitions which were introduced recently in chrome and edge. We also use a composable to trap the focus but that one we installed as a library because why not (I'll explain later).
    Skeletons - Whenever I can, I will use skeletons to display loading state of an application. As a user I really find it much easier to read and use applications that do utilize these, that's why in my workflow they do have their specific folder. They will be minimalistic markups of the components they represent, often completely different.
    Store - A very important part of any SPA is sharing the state between components and pages. Now with the tools Vue provides we can also roll up our own but Pinia does a pretty good job, is very light and why re-invent the wheel really.
    Styles - A place to store all things CSS: utils, variables, animations and such.
    Views - This is where we define routes and write components specific to them. Each view usually has its own folder where its split into multiple components for better readability and maintainability.

-   Included libraries:

    -   vueuse // it offers a nice composable to trap focus in our Popup component
    -   lodash/debounce // used in the search component
    -   lucide-vue-next // an icons library which I really like
    -   pinia // store management
    -   vue
    -   vue-router

-   Feature of choice:

    -   Bookmarks : when you open a recipe you can click on the Bookmark button, and the meal will then be stored in your localStorage, which you can find under the Bookmark button on the left side of the header
    -   Page transitions : clicking a meal will have its title and image move to the new position in an app-like native way. This is not available in Safari browsers yet (mobile included), but is available in Edge and Chrome browsers. The implementation is not perfect though since it should also perform the inverse animation when user navigates back.

-   Testing:
    -   Used Vitest and wrote unit tests only for the base components listed under /components folder.
