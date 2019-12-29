# propolis

A simple blog platform, written in Preact.

Renders Markdown using highlight.js for syntax highlighting.

## configuration

In the root of your web directory, create a `pages.json` manifest file which tells propolis where to find and route your content.

The file has the the following format:

```
  [
    // normal page
    {
      "name": string       // displayed on navbar
      "id": string         // the route for this page
      "filepath": string   // the path to a markdown file on the server
    },
    // Posts page
    {
      "name": string,
      "id": string,
      "posts": []            // Array of normal pages
    },
  ]
```

For example,

```
[
  {
    "name": "Home",
    "id": "", // empty string means index route
    "filepath": "home.md"
  },
  {
    "name": "Posts",
    "id": "posts",
    "posts": [
      {
        "name": "Hello World Post",
        "id": "hello-world",
        "filepath": "posts/hello.md"
      }
    ]
  },
  {
    "name": "Projects",
    "id": "projects",
    "filepath": "projects.md"
  }
]

```

## styling (optional)

### app-level

Include a css file to overwrite any rules included here and add your own styling.

### highlight.js

You can find themes for highlight.js [here.](https://github.com/highlightjs/highlight.js/tree/master/src/styles)

Because highlight.js needs a theme to be included by default to work properly, and the bundled theme takes precedence over anything in the `head` block, this was my quick and dirty solution for new syntax highlighting:

```
  <script src="https://cdn.jsdelivr.net/npm/propolis@0.3.0/build/main.bundle.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/propolis/build/vendors~highlight.js.bundle.js"></script>
  <script>
    window.setTimeout(() => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('type', 'text/css');
      link.setAttribute(
        'href',
        'https://cdn.jsdelivr.net/gh/highlightjs/highlight.js@master/src/styles/solarized-light.css'
      );

      document.querySelector('head').appendChild(link);
    }, 250);
  </script>
```
