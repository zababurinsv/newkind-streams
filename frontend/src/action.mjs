import { WORKERFS } from './index.mjs'
export default (async () => {
    let workerfs = await WORKERFS()
    let list = async (dir) => await workerfs.list(dir)
    let readdir = async (readdir) => await workerfs.readdir(readdir)
    let readFile = async (object) =>  await workerfs.readFile(object.file, object.type)
    let mount = async (files) =>  await workerfs.mount(files)
    return {
        list: list,
        readdir: readdir,
        readFile: readFile,
        writeFiles: mount
    }
})()