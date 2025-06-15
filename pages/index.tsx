import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const SupportChat = dynamic(() => import('../components/SupportChat'), { ssr: false });

export default function Home() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_COMMIT_SHA) {
      console.log('commit:', process.env.NEXT_PUBLIC_COMMIT_SHA);
    }
  }, []);
  return <SupportChat />;
}
