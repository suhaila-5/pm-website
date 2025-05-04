const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

class DataHandler {
    constructor(filename) {
        this.filepath = path.join(DATA_DIR, filename);
    }

    async readData() {
        try {
            const data = await fs.readFile(this.filepath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return null;
            }
            throw error;
        }
    }

    async writeData(data) {
        await fs.writeFile(this.filepath, JSON.stringify(data, null, 2));
    }
}

module.exports = DataHandler;