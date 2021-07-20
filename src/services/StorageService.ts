import { IFile } from '../domain/structures/interfaces/IFile'
import { IFileBuffer } from '../domain/structures/interfaces/IFileBuffer'
import { StorageRepository } from '../data/repositories/StorageRepository'

export class StorageService {
  private readonly repository: StorageRepository

  constructor (repository: StorageRepository) {
    this.repository = repository
  }

  async find (id: string): Promise<IFile> {
    return this.repository.findById(id)
  }

  async download (id: string): Promise<IFileBuffer> {
    return this.repository.download(id)
  }
}
