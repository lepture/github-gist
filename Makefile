
build-embed:
	@echo "export default \`" > src/iframe.js
	@node_modules/.bin/esbuild --minify embed/iframe.js >> src/iframe.js
	@echo "\`" >> src/iframe.js
	@node_modules/.bin/esbuild --minify embed/reset.css > src/reset.css
	@node_modules/.bin/esbuild --minify embed/dark.css > src/dark.css


dev-server:
	@python3 -m http.server -b localhost
