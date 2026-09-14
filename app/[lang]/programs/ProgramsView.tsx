'use client';

import { useState } from 'react';
import Link from 'next/link';
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

      <section className={styles.featuredCourse} aria-labelledby="featured-course-title">
        <div className={`container ${styles.featuredInner}`}>
          <div className={styles.featuredTopline}>
            <span>{lang === 'ar' ? 'الكورس المميز · التسجيل متاح' : 'Featured course · Now enrolling'}</span>
            <span>12 × 30 MIN · ONLINE · AR + EN</span>
          </div>
          <div className={styles.featuredGrid}>
            <div>
              <p className={styles.featuredNumber}>01 / THE ENTRY POINT</p>
              <h2 id="featured-course-title">
                {lang === 'ar' ? 'شفرة الدبلوماسية الواعية' : 'The Conscious Diplomacy Code'}
              </h2>
              <p className={styles.featuredAltTitle}>
                {lang === 'ar' ? 'THE CONSCIOUS DIPLOMACY CODE' : 'شفرة الدبلوماسية الواعية'}
              </p>
            </div>
            <div className={styles.featuredCopy}>
              <p>
                {lang === 'ar'
                  ? '12 جلسة قصيرة. رحلة واحدة إلى طريقة مختلفة في رؤية الإنسان، الغرفة، القوة والتأثير.'
                  : '12 short sessions. One journey into a different way of seeing the human being, the room, power and influence.'}
              </p>
              <div className={styles.featuredActions}>
                <Link href={`/${lang}/programs/conscious-diplomacy-code`}>
                  {lang === 'ar' ? 'استكشف الكورس' : 'Explore the course'} <span>→</span>
                </Link>
                <Link className={styles.featuredRegister} href={`/${lang}/programs/conscious-diplomacy-code#registration`}>
                  {lang === 'ar' ? 'سجّل الآن' : 'Register now'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
