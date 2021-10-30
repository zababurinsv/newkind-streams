import { WorkerPostMessageStream } from '@metamask/post-message-stream';
const workerStream = new WorkerPostMessageStream();
workerStream.on('data', (data) => console.log(data + ', world'));
workerStream.write('test')