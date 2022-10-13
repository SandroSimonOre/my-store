const {config} = require('./config');

const app = require('./app');
async function main() {
    app.listen(config.localServerPort, ()=> {
        console.log(`API is listening on port ${config.localServerPort}`);
    })
}

main();