// compile.ts
import TypeScript from 'typescript';
import { basename } from 'path';
import { RawSourceMap } from 'source-map';
import { readFileSync } from 'fs';

export default function tsCompile(
  path: string,
  ops?: Partial<TypeScript.TranspileOptions>,
): TypeScript.TranspileOutput & { sourceMap: RawSourceMap } {
  // Default options -- you could also perform a merge, or use the project tsconfig.json
  const options: TypeScript.TranspileOptions = Object.assign(
    {
      compilerOptions: {
        allowJs: true,
        esModuleInterop: true,
        removeComments: false,
        target: 99, // ESNext
        allowSyntheticDefaultImports: true,
        isolatedModules: true,
        noEmitHelpers: true,
        sourceMap: true,
      } as Partial<TypeScript.CompilerOptions>,
    },
    ops,
  );
  const contents = readFileSync(path, { encoding: 'utf8' });
  const { outputText, sourceMapText } = TypeScript.transpileModule(contents, options);
  const sourceMap: RawSourceMap = JSON.parse(sourceMapText || '');
  sourceMap.file = basename(path);
  sourceMap.sources = [basename(path)];

  return { outputText, sourceMap, sourceMapText };
}
