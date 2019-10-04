module.exports = function templateReact(html) {
	return(`<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>masplay videojuegos</title>
        <link rel="stylesheet" href="/static/bulma.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/static-dist/js/app.js"></script>
      </body>
    </html>
  	`
	);
}