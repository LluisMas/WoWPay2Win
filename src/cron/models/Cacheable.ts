import path from 'path'

import { ICache } from '@common/ICache'
import { loadCacheFromFile, saveCacheToFile } from '@cron/utils'

export abstract class Cacheable {
    readonly cacheFile: string

    constructor(cacheFile: string) {
        if (!DEFINE.CACHE_DIR) {
            throw new Error('DEFINE.CACHE_DIR is not set by the preprocessor')
        }

        this.cacheFile = path.resolve(DEFINE.CACHE_DIR, cacheFile)
    }

    abstract fetch(): Promise<void>

    protected abstract import(fileContents: string): boolean

    protected abstract export(): ICache

    protected async loadFromCache(): Promise<boolean> {
        return loadCacheFromFile(this.cacheFile, (fileContents) => {
            return this.import(fileContents)
        })
    }

    protected async saveToCache(): Promise<boolean> {
        const cachedContents = this.export()
        return saveCacheToFile(this.cacheFile, cachedContents)
    }
}
