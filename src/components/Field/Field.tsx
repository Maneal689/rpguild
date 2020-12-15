import React, { useState } from "react";
import { useRecoilValue } from "recoil";

import { db } from "../../services/firebase";
import characterState from "../../store/character";
import userState from "../../store/user";

import styles from "./style.module.scss";

interface Props {
  value: any;
  name: string;
  valid?: () => void;
  error?: (err: string) => void;
  type?: string;
  className?: string;
}

function Field(props: Props) {
  const [input, setInput] = useState(props.value);
  const [edit, setEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const character = useRecoilValue(characterState);
  const user = useRecoilValue(userState);

  const valid = function () {
    if (character.id && input !== props.value) {
      setLoading(true);
      db.collection("users")
        .doc(user.uid)
        .collection("characters")
        .doc(character.id)
        .update({ [props.name]: input })
        .then(() => {
          setLoading(false);
          if (props.valid) props.valid();
        })
        .catch((err) => {
          if (props.error) props.error(err.message);
        });
    }
  };

  return (
    <div
      className={`${styles.container} ${props.className}`}
      onClick={() => setEdit(true)}
    >
      {edit ? (
        <>
          <input
            type={props.type || "text"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className={styles.btns}>
            {loading ? (
              <i className="fas fa-spinner fa-spin" />
            ) : (
              <>
                <i className="far fa-check-circle" />
                <i
                  onClick={() => {
                    setInput(props.value);
                    setEdit(false);
                  }}
                  className="far fa-times-circle"
                />
              </>
            )}
          </div>
        </>
      ) : (
        props.value
      )}
    </div>
  );
}

export default Field;
