import { Body } from 'aws-sdk/clients/s3'
import { IFile } from '../domain/structures/interfaces/IFile'
import { StorageRepository } from '../data/repositories/StorageRepository'

export class StorageService {
  private readonly repository: StorageRepository

  constructor (repository: StorageRepository) {
    this.repository = repository
  }

  async find (id: string): Promise<IFile> {
    return this.repository.findById(id)
  }

  async download (id: string): Promise<Body | undefined> {
    return this.repository.download(id)
  }
}
