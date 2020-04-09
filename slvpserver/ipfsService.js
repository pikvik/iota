'use strict'
var ipfsClient = require('ipfs-http-client')
var ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' })

module.exports = {
  //adding content to ipfs
  add: async (data) => {
    return ipfs.add(Buffer.from(data));
  },
  get: async (hash) => {
    return ipfs.get(hash)
  },
  addFile: async (path, value) => {
    //return ipfs.files.write('/' + path, value, { create: true })
      return ipfs.add({path:path, content: value});
  },
  getFile: async (hash) => {
    const fileBuffer = await this.ipfs.files.cat(hash);
    console.log(fileBuffer.toString());
  }
}
