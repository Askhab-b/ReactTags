import React, { useState, useEffect } from "react";
import styles from "./app.module.css";

function App() {
  const [tags, setTags] = useState([]);
  const [text, setText] = useState("");

  const [textDirty, setTextDirty] = useState(false)
  const [textError, setTextError] = useState("Поле ввода не может быть пустым");
  const [formValid, setFormValid] = useState(false);

  const handleAddTag = (e) => {
    setTags([...tags, text]);
    e.preventDefault();
    setText("")
  };

  const handleRemove = (tag) => {
    setTags(tags.filter((el, index) => index !== tag));
  };




  const blurHandler = (e) => {
  if (e.target.name === "text") {
    if (!text) {
      setTextDirty(true)
    }
  }
  }


  useEffect(() => {
  if (!text && textError) {
    setFormValid(false)
  } else {
    setFormValid(true)
  }
  }, [text,textError])

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <form onClick={(e) => e.preventDefault()}>
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            name="text"
            type="text"
            placeholder="Type your tag..."
            onBlur={(e) => blurHandler(e)}
            className={textDirty && textError ? styles.error : styles.input}
          />
          <button className={styles.btn} onClick={handleAddTag}>
            Отправить
          </button>

          <div className={styles.tags}>
            {tags.map((item, index) => {
              return (
                <>
                  <div className={styles.tag} key={index}>
                    <p>{item}</p>
                    <div className={styles.btnX}>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleRemove(index)}
                      >
                        x
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
