'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import portraitImg from '@/public/venus_portrait.png';
import type { Dict } from '@/lib/i18n';
import styles from './VenusBiography.module.css';

interface Props {
  d: Dict;
}

const chapters = [
  {
    num: '01',
    titleKey: 'Diplomatic Background',
    titleAr: 'الخلفية الدبلوماسية',
    body: 'Extensive experience operating within high-stakes international environments, focusing on sovereign relations, protocol, and strategic representation. An understanding of power that comes from presence inside the room — not from textbooks.',
    bodyAr: 'خبرة واسعة في البيئات الدولية عالية المخاطر، مع التركيز على العلاقات السيادية والبروتوكول والتمثيل الاستراتيجي. فهم للسلطة يأتي من الحضور داخل الغرفة، لا من الكتب.',
  },
  {
    num: '02',
    titleKey: 'International Law',
    titleAr: 'القانون الدولي',
    body: 'Specialized expertise in international legal frameworks, arbitration, and the complexities of cross-border jurisprudence. The law became a lens for understanding how societies formalize power — and where formal structures meet human reality.',
    bodyAr: 'خبرة متخصصة في الأطر القانونية الدولية والتحكيم وتعقيدات الفقه العابر للحدود. أصبح القانون عدسة لفهم كيفية إضفاء المجتمعات طابعاً رسمياً على السلطة، وأين تلتقي الهياكل الرسمية بالواقع الإنساني.',
  },
  {
    num: '03',
    titleKey: 'Strategic Thinking',
    titleAr: 'التفكير الاستراتيجي',
    body: 'Fusing legal precision with diplomatic insight to navigate systems, power dynamics, and complex human relationships. Strategy understood not as manipulation, but as the careful reading of what is truly at stake beneath the surface.',
    bodyAr: 'دمج الدقة القانونية مع البصيرة الدبلوماسية للتعامل مع الأنظمة وديناميكيات القوة والعلاقات الإنسانية المعقدة. الاستراتيجية لا تُفهم كتلاعب، بل كقراءة دقيقة لما هو حقاً على المحك تحت السطح.',
  },
  {
    num: '04',
    titleKey: 'Awareness & Influence',
    titleAr: 'الوعي والتأثير',
    body: 'The synthesis of all the above into Conscious Diplomacy — a framework for exercising influence, power and representation without losing the human dimension. Training leaders, diplomats and thinkers to see what they might otherwise miss.',
    bodyAr: 'تجميع كل ما سبق في الدبلوماسية الواعية — إطار لممارسة التأثير والقوة والتمثيل دون فقدان البعد الإنساني. تدريب القادة والدبلوماسيين والمفكرين على رؤية ما قد يفوتهم.',
  },
];

export default function VenusBiography({ d }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isAr = d.hero.nameFirst === 'فينوس';

  useEffect(() => {
    const observers = chapterRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { threshold: 0.5, rootMargin: '-10% 0px -40% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <section className={styles.section} aria-labelledby="bio-heading">
      <div className={styles.sectionHeader}>
        <div className="container">
          <div className="section-label quiet-reveal">
            <div className="dot" />
            <span>{isAr ? 'أسس العمل' : 'THE WORK BEHIND THE QUESTION'}</span>
          </div>
          <h2 id="bio-heading" className={`${styles.sectionHeading} quiet-reveal reveal-delay-1`}>
            {isAr ? 'من أين يأتي التفكير' : 'Where the thinking begins.'}
          </h2>
        </div>
      </div>

      <div className={styles.body}>
        {/* Sticky portrait */}
        <div className={styles.portraitCol} aria-hidden="true">
          <div className={styles.stickyPortrait}>
            <Image
              src={portraitImg}
              alt="Venus Alarbeed"
              fill
              className={styles.portraitImg}
            />
            <div className={styles.portraitOverlay} />
            <div className={styles.activeNum}>{chapters[activeIndex].num}</div>
          </div>
        </div>

        {/* Scrolling chapters */}
        <div className={styles.chaptersCol}>
          {chapters.map((ch, i) => (
            <div
              key={ch.num}
              className={`${styles.chapter} ${activeIndex === i ? styles.chapterActive : ''}`}
              ref={el => { chapterRefs.current[i] = el; }}
            >
              <div className={styles.chapterRule} />
              <div className={styles.chapterInner}>
                <span className={styles.chapterNum}>{ch.num}</span>
                <div className={styles.chapterContent}>
                  <h3 className={styles.chapterTitle}>
                    {isAr ? ch.titleAr : ch.titleKey}
                  </h3>
                  <p className={styles.chapterBody}>
                    {isAr ? ch.bodyAr : ch.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className={styles.chapterRuleEnd} />
        </div>
      </div>
    </section>
  );
}
