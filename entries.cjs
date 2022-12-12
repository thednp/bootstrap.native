const { readdirSync, statSync } = require("fs")
const { join, sep } = require("path")

const getAllFiles = (dirPath, arrayOfFiles) => {
  const files = readdirSync(dirPath)
  let newFiles = arrayOfFiles || []

  files.forEach((file) => {
    if (statSync(dirPath + sep + file).isDirectory() && !['interface', 'util', 'strings'].some(x => dirPath.includes(x))) {
      newFiles = getAllFiles(dirPath + sep + file, newFiles)
    } else if (!['index.ts', 'version', '.d.ts'].some(x => file.includes(x)) && !['interface', 'util', 'strings'].some(x => dirPath.includes(x))) {
      const [name] = file.split('.');
      const entry = {
        filePath: join(dirPath, file).replace(/\\/g, '/'),
        outFile: join('dist', 'components', name + '.d.ts').replace(/\\/g, '/'),
        noCheck: false,
        output: {
          noBanner: true,
        }
      }
      newFiles.push(entry)
    }
  })

  return newFiles;
}

module.exports = getAllFiles('src');
