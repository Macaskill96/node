const fs = require('node:fs/promises')
const path = require('path')

const foo = async () => {
    const basePath = path.join(process.cwd(), 'base-folder')
    await fs.mkdir(basePath, {recursive:true})

    const folders = ['folder1', 'folder2', 'folder3', 'folder4'];
    const files = ['file1', 'file2', 'file3', 'file4'];

    await Promise.allSettled(
        folders.map(async (folder, i) => {
            const folderPath = path.join(basePath, folder)
            await fs.mkdir(folderPath, {recursive:true})

            const filePath = path.join(folderPath, `file${i +1}.txt`)
            await fs.writeFile(filePath, 'hello')
        })
    )


    // await Promise.all(folders.map(async (folder) => {
    //     const folderPath = path.join(basePath, folder)
    //     return await fs.mkdir(folderPath, {recursive:true})
    // }))
    //
    // await Promise.all(files.map(async (file) => {
    //     const filePath = path.join(basePath, `${file}.txt`)
    //     return await fs.writeFile(filePath, 'hello')
    // }))

    const filesNames = await fs.readdir(basePath);
    for (const filesName of filesNames) {
        const stat = await fs.stat(path.join(basePath, filesName))
        console.log(filesName, stat.isDirectory())
    }
}

void foo()