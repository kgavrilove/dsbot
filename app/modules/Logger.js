const fs = require('node:fs');
const path = require('node:path');
const log_path='../../server-logs';
class Logger {
    constructor(logFileName) {
        this.logFilePath = path.join(__dirname, log_path, logFileName);
        this.ensureLogDirectoryExists();
    }

    ensureLogDirectoryExists() {
        const dir = path.dirname(this.logFilePath);
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) {
                console.error('Error creating log directory:', err);
            }
        });
    }
    log(response, eventName, beauty = true) {
        const timestamp = new Date().toISOString();
        let serializedResponse;
        if (beauty) {
            serializedResponse = JSON.stringify(response, null, 2);
        } else {
            serializedResponse = JSON.stringify(response);
        }
        const logMessage = `[${timestamp}] Event: ${eventName}\n${serializedResponse}\n\n`;
        fs.appendFile(this.logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });
    }
}

module.exports = Logger;