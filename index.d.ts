declare function setupImgurStorage(opts: {clientId: string}): {
  _handleFile: (req: any, file: any, cb: any) => any,
  _removeFile: (req: any, file: any, cb: any) => void
}

module.exports = setupImgurStorage;
