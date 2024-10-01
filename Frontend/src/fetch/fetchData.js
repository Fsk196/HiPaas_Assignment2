import FastSpeedtest from "fast-speedtest-api";

export const fetchAllUserData = async (setData, setError, setLoading, data) => {
  try {
    const response = await fetch("http://localhost:3000/fetchdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log(result.users);
    setData(result.users);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


export const speedTest = new FastSpeedtest({
    acceptLicense: true,
    acceptGdpr: true,
    token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
  });

export const getAllNotes = async () => {
  try {
    const response = await fetch("http://localhost:3000/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    
  }
}
