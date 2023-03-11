import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

export default function NewMeetupPage() {
  const router = useRouter();
  async function addMeetUpHandler(enteredMeetUpData) {
    const res = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetUpData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    console.log(data);

    // router.replace()
    router.push('/');
  }
  return (
    <>
      <Head>
        <title>Add A new meetup</title>
        <meta name="description" content="Add your own meet up" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetUpHandler} />
    </>
  );
}
