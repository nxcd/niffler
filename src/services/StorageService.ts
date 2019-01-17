import { IFile } from '../domain/structures/interfaces/IFile'
import { StorageRepository } from '../data/repositories/StorageRepository'

export class StorageService {
  private readonly repository: StorageRepository

  constructor (repository: StorageRepository) {
    this.repository = repository
  }

  async find (id: string): Promise<IFile> {
    const file = this.repository.findById(id)

    return file
  }
}
