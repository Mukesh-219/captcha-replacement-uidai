import React, { useEffect, useState } from 'react';
import collectPassiveFeatures from './collectData';
import './App.css';


function App() {
const [result, setResult] = useState(null);


useEffect(() => {
async function detect() {
const features = collectPassiveFeatures();
const res = await fetch('/predict', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(features),
});
const data = await res.json();
setResult(data);
}
detect();
}, []);


return (
<div className="App">
<h1>UIDAI Passive CAPTCHA Replacement</h1>
{result ? (
<>
<p><b>Label:</b> {result.label}</p>
<p><b>Confidence:</b> {(result.confidence * 100).toFixed(2)}%</p>
</>
) : (
<p>Detecting...</p>
)}
</div>
);
}
export default App;
