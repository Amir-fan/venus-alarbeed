'use client';

import { useState } from 'react';
import type { Locale, Dict } from '@/lib/i18n';
import styles from './page.module.css';
import WaitlistModal from '@/components/ui/WaitlistModal';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function ProgramsView({ lang, d }: Props) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.content}>
          <p className={styles.label}>{d.programs.label}</p>
          <h1 className={styles.heading}>{d.programs.heading}</h1>
          <p className={styles.body}>{d.programs.body}</p>
        </div>
      </div>

      <div className={styles.listSection}>
        <div className={styles.list}>
          {d.programs.list.map((prog, i) => (
            <div key={prog.title} className={styles.programCard}>
              <div className={styles.progHeader}>
                <span className={styles.progTag}>{prog.tag}</span>
                <span className={styles.progNumber}>0{i + 1}</span>
              </div>
              <h3 className={styles.progTitle}>{prog.title}</h3>
              <button 
                onClick={() => setWaitlistOpen(true)}
                className={styles.progBtn}
              >
                {d.waitlist.submit} →
              </button>
            </div>
          ))}
        </div>
      </div>

      <WaitlistModal 
        isOpen={waitlistOpen} 
        onClose={() => setWaitlistOpen(false)} 
        d={d} 
      />
    </div>
  );
}
