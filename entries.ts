import { readdirSync, statSync } from "fs"
import { join, sep, resolve } from "path"

const getAllFiles = (dirPath: string, arrayOfFiles?: {[x:string]: string}) => {
  const files = readdirSync(dirPath)
  let newFiles = arrayOfFiles || {}

  files.forEach((file) => {
    if (statSync(dirPath + sep + file).isDirectory() && !['interface', 'util', 'strings'].some(x => dirPath.includes(x))) {
      newFiles = getAllFiles(dirPath + sep + file, newFiles)
    } else if (!['index.ts', 'version', '.d.ts'].some(x => file.includes(x)) && !['interface', 'util', 'strings'].some(x => dirPath.includes(x))) {
      const [fileName] = file.split('.');
      const entry = {}
      entry[fileName] = resolve(__dirname, join(dirPath, file));
      // entry[fileName] = join(dirPath, file);
      Object.assign(newFiles, {...entry})
    }
  })

  return newFiles
}

const entries = getAllFiles('src');

export default entries
