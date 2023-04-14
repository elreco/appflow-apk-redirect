import { useEffect } from 'react';

const redirectToLatestApk = async () => {
  try {
    const response = await fetch('/api/latestApk');

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const apkUrl = data.url;
    window.location.href = apkUrl;
  } catch (error) {
    console.error('Failed to redirect to the latest APK', error);
  }
};

export default function Home() {
  useEffect(() => {
    redirectToLatestApk();
  }, []);

  return (
    <div>
      <h1>Redirection en cours...</h1>
    </div>
  );
}
