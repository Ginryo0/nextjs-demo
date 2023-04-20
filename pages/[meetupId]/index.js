import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import MeetUpDetail from '../../components/meetups/MeetupDetail';

export default function MeetUpDetails(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <MeetUpDetail
        title={props.title}
        id={props.id}
        image={props.image}
        address={props.address}
        description={props.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://potato:Zt50CqmQZdlMq5tB@cluster0.spv0bgt.mongodb.net/meetups?retryWrites=true&w=majority'
  );

  const db = client.db();

  const meetupCollection = db.collection('meetups');

  // obj 1 -> filter criteria = none = all objects
  // obj 2 -> extract certain keys
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    'mongodb+srv://potato:Zt50CqmQZdlMq5tB@cluster0.spv0bgt.mongodb.net/meetups?retryWrites=true&w=majority'
  );

  const db = client.db();

  const meetupCollection = db.collection('meetups');

  const objectId = new ObjectId(meetupId);

  const meetup = await meetupCollection.findOne({ _id: objectId });

  return {
    props: {
      id: meetup._id.toString(),
      title: meetup.title,
      image: meetup.image,
      address: meetup.address,
      description: meetup.description,
    },
  };
}
