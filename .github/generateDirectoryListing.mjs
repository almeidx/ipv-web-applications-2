import { readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

let html = `<html>
  <body>
		<ul>`;

const dirents = await readdir(new URL(join("..", "fichas"), import.meta.url), {
  withFileTypes: true,
});

for (const dirent of dirents) {
  if (!dirent.isDirectory()) continue;

  const url = new URL(join("..", "fichas", dirent.name), import.meta.url);
  const innerDirents = await readdir(url, { withFileTypes: true });

  html += `
		<li>
			<a href="${dirent.name}">${dirent.name}</a>
			<ul>`;

  for (const innerDirent of innerDirents) {
    if (innerDirent.isDirectory()) {
      html += `
					<li>
						<a href="${dirent.name}/${innerDirent.name}">${innerDirent.name}</a>
						<ul>`;

      const innerInnerFiles = await readdir(
        new URL(innerDirent.name, url.href + "/")
      );

      for (const file of innerInnerFiles) {
        html += `
							<li>
								<a href="${dirent.name}/${innerDirent.name}/${file}">${file}</a>
							</li>`;
      }

      html += `
						</ul>
					</li>`;
    } else {
      html += `
        <li>
          <a href="${dirent.name}/${innerDirent.name}">${innerDirent.name}</a>
        </li>`;
    }
  }

  html += `
			</ul>
		</li>`;
}

html += `
		</ul>
	</body>
</html>
`;

await writeFile(
  new URL(join("..", "fichas", "index.html"), import.meta.url),
  html
);
