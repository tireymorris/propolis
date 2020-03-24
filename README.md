# propolis

A simple blog platform, written in Preact.

Renders Markdown using highlight.js for syntax highlighting.

## installation

In your project, include the following scripts:

```
  <head>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/propolis@0.3.14/build/highlight.css" />
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/propolis@0.3.14/build/main.css" />
  </head>

  <body>
    <script src="https://cdn.jsdelivr.net/npm/propolis@0.3.14/build/main.bundle.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/propolis/build/vendors~highlight.js.bundle.js"></script>
  </body>
```

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
