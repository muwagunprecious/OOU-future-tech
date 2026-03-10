import React, { useState, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { jsPDF } from 'jspdf';
import { supabase } from './lib/supabase';
import {
    ChevronRight, Github, Twitter, Linkedin, Mail,
    MapPin, Calendar, Users, Cpu, Shield, Globe, Award,
    Zap, Code2, Mic, Network, Lightbulb, Rocket,
    Download, CheckCircle, Ticket, X, Trash2, Store, Menu
} from 'lucide-react';

/* ───────────────────────────────────────────
   GLOBAL STYLES (injected once)
─────────────────────────────────────────── */
const GlobalStyle = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&family=Outfit:wght@400;700;900&display=swap');

    :root {
      --bg: #ffffff;
      --fg: #000000;
      --accent-r: #E63946;
      --accent-gray: #f0f0f0;
      --border: 3px solid #000000;
      --shadow: 4px 4px 0 #000000;
      --shadow-lg: 8px 8px 0 #000000;
    }
    @media(max-width: 480px) {
      :root {
        --border: 2px solid #1a1a1a;
        --shadow: 3px 3px 0 #1a1a1a;
        --shadow-lg: 5px 5px 0 #1a1a1a;
      }
      .container { padding: 0 1rem; }
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior: smooth; }
    body {
      background: var(--bg);
      color: var(--fg);
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }
    h1, h2, h3, h4, .section-h2 {
      font-family: 'Outfit', sans-serif;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.04em;
      color: var(--fg);
    }
    button { cursor: pointer; border: none; font-family: 'Outfit', sans-serif; font-weight: 900; }
    a { text-decoration: none; color: inherit; }
    img { display: block; max-width: 100%; }

    .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    .section { padding: clamp(4rem, 10vw, 7rem) 0; border-bottom: 2px solid #eee; }
    @media(max-width:768px){ .section { padding: 4rem 0; } }

    /* NAV */
    /* NAV – Triple Capsule Layout */
    .nav-wrap {
      position: fixed; top: 1.5rem; left: 0; right: 0;
      z-index: 100;
      display: flex; justify-content: space-between; align-items: center;
      padding: 0 5vw;
    }
    .nav-logo-pill {
      background: #fff;
      border: 2px solid #1a1a1a;
      border-radius: 9999px;
      padding: 0.6rem 1.2rem;
      display: flex; align-items: center; gap: 0.8rem;
      box-shadow: 4px 4px 0 #1a1a1a;
    }
    .nav-menu-pill {
      background: #fff;
      border: 2px solid #1a1a1a;
      border-radius: 9999px;
      padding: 0.6rem 2rem;
      display: flex; align-items: center; gap: 2.5rem;
      box-shadow: 4px 4px 0 #1a1a1a;
    }
    .nav-cta-pill .btn-nav {
      background: var(--accent-r); color: #fff;
      padding: 0.8rem 2rem; border-radius: 9999px;
      font-size: 0.85rem; font-weight: 900;
      text-transform: uppercase; letter-spacing: 0.05em;
      border: 2px solid #000;
      box-shadow: 4px 4px 0 #000;
      transition: all 0.25s;
    }
    .btn-nav:hover { background: #c02d38; transform: scale(1.05); }

    .nav-logo-icon {
      width: 1.8rem; height: 1.8rem; background: #000;
      border-radius: 0.5rem; display: flex; align-items: center; justify-content: center;
    }
    .nav-logo-text { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 0.9rem; color: #000; letter-spacing: -0.02em; text-transform: uppercase; }
    .nav-links { display: flex; gap: 2.5rem; }
    .nav-links a {
      font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 0.8rem;
      color: #000; text-transform: uppercase; letter-spacing: 0.05em; transition: opacity 0.2s;
    }
    .nav-links a:hover { opacity: 0.6; }

    @media(max-width:1024px){
      .nav-menu-pill { display: none; }
    }
    
    .mobile-menu-btn {
      display: none;
      background: #fff;
      border: 2px solid #1a1a1a;
      border-radius: 50%;
      width: 45px;
      height: 45px;
      align-items: center;
      justify-content: center;
      box-shadow: 3px 3px 0 #1a1a1a;
      z-index: 1001;
    }

    @media(max-width: 1024px) {
      .mobile-menu-btn { display: flex; }
    }

    .mobile-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.95);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2.5rem;
      padding: 2rem;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-20px);
    }
    .mobile-overlay.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    .mobile-nav-links {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
    .mobile-nav-links a {
      font-family: 'Outfit', sans-serif;
      font-weight: 900;
      font-size: 2rem;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .mobile-nav-close {
      position: absolute;
      top: 2rem;
      right: 2rem;
      color: #fff;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
      padding: 0.5rem;
    }

    @media(max-width:480px){
      .nav-wrap { padding: 0 4vw; top: 1rem; }
      .nav-logo-text { font-size: 0.8rem; }
      .nav-logo-pill { padding: 0.5rem 0.8rem; gap: 0.5rem; }
      .nav-cta-pill .btn-nav { padding: 0.6rem 1rem; font-size: 0.7rem; }
      .mobile-menu-btn { width: 40px; height: 40px; }
    }

    /* ══════════════════════════════════════════
       HERO – DevFest-style bento grid
       Layout:
         Row 1: [GIANT TEXT | PHOTOS COLUMN]
         Row 2: Info strip (date, loc, CTAs)
         Row 3: Full-width crowd photo + peeking year
    ══════════════════════════════════════════ */
    /* CINEMATIC HERO */
    .hero {
      position: relative;
      height: 100vh;
      width: 100%;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #fff;
      overflow: hidden;
    }
    .hero-content {
      max-width: 900px;
      padding: 0 1.5rem;
      z-index: 2;
    }
    .hero-label {
      font-family: 'Outfit', sans-serif;
      font-weight: 900;
      color: var(--accent-r);
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
    }
    .hero-h1 {
      font-size: clamp(2.2rem, 8vw, 6.5rem);
      line-height: 0.95;
      margin-bottom: 2rem;
      color: #fff;
    }
    .hero-p {
      font-size: 1.2rem;
      color: #e4e4e7;
      margin-bottom: 3rem;
      line-height: 1.6;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }
    .hero-btns {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
    .cursor { color: #fff; animation: blink 1s step-end infinite; }
    @keyframes blink { from, to { opacity: 0 } 50% { opacity: 1 } }

    .hero-yr {
      position: absolute;
      bottom: -4rem;
      right: -2rem;
      font-size: 25vw;
      font-weight: 950;
      color: rgba(255,255,255,0.03);
      line-height: 1;
      pointer-events: none;
      z-index: 1;
    }

    /* Shared buttons (also used outside hero) */
    .btn-primary {
      background: var(--accent-r); color: #fff; padding: 1rem 2.2rem;
      border-radius: 9999px; font-size: 0.95rem;
      display: flex; align-items: center; gap: 0.5rem;
      font-family: 'Outfit', sans-serif; font-weight: 900;
      border: 2px solid #000;
      box-shadow: 4px 4px 0 #000;
      transition: all 0.25s;
    }
    .btn-primary:hover { background: #c02d38; transform: translate(-2px, -2px); box-shadow: 6px 6px 0 #000; }
    .btn-outline {
      background: #fff; color: #000;
      border: 2px solid #000; padding: 1rem 2.2rem;
      border-radius: 9999px; font-size: 0.95rem;
      font-weight: 900;
      box-shadow: 4px 4px 0 #000;
      transition: all 0.25s;
    }
    .btn-outline:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 #000; }

    /* PARTNERS STRIP */
    .partners-strip { padding: 3rem 0; border-top: 2px solid #eee; border-bottom: 2px solid #eee; overflow: hidden; background: #fff; }
    .partners-label { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em; color: #1a1a1a; margin-bottom: 2rem; text-align: center; }
    .partners-track { display: flex; align-items: center; justify-content: center; gap: 3.5rem; flex-wrap: wrap; opacity: 1; }
    @media(max-width: 600px){ .partners-track { gap: 1.5rem; } }
    .partner-logo { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 1.1rem; color: #1a1a1a; letter-spacing: -0.02em; display: flex; align-items: center; gap: 0.5rem; }
    .partners-sep { width: 5px; height: 5px; background: #facc15; border-radius: 50%; flex-shrink: 0; }

    /* VISION – Wrap in a card */
    .vision { background: var(--bg); }
    .vision-card {
      background: #fff;
      border: var(--border);
      box-shadow: var(--shadow-lg);
      border-radius: 2.5rem;
      padding: 4rem;
    }
    @media(max-width: 768px){ .vision-card { padding: 2rem; } }
    .vision-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
    @media(max-width: 768px){ .vision-grid { grid-template-columns: 1fr; gap: 2.5rem; } }
    .section-label { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--accent-r); margin-bottom: 1.2rem; }
    .section-h2 { font-size: clamp(2rem, 5vw, 5rem); margin-bottom: 1.5rem; line-height: 1.1; }
    .body-text { color: #52525b; font-size: clamp(1rem, 2vw, 1.1rem); line-height: 1.75; margin-bottom: 2rem; }
    .feature-list { display: flex; flex-direction: column; gap: 1.5rem; }
    .feature-item { display: flex; gap: 1.2rem; align-items: flex-start; }
    .feature-icon { width: 3rem; height: 3rem; border-radius: 0.875rem; background: #f3f4f6; border: 2px solid #1a1a1a; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .feature-title { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 1.05rem; margin-bottom: 0.25rem; color: #000; }
    .feature-desc { color: #71717a; font-size: 0.9rem; }
    .vision-visual { position: relative; }
    .vision-img-wrap { border-radius: 2.5rem; border: var(--border); overflow: hidden; aspect-ratio: 1/1; background: linear-gradient(135deg, rgba(250,204,21,0.1), rgba(59,130,246,0.1)); }
    @media(max-width: 480px){ .vision-img-wrap { aspect-ratio: 1.6/1; border-radius: 1.5rem; } }
    .vision-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); }
    .vision-badge {
      position: absolute; bottom: -1rem; right: -1rem;
      background: #facc15; color: #000; padding: 1.5rem 2rem; border-radius: 1.5rem;
      border: var(--border); box-shadow: var(--shadow);
      font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 1.3rem;
      font-style: italic; letter-spacing: -0.04em;
    }
    @media(max-width:768px){ .vision-badge { display: none; } }

    /* TICKETS */
    .tickets { background: var(--bg); }
    .section-header { text-align: center; margin-bottom: 5rem; }
    .section-header p { color: #52525b; max-width: 38rem; margin: 1rem auto 0; font-size: 1.1rem; line-height: 1.6; }
    .tickets-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; }
    @media(max-width:960px){ .tickets-grid { grid-template-columns: 1fr; } }

    .ticket-card-v2 {
      background: #fff; border: 3px solid #000; border-radius: 2.5rem;
      padding: 3rem; display: flex; flex-direction: column; position: relative;
      box-shadow: 8px 8px 0 #000; transition: all 0.3s;
    }
    @media(max-width: 640px) {
      .ticket-card-v2 { padding: 1.25rem 1rem; border-radius: 1.5rem; }
    }
    .ticket-card-v2:hover { transform: translate(-4px, -4px); box-shadow: 12px 12px 0 #000; }
    
    .ticket-card-v2.featured { background: #000; color: #fff; border-color: #000; }
    .ticket-card-v2.featured .ticket-title { color: #fff; }
    .ticket-card-v2.featured .ticket-subtitle { color: rgba(255,255,255,0.7); }
    .ticket-card-v2.featured .btn-ticket { background: var(--accent-r); color: #fff; border-color: #000; box-shadow: 4px 4px 0 rgba(255,255,255,0.2); }
    .ticket-card-v2.featured .ticket-divider { border-color: rgba(255,255,255,0.2); }
    .ticket-card-v2.featured .ticket-graphic { background: #fff; box-shadow: 4px 4px 0 var(--accent-r); }

    .pro-featured-label {
      position: absolute; top: -1.2rem; left: 50%; transform: translateX(-50%);
      background: var(--accent-r); color: #fff; padding: 0.5rem 1.5rem;
      border-radius: 9999px; font-family: 'Outfit', sans-serif; font-weight: 900;
      font-size: 0.75rem; border: 3px solid #000; white-space: nowrap;
      box-shadow: 4px 4px 0 #000; z-index: 10;
    }

    .ticket-card {
      padding: 2.5rem 2.5rem 3rem;
      position: relative;
      display: flex; flex-direction: column;
      border: var(--border);
      box-shadow: var(--shadow);
      border-radius: 2rem;
      transition: transform 0.3s;
    }
    .ticket-card:hover { transform: translate(-4px, -4px); box-shadow: 8px 8px 0 #000; }
    @media(max-width:480px){
      .ticket-card { padding: 2rem 1.5rem 2.5rem; }
    }
    .ticket-red { background: var(--accent-r); color: #fff; }
    .ticket-white { background: #fff; color: #000; border: var(--border); }
    .ticket-white .ticket-title { color: #000; }
    .ticket-white .ticket-subtitle { color: #52525b; }
    .ticket-white .ticket-divider { border-top: 1.5px solid #eee; }
    .ticket-white .ticket-features li { color: #000; }
    .ticket-white .ticket-arrow { color: var(--accent-r); }
    .ticket-white .btn-ticket { background: #000; color: #fff; }
    .ticket-white .btn-ticket:hover { transform: translate(-3px, -3px); box-shadow: 7px 7px 0 var(--accent-r); }

    /* Physical ticket graphic at top */
    .ticket-graphic {
      background: #fff;
      border-radius: 1rem;
      border: 2px solid #1a1a1a;
      padding: 1.2rem 1.5rem 1.2rem;
      margin-bottom: 2rem;
      position: relative;
      overflow: visible;
      box-shadow: 3px 3px 0 #1a1a1a;
    }
    .ticket-graphic::before, .ticket-graphic::after {
      content: '';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 18px; height: 18px;
      background: #000;
      border-radius: 50%;
    }
    .ticket-graphic::before { left: -10px; }
    .ticket-graphic::after { right: -10px; }
    .ticket-graphic-inner {
      display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    }
    @media(max-width:400px){
      .ticket-graphic { padding: 1rem 0.5rem; }
      .ticket-graphic-inner { gap: 0.5rem; }
      .ticket-conference-name { display: none; }
      .ticket-logo-area { gap: 0.2rem; }
      .ticket-badge-wrap { padding-left: 0.4rem; }
      .ticket-barcode { padding-left: 0.4rem; }
    }
    .ticket-logo-area { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
    .ticket-logo-dots {
      display: flex; gap: 2px;
    }
    .ticket-dot { width: 10px; height: 10px; border-radius: 50%; }
    .ticket-conference-name { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; color: #000; line-height: 1.2; }
    .ticket-badge-wrap { flex: 1; text-align: center; border-left: 1px dashed rgba(0,0,0,0.2); padding-left: 1rem; }
    .ticket-badge-label {
      font-family: 'Outfit', sans-serif; font-weight: 900;
      font-size: clamp(0.7rem, 2.5vw, 1.1rem); text-transform: uppercase;
      color: #000; letter-spacing: -0.02em;
      line-height: 1;
      display: inline-block;
      padding: 0.3rem 0.8rem;
    }
    .ticket-badge-std { background: #000; color: #fff; }
    .ticket-badge-pro { background: var(--accent-r); color: #fff; }
    .ticket-badge-date { font-size: 0.55rem; color: #52525b; margin-top: 0.4rem; font-family: 'Inter', sans-serif; font-weight: 700; }
    .ticket-barcode { display: flex; align-items: flex-end; gap: 2px; flex-shrink: 0; padding-left: 1rem; border-left: 1px dashed rgba(0,0,0,0.2); }
    .ticket-barcode span {
      display: block; width: 3px; background: #1a1a1a; border-radius: 1px;
    }

    /* Card body */
    .ticket-title {
      font-family: 'Outfit', sans-serif; font-weight: 900;
      font-size: 1.15rem; text-transform: uppercase; letter-spacing: -0.01em;
      margin-bottom: 0.5rem;
    }
    .ticket-subtitle { font-size: 0.88rem; color: rgba(255,255,255,0.7); margin-bottom: 1.75rem; line-height: 1.5; font-weight: 500; }
    .ticket-divider { border: none; border-top: 1.5px solid rgba(255,255,255,0.2); margin: 0 0 1.5rem; }
    .ticket-features {
      list-style: none; display: flex; flex-direction: column; gap: 1.1rem;
      margin-bottom: 2.5rem; flex: 1;
    }
    .ticket-features li {
      display: flex; align-items: center; gap: 0.8rem;
      font-size: 0.95rem; font-weight: 700;
    }
    .ticket-arrow {
      display: flex; align-items: center; gap: 0; flex-shrink: 0;
      font-size: 1.2rem;
    }
    .ticket-arrow::before { content: '—'; }
    .ticket-arrow::after  { content: '›'; }
    .btn-ticket {
      width: 100%;
      background: #fff;
      color: #000;
      padding: 1.25rem 2rem;
      border-radius: 9999px;
      font-size: 1rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      border: 3px solid #000;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 4px 4px 0 #000;
    }
    .btn-ticket:hover { transform: translate(-3px, -3px); box-shadow: 7px 7px 0 #000; }

    /* SPEAKERS */
    .speakers { background: var(--bg); }
    .speakers-top { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3.5rem; gap: 2rem; flex-wrap: wrap; }
    @media(max-width: 640px){ .speakers-top { flex-direction: column; align-items: center; text-align: center; margin-bottom: 2.5rem; } }
    .speakers-top-right { border-left: 4px solid var(--accent-r); padding-left: 1rem; color: #000; font-weight: 900; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; max-width: 150px; line-height: 1.5; }
    @media(max-width: 640px){ .speakers-top-right { border-left: none; border-top: 4px solid var(--accent-r); padding: 1rem 0 0; max-width: 100%; } }
    .speakers-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
    @media(max-width: 1024px){ .speakers-grid { grid-template-columns: repeat(2,1fr); } }
    @media(max-width: 640px){ .speakers-grid { grid-template-columns: 1fr; } }
    .speaker-card { background: #fff; border-radius: 1.75rem; border: var(--border); box-shadow: var(--shadow); overflow: hidden; transition: all 0.3s; }
    .speaker-card:hover { transform: translate(-4px, -4px); box-shadow: 8px 8px 0 #1a1a1a; }
    .speaker-img-wrap { aspect-ratio: 4/5; overflow: hidden; position: relative; border-bottom: var(--border); }
    .speaker-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); transition: filter 0.5s; }
    .speaker-card:hover .speaker-img { filter: grayscale(0%); }
    .speaker-info { padding: 1.5rem; }
    .speaker-name { font-size: 1.2rem; margin-bottom: 0.4rem; color: #000; font-weight: 900; }
    .speaker-role { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 0.7rem; color: #fff; background: var(--accent-r); display: inline-block; padding: 0.2rem 0.5rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.75rem; border: 1.5px solid #000; }
    .speaker-expertise { display: flex; align-items: center; gap: 0.5rem; color: #52525b; font-size: 0.82rem; font-weight: 700; }
    .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent-r); flex-shrink: 0; }
    .speaker-img-bg-1 { background: rgba(59,130,246,0.1); }
    .speaker-img-bg-2 { background: rgba(250,204,21,0.1); }
    .speaker-img-bg-3 { background: #1a1a1a; }
    .speaker-img-bg-4 { background: #1a1a1a; }

    /* SCHEDULE */
    .schedule { background: var(--bg); }
    .schedule-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    @media(max-width:768px){ .schedule-grid { grid-template-columns: 1fr; } }
    .schedule-card {
      background: #fff;
      border: var(--border);
      box-shadow: var(--shadow);
      border-radius: 1.75rem;
      padding: 2rem;
      transition: all 0.3s;
    }
    @media(max-width: 480px) { .schedule-card { padding: 1.5rem; border-radius: 1.25rem; } }
    .schedule-card:hover { transform: translate(-4px, -4px); box-shadow: 8px 8px 0 #1a1a1a; }
    .schedule-time { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #fff; background: var(--accent-r); display: inline-block; padding: 0.2rem 0.6rem; border: 1.5px solid #000; margin-bottom: 0.75rem; }
    .schedule-title { font-size: 1.25rem; margin-bottom: 0.5rem; color: #000; font-weight: 900; }
    .schedule-desc { color: #52525b; font-size: 0.88rem; margin-bottom: 1.2rem; }
    .schedule-tag { display: inline-flex; align-items: center; gap: 0.4rem; background: var(--accent-gray); border: 1.5px solid #000; padding: 0.3rem 0.75rem; border-radius: 9999px; font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: #000; }

    /* EXPERIENCE */
    .experience { background: var(--bg); }
    .experience-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
    @media(max-width:1024px){ .experience-grid { grid-template-columns: 1fr 1fr; } }
    @media(max-width:640px){ .experience-grid { grid-template-columns: 1fr; } }
    .exp-card {
      background: #fff;
      border: var(--border);
      box-shadow: var(--shadow);
      border-radius: 2rem;
      padding: 2.5rem;
      transition: all 0.3s;
    }
    @media(max-width: 480px) { .exp-card { padding: 1.5rem; border-radius: 1.5rem; } }
    .exp-card:nth-child(even) { background: var(--accent-gray); }
    .exp-card:nth-child(3n) { background: #fff; }
    .exp-card:hover { transform: translate(-4px, -4px); box-shadow: 8px 8px 0 #000; }
    .exp-icon { width: 4rem; height: 4rem; background: #fff; border: 2.5px solid #000; border-radius: 1.2rem; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem; box-shadow: 4px 4px 0 #000; }
    .exp-title { font-size: 1.3rem; margin-bottom: 0.75rem; color: #000; font-weight: 900; }
    .exp-desc { color: #1a1a1a; font-size: 0.9rem; line-height: 1.7; font-weight: 500; }

    /* FAQ */
    .faq { background: var(--bg); }
    .faq-list { display: flex; flex-direction: column; gap: 1.5rem; max-width: 800px; margin: 0 auto; }
    .faq-item { background: #fff; border: var(--border); border-radius: 1.5rem; overflow: hidden; box-shadow: var(--shadow); }
    .faq-btn { width: 100%; padding: 1.75rem 2rem; display: flex; justify-content: space-between; align-items: center; background: transparent; color: #000; text-align: left; transition: background 0.2s; font-family: 'Outfit', sans-serif; font-weight: 900; }
    .faq-btn:hover { background: #f3f4f6; }
    .faq-q { font-size: 1.05rem; text-transform: uppercase; }
    .faq-chevron { transition: transform 0.3s; color: #000; flex-shrink: 0; }
    .faq-chevron.open { transform: rotate(90deg); }
    .faq-answer { padding: 0 2rem 1.75rem; color: #52525b; font-size: 0.95rem; line-height: 1.75; font-weight: 500; border-top: 2px dashed #eee; padding-top: 1rem; }

    /* TEAM */
    .team { background: var(--bg); }
    .team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
    @media(max-width: 1024px){ .team-grid { grid-template-columns: repeat(2, 1fr); } }
    @media(max-width: 480px){ .team-grid { grid-template-columns: 1fr; } }
    .team-member { text-align: center; }
    .team-avatar {
      aspect-ratio: 1/1; background: #fff;
      border-radius: 50%; margin: 0 auto 1.5rem; width: 140px;
      border: var(--border); display: flex; align-items: center; justify-content: center;
      box-shadow: var(--shadow); transition: all 0.3s;
    }
    .team-member:hover .team-avatar { transform: scale(1.1); box-shadow: 8px 8px 0 var(--accent-r); }
    .team-name { font-size: 1.05rem; margin-bottom: 0.3rem; color: #000; font-weight: 900; }
    .team-role { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: #fff; background: #000; display: inline-block; padding: 0.1rem 0.6rem; border: 1.5px solid #000; }

    /* CTA BANNER */
    .cta-banner { background: var(--accent-r); color: #fff; padding: 7rem 0; text-align: center; border-top: var(--border); border-bottom: var(--border); }
    @media(max-width: 640px){ .cta-banner { padding: 4.5rem 0; } }
    .cta-h2 { font-size: clamp(2.5rem, 8vw, 7rem); margin-bottom: 3rem; letter-spacing: -0.04em; color: #fff; line-height: 1; }
    .cta-btns { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
    @media(max-width: 480px){ .cta-btns { flex-direction: column; padding: 0 2rem; } }
    .btn-cta-dark {
      background: #000; color: #fff; padding: 1.3rem 3rem;
      border-radius: 1.5rem; font-size: 1.2rem; font-weight: 900;
      border: var(--border); box-shadow: 6px 6px 0 rgba(0,0,0,0.2);
      transition: all 0.2s;
    }
    .btn-cta-dark:hover { transform: translate(-4px, -4px); box-shadow: 10px 10px 0 rgba(0,0,0,0.1); }
    .btn-cta-outline {
      background: #fff; color: #000;
      border: var(--border); padding: 1.3rem 3rem;
      border-radius: 1.5rem; font-size: 1.2rem; font-weight: 900;
      box-shadow: 6px 6px 0 #1a1a1a; transition: all 0.2s;
    }
    .btn-cta-outline:hover { transform: translate(-4px, -4px); box-shadow: 10px 10px 0 #1a1a1a; }

    /* FOOTER */
    .footer { background: #fff; border-top: var(--border); padding: 5rem 0 2.5rem; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 4rem; margin-bottom: 4rem; }
    @media(max-width:768px){ .footer-grid { grid-template-columns: 1fr; gap: 2rem; } }
    .footer-brand-icon { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
    .footer-brand-name { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 1.5rem; letter-spacing: -0.04em; text-transform: uppercase; color: #000; }
    .footer-desc { color: #52525b; font-size: 0.9rem; line-height: 1.75; max-width: 340px; font-weight: 500; }
    .footer-heading { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; color: #000; margin-bottom: 1.5rem; border-bottom: 2px solid var(--accent-r); display: inline-block; padding-bottom: 0.2rem; }
    .footer-contact-item { display: flex; align-items: center; gap: 0.6rem; color: #1a1a1a; font-size: 0.88rem; margin-bottom: 0.75rem; font-weight: 700; }
    .footer-social { display: flex; gap: 1rem; }
    .social-icon { color: #000; transition: transform 0.2s; border: 2px solid #000; border-radius: 50%; padding: 0.5rem; box-sizing: content-box; }
    .social-icon:hover { transform: scale(1.1) rotate(5deg); background: var(--accent-r); color: #fff; }
    .footer-bottom { border-top: 2px dashed #eee; padding-top: 1.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
    @media(max-width: 640px){ .footer-bottom { flex-direction: column; text-align: center; } }
    .footer-copy { color: #52525b; font-size: 0.75rem; font-family: 'Outfit', sans-serif; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
    .footer-links { display: flex; gap: 2rem; }
    @media(max-width: 480px){ .footer-links { gap: 1rem; flex-direction: column; } }
    .footer-links span { color: #000; font-size: 0.75rem; font-family: 'Outfit', sans-serif; font-weight: 900; text-transform: uppercase; letter-spacing: 0.06em; cursor: pointer; }

    /* REGISTRATION FORM */
    .reg-section { background: #fff; padding: 8rem 0; border-top: var(--border); }
    .reg-container { max-width: 600px; margin: 0 auto; }
    .reg-card { background: #fff; border: var(--border); box-shadow: var(--shadow-lg); border-radius: 2.5rem; padding: 3.5rem; }
    @media(max-width: 640px){ .reg-card { padding: 2rem; border-radius: 1.5rem; } }
    
    .form-group { margin-bottom: 2rem; }
    .form-label { display: block; font-family: 'Outfit', sans-serif; font-weight: 900; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em; margin-bottom: 0.75rem; color: #000; }
    .form-input { 
      width: 100%; padding: 1.2rem 1.5rem; border: 3px solid #000; border-radius: 1rem; 
      font-family: 'Inter', sans-serif; font-weight: 600; font-size: 1rem; transition: all 0.2s;
    }
    .form-input:focus { outline: none; border-color: var(--accent-r); box-shadow: 4px 4px 0 var(--accent-r); transform: translate(-2px, -2px); }
    .form-select { 
      width: 100%; padding: 1.2rem 1.5rem; border: 3px solid #000; border-radius: 1rem; 
      font-family: 'Outfit', sans-serif; font-weight: 700; text-transform: uppercase; appearance: none;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 1.5rem center/1.2rem;
    }

    /* DYNAMIC TICKET - LIGHT THEME REDESIGN */
    .dynamic-ticket {
      position: relative; background: #fff; border: 4px solid #000; border-radius: 2rem; 
      padding: 0; overflow: hidden; box-shadow: 20px 20px 0 rgba(0,0,0,0.05);
      margin-top: 3rem; animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      width: 100%; max-width: 500px; margin-left: auto; margin-right: auto;
      color: #000;
    }
    .dt-header { 
      background: #f8f9fa; padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; 
      border-bottom: 2px solid #000;
    }
    .dt-logo-group { display: flex; align-items: center; gap: 0.75rem; }
    .dt-logo-square { background: var(--fg); padding: 0.5rem; border-radius: 0.6rem; display: flex; align-items: center; justify-content: center; }
    .dt-header-logo { font-family: 'Outfit', sans-serif; font-weight: 900; text-transform: uppercase; font-size: 1rem; letter-spacing: 0.05em; color: #000; }
    .dt-header-year { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 1.2rem; color: #ccc; }
    
    .dt-body { padding: 3rem 2rem; background: #fff; position: relative; }
    .dt-main-info { margin-bottom: 3rem; }
    .dt-type-badge { 
      background: var(--accent-r); color: #fff; padding: 0.4rem 1.2rem; border-radius: 9999px; 
      font-family: 'Outfit', sans-serif; font-weight: 900; text-transform: uppercase; font-size: 0.7rem; 
      border: 2px solid #000; display: inline-block; margin-bottom: 1rem;
      letter-spacing: 0.1em;
    }
    .dt-user-name { 
      font-family: 'Outfit', sans-serif; 
      font-weight: 900; 
      font-size: clamp(1.8rem, 6vw, 3rem); 
      line-height: 1; 
      text-transform: uppercase; 
      margin-bottom: 0.75rem; 
      letter-spacing: -0.02em; 
      color: #000; 
    }
    .dt-user-email { color: #52525b; font-weight: 600; font-size: 0.9rem; word-break: break-all; }
    
    .dt-event-details { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 1.5rem; 
      border-top: 1px dashed #ccc; 
      padding-top: 2rem; 
    }
    @media(max-width: 400px) {
      .dt-event-details { grid-template-columns: 1fr; gap: 1rem; }
      .dt-detail:last-child { grid-column: span 1; }
      .dt-body { padding: 2rem 1.5rem; }
    }
    .dt-detail-label { font-size: 0.65rem; text-transform: uppercase; font-weight: 900; color: #a1a1aa; letter-spacing: 0.1em; display: flex; align-items: center; gap: 0.4rem; }
    .dt-detail-val { font-family: 'Outfit', sans-serif; font-weight: 900; text-transform: uppercase; font-size: 0.95rem; color: #000; }
    
    .dt-footer { border-top: 2px dashed #000; padding: 1.5rem 2rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; background: #fff; }
    .dt-barcode { display: flex; gap: 3px; align-items: stretch; height: 50px; width: 100%; justify-content: center; }
    .dt-bar { background: #000; border-radius: 1px; }
    .dt-footer-text { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 0.65rem; color: #71717a; letter-spacing: 0.2em; text-transform: uppercase; }
    
    .dt-cutout { position: absolute; width: 40px; height: 40px; background: #fff; border: 4px solid #000; border-radius: 50%; z-index: 10; top: 50%; transform: translateY(-50%); }
    .dt-cutout-l { left: -22px; }
    .dt-cutout-r { right: -22px; }

    .btn-download { 
        margin-top: 2rem; width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.8rem;
        background: #000; color: #fff; padding: 1.2rem; border-radius: 1rem; border: 3px solid #000;
        font-family: 'Outfit', sans-serif; font-weight: 900; text-transform: uppercase; transition: all 0.2s;
        box-shadow: 6px 6px 0 var(--accent-r);
    }
    .btn-download:hover { transform: translate(-4px, -4px); box-shadow: 10px 10px 0 var(--accent-r); }

    /* MODAL STYLES */
    .modal-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.85); 
      backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      z-index: 9999; padding: 1.5rem;
      animation: fadeIn 0.3s ease-out;
    }
    .modal-content {
      background: #fff; border: 4px solid #000; border-radius: 2rem;
      width: 100%; max-width: 650px; position: relative;
      max-height: 90vh; overflow-y: auto;
      box-shadow: 12px 12px 0 #000;
      animation: modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .modal-close {
      position: absolute; top: 1.5rem; right: 1.5rem;
      background: #000; color: #fff; border: none; border-radius: 50%;
      width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
      cursor: pointer; z-index: 10; transition: transform 0.2s;
    }
    .modal-close:hover { transform: rotate(90deg); background: var(--accent-r); }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes modalSlideUp { from { opacity: 0; transform: translateY(50px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }

      /* VOLUNTEER SECTION */
    .vol-section { background: #fdfcfb; padding: clamp(4rem, 10vw, 7rem) 0; border-top: var(--border); }
    .vol-container { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1fr 400px; gap: 4rem; align-items: start; }
    @media(max-width: 960px) { .vol-container { grid-template-columns: 1fr; gap: 3rem; } }
    
    .vol-form-card { background: #fff; border: var(--border); border-radius: 2rem; padding: 3rem; box-shadow: var(--shadow); }
    @media(max-width: 480px) { .vol-form-card { padding: 1.5rem; } }

    .id-card-preview-wrap { position: sticky; top: 100px; display: flex; flex-direction: column; align-items: center; gap: 2rem; }
    
    /* THE ID CARD DESIGN */
    .id-card-canonical {
      width: 320px; height: 500px; background: #fff; border: 4px solid #000; border-radius: 1.5rem;
      position: relative; overflow: hidden; display: flex; flex-direction: column;
      box-shadow: 15px 15px 0 rgba(0,0,0,0.1); font-family: 'Inter', sans-serif;
    }
    .id-card-header { 
      background: #000; color: #fff; padding: 1.5rem; text-align: center; border-bottom: 4px solid #000;
      display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    }
    .id-card-logo-text { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; }
    
    .id-card-photo-area { 
      flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem;
      background: radial-gradient(circle at center, #f8f8f8 0%, #fff 100%);
      position: relative;
    }
    .id-card-photo-frame { 
      width: 180px; height: 180px; border: 4px solid #000; border-radius: 1rem; overflow: hidden;
      background: #f0f0f0; box-shadow: 8px 8px 0 rgba(0,0,0,0.05); transform: rotate(-2deg);
    }
    .id-card-photo { width: 100%; height: 100%; object-fit: cover; }
    
    .id-card-info { 
      padding: 1.5rem; text-align: center; background: #fff; border-top: 4px dashed #000;
      display: flex; flex-direction: column; gap: 0.5rem; position: relative;
    }
    .id-card-name { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 1.5rem; text-transform: uppercase; color: #000; line-height: 1.1; }
    .id-card-sector { 
      background: var(--accent-r); color: #fff; padding: 0.4rem 1rem; border-radius: 0.5rem;
      font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 0.75rem; text-transform: uppercase;
      border: 2px solid #000; display: inline-block; width: fit-content; margin: 0 auto;
    }
    .id-card-footer { 
      background: #f0f0f0; padding: 0.8rem; text-align: center; border-top: 2px solid #000;
      font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.2em;
    }
    
    .id-card-watermark {
      position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg);
      font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 5rem; color: rgba(0,0,0,0.03);
      white-space: nowrap; pointer-events: none; z-index: 0;
    }

    /* ANIMATIONS */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `}</style>
)

/* ───────────────────────────────────────────
   NAVBAR
─────────────────────────────────────────── */
const Navbar = ({ onRegister, isMenuOpen, setIsMenuOpen, onViewChange, currentView }) => (
    <>
        <div className="nav-wrap">
            <div className="nav-logo-pill" onClick={() => onViewChange('site')} style={{ cursor: 'pointer' }}>
                <div className="nav-logo-icon">
                    <div style={{ display: 'flex', gap: '2px' }}>
                        <div style={{ width: '8px', height: '8px', background: 'var(--accent-r)', borderRadius: '1px' }} />
                        <div style={{ width: '8px', height: '8px', background: '#000', borderRadius: '1px' }} />
                    </div>
                </div>
                <span className="nav-logo-text">OOU Future Tech</span>
            </div>

            <div className="nav-menu-pill">
                <nav className="nav-links">
                    {currentView === 'site' ? (
                        ['Schedule', 'Speakers', 'Volunteers', 'FAQs', 'Team'].map(l => (
                            l === 'Volunteers' ? (
                                <a key={l} href="#" onClick={(e) => { e.preventDefault(); onViewChange('volunteers'); }}>{l}</a>
                            ) : (
                                <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
                            )
                        ))
                    ) : (
                        <a href="#" onClick={(e) => { e.preventDefault(); onViewChange('site'); }}>Home</a>
                    )}
                </nav>
            </div>

            <div className="nav-cta-pill" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button className="btn-nav" onClick={() => onRegister()}>Register Now</button>
                <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(true)}>
                    <Menu size={20} />
                </button>
            </div>
        </div>

        <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}>
            <button className="mobile-nav-close" onClick={() => setIsMenuOpen(false)}>
                <X size={28} />
            </button>
            <nav className="mobile-nav-links">
                {currentView === 'site' ? (
                    ['Schedule', 'Speakers', 'Volunteers', 'FAQs', 'Team'].map(l => (
                        l === 'Volunteers' ? (
                            <a key={l} href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onViewChange('volunteers'); }}>{l}</a>
                        ) : (
                            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}>{l}</a>
                        )
                    ))
                ) : (
                    <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onViewChange('site'); }}>Home</a>
                )}
            </nav>
            <button
                className="btn-primary"
                style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}
                onClick={() => {
                    setIsMenuOpen(false);
                    onRegister();
                }}
            >
                Register Now
            </button>
        </div>
    </>
);

/* ───────────────────────────────────────────
   HERO
─────────────────────────────────────────── */
const Hero = ({ onRegister }) => {
    const [text, setText] = useState('');
    const fullText = "OOU FUTURE TECH CONFERENCE";

    useEffect(() => {
        let i = 0;
        const speed = 100;
        const timer = setInterval(() => {
            setText(fullText.slice(0, i + 1));
            i++;
            if (i >= fullText.length) clearInterval(timer);
        }, speed);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="hero">
            <div className="hero-content">
                <div className="container">
                    <p className="hero-label">March 27, 2026 • Ago-Iwoye</p>
                    <h1 className="hero-h1">
                        {text}<span className="cursor">|</span>
                    </h1>
                    <p className="hero-p">
                        Empowering the next generation of African innovators. Join us for a day of high-impact workshops, global mentorship, and futuristic tech showcases at OOU.
                    </p>
                    <div className="hero-btns">
                        <button className="btn-primary" onClick={() => onRegister()}>
                            Register Now <ChevronRight size={20} />
                        </button>
                        <button className="btn-outline" onClick={() => onRegister('Pro')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Store size={20} /> Book a Stand
                        </button>
                    </div>
                </div>
            </div>
            <div className="hero-yr">2026</div>
        </section>
    );
};

/* ───────────────────────────────────────────
   PARTNERS STRIP
─────────────────────────────────────────── */
const Partners = ({ dynamicPartners }) => {
    const defaultPartners = [
        { name: 'OOUtech Community', icon: null },
        { name: 'OOU Web 3', icon: null },
        { name: 'OOU Official', icon: <Award size={18} color="#facc15" /> },
        { name: 'NACOS', icon: null },
        { name: 'GDSC OOU', icon: null },
        { name: 'OOU Innovators', icon: null },
    ];

    const hasDynamic = dynamicPartners && dynamicPartners.length > 0;

    return (
        <section id="partners" className="partners-strip">
            <div className="container">
                <p className="partners-label">{hasDynamic ? 'Our Community Partners' : 'Our Partners & Collaborators'}</p>
                <div className="partners-track" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '3rem' }}>
                    {hasDynamic ? (
                        dynamicPartners.map((p, i) => (
                            <div key={i} className="partner-logo-item" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div style={{ width: p.width || 'fit-content', minWidth: '50px', height: '50px', background: '#fff', padding: '5px', borderRadius: '10px', border: '2px solid #000' }}>
                                    <img src={p.logo_url} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                                <span style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.8rem' }}>{p.name}</span>
                            </div>
                        ))
                    ) : (
                        defaultPartners.map((p, i) => (
                            <React.Fragment key={i}>
                                <span className="partner-logo">
                                    {p.icon} {p.name}
                                </span>
                                {i < defaultPartners.length - 1 && <div className="partners-sep" />}
                            </React.Fragment>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

/* ───────────────────────────────────────────
   EVENT STATISTICS
─────────────────────────────────────────── */
const EventStats = () => (
    <section className="event-stats" style={{ background: 'var(--accent-gray)', padding: '5rem 0' }}>
        <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                    <div style={{ fontSize: '4.5rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--accent-r)', marginBottom: '0.5rem', lineHeight: 1 }}>2000+</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', color: '#000', letterSpacing: '0.1em' }}>Attendees</div>
                </div>
                <div style={{ animation: 'fadeIn 0.5s ease-out', animationDelay: '0.2s' }}>
                    <div style={{ fontSize: '4.5rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--accent-r)', marginBottom: '0.5rem', lineHeight: 1 }}>8+</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', color: '#000', letterSpacing: '0.1em' }}>Expert Speakers</div>
                </div>
                <div style={{ animation: 'fadeIn 0.5s ease-out', animationDelay: '0.4s' }}>
                    <div style={{ fontSize: '4.5rem', fontWeight: 900, fontFamily: 'Outfit', color: 'var(--accent-r)', marginBottom: '0.5rem', lineHeight: 1 }}>10+</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', color: '#000', letterSpacing: '0.1em' }}>Strategic Delegates</div>
                </div>
            </div>
        </div>
    </section>
);

/* ───────────────────────────────────────────
   PROSPECTUS SECTION
─────────────────────────────────────────── */
const ProspectusSection = () => (
    <section className="prospectus-section" style={{ background: 'var(--fg)', color: '#fff', padding: '4rem 0', borderTop: '3px solid #000', borderBottom: '3px solid #000' }}>
        <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                <div style={{ maxWidth: '600px' }}>
                    <h2 className="section-h2" style={{ color: '#fff', marginBottom: '1rem', textAlign: 'left' }}>Event Prospectus</h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', fontWeight: 500, lineHeight: 1.6 }}>
                        Dive deep into the #OOUFutureTech2026 roadmap. Download our official prospectus to explore the full event agenda, guest speakers, sponsorship opportunities, and our vision for the future.
                    </p>
                </div>
                <div style={{ flexShrink: 0 }}>
                    <a
                        href="/prospectus.pdf"
                        download="OOU_FutureTech_2026_Prospectus.pdf"
                        className="btn-primary"
                        style={{
                            background: 'var(--accent-r)',
                            color: '#fff',
                            border: '3px solid #fff',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1.2rem 2.5rem',
                            fontSize: '1.1rem',
                            fontWeight: 900,
                            borderRadius: '1rem',
                            boxShadow: '6px 6px 0 #fff',
                            transition: 'transform 0.2s ease'
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'translate(-2px, -2px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'none'}
                    >
                        <Download size={24} /> Download Prospectus
                    </a>
                </div>
            </div>
        </div>
    </section>
);

/* ───────────────────────────────────────────
   VISION
─────────────────────────────────────────── */
const Vision = () => (
    <section id="vision" className="vision section">
        <div className="container">
            <div className="vision-card">
                <div className="vision-grid">
                    <div>
                        <p className="section-label">The Impact</p>
                        <h2 className="section-h2">The Vision</h2>
                        <p className="body-text">
                            Our mission is to establish OOU as a premier hub for technology and innovation in Nigeria —
                            empowering students with practical skills, combating cybercrime through education, and connecting
                            talent to investors and opportunities.
                        </p>
                        <div className="feature-list">
                            {[
                                { icon: <Shield size={20} color="#000" />, title: 'Combating Cybercrime', desc: 'Education and practical skills as the primary tools for a safer digital Nigeria.' },
                                { icon: <Globe size={20} color="#000" />, title: 'Innovation Ecosystem', desc: 'Building a long-term Technology & Innovation Investors Hub at OOU.' },
                                { icon: <Network size={20} color="#000" />, title: 'Mentorship & Connections', desc: 'Bridging students with mentors, investors, and global tech opportunities.' },
                            ].map((f, i) => (
                                <div key={i} className="feature-item">
                                    <div className="feature-icon">{f.icon}</div>
                                    <div>
                                        <div className="feature-title">{f.title}</div>
                                        <div className="feature-desc">{f.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="vision-visual">
                        <div className="vision-img-wrap">
                            <img
                                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80"
                                alt="Innovation"
                                className="vision-img"
                            />
                        </div>
                        <div className="vision-badge">Future Ready</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

/* ───────────────────────────────────────────
   TICKETS
─────────────────────────────────────────── */

// Mini barcode SVG-like element using divs
const Barcode = () => (
    <div className="ticket-barcode">
        {[18, 10, 14, 8, 18, 6, 14, 10, 16, 8, 12].map((h, i) => (
            <span key={i} style={{ height: `${h}px` }} />
        ))}
    </div>
);

const TicketGraphic = ({ type }) => (
    <div className="ticket-graphic" style={{ background: '#000', border: '3px solid #000' }}>
        <div className="ticket-graphic-inner">
            {/* Left: logo */}
            <div className="ticket-logo-area">
                <div className="ticket-logo-square" style={{ background: 'var(--accent-r)', padding: '0.4rem', borderRadius: '0.4rem' }}>
                    <Rocket size={16} color="#fff" />
                </div>
                <div className="ticket-conference-name" style={{ color: '#fff' }}>OOU<br />Future Tech</div>
            </div>
            {/* Center: badge */}
            <div className="ticket-badge-wrap" style={{ borderLeft: '1px dashed rgba(255,255,255,0.2)' }}>
                <div className={`ticket-badge-label ${type === 'standard' ? 'ticket-badge-std' : 'ticket-badge-pro'}`}>
                    {type === 'standard' ? 'STANDARD' : 'PRO'}
                </div>
                <div className="ticket-badge-date" style={{ color: 'rgba(255,255,255,0.5)' }}>27 March, 2026</div>
            </div>
            {/* Right: barcode */}
            <div className="ticket-barcode" style={{ borderLeft: '1px dashed rgba(255,255,255,0.2)' }}>
                {[1, 3, 2, 4, 1, 3].map((w, i) => (
                    <span key={i} style={{ width: `${w * 2}px`, background: '#fff' }} />
                ))}
            </div>
        </div>
    </div>
);

const Tickets = ({ onRegister, isRegistrationOpen }) => (
    <section id="tickets" className="tickets section">
        <div className="container">
            <div className="section-header">
                <p className="section-label">Limited Space</p>
                <h2 className="section-h2">Choose Your Access</h2>
                <p>Register as a student for general access or grab an Industry pass for premium workshops and networking.</p>
            </div>
            <div className="tickets-grid">
                {/* Standard Ticket */}
                <div className="ticket-card-v2">
                    <TicketGraphic type="standard" />
                    <h3 className="ticket-title">Standard Pass (Student)</h3>
                    <p className="ticket-subtitle">
                        For current OOU students wanting to dive into the future of tech. Full access to main talks and networking zones.
                    </p>
                    <hr className="ticket-divider" />
                    <ul className="ticket-features">
                        {[
                            'Full access to keynote sessions',
                            'Entrance to the exhibition hall',
                            'Standard conference swag bag',
                            'Certificate of attendance',
                        ].map(f => (
                            <li key={f}><span className="ticket-arrow">→</span> {f}</li>
                        ))}
                    </ul>
                    <button
                        className="btn-ticket"
                        onClick={() => onRegister('Standard')}
                        disabled={!isRegistrationOpen}
                        style={{ opacity: isRegistrationOpen ? 1 : 0.5, cursor: isRegistrationOpen ? 'pointer' : 'not-allowed' }}
                    >
                        {isRegistrationOpen ? 'Register Now' : 'Sales Closed'}
                    </button>
                </div>

                {/* Pro Ticket */}
                <div className="ticket-card-v2 featured">
                    <div className="pro-featured-label">RECOMMENDED FOR FOUNDERS</div>
                    <TicketGraphic type="pro" />
                    <h3 className="ticket-title">Pro Ticket (Industry Access)</h3>
                    <p className="ticket-subtitle">
                        For those who want more access and a more focused, premium experience — all in one day.
                    </p>
                    <hr className="ticket-divider" />
                    <ul className="ticket-features">
                        {[
                            'Exclusive access to sponsor booths & product demos',
                            'Access to masterclasses and technical workshops',
                            'Invitation to the Executive Roundtable',
                            'Special swags and merch',
                        ].map(f => (
                            <li key={f}><span className="ticket-arrow">→</span> {f}</li>
                        ))}
                    </ul>
                    <button
                        className="btn-ticket"
                        onClick={() => onRegister('Pro')}
                        disabled={!isRegistrationOpen}
                        style={{ opacity: isRegistrationOpen ? 1 : 0.5, cursor: isRegistrationOpen ? 'pointer' : 'not-allowed' }}
                    >
                        {isRegistrationOpen ? 'Register Now' : 'Sales Closed'}
                    </button>
                </div>
            </div>
        </div>
    </section>
);

/* ───────────────────────────────────────────
   VOLUNTEERS
─────────────────────────────────────────── */
const VolunteerIDCard = ({ name, sector, photo, cardRef }) => (
    <div className="id-card-canonical" ref={cardRef}>
        <div className="id-card-header">
            <div style={{ display: 'flex', gap: '4px' }}>
                <div style={{ width: '12px', height: '12px', background: 'var(--accent-r)', borderRadius: '2px' }} />
                <div style={{ width: '12px', height: '12px', background: '#fff', borderRadius: '2px' }} />
            </div>
            <span className="id-card-logo-text">OOU Future Tech 2026</span>
        </div>

        <div className="id-card-photo-area">
            <div className="id-card-watermark">VOLUNTEER</div>
            <div className="id-card-photo-frame">
                {photo ? (
                    <img src={photo} alt="Profile" className="id-card-photo" />
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f8f8' }}>
                        <Users size={60} color="#ccc" />
                    </div>
                )}
            </div>
        </div>

        <div className="id-card-info">
            <h2 className="id-card-name">{name || "Your Name"}</h2>
            <div className="id-card-sector">{sector || "Sector"}</div>
        </div>

        <div className="id-card-footer">
            Official Conference Volunteer
        </div>
    </div>
);

const VolunteerSection = () => {
    const [volData, setVolData] = useState({ name: '', sector: 'Technical', photo: null });
    const cardRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const sectors = ['Technical', 'Logistics', 'Protocol', 'Media', 'Welfare', 'Security'];

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setVolData({ ...volData, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDownloadID = async () => {
        if (!volData.name) {
            alert("Please enter your name first!");
            return;
        }
        setIsDownloading(true);
        try {
            const node = cardRef.current;
            const dataUrl = await toPng(node, {
                quality: 1.0,
                pixelRatio: 2,
                backgroundColor: '#fff'
            });
            download(dataUrl, `OOU-Volunteer-${volData.name.replace(/\s+/g, '-')}.png`);
        } catch (err) {
            console.error('Download failed', err);
            alert("Failed to generate ID card. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <section id="volunteers" className="vol-section">
            <div className="container">
                <div className="section-header">
                    <p className="section-label">Join the Crew</p>
                    <h2 className="section-h2">Volunteer Portal</h2>
                    <p>Enter your details below to generate your official volunteer ID card.</p>
                </div>

                <div className="vol-container">
                    <div className="vol-form-card">
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="e.g. Jane Doe"
                                value={volData.name}
                                onChange={(e) => setVolData({ ...volData, name: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Sector</label>
                            <select
                                className="form-select"
                                value={volData.sector}
                                onChange={(e) => setVolData({ ...volData, sector: e.target.value })}
                            >
                                {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Profile Picture</label>
                            <div style={{
                                border: '2px dashed #ccc',
                                borderRadius: '1rem',
                                padding: '1.5rem',
                                textAlign: 'center',
                                background: '#f9fafb'
                            }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    id="photo-upload"
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="photo-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ background: '#fff', padding: '1rem', borderRadius: '50%', border: '2px solid #eee' }}>
                                        <Code2 size={24} color="var(--accent-r)" />
                                    </div>
                                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                                        {volData.photo ? 'Change Photo' : 'Upload Profile Photo'}
                                    </span>
                                </label>
                            </div>
                        </div>

                        <button
                            className="btn-download"
                            onClick={handleDownloadID}
                            disabled={isDownloading}
                            style={{
                                marginTop: '1rem',
                                background: 'var(--accent-r)',
                                color: '#fff',
                                boxShadow: isDownloading ? 'none' : '6px 6px 0 #000',
                                opacity: isDownloading ? 0.7 : 1
                            }}
                        >
                            <Download size={20} /> {isDownloading ? 'Generating...' : 'Download My ID Card'}
                        </button>
                    </div>

                    <div className="id-card-preview-wrap">
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '1.5rem', color: '#71717a', letterSpacing: '0.1em' }}>
                                LIVE PRODUCTION PREVIEW
                            </p>
                            <VolunteerIDCard name={volData.name} sector={volData.sector} photo={volData.photo} cardRef={cardRef} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


/* ───────────────────────────────────────────
   SPEAKERS
─────────────────────────────────────────── */
const TypingText = ({ text, delay = 100 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[index]);
                setIndex(prev => prev + 1);
            }, delay);
            return () => clearTimeout(timeout);
        }
    }, [index, text, delay]);

    return (
        <span>
            {displayedText}
            <span className="typing-cursor" style={{ marginLeft: '2px', background: '#000', width: '2px', height: '1.2em', display: 'inline-block', verticalAlign: 'middle', animation: 'blink 1s infinite' }}></span>
        </span>
    );
};

const Speakers = ({ dynamicSpeakers, speakersMode = 'live', comingSoonText = 'Exciting lineup coming soon! Stay tuned.' }) => {
    const defaultSpeakers = [
        { name: 'Emerald', role: 'Web3 Specialist', expertise: 'Blockchain & DAO', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', bg: 'speaker-img-bg-1' },
        { name: 'Dr. Kunle Ade', role: 'Cybersecurity Lead', expertise: 'Network Defense', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400', bg: 'speaker-img-bg-2' },
        { name: 'Sarah Omotayo', role: 'Product Designer', expertise: 'UI/UX & Fintech', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400', bg: 'speaker-img-bg-3' },
        { name: 'Victor Ige', role: 'Fullstack Engineer', expertise: 'React & Node.js', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400', bg: 'speaker-img-bg-4' },
    ];
    const speakers = dynamicSpeakers && dynamicSpeakers.length > 0 ? dynamicSpeakers : defaultSpeakers;
    return (
        <section id="speakers" className="speakers section">
            <div className="container">
                <div className="speakers-top">
                    <div>
                        <p className="section-label">The Experts</p>
                        <h2 className="section-h2">Featured Speakers</h2>
                    </div>
                    <div className="speakers-top-right">Leading the charge in Tech Innovation</div>
                </div>
                {(speakersMode === 'coming_soon' || (dynamicSpeakers && dynamicSpeakers.length === 0)) ? (
                    <div style={{ background: '#f4f4f5', border: '3px solid #000', borderRadius: '3rem', padding: '5rem 2rem', textAlign: 'center', marginTop: '3rem', boxShadow: '12px 12px 0 #000' }}>
                        <div style={{ display: 'inline-flex', background: '#000', color: '#fff', padding: '1.5rem', borderRadius: '2rem', marginBottom: '2rem' }}>
                            <Mic size={48} />
                        </div>
                        <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '2.5rem', marginBottom: '1rem', color: '#000' }}>Coming Soon</h3>
                        <p style={{ fontSize: '1.2rem', color: '#71717a', maxWidth: '600px', margin: '0 auto', fontWeight: 500, lineHeight: 1.6, minHeight: '3.2rem' }}>
                            <TypingText text={comingSoonText} />
                        </p>
                    </div>
                ) : (
                    <div className="speakers-grid">
                        {speakers.map((s, i) => {
                            const speakerImg = (s.image_url || s.img)?.replace('/object/cms-images/', '/object/public/cms-images/');
                            return (
                                <div key={i} className="speaker-card">
                                    <div className={`speaker-img-wrap ${s.bg}`}>
                                        <img src={speakerImg} alt={s.name} className="speaker-img" />
                                    </div>
                                    <div className="speaker-info">
                                        <h3 className="speaker-name">{s.name}</h3>
                                        <p className="speaker-role">{s.role}</p>
                                        <div className="speaker-expertise"><div className="dot" />{s.expertise}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

/* ───────────────────────────────────────────
   SCHEDULE
─────────────────────────────────────────── */
const Schedule = () => {
    const events = [
        { time: '8:00 AM – 9:00 AM', title: 'Registration & Check-In', desc: 'Participant registration, badge collection, media coverage, and morning networking.', tag: 'Registration' },
        { time: '9:00 AM – 9:15 AM', title: 'Opening Ceremony', desc: 'National Anthem, welcome remarks from the Conference Host, and introduction of guests.', tag: 'Ceremony' },
        { time: '9:15 AM – 9:35 AM', title: 'Opening Address', desc: 'Vision for ethical technology innovation and shaping Africa’s digital economy.', tag: 'Vision' },
        { time: '9:35 AM – 10:00 AM', title: 'Keynote Address', desc: 'The Vice Chancellor of OOU on building Africa’s next generation of tech innovators.', tag: 'Keynote' },
        { time: '10:00 AM – 10:30 AM', title: 'Industry Keynote', desc: 'Industry leaders from Selar, 9mobile, and more on building global products from Nigeria.', tag: 'Industry' },
        { time: '10:30 AM – 11:15 AM', title: 'Panel Discussion', desc: '“From Campus to Startup”: How students can build the next big tech companies.', tag: 'Panel' },
        { time: '11:15 AM – 11:30 AM', title: 'Networking & Coffee Break', desc: 'Informal networking, media interviews, and social media engagement.', tag: 'Break' },
        { time: '11:30 AM – 12:15 PM', title: 'Tech Skill Sessions', desc: 'Practical talks on Web3, AI, and starting tech careers as a student.', tag: 'Skills' },
        { time: '12:15 PM – 1:00 PM', title: 'Workshop Session', desc: 'Hands-on demos on open source, internships, and global opportunities.', tag: 'Workshop' },
        { time: '1:00 PM – 1:30 PM', title: 'Guinness World Record Launch', desc: 'Launching the Largest Collaborative Nigerian Story with Adetunwase Adenle.', tag: 'GWR Launch' },
        { time: '1:30 PM – 2:00 PM', title: 'Lunch Break & Networking', desc: 'Speaker meet-and-greets, informal networking, and media coverage.', tag: 'Lunch' },
        { time: '2:00 PM – 3:30 PM', title: 'Future Opportunities Session', desc: 'Investors Forum announcement, startup incubation, and innovation pathways.', tag: 'Opportunities' },
        { time: '3:30 PM – 4:00 PM', title: 'Recognition of Exceptional Students', desc: 'Awards for outstanding student innovators and top contributors.', tag: 'Awards' },
        { time: '4:00 PM – 4:30 PM', title: 'Closing Remarks', desc: 'Appreciating sponsors, announcement of next steps, and group photos.', tag: 'Closing' },
        { time: '4:30 PM – 5:30 PM', title: 'Networking & Media Session', desc: 'Final speaker interactions, sponsor networking, and press interviews.', tag: 'Networking' },
    ];
    return (
        <section id="schedule" className="schedule section">
            <div className="container">
                <div className="section-header">
                    <p className="section-label">March 27, 2026 • OGD Hall, OOU</p>
                    <h2 className="section-h2">Event Schedule</h2>
                    <p>Expected Attendance: 2,000+ Students • Venue: OGD Hall</p>
                </div>
                <div className="schedule-grid">
                    {events.map((e, i) => (
                        <div key={i} className="schedule-card">
                            <div className="schedule-time">{e.time}</div>
                            <h3 className="schedule-title">{e.title}</h3>
                            <p className="schedule-desc">{e.desc}</p>
                            <span className="schedule-tag"><Zap size={11} /> {e.tag}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ───────────────────────────────────────────
   EXPERIENCE
─────────────────────────────────────────── */
const Experience = () => {
    const features = [
        { title: 'Keynote Sessions', desc: 'Insights from industry leaders defining the next wave of technology.', icon: <Mic size={24} color="#facc15" /> },
        { title: 'Web3 Innovation', desc: 'Blockchain, smart contracts, and the decentralized internet.', icon: <Globe size={24} color="#3b82f6" /> },
        { title: 'Cybersecurity', desc: 'Proactive strategies to protect digital assets and build trust.', icon: <Shield size={24} color="#ef4444" /> },
        { title: 'Startup Pitch', desc: 'Student innovators connect with investors and mentors live.', icon: <Rocket size={24} color="#22c55e" /> },
        { title: 'Mentorship Rounds', desc: 'Speed mentorship sessions with top tech professionals.', icon: <Lightbulb size={24} color="#a855f7" /> },
        { title: 'Dev Workshops', desc: 'Hands-on coding, design sprints, and product hackathons.', icon: <Code2 size={24} color="#ec4899" /> },
    ];
    return (
        <section id="experience" className="experience section">
            <div className="container">
                <div className="section-header">
                    <p className="section-label">What to Expect</p>
                    <h2 className="section-h2">The Experience</h2>
                    <p>More than a conference — a full ecosystem of opportunity.</p>
                </div>
                <div className="experience-grid">
                    {features.map((f, i) => (
                        <div key={i} className="exp-card">
                            <div className="exp-icon">{f.icon}</div>
                            <h3 className="exp-title">{f.title}</h3>
                            <p className="exp-desc">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ───────────────────────────────────────────
   FAQ
─────────────────────────────────────────── */
const FAQ = () => {
    const [open, setOpen] = useState(0);
    const faqs = [
        { q: 'Who can attend?', a: 'OOU Future Tech is open to all OOU students, tech enthusiasts, industry professionals, and anyone passionate about innovation and technology in Nigeria.' },
        { q: 'How do I participate?', a: 'Register for a Student or Industry pass via the "Register Now" button. Walk-in registration will also be available on the day, subject to space.' },
        { q: 'Partnership opportunities?', a: 'We offer Platinum, Gold, and Silver sponsorship tiers for organisations. Each comes with brand visibility, speaking slots, and booth access. Email us to receive the full prospectus.' },
        { q: 'What are the student benefits?', a: 'Beyond attendance, students get hands-on workshop access, speed mentorship with top engineers, pitch competition eligibility, and networking with recruiters.' },
        { q: 'Is the event free for students?', a: 'Yes! General student access to all main sessions is FREE. Workshop seats and premium access passes are available at a subsidised student rate.' },
    ];
    return (
        <section id="faqs" className="faq section">
            <div className="container">
                <div className="section-header">
                    <p className="section-label">Got Questions?</p>
                    <h2 className="section-h2">FAQs</h2>
                </div>
                <div className="faq-list">
                    {faqs.map((f, i) => (
                        <div key={i} className="faq-item">
                            <button
                                className="faq-btn"
                                onClick={() => setOpen(open === i ? -1 : i)}
                            >
                                <span className="faq-q">{f.q}</span>
                                <ChevronRight size={20} className={`faq-chevron${open === i ? ' open' : ''}`} style={{ transform: open === i ? 'rotate(90deg)' : 'none', color: '#71717a', flexShrink: 0, transition: 'transform 0.3s' }} />
                            </button>
                            {open === i && (
                                <div className="faq-answer">{f.a}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ───────────────────────────────────────────
   TEAM
─────────────────────────────────────────── */
const Team = ({ dynamicTeam }) => {
    const defaultTeam = [
        { name: 'Student Leadership', role: 'Main Organizers' },
        { name: 'NACOS Executives', role: 'Collaborators' },
        { name: 'GDSC OOU Lead', role: 'Tech Direction' },
        { name: 'Faculty Advisors', role: 'Mentorship' },
    ];
    const team = dynamicTeam && dynamicTeam.length > 0 ? dynamicTeam : defaultTeam;

    return (
        <section id="team" className="team section">
            <div className="container">
                <div>
                    <p className="section-label" style={{ marginBottom: '1.2rem' }}>The Organisers</p>
                    <h2 className="section-h2" style={{ marginBottom: '3.5rem' }}>The Team</h2>
                </div>
                <div className="team-grid">
                    {team.map((m, i) => {
                        const memberImg = m.image_url?.replace('/object/cms-images/', '/object/public/cms-images/');
                        return (
                            <div key={i} className="team-member">
                                <div className="team-avatar">
                                    {memberImg ? (
                                        <img src={memberImg} alt={m.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                    ) : (
                                        <Users size={36} color="#3f3f46" />
                                    )}
                                </div>
                                <div className="team-info">
                                    <h3 className="team-name">{m.name}</h3>
                                    <p className="team-role">{m.role}</p>
                                    <p className="team-bio">{m.bio}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

/* ───────────────────────────────────────────
   CTA BANNER
─────────────────────────────────────────── */

const CTABanner = ({ onRegister, isRegistrationOpen }) => (
    <section className="cta-banner">
        <div className="container">
            <h2 className="cta-h2">Join the<br />Movement</h2>
            <div className="cta-btns">
                <button
                    className="btn-cta-dark"
                    onClick={() => onRegister()}
                    disabled={!isRegistrationOpen}
                    style={{ opacity: isRegistrationOpen ? 1 : 0.5, cursor: isRegistrationOpen ? 'pointer' : 'not-allowed' }}
                >
                    {isRegistrationOpen ? 'Register Now' : 'Closed'}
                </button>
                <button className="btn-cta-outline">Partner With Us</button>
            </div>
        </div>
    </section>
);

/* ───────────────────────────────────────────
   FOOTER
─────────────────────────────────────────── */
const Footer = ({ onAdmin }) => (
    <footer className="footer">
        <div className="container">
            <div className="footer-grid">
                <div>
                    <div className="footer-brand-icon">
                        <Cpu color="#facc15" size={28} />
                        <span className="footer-brand-name">OOU Future Tech</span>
                    </div>
                    <p className="footer-desc">
                        Join the movement to build Ogun State's tech future. Connecting OOU students to global opportunities through education, innovation, and collaboration.
                    </p>
                </div>
                <div>
                    <p className="footer-heading">Contact</p>
                    <div className="footer-contact-item"><Mail size={15} /> info@ooufuturetech.com</div>
                    <div className="footer-contact-item"><MapPin size={15} /> Ago-Iwoye, Ogun State</div>
                    <div className="footer-contact-item"><Calendar size={15} /> 27 March, 2026</div>
                </div>
                <div>
                    <p className="footer-heading">Follow Us</p>
                    <div className="footer-social">
                        <Github size={24} className="social-icon" />
                        <Twitter size={24} className="social-icon" />
                        <Linkedin size={24} className="social-icon" />
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p className="footer-copy">© 2026 OOU Future Tech Conference. All rights reserved.</p>
                <div className="footer-links">
                    <span onClick={onAdmin}>Admin Dashboard</span>
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                </div>
            </div>
        </div>
    </footer>
);

/* ───────────────────────────────────────────
   PRO DISCLAIMER MODAL
─────────────────────────────────────────── */
const ProDisclaimerModal = ({ isOpen, onClose, onProceed }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" style={{ zIndex: 1100 }}>
            <div className="modal-content" style={{ maxWidth: '450px', padding: '3rem 2rem', textAlign: 'center' }}>
                <button className="modal-close" onClick={onClose}><X size={20} /></button>

                <div style={{
                    display: 'inline-flex',
                    background: '#fff7ed',
                    color: '#c2410c',
                    padding: '1.5rem',
                    borderRadius: '2rem',
                    marginBottom: '2rem',
                    border: '3px solid #c2410c'
                }}>
                    <Store size={48} />
                </div>

                <h3 className="section-h2" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Business Access</h3>

                <p style={{
                    color: '#475569',
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    marginBottom: '2.5rem',
                    fontWeight: 500
                }}>
                    Kindly note that this ticket is specifically for <strong style={{ color: '#000' }}>brands and companies</strong>. It is not a free admission ticket.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button
                        onClick={onProceed}
                        className="btn-primary"
                        style={{ width: '100%', justifyContent: 'center', py: '1.2rem' }}
                    >
                        I Understand, Proceed
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            textDecoration: 'underline',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                        }}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ───────────────────────────────────────────
   REGISTER MODAL
─────────────────────────────────────────── */
const RegisterModal = ({ isOpen, onClose, initialType }) => {
    const ticketRef = useRef(null);
    const [formData, setFormData] = useState({ name: '', email: '', type: 'Standard', companyName: '', whatsappNumber: '', products: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: '',
                email: '',
                type: initialType || 'Standard',
                companyName: '',
                whatsappNumber: '',
                products: ''
            });
            setIsSubmitted(false);
            setError(null);
        }
    }, [isOpen, initialType]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const ticketId = `#OOU-${Math.floor(1000 + Math.random() * 9000)}`;

        // Check for existing registration
        const { data: existing, error: checkError } = await supabase
            .from('registrations')
            .select('email')
            .eq('email', formData.email)
            .maybeSingle();

        if (checkError) {
            console.error('Check error:', checkError);
        }

        if (existing) {
            setError('This email is already registered for OOU Future Tech 2026.');
            setLoading(false);
            return;
        }

        const { data, error: sbError } = await supabase
            .from('registrations')
            .insert([
                {
                    name: formData.name,
                    email: formData.email,
                    ticket_type: formData.type,
                    ticket_id: ticketId,
                    company_name: formData.type === 'Pro' ? formData.companyName : null,
                    whatsapp_number: formData.type === 'Pro' ? formData.whatsappNumber : null,
                    products: formData.type === 'Pro' ? formData.products : null
                }
            ]);

        if (sbError) {
            console.error('Supabase error:', sbError);
            setError('Failed to save registration. Please check your connection or try again.');
            setLoading(false);
            return;
        }

        // Send Email Ticket
        try {
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiBase = isLocal ? 'http://localhost:3001' : '';
            const response = await fetch(`${apiBase}/api/send-ticket`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    name: formData.name,
                    ticketId: ticketId,
                    type: formData.type
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('📧 Mailer API Error:', response.status, errorData);
            } else {
                console.log('📧 Email ticket delivered successfully!');
            }
        } catch (emailErr) {
            console.warn('Email Delivery failed (server might be down):', emailErr);
            // We don't block the UI if email fails, as the DB registration was successful
        }

        setIsSubmitted(true);
        setLoading(false);
        setTimeout(() => {
            document.getElementById('your-ticket')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleDownload = async () => {
        if (!ticketRef.current) return;
        setLoading(true);
        try {
            const node = ticketRef.current;
            const dataUrl = await toPng(node, {
                quality: 1,
                pixelRatio: 2,
                backgroundColor: '#fff',
                cacheBust: true,
                width: node.scrollWidth,
                height: node.scrollHeight,
                style: {
                    transform: 'scale(1)',
                    margin: '0',
                }
            });

            const img = new Image();
            img.src = dataUrl;
            await new Promise((resolve) => {
                img.onload = resolve;
            });

            // Use pixels for dimensions to match format
            const pdf = new jsPDF({
                orientation: img.width > img.height ? 'landscape' : 'portrait',
                unit: 'px',
                format: [img.width, img.height]
            });

            pdf.addImage(dataUrl, 'PNG', 0, 0, img.width, img.height);
            pdf.save(`OOU-FutureTech-Ticket-${formData.name.replace(/\s+/g, '-')}.pdf`);
        } catch (err) {
            console.error('Download failed:', err);
            setError('Failed to download ticket. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}><X size={20} /></button>
                <div className="reg-section" style={{ padding: '3rem 0 0', borderTop: 'none' }}>
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-h2">Claim Your Access</h2>
                            <p>Join the next generation of African innovators. Fill in your details below to generate your official conference ticket.</p>
                        </div>

                        <div className="reg-container">
                            {!isSubmitted ? (
                                <div className="reg-card">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label className="form-label">Full Name</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="e.g. John Doe"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Email Address</label>
                                            <input
                                                type="email"
                                                className="form-input"
                                                placeholder="e.g. john@university.edu"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Selected Ticket Type</label>
                                            <div className="form-input" style={{
                                                background: '#f1f5f9',
                                                fontWeight: 900,
                                                textTransform: 'uppercase',
                                                color: '#475569',
                                                border: '3px solid #000',
                                                display: 'flex',
                                                alignItems: 'center',
                                                cursor: 'not-allowed',
                                                pointerEvents: 'none'
                                            }}>
                                                <Ticket size={18} style={{ marginRight: '0.8rem', color: 'var(--accent-r)' }} />
                                                {formData.type === 'Pro' ? 'PRO TICKET (INDUSTRY)' : 'STANDARD TICKET (STUDENT)'}
                                            </div>
                                        </div>

                                        {formData.type === 'Pro' && (
                                            <div style={{ animation: 'fadeInUp 0.3s ease-out' }}>
                                                <div className="form-group">
                                                    <label className="form-label">WhatsApp Number</label>
                                                    <input
                                                        type="text"
                                                        className="form-input"
                                                        placeholder="e.g. +234..."
                                                        required
                                                        value={formData.whatsappNumber}
                                                        onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Business Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-input"
                                                        placeholder="e.g. Acme Innovations"
                                                        required
                                                        value={formData.companyName}
                                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Products you want to sell</label>
                                                    <textarea
                                                        className="form-input"
                                                        placeholder="Describe your products or services..."
                                                        required
                                                        style={{ minHeight: '100px', resize: 'vertical', paddingTop: '0.8rem' }}
                                                        value={formData.products}
                                                        onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}>
                                            {loading ? 'Processing...' : (formData.type === 'Pro' ? 'Book My Stand' : 'Generate My Ticket')}
                                        </button>
                                        {error && <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 700 }}>{error}</p>}
                                    </form>
                                </div>
                            ) : (
                                <div id="your-ticket">
                                    {formData.type === 'Standard' ? (
                                        <>
                                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                                <div style={{ display: 'inline-flex', background: '#ecfdf5', color: '#059669', padding: '0.75rem 1.5rem', borderRadius: '9999px', fontSize: '0.9rem', fontWeight: 900, marginBottom: '1rem', border: '2px solid #059669' }}>
                                                    <CheckCircle size={20} style={{ marginRight: '0.6rem' }} /> REGISTRATION SUCCESSFUL!
                                                </div>
                                                <h3 className="section-h2" style={{ fontSize: '2rem' }}>Your Entry Ticket is Ready</h3>
                                            </div>

                                            <div className="dynamic-ticket" ref={ticketRef}>
                                                <div className="dt-cutout dt-cutout-l" />
                                                <div className="dt-cutout dt-cutout-r" />

                                                <div className="dt-header">
                                                    <div className="dt-logo-group">
                                                        <div className="dt-logo-square">
                                                            <Rocket size={20} color="#fff" />
                                                        </div>
                                                        <div className="dt-header-logo">OOU FUTURE TECH</div>
                                                    </div>
                                                    <div className="dt-header-year">2026</div>
                                                </div>

                                                <div className="dt-body">
                                                    <div className="dt-main-info">
                                                        <div className="dt-type-badge">
                                                            STANDARD PASS
                                                        </div>
                                                        <h2 className="dt-user-name">{formData.name}</h2>
                                                        <p className="dt-user-email">{formData.email}</p>
                                                    </div>

                                                    <div className="dt-event-details">
                                                        <div className="dt-detail">
                                                            <div className="dt-detail-label"><Calendar size={12} /> Date & Time</div>
                                                            <div className="dt-detail-val">Mar 27, 2026 • 9:00 AM</div>
                                                        </div>
                                                        <div className="dt-detail">
                                                            <div className="dt-detail-label"><MapPin size={12} /> Location</div>
                                                            <div className="dt-detail-val">OOU Main Campus, Ago-Iwoye</div>
                                                        </div>
                                                        <div className="dt-detail">
                                                            <div className="dt-detail-label"><Cpu size={12} /> Access ID</div>
                                                            <div className="dt-detail-val" style={{ color: 'var(--accent-r)' }}>{formData.type === 'Standard' ? `#OOU-${Math.floor(1000 + Math.random() * 9000)}` : 'PRO-VIP'}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="dt-footer">
                                                    <div className="dt-barcode">
                                                        {[2, 4, 1, 6, 2, 8, 3, 5, 2, 10, 2, 4, 1, 6, 2, 8].map((w, idx) => (
                                                            <div key={idx} className="dt-bar" style={{ width: `${w}px` }} />
                                                        ))}
                                                    </div>
                                                    <div className="dt-footer-text">
                                                        PRESENT AT ENTRY • NON-TRANSFERABLE
                                                    </div>
                                                </div>
                                            </div>

                                            <button className="btn-download" onClick={handleDownload} disabled={loading} style={{ background: 'var(--fg)', color: '#fff', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', opacity: loading ? 0.7 : 1 }}>
                                                <Download size={20} /> {loading ? 'Preparing PDF...' : 'Download Ticket as PDF'}
                                            </button>
                                        </>
                                    ) : (
                                        <div className="reg-card" style={{ textAlign: 'center', background: '#f8fafc' }}>
                                            <div style={{ display: 'inline-flex', background: '#000', color: '#fff', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                                                <Rocket size={40} />
                                            </div>
                                            <h3 className="section-h2" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Stand Request Received!</h3>
                                            <p className="body-text" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                                                Thank you for your interest, <strong>{formData.name}</strong>.
                                                <br /><br />
                                                An <strong>administrator</strong> will reach out to you via WhatsApp or Email at <strong>{formData.email}</strong> shortly to finalize your stand placement.
                                            </p>
                                            <div style={{ background: '#fff', border: '2px solid #000', padding: '1.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left' }}>
                                                <div style={{ background: 'var(--accent-r)', color: '#fff', padding: '0.75rem', borderRadius: '0.75rem' }}>
                                                    <CheckCircle size={24} />
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.75rem' }}>Status</div>
                                                    <div style={{ fontWeight: 700 }}>Pending Review</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#71717a', fontSize: '0.85rem' }}>
                                        A confirmation copy has been sent to <strong>{formData.email}</strong>
                                    </p>

                                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                                        <button
                                            onClick={() => setIsSubmitted(false)}
                                            style={{ background: 'none', border: 'none', textDecoration: 'underline', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
                                        >
                                            Back to registration
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ───────────────────────────────────────────
   ADMIN DASHBOARD
─────────────────────────────────────────── */
const AdminDashboard = ({ onBack, onRefresh, isRegistrationOpen, speakersMode, comingSoonText, dynamicSpeakers, dynamicTeam }) => {
    const [activeTab, setActiveTab] = useState('standard'); // 'standard', 'pro', 'partners', 'speakers', 'team', 'settings'
    const [partners, setPartners] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Form states for adding content
    const [newSpeaker, setNewSpeaker] = useState({ name: '', role: '', expertise: '', image_url: '', bg_class: 'speaker-img-bg-1' });
    const [newPartner, setNewPartner] = useState({ name: '', logo_url: '' });
    const [newMember, setNewMember] = useState({ name: '', role: '', bio: '', image_url: '' });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchRegistrations();
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        const { data, error } = await supabase.from('partners').select('*').order('created_at', { ascending: true });
        if (!error) setPartners(data);
    };

    const handleImageUpload = async (file, type) => {
        if (!file) return;
        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${type}/${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from('cms-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('cms-images')
                .getPublicUrl(filePath);

            let publicUrl = data.publicUrl;
            // Fallback for older patterns or misconfigurations: ensure /public/ is in the path
            if (publicUrl && !publicUrl.includes('/public/')) {
                publicUrl = publicUrl.replace('/object/cms-images/', '/object/public/cms-images/');
            }

            console.log(`📸 Image Uploaded: ${publicUrl}`);

            if (type === 'speakers') {
                setNewSpeaker(prev => ({ ...prev, image_url: publicUrl }));
            } else if (type === 'partners') {
                setNewPartner(prev => ({ ...prev, logo_url: publicUrl }));
            } else {
                setNewMember(prev => ({ ...prev, image_url: publicUrl }));
            }
        } catch (error) {
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const fetchRegistrations = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('registrations')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) {
            setRegistrations(data);
        }
        setLoading(false);
    };

    const handleDeleteRegistration = async (id) => {
        if (confirm('Are you sure you want to delete this registration?')) {
            const { error } = await supabase
                .from('registrations')
                .delete()
                .eq('id', id);

            if (!error) {
                fetchRegistrations();
            } else {
                alert('Error deleting registration: ' + error.message);
            }
        }
    };

    const toggleRegistration = async () => {
        const newValue = !isRegistrationOpen;
        const { error } = await supabase
            .from('site_settings')
            .upsert({ key: 'registration_open', value: newValue.toString(), updated_at: new Date() });

        if (!error) onRefresh();
        else alert('Failed to update settings. Make sure site_settings table exists.');
    };

    const handleAddSpeaker = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('speakers').insert([newSpeaker]);
        if (!error) {
            setNewSpeaker({ name: '', role: '', expertise: '', image_url: '', bg_class: 'speaker-img-bg-1' });
            onRefresh();
        } else alert('Error adding speaker. Check if speakers table exists.');
    };

    const handleAddPartner = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('partners').insert([newPartner]);
        if (!error) {
            setNewPartner({ name: '', logo_url: '' });
            fetchPartners();
            onRefresh();
        } else alert('Error adding partner.');
    };

    const handleDeletePartner = async (id) => {
        if (confirm('Are you sure you want to delete this partner?')) {
            const { error } = await supabase.from('partners').delete().eq('id', id);
            if (!error) {
                fetchPartners();
                onRefresh();
            } else alert('Error deleting partner.');
        }
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('team_members').insert([newMember]);
        if (!error) {
            setNewMember({ name: '', role: '', bio: '', image_url: '' });
            onRefresh();
        } else alert('Error adding team member. Check if team_members table exists.');
    };

    const handleDeleteSpeaker = async (id) => {
        if (confirm('Are you sure you want to delete this speaker?')) {
            const { error } = await supabase.from('speakers').delete().eq('id', id);
            if (!error) onRefresh();
            else alert('Error deleting speaker.');
        }
    };

    const handleDeleteMember = async (id) => {
        if (confirm('Are you sure you want to delete this team member?')) {
            const { error } = await supabase.from('team_members').delete().eq('id', id);
            if (!error) onRefresh();
            else alert('Error deleting team member.');
        }
    };

    const filteredRegs = registrations.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.ticket_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (r.company_name && r.company_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (r.products && r.products.toLowerCase().includes(searchTerm.toLowerCase()));

        if (activeTab === 'standard') return matchesSearch && r.ticket_type === 'Standard';
        if (activeTab === 'pro') return matchesSearch && r.ticket_type === 'Pro';
        return matchesSearch;
    });

    const stats = {
        total: registrations.length,
        standard: registrations.filter(r => r.ticket_type === 'Standard').length,
        pro: registrations.filter(r => r.ticket_type === 'Pro').length
    };

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.8rem 1.5rem', borderRadius: '1rem', border: '3px solid #000',
                background: activeTab === id ? '#000' : '#fff',
                color: activeTab === id ? '#fff' : '#000',
                fontFamily: 'Outfit', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.75rem',
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: activeTab === id ? 'none' : '4px 4px 0 #000'
            }}
        >
            <Icon size={16} /> {label}
        </button>
    );

    return (
        <div className="admin-dashboard-wrap" style={{ background: '#f8f8f8', minHeight: '100vh', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)' }}>
            <div className="container" style={{ maxWidth: '1000px', padding: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 className="section-h2" style={{ margin: 0 }}>Terminal Access</h1>
                        <p style={{ fontSize: '0.8rem', color: '#71717a', marginTop: '0.5rem' }}>Authenticated as Administrator • OOU Future Tech 2026</p>
                    </div>
                    <button onClick={onBack} className="btn-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}>Back to Site</button>
                </div>

                {/* TABS */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    <TabButton id="standard" label="Standard Passes" icon={Users} />
                    <TabButton id="pro" label="Stand Requests" icon={Users} />
                    <TabButton id="partners" label="Partners CMS" icon={Store} />
                    <TabButton id="speakers" label="Speakers CMS" icon={Mic} />
                    <TabButton id="team" label="Team CMS" icon={Users} />
                    <TabButton id="settings" label="Site Controls" icon={Zap} />
                </div>

                {(activeTab === 'standard' || activeTab === 'pro') && (
                    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                            {[
                                { label: 'Total Registrations', val: stats.total, color: 'var(--accent-r)' },
                                { label: 'Standard Passes', val: stats.standard, color: '#000' },
                                { label: 'Stand Requests', val: stats.pro, color: '#fff', bg: '#000' }
                            ].map((s, i) => (
                                <div key={i} style={{ background: s.bg || '#fff', border: '3px solid #000', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: '4px 4px 0 #000' }}>
                                    <p style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', color: s.bg ? '#ccc' : '#71717a', marginBottom: '0.5rem' }}>{s.label}</p>
                                    <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '2.5rem', margin: 0, color: s.bg ? '#fff' : '#000' }}>{s.val}</h2>
                                </div>
                            ))}
                        </div>

                        <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '2rem', padding: '2rem', boxShadow: '8px 8px 0 #000' }}>
                            <div style={{ marginBottom: '2rem' }}>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Search by name, email or ticket ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {loading ? (
                                <p style={{ textAlign: 'center', fontWeight: 700 }}>Loading attendees...</p>
                            ) : (
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ textAlign: 'left', borderBottom: '3px solid #000' }}>
                                                <th style={{ padding: '1rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Attendee / Company</th>
                                                <th style={{ padding: '1rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Type</th>
                                                <th style={{ padding: '1rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>ID</th>
                                                <th style={{ padding: '1rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Date</th>
                                                <th style={{ padding: '1rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredRegs.map((r, i) => (
                                                <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                                    <td style={{ padding: '1rem' }}>
                                                        <div style={{ fontWeight: 900 }}>{r.name}</div>
                                                        <div style={{ fontSize: '0.8rem', color: '#71717a' }}>{r.email}</div>
                                                        {r.whatsapp_number && <div style={{ fontSize: '0.8rem', color: '#25d366', fontWeight: 700 }}>WA: {r.whatsapp_number}</div>}
                                                        {r.company_name && (
                                                            <div style={{ fontSize: '0.75rem', color: '#000', fontWeight: 900, marginTop: '0.4rem', background: '#f4f4f5', padding: '0.3rem 0.6rem', borderRadius: '0.4rem', width: 'fit-content' }}>
                                                                {r.company_name}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <span style={{
                                                            background: r.ticket_type === 'Pro' ? '#000' : 'var(--accent-r)',
                                                            color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase'
                                                        }}>{r.ticket_type}</span>
                                                    </td>
                                                    <td style={{ padding: '1rem', fontFamily: 'monospace', fontWeight: 700 }}>{r.ticket_id}</td>
                                                    <td style={{ padding: '1rem', fontSize: '0.8rem' }}>{new Date(r.created_at).toLocaleDateString()}</td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <button
                                                            onClick={() => handleDeleteRegistration(r.id)}
                                                            style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {
                    activeTab === 'speakers' && (
                        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
                                <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '2rem', padding: '2rem', boxShadow: '8px 8px 0 #000' }}>
                                    <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, marginBottom: '2rem' }}>Current Speakers</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {dynamicSpeakers.length > 0 ? dynamicSpeakers.map((s, i) => {
                                            const speakerImg = s.image_url?.replace('/object/cms-images/', '/object/public/cms-images/');
                                            return (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: '1rem' }}>
                                                    <img src={speakerImg} alt={s.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontWeight: 900 }}>{s.name}</div>
                                                        <div style={{ fontSize: '0.75rem', color: '#71717a' }}>{s.role} • {s.expertise}</div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDeleteSpeaker(s.id)}
                                                        style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            );
                                        }) : <p style={{ textAlign: 'center', color: '#71717a' }}>No dynamic speakers yet. Site is using defaults.</p>}
                                    </div>
                                </div>

                                <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '2rem', padding: '2rem', boxShadow: '8px 8px 0 #000' }}>
                                    <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, marginBottom: '1.5rem' }}>Add Speaker</h3>
                                    <form onSubmit={handleAddSpeaker}>
                                        <input className="form-input" placeholder="Name" required value={newSpeaker.name} onChange={e => setNewSpeaker({ ...newSpeaker, name: e.target.value })} style={{ marginBottom: '1rem' }} />
                                        <input className="form-input" placeholder="Role (e.g. Web3 Expert)" required value={newSpeaker.role} onChange={e => setNewSpeaker({ ...newSpeaker, role: e.target.value })} style={{ marginBottom: '1rem' }} />
                                        <input className="form-input" placeholder="Expertise" required value={newSpeaker.expertise} onChange={e => setNewSpeaker({ ...newSpeaker, expertise: e.target.value })} style={{ marginBottom: '1rem' }} />

                                        <div style={{ marginBottom: '1rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, marginBottom: '0.5rem', textTransform: 'uppercase' }}>Speaker Image</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e.target.files[0], 'speakers')}
                                                style={{ fontSize: '0.8rem' }}
                                            />
                                            {newSpeaker.image_url && (
                                                <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: '#059669', fontWeight: 700 }}>✅ Image Ready</div>
                                            )}
                                        </div>

                                        <button type="submit" className="btn-primary" disabled={uploading} style={{ width: '100%', justifyContent: 'center', opacity: uploading ? 0.7 : 1 }}>
                                            {uploading ? 'Uploading...' : 'Add Speaker Profile'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    activeTab === 'team' && (
                        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
                                <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '2rem', padding: '2rem', boxShadow: '8px 8px 0 #000' }}>
                                    <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, marginBottom: '2rem' }}>Team Members</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {dynamicTeam.length > 0 ? dynamicTeam.map((m, i) => {
                                            const memberImg = m.image_url?.replace('/object/cms-images/', '/object/public/cms-images/');
                                            return (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: '1rem' }}>
                                                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#f4f4f5', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                                        {memberImg ? <img src={memberImg} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Users size={20} />}
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontWeight: 900 }}>{m.name}</div>
                                                        <div style={{ fontSize: '0.75rem', color: '#71717a' }}>{m.role}</div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDeleteMember(m.id)}
                                                        style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            );
                                        }) : <p style={{ textAlign: 'center', color: '#71717a' }}>No dynamic team yet. Site is using defaults.</p>}
                                    </div>
                                </div>

                                <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '2rem', padding: '1rem', boxShadow: '8px 8px 0 #000' }}>
                                    <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, marginBottom: '1.5rem' }}>Add Team Member</h3>
                                    <form onSubmit={handleAddMember}>
                                        <input className="form-input" placeholder="Name" required value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} style={{ marginBottom: '1rem' }} />
                                        <input className="form-input" placeholder="Role" required value={newMember.role} onChange={e => setNewMember({ ...newMember, role: e.target.value })} style={{ marginBottom: '1rem' }} />
                                        <textarea className="form-input" placeholder="Bio (optional)" value={newMember.bio} onChange={e => setNewMember({ ...newMember, bio: e.target.value })} style={{ marginBottom: '1rem', minHeight: '80px' }} />

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, marginBottom: '0.5rem', textTransform: 'uppercase' }}>Member Photo</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e.target.files[0], 'team')}
                                                style={{ fontSize: '0.8rem' }}
                                            />
                                            {newMember.image_url && (
                                                <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: '#059669', fontWeight: 700 }}>✅ Photo Ready</div>
                                            )}
                                        </div>

                                        <button type="submit" className="btn-primary" disabled={uploading} style={{ width: '100%', justifyContent: 'center', opacity: uploading ? 0.7 : 1 }}>
                                            {uploading ? 'Uploading...' : 'Add to Team'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    activeTab === 'partners' && (
                        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
                                <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '2rem', padding: '2rem', boxShadow: '8px 8px 0 #000' }}>
                                    <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, marginBottom: '2rem' }}>Community Partners</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                                        {partners.length > 0 ? partners.map((p, i) => (
                                            <div key={i} style={{ width: '150px', background: '#f8fafc', border: '2px solid #000', borderRadius: '1.5rem', padding: '1rem', textAlign: 'center', position: 'relative' }}>
                                                <button
                                                    onClick={() => handleDeletePartner(p.id)}
                                                    style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.3rem', borderRadius: '0.4rem', cursor: 'pointer' }}
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                                <img src={p.logo_url} alt={p.name} style={{ width: '100%', height: '60px', objectFit: 'contain', marginBottom: '0.8rem' }} />
                                                <div style={{ fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase' }}>{p.name}</div>
                                            </div>
                                        )) : <p style={{ color: '#71717a' }}>No dynamic partners yet.</p>}
                                    </div>
                                </div>

                                <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '2rem', padding: '2rem', boxShadow: '8px 8px 0 #000' }}>
                                    <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, marginBottom: '1.5rem' }}>Add Partner</h3>
                                    <form onSubmit={handleAddPartner}>
                                        <input className="form-input" placeholder="Organization Name" required value={newPartner.name} onChange={e => setNewPartner({ ...newPartner, name: e.target.value })} style={{ marginBottom: '1rem' }} />

                                        <div style={{ marginBottom: '1rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, marginBottom: '0.5rem', textTransform: 'uppercase' }}>Partner Logo</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e.target.files[0], 'partners')}
                                                style={{ fontSize: '0.8rem' }}
                                            />
                                            {newPartner.logo_url && (
                                                <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: '#059669', fontWeight: 700 }}>✅ Logo Ready</div>
                                            )}
                                        </div>

                                        <button type="submit" className="btn-primary" disabled={uploading} style={{ width: '100%', justifyContent: 'center', opacity: uploading ? 0.7 : 1 }}>
                                            {uploading ? 'Uploading...' : 'Add Partner'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    activeTab === 'settings' && (
                        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                            <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '2rem', padding: '3rem', boxShadow: '12px 12px 0 #000', maxWidth: '600px', margin: '0 auto' }}>
                                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                    <div style={{ display: 'inline-flex', background: isRegistrationOpen ? '#ecfdf5' : '#fef2f2', color: isRegistrationOpen ? '#059669' : '#dc2626', padding: '1rem', borderRadius: '1.5rem', marginBottom: '1.5rem', border: '3px solid currentColor' }}>
                                        <Zap size={40} />
                                    </div>
                                    <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '2rem' }}>Registration Control</h2>
                                    <p style={{ color: '#71717a', marginTop: '1rem' }}>Toggle the ticket registration system on or off for the entire website.</p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '2rem', borderRadius: '1.5rem', border: '3px solid #000' }}>
                                    <div>
                                        <div style={{ fontWeight: 950, textTransform: 'uppercase', fontSize: '0.8rem' }}>Current Status</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: isRegistrationOpen ? '#059669' : '#dc2626' }}>
                                            {isRegistrationOpen ? 'OPEN & SECURE' : 'CLOSED TO PUBLIC'}
                                        </div>
                                    </div>
                                    <button
                                        onClick={toggleRegistration}
                                        style={{
                                            background: isRegistrationOpen ? '#dc2626' : '#059669',
                                            color: '#fff', padding: '1rem 2rem', borderRadius: '1rem', border: '3px solid #000',
                                            fontFamily: 'Outfit', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer',
                                            boxShadow: '4px 4px 0 #000', transition: 'all 0.2s'
                                        }}
                                    >
                                        {isRegistrationOpen ? 'Close Ticket Sales' : 'Open Ticket Sales'}
                                    </button>
                                </div>

                                <div style={{ marginTop: '3rem', borderTop: '2px dashed #eee', paddingTop: '3rem' }}>
                                    <h4 style={{ fontWeight: 900, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', textTransform: 'uppercase' }}>
                                        <Mic size={24} /> Speakers Section
                                    </h4>

                                    <div style={{ marginBottom: '2rem' }}>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 900, marginBottom: '1rem', textTransform: 'uppercase' }}>Display Mode</label>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <button
                                                onClick={async () => {
                                                    const { error } = await supabase.from('site_settings').upsert({ key: 'speakers_mode', value: 'live' });
                                                    if (!error) onRefresh();
                                                }}
                                                style={{
                                                    flex: 1, padding: '1rem', borderRadius: '1rem', border: '3px solid #000',
                                                    background: speakersMode === 'live' ? '#000' : '#fff',
                                                    color: speakersMode === 'live' ? '#fff' : '#000',
                                                    fontFamily: 'Outfit', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer',
                                                    boxShadow: speakersMode === 'live' ? 'none' : '4px 4px 0 #000'
                                                }}
                                            >
                                                Live
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    const { error } = await supabase.from('site_settings').upsert({ key: 'speakers_mode', value: 'coming_soon' });
                                                    if (!error) onRefresh();
                                                }}
                                                style={{
                                                    flex: 1, padding: '1rem', borderRadius: '1rem', border: '3px solid #000',
                                                    background: speakersMode === 'coming_soon' ? '#000' : '#fff',
                                                    color: speakersMode === 'coming_soon' ? '#fff' : '#000',
                                                    fontFamily: 'Outfit', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer',
                                                    boxShadow: speakersMode === 'coming_soon' ? 'none' : '4px 4px 0 #000'
                                                }}
                                            >
                                                Coming Soon
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 900, marginBottom: '0.8rem', textTransform: 'uppercase' }}>Announcement Text</label>
                                        <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                                            <input
                                                className="form-input"
                                                placeholder="e.g. Exciting lineup coming soon!"
                                                defaultValue={comingSoonText}
                                                style={{ border: '3px solid #000', borderRadius: '1rem', padding: '1rem' }}
                                                onBlur={async (e) => {
                                                    const val = e.target.value;
                                                    if (val === comingSoonText) return;
                                                    const { error } = await supabase.from('site_settings').upsert({ key: 'speakers_coming_soon_text', value: val });
                                                    if (!error) onRefresh();
                                                }}
                                            />
                                            <div style={{ display: 'flex', alignItems: 'center', color: '#71717a', fontSize: '0.7rem', fontWeight: 700 }}>
                                                <CheckCircle size={14} style={{ marginRight: '6px' }} /> Updates automatically on blur
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div >
        </div >
    );
};

/* ───────────────────────────────────────────
   ADMIN LOGIN
─────────────────────────────────────────── */
const AdminLogin = ({ onLogin, onBack }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Default password - change this for production
        if (password === 'admin2026') {
            onLogin();
        } else {
            setError('Invalid master password. Please try again.');
        }
    };

    return (
        <div style={{
            background: '#fff',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div className="reg-card" style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        background: '#000',
                        color: '#fff',
                        padding: '1rem',
                        borderRadius: '1.5rem',
                        marginBottom: '1rem'
                    }}>
                        <Shield size={32} />
                    </div>
                    <h2 className="section-h2" style={{ fontSize: '1.5rem', margin: 0 }}>Terminal Access</h2>
                    <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Enter master password to unlock attendee data.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Master Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            autoFocus
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p style={{ color: 'red', marginTop: '0.75rem', fontSize: '0.75rem', fontWeight: 700 }}>{error}</p>}
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        Unlock Dashboard
                    </button>

                    <button
                        type="button"
                        onClick={onBack}
                        style={{
                            width: '100%',
                            marginTop: '1rem',
                            background: 'none',
                            border: 'none',
                            textDecoration: 'underline',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                        }}
                    >
                        Return to Public Site
                    </button>
                </form>
            </div>
        </div>
    );
};

/* ───────────────────────────────────────────
   APP ROOT
─────────────────────────────────────────── */
export default function App() {
    const [view, setView] = useState('site'); // 'site', 'admin-login', 'admin'
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const [selectedTicketType, setSelectedTicketType] = useState('Standard');
    const [isProDisclaimerOpen, setIsProDisclaimerOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Dynamic CMS State
    const [dynamicSpeakers, setDynamicSpeakers] = useState([]);
    const [dynamicPartners, setDynamicPartners] = useState([]);
    const [dynamicTeam, setDynamicTeam] = useState([]);
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
    const [speakersMode, setSpeakersMode] = useState('live'); // 'live' or 'coming_soon'
    const [comingSoonText, setComingSoonText] = useState('Exciting lineup coming soon! Stay tuned.');

    useEffect(() => {
        fetchCMSData();
    }, []);

    const fetchCMSData = async () => {
        try {
            const { data: speakers } = await supabase.from('speakers').select('*').order('created_at', { ascending: true });
            if (speakers) setDynamicSpeakers(speakers);

            const { data: partners } = await supabase.from('partners').select('*').order('created_at', { ascending: true });
            if (partners) setDynamicPartners(partners);

            const { data: team } = await supabase.from('team_members').select('*').order('created_at', { ascending: true });
            if (team) setDynamicTeam(team);

            const { data: settings } = await supabase.from('site_settings').select('*');
            if (settings) {
                const regSetting = settings.find(s => s.key === 'registration_open');
                if (regSetting) setIsRegistrationOpen(regSetting.value === 'true');

                const modeSetting = settings.find(s => s.key === 'speakers_mode');
                if (modeSetting) setSpeakersMode(modeSetting.value);

                const textSetting = settings.find(s => s.key === 'speakers_coming_soon_text');
                if (textSetting) setComingSoonText(textSetting.value);
            }
        } catch (err) {
            console.warn('CMS Fetch failed (tables might not exist yet):', err);
        }
    };

    // If authenticated and trying to go to login, skip to dashboard
    useEffect(() => {
        if (view === 'admin-login' && isAuthenticated) {
            setView('admin');
        }
    }, [view, isAuthenticated]);

    if (view === 'admin-login') {
        return (
            <>
                <GlobalStyle />
                <AdminLogin
                    onLogin={() => {
                        setIsAuthenticated(true);
                        setView('admin');
                    }}
                    onBack={() => setView('site')}
                />
            </>
        );
    }

    if (view === 'admin') {
        return (
            <>
                <GlobalStyle />
                <AdminDashboard
                    onBack={() => setView('site')}
                    onRefresh={fetchCMSData}
                    isRegistrationOpen={isRegistrationOpen}
                    speakersMode={speakersMode}
                    comingSoonText={comingSoonText}
                    dynamicSpeakers={dynamicSpeakers}
                    dynamicPartners={dynamicPartners}
                    dynamicTeam={dynamicTeam}
                />
            </>
        );
    }


    const openModal = (type = 'Standard') => {
        if (type === 'Pro') {
            setIsProDisclaimerOpen(true);
            return;
        }
        setSelectedTicketType(type);
        setIsRegModalOpen(true);
    };

    return (
        <>
            <GlobalStyle />
            <Navbar
                onRegister={openModal}
                isRegistrationOpen={isRegistrationOpen}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                onViewChange={(v) => {
                    setView(v);
                    window.scrollTo(0, 0);
                }}
                currentView={view}
            />

            {view === 'volunteers' ? (
                <div style={{ paddingTop: '8rem' }}>
                    <div className="container" style={{ marginBottom: '2rem' }}>
                        <button
                            onClick={() => setView('site')}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontWeight: 900,
                                fontSize: '1rem',
                                color: 'var(--accent-r)',
                                cursor: 'pointer'
                            }}
                        >
                            <ChevronRight style={{ transform: 'rotate(180deg)' }} /> Back to Homepage
                        </button>
                    </div>
                    <VolunteerSection />
                </div>
            ) : (
                <>
                    <Hero onRegister={openModal} isRegistrationOpen={isRegistrationOpen} />
                    <Partners dynamicPartners={dynamicPartners} />
                    <EventStats />
                    <ProspectusSection />
                    <Vision />
                    <Tickets onRegister={openModal} isRegistrationOpen={isRegistrationOpen} />
                    <Speakers
                        dynamicSpeakers={dynamicSpeakers}
                        speakersMode={speakersMode}
                        comingSoonText={comingSoonText}
                    />
                    <Schedule />
                    <Experience />
                    <FAQ />
                    <Team dynamicTeam={dynamicTeam} />
                </>
            )}

            <CTABanner onRegister={openModal} isRegistrationOpen={isRegistrationOpen} />
            <Footer onAdmin={() => setView('admin-login')} />

            <RegisterModal
                isOpen={isRegModalOpen}
                onClose={() => setIsRegModalOpen(false)}
                initialType={selectedTicketType}
            />

            <ProDisclaimerModal
                isOpen={isProDisclaimerOpen}
                onClose={() => setIsProDisclaimerOpen(false)}
                onProceed={() => {
                    setIsProDisclaimerOpen(false);
                    setSelectedTicketType('Pro');
                    setIsRegModalOpen(true);
                }}
            />
        </>
    );
}
