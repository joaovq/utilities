import fs, { ReadStream } from 'fs'

import { FileUtilities } from '@/domain'

export class FileUtilitiesImpl implements FileUtilities {
  get(path: string): string {
    return fs.readFileSync(this.transformPathToRootDir(path), 'utf8')
  }

  transformPathToRootDir(path: string): string {
    return path.split('node_modules/')[0]
  }

  getJSON(path: string): any {
    const json = this.get(path)
    if (json) {
      return JSON.parse(json)
    } else {
      throw new Error(`No file was found at ${this.transformPathToRootDir(path)}`)
    }
  }

  getFilesFromDir(dir: string): string[] {
    return fs.readdirSync(this.transformPathToRootDir(dir), null)
  }

  getReadStream(path: string): ReadStream {
    return fs.createReadStream(this.transformPathToRootDir(path))
  }

  create(path: string, data: string): void {
    return fs.writeFileSync(this.transformPathToRootDir(path), data)
  }

  remove(path: string): void {
    if (this.exists(this.transformPathToRootDir(path))) {
      fs.unlinkSync(this.transformPathToRootDir(path))
    }
  }

  exists(path: string): boolean {
    return fs.existsSync(this.transformPathToRootDir(path))
  }
}
