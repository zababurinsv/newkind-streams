export let WORKERFS =  (object = {}) => {
    return new Promise(async (resolve, reject) => {
        let workerfs = {
            files: [],
            is: {
                chrdev:  async (chrdev) => {
                    try {
                        let isChrdev = await object.fs.worker.isChrdev(chrdev)
                        console.log('socket', isChrdev, chrdev)
                        resolve(isChrdev)
                    } catch (e) {
                        console.error('error', e)
                        resolve({
                            status: true,
                            message: e
                        })
                    }
                },
                socket: async (socket) => {
                    try {
                        let isSocket = await object.fs.worker.isSocket(socket)
                        console.log('socket', isSocket, socket)
                        resolve(isSocket)
                    } catch (e) {
                        console.error('error', e)
                        resolve({
                            status: true,
                            message: e
                        })
                    }
                },
                blkdev: async (block) => {
                    try {
                        let isBlkdev = await object.fs.worker.isBlkdev(block)
                        console.log('DDDDDDisBlkdevDDDDD', isBlkdev, block)
                        resolve(isBlkdev)
                    } catch (e) {
                        console.error('error', e)
                        resolve({
                            status: true,
                            message: e
                        })
                    }
                },
                file: async (file) => {
                    try {
                        let isFile = (object.fs.worker.analyzePath(file).exists)
                            ? await object.fs.worker.isFile(object.fs.worker.analyzePath(file).object.mode)
                            : false
                        console.log(`${file} file ${isFile}`)
                        resolve(isFile)
                    } catch (e) {
                        console.error('error', e)
                        resolve({
                            status: true,
                            message: e
                        })
                    }
                },
                dir: (dir = '/') => {
                    return new Promise(async (resolve, reject) => {
                        try {
                            let isDir = (object.fs.worker.analyzePath(dir).exists)
                                ? await object.fs.worker.isDir(object.fs.worker.analyzePath(dir).object.mode)
                                : false
                            console.log(`${dir} dir ${isDir}`)
                            resolve(isDir)
                        } catch (e) {
                            console.error('error', e)
                            resolve({
                                status: true,
                                message: e
                            })
                        }
                    })
                },
                link: async (dir = '/') => {
                    try {
                        let isLink = await object.fs.worker.isLink(dir)
                        resolve(isLink)
                    } catch (e) {
                        console.error('error', e)
                        resolve({
                            status: true,
                            message: e
                        })
                    }
                },
            },
            list: (dirMounted) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        let list = {}
                        let path = (dirMounted === 'default' || dirMounted === '') ? object.dirMounted : dirMounted
                        if(await workerfs.is.dir(path)) {
                            list = (await workerfs.readdir(path)).filter(item => item !== '.' && item !== '..')
                            console.log(list)
                        }
                        resolve(list)
                    } catch (e) {
                        console.error('error',e)
                        resolve({
                            status: true,
                            message: e
                        })
                    }
                })
            },
            read:(stream, buffer, offset, length, position) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        var buf = new Uint8Array(12);
                        object.fs.worker.read(stream, buf, 0, 12, 0);
                        object.fs.worker.close(stream);
                        resolve(contents)
                    } catch (e) {
                        resolve({
                            status: true,
                            message: e
                        })
                    }
                })
            },
            readFile: (file, type = 'binary' | 'utf8') => {
                return new Promise(async (resolve, reject) => {
                    try {
                        let contents = object.fs.worker.readFile(file, { encoding: type });
                        resolve(contents)
                    } catch (e) {
                        resolve({
                            status: true,
                            message: e
                        })
                    }
                })
            },
            symlink: (oldpath, newpath) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        let symlink = await object.fs.worker.symlink(oldpath, newpath)
                        resolve(symlink)
                    } catch (e) {
                        console.error('error', e)
                        resolve({
                            status: true,
                            message: e
                        })
                    }
                })
            },
            unlink: (path) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        let unlink = await object.fs.worker.unlink(path)
                        resolve(unlink)
                    } catch (e) {
                        resolve({
                            status: true,
                            message: e
                        })
                    }
                })
            },
            read: (stream, buffer, offset, length, position) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        // let read = await object.fs.worker.read(path)
                        // var stream = object.fs.worker.open(stream, 'r');
                        // var buf = new Uint8Array(4);
                        // object.fs.worker.read(stream, buf, 0, 4, 0);
                        // object.fs.worker.close(stream);
                        //
                        // console.log('stat:',read)
                        resolve(true)
                    } catch (e) {
                        console.error('dir error:',e)
                        resolve({
                            status: true,
                            message: e
                        })
                    }
                })
            },
            stat: (path) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        let stat = await object.fs.worker.stat(path)
                        console.log('stat:',stat)
                        resolve(stat)
                    } catch (e) {
                        console.error('dir error:',e)
                        resolve({
                            status: true,
                            message: e
                        })
                    }
                })
            },
            readdir: (path) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        let readdir = await object.fs.worker.readdir(path)
                        console.log('dir:',readdir)
                        resolve(readdir)
                    } catch (e) {
                        console.error('dir error:',e)
                        resolve({
                            status: true,
                            message: e
                        })
                    }
                })
            },
            unMount: async (dirMounted = '/newKind') => {
                try {
                    let unMount = await object.fs.worker.unmount(dirMounted)
                    console.log('unMount', unMount)
                    resolve(unMount)
                } catch (e) {
                    resolve({
                        status: true,
                        message: e
                    })
                }
            },
            mount: (files,dirMounted = '/mnt', dirShared = '/shared', dirData='/data') => {
                // const dirData = aioli.config.dirData;
                // const dirShared = aioli.config.dirShared;
                // const dirMounted = aioli.config.dirMounted;

                // Input validation. Note that FileList is not an array so we can't use Array.isArray() but it does have a
                // length attribute. So do strings, which is why we explicitly check for those.
                let toMount = [], mountedPaths = [];
                if(!files?.length || typeof files === "string")
                    files = [ files ];
                // aioli._log(`Mounting ${files.length} files`);
                // Sort files by type: File vs. Blob vs. URL
                for(let file of files)
                {
                    // Handle File/Blob objects
                    // Blob formats: { name: "filename.txt", data: new Blob(['blob data']) }
                    if(file instanceof File || (file?.data instanceof Blob && file.name)) {
                        toMount.push(file);
                        mountedPaths.push(file.name);

                        // Handle URLs: mount "https://website.com/some/path.js" to "/urls/website.com-some-path.js")
                    } else if(typeof file == "string" && file.startsWith("http")) {
                        // Mount a URL "lazily" to the file system, i.e. don't download any of it, but will automatically do
                        // HTTP Range requests when a tool requests a subset of bytes from that file.
                        const fileName = file.split("//").pop().replace(/\//g, "-");
                        //      aioli.fs.createLazyFile(dirData, fileName, file, true, true);
                        mountedPaths.push(fileName);

                        // Otherwise, incorrect data provided
                    } else {
                        throw "Cannot mount file(s) specified. Must be a File, Blob, or a URL string.";
                    }
                }

                // Unmount and remount Files and Blobs since WORKERFS is read-only (i.e. can only mount a folder once)
                try {
                    workerfs.unmount(dirMounted)
                } catch(e) {}

                console.log('workerfs.files', workerfs.files)
                //Mount File & Blob objects
                workerfs.files = workerfs.files.concat(toMount);
                // aioli.files = aioli.files.concat(toMount);
                object.fs.worker.mount(object.fs.worker.filesystems.WORKERFS, {
                    files: workerfs.files.filter(f => f instanceof File),
                    blobs: workerfs.files.filter(f => f?.data instanceof Blob)
                }, dirMounted);

                // Create symlinks for convenience. The folder "dirMounted" is a WORKERFS, which is read-only. By adding
                // symlinks to a separate writeable folder "dirData", we can support commands like "samtools index abc.bam",
                // which create a "abc.bam.bai" file in the same path where the .bam file is created.
                toMount.map(file => {
                    const oldpath = `${dirShared}${dirMounted}/${file.name}`;
                    const newpath = `${dirShared}${dirData}/${file.name}`;
                    try {
                        workerfs.unlink(newpath);
                    } catch(e) {}
                    workerfs._log(`Creating symlink: ${newpath} --> ${oldpath}`)
                //
                //Create symlink within first module's filesystem (note: tools[0] is always the "base" biowasm module)
                    workerfs.symlink(oldpath, newpath);
                })

                console.log({
                    "dir":'----------------------',
                    mountedPaths: mountedPaths,
                    toMount: toMount,
                    dirMounted: dirMounted
                })
                return mountedPaths.map(path => `${dirShared}${dirData}`);
                // return mountedPaths.map(path => `${dirShared}${dirData}/${path}`);
            },
            mkdir: (path) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        let mkdir = await object.fs.worker.mkdir(path)
                        resolve(mkdir)
                    }catch (e) {
                        resolve({
                            status: true,
                            message: e
                        })
                    }
                })
            },
            unmount: async (mountPoint = '/newKind') => {
                try {
                    let unmount = await object.fs.worker.unmount(mountPoint)
                    resolve(unmount)
                } catch (e) {
                    resolve({
                        status: true,
                        message: e
                    })
                }
            },
            // Log if debug enabled
            _log(message) {
                // if(!aioli.config.debug)
                //     return;

                // Support custom %c arguments
                let args = [...arguments];
                args.shift();
                console.log(`%c[WebWorker]%c ${message}`, "font-weight:bold", "", ...args);
            }
        }
        resolve(workerfs)
    })
}

export default {


}