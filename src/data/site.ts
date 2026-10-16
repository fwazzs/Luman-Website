import type { SiteContent } from '@/types';

// ALL page content. Source: CONTENT.md (approved canvas copy). null = still missing; the UI shows a placeholder.

export const SITE: SiteContent = {
  meta: {
    title: 'Lumen · Group 2 · Design Thinking',
    description:
      "Lumen is a user-centered AI learning platform. This is Group 2's Design Thinking project: problem, team, and every phase so far.",
  },

  hero: {
    headline: ['User-Centered', 'AI Learning Platform'],
    tagline: 'Everyone can learn AI',
    video: { webm: '/media/puzzle-hero.webm', mp4: null, poster: '/media/puzzle-hero-poster.jpg' },
  },

  about: {
    heading: 'About Project',
    problemLabel: 'PROBLEM DOMAIN',
    problem:
      "AI is moving faster than anyone expected, some jobs are already being taken over, and many people don't know where to start learning. We assumed they needed a roadmap. After six interviews, we found they already use AI every day. What they haven't learned yet is how to judge whether its output is correct and safe.",
    povLabel: 'POINT OF VIEW',
    pov: {
      before: 'Students and fresh graduates who fear being replaced by AI need to ',
      highlight: "build the ability to direct and check AI's work",
      after: ', because their fear makes them avoid AI, even though that ability is what protects the junior roles being cut.',
    },
  },

  team: {
    heading: 'Our Team',
    defaultOpen: 1,
    members: [
      // Landscape photo: focus on the face (centre, slightly above middle) so narrow cards still show it.
      { name: 'Alfaira M.', studentId: '5026261221', photo: '/team/alfaira.jpg', focus: '48% 42%', zoom: 1, tint: '#0B3446' },
      { name: 'Anastasia A.', studentId: '5026261173', photo: null, focus: '50% 20%', zoom: 1, tint: '#64113F' },
      { name: 'Ezar H.', studentId: '5026261086', photo: '/team/ezar.jpg', focus: '62% 42%', zoom: 1, tint: '#163F52' },
      { name: 'Muhammad M.', studentId: '5026261098', photo: '/team/muhammad.jpg', focus: '52% 32%', zoom: 1, tint: '#4A0F30' },
      { name: 'Naufal R.', studentId: '5026261197', photo: '/team/naufal-yellow.jpg', focus: '50% 48%', zoom: 1.5, tint: '#0B3446' },
      { name: 'Jessica K.', studentId: '5026261031', photo: null, focus: '50% 20%', zoom: 1, tint: '#64113F' },
    ],
  },

  process: {
    heading: 'Design Thinking Process',
    phases: [
      {
        id: 'empathize',
        number: '01',
        title: 'Empathize · needfinding',
        status: 'DONE',
        visible: true,
        summary:
          'Six interviews: three high school students, one undergraduate, one fresh graduate, and one professional as an extreme user.',
        quote: { text: "I really don't look things up... but once someone shows me, then I want to.", author: 'Bryan' },
        chips: ['DEMITRIA', 'NALA', 'FIKRI', 'BRYAN', 'KAYLA', 'ALVIN'],
        links: [
          { label: 'Transcripts of 6 interviews', href: 'https://claude.ai/artifact/RAde59eGLsmQddq7PjywJ1#57d6b452-09c6.mq589se0499.848', icon: 'document' },
          { label: 'Empathy map', href: 'https://claude.ai/artifact/RXLfgNRFEmnaWt2oJK7Qqd#page-dcb81aee8d83', icon: 'grid', primary: true },
        ],
      },
      {
        id: 'define',
        number: '02',
        title: 'Define · insight, persona & POV',
        status: 'DONE',
        visible: true,
        summary: null,
        statement: {
          before: 'Students and fresh graduates who fear being replaced by AI need to ',
          highlight: "build the ability to direct and check AI's work",
          after: '.',
        },
        points: [
          { label: 'INSIGHT · ', text: 'The career risk is in judging AI output, not in prompting.' },
          { label: 'INSIGHT · ', text: 'Fear of being replaced makes people avoid AI instead of learning it.' },
          { label: 'PERSONA · ', text: 'Dinda, 18, a vocational software-engineering student who builds projects for clients.' },
        ],
        links: [
          { label: 'Persona Dinda', href: null, icon: 'person' },
          { label: 'Written report: POV & HMW', href: 'https://drive.google.com/file/d/1mdllPSRCHJwUyjf6fvvWQnjL-DconcDb/view?usp=sharing', icon: 'download', primary: true },
        ],
      },
      {
        id: 'ideate',
        number: '03',
        title: 'Ideate · from 25 ideas to one site',
        status: 'DONE',
        visible: true,
        summary:
          'The chosen ideas were checked again against four criteria: they build the ability to judge AI output, spread from person to person, turn fear into practice, and can be tested with a cheap prototype.',
        funnel: ['~40 HMW', '~25 ideas', '3 chosen'],
        links: [
          { label: 'Brainstorming Canvas (HMW)', href: 'https://drive.google.com/file/d/1pi4r2-yG54bKU6GkPgobVi1UaJ6qTE3l/view?usp=sharing', icon: 'board' },
          { label: 'Brainstorming Canvas (Solution)', href: 'https://drive.google.com/file/d/1J9oPQAbsVF8YFyFn2YTVaQK4sx-wjt34/view?usp=sharing', icon: 'board', primary: true },
        ],
      },
      {
        id: 'prototype',
        number: '04',
        title: 'Prototype · three parts, one product',
        status: 'DONE',
        visible: true,
        summary: null,
        parts: [
          { name: 'Level quiz', description: 'places your level instead of picking a career for you' },
          { name: 'AI Handbook', description: 'AI terms plus what to check' },
          { name: 'Step-by-step path', description: 'use it first, then understand it, with practice at every level' },
        ],
        links: [
          { label: 'Prototype', href: 'https://drive.google.com/file/d/1N1v5pGaCDgt40lIJjFAEmsnNzK3C4mWE/view?usp=sharing', icon: 'document', primary: true },
        ],
      },
      {
        id: 'test',
        number: '05',
        title: 'Test',
        status: 'IN PROGRESS',
        // Hidden until the team finishes testing (PRD FR2).
        visible: false,
        summary: null,
        links: [],
      },
    ],
  },

  footer: {
    copyright: '© LUMEN · GROUP 2 · DESIGN THINKING',
    credit: 'WEBSITE BY GROUP 2',
  },
};
