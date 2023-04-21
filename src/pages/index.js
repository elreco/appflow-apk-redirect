import { useEffect } from 'react';
import './Home.css';

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
    <div className="container">
      <h1 className="download-text">Le téléchargement de l'apk Hey Pongo va démarrer...</h1>
    </div>
  );
}
