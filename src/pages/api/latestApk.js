export default async function handler(req, res) {
  const environment = req.query.environment || "prod";
  const API_TOKEN = process.env.NEXT_PUBLIC_APPFLOW_API_TOKEN;
  const APP_ID = process.env.NEXT_PUBLIC_APP_ID;

  const response = await fetch(`https://api.ionic.io/apps/${APP_ID}/builds`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  const apkBuild = data.data.find(
    (build) =>
      build.platform === "ANDROID" &&
      build.environment_name === environment &&
      build.state === "success"
  );

  if (!apkBuild) {
    throw new Error(
      `No successful APK build found for environment: ${environment}`
    );
  }
  const artifact = apkBuild.artifacts.find(
    (artifact) => artifact.artifact_type === "APK"
  );
  const artifactFetch = await fetch(artifact.url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const artifactDownload = await artifactFetch.json();
  res.status(200).json({ url: artifactDownload.data.url });
}
