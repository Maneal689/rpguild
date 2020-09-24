import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./style.module.scss";

interface Props {
  show: boolean;
  close: () => void;
  displayTour: () => void;
}

function HelpTile(props: Props) {
  return (
    <AnimatePresence>
      {props.show && (
        <motion.div
          layoutId="help-tile"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={props.close}
          className={`${styles.helpTile} ${styles.fullscreen}`}
        >
          <div className={styles.container}>
            <button
              className={styles.quit}
              dangerouslySetInnerHTML={{ __html: "&times;" }}
              onClick={props.close}
            />
            <div
              className={styles.content}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Légende</h2>
              <h3>Status</h3>
              <dl>
                <dt>
                  <i className={`fas fa-ban ${styles.disabled}`} />
                </dt>
                <dd>
                  Un autre de vos personnage a <strong>déjà postulé</strong>
                  /fait déjà parti de la quête
                </dd>
                <dt>
                  <i className={`far fa-times-circle ${styles.disabled}`} />
                </dt>
                <dd>
                  Votre candidature n'a <strong>pas</strong> été{" "}
                  <strong>acceptée</strong>
                </dd>
                <dt>
                  <i className={`fas fa-hourglass-half ${styles.disabled}`} />
                </dt>
                <dd>
                  Votre candidature est en <strong>attente</strong> de la
                  réponse du MJ
                </dd>
                <dt>
                  <i className={`far fa-check-circle ${styles.disabled}`} />
                </dt>
                <dd>
                  Votre candidature a été <strong>acceptée</strong> et vous avez{" "}
                  <strong>confirmé</strong> votre participation à cette quête
                </dd>
              </dl>

              <h3>Actions</h3>
              <dl>
                <dt>
                  <i className={`fab fa-telegram-plane ${styles.green}`} />
                </dt>
                <dd>
                  <strong>Envoie</strong> une candidature
                </dd>
                <dt>
                  <i className={`fas fa-ban ${styles.red}`} />
                </dt>
                <dd>
                  <strong>Annule</strong> une candidature
                </dd>
                <dt>
                  <i className={`far fa-check-circle ${styles.green}`} />
                </dt>
                <dd>
                  Votre candidature a été acceptée, vous{" "}
                  <strong>confirmez</strong> votre participation à cette quête
                </dd>
              </dl>
              <button className={styles.displayTour} onClick={() => {
                props.close();
                props.displayTour();
              }}>Démarrer la visite guidée</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default HelpTile;
