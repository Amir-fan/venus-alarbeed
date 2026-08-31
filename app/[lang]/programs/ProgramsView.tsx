'use client';

import { useState } from 'react';
import type { Locale, Dict } from '@/lib/i18n';
import WaitlistModal from '@/components/ui/WaitlistModal';
import ProgramsHero from '@/components/programs/ProgramsHero';
import ProgramRegister from '@/components/programs/ProgramRegister';
import ProgramRelationship from '@/components/programs/ProgramRelationship';
import ProgramWaitlist from '@/components/programs/ProgramWaitlist';
import styles from './page.module.css';

interface Props {
  lang: Locale;
  d: Dict;
}

export default function ProgramsView({ lang, d }: Props) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className={styles.page}>
      {/* 1. Hero */}
      <ProgramsHero d={d} />

      {/* 2. Programme Register — the signature component */}
      <ProgramRegister d={d} onWaitlist={() => setWaitlistOpen(true)} />

      {/* 3. One body of thought */}
      <ProgramRelationship d={d} />

      {/* 4. Shared waitlist invitation */}
      <ProgramWaitlist d={d} onWaitlist={() => setWaitlistOpen(true)} />

      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        d={d}
      />
    </div>
  );
}
