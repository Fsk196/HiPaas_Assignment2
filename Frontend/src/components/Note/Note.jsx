import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

const Note = () => {
  const { user } = useSelector((state) => state.auth);
  const userID = user?.userId;
  const [notes, setNotes] = React.useState([]);

  useEffect(() => {
    const fetchedNotes = async () => {
      try {
        const res = await fetch(`http://localhost:3000/notes/${userID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const response = await res.json();
        console.log("Fetched notes Response", response);
        setNotes(response);
      } catch (error) {
        console.log("Error fetching note: ", error);
      }
    };
    if (userID) {
      fetchedNotes();
    }
  }, [userID]);
  console.log("Fetched Notes", notes);

  return (
    <>
      <div className="w-full h-full bg-white mt-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-medium text-center my-2">Notes</h2>

        <div className="flex justify-between items-center w-full px-4">
          <Input className="w-[300px]" placeholder="Search notes here" />

          <Button>Add Notes</Button>
        </div>
        <div>
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="border-b py-2">
                <h3 className="text-xl font-semibold">{note.title}</h3>
                <p>{note.content}</p>
                <p className="text-gray-500">{note.createTime}</p>
              </div>
            ))
          ) : (
            <div>
              <p>No notes found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Note;
