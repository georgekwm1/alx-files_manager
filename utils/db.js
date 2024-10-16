const mongodb = require('mongodb');

const host = 'localhost';
const port = 27017;

class DBClient {
  constructor() {
    this.url = `mongodb://${host}:${port}`;
    this.client = new mongodb.MongoClient(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.databaseName = 'files_manager';
  }

  async connect() {
    if (!this.client.isConnected()) {
      await this.client.connect();
    }
    return this.client.db(this.databaseName);
  }

  async isAlive() {
    try {
      await this.connect(); // Connect once
      return true;
    } catch (err) {
      return false;
    }
  }

  async nbUsers() {
    try {
      const db = await this.connect(); // Reuse connection
      const collection = db.collection('users');
      const numberOfUsers = await collection.countDocuments(); // Get count directly
      return numberOfUsers;
    } catch (err) {
      console.error('Error counting users:', err);
      return 0;
    }
  }

  async nbFiles() {
    try {
      const db = await this.connect(); // Reuse connection
      const collection = db.collection('files');
      const numberOfDocs = await collection.countDocuments(); // Get count directly
      return numberOfDocs;
    } catch (err) {
      console.error('Error counting files:', err);
      return 0;
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
