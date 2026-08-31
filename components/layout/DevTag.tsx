'use client';

import { useState } from 'react';
import FanariPopup from './FanariPopup';
import styles from './Footer.module.css';

export default function DevTag() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className={styles.devTag}
        aria-label="Contact Developer (Fanari Labs)"
      >
        <span className={styles.devTagLabel}>
          Developed by <span className={styles.devTagBrand}>Fanari Labs</span> &nbsp;&bull;&nbsp; Click to contact
        </span>
        <div className={styles.devTagGlow} aria-hidden="true" />
      </button>
      <FanariPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
