function getFingerprint() {
  const browserFingerprint = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: navigator.deviceMemory,
    cookieEnabled: navigator.cookieEnabled,
    screenResolution: `${screen.width}x${screen.height}`,
    colorDepth: screen.colorDepth,
    touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    windowSize: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    localStorage: !!window.localStorage,
    sessionStorage: !!window.sessionStorage,
    indexedDB: !!window.indexedDB
  };

  return browserFingerprint;
}

async function generateHash(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

async function getUniqueId() {
  const fingerprint = getFingerprint();
  const fingerprintString = JSON.stringify(fingerprint);
  const uniqueId = await generateHash(fingerprintString);
  return uniqueId;
}

getUniqueId().then(uniqueId => {
  console.log("Unique User ID:", uniqueId);
});
