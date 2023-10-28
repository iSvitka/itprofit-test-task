import React from 'react';
import { Footer } from './components/Footer/Footer';
import { Form } from './components/Form/Form';

import styles from './App.module.scss';
import { createPortal } from 'react-dom';
import { Modal } from './components/Modal/Modal';

export const App = () => {
  const [openModal, setOpenModal] = React.useState(false);

  const buttonOnClickHandler = React.useCallback(() => {
    document.body.style.overflow = 'hidden';
    setOpenModal(true);
  }, [])

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <span className={styles.HeaderSpan}>IT</span>profit
      </header>
      <main className={styles.Main}>
        <Form />
        <button className={styles.MainModalButton} onClick={buttonOnClickHandler}>Modal</button>
      </main>
      <Footer />
      {openModal &&
        createPortal(
          <Modal
            onCloseCallback={() => setOpenModal(false)}
          />, document.body)
      }
    </div>
  );
}

