import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

// API routes -> don't return HTML -> accept data, store them in DB
// code entered here will never end in client side
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // const { title, image, description, address } = data;

    const client = await MongoClient.connect(
      'mongodb+srv://potato:Zt50CqmQZdlMq5tB@cluster0.spv0bgt.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);
    // console.log(result);

    client.close();

    res.status(201).json({ message: 'meetup inserted' });
  }
}
