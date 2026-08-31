'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './FanariPopup.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function FanariPopup({ isOpen, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className={styles.content}>
          <div className={styles.logo}>
            fanari<span className={styles.logoSub}>labs</span>
          </div>
          
          <h2 className={styles.title}>
            Websites people remember.<br/>
            <span className={styles.titleGray}>AI systems businesses rely on.</span>
          </h2>
          
          <p className={styles.body}>
            We design and build custom websites, AI agents, and automation around real business needs.
          </p>

          <div className={styles.actions}>
            <a href="https://fanarilabs.com" target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              VISIT WEBSITE
            </a>
            <a href="https://wa.me/905379295163" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
              WHATSAPP US
            </a>
          </div>
          
          <div className={styles.contactInfo}>
            <a href="https://fanarilabs.com" target="_blank" rel="noopener noreferrer">fanarilabs.com</a>
            <span>•</span>
            <a href="https://wa.me/905379295163" target="_blank" rel="noopener noreferrer">+90 537 929 51 63</a>
          </div>
        </div>
        
        <div className={styles.grid} aria-hidden="true" />
      </div>
    </div>,
    document.body
  );
}
