// Type-checks every TypeScript snippet in the READMEs and every file in
// examples/ against the generated SDK in src/, so a README that calls a
// method the generator does not produce fails CI instead of shipping.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const out = join(root, '.docs-check');
const docs = ['README.md', 'examples/README.md'];

const ambient = {
  config: "declare const config: import('linkbreakers').Configuration;",
  linksApi: "declare const linksApi: import('linkbreakers').LinksApi;",
  visitorsApi: "declare const visitorsApi: import('linkbreakers').VisitorsApi;",
};

rmSync(out, { recursive: true, force: true });
mkdirSync(out);

const files = [];
for (const doc of docs) {
  const text = readFileSync(join(root, doc), 'utf8');
  const blocks = [...text.matchAll(/```(?:typescript|ts)\n([\s\S]*?)```/g)];
  blocks.forEach((match, index) => {
    const code = match[1];
    const preamble = Object.entries(ambient)
      .filter(([name]) => new RegExp(`\\b${name}\\b`).test(code))
      .filter(([name]) => !new RegExp(`\\b(const|let|var)\\s+${name}\\b`).test(code))
      .map(([, line]) => line);
    const name = `${doc.replace(/\W+/g, '_')}_${index + 1}.ts`;
    writeFileSync(join(out, name), [...preamble, code, 'export {};', ''].join('\n'));
    files.push(name);
  });
}

const examples = readdirSync(join(root, 'examples'))
  .filter((file) => file.endsWith('.ts'))
  .map((file) => `../examples/${file}`);

writeFileSync(
  join(out, 'tsconfig.json'),
  JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2022',
        module: 'ES2022',
        moduleResolution: 'node',
        lib: ['ES2022', 'DOM'],
        strict: true,
        noEmit: true,
        skipLibCheck: true,
        types: ['node'],
        baseUrl: '.',
        paths: { linkbreakers: ['../src/index.ts'] },
      },
      files: [...files, ...examples],
    },
    null,
    2,
  ),
);

try {
  execFileSync(join(root, 'node_modules/.bin/tsc'), ['-p', join(out, 'tsconfig.json')], { stdio: 'inherit' });
  console.log(`Checked ${files.length} README snippets and ${examples.length} examples against src/.`);
} catch {
  console.error('\nA README snippet or example no longer matches the generated SDK. Fix the docs (README.md, examples/) to use the generated method and request names.');
  process.exit(1);
} finally {
  rmSync(out, { recursive: true, force: true });
}
