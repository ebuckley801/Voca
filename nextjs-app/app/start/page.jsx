import Link from 'next/link';
import AudioRecorder from '../../utils/audioRecorder'; // Adjust the path as necessary

export default function Start() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to the Start Page!</h1>
      
      <Link href="/" passHref>
        <button className="mt-4 ml-4 rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700">
          Go Back
        </button>
      </Link>

      <AudioRecorder/> {/* Added AudioRecorder component */}

    </div>
  );
}