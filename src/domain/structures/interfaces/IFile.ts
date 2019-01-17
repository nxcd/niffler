export interface IFile {
  id: string,
  name: string,
  size: number,
  mimetype: string,
  enconding: string,
  signedUrl: string,
  createdAt: Date | string
}
