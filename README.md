# @newkind/fs

## Table of Contents <!-- omit in toc -->

- [Getting Started](#getting-started)
  - [Install](#install)
- [License](#license)

## Getting Started

It is librari for easy to use test of mocha.js devTool eruda and events bus for uour projects

### Install

Installing `@newkind/fs` with npm
```console
$ npm i @newkind/fs
```
Installing `@newkind/fs` with yarn
```console
$ yarn add @newkind/fs
```

### Example
```jsx
<script type="module">
  import { IDBFS } from './modules/index.mjs'
  (async ()=>{
  await IDBFS()
})()
</script>
```
## License

*GNU GENERAL PUBLIC LICENSE version 3* by [Zababurin Sergey](https://raw.githubusercontent.com/zababurinsv/z-events/master/LICENSE) converted to Markdown. Read the [original GPL v3](http://www.gnu.org/licenses/).


# API
```textmate
FS.read(stream, buffer, offset, length[, position])
Read length bytes from the stream, storing them into buffer starting at offset.

By default, reading starts from the stream’s current offset, however, a specific offset can be specified with the position argument. For example:

var stream = FS.open('abinaryfile', 'r');
var buf = new Uint8Array(4);
FS.read(stream, buf, 0, 4, 0);
FS.close(stream);
Arguments
stream (object) – The stream to read from.

buffer (ArrayBufferView) – The buffer to store the read data.

offset (int) – The offset within buffer to store the data.

length (int) – The length of data to write in buffer.

position (int) – The offset within the stream to read. By default this is the stream’s current offset.

FS.write(stream, buffer, offset, length[, position])
Writes length bytes from buffer, starting at offset.

By default, writing starts from the stream’s current offset, however, a specific offset can be specified with the position argument. For example:

var data = new Uint8Array(32);
var stream = FS.open('dummy', 'w+');
FS.write(stream, data, 0, data.length, 0);
FS.close(stream);
Arguments
stream (object) – The stream to write to.

buffer (ArrayBufferView) – The buffer to write.

offset (int) – The offset within buffer to write.

length (int) – The length of data to write.

position (int) – The offset within the stream to write. By default this is the stream’s current offset.
```


```textmate
let blob = myFiles[0].slice(0, 10 * 1024 * 1024);
```


### Greate tanks Robert Aboukhalil

```textmate
If you want to mount more files from the user, unfortunately you have to unmount and remount the WORKERFS file system since it's read-only.

Here's some code from a tool I developed where you can see sample code to unmount/remount: https://github.com/biowasm/aioli/blob/main/src/worker.js#L115

Also, to get around the read-only nature of the file system, one workaround is to create symlinks as shown here: https://github.com/biowasm/aioli/blob/main/src/worker.js#L127

Hope this helps!
```
