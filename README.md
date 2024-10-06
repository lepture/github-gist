# Gist Web Component

`<github-gist>` embed GitHub gists within a Shadow DOM element.

## Usage

Include gist web component `<script>`:

```html
<script src="https://cdn.jsdelivr.net/npm/github-gist"></script>
```

Render gist with a `path` attribute:

```html
<github-gist path="lepture/033239da19f4e3246d1f34bcf20844dd" />
```

## Attributes

1. `path`: required, the URL path of the Gist
2. `theme`: optional, `light` or `dark`

## License

MIT
