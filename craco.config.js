const WorkerPlugin = require('worker-plugin');

module.exports = {
    webpack: {
        plugins: [
            new WorkerPlugin(),
        ]
    }
}