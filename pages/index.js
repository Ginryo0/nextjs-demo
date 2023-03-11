import { MongoClient } from 'mongodb';
import MeetUpList from '../components/meetups/MeetupList';
import Head from 'next/head';
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from API
//   // do some server side validation ...
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch meetups from API
  // this code will never end up on client side bundle

  const client = await MongoClient.connect(
    'mongodb+srv://ginryo:nYLu5PhiBEiEWxOP@cluster0.spv0bgt.mongodb.net/meetups?retryWrites=true&w=majority'
  );

  const db = client.db();

  const meetupCollection = db.collection('meetups');

  const meetups = await meetupCollection.find().toArray();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 3600,
  };
}

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse React meetups"></meta>
      </Head>
      <MeetUpList meetups={props.meetups} />
    </>
  );
}
