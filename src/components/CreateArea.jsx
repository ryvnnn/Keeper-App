import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Draggable from "react-draggable";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false); // Used for conditional formatting of title

  const [note, setNote] = useState({
    // initialize note
    title: "",
    content: ""
  });

  // makes sure the typed in text updates
  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  // Sends the current note up one level to the app; that is where it is added to the list of notes
  // After added, the text is reset to blank
  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  // used for conditional formatting
  function expand() {
    setExpanded(!isExpanded);
  }

  // 1. First part: Title is only rendered IF the isExpanded is true. Otherwise stay hidden
  // 2. Zoom tag is used for the plus icon when it loads
  // 3. Fab is used to bring in the plus icon from material-ui
  return (
    <div>
      <Draggable>
        <form className="create-note">
          {isExpanded && (
            <input
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
            />
          )}

          <textarea
            name="content"
            onClick={expand}
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows={isExpanded ? 3 : 1}
          />
          <Zoom in={isExpanded}>
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        </form>
      </Draggable>
    </div>
  );
}

export default CreateArea;
