'use strict'

import { merge } from 'webpack-merge'

import commonConfig from './webpack.config.common'
import { srcCronDir, distCronDir } from './webpack.constants'

// ----------------------------------------------------------------------------
// Cron
// ----------------------------------------------------------------------------

export default merge(commonConfig, {
    target: 'node',

    context: srcCronDir,
    entry: {
        fetchAuctions: 'fetchAuctions.ts',
        fetchData: 'fetchData.ts',
    },
    output: {
        path: distCronDir,

        // Needed by VSCode debugger to find original aliased paths
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    },
})
