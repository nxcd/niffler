export interface IFile {
  id: string,
  name: string,
  size: number,
  mimetype: string,
  signedUrl: string,
  createdAt: Date | string
}
