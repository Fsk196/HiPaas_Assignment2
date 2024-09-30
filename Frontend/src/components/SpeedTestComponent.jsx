import React, { useEffect, useState } from "react";
import FastSpeedtest from "fast-speedtest-api";

const SpeedTestComponent = () => {
  const [speed, setSpeed] = useState(null);
  const [error, setError] = useState("");

  const speedTest = new FastSpeedtest({
    acceptLicense: true,
    acceptGdpr: true,
    token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
  });

  useEffect(() => {
    const testSpeed = async () => {
      try {
        const s = await speedTest.getSpeed();
        setSpeed(s);
        if (s < 1) {
          setError("Slow internet. Please connect to a proper internet.");
        } else {
          setError("");
        }
      } catch (e) {
        setError("Error testing speed: " + e.message);
      }
    };

    testSpeed();
  }, [speedTest]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {speed && <p>Download speed: {speed.toFixed(2)} Mbps</p>}
    </div>
  );
};

export default SpeedTestComponent;
