import { MongoClient } from 'mongodb';

const mongoUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_DBNAME || 'abc-development';

const collectionsToClear = ['projects', 'news', 'blogs', 'resources'];

async function cleanDatabase() {
  if (!mongoUri) {
    console.error('Error: MONGODB_URI environment variable is not set.');
    console.log('To run this script on Render or your live environment, make sure MONGODB_URI is provided.');
    console.log('Example: MONGODB_URI="your_connection_string" node backend/clean-db.js');
    console.log('\n(Note: If you are running locally without MongoDB, the arrays in backend/data/db.json have already been cleared for you.)');
    process.exit(1);
  }

  const client = new MongoClient(mongoUri);

  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('Connected successfully.');

    const db = client.db(mongoDbName);

    for (const collName of collectionsToClear) {
      console.log(`Clearing collection: ${collName}...`);
      const coll = db.collection(collName);
      const result = await coll.deleteMany({});
      console.log(`Deleted ${result.deletedCount} documents from ${collName}.`);
    }

    console.log('\nDatabase cleanup completed successfully. The website is now ready for fresh actual content.');
  } catch (error) {
    console.error('Error cleaning database:', error);
  } finally {
    await client.close();
    console.log('Database connection closed.');
  }
}

cleanDatabase();
