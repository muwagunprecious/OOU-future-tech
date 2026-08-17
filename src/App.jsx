import React, { useState, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { jsPDF } from 'jspdf';
import { supabase } from './lib/supabase';
import {
    ChevronRight, ChevronDown, Github, Twitter, Linkedin, Mail,
    MapPin, Calendar, Users, Cpu, Shield, Globe, Award,
    Zap, Code2, Mic, Network, Lightbulb, Rocket, Lock,
    Download, CheckCircle, Ticket, X, Trash2, Store, Menu, Camera as CameraIcon,
    PartyPopper, Heart, Sparkles, Building2, UserPlus, Scale, Pencil, User,
    FileText, Upload, AlertCircle, ArrowLeft, Paperclip, Terminal, Send, Play, BookOpen, Video, PlayCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

    /* PARTNERS STRIP - Gliding Carousel */
    .partners-strip { padding: 4rem 0; background: #fff; overflow: hidden; border-top: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9; }
    .partners-label { font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--accent-r); margin-bottom: 3rem; text-align: center; }
    
    .partners-carousel { overflow: hidden; white-space: nowrap; position: relative; width: 100%; padding: 1rem 0; }
    .partners-track { display: inline-flex; animation: glide 40s linear infinite; gap: 4rem; width: max-content; }
    
    @keyframes glide {
      0% { transform: translateX(0); }
      100% { transform: translateX(calc(-50% - 2rem)); }
    }

    .partner-logo-item {
      display: flex; align-items: center; gap: 1rem;
      background: #fff; padding: 0.5rem 1.5rem;
      border-radius: 999px; border: 2px solid #000;
      box-shadow: 4px 4px 0 #000;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .partner-logo-item:hover { transform: scale(1.05) rotate(-1deg); box-shadow: 6px 6px 0 var(--accent-r); }
    .partner-logo-box { width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; background: #fff; border-radius: 8px; flex-shrink: 0; }
    .partner-logo-img { width: 100%; height: 100%; object-fit: contain; }
    .partner-name { font-family: 'Outfit', sans-serif; font-weight: 950; font-size: 0.9rem; text-transform: uppercase; color: #000; letter-spacing: -0.01em; }
    .partners-sep { width: 8px; height: 8px; background: var(--accent-r); border-radius: 50%; opacity: 0.2; }

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
    
    /* EVENT TAG CARD (Container styles) */
    .id-card-canonical {
      position: relative;
      margin: 0 auto;
      transition: transform 0.3s;
    }
    .id-card-canonical:hover { transform: translateY(-5px); }
    
    @media(max-width: 480px) {
      .vol-container { grid-template-columns: 1fr; }
      .id-card-canonical { width: 100% !important; height: auto !important; aspect-ratio: 380/560; }
    }
    /* ACADEMY STYLES */
    @media(max-width: 800px) {
      .academy-grid { grid-template-columns: 1fr !important; }
      .notes-grid { grid-template-columns: 1fr !important; }
    }
  `}</style>
)

/* ───────────────────────────────────────────
   NAVBAR
─────────────────────────────────────────── */
const Navbar = ({ onRegister, isMenuOpen, setIsMenuOpen, onViewChange, currentView, isRegistrationOpen }) => (
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
                        ['Schedule', 'Speakers', 'Club', 'Pitch', 'FTA', 'Event Tags', 'FAQs', 'Team'].map(l => (
                            l === 'Event Tags' || l === 'Pitch' || l === 'Club' || l === 'FTA' ? (
                                <a key={l} href="#" onClick={(e) => { e.preventDefault(); onViewChange(l === 'Pitch' ? 'pitch' : l === 'Club' ? 'founders' : l === 'FTA' ? 'techwaitlist' : 'event-tags'); }}>{l}</a>
                            ) : (
                                <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`}>{l}</a>
                            )
                        ))
                    ) : (
                        <a href="#" onClick={(e) => { e.preventDefault(); onViewChange('site'); }}>Home</a>
                    )}
                </nav>
            </div>

            <div className="nav-cta-pill" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button className="btn-nav" onClick={() => onRegister()}>{isRegistrationOpen ? 'Register Now' : 'Closed'}</button>
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
                    ['Schedule', 'Speakers', 'Club', 'Pitch', 'FTA', 'Event Tags', 'FAQs', 'Team'].map(l => (
                        l === 'Event Tags' || l === 'Pitch' || l === 'Club' || l === 'FTA' ? (
                            <a key={l} href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onViewChange(l === 'Pitch' ? 'pitch' : l === 'Club' ? 'founders' : l === 'FTA' ? 'techwaitlist' : 'event-tags'); }}>{l}</a>
                        ) : (
                            <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} onClick={() => setIsMenuOpen(false)}>{l}</a>
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
        { name: 'OOUtech Community', icon: <Cpu size={20} color="var(--accent-r)" /> },
        { name: 'OOU Web 3', icon: <Globe size={20} color="#3b82f6" /> },
        { name: 'OOU Official', icon: <Award size={20} color="#facc15" /> },
        { name: 'NACOS', icon: <Code2 size={20} color="#10b981" /> },
        { name: 'GDSC OOU', icon: <Rocket size={20} color="#f87171" /> },
        { name: 'OOU Innovators', icon: <Lightbulb size={20} color="#fbbf24" /> },
    ];

    const hasDynamic = dynamicPartners && dynamicPartners.length > 0;
    const partnersToRender = hasDynamic ? dynamicPartners : defaultPartners;

    // Duplicate the list 3 times to ensure no gaps even on huge screens
    const tripledPartners = [...partnersToRender, ...partnersToRender, ...partnersToRender];

    return (
        <section id="partners" className="partners-strip">
            <div className="container" style={{ textAlign: 'center' }}>
                <p className="partners-label">{hasDynamic ? 'Featured Partners & Sponsors' : 'Our Partners & Collaborators'}</p>
            </div>
            <div className="partners-carousel">
                <div className="partners-track">
                    {tripledPartners.map((p, i) => (
                        <div key={i} className="partner-logo-item">
                            <div className="partner-logo-box">
                                {hasDynamic ? (
                                    <img src={p.logo_url} alt={p.name} className="partner-logo-img" />
                                ) : (
                                    p.icon
                                )}
                            </div>
                            <span className="partner-name">{p.name}</span>
                        </div>
                    ))}
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
   EVENT TAGS
─────────────────────────────────────────── */
const EventTagCard = ({ name, ticketId, photo, cardRef }) => {
    // Geometric shapes for the background
    const GeometricPatterns = () => (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            {/* Top Right Triangle */}
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'var(--accent-r)', transform: 'rotate(15deg)', clipPath: 'polygon(0 0, 100% 0, 100% 100%)', opacity: 0.2 }} />
            {/* Bottom Left Circle */}
            <div style={{ position: 'absolute', bottom: '40px', left: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'var(--accent-r)', opacity: 0.15 }} />
            {/* Mid Right Square */}
            <div style={{ position: 'absolute', top: '40%', right: '10px', width: '40px', height: '40px', background: 'var(--accent-r)', transform: 'rotate(45deg)', opacity: 0.1 }} />
            {/* Dot Grid */}
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', opacity: 0.3 }}>
                {[...Array(9)].map((_, i) => (
                    <div key={i} style={{ display: 'inline-block', width: '4px', height: '4px', background: '#000', borderRadius: '50%', margin: '4px' }} />
                ))}
            </div>
            {/* Squiggle */}
            <svg style={{ position: 'absolute', top: '150px', left: '20px', opacity: 0.2 }} width="60" height="20" viewBox="0 0 60 20">
                <path d="M0 10 Q15 0 30 10 T60 10" fill="none" stroke="var(--accent-r)" strokeWidth="4" />
            </svg>
        </div>
    );

    const SplashDesign = ({ children }) => (
        <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem 2.5rem',
            minWidth: '220px',
            minHeight: '80px'
        }}>
            {/* Custom SVG Splash Background */}
            <svg style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%' }} viewBox="0 0 200 100" preserveAspectRatio="none">
                <path
                    d="M10,50 Q20,10 50,20 T100,10 T150,30 T190,50 T150,80 T100,90 T50,80 T10,50"
                    fill="var(--accent-r)"
                />
                <circle cx="20" cy="20" r="5" fill="var(--accent-r)" opacity="0.6" />
                <circle cx="180" cy="80" r="8" fill="var(--accent-r)" opacity="0.4" />
                <circle cx="160" cy="15" r="4" fill="var(--accent-r)" opacity="0.5" />
            </svg>
            <div style={{
                position: 'relative',
                zIndex: 1,
                color: '#fff',
                fontWeight: 950,
                fontSize: '1.3rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textAlign: 'center',
                lineHeight: 1
            }}>
                {children}
            </div>
        </div>
    );

    return (
        <div className="id-card-canonical" ref={cardRef} style={{
            width: '380px',
            height: '500px',
            background: '#fff',
            border: '2px solid #e2e8f0',
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            borderRadius: '0.5rem',
            position: 'relative'
        }}>
            <GeometricPatterns />

            {/* Header Area */}
            <div style={{ padding: '1rem 2rem 0.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--accent-r)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                        FUTURE TECH
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#000', opacity: 0.6 }}>
                        OOU CONFERENCE 2026
                    </div>
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#000', textAlign: 'right' }}>
                    27 MARCH <br /> 2026
                </div>
            </div>

            {/* Photo Area */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', padding: '0.8rem 0' }}>
                <div style={{
                    width: '140px',
                    height: '140px',
                    border: '8px solid #fff',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    background: '#f1f5f9',
                    zIndex: 2
                }}>
                    {photo ? (
                        <img src={photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Users size={100} color="#cbd5e1" />
                        </div>
                    )}
                </div>
            </div>

            {/* Info Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0.2rem 2rem 1rem', position: 'relative', zIndex: 1, justifyContent: 'space-between' }}>
                <div>
                    <div style={{ marginBottom: '0.8rem', display: 'flex', justifyContent: 'center' }}>
                        <SplashDesign>
                            I will be attending
                        </SplashDesign>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                            Attendee Name
                        </div>
                        <h2 style={{
                            fontSize: name && name.length > 20 ? '1.8rem' : '2.5rem',
                            fontWeight: 950,
                            color: '#1a1a1a',
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                            wordBreak: 'break-word',
                            maxWidth: '300px'
                        }}>
                            {name || "Your Name"}
                        </h2>
                    </div>
                </div>

                <div style={{
                    width: '100%',
                    borderTop: '2px dashed #e2e8f0',
                    paddingTop: '0.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div style={{ color: '#000', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                        Registration ID: <span style={{ color: 'var(--accent-r)' }}>#{ticketId || "OOU-2026"}</span>
                    </div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>
                        Olabisi Onabanjo University • Main Campus
                    </div>
                </div>
            </div>

            {/* Lanyard Cutout (Visual Only) */}
            <div style={{
                position: 'absolute',
                top: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '15px',
                background: '#e2e8f0',
                borderRadius: '5px'
            }} />
        </div>
    );
};

const EventTagsSection = ({ isOpen }) => {
    const [email, setEmail] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [attendee, setAttendee] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const cardRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleVerify = async () => {
        if (!email) return;
        setLoading(true);
        setError('');
        try {
            const { data, error: sbError } = await supabase
                .from('registrations')
                .select('name, ticket_id')
                .eq('email', email.trim().toLowerCase())
                .maybeSingle();

            if (sbError) throw sbError;

            if (data) {
                setAttendee(data);
                setIsVerified(true);
            } else {
                setError('Email not found or user not registered. Please ensure you use the email you registered with.');
            }
        } catch (err) {
            console.error('Verification error:', err);
            setError('An error occurred during verification. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPhoto(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleDownloadTag = async () => {
        if (!attendee) return;
        setIsDownloading(true);
        try {
            const node = cardRef.current;
            const dataUrl = await toPng(node, {
                quality: 1.0,
                pixelRatio: 2,
                backgroundColor: '#fff'
            });
            download(dataUrl, `OOU-Attendee-Tag-${attendee.name.replace(/\s+/g, '-')}.png`);
        } catch (err) {
            console.error('Download failed', err);
            alert("Failed to generate Tag. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    if (!isOpen) {
        return (
            <section className="vol-section" style={{ background: '#fff', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{
                        background: '#fef2f2',
                        border: '4px solid #dc2626',
                        padding: '4rem 2rem',
                        borderRadius: '3rem',
                        boxShadow: '12px 12px 0 #000',
                        maxWidth: '700px',
                        margin: '0 auto',
                        animation: 'fadeIn 0.5s ease-out'
                    }}>
                        <div style={{
                            background: '#dc2626',
                            color: '#fff',
                            display: 'inline-flex',
                            padding: '1rem',
                            borderRadius: '1.5rem',
                            marginBottom: '2rem',
                            animation: 'bounce 2s infinite'
                        }}>
                            <Zap size={48} />
                        </div>
                        <h2 style={{ fontFamily: 'Outfit', fontWeight: 950, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#000', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '-1px' }}>
                            Event Tags <br /><span style={{ color: '#dc2626' }}>Coming Soon</span>
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#4b5563', fontWeight: 600, maxWidth: '500px', margin: '0 auto 2.5rem' }}>
                            We are finalizing the attendee portal. Check back shortly to create your customized conference badge!
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <div style={{ background: '#000', color: '#fff', padding: '0.8rem 1.5rem', borderRadius: '1rem', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase' }}>
                                🚀 Stay Tuned
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="vol-section" style={{ background: '#fff' }}>
            <div className="container">
                <div className="section-header">
                    <p className="section-label">Show Your presence</p>
                    <h2 className="section-h2">Create Your Event Tag</h2>
                    <p>Enter your registered email to generate your custom "I will be attending" shoutout card.</p>
                </div>

                <div className="vol-container">
                    <div className="vol-form-card">
                        {!isVerified ? (
                            <div style={{ animation: 'fadeIn 0.5s ease' }}>
                                <div className="form-group">
                                    <label className="form-label">Registered Email</label>
                                    <input
                                        type="email"
                                        className="form-input"
                                        placeholder="e.g. john@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
                                    />
                                    {error && <p style={{ color: '#dc2626', marginTop: '0.75rem', fontSize: '0.85rem', fontWeight: 700 }}>{error}</p>}
                                </div>
                                <button
                                    className="btn-primary"
                                    onClick={handleVerify}
                                    disabled={loading}
                                    style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                                >
                                    {loading ? 'Verifying...' : 'Verify Registration'}
                                </button>
                            </div>
                        ) : (
                            <div style={{ animation: 'fadeIn 0.5s ease' }}>
                                <div style={{ background: '#f0fdf4', border: '2px solid #16a34a', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem' }}>
                                    <div style={{ color: '#16a34a', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Attendee Verified</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>{attendee.name}</div>
                                    <div style={{ fontSize: '0.9rem', color: '#15803d', fontWeight: 600 }}>ID: {attendee.ticket_id}</div>
                                </div>

                                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                    <label className="form-label">Step 2: Upload Your Photo</label>
                                    <div style={{
                                        border: photo ? '3px solid #16a34a' : '3px dashed #000',
                                        borderRadius: '1.5rem',
                                        padding: '2rem',
                                        textAlign: 'center',
                                        background: photo ? '#f0fdf4' : '#f8fafc',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            id="tag-photo-upload"
                                            style={{ display: 'none' }}
                                        />
                                        <label htmlFor="tag-photo-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
                                            <div style={{
                                                background: photo ? '#16a34a' : '#000',
                                                color: '#fff',
                                                padding: '1rem',
                                                borderRadius: '1rem',
                                                transition: 'background 0.3s'
                                            }}>
                                                {photo ? <CheckCircle size={24} /> : <CameraIcon size={24} />}
                                            </div>
                                            <span style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.85rem' }}>
                                                {photo ? 'Success! Change Photo?' : 'Click to Upload Profile Photo'}
                                            </span>
                                        </label>
                                    </div>
                                    {!photo && <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem', fontWeight: 600 }}>* You must upload a photo to enable the download button</p>}
                                </div>

                                <button
                                    className="btn-download"
                                    onClick={handleDownloadTag}
                                    disabled={isDownloading || !photo}
                                    style={{
                                        width: '100%',
                                        marginTop: '1.5rem',
                                        background: photo ? 'var(--accent-r)' : '#e2e8f0',
                                        color: photo ? '#fff' : '#94a3b8',
                                        boxShadow: (isDownloading || !photo) ? 'none' : '6px 6px 0 #000',
                                        opacity: isDownloading ? 0.7 : 1,
                                        cursor: photo ? 'pointer' : 'not-allowed',
                                        border: photo ? '3px solid #000' : '3px solid #cbd5e1',
                                        transform: photo && !isDownloading ? 'scale(1.02)' : 'scale(1)',
                                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                    }}
                                >
                                    {isDownloading ? (
                                        <>Generating PNG...</>
                                    ) : (
                                        <>
                                            <Download size={20} />
                                            <span style={{ marginLeft: '0.5rem' }}>{photo ? 'Download My Event Tag' : 'Upload Photo First'}</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={() => { setIsVerified(false); setAttendee(null); setPhoto(null); }}
                                    style={{ width: '100%', background: 'none', border: 'none', marginTop: '1rem', textDecoration: 'underline', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                                >
                                    Verify a different email
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="id-card-preview-wrap">
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontFamily: 'Outfit', fontWeight: 950, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '1.5rem', color: '#000', letterSpacing: '0.15em' }}>
                                SHOUTOUT PREVIEW
                            </p>
                            <EventTagCard name={attendee?.name} ticketId={attendee?.ticket_id} photo={photo} cardRef={cardRef} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


/* ───────────────────────────────────────────
   PITCH SECTION
─────────────────────────────────────────── */
const PitchSection = () => {
    const [formData, setFormData] = useState({ name: '', email: '', startup_name: '', category: 'Student Startup', pitch_description: '', whatsapp_number: '' });
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error: sbError } = await supabase
            .from('pitches')
            .insert([formData]);

        if (sbError) {
            console.error('Pitch submission error:', sbError);
            if (sbError.code === '42P01') {
                setError('Database Error: The "pitches" table does not exist. Please contact admin to run the SQL setup script.');
            } else {
                setError('Failed to submit pitch: ' + sbError.message);
            }
            setLoading(false);
            return;
        }

        setIsSubmitted(true);
        setLoading(false);
    };

    if (isSubmitted) {
        return (
            <section className="reg-section" style={{ background: '#fff', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{
                        background: '#f0fdf4',
                        border: '4px solid #16a34a',
                        padding: '4rem 2rem',
                        borderRadius: '3rem',
                        boxShadow: '12px 12px 0 #000',
                        maxWidth: '700px',
                        margin: '0 auto',
                        animation: 'fadeIn 0.5s ease-out'
                    }}>
                        <div style={{
                            background: '#16a34a',
                            color: '#fff',
                            display: 'inline-flex',
                            padding: '1rem',
                            borderRadius: '1.5rem',
                            marginBottom: '2rem'
                        }}>
                            <CheckCircle size={48} />
                        </div>
                        <h2 style={{ fontFamily: 'Outfit', fontWeight: 950, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#000', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '-1px' }}>
                            Pitch Received!
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#15803d', fontWeight: 600, maxWidth: '500px', margin: '0 auto 2.5rem' }}>
                            Thank you for sharing your vision with us. Our team will review your pitch and get back to you shortly.
                        </p>
                        <button className="btn-primary" onClick={() => window.location.reload()} style={{ margin: '0 auto' }}>
                            Return to Home
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="reg-section" style={{ background: '#fff' }}>
            <div className="container">
                <div className="section-header">
                    <p className="section-label">Future Builders</p>
                    <h2 className="section-h2">Startup Pitch</h2>
                    <p>Are you building the next big thing? Share your startup idea with us and get a chance to pitch to global investors.</p>
                </div>

                <div className="reg-container">
                    <div className="reg-card">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Your Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="e.g. Jane Doe"
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
                                    placeholder="e.g. jane@startup.com"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Startup / Company Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="e.g. FutureTech AI"
                                    required
                                    value={formData.startup_name}
                                    onChange={(e) => setFormData({ ...formData, startup_name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Student Startup">Student Startup</option>
                                    <option value="Company">Company</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Pitch Description</label>
                                <textarea
                                    className="form-input"
                                    placeholder="Briefly describe your startup and what problem it solves..."
                                    required
                                    style={{ minHeight: '150px', resize: 'vertical', paddingTop: '0.8rem' }}
                                    value={formData.pitch_description}
                                    onChange={(e) => setFormData({ ...formData, pitch_description: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">WhatsApp Number (Optional)</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="e.g. +234..."
                                    value={formData.whatsapp_number}
                                    onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                                />
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}>
                                {loading ? 'Submitting...' : 'Submit Pitch'}
                            </button>
                            {error && <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 700 }}>{error}</p>}
                        </form>
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
                <a href="mailto:ooufuturetech@gmail.com" className="btn-cta-outline" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Partner With Us</a>
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
                    <div className="footer-contact-item"><Mail size={15} /> ooufuturetech@gmail.com</div>
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
                    <span onClick={() => onViewChange('founders')}>Founders Club</span>
                    <span onClick={() => onAdmin('verify')}>Verification Portal</span>
                    <span onClick={() => onAdmin('admin')}>Admin Dashboard</span>
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
const RegisterModal = ({ isOpen, onClose, initialType, isRegistrationOpen }) => {
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
            if (sbError.code === '23505') {
                setError('This email is already registered. You can only claim one ticket.');
            } else {
                setError('Failed to save registration. Please check your connection or try again.');
            }
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
                        {!isRegistrationOpen ? (
                            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                                <div style={{ display: 'inline-flex', background: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', border: '3px solid #000' }}>
                                    <AlertCircle size={36} />
                                </div>
                                <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.8rem', marginBottom: '1rem' }}>Registrations Closed</h3>
                                <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                                    OOU Future Tech 2026 has successfully concluded! Ticket registrations and booth bookings are now closed. Thank you to all our attendees, speakers, and partners.
                                </p>
                                <button onClick={onClose} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                    Close Window
                                </button>
                            </div>
                        ) : (
                            <>
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
                    </>
                )}
            </div>
        </div>
    </div>
</div>
);
};

/* ───────────────────────────────────────────
   RECENT GRADES LIST (Admin helper)
─────────────────────────────────────────── */
const RecentGradesList = ({ selectedCohort, selectedTrack }) => {
    const [grades, setGrades] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(true);
        supabase.from('manual_grades').select('*')
            .eq('cohort', selectedCohort)
            .eq('track', selectedTrack)
            .order('graded_at', { ascending: false })
            .limit(20)
            .then(({ data }) => { setGrades(data || []); setLoading(false); });
    }, [selectedCohort, selectedTrack]);

    if (loading) return <div style={{ padding: '1rem', color: '#888', fontWeight: 700 }}>Loading grades...</div>;
    if (grades.length === 0) return <div style={{ padding: '1rem', color: '#888', fontWeight: 700, borderTop: '2px solid #eee' }}>No grades recorded for this cohort/track yet.</div>;

    return (
        <div style={{ borderTop: '2px solid #000', paddingTop: '1.5rem' }}>
            <h4 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.9rem', margin: '0 0 1rem 0', textTransform: 'uppercase' }}>Recent Grades ({grades.length})</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {grades.map(g => (
                    <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.7rem 0.8rem', border: '2px solid #eee', background: '#f8fafc' }}>
                        <div>
                            <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.85rem' }}>{g.student_name}</div>
                            <div style={{ fontSize: '0.65rem', color: '#888' }}>{g.student_email} · Module {g.module_index + 1}</div>
                            {g.feedback && <div style={{ fontSize: '0.65rem', color: '#555', fontStyle: 'italic', marginTop: '0.15rem' }}>"{g.feedback}"</div>}
                        </div>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #000',
                            background: g.score >= 70 ? '#22c55e' : g.score >= 50 ? '#f59e0b' : '#ef4444',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 950, fontSize: '0.7rem', color: '#fff', flexShrink: 0
                        }}>
                            {g.score}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ───────────────────────────────────────────
   ADMIN DASHBOARD
─────────────────────────────────────────── */
const AdminDashboard = ({ onBack, onRefresh, isRegistrationOpen, isEventTagsOpen, speakersMode, comingSoonText, dynamicSpeakers, dynamicTeam }) => {
    const [activeTab, setActiveTab] = useState('standard'); // 'standard', 'pro', 'partners', 'speakers', 'team', 'settings', 'techwaitlist'
    const [partners, setPartners] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [pitches, setPitches] = useState([]);
    const [founders, setFounders] = useState([]);
    const [waitlist, setWaitlist] = useState([]);
    const [waitlistSearch, setWaitlistSearch] = useState('');
    const [waitlistFilter, setWaitlistFilter] = useState('all'); // 'all' | 'test_done' | 'admitted'
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmingPitch, setConfirmingPitch] = useState(null); // { id, status }

    const COHORTS = ['Cohort 1', 'Cohort 2', 'Cohort 3', 'Cohort 4', 'Cohort 5'];

    // Form states for adding content
    const [newSpeaker, setNewSpeaker] = useState({ name: '', role: '', expertise: '', image_url: '', bg_class: 'speaker-img-bg-1' });
    const [newPartner, setNewPartner] = useState({ name: '', logo_url: '' });
    const [newMember, setNewMember] = useState({ name: '', role: '', bio: '', image_url: '' });
    const [uploading, setUploading] = useState(false);
    const [totalStats, setTotalStats] = useState({ total: 0, standard: 0, pro: 0, pitches: 0 });

    // FTA Control panel states — must be declared unconditionally (Rules of Hooks)
    const [ftaTab, setFtaTab] = useState('cohort');
    const [selectedCohortAdmin, setSelectedCohortAdmin] = useState('Cohort 1');
    const [selectedTrackAdmin, setSelectedTrackAdmin] = useState('Frontend Engineering');
    const [cohortLocks, setCohortLocks] = useState(() => JSON.parse(localStorage.getItem('fta-cohort-locks') || '{}'));
    const [notifTitle, setNotifTitle] = useState('');
    const [notifBody, setNotifBody] = useState('');
    const [releasedModules, setReleasedModules] = useState([]);
    const [customModules, setCustomModules] = useState([]);
    const [newModuleForm, setNewModuleForm] = useState({ title: '', description: '', lessons: [] });
    const [newLessonInput, setNewLessonInput] = useState({ title: '', videoUrl: '', notes: '' });
    const [peerGroups, setPeerGroups] = useState([]);
    const [peerTaskDesc, setPeerTaskDesc] = useState('');
    const [peerSubmitPrompt, setPeerSubmitPrompt] = useState('');
    const [peerDeadline, setPeerDeadline] = useState('');
    const [mergeLoading, setMergeLoading] = useState(false);
    const [adminPeerSubmissions, setAdminPeerSubmissions] = useState([]);
    const [expandedSubmission, setExpandedSubmission] = useState(null);
    const [selectedCohortView, setSelectedCohortView] = useState('Cohort 1');
    const [cohortStudents, setCohortStudents] = useState([]);
    const [cohortStudentsLoading, setCohortStudentsLoading] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [leaderboardLoading, setLeaderboardLoading] = useState(false);
    const [portalDates, setPortalDates] = useState(() => {
        try { return JSON.parse(localStorage.getItem('fta-portal-dates') || '{}'); } catch { return {}; }
    });

    // Manual candidate add state
    const [showManualAddForm, setShowManualAddForm] = useState(false);
    const [manualCandidate, setManualCandidate] = useState({
        name: '',
        email: '',
        phone: '',
        course: 'Frontend Engineering',
        action: 'send_test_invite'
    });
    const [manualSubmitting, setManualSubmitting] = useState(false);

    const handleManualAddCandidate = async (e) => {
        e.preventDefault();
        if (!manualCandidate.name.trim() || !manualCandidate.email.trim()) {
            alert('Please provide candidate full name and email address.');
            return;
        }

        const cleanEmail = manualCandidate.email.toLowerCase().trim();
        const cleanName = manualCandidate.name.trim();
        const cleanPhone = manualCandidate.phone.trim();
        const cleanCourse = manualCandidate.course;

        setManualSubmitting(true);
        try {
            const existing = waitlist.find(w => w.email?.toLowerCase().trim() === cleanEmail);
            let existingProducts = {};
            if (existing) {
                try { existingProducts = typeof existing.products === 'string' ? JSON.parse(existing.products) : (existing.products || {}); } catch (e) { }
            }

            const isTestInvite = manualCandidate.action === 'send_test_invite';
            const isAdmission = manualCandidate.action === 'send_admission';
            const isPaymentLink = manualCandidate.action === 'send_payment_link';

            const updatedProducts = JSON.stringify({
                ...existingProducts,
                level: existingProducts.level || 'Beginner',
                admitted: isAdmission ? true : (existingProducts.admitted || false),
                rejected: false,
                test_invited: isTestInvite ? true : (existingProducts.test_invited || false),
                test_invited_date: isTestInvite ? new Date().toISOString() : (existingProducts.test_invited_date || null),
                payment_link_sent: isPaymentLink ? true : (existingProducts.payment_link_sent || false),
                payment_link_date: isPaymentLink ? new Date().toISOString() : (existingProducts.payment_link_date || null),
                cohort: isAdmission ? 'Cohort 1' : (existingProducts.cohort || 'Cohort 1')
            });

            if (existing) {
                const { error: updateErr } = await supabase
                    .from('registrations')
                    .update({
                        name: cleanName,
                        company_name: cleanCourse,
                        whatsapp_number: cleanPhone || existing.whatsapp_number || '',
                        products: updatedProducts
                    })
                    .eq('id', existing.id);
                if (updateErr) throw updateErr;
            } else {
                const generatedTicketId = `#OOU-EDU-${Math.floor(10000 + Math.random() * 90000)}`;
                const { error: insertErr } = await supabase
                    .from('registrations')
                    .insert([{
                        name: cleanName,
                        email: cleanEmail,
                        ticket_id: generatedTicketId,
                        company_name: cleanCourse,
                        whatsapp_number: cleanPhone,
                        ticket_type: `tech_waitlist_${cleanCourse.toLowerCase().replace(/\s+/g, '_')}`,
                        products: updatedProducts
                    }]);

                if (insertErr) throw insertErr;
            }

            let emailSuccess = false;
            if (isTestInvite) {
                try {
                    const res = await fetch('/api/send-test-invite', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: cleanEmail,
                            name: cleanName,
                            course: cleanCourse
                        })
                    });
                    if (res.ok) emailSuccess = true;
                } catch (err) {
                    console.warn('Manual test invite email error:', err);
                }
            } else if (isAdmission) {
                try {
                    const res = await fetch('/api/send-admission', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: cleanEmail,
                            name: cleanName,
                            course: cleanCourse,
                            portalOpenDate: portalDates?.['Cohort 1'] || ''
                        })
                    });
                    if (res.ok) emailSuccess = true;
                } catch (err) {
                    console.warn('Manual admission email error:', err);
                }
            } else if (isPaymentLink) {
                try {
                    const res = await fetch('/api/send-payment-link', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: cleanEmail,
                            name: cleanName,
                            course: cleanCourse
                        })
                    });
                    if (res.ok) emailSuccess = true;
                } catch (err) {
                    console.warn('Manual payment link email error:', err);
                }
            }

            if (isTestInvite) {
                if (emailSuccess) alert(`✅ ${cleanName} registered & Screening Test Invitation email sent to ${cleanEmail}!`);
                else alert(`✅ ${cleanName} registered.\n\n⚠️ Email failed to send. Check EMAIL_USER and EMAIL_PASS on Vercel.`);
            } else if (isAdmission) {
                if (emailSuccess) alert(`✅ ${cleanName} admitted & Admission Email sent to ${cleanEmail}!`);
                else alert(`✅ ${cleanName} admitted.\n\n⚠️ Email failed to send. Check EMAIL_USER and EMAIL_PASS on Vercel.`);
            } else if (isPaymentLink) {
                if (emailSuccess) alert(`✅ ₦10,000 Payment Request email successfully sent to ${cleanEmail}!`);
                else alert(`✅ ${cleanName} saved.\n\n⚠️ Payment email failed to send. Check EMAIL_USER and EMAIL_PASS on Vercel.`);
            } else {
                alert(`✅ ${cleanName} added to waitlist successfully!`);
            }

            setManualCandidate({
                name: '',
                email: '',
                phone: '',
                course: 'Frontend Engineering',
                action: 'send_test_invite'
            });
            setShowManualAddForm(false);
            fetchWaitlist();
        } catch (err) {
            console.error('Error adding candidate manually:', err);
            alert(`Failed to add candidate: ${err.message}`);
        }
        setManualSubmitting(false);
    };

    const [sendingBulkReminders, setSendingBulkReminders] = useState(false);

    const handleBulkSendTestReminders = async () => {
        const candidatesToInvite = waitlist.filter(w => {
            try {
                const p = typeof w.products === 'string' ? JSON.parse(w.products) : (w.products || {});
                return !p.test_done && !p.admitted && !p.rejected;
            } catch (e) { return false; }
        });

        if (candidatesToInvite.length === 0) {
            alert('There are currently no candidates pending screening test!');
            return;
        }

        if (!confirm(`Are you sure you want to send screening test reminder emails to all ${candidatesToInvite.length} candidate(s) who haven't taken the test yet?`)) {
            return;
        }

        setSendingBulkReminders(true);
        let successCount = 0;
        let failCount = 0;

        for (const w of candidatesToInvite) {
            let parsedProducts = {};
            try { parsedProducts = typeof w.products === 'string' ? JSON.parse(w.products) : (w.products || {}); } catch (e) { }

            try {
                const updatedProducts = JSON.stringify({
                    ...parsedProducts,
                    test_invited: true,
                    test_reminder_date: new Date().toISOString()
                });

                await supabase
                    .from('registrations')
                    .update({ products: updatedProducts })
                    .eq('id', w.id);

                const res = await fetch('/api/send-test-reminder', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: w.email,
                        name: w.name,
                        course: w.company_name || 'Frontend Engineering'
                    })
                });

                if (res.ok) successCount++;
                else failCount++;
            } catch (err) {
                console.warn(`Error sending reminder to ${w.email}:`, err);
                failCount++;
            }
        }

        setSendingBulkReminders(false);
        alert(`📢 Bulk Reminder Dispatch Finished!\n\n✅ Successfully sent: ${successCount} emails\n❌ Failed: ${failCount} emails`);
        fetchWaitlist();
    };

    useEffect(() => {
        fetchRegistrations();
        fetchPitches();
        fetchPartners();
        fetchFounders();
        fetchWaitlist();
        fetchReleasedModules();
        supabase.from('custom_modules').select('*').order('order_index').then(({ data }) => {
            if (data) setCustomModules(data);
        });
        fetchPeerGroups();
        fetchAdminPeerSubmissions();
        fetchCohortStudents(selectedCohortView);
        supabase.from('site_settings').select('*').eq('key', 'portal_dates').maybeSingle().then(({ data }) => {
            if (data && data.value) {
                try {
                    const parsed = JSON.parse(data.value);
                    setPortalDates(parsed);
                    localStorage.setItem('fta-portal-dates', data.value);
                } catch {}
            }
        });
    }, []);

    const fetchPeerGroups = async () => {
        const { data } = await supabase.from('peer_groups').select('*').order('group_number');
        if (data) setPeerGroups(data);
    };

    const fetchAdminPeerSubmissions = async () => {
        const { data } = await supabase.from('peer_submissions').select('*').order('created_at', { ascending: false });
        if (data) setAdminPeerSubmissions(data);
    };

    const fetchCohortStudents = async (cohort) => {
        setCohortStudentsLoading(true);
        const { data } = await supabase.from('registrations').select('*').eq('cohort', cohort).like('ticket_type', 'tech_waitlist_%').order('created_at', { ascending: false });
        setCohortStudents(data || []);
        setCohortStudentsLoading(false);
    };

    const fetchLeaderboard = async (cohort) => {
        setLeaderboardLoading(true);
        // Get all students in this cohort
        const { data: students } = await supabase.from('registrations').select('*').eq('cohort', cohort).like('ticket_type', 'tech_waitlist_%');
        // Get all manual grades for this cohort
        const { data: grades } = await supabase.from('manual_grades').select('*').eq('cohort', cohort);
        // Get all peer submissions for this cohort
        const { data: submissions } = await supabase.from('peer_submissions').select('*').eq('cohort', cohort);

        const studentList = students || [];
        const gradeList = grades || [];
        const submissionList = submissions || [];

        // Build leaderboard per student
        const leaderboard = studentList.map(s => {
            const studentGrades = gradeList.filter(g => g.student_email === s.email);
            const studentSubmissions = submissionList.filter(sub => sub.submitter_email === s.email);

            const totalScore = studentGrades.length > 0
                ? Math.round(studentGrades.reduce((a, g) => a + g.score, 0) / studentGrades.length)
                : 0;
            const modulesGraded = studentGrades.length;
            const passed = studentGrades.filter(g => g.score >= 50).length;
            const track = s.company_name || '—';

            return {
                name: s.name,
                email: s.email,
                track,
                cohort,
                avg: totalScore,
                modulesGraded,
                passed,
                submissions: studentSubmissions.length
            };
        }).sort((a, b) => b.passed - a.passed || b.avg - a.avg);

        setLeaderboardData(leaderboard);
        setLeaderboardLoading(false);
    };

    const handleAutoMergePeers = async () => {
        setMergeLoading(true);
        try {
            // Get all students for selected track from waitlist
            const { data: students, error } = await supabase
                .from('registrations')
                .select('*')
                .like('ticket_type', 'tech_waitlist_%')
                .eq('company_name', selectedTrackAdmin);

            if (error || !students || students.length === 0) {
                alert('No students found for this track.');
                setMergeLoading(false);
                return;
            }

            // Filter to only admitted students (products JSON has admitted: true)
            const admittedStudents = students.filter(s => {
                try {
                    const parsed = JSON.parse(s.products);
                    return parsed && parsed.admitted === true;
                } catch { return false; }
            });

            if (admittedStudents.length === 0) {
                alert('No admitted students found for this track. Admit students first.');
                setMergeLoading(false);
                return;
            }

            // Delete existing groups for this cohort+track+module
            const moduleIdx = parseInt(document.getElementById('merge-module-index')?.value || '0');
            await supabase.from('peer_groups').delete()
                .eq('cohort', selectedCohortAdmin)
                .eq('track', selectedTrackAdmin)
                .eq('module_index', moduleIdx);

            // Shuffle students
            const shuffled = [...admittedStudents].sort(() => Math.random() - 0.5);

            // Create groups of 2
            const groups = [];
            let groupNum = 1;
            const deadlineISO = peerDeadline ? new Date(peerDeadline).toISOString() : null;
            for (let i = 0; i < shuffled.length; i += 2) {
                if (i + 1 < shuffled.length) {
                    // Pair
                    groups.push({
                        cohort: selectedCohortAdmin,
                        track: selectedTrackAdmin,
                        module_index: moduleIdx,
                        group_number: groupNum,
                        members: [
                            { email: shuffled[i].email, name: shuffled[i].name, number: groupNum },
                            { email: shuffled[i + 1].email, name: shuffled[i + 1].name, number: groupNum }
                        ],
                        is_unpaired: false,
                        task_description: peerTaskDesc,
                        submission_prompt: peerSubmitPrompt,
                        deadline: deadlineISO
                    });
                    groupNum++;
                } else {
                    // Unpaired (odd one out)
                    groups.push({
                        cohort: selectedCohortAdmin,
                        track: selectedTrackAdmin,
                        module_index: moduleIdx,
                        group_number: groupNum,
                        members: [
                            { email: shuffled[i].email, name: shuffled[i].name, number: null }
                        ],
                        is_unpaired: true,
                        task_description: peerTaskDesc,
                        submission_prompt: peerSubmitPrompt,
                        deadline: deadlineISO
                    });
                }
            }

            const { error: insertError } = await supabase.from('peer_groups').insert(groups);
            if (insertError) { alert('Error: ' + insertError.message); return; }

            await fetchPeerGroups();
            alert(`Merged ${shuffled.length} students into ${groups.length} group(s).`);
        } catch (err) {
            alert('Error merging: ' + err.message);
        }
        setMergeLoading(false);
    };

    const fetchReleasedModules = async () => {
        const { data, error } = await supabase.from('module_releases').select('*').order('module_index', { ascending: true });
        if (!error && data) setReleasedModules(data);
    };

    const isModuleReleased = (cohort, track, modIdx) => {
        return releasedModules.some(r => r.cohort === cohort && r.track === track && r.module_index === modIdx);
    };

    const toggleModuleRelease = async (cohort, track, modIdx) => {
        const released = isModuleReleased(cohort, track, modIdx);
        if (released) {
            const { error } = await supabase.from('module_releases').delete().eq('cohort', cohort).eq('track', track).eq('module_index', modIdx);
            if (!error) {
                setReleasedModules(prev => prev.filter(r => !(r.cohort === cohort && r.track === track && r.module_index === modIdx)));
                alert(`Module ${modIdx + 1} unreleased from ${cohort} — ${track}`);
            }
        } else {
            const { error } = await supabase.from('module_releases').insert([{ cohort, track, module_index: modIdx }]);
            if (!error) {
                setReleasedModules(prev => [...prev, { cohort, track, module_index: modIdx, released_at: new Date().toISOString() }]);
                alert(`✅ Module ${modIdx + 1} released to ${cohort} — ${track}`);
            }
        }
    };

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

        // Fetch accurate counts directly from DB to bypass 1000 row limit
        try {
            const [
                { count: total },
                { count: standard },
                { count: pro },
                { count: pitchCount }
            ] = await Promise.all([
                supabase.from('registrations').select('*', { count: 'exact', head: true }),
                supabase.from('registrations').select('*', { count: 'exact', head: true }).eq('ticket_type', 'Standard'),
                supabase.from('registrations').select('*', { count: 'exact', head: true }).eq('ticket_type', 'Pro'),
                supabase.from('pitches').select('*', { count: 'exact', head: true })
            ]);

            setTotalStats({ total: total || 0, standard: standard || 0, pro: pro || 0, pitches: pitchCount || 0 });
        } catch (err) {
            console.error('Error fetching stats:', err);
        }

        const { data, error } = await supabase
            .from('registrations')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) {
            setRegistrations(data);
        }
        setLoading(false);
    };

    const fetchFounders = async () => {
        const { data, error } = await supabase
            .from('founders_applications')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) {
            setFounders(data);
        } else {
            console.error('Error fetching founders:', error);
        }
    };

    const fetchWaitlist = async () => {
        const { data, error } = await supabase
            .from('registrations')
            .select('*')
            .like('ticket_type', 'tech_waitlist_%')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setWaitlist(data);
        } else if (error) {
            console.error('Error fetching tech waitlist:', error);
        }
    };

    const handleDeleteWaitlistEntry = async (id) => {
        if (confirm('Remove this person from the Future Tech Academy (FTA) waitlist?')) {
            const { error } = await supabase.from('registrations').delete().eq('id', id);
            if (!error) fetchWaitlist();
            else alert('Error removing entry: ' + error.message);
        }
    };

    const fetchPitches = async () => {
        const { data, error } = await supabase
            .from('pitches')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) {
            setPitches(data);
        } else {
            console.error('Error fetching pitches:', error);
        }
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

    const handleDeletePitch = async (id) => {
        if (confirm('Are you sure you want to delete this pitch?')) {
            const { error } = await supabase
                .from('pitches')
                .delete()
                .eq('id', id);

            if (!error) {
                fetchPitches();
                fetchRegistrations(); // Refresh counts
            } else {
                alert('Error deleting pitch: ' + error.message);
            }
        }
    };

    const handleTriggerMatching = async () => {
        setLoading(true);
        try {
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiBase = isLocal ? `http://${window.location.hostname}:3001` : '';
            
            const response = await fetch(`${apiBase}/api/founders/match`, { method: 'POST' });
            const result = await response.json();
            
            if (result.success) {
                alert(`Matching complete! ${result.matches_found} new matches found and notified.`);
                fetchFounders();
            } else {
                alert(result.message || 'No new matches found.');
            }
        } catch (err) {
            alert('Error running matching algorithm.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteFounderApp = async (id) => {
        if (confirm('Delete this application?')) {
            const { error } = await supabase.from('founders_applications').delete().eq('id', id);
            if (!error) fetchFounders();
        }
    };

    const handlePitchStatusUpdate = async (pitch, newStatus) => {
        const originalPitches = [...pitches];
        setPitches(prev => prev.map(p => p.id === pitch.id ? { ...p, status: newStatus } : p));
        
        setLoading(true);
        try {
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiBase = isLocal ? `http://${window.location.hostname}:3001` : '';
            
            const response = await fetch(`${apiBase}/api/update-pitch-status-direct`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: pitch.id,
                    status: newStatus
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                setPitches(originalPitches);
                alert(`Failed to update status: ${errorData.error || 'Server error'}`);
            } else {
                alert(`Pitch status successfully updated to ${newStatus.toUpperCase()}! (No email sent)`);
            }
        } catch (err) {
            setPitches(originalPitches);
            alert('Could not reach the email server. Please ensure "node server/index.js" is running on port 3001.');
        } finally {
            setLoading(false);
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

    const toggleEventTags = async () => {
        const newValue = !isEventTagsOpen;
        const { error } = await supabase
            .from('site_settings')
            .upsert({ key: 'event_tags_open', value: newValue.toString(), updated_at: new Date() });

        if (!error) onRefresh();
        else alert('Failed to update Event Tags settings.');
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
        } else {
            console.error('Partner error:', error);
            alert('Error adding partner. Please ensure the "partners" table exists in your Supabase database.');
        }
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
        total: Math.max(registrations.length, totalStats.total),
        standard: Math.max(registrations.filter(r => r.ticket_type === 'Standard').length, totalStats.standard),
        pro: Math.max(registrations.filter(r => r.ticket_type === 'Pro').length, totalStats.pro)
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
                    <TabButton id="founders" label="Founders Club" icon={Rocket} />
                    <TabButton id="pitches" label="Pitches" icon={Rocket} />
                    <TabButton id="techwaitlist" label="Tech Waitlist" icon={Terminal} />
                    <TabButton id="partners" label="Partners CMS" icon={Store} />
                    <TabButton id="speakers" label="Speakers CMS" icon={Mic} />
                    <TabButton id="team" label="Team CMS" icon={Users} />
                    <TabButton id="fta-control" label="FTA Control" icon={BookOpen} />
                    <TabButton id="settings" label="Site Controls" icon={Zap} />
                </div>

                {(activeTab === 'standard' || activeTab === 'pro') && (
                    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                            {[
                                { label: 'Total Registrations', val: stats.total, color: 'var(--accent-r)' },
                                { label: 'Standard Passes', val: stats.standard, color: '#000' },
                                { label: 'Stand Requests', val: stats.pro, color: '#fff', bg: '#000' },
                                { label: 'Pitches', val: totalStats.pitches, color: 'var(--accent-r)' }
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

                {activeTab === 'founders' && (
                    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.5rem', margin: 0 }}>Founders Connect Applications</h2>
                            <button 
                                onClick={handleTriggerMatching}
                                disabled={loading}
                                className="btn-nav" 
                                style={{ padding: '0.8rem 1.5rem', borderRadius: '1rem', background: 'var(--accent-r)', fontSize: '0.8rem' }}
                            >
                                🤖 RUN MATCHING ENGINE
                            </button>
                        </div>

                        <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '2rem', padding: '2rem', boxShadow: '8px 8px 0 #000' }}>
                            {loading && founders.length === 0 ? (
                                <p style={{ textAlign: 'center', fontWeight: 700 }}>Fetching applications...</p>
                            ) : (
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ textAlign: 'left', borderBottom: '3px solid #000' }}>
                                                <th style={{ padding: '1rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Applicant</th>
                                                <th style={{ padding: '1rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>AI Insight</th>
                                                <th style={{ padding: '1rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Scores</th>
                                                <th style={{ padding: '1rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Status</th>
                                                <th style={{ padding: '1rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {founders.length === 0 ? (
                                                <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>No applications found.</td></tr>
                                            ) : (
                                                founders.map((f, i) => (
                                                    <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                                        <td style={{ padding: '1rem' }}>
                                                            <div style={{ fontWeight: 900 }}>{f.name}</div>
                                                            <div style={{ fontSize: '0.75rem', color: '#71717a' }}>{f.email}</div>
                                                            <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--accent-r)', textTransform: 'uppercase', marginTop: '0.4rem' }}>{f.user_type}</div>
                                                        </td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{f.ai_industry || 'N/A'}</div>
                                                            <div style={{ fontSize: '0.7rem', color: '#71717a' }}>Complexity: <span style={{ fontWeight: 900, color: '#000' }}>{f.ai_complexity || 'N/A'}</span></div>
                                                            {f.ai_summary && <div style={{ fontSize: '0.65rem', fontStyle: 'italic', color: '#64748b', marginTop: '0.4rem', maxWidth: '200px' }}>"{f.ai_summary}"</div>}
                                                        </td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <div style={{ fontSize: '0.7rem', color: '#71717a' }}>Seriousness: <span style={{ fontWeight: 900, color: (f.ai_seriousness || 0) > 70 ? '#16a34a' : '#000' }}>{f.ai_seriousness || 0}%</span></div>
                                                            <div style={{ fontSize: '0.7rem', color: '#71717a' }}>Experience: <span style={{ fontWeight: 900, color: (f.ai_experience || 0) > 70 ? '#16a34a' : '#000' }}>{f.ai_experience || 0}%</span></div>
                                                        </td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <span style={{
                                                                padding: '0.3rem 0.8rem',
                                                                borderRadius: '2rem',
                                                                fontSize: '0.65rem',
                                                                fontWeight: 900,
                                                                textTransform: 'uppercase',
                                                                background: f.status === 'matched' ? '#dcfce7' : f.status === 'rejected' ? '#fee2e2' : '#f1f5f9',
                                                                color: f.status === 'matched' ? '#166534' : f.status === 'rejected' ? '#991b1b' : '#475569',
                                                                border: `1px solid ${f.status === 'matched' ? '#166534' : f.status === 'rejected' ? '#991b1b' : '#475569'}`
                                                            }}>
                                                                {f.status || 'searching'}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                                <button
                                                                    onClick={() => handleDeleteFounderApp(f.id)}
                                                                    style={{ padding: '0.4rem', background: '#fee2e2', color: '#dc2626', border: '2px solid #000', borderRadius: '0.5rem', cursor: 'pointer' }}
                                                                    title="Delete Application"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'techwaitlist' && (() => {
                    const pendingTestCount = waitlist.filter(w => {
                        try {
                            const p = typeof w.products === 'string' ? JSON.parse(w.products) : (w.products || {});
                            return !p.test_done && !p.admitted && !p.rejected;
                        } catch (e) { return false; }
                    }).length;

                    const pendingPaymentCount = waitlist.filter(w => {
                        try {
                            const p = typeof w.products === 'string' ? JSON.parse(w.products) : (w.products || {});
                            return (p.test_done || p.admitted) && !p.paid && !p.rejected;
                        } catch (e) { return false; }
                    }).length;

                    return (
                    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.5rem', margin: 0 }}>Future Tech Academy (FTA) Waitlist</h2>
                                <p style={{ color: '#71717a', fontSize: '0.85rem', marginTop: '0.3rem' }}>{waitlist.length} person{waitlist.length !== 1 ? 's' : ''} registered</p>
                            </div>
                            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                <button
                                    onClick={async () => {
                                        const eligible = waitlist.filter(w => {
                                            try {
                                                const p = typeof w.products === 'string' ? JSON.parse(w.products) : (w.products || {});
                                                return (p.test_done || p.admitted) && !p.paid && !p.rejected;
                                            } catch (e) { return false; }
                                        });

                                        if (eligible.length === 0) {
                                            alert('No candidates waiting to receive course fee payment links.');
                                            return;
                                        }

                                        if (!confirm(`Send ₦10,000 course commitment fee payment link emails to ALL ${eligible.length} test-passed/admitted candidate(s)?`)) {
                                            return;
                                        }

                                        setSendingBulkReminders(true);
                                        let successCount = 0;
                                        let failCount = 0;

                                        for (const w of eligible) {
                                            let parsedProducts = {};
                                            try { parsedProducts = typeof w.products === 'string' ? JSON.parse(w.products) : (w.products || {}); } catch (e) { }

                                            try {
                                                const updatedProducts = JSON.stringify({
                                                    ...parsedProducts,
                                                    payment_link_sent: true,
                                                    payment_link_date: new Date().toISOString()
                                                });
                                                await supabase.from('registrations').update({ products: updatedProducts }).eq('id', w.id);

                                                const response = await fetch('/api/send-payment-link', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        email: w.email,
                                                        name: w.name,
                                                        course: w.company_name || 'Frontend Engineering'
                                                    })
                                                });

                                                if (response.ok) successCount++;
                                                else failCount++;
                                            } catch (err) { failCount++; }
                                        }

                                        setSendingBulkReminders(false);
                                        alert(`🎉 Bulk Payment Links Dispatch Complete!\n\n✅ Emailed successfully: ${successCount}\n⚠️ Failed: ${failCount}`);
                                        fetchWaitlist();
                                    }}
                                    disabled={sendingBulkReminders || pendingPaymentCount === 0}
                                    style={{
                                        background: '#16a34a',
                                        color: '#ffffff',
                                        border: '3px solid #000',
                                        padding: '0.7rem 1.4rem',
                                        fontFamily: 'Outfit, sans-serif',
                                        fontWeight: 900,
                                        fontSize: '0.82rem',
                                        textTransform: 'uppercase',
                                        cursor: (sendingBulkReminders || pendingPaymentCount === 0) ? 'not-allowed' : 'pointer',
                                        boxShadow: '3px 3px 0 #000',
                                        opacity: pendingPaymentCount === 0 ? 0.6 : 1
                                    }}
                                >
                                    {sendingBulkReminders ? '⌛ Sending Pay Links...' : `💳 Send Pay Links (₦10k) (${pendingPaymentCount})`}
                                </button>

                                <button
                                    onClick={handleBulkSendTestReminders}
                                    disabled={sendingBulkReminders || pendingTestCount === 0}
                                    style={{
                                        background: '#f59e0b',
                                        color: '#000',
                                        border: '3px solid #000',
                                        padding: '0.7rem 1.4rem',
                                        fontFamily: 'Outfit, sans-serif',
                                        fontWeight: 900,
                                        fontSize: '0.82rem',
                                        textTransform: 'uppercase',
                                        cursor: (sendingBulkReminders || pendingTestCount === 0) ? 'not-allowed' : 'pointer',
                                        boxShadow: '3px 3px 0 #000',
                                        opacity: pendingTestCount === 0 ? 0.6 : 1
                                    }}
                                >
                                    {sendingBulkReminders ? '⌛ Sending Reminders...' : `📢 Remind Untaken Candidates (${pendingTestCount})`}
                                </button>

                                <button
                                    onClick={() => setShowManualAddForm(!showManualAddForm)}
                                    style={{
                                        background: 'var(--accent-r)',
                                        color: '#fff',
                                        border: '3px solid #000',
                                        padding: '0.7rem 1.4rem',
                                        fontFamily: 'Outfit, sans-serif',
                                        fontWeight: 900,
                                        fontSize: '0.82rem',
                                        textTransform: 'uppercase',
                                        cursor: 'pointer',
                                        boxShadow: '3px 3px 0 #000'
                                    }}
                                >
                                    {showManualAddForm ? '✕ Close Form' : '➕ Manual Add & Invite Candidate'}
                                </button>

                                <button
                                    onClick={fetchWaitlist}
                                    className="btn-outline"
                                    style={{ padding: '0.7rem 1.4rem', fontSize: '0.8rem', borderRadius: '1rem' }}
                                >
                                    ↺ Refresh
                                </button>
                            </div>
                        </div>

                        {/* Manual Candidate Form Card */}
                        {showManualAddForm && (
                            <div style={{
                                background: '#fffbeb',
                                border: '4px solid #000000',
                                borderRadius: '1rem',
                                padding: '1.8rem',
                                marginBottom: '2rem',
                                boxShadow: '6px 6px 0 #000000',
                                animation: 'fadeIn 0.2s ease-out'
                            }}>
                                <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.2rem', marginTop: 0, marginBottom: '0.5rem', color: '#92400e' }}>
                                    ➕ Manually Add Candidate & Send Invite Email
                                </h3>
                                <p style={{ fontSize: '0.85rem', color: '#78350f', marginBottom: '1.5rem' }}>
                                    Enter candidate credentials and select their course track to register them and send a test invitation or admission email directly.
                                </p>

                                <form onSubmit={handleManualAddCandidate}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.4rem', color: '#000' }}>Full Name *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. John Doe"
                                                value={manualCandidate.name}
                                                onChange={e => setManualCandidate({ ...manualCandidate, name: e.target.value })}
                                                style={{ width: '100%', padding: '0.75rem', border: '2.5px solid #000', borderRadius: '0.5rem', fontFamily: 'Inter', fontWeight: 600, fontSize: '0.9rem', boxSizing: 'border-box' }}
                                            />
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.4rem', color: '#000' }}>Email Address *</label>
                                            <input
                                                type="email"
                                                required
                                                placeholder="e.g. candidate@gmail.com"
                                                value={manualCandidate.email}
                                                onChange={e => setManualCandidate({ ...manualCandidate, email: e.target.value })}
                                                style={{ width: '100%', padding: '0.75rem', border: '2.5px solid #000', borderRadius: '0.5rem', fontFamily: 'Inter', fontWeight: 600, fontSize: '0.9rem', boxSizing: 'border-box' }}
                                            />
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.4rem', color: '#000' }}>WhatsApp Number (Optional)</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. +2348123456789"
                                                value={manualCandidate.phone}
                                                onChange={e => setManualCandidate({ ...manualCandidate, phone: e.target.value })}
                                                style={{ width: '100%', padding: '0.75rem', border: '2.5px solid #000', borderRadius: '0.5rem', fontFamily: 'Inter', fontWeight: 600, fontSize: '0.9rem', boxSizing: 'border-box' }}
                                            />
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.4rem', color: '#000' }}>Course Track *</label>
                                            <select
                                                value={manualCandidate.course}
                                                onChange={e => setManualCandidate({ ...manualCandidate, course: e.target.value })}
                                                style={{ width: '100%', padding: '0.75rem', border: '2.5px solid #000', borderRadius: '0.5rem', fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.9rem', background: '#fff', boxSizing: 'border-box' }}
                                            >
                                                <option value="Frontend Engineering">Frontend Engineering</option>
                                                <option value="Backend Engineering">Backend Engineering</option>
                                                <option value="Mobile App Development">Mobile App Development</option>
                                                <option value="UI/UX Product Design">UI/UX Product Design</option>
                                                <option value="Data Science & AI">Data Science & AI</option>
                                                <option value="Cybersecurity">Cybersecurity</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '1.5rem', background: '#fff', padding: '1rem 1.2rem', border: '2.5px solid #000', borderRadius: '0.6rem' }}>
                                        <label style={{ display: 'block', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.8rem', color: '#000' }}>Action To Perform *</label>
                                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}>
                                                <input
                                                    type="radio"
                                                    name="manualAction"
                                                    value="send_test_invite"
                                                    checked={manualCandidate.action === 'send_test_invite'}
                                                    onChange={e => setManualCandidate({ ...manualCandidate, action: e.target.value })}
                                                />
                                                📝 Send Screening Test Invitation Email
                                            </label>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}>
                                                <input
                                                    type="radio"
                                                    name="manualAction"
                                                    value="send_admission"
                                                    checked={manualCandidate.action === 'send_admission'}
                                                    onChange={e => setManualCandidate({ ...manualCandidate, action: e.target.value })}
                                                />
                                                🎓 Direct Admission & Send Email
                                            </label>
                                             <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}>
                                                <input
                                                    type="radio"
                                                    name="manualAction"
                                                    value="send_payment_link"
                                                    checked={manualCandidate.action === 'send_payment_link'}
                                                    onChange={e => setManualCandidate({ ...manualCandidate, action: e.target.value })}
                                                />
                                                💳 Send ₦10,000 Payment Email
                                            </label>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}>
                                                <input
                                                    type="radio"
                                                    name="manualAction"
                                                    value="just_register"
                                                    checked={manualCandidate.action === 'just_register'}
                                                    onChange={e => setManualCandidate({ ...manualCandidate, action: e.target.value })}
                                                />
                                                📋 Add to Waitlist Only
                                            </label>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                        <button
                                            type="button"
                                            onClick={() => setShowManualAddForm(false)}
                                            style={{ background: '#fff', border: '2px solid #000', padding: '0.7rem 1.4rem', borderRadius: '0.5rem', fontWeight: 800, cursor: 'pointer' }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={manualSubmitting}
                                            style={{ background: 'var(--accent-r)', color: '#fff', border: '3px solid #000', padding: '0.7rem 1.6rem', borderRadius: '0.5rem', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase', cursor: manualSubmitting ? 'not-allowed' : 'pointer', boxShadow: '3px 3px 0 #000' }}
                                        >
                                            {manualSubmitting ? 'Processing...' : '🚀 Save & Dispatch Email'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Filter Tabs */}
                        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                            {[
                                { id: 'all', label: 'All Applicants', count: waitlist.length },
                                {
                                    id: 'test_invited', label: '📩 Test Invited',
                                    count: waitlist.filter(w => {
                                        try {
                                            const p = typeof w.products === 'string' ? JSON.parse(w.products) : w.products;
                                            return p && p.test_invited && !p.test_done;
                                        } catch (e) { return false; }
                                    }).length
                                },
                                {
                                    id: 'test_done', label: '🧪 Test Completed',
                                    count: waitlist.filter(w => {
                                        try {
                                            const p = typeof w.products === 'string' ? JSON.parse(w.products) : w.products;
                                            return p && p.test_done;
                                        } catch (e) { return false; }
                                    }).length
                                },
                                {
                                    id: 'paid', label: '💳 Fee Paid (₦10k)',
                                    count: waitlist.filter(w => {
                                        try {
                                            const p = typeof w.products === 'string' ? JSON.parse(w.products) : w.products;
                                            return p && p.paid;
                                        } catch (e) { return false; }
                                    }).length
                                },
                                {
                                    id: 'admitted', label: '✅ Admitted',
                                    count: waitlist.filter(w => {
                                        try {
                                            const p = typeof w.products === 'string' ? JSON.parse(w.products) : w.products;
                                            return p && p.admitted;
                                        } catch (e) { return false; }
                                    }).length
                                },
                                {
                                    id: 'rejected', label: '❌ Deferred / Rejected',
                                    count: waitlist.filter(w => {
                                        try {
                                            const p = typeof w.products === 'string' ? JSON.parse(w.products) : w.products;
                                            return p && p.rejected;
                                        } catch (e) { return false; }
                                    }).length
                                }
                            ].map(f => (
                                <button
                                    key={f.id}
                                    onClick={() => setWaitlistFilter(f.id)}
                                    style={{
                                        padding: '0.6rem 1.2rem',
                                        background: waitlistFilter === f.id ? '#000' : '#fff',
                                        color: waitlistFilter === f.id ? '#fff' : '#000',
                                        border: '3px solid #000',
                                        fontFamily: 'Outfit, sans-serif',
                                        fontWeight: 900,
                                        fontSize: '0.82rem',
                                        textTransform: 'uppercase',
                                        cursor: 'pointer',
                                        boxShadow: waitlistFilter === f.id ? '3px 3px 0 var(--accent-r)' : '3px 3px 0 #000'
                                    }}
                                >
                                    {f.label} ({f.count})
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search by name, email or track..."
                            value={waitlistSearch}
                            onChange={e => setWaitlistSearch(e.target.value)}
                            style={{ width: '100%', padding: '0.9rem 1.2rem', border: '3px solid #000', marginBottom: '1.5rem', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif', outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                        />

                        <div style={{ background: '#fff', border: '3px solid #000', boxShadow: '8px 8px 0 #000', overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '3px solid #000', background: '#000', color: '#fff' }}>
                                        <th style={{ padding: '1rem 1.2rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>#</th>
                                        <th style={{ padding: '1rem 1.2rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Applicant</th>
                                        <th style={{ padding: '1rem 1.2rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Track</th>
                                        <th style={{ padding: '1rem 1.2rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>WhatsApp</th>
                                        <th style={{ padding: '1rem 1.2rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Screening Test</th>
                                        <th style={{ padding: '1rem 1.2rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Admission / Action</th>
                                        <th style={{ padding: '1rem 1.2rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Del</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {waitlist
                                        .filter(w => {
                                            const matchesSearch =
                                                w.name?.toLowerCase().includes(waitlistSearch.toLowerCase()) ||
                                                w.email?.toLowerCase().includes(waitlistSearch.toLowerCase()) ||
                                                w.company_name?.toLowerCase().includes(waitlistSearch.toLowerCase());

                                            let p = {};
                                            try { p = typeof w.products === 'string' ? JSON.parse(w.products) : (w.products || {}); } catch (e) { }

                                            if (waitlistFilter === 'test_invited') {
                                                return matchesSearch && !!p.test_invited && !p.test_done;
                                            } else if (waitlistFilter === 'test_done') {
                                                return matchesSearch && !!p.test_done;
                                            } else if (waitlistFilter === 'paid') {
                                                return matchesSearch && !!p.paid;
                                            } else if (waitlistFilter === 'admitted') {
                                                return matchesSearch && !!p.admitted;
                                            } else if (waitlistFilter === 'rejected') {
                                                return matchesSearch && !!p.rejected;
                                            }
                                            return matchesSearch;
                                        })
                                        .map((w, i) => {
                                            let parsedProducts = {};
                                            try { parsedProducts = typeof w.products === 'string' ? JSON.parse(w.products) : (w.products || {}); } catch (e) { }
                                            const isAdmitted = !!parsedProducts.admitted;
                                            const isRejected = !!parsedProducts.rejected;
                                            const testDone = !!parsedProducts.test_done;
                                            const testScore = parsedProducts.test_score;
                                            const isTestInvited = !!parsedProducts.test_invited;

                                            return (
                                                <tr key={w.id} style={{ borderBottom: '1px solid #eee', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                                                    <td style={{ padding: '0.9rem 1.2rem', fontSize: '0.8rem', fontWeight: 700, color: '#71717a' }}>{i + 1}</td>
                                                    <td style={{ padding: '0.9rem 1.2rem' }}>
                                                        <div style={{ fontWeight: 900, fontSize: '0.95rem' }}>{w.name}</div>
                                                        <div style={{ fontSize: '0.75rem', color: '#71717a' }}>{w.email}</div>
                                                    </td>
                                                    <td style={{ padding: '0.9rem 1.2rem' }}>
                                                        <span style={{
                                                            display: 'inline-block',
                                                            padding: '0.3rem 0.7rem',
                                                            background: 'var(--accent-r)',
                                                            color: '#fff',
                                                            fontSize: '0.65rem',
                                                            fontWeight: 900,
                                                            textTransform: 'uppercase',
                                                            border: '2px solid #000'
                                                        }}>{w.company_name || 'Frontend Engineering'}</span>
                                                    </td>
                                                    <td style={{ padding: '0.9rem 1.2rem', fontSize: '0.8rem', color: '#0f172a' }}>
                                                        {w.whatsapp_number ? (
                                                            <a href={`https://wa.me/${w.whatsapp_number.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-r)', fontWeight: 700, textDecoration: 'none' }}>
                                                                {w.whatsapp_number}
                                                            </a>
                                                        ) : '—'}
                                                    </td>
                                                    {/* Screening Test Results & Payment Actions */}
                                                    <td style={{ padding: '0.9rem 1.2rem', fontSize: '0.78rem' }}>
                                                        {testDone && testScore !== null && testScore !== undefined ? (
                                                            <div>
                                                                <span style={{
                                                                    padding: '0.25rem 0.65rem', borderRadius: '0.4rem',
                                                                    background: testScore >= 70 ? '#dcfce7' : testScore >= 50 ? '#fef3c7' : '#fee2e2',
                                                                    color: testScore >= 70 ? '#15803d' : testScore >= 50 ? '#b45309' : '#b91c1c',
                                                                    border: '2px solid #000', fontWeight: 950, display: 'inline-block', fontSize: '0.75rem'
                                                                }}>
                                                                    {testScore}% Score
                                                                </span>
                                                                {parsedProducts.paid ? (
                                                                    <div style={{ marginTop: '0.3rem' }}>
                                                                        <span style={{
                                                                            padding: '0.2rem 0.5rem', borderRadius: '0.3rem',
                                                                            background: '#dcfce7', color: '#15803d',
                                                                            border: '1.5px solid #000', fontWeight: 900, display: 'inline-block', fontSize: '0.6rem'
                                                                        }}>
                                                                            💳 Paid ₦10,000
                                                                        </span>
                                                                    </div>
                                                                ) : (
                                                                    <button
                                                                        onClick={async () => {
                                                                            if (confirm(`Send ₦10,000 course fee payment link email to ${w.name} (${w.email}) for track ${w.company_name || 'Frontend Engineering'}?`)) {
                                                                                try {
                                                                                    const updatedProducts = JSON.stringify({
                                                                                        ...parsedProducts,
                                                                                        payment_link_sent: true,
                                                                                        payment_link_date: new Date().toISOString()
                                                                                    });
                                                                                    const { error: updateError } = await supabase.from('registrations').update({ products: updatedProducts }).eq('id', w.id);
                                                                                    if (updateError) throw updateError;

                                                                                    let emailSent = false;
                                                                                    try {
                                                                                        const response = await fetch('/api/send-payment-link', {
                                                                                            method: 'POST',
                                                                                            headers: { 'Content-Type': 'application/json' },
                                                                                            body: JSON.stringify({
                                                                                                email: w.email,
                                                                                                name: w.name,
                                                                                                course: w.company_name || 'Frontend Engineering'
                                                                                            })
                                                                                        });
                                                                                        if (response.ok) emailSent = true;
                                                                                    } catch (e) {}

                                                                                    if (emailSent) alert(`✅ Payment link email (₦10,000) sent to ${w.name}!`);
                                                                                    else alert(`✅ Marked payment link sent.\n\n⚠️ Check EMAIL_USER and EMAIL_PASS on Vercel.`);
                                                                                    fetchWaitlist();
                                                                                } catch (err) { alert(`Error: ${err.message}`); }
                                                                            }
                                                                        }}
                                                                        style={{ marginTop: '0.3rem', display: 'block', background: parsedProducts.payment_link_sent ? '#fff' : '#dcfce7', color: '#15803d', border: '1.5px solid #000', padding: '0.2rem 0.4rem', borderRadius: '0.3rem', fontSize: '0.6rem', fontWeight: 900, cursor: 'pointer' }}
                                                                    >
                                                                        {parsedProducts.payment_link_sent ? '💳 Re-send Pay Link' : '💳 Send Pay Link (₦10k)'}
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ) : isTestInvited ? (
                                                            <div>
                                                                <span style={{
                                                                    padding: '0.25rem 0.6rem', borderRadius: '0.4rem',
                                                                    background: '#eff6ff', color: '#1d4ed8',
                                                                    border: '2px solid #000', fontWeight: 900, display: 'inline-block', fontSize: '0.7rem'
                                                                }}>
                                                                    📩 Invite Sent
                                                                </span>
                                                                <button
                                                                    onClick={async () => {
                                                                        if (confirm(`Send screening test reminder email to ${w.name} (${w.email})?`)) {
                                                                            try {
                                                                                const response = await fetch('/api/send-test-reminder', {
                                                                                    method: 'POST',
                                                                                    headers: { 'Content-Type': 'application/json' },
                                                                                    body: JSON.stringify({
                                                                                        email: w.email,
                                                                                        name: w.name,
                                                                                        course: w.company_name || 'Frontend Engineering'
                                                                                    })
                                                                                });
                                                                                if (response.ok) alert(`✅ Screening test reminder email sent to ${w.name}!`);
                                                                                else {
                                                                                    const errData = await response.json().catch(() => ({}));
                                                                                    alert(`⚠️ Failed: ${errData.error || 'Check Vercel email credentials.'}`);
                                                                                }
                                                                            } catch (e) { alert(`Error: ${e.message}`); }
                                                                        }
                                                                    }}
                                                                    style={{ marginTop: '0.3rem', display: 'block', background: '#fef3c7', color: '#b45309', border: '1.5px solid #000', padding: '0.2rem 0.4rem', borderRadius: '0.3rem', fontSize: '0.6rem', fontWeight: 900, cursor: 'pointer' }}
                                                                >
                                                                    ⏰ Send Reminder
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={async () => {
                                                                    if (confirm(`Send screening test invitation email to ${w.name} (${w.email}) for track ${w.company_name || 'Frontend Engineering'}?`)) {
                                                                        try {
                                                                            const updatedProducts = JSON.stringify({
                                                                                ...parsedProducts,
                                                                                test_invited: true,
                                                                                test_invited_date: new Date().toISOString()
                                                                            });
                                                                            const { error: updateError } = await supabase.from('registrations').update({ products: updatedProducts }).eq('id', w.id);
                                                                            if (updateError) throw updateError;

                                                                            let emailSent = false;
                                                                            try {
                                                                                const response = await fetch('/api/send-test-invite', {
                                                                                    method: 'POST',
                                                                                    headers: { 'Content-Type': 'application/json' },
                                                                                    body: JSON.stringify({
                                                                                        email: w.email,
                                                                                        name: w.name,
                                                                                        course: w.company_name || 'Frontend Engineering'
                                                                                    })
                                                                                });
                                                                                if (response.ok) emailSent = true;
                                                                            } catch (emailErr) { console.warn('Test invite request failed:', emailErr); }

                                                                            if (emailSent) alert(`✅ Test invitation email sent to ${w.name}!`);
                                                                            else alert(`✅ Marked as test invited.\n\n⚠️ Email failed to send. Check EMAIL_USER and EMAIL_PASS on Vercel.`);
                                                                            fetchWaitlist();
                                                                        } catch (err) { alert(`Error: ${err.message}`); }
                                                                    }
                                                                }}
                                                                style={{ background: '#fef3c7', color: '#92400e', border: '1.5px solid #000', padding: '0.25rem 0.5rem', borderRadius: '0.3rem', fontSize: '0.65rem', fontWeight: 900, cursor: 'pointer' }}
                                                            >
                                                                📝 Send Test Invite
                                                            </button>
                                                        )}
                                                    </td>
                                                    {/* Admission / Actions */}
                                                    <td style={{ padding: '0.9rem 1.2rem' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                            {isAdmitted ? (
                                                                <>
                                                                    <span style={{
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                        gap: '0.3rem',
                                                                        background: '#dcfce7',
                                                                        color: '#15803d',
                                                                        border: '2px solid #000000',
                                                                        padding: '0.25rem 0.6rem',
                                                                        borderRadius: '0.4rem',
                                                                        fontSize: '0.65rem',
                                                                        fontWeight: 900
                                                                    }}>
                                                                        ✅ {parsedProducts.cohort || w.cohort || 'Cohort 1'}
                                                                    </span>
                                                                    <button
                                                                        onClick={async () => {
                                                                            if (confirm(`Re-send admission email to ${w.name} (${w.email})?`)) {
                                                                                try {
                                                                                    const response = await fetch('/api/send-admission', {
                                                                                        method: 'POST',
                                                                                        headers: { 'Content-Type': 'application/json' },
                                                                                        body: JSON.stringify({
                                                                                            email: w.email,
                                                                                            name: w.name,
                                                                                            course: w.company_name || 'Frontend Engineering',
                                                                                            portalOpenDate: portalDates?.[parsedProducts.cohort || w.cohort || 'Cohort 1'] || ''
                                                                                        })
                                                                                    });
                                                                                    if (response.ok) {
                                                                                        alert(`✅ Admission email re-sent to ${w.name}!`);
                                                                                    } else {
                                                                                        const errData = await response.json().catch(() => ({}));
                                                                                        alert(`⚠️ Email failed: ${errData.error || 'Check Vercel EMAIL_USER & EMAIL_PASS'}`);
                                                                                    }
                                                                                } catch (e) {
                                                                                    alert(`Error sending email: ${e.message}`);
                                                                                }
                                                                            }
                                                                        }}
                                                                        style={{ background: '#fff', border: '1.5px solid #000', padding: '0.25rem 0.5rem', borderRadius: '0.3rem', fontSize: '0.65rem', fontWeight: 900, cursor: 'pointer' }}
                                                                    >
                                                                        📧 Re-send Email
                                                                    </button>
                                                                </>
                                                            ) : isRejected ? (
                                                                <>
                                                                    <span style={{
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                        gap: '0.3rem',
                                                                        background: '#fee2e2',
                                                                        color: '#b91c1c',
                                                                        border: '2px solid #000000',
                                                                        padding: '0.25rem 0.6rem',
                                                                        borderRadius: '0.4rem',
                                                                        fontSize: '0.65rem',
                                                                        fontWeight: 900
                                                                    }}>
                                                                        ❌ Cohort 2 Priority
                                                                    </span>
                                                                    <button
                                                                        onClick={async () => {
                                                                            if (confirm(`Re-send Cohort 2 update / rejection email to ${w.name} (${w.email})?`)) {
                                                                                try {
                                                                                    const response = await fetch('/api/send-rejection', {
                                                                                        method: 'POST',
                                                                                        headers: { 'Content-Type': 'application/json' },
                                                                                        body: JSON.stringify({
                                                                                            email: w.email,
                                                                                            name: w.name,
                                                                                            course: w.company_name || 'Frontend Engineering'
                                                                                        })
                                                                                    });
                                                                                    if (response.ok) alert(`✅ Rejection / Cohort 2 email re-sent to ${w.name}!`);
                                                                                    else {
                                                                                        const errData = await response.json().catch(() => ({}));
                                                                                        alert(`⚠️ Email failed: ${errData.error || 'Check Vercel EMAIL_USER & EMAIL_PASS'}`);
                                                                                    }
                                                                                } catch (e) {
                                                                                    alert(`Error: ${e.message}`);
                                                                                }
                                                                            }
                                                                        }}
                                                                        style={{ background: '#fff', border: '1.5px solid #000', padding: '0.25rem 0.5rem', borderRadius: '0.3rem', fontSize: '0.65rem', fontWeight: 900, cursor: 'pointer' }}
                                                                    >
                                                                        ✉️ Re-send Rejection
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                                                                    <select
                                                                        id={`cohort-select-${w.id}`}
                                                                        defaultValue={parsedProducts.cohort || w.cohort || 'Cohort 1'}
                                                                        style={{ border: '2px solid #000', padding: '0.3rem 0.5rem', fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.65rem', borderRadius: '0.3rem' }}
                                                                    >
                                                                        {COHORTS.map(c => <option key={c} value={c}>{c}</option>)}
                                                                    </select>
                                                                    <button
                                                                        onClick={async () => {
                                                                            const selectedCohort = document.getElementById(`cohort-select-${w.id}`)?.value || 'Cohort 1';
                                                                            if (confirm(`Admit ${w.name} (${w.email}) to ${selectedCohort} and send admission email?`)) {
                                                                                try {
                                                                                    const updatedProducts = JSON.stringify({
                                                                                        ...parsedProducts,
                                                                                        level: parsedProducts.level || 'Beginner',
                                                                                        admitted: true,
                                                                                        rejected: false,
                                                                                        cohort: selectedCohort,
                                                                                        password: parsedProducts.password || '',
                                                                                        avatar_url: parsedProducts.avatar_url || ''
                                                                                    });

                                                                                    const { error: updateError } = await supabase
                                                                                        .from('registrations')
                                                                                        .update({ products: updatedProducts })
                                                                                        .eq('id', w.id);

                                                                                    if (updateError) throw updateError;

                                                                                    let emailSent = false;
                                                                                    try {
                                                                                        const response = await fetch('/api/send-admission', {
                                                                                            method: 'POST',
                                                                                            headers: { 'Content-Type': 'application/json' },
                                                                                            body: JSON.stringify({
                                                                                                email: w.email,
                                                                                                name: w.name,
                                                                                                course: w.company_name || 'Frontend Engineering',
                                                                                                portalOpenDate: portalDates?.[selectedCohort] || ''
                                                                                            })
                                                                                        });
                                                                                        if (response.ok) emailSent = true;
                                                                                    } catch (emailErr) {
                                                                                        console.warn('Email request failed:', emailErr);
                                                                                    }

                                                                                    if (emailSent) {
                                                                                        alert(`✅ Admission granted & email sent to ${w.name}!`);
                                                                                    } else {
                                                                                        alert(`✅ ${w.name} marked as admitted.\n\n⚠️ Email failed to send. Check EMAIL_USER and EMAIL_PASS environment variables.`);
                                                                                    }

                                                                                    fetchWaitlist();
                                                                                } catch (err) {
                                                                                    console.error('Error giving admission:', err);
                                                                                    alert(`Error: ${err.message}`);
                                                                                }
                                                                            }
                                                                        }}
                                                                        style={{
                                                                            background: 'var(--accent-r)',
                                                                            color: '#ffffff',
                                                                            border: '2px solid #000000',
                                                                            padding: '0.35rem 0.7rem',
                                                                            borderRadius: '0.4rem',
                                                                            fontSize: '0.7rem',
                                                                            fontWeight: 900,
                                                                            cursor: 'pointer',
                                                                            boxShadow: '2px 2px 0 #000000',
                                                                            textTransform: 'uppercase'
                                                                        }}
                                                                    >
                                                                        🎓 Admit & Email
                                                                    </button>
                                                                    <button
                                                                        onClick={async () => {
                                                                            if (confirm(`Send rejection/deferral email to ${w.name} (${w.email}) informing them about Cohort 2?`)) {
                                                                                try {
                                                                                    const updatedProducts = JSON.stringify({
                                                                                        ...parsedProducts,
                                                                                        admitted: false,
                                                                                        rejected: true
                                                                                    });

                                                                                    const { error: updateError } = await supabase
                                                                                        .from('registrations')
                                                                                        .update({ products: updatedProducts })
                                                                                        .eq('id', w.id);

                                                                                    if (updateError) throw updateError;

                                                                                    let emailSent = false;
                                                                                    try {
                                                                                        const response = await fetch('/api/send-rejection', {
                                                                                            method: 'POST',
                                                                                            headers: { 'Content-Type': 'application/json' },
                                                                                            body: JSON.stringify({
                                                                                                email: w.email,
                                                                                                name: w.name,
                                                                                                course: w.company_name || 'Frontend Engineering'
                                                                                            })
                                                                                        });
                                                                                        if (response.ok) emailSent = true;
                                                                                    } catch (emailErr) {
                                                                                        console.warn('Rejection email request failed:', emailErr);
                                                                                    }

                                                                                    if (emailSent) {
                                                                                        alert(`✅ Rejection email sent to ${w.name}!`);
                                                                                    } else {
                                                                                        alert(`✅ ${w.name} marked as deferred/rejected.\n\n⚠️ Email failed to send. Check EMAIL_USER and EMAIL_PASS on Vercel.`);
                                                                                    }

                                                                                    fetchWaitlist();
                                                                                } catch (err) {
                                                                                    console.error('Error sending rejection:', err);
                                                                                    alert(`Error: ${err.message}`);
                                                                                }
                                                                            }
                                                                        }}
                                                                        style={{
                                                                            background: '#ef4444',
                                                                            color: '#ffffff',
                                                                            border: '2px solid #000000',
                                                                            padding: '0.35rem 0.7rem',
                                                                            borderRadius: '0.4rem',
                                                                            fontSize: '0.7rem',
                                                                            fontWeight: 900,
                                                                            cursor: 'pointer',
                                                                            boxShadow: '2px 2px 0 #000000',
                                                                            textTransform: 'uppercase'
                                                                        }}
                                                                    >
                                                                        🚫 Reject & Email
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '0.9rem 1.2rem' }}>
                                                        <button
                                                            onClick={() => handleDeleteWaitlistEntry(w.id)}
                                                            style={{ padding: '0.4rem', background: '#fee2e2', color: '#dc2626', border: '2px solid #000', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                                            title="Remove from waitlist"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    {waitlist.length === 0 && (
                                        <tr><td colSpan="7" style={{ padding: '3rem', textAlign: 'center', opacity: 0.5, fontWeight: 700 }}>No waitlist signups yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    );
                })()}

                {activeTab === 'pitches' && (
                    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                        <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '2rem', padding: '2rem', boxShadow: '8px 8px 0 #000' }}>
                            <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, marginBottom: '2rem' }}>Startup Pitches</h3>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', borderBottom: '3px solid #000' }}>
                                            <th style={{ padding: '1rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Startup / Founder</th>
                                            <th style={{ padding: '1rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Category</th>
                                            <th style={{ padding: '1rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Pitch</th>
                                            <th style={{ padding: '1rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Status</th>
                                            <th style={{ padding: '1rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Date</th>
                                            <th style={{ padding: '1rem', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 900 }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pitches.map((p, i) => (
                                            <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                                <td style={{ padding: '1rem' }}>
                                                    <div style={{ fontWeight: 900 }}>{p.startup_name}</div>
                                                    <div style={{ fontSize: '0.8rem', color: '#71717a' }}>{p.name} ({p.email})</div>
                                                    {p.whatsapp_number && <div style={{ fontSize: '0.8rem', color: '#25d366', fontWeight: 700 }}>WA: {p.whatsapp_number}</div>}
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{
                                                        background: p.category === 'Company' ? '#000' : 'var(--accent-r)',
                                                        color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase'
                                                    }}>{p.category}</span>
                                                </td>
                                                <td style={{ padding: '1rem', fontSize: '0.8rem' }}>
                                                    <div style={{ maxWidth: '300px', whiteSpace: 'pre-wrap' }}>{p.pitch_description}</div>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{
                                                        background: p.status === 'accepted' ? '#ecfdf5' : p.status === 'rejected' ? '#fef2f2' : '#f4f4f5',
                                                        color: p.status === 'accepted' ? '#059669' : p.status === 'rejected' ? '#dc2626' : '#71717a',
                                                        padding: '0.3rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase',
                                                        border: `1px solid ${p.status === 'accepted' ? '#059669' : p.status === 'rejected' ? '#dc2626' : '#e5e7eb'}`
                                                    }}>{p.status || 'pending'}</span>
                                                </td>
                                                <td style={{ padding: '1rem', fontSize: '0.8rem' }}>{new Date(p.created_at).toLocaleDateString()}</td>
                                                <td style={{ padding: '1rem' }}>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        {(!p.status || p.status === 'pending') && (
                                                            <>
                                                                {confirmingPitch?.id === p.id ? (
                                                                    <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center', background: '#f4f4f5', padding: '0.2rem', borderRadius: '0.5rem', border: '1px solid #000' }}>
                                                                        <span style={{ fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', padding: '0 0.3rem' }}>Sure?</span>
                                                                        <button
                                                                            onClick={() => {
                                                                                handlePitchStatusUpdate(p, confirmingPitch.status);
                                                                                setConfirmingPitch(null);
                                                                            }}
                                                                            style={{ background: confirmingPitch.status === 'accepted' ? '#059669' : '#dc2626', color: '#fff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '0.4rem', cursor: 'pointer', fontSize: '0.65rem' }}
                                                                        >
                                                                            YES
                                                                        </button>
                                                                        <button
                                                                            onClick={() => setConfirmingPitch(null)}
                                                                            style={{ background: '#000', color: '#fff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '0.4rem', cursor: 'pointer', fontSize: '0.65rem' }}
                                                                        >
                                                                            NO
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <button
                                                                            onClick={() => setConfirmingPitch({ id: p.id, status: 'accepted' })}
                                                                            title="Accept Pitch"
                                                                            style={{ background: '#ecfdf5', color: '#059669', border: 'none', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}
                                                                        >
                                                                            <CheckCircle size={16} />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => setConfirmingPitch({ id: p.id, status: 'rejected' })}
                                                                            title="Reject Pitch"
                                                                            style={{ background: '#fef2f2', color: '#dc2626', border: 'none', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}
                                                                        >
                                                                            <X size={16} />
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                        <button
                                                            onClick={() => handleDeletePitch(p.id)}
                                                            title="Delete Permanently"
                                                            style={{ background: '#f4f4f5', color: '#71717a', border: 'none', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {pitches.length === 0 && (
                                            <tr>
                                                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#71717a' }}>No pitches submitted yet.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
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

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '2rem', borderRadius: '1.5rem', border: '3px solid #000', marginTop: '1.5rem' }}>
                                    <div>
                                        <div style={{ fontWeight: 950, textTransform: 'uppercase', fontSize: '0.8rem' }}>Event Tags Status</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: isEventTagsOpen ? '#059669' : '#dc2626' }}>
                                            {isEventTagsOpen ? 'LIVE & ACCESSIBLE' : 'HIDDEN / COMING SOON'}
                                        </div>
                                    </div>
                                    <button
                                        onClick={toggleEventTags}
                                        style={{
                                            background: isEventTagsOpen ? '#dc2626' : '#059669',
                                            color: '#fff', padding: '1rem 2rem', borderRadius: '1rem', border: '3px solid #000',
                                            fontFamily: 'Outfit', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer',
                                            boxShadow: '4px 4px 0 #000', transition: 'all 0.2s'
                                        }}
                                    >
                                        {isEventTagsOpen ? 'Disable Event Tags' : 'Enable Event Tags'}
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

                {/* ─── FTA CONTROL PANEL ─── */}
                {activeTab === 'fta-control' && (() => {
                    const COHORTS = ['Cohort 1', 'Cohort 2', 'Cohort 3', 'Cohort 4', 'Cohort 5'];
                    const TRACKS = ['Frontend Engineering', 'Backend Engineering', 'Product Design (UI/UX)'];
                    const TRACK_MODULES = {
                        'Frontend Engineering': [...ACADEMY_COURSES['Frontend Engineering'].modules.map((m, i) => ({ index: i, title: m.title })), ...customModules.filter(m => m.track === 'Frontend Engineering').map((m, i) => ({ index: ACADEMY_COURSES['Frontend Engineering'].modules.length + i, title: m.title }))],
                        'Backend Engineering': [...ACADEMY_COURSES['Backend Engineering'].modules.map((m, i) => ({ index: i, title: m.title })), ...customModules.filter(m => m.track === 'Backend Engineering').map((m, i) => ({ index: ACADEMY_COURSES['Backend Engineering'].modules.length + i, title: m.title }))],
                        'Product Design (UI/UX)': [...ACADEMY_COURSES['Product Design (UI/UX)'].modules.map((m, i) => ({ index: i, title: m.title })), ...customModules.filter(m => m.track === 'Product Design (UI/UX)').map((m, i) => ({ index: ACADEMY_COURSES['Product Design (UI/UX)'].modules.length + i, title: m.title }))],
                    };
                    // (states declared at top of AdminDashboard to follow Rules of Hooks)

                    const toggleModuleLock = (modIdx) => {
                        const key = `${selectedCohortAdmin}-${selectedTrackAdmin}-module-${modIdx}`;
                        const updated = { ...cohortLocks, [key]: !cohortLocks[key] };
                        setCohortLocks(updated);
                        localStorage.setItem('fta-cohort-locks', JSON.stringify(updated));
                    };

                    const assignCohort = (cohort) => {
                        localStorage.setItem('fta-admin-assigned-cohort', cohort);
                        alert(`✅ Active cohort set to "${cohort}". Students will now see this cohort on their portal.`);
                    };

                    const sendNotification = () => {
                        if (!notifTitle.trim() || !notifBody.trim()) { alert('Fill in both title and body!'); return; }
                        const existing = JSON.parse(localStorage.getItem('fta-notifications') || '[]');
                        const updated = [{ id: Date.now(), title: notifTitle, body: notifBody, date: new Date().toLocaleDateString(), read: false }, ...existing];
                        localStorage.setItem('fta-notifications', JSON.stringify(updated));
                        setNotifTitle('');
                        setNotifBody('');
                        alert('📣 Notification broadcast sent to all students!');
                    };

                    const ftaTabs = [
                        { id: 'cohort', label: '👥 Student Assignment' },
                        { id: 'release', label: '📚 Release Modules' },
                        { id: 'curriculum', label: '🔒 Curriculum Locks' },
                        { id: 'addmodule', label: '➕ Add Module' },
                        { id: 'peers', label: '🤝 Merge Peers' },
                        { id: 'grade', label: '📝 Grade Submissions' },
                        { id: 'notify', label: '📣 Send Notification' },
                        { id: 'leaderboard', label: '🏆 Leaderboard' },
                        { id: 'portal-settings', label: '⏰ Portal Settings' },
                    ];

                    return (
                        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                            {/* FTA Panel header */}
                            <div style={{ background: '#000', color: '#fff', border: '3px solid #000', padding: '1.5rem 2rem', marginBottom: '2rem', boxShadow: '6px 6px 0 var(--accent-r)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <BookOpen size={28} color="#fff" />
                                <div>
                                    <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.4rem', margin: 0, textTransform: 'uppercase' }}>FTA Admin Control Panel</h2>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#aaa' }}>Manage cohorts, curriculum locks, notifications and leaderboard</p>
                                </div>
                            </div>

                            {/* Sub-tab bar */}
                            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                                {ftaTabs.map(t => (
                                    <button key={t.id} onClick={() => setFtaTab(t.id)} style={{
                                        padding: '0.7rem 1.4rem', border: '3px solid #000', background: ftaTab === t.id ? '#000' : '#fff',
                                        color: ftaTab === t.id ? '#fff' : '#000', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.8rem',
                                        cursor: 'pointer', textTransform: 'uppercase', boxShadow: ftaTab === t.id ? 'none' : '4px 4px 0 #000', borderRadius: '0.6rem'
                                    }}>{t.label}</button>
                                ))}
                            </div>

                            {/* ── COHORT & COURSE CONTROL ── */}
                            {ftaTab === 'cohort' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    {/* Cohort Section */}
                                    <div>
                                        <h4 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.1rem', marginBottom: '1rem', textTransform: 'uppercase', color: '#000', borderBottom: '2px solid #000', paddingBottom: '0.3rem' }}>1. Assign Student Cohort</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
                                            {COHORTS.map(cohort => {
                                                const isCurrent = localStorage.getItem('fta-admin-assigned-cohort') === cohort || (!localStorage.getItem('fta-admin-assigned-cohort') && cohort === 'Cohort 1');
                                                return (
                                                    <div key={cohort} style={{ background: '#fff', border: `3px solid ${isCurrent ? 'var(--accent-r)' : '#000'}`, padding: '1.2rem', boxShadow: isCurrent ? '4px 4px 0 var(--accent-r)' : '4px 4px 0 #000', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                             <div>
                                                                 <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.2rem', margin: 0 }}>{cohort}</h3>
                                                                 {isCurrent && <span style={{ fontSize: '0.65rem', fontWeight: 900, background: 'var(--accent-r)', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '0.3rem' }}>CURRENTLY ACTIVE</span>}
                                                             </div>
                                                             <Users size={20} color={isCurrent ? 'var(--accent-r)' : '#000'} />
                                                         </div>
                                                         <button
                                                             onClick={() => assignCohort(cohort)}
                                                             style={{ padding: '0.6rem', background: isCurrent ? 'var(--accent-r)' : '#000', color: '#fff', border: '2px solid #000', fontFamily: 'Outfit', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer', fontSize: '0.8rem' }}
                                                         >{isCurrent ? '✅ Active Cohort' : `Set Active`}</button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Course Track Section */}
                                    <div>
                                        <h4 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.1rem', marginBottom: '1rem', textTransform: 'uppercase', color: '#000', borderBottom: '2px solid #000', paddingBottom: '0.3rem' }}>2. Assign Student Course Track</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
                                            {['Frontend Engineering', 'Backend Engineering', 'Product Design (UI/UX)'].map(track => {
                                                const isCurrent = localStorage.getItem('fta-admin-assigned-course') === track || (!localStorage.getItem('fta-admin-assigned-course') && track === 'Frontend Engineering');
                                                return (
                                                    <div key={track} style={{ background: '#fff', border: `3px solid ${isCurrent ? 'var(--accent-b, #3b82f6)' : '#000'}`, padding: '1.2rem', boxShadow: isCurrent ? '4px 4px 0 var(--accent-b, #3b82f6)' : '4px 4px 0 #000', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                             <div>
                                                                 <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.1rem', margin: 0 }}>{track}</h3>
                                                                 {isCurrent && <span style={{ fontSize: '0.65rem', fontWeight: 900, background: '#3b82f6', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '0.3rem' }}>CURRENTLY ASSIGNED</span>}
                                                             </div>
                                                             <BookOpen size={20} color={isCurrent ? '#3b82f6' : '#000'} />
                                                         </div>
                                                         <button
                                                             onClick={() => {
                                                                 localStorage.setItem('fta-admin-assigned-course', track);
                                                                 alert(`✅ Active track set to "${track}". Students will now only access this track on their portal.`);
                                                                 window.location.reload();
                                                             }}
                                                             style={{ padding: '0.6rem', background: isCurrent ? '#3b82f6' : '#000', color: '#fff', border: '2px solid #000', fontFamily: 'Outfit', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer', fontSize: '0.8rem' }}
                                                         >{isCurrent ? '✅ Assigned Track' : `Assign Track`}</button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Students Per Cohort View */}
                                    <div>
                                        <h4 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.1rem', marginBottom: '1rem', textTransform: 'uppercase', color: '#000', borderBottom: '2px solid #000', paddingBottom: '0.3rem' }}>3. View Students Per Cohort</h4>
                                        <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                            {COHORTS.map(c => (
                                                <button key={c} onClick={() => { setSelectedCohortView(c); fetchCohortStudents(c); }} style={{
                                                    padding: '0.5rem 1rem', border: '3px solid #000', background: selectedCohortView === c ? '#000' : '#fff',
                                                    color: selectedCohortView === c ? '#fff' : '#000', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.75rem',
                                                    cursor: 'pointer', boxShadow: selectedCohortView === c ? 'none' : '3px 3px 0 #000', borderRadius: '0.5rem'
                                                }}>{c}</button>
                                            ))}
                                            <button onClick={() => fetchCohortStudents(selectedCohortView)} style={{
                                                padding: '0.5rem 1rem', border: '3px solid #000', background: '#f1f5f9',
                                                fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.75rem', cursor: 'pointer',
                                                boxShadow: '3px 3px 0 #000', borderRadius: '0.5rem'
                                            }}>↻ Refresh</button>
                                        </div>
                                        {cohortStudentsLoading ? (
                                            <div style={{ padding: '1.5rem', textAlign: 'center', color: '#888', fontWeight: 700 }}>Loading students...</div>
                                        ) : cohortStudents.length === 0 ? (
                                            <div style={{ padding: '1.5rem', textAlign: 'center', color: '#888', fontWeight: 700, background: '#f8fafc', border: '2px dashed #ccc', borderRadius: '0.5rem' }}>
                                                No students assigned to {selectedCohortView} yet. Students are assigned a cohort when you admit them from the waitlist.
                                            </div>
                                        ) : (
                                            <div style={{ background: '#fff', border: '3px solid #000', boxShadow: '4px 4px 0 #000', overflow: 'hidden' }}>
                                                <div style={{ background: '#000', color: '#fff', padding: '0.7rem 1rem', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>{selectedCohortView} — {cohortStudents.length} Student{cohortStudents.length !== 1 ? 's' : ''}</span>
                                                </div>
                                                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                    {cohortStudents.map((s, i) => {
                                                        let isAdmitted = false;
                                                        let level = '—';
                                                        try {
                                                            const parsed = JSON.parse(s.products);
                                                            if (parsed) { isAdmitted = !!parsed.admitted; level = parsed.level || '—'; }
                                                        } catch (e) {}
                                                        const trackName = s.company_name || '—';
                                                        return (
                                                            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.7rem 1rem', borderBottom: i < cohortStudents.length - 1 ? '1px solid #e5e7eb' : 'none', background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                                                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0e7ff', border: '2px solid #6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.65rem', color: '#3730a3', flexShrink: 0 }}>
                                                                    {i + 1}
                                                                </div>
                                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                                    <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.8rem' }}>{s.name}</div>
                                                                    <div style={{ fontSize: '0.65rem', color: '#64748b' }}>{s.email}</div>
                                                                </div>
                                                                <span style={{ fontSize: '0.6rem', fontWeight: 800, background: '#dbeafe', color: '#1d4ed8', padding: '0.15rem 0.4rem', borderRadius: '0.3rem', border: '1px solid #3b82f6', flexShrink: 0 }}>
                                                                    {trackName}
                                                                </span>
                                                                <span style={{ fontSize: '0.6rem', fontWeight: 800, background: '#f3e8ff', color: '#6d28d9', padding: '0.15rem 0.4rem', borderRadius: '0.3rem', border: '1px solid #6d28d9', flexShrink: 0 }}>
                                                                    {level}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* ── CURRICULUM LOCKS ── */}
                            {ftaTab === 'curriculum' && (
                                <div>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                                        {COHORTS.map(c => (
                                            <button key={c} onClick={() => setSelectedCohortAdmin(c)} style={{
                                                padding: '0.6rem 1.2rem', border: '3px solid #000', background: selectedCohortAdmin === c ? '#000' : '#fff',
                                                color: selectedCohortAdmin === c ? '#fff' : '#000', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer',
                                                boxShadow: selectedCohortAdmin === c ? 'none' : '3px 3px 0 #000'
                                            }}>{c}</button>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                                        {TRACKS.map(t => (
                                            <button key={t} onClick={() => setSelectedTrackAdmin(t)} style={{
                                                padding: '0.6rem 1.2rem', border: '3px solid #000', background: selectedTrackAdmin === t ? 'var(--accent-r)' : '#fff',
                                                color: selectedTrackAdmin === t ? '#fff' : '#000', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer',
                                                boxShadow: selectedTrackAdmin === t ? 'none' : '3px 3px 0 #000'
                                            }}>{t}</button>
                                        ))}
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
                                        {(TRACK_MODULES[selectedTrackAdmin] || []).map(({ index: modIdx, title: modName }) => {
                                            const key = `${selectedCohortAdmin}-${selectedTrackAdmin}-module-${modIdx}`;
                                            const isLocked = !!cohortLocks[key];
                                            return (
                                                <div key={modIdx} style={{ background: '#fff', border: `3px solid ${isLocked ? '#dc2626' : '#059669'}`, padding: '1.5rem', boxShadow: `6px 6px 0 ${isLocked ? '#dc2626' : '#059669'}` }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                                        <h4 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.9rem', margin: 0 }}>{modName}</h4>
                                                        {isLocked ? <Lock size={20} color="#dc2626" /> : <CheckCircle size={20} color="#059669" />}
                                                    </div>
                                                    <div style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '1rem', color: isLocked ? '#dc2626' : '#059669' }}>
                                                        {isLocked ? '🔴 LOCKED — Students cannot access' : '🟢 UNLOCKED — Students can access'}
                                                    </div>
                                                    <button
                                                        onClick={() => toggleModuleLock(modIdx)}
                                                        style={{ width: '100%', padding: '0.8rem', background: isLocked ? '#059669' : '#dc2626', color: '#fff', border: '3px solid #000', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '3px 3px 0 rgba(0,0,0,0.4)' }}
                                                    >{isLocked ? '🔓 Unlock Module' : '🔒 Lock Module'}</button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* ── RELEASE MODULES ── */}
                            {ftaTab === 'release' && (
                                <div>
                                    <div style={{ background: '#fff', border: '3px solid #000', padding: '1.5rem 2rem', marginBottom: '2rem', boxShadow: '6px 6px 0 #000' }}>
                                        <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.1rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>📚 Weekly Module Release</h3>
                                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#666', lineHeight: '1.5' }}>Release modules to students cohort by cohort. Unreleased modules are completely hidden from the student dashboard. Release one module per week for each cohort.</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                                        {COHORTS.map(c => (
                                            <button key={c} onClick={() => setSelectedCohortAdmin(c)} style={{
                                                padding: '0.6rem 1.2rem', border: '3px solid #000', background: selectedCohortAdmin === c ? '#000' : '#fff',
                                                color: selectedCohortAdmin === c ? '#fff' : '#000', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer',
                                                boxShadow: selectedCohortAdmin === c ? 'none' : '3px 3px 0 #000'
                                            }}>{c}</button>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                                        {TRACKS.map(t => (
                                            <button key={t} onClick={() => setSelectedTrackAdmin(t)} style={{
                                                padding: '0.6rem 1.2rem', border: '3px solid #000', background: selectedTrackAdmin === t ? 'var(--accent-r)' : '#fff',
                                                color: selectedTrackAdmin === t ? '#fff' : '#000', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer',
                                                boxShadow: selectedTrackAdmin === t ? 'none' : '3px 3px 0 #000'
                                            }}>{t}</button>
                                        ))}
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.2rem' }}>
                                        {(TRACK_MODULES[selectedTrackAdmin] || []).map(({ index: modIdx, title: modName }) => {
                                            const released = isModuleReleased(selectedCohortAdmin, selectedTrackAdmin, modIdx);
                                            const releaseRecord = releasedModules.find(r => r.cohort === selectedCohortAdmin && r.track === selectedTrackAdmin && r.module_index === modIdx);
                                            return (
                                                <div key={modIdx} style={{ background: '#fff', border: `3px solid ${released ? '#059669' : '#e5e7eb'}`, padding: '1.5rem', boxShadow: released ? '6px 6px 0 #059669' : '4px 4px 0 #e5e7eb', opacity: released ? 1 : 0.85 }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                                                        <h4 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.9rem', margin: 0 }}>{modName}</h4>
                                                        {released ? <CheckCircle size={20} color="#059669" /> : <Lock size={20} color="#9ca3af" />}
                                                    </div>
                                                    <div style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', color: released ? '#059669' : '#9ca3af' }}>
                                                        {released ? `🟢 RELEASED — Visible to students` : '⚪ NOT RELEASED — Hidden from students'}
                                                    </div>
                                                    {released && releaseRecord && (
                                                        <div style={{ fontSize: '0.65rem', color: '#6b7280', marginBottom: '1rem', fontWeight: 600 }}>
                                                            Released: {new Date(releaseRecord.released_at).toLocaleString()}
                                                        </div>
                                                    )}
                                                    <button
                                                        onClick={() => toggleModuleRelease(selectedCohortAdmin, selectedTrackAdmin, modIdx)}
                                                        style={{ width: '100%', padding: '0.8rem', background: released ? '#dc2626' : '#059669', color: '#fff', border: '3px solid #000', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '3px 3px 0 rgba(0,0,0,0.4)' }}
                                                    >{released ? '🚫 Unrelease Module' : '✅ Release Module to Students'}</button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* ── SEND NOTIFICATION ── */}
                            {ftaTab === 'notify' && (
                                <div style={{ maxWidth: '700px' }}>
                                    <div style={{ background: '#fff', border: '3px solid #000', padding: '2rem', boxShadow: '8px 8px 0 #000', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        <div>
                                            <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.3rem', margin: '0 0 0.3rem 0', textTransform: 'uppercase' }}>📣 Broadcast Notification</h3>
                                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#71717a', fontWeight: 700 }}>This notification will appear instantly in all students' Notification inbox on the FTA portal.</p>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', color: '#71717a' }}>Notification Title</label>
                                            <input
                                                type="text"
                                                value={notifTitle}
                                                onChange={e => setNotifTitle(e.target.value)}
                                                placeholder="e.g. Class session moved to Saturday"
                                                style={{ border: '3px solid #000', padding: '0.8rem 1rem', width: '100%', borderRadius: '0.6rem', fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.9rem' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', color: '#71717a' }}>Notification Body</label>
                                            <textarea
                                                value={notifBody}
                                                onChange={e => setNotifBody(e.target.value)}
                                                placeholder="Write the full message content here..."
                                                rows={5}
                                                style={{ border: '3px solid #000', padding: '0.8rem 1rem', width: '100%', borderRadius: '0.6rem', fontFamily: 'Outfit', fontWeight: 650, fontSize: '0.85rem', resize: 'vertical' }}
                                            />
                                        </div>
                                        <button
                                            onClick={sendNotification}
                                            style={{ padding: '1rem 2rem', background: '#000', color: '#fff', border: '3px solid #000', fontFamily: 'Outfit', fontWeight: 900, textTransform: 'uppercase', fontSize: '1rem', cursor: 'pointer', boxShadow: '4px 4px 0 var(--accent-r)' }}
                                        >📣 Send Broadcast to All Students</button>

                                        {/* Existing notifications list */}
                                        {(() => {
                                            const existing = JSON.parse(localStorage.getItem('fta-notifications') || '[]');
                                            if (!existing.length) return null;
                                            return (
                                                <div style={{ borderTop: '3px solid #000', paddingTop: '1.5rem' }}>
                                                    <h4 style={{ fontFamily: 'Outfit', fontWeight: 900, margin: '0 0 1rem 0', textTransform: 'uppercase', fontSize: '0.9rem' }}>Sent Notifications ({existing.length})</h4>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                                        {existing.slice(0, 5).map(n => (
                                                            <div key={n.id} style={{ background: '#f8fafc', border: '2px solid #000', padding: '0.8rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                                                                <div>
                                                                    <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.85rem' }}>{n.title}</div>
                                                                    <div style={{ fontSize: '0.75rem', color: '#71717a', fontWeight: 700, marginTop: '0.2rem' }}>{n.body.slice(0, 80)}{n.body.length > 80 ? '...' : ''}</div>
                                                                </div>
                                                                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', flexShrink: 0 }}>{n.date}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>
                            )}

                            {/* ── ADD MODULE ── */}
                            {ftaTab === 'addmodule' && (
                                <div>
                                    <div style={{ background: '#fff', border: '3px solid #000', padding: '2rem', boxShadow: '8px 8px 0 #000', marginBottom: '2rem' }}>
                                        <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.2rem', margin: '0 0 1rem 0', textTransform: 'uppercase' }}>➕ Add New Module</h3>
                                        <p style={{ fontSize: '0.8rem', color: '#71717a', marginBottom: '1.5rem', fontWeight: 700 }}>Create a custom module that will appear for students in the selected track.</p>
                                        <div style={{ display: 'grid', gap: '1rem' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Target Track</label>
                                                <select value={selectedTrackAdmin} onChange={e => setSelectedTrackAdmin(e.target.value)} style={{ border: '3px solid #000', padding: '0.7rem', fontFamily: 'Outfit', fontWeight: 700, width: '100%' }}>
                                                    {['Frontend Engineering', 'Backend Engineering', 'Product Design (UI/UX)'].map(t => <option key={t} value={t}>{t}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Module Title</label>
                                                <input value={newModuleForm.title} onChange={e => setNewModuleForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Module 8: Advanced Patterns" style={{ border: '3px solid #000', padding: '0.7rem', fontFamily: 'Outfit', fontWeight: 700, width: '100%' }} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Description</label>
                                                <input value={newModuleForm.description} onChange={e => setNewModuleForm(p => ({ ...p, description: e.target.value }))} placeholder="Short description" style={{ border: '3px solid #000', padding: '0.7rem', fontFamily: 'Outfit', fontWeight: 700, width: '100%' }} />
                                            </div>
                                            <div style={{ border: '2px dashed #ccc', padding: '1rem', borderRadius: '0.5rem' }}>
                                                <h4 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.85rem', margin: '0 0 0.8rem 0' }}>Add Lessons</h4>
                                                <input value={newLessonInput.title} onChange={e => setNewLessonInput(p => ({ ...p, title: e.target.value }))} placeholder="Lesson title (e.g. 1. Introduction)" style={{ border: '2px solid #000', padding: '0.6rem', fontFamily: 'Outfit', fontWeight: 700, width: '100%', marginBottom: '0.5rem' }} />
                                                <input value={newLessonInput.videoUrl} onChange={e => setNewLessonInput(p => ({ ...p, videoUrl: e.target.value }))} placeholder="YouTube or video URL" style={{ border: '2px solid #000', padding: '0.6rem', fontFamily: 'Outfit', fontWeight: 700, width: '100%', marginBottom: '0.5rem' }} />
                                                <textarea value={newLessonInput.notes} onChange={e => setNewLessonInput(p => ({ ...p, notes: e.target.value }))} placeholder="Markdown lesson notes..." rows={3} style={{ border: '2px solid #000', padding: '0.6rem', fontFamily: 'Outfit', fontWeight: 700, width: '100%', marginBottom: '0.5rem', resize: 'vertical' }} />
                                                <button onClick={() => {
                                                    if (!newLessonInput.title) return;
                                                    setNewModuleForm(p => ({ ...p, lessons: [...p.lessons, { ...newLessonInput, id: `custom-${Date.now()}-${p.lessons.length}` }] }));
                                                    setNewLessonInput({ title: '', videoUrl: '', notes: '' });
                                                }} style={{ padding: '0.5rem 1rem', background: '#22c55e', color: '#fff', border: '2px solid #000', fontWeight: 900, fontSize: '0.75rem', cursor: 'pointer', textTransform: 'uppercase' }}>+ Add Lesson</button>
                                            </div>
                                            {newModuleForm.lessons.length > 0 && (
                                                <div>
                                                    <h4 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.8rem', margin: '0 0 0.5rem 0' }}>Lessons Added ({newModuleForm.lessons.length})</h4>
                                                    {newModuleForm.lessons.map((l, i) => (
                                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', border: '1px solid #eee', marginBottom: '0.3rem', fontSize: '0.75rem', fontWeight: 700 }}>
                                                            <span>{l.title}</span>
                                                            <button onClick={() => setNewModuleForm(p => ({ ...p, lessons: p.lessons.filter((_, j) => j !== i) }))} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.2rem 0.5rem', cursor: 'pointer', fontWeight: 900, fontSize: '0.65rem' }}>✕</button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <button onClick={async () => {
                                                if (!newModuleForm.title || newModuleForm.lessons.length === 0) { alert('Add a title and at least one lesson.'); return; }
                                                const { error } = await supabase.from('custom_modules').insert({
                                                    track: selectedTrackAdmin,
                                                    title: newModuleForm.title,
                                                    description: newModuleForm.description,
                                                    lessons: newModuleForm.lessons,
                                                    order_index: (ACADEMY_COURSES[selectedTrackAdmin]?.modules.length || 0) + customModules.filter(m => m.track === selectedTrackAdmin).length
                                                });
                                                if (error) { alert('Error: ' + error.message); return; }
                                                const { data } = await supabase.from('custom_modules').select('*').order('order_index');
                                                setCustomModules(data || []);
                                                setNewModuleForm({ title: '', description: '', lessons: [] });
                                                alert('Module added successfully!');
                                            }} style={{ padding: '1rem', background: 'var(--accent-b, #3b82f6)', color: '#fff', border: '3px solid #000', fontFamily: 'Outfit', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.9rem', cursor: 'pointer', boxShadow: '4px 4px 0 #000' }}>Save Module to Track</button>
                                        </div>
                                    </div>

                                    {customModules.length > 0 && (
                                        <div style={{ background: '#fff', border: '3px solid #000', padding: '1.5rem', boxShadow: '6px 6px 0 #000' }}>
                                            <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1rem', margin: '0 0 1rem 0', textTransform: 'uppercase' }}>Custom Modules Created</h3>
                                            {customModules.map(m => (
                                                <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', border: '2px solid #eee', marginBottom: '0.5rem' }}>
                                                    <div>
                                                        <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.85rem' }}>{m.title}</div>
                                                        <div style={{ fontSize: '0.7rem', color: '#888' }}>{m.track} · {m.lessons?.length || 0} lessons</div>
                                                    </div>
                                                    <button onClick={async () => { await supabase.from('custom_modules').delete().eq('id', m.id); const { data } = await supabase.from('custom_modules').select('*').order('order_index'); setCustomModules(data || []); }} style={{ background: '#ef4444', color: '#fff', border: '2px solid #000', padding: '0.3rem 0.6rem', fontWeight: 900, fontSize: '0.7rem', cursor: 'pointer' }}>Delete</button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ── GRADE SUBMISSIONS ── */}
                            {ftaTab === 'grade' && (
                                <div>
                                    <div style={{ background: '#fff', border: '3px solid #000', padding: '2rem', boxShadow: '8px 8px 0 #000' }}>
                                        <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.2rem', margin: '0 0 1.5rem 0', textTransform: 'uppercase' }}>📝 Grade Student Submissions</h3>
                                        <p style={{ fontSize: '0.8rem', color: '#71717a', marginBottom: '1.5rem', fontWeight: 700 }}>Manually grade peer submissions or individual student performance. Grades appear in student profiles.</p>
                                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                            <select value={selectedCohortAdmin} onChange={e => setSelectedCohortAdmin(e.target.value)} style={{ border: '3px solid #000', padding: '0.6rem', fontFamily: 'Outfit', fontWeight: 700 }}>
                                                {COHORTS.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                            <select value={selectedTrackAdmin} onChange={e => setSelectedTrackAdmin(e.target.value)} style={{ border: '3px solid #000', padding: '0.6rem', fontFamily: 'Outfit', fontWeight: 700 }}>
                                                {['Frontend Engineering', 'Backend Engineering', 'Product Design (UI/UX)'].map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>
                                        <div style={{ border: '2px dashed #ccc', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                                            <h4 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.9rem', margin: '0 0 1rem 0' }}>Manual Grade Entry</h4>
                                            <div style={{ display: 'grid', gap: '0.8rem' }}>
                                                <input id="grade-student-email" type="email" placeholder="Student email" style={{ border: '2px solid #000', padding: '0.7rem', fontFamily: 'Outfit', fontWeight: 700 }} />
                                                <input id="grade-student-name" type="text" placeholder="Student name" style={{ border: '2px solid #000', padding: '0.7rem', fontFamily: 'Outfit', fontWeight: 700 }} />
                                                <select id="grade-module-index" style={{ border: '2px solid #000', padding: '0.7rem', fontFamily: 'Outfit', fontWeight: 700 }}>
                                                    {(ACADEMY_COURSES[selectedTrackAdmin]?.modules || []).map((m, i) => (
                                                        <option key={i} value={i}>Module {i + 1}: {m.title.replace(/^Module \d+: /, '')}</option>
                                                    ))}
                                                </select>
                                                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                                                    <input id="grade-score" type="number" min="0" max="100" defaultValue="0" placeholder="Score 0-100" style={{ border: '2px solid #000', padding: '0.7rem', fontFamily: 'Outfit', fontWeight: 700, width: '120px' }} />
                                                    <span style={{ fontWeight: 900, fontSize: '0.8rem' }}>/ 100</span>
                                                </div>
                                                <textarea id="grade-feedback" rows={2} placeholder="Feedback (optional)" style={{ border: '2px solid #000', padding: '0.7rem', fontFamily: 'Outfit', fontWeight: 700, resize: 'vertical' }} />
                                                <button onClick={async () => {
                                                    const email = document.getElementById('grade-student-email')?.value?.trim();
                                                    const name = document.getElementById('grade-student-name')?.value?.trim();
                                                    const moduleIndex = parseInt(document.getElementById('grade-module-index')?.value || '0');
                                                    const score = parseInt(document.getElementById('grade-score')?.value || '0');
                                                    const feedback = document.getElementById('grade-feedback')?.value?.trim() || '';
                                                    if (!email || !name) { alert('Enter student email and name.'); return; }
                                                    if (score < 0 || score > 100) { alert('Score must be 0-100.'); return; }
                                                    const { error } = await supabase.from('manual_grades').insert({
                                                        student_email: email, student_name: name, cohort: selectedCohortAdmin,
                                                        track: selectedTrackAdmin, module_index: moduleIndex, score, feedback
                                                    });
                                                    if (error) { alert('Error: ' + error.message); return; }
                                                    alert(`Grade saved for ${name}: Module ${moduleIndex + 1} = ${score}/100`);
                                                    document.getElementById('grade-student-email').value = '';
                                                    document.getElementById('grade-student-name').value = '';
                                                    document.getElementById('grade-score').value = '0';
                                                    document.getElementById('grade-feedback').value = '';
                                                }} style={{ padding: '0.8rem', background: '#22c55e', color: '#fff', border: '3px solid #000', fontFamily: 'Outfit', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer', boxShadow: '4px 4px 0 #000' }}>Submit Grade</button>
                                            </div>
                                        </div>

                                        {/* ── PEER PROJECT SUBMISSIONS ── */}
                                        {(() => {
                                            const filteredSubmissions = adminPeerSubmissions.filter(s => s.cohort === selectedCohortAdmin && s.track === selectedTrackAdmin);
                                            if (filteredSubmissions.length === 0) {
                                                return (
                                                    <div style={{ borderTop: '2px solid #000', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                                                        <h4 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.9rem', margin: '0 0 0.8rem 0', textTransform: 'uppercase' }}>📂 Peer Project Submissions</h4>
                                                        <div style={{ padding: '1rem', color: '#888', fontWeight: 700, background: '#f8fafc', border: '2px dashed #ccc', borderRadius: '0.5rem', textAlign: 'center' }}>
                                                            No peer submissions yet for {selectedCohortAdmin} / {selectedTrackAdmin}.
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return (
                                                <div style={{ borderTop: '2px solid #000', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                        <h4 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.9rem', margin: 0, textTransform: 'uppercase' }}>📂 Peer Project Submissions ({filteredSubmissions.length})</h4>
                                                        <button onClick={fetchAdminPeerSubmissions} style={{ padding: '0.3rem 0.7rem', background: '#f1f5f9', border: '2px solid #000', borderRadius: '0.3rem', fontFamily: 'Outfit', fontWeight: 800, fontSize: '0.65rem', cursor: 'pointer', textTransform: 'uppercase' }}>↻ Refresh</button>
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                                         {filteredSubmissions.map(sub => {
                                                             const isExpanded = expandedSubmission === sub.id;
                                                             const membersList = Array.isArray(sub.members) ? sub.members : [];
                                                             const moduleName = ACADEMY_COURSES[selectedTrackAdmin]?.modules[sub.module_index]?.title || `Module ${sub.module_index + 1}`;
                                                             const submitterName = sub.submitter_name || sub.submitter_email || 'Unknown';
                                                             return (
                                                                 <div key={sub.id} style={{ border: '2px solid #000', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '3px 3px 0 #000' }}>
                                                                     {/* Submission Header */}
                                                                     <button
                                                                         onClick={() => setExpandedSubmission(isExpanded ? null : sub.id)}
                                                                         style={{
                                                                             width: '100%', display: 'flex', alignItems: 'center', gap: '0.8rem',
                                                                             padding: '0.8rem 1rem', background: isExpanded ? '#f0fdf4' : '#fff',
                                                                             border: 'none', cursor: 'pointer', textAlign: 'left',
                                                                             borderBottom: isExpanded ? '2px solid #000' : 'none',
                                                                         }}
                                                                     >
                                                                         <div style={{
                                                                             width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #000',
                                                                             background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                             fontWeight: 900, fontSize: '0.65rem', color: '#1d4ed8', flexShrink: 0,
                                                                         }}>
                                                                             {sub.group_name ? sub.group_name.replace('Group ', 'G') : '—'}
                                                                         </div>
                                                                         <div style={{ flex: 1, minWidth: 0 }}>
                                                                             <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.8rem', color: '#000' }}>
                                                                                 {submitterName}
                                                                             </div>
                                                                             <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 700 }}>
                                                                                 {sub.group_name || 'Group'} · {moduleName} · {new Date(sub.created_at).toLocaleDateString()}
                                                                             </div>
                                                                         </div>
                                                                         <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#64748b', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
                                                                     </button>

                                                                     {/* Expanded Detail */}
                                                                     {isExpanded && (
                                                                         <div style={{ padding: '1rem', background: '#f8fafc' }}>
                                                                             {/* Submitter & Team */}
                                                                             <div style={{ marginBottom: '0.8rem' }}>
                                                                                 <div style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.3rem' }}>Submitted by</div>
                                                                                 <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1d4ed8', marginBottom: '0.5rem' }}>
                                                                                     {submitterName} ({sub.submitter_email || 'N/A'})
                                                                                 </div>
                                                                                 <div style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.3rem' }}>Team Members</div>
                                                                                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                                                                     {membersList.map((m, i) => (
                                                                                         <span key={i} style={{ fontSize: '0.65rem', fontWeight: 800, background: m.email === sub.submitter_email ? '#dbeafe' : '#e0e7ff', color: '#3730a3', padding: '0.2rem 0.5rem', borderRadius: '0.3rem', border: `1px solid ${m.email === sub.submitter_email ? '#3b82f6' : '#6366f1'}` }}>
                                                                                             {m.name || m.email}{m.email === sub.submitter_email ? ' (submitter)' : ''}
                                                                                         </span>
                                                                                     ))}
                                                                                 </div>
                                                                             </div>

                                                                             {/* Submission Text */}
                                                                             <div style={{ marginBottom: '1rem' }}>
                                                                                 <div style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.3rem' }}>Submission Content</div>
                                                                                 <div style={{ background: '#fff', border: '2px solid #000', borderRadius: '0.4rem', padding: '0.8rem', fontSize: '0.8rem', fontFamily: 'monospace', lineHeight: '1.5', whiteSpace: 'pre-wrap', maxHeight: '300px', overflowY: 'auto' }}>
                                                                                     {sub.submission_text || 'No content submitted.'}
                                                                                 </div>
                                                                             </div>

                                                                             {/* Quick Grade Form — grades only this submitter */}
                                                                             <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.5rem', alignItems: 'end' }}>
                                                                                 <div>
                                                                                     <label style={{ fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', color: '#64748b' }}>Feedback</label>
                                                                                     <input
                                                                                         id={`feedback-${sub.id}`}
                                                                                         type="text"
                                                                                         placeholder="Optional feedback..."
                                                                                         style={{ width: '100%', border: '2px solid #000', padding: '0.5rem', fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.75rem', boxSizing: 'border-box' }}
                                                                                     />
                                                                                 </div>
                                                                                 <div>
                                                                                     <label style={{ fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', color: '#64748b' }}>Score</label>
                                                                                     <input
                                                                                         id={`score-${sub.id}`}
                                                                                         type="number"
                                                                                         min="0"
                                                                                         max="100"
                                                                                         defaultValue="0"
                                                                                         style={{ width: '80px', border: '2px solid #000', padding: '0.5rem', fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.75rem' }}
                                                                                     />
                                                                                 </div>
                                                                                 <button
                                                                                     onClick={async () => {
                                                                                         const email = sub.submitter_email;
                                                                                         const name = sub.submitter_name || email;
                                                                                         const score = parseInt(document.getElementById(`score-${sub.id}`)?.value || '0');
                                                                                         const feedback = document.getElementById(`feedback-${sub.id}`)?.value?.trim() || '';
                                                                                         if (!email) { alert('No submitter email found.'); return; }
                                                                                         if (score < 0 || score > 100) { alert('Score must be 0-100.'); return; }
                                                                                         await supabase.from('manual_grades').insert({
                                                                                             student_email: email,
                                                                                             student_name: name,
                                                                                             cohort: selectedCohortAdmin,
                                                                                             track: selectedTrackAdmin,
                                                                                             module_index: sub.module_index,
                                                                                             score,
                                                                                             feedback: feedback || `Peer project grade for ${sub.group_name}`
                                                                                         });
                                                                                         alert(`✅ Graded ${name}: ${score}/100`);
                                                                                     }}
                                                                                     style={{ padding: '0.5rem 1rem', background: '#22c55e', color: '#fff', border: '2px solid #000', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '2px 2px 0 #000', height: 'fit-content' }}
                                                                                 >
                                                                                     Grade
                                                                                 </button>
                                                                             </div>
                                                                         </div>
                                                                     )}
                                                                 </div>
                                                             );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })()}

                                        <RecentGradesList selectedCohort={selectedCohortAdmin} selectedTrack={selectedTrackAdmin} />
                                    </div>
                                </div>
                            )}

                            {/* ── MERGE PEERS ── */}
                            {ftaTab === 'peers' && (
                                <div>
                                    <div style={{ background: '#fff', border: '3px solid #000', padding: '2rem', boxShadow: '8px 8px 0 #000', marginBottom: '2rem' }}>
                                        <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.2rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>🤝 Merge Students Into Peer Groups</h3>
                                        <p style={{ fontSize: '0.8rem', color: '#71717a', marginBottom: '1.5rem', fontWeight: 700 }}>Select a module, describe the task, and auto-pair students into groups of 2. If the count is odd, one student will be marked as "Not Peered".</p>

                                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                            {COHORTS.map(c => (
                                                <button key={c} onClick={() => setSelectedCohortAdmin(c)} style={{
                                                    padding: '0.6rem 1.2rem', border: '3px solid #000', background: selectedCohortAdmin === c ? '#000' : '#fff',
                                                    color: selectedCohortAdmin === c ? '#fff' : '#000', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer',
                                                    boxShadow: selectedCohortAdmin === c ? 'none' : '3px 3px 0 #000'
                                                }}>{c}</button>
                                            ))}
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                            {TRACKS.map(t => (
                                                <button key={t} onClick={() => setSelectedTrackAdmin(t)} style={{
                                                    padding: '0.6rem 1.2rem', border: '3px solid #000', background: selectedTrackAdmin === t ? 'var(--accent-r)' : '#fff',
                                                    color: selectedTrackAdmin === t ? '#fff' : '#000', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer',
                                                    boxShadow: selectedTrackAdmin === t ? 'none' : '3px 3px 0 #000'
                                                }}>{t}</button>
                                            ))}
                                        </div>

                                        <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Module</label>
                                                <select id="merge-module-index" style={{ border: '3px solid #000', padding: '0.7rem', fontFamily: 'Outfit', fontWeight: 700, width: '100%' }}>
                                                    {(TRACK_MODULES[selectedTrackAdmin] || []).map(({ index, title }) => (
                                                        <option key={index} value={index}>{title}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Task Description (What they do together)</label>
                                                <textarea value={peerTaskDesc} onChange={e => setPeerTaskDesc(e.target.value)} rows={3} placeholder="e.g. Discuss and solve 5 JavaScript challenges as a pair. One student codes, the other reviews." style={{ border: '3px solid #000', padding: '0.7rem', fontFamily: 'Outfit', fontWeight: 700, width: '100%', resize: 'vertical' }} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Submission Prompt (What they submit)</label>
                                                <textarea value={peerSubmitPrompt} onChange={e => setPeerSubmitPrompt(e.target.value)} rows={3} placeholder="e.g. Submit a shared GitHub repo link with your paired solution and a short reflection on what you learned." style={{ border: '3px solid #000', padding: '0.7rem', fontFamily: 'Outfit', fontWeight: 700, width: '100%', resize: 'vertical' }} />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Submission Deadline</label>
                                                <input type="datetime-local" value={peerDeadline} onChange={e => setPeerDeadline(e.target.value)} style={{ border: '3px solid #000', padding: '0.7rem', fontFamily: 'Outfit', fontWeight: 700, width: '100%' }} />
                                                <div style={{ fontSize: '0.65rem', color: '#888', marginTop: '0.2rem', fontWeight: 700 }}>Students who miss this deadline receive a score of 0.</div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                                <button onClick={handleAutoMergePeers} disabled={mergeLoading} style={{ flex: 1, padding: '1rem', background: mergeLoading ? '#94a3b8' : 'var(--accent-r, #ef4444)', color: '#fff', border: '3px solid #000', fontFamily: 'Outfit', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.9rem', cursor: mergeLoading ? 'not-allowed' : 'pointer', boxShadow: '4px 4px 0 #000' }}>
                                                    {mergeLoading ? 'Merging...' : '🔀 Auto-Merge Students'}
                                                </button>
                                                <button onClick={async () => {
                                                    const moduleIdx = parseInt(document.getElementById('merge-module-index')?.value || '0');
                                                    if (!confirm(`Scatter/destroy all peer groups for "${selectedTrackAdmin}" Module ${moduleIdx + 1} in ${selectedCohortAdmin}?`)) return;
                                                    await supabase.from('peer_groups').delete()
                                                        .eq('cohort', selectedCohortAdmin)
                                                        .eq('track', selectedTrackAdmin)
                                                        .eq('module_index', moduleIdx);
                                                    await fetchPeerGroups();
                                                    alert('Peer groups scattered.');
                                                }} style={{ padding: '1rem', background: '#f59e0b', color: '#fff', border: '3px solid #000', fontFamily: 'Outfit', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.9rem', cursor: 'pointer', boxShadow: '4px 4px 0 #000', flexShrink: 0 }}>
                                                    💥 Scatter Groups
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Existing peer groups */}
                                    {peerGroups.length > 0 && (
                                        <div style={{ background: '#fff', border: '3px solid #000', padding: '1.5rem', boxShadow: '6px 6px 0 #000' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.8rem' }}>
                                                <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1rem', margin: 0, textTransform: 'uppercase' }}>📋 Merged Students ({peerGroups.filter(pg => pg.cohort === selectedCohortAdmin && pg.track === selectedTrackAdmin).reduce((acc, pg) => acc + pg.members.length, 0)} students in {peerGroups.filter(pg => pg.cohort === selectedCohortAdmin && pg.track === selectedTrackAdmin).length} groups)</h3>
                                                <button onClick={async () => { if (confirm('Delete ALL peer groups?')) { await supabase.from('peer_groups').delete().neq('id', '00000000-0000-0000-0000-000000000000'); setPeerGroups([]); } }} style={{ padding: '0.4rem 0.8rem', background: '#ef4444', color: '#fff', border: '2px solid #000', fontWeight: 900, fontSize: '0.7rem', cursor: 'pointer', textTransform: 'uppercase' }}>🗑 Clear All</button>
                                            </div>

                                            {/* Filter by cohort + track */}
                                            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                                {COHORTS.map(c => (
                                                    <button key={c} onClick={() => setSelectedCohortAdmin(c)} style={{ padding: '0.4rem 0.8rem', border: '2px solid #000', background: selectedCohortAdmin === c ? '#000' : '#fff', color: selectedCohortAdmin === c ? '#fff' : '#000', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.7rem', cursor: 'pointer' }}>{c}</button>
                                                ))}
                                            </div>

                                            {/* Group by module → table per module */}
                                            {[...new Set(peerGroups.filter(pg => pg.cohort === selectedCohortAdmin && pg.track === selectedTrackAdmin).map(pg => pg.module_index))].sort((a, b) => a - b).map(modIdx => {
                                                const modGroups = peerGroups.filter(pg => pg.cohort === selectedCohortAdmin && pg.track === selectedTrackAdmin && pg.module_index === modIdx);
                                                const modTitle = TRACK_MODULES[selectedTrackAdmin]?.find(m => m.index === modIdx)?.title || `Module ${modIdx + 1}`;
                                                const paired = modGroups.filter(g => !g.is_unpaired);
                                                const unpaired = modGroups.filter(g => g.is_unpaired);

                                                return (
                                                    <div key={modIdx} style={{ marginBottom: '2rem' }}>
                                                        <div style={{ background: '#000', color: '#fff', padding: '0.7rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Outfit' }}>
                                                            <h4 style={{ fontWeight: 900, fontSize: '0.85rem', margin: 0, textTransform: 'uppercase' }}>📚 {modTitle}</h4>
                                                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.7rem', fontWeight: 800 }}>
                                                                <span>{paired.length} group{paired.length !== 1 ? 's' : ''}</span>
                                                                {unpaired.length > 0 && <span style={{ color: '#ef4444' }}>{unpaired.length} not peered</span>}
                                                                {modGroups[0]?.deadline && <span style={{ color: new Date(modGroups[0].deadline) < new Date() ? '#ef4444' : '#4ade80' }}>⏰ {new Date(modGroups[0].deadline).toLocaleString()}</span>}
                                                            </div>
                                                        </div>
                                                        {modGroups[0]?.task_description && (
                                                            <div style={{ fontSize: '0.75rem', color: '#444', padding: '0.6rem 1rem', background: '#f0f9ff', borderLeft: '3px solid #3b82f6', marginBottom: '0.5rem' }}>
                                                                <strong>Task:</strong> {modGroups[0].task_description} | <strong>Submit:</strong> {modGroups[0].submission_prompt}
                                                            </div>
                                                        )}
                                                        <div style={{ overflowX: 'auto' }}>
                                                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #000' }}>
                                                                <thead>
                                                                    <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #000' }}>
                                                                        <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', borderRight: '1px solid #e5e7eb' }}>#</th>
                                                                        <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', borderRight: '1px solid #e5e7eb' }}>Student Name</th>
                                                                        <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', borderRight: '1px solid #e5e7eb' }}>Email</th>
                                                                        <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', borderRight: '1px solid #e5e7eb' }}>Group #</th>
                                                                        <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', borderRight: '1px solid #e5e7eb' }}>Partner</th>
                                                                        <th style={{ padding: '0.6rem 0.8rem', textAlign: 'left', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', borderRight: '1px solid #e5e7eb' }}>Partner Email</th>
                                                                        <th style={{ padding: '0.6rem 0.8rem', textAlign: 'center', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase' }}>Del</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {modGroups.sort((a, b) => a.group_number - b.group_number).map((pg) => {
                                                                        const rowBg = pg.is_unpaired ? '#fef2f2' : pg.members.indexOf(pg.members[0]) % 2 === 0 ? '#fff' : '#fafafa';
                                                                        if (pg.is_unpaired) {
                                                                            const m = pg.members[0];
                                                                            return (
                                                                                <tr key={pg.id + '-0'} style={{ borderBottom: '1px solid #e5e7eb', background: '#fef2f2' }}>
                                                                                    <td style={{ padding: '0.6rem 0.8rem', fontWeight: 700, fontSize: '0.8rem', borderRight: '1px solid #e5e7eb', color: '#ef4444' }}>⚠️</td>
                                                                                    <td style={{ padding: '0.6rem 0.8rem', fontWeight: 800, fontSize: '0.85rem', fontFamily: 'Outfit', borderRight: '1px solid #e5e7eb' }}>{m.name}</td>
                                                                                    <td style={{ padding: '0.6rem 0.8rem', fontSize: '0.75rem', color: '#555', borderRight: '1px solid #e5e7eb' }}>{m.email}</td>
                                                                                    <td style={{ padding: '0.6rem 0.8rem', fontSize: '0.8rem', fontWeight: 900, color: '#ef4444', borderRight: '1px solid #e5e7eb' }}>NOT PEERED</td>
                                                                                    <td style={{ padding: '0.6rem 0.8rem', fontSize: '0.8rem', color: '#999', borderRight: '1px solid #e5e7eb' }}>—</td>
                                                                                    <td style={{ padding: '0.6rem 0.8rem', fontSize: '0.75rem', color: '#999', borderRight: '1px solid #e5e7eb' }}>—</td>
                                                                                    <td style={{ padding: '0.6rem 0.8rem', textAlign: 'center' }}><button onClick={async () => { await supabase.from('peer_groups').delete().eq('id', pg.id); await fetchPeerGroups(); }} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.2rem 0.5rem', cursor: 'pointer', fontWeight: 900, fontSize: '0.65rem' }}>✕</button></td>
                                                                                </tr>
                                                                            );
                                                                        }
                                                                        return pg.members.map((m, mi) => {
                                                                            const partner = pg.members.find((_, idx) => idx !== mi);
                                                                            return (
                                                                                <tr key={pg.id + '-' + mi} style={{ borderBottom: '1px solid #e5e7eb', background: mi === 0 ? '#f0fdf4' : '#ecfdf5' }}>
                                                                                    <td style={{ padding: '0.6rem 0.8rem', fontWeight: 700, fontSize: '0.8rem', borderRight: '1px solid #e5e7eb' }}>{mi === 0 ? pg.group_number : ''}</td>
                                                                                    <td style={{ padding: '0.6rem 0.8rem', fontWeight: 800, fontSize: '0.85rem', fontFamily: 'Outfit', borderRight: '1px solid #e5e7eb' }}>{m.name}</td>
                                                                                    <td style={{ padding: '0.6rem 0.8rem', fontSize: '0.75rem', color: '#555', borderRight: '1px solid #e5e7eb' }}>{m.email}</td>
                                                                                    <td style={{ padding: '0.6rem 0.8rem', fontSize: '0.8rem', fontWeight: 900, color: '#22c55e', borderRight: '1px solid #e5e7eb' }}>Group {m.number}</td>
                                                                                    <td style={{ padding: '0.6rem 0.8rem', fontSize: '0.8rem', fontWeight: 800, fontFamily: 'Outfit', borderRight: '1px solid #e5e7eb' }}>{partner?.name || '—'}</td>
                                                                                    <td style={{ padding: '0.6rem 0.8rem', fontSize: '0.75rem', color: '#555', borderRight: '1px solid #e5e7eb' }}>{partner?.email || '—'}</td>
                                                                                    <td style={{ padding: '0.6rem 0.8rem', textAlign: 'center' }}>{mi === 0 ? <button onClick={async () => { await supabase.from('peer_groups').delete().eq('id', pg.id); await fetchPeerGroups(); }} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.2rem 0.5rem', cursor: 'pointer', fontWeight: 900, fontSize: '0.65rem' }}>✕</button> : ''}</td>
                                                                                </tr>
                                                                            );
                                                                        });
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}

                            {ftaTab === 'leaderboard' && (
                                <div>
                                    <div style={{ background: '#fff', border: '3px solid #000', padding: '2rem', boxShadow: '8px 8px 0 #000' }}>
                                        <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.3rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>🏆 Student Leaderboard</h3>
                                        <p style={{ fontSize: '0.8rem', color: '#71717a', marginBottom: '1.5rem', fontWeight: 700 }}>View ranked student performance per cohort. Scores come from admin manual grades.</p>

                                        {/* Cohort selector */}
                                        <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                            {COHORTS.map(c => (
                                                <button key={c} onClick={() => { setSelectedCohortView(c); fetchLeaderboard(c); }} style={{
                                                    padding: '0.5rem 1rem', border: '3px solid #000', background: selectedCohortView === c ? '#000' : '#fff',
                                                    color: selectedCohortView === c ? '#fff' : '#000', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.75rem',
                                                    cursor: 'pointer', boxShadow: selectedCohortView === c ? 'none' : '3px 3px 0 #000', borderRadius: '0.5rem'
                                                }}>{c}</button>
                                            ))}
                                            <button onClick={() => fetchLeaderboard(selectedCohortView)} style={{
                                                padding: '0.5rem 1rem', border: '3px solid #000', background: '#f1f5f9',
                                                fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.75rem', cursor: 'pointer',
                                                boxShadow: '3px 3px 0 #000', borderRadius: '0.5rem'
                                            }}>↻ Refresh</button>
                                        </div>

                                        {leaderboardLoading ? (
                                            <div style={{ textAlign: 'center', padding: '2rem', color: '#888', fontWeight: 700 }}>Loading leaderboard...</div>
                                        ) : leaderboardData.length === 0 ? (
                                            <div style={{ textAlign: 'center', padding: '3rem', color: '#71717a', background: '#f8fafc', border: '2px dashed #ccc', borderRadius: '0.5rem' }}>
                                                <p style={{ fontWeight: 800 }}>No students in {selectedCohortView} yet, or no grades recorded.</p>
                                            </div>
                                        ) : (
                                            <div style={{ overflowX: 'auto' }}>
                                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                    <thead>
                                                        <tr style={{ borderBottom: '3px solid #000' }}>
                                                            {['#', 'Student', 'Track', 'Avg Score', 'Modules Graded', 'Passed'].map(h => (
                                                                <th key={h} style={{ textAlign: 'left', padding: '0.6rem 0.8rem', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', color: '#71717a' }}>{h}</th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {leaderboardData.map((s, i) => (
                                                            <tr key={s.email} style={{ borderBottom: '1px solid #e5e7eb', background: i === 0 ? '#fefce8' : i === 1 ? '#f0fdf4' : i === 2 ? '#eff6ff' : '#fff' }}>
                                                                <td style={{ padding: '0.7rem 0.8rem', fontFamily: 'Outfit', fontWeight: 900, fontSize: '1rem' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</td>
                                                                <td style={{ padding: '0.7rem 0.8rem' }}>
                                                                    <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '0.85rem' }}>{s.name}</div>
                                                                    <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{s.email}</div>
                                                                </td>
                                                                <td style={{ padding: '0.7rem 0.8rem', fontSize: '0.7rem', fontWeight: 800, color: '#1d4ed8' }}>{s.track}</td>
                                                                <td style={{ padding: '0.7rem 0.8rem' }}>
                                                                    <span style={{ display: 'inline-block', minWidth: '50px', textAlign: 'center', padding: '0.2rem 0.5rem', borderRadius: '0.3rem', fontWeight: 900, fontSize: '0.8rem', background: s.avg >= 75 ? '#dcfce7' : s.avg >= 50 ? '#fef9c3' : s.avg > 0 ? '#fee2e2' : '#f1f5f9', color: s.avg >= 75 ? '#15803d' : s.avg >= 50 ? '#a16207' : s.avg > 0 ? '#dc2626' : '#94a3b8' }}>
                                                                        {s.avg > 0 ? `${s.avg}/100` : '—'}
                                                                    </span>
                                                                </td>
                                                                <td style={{ padding: '0.7rem 0.8rem', fontSize: '0.85rem', fontWeight: 900 }}>{s.modulesGraded}</td>
                                                                <td style={{ padding: '0.7rem 0.8rem', fontSize: '0.85rem', fontWeight: 900, color: '#059669' }}>{s.passed}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* ── PORTAL SETTINGS ── */}
                            {ftaTab === 'portal-settings' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <div style={{ background: '#fff', border: '3px solid #000', padding: '2rem', boxShadow: '8px 8px 0 #000' }}>
                                        <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.3rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>⏰ Portal Open Date — Per Cohort</h3>
                                        <p style={{ fontSize: '0.8rem', color: '#71717a', marginBottom: '1.5rem', fontWeight: 700 }}>Set when each cohort's LMS portal unlocks. Students in that cohort can set up accounts immediately, but course content is locked until the date arrives.</p>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            {COHORTS.map(cohort => (
                                                <div key={cohort} style={{ background: '#f8fafc', border: '3px solid #000', padding: '1.5rem', boxShadow: '4px 4px 0 #000' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                        <h4 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1rem', margin: 0, textTransform: 'uppercase' }}>{cohort}</h4>
                                                        {portalDates[cohort] && (
                                                            <span style={{
                                                                fontSize: '0.65rem', fontWeight: 900, padding: '0.2rem 0.6rem', borderRadius: '0.3rem',
                                                                background: new Date(portalDates[cohort]) <= new Date() ? '#dcfce7' : '#fef9c3',
                                                                color: new Date(portalDates[cohort]) <= new Date() ? '#15803d' : '#a16207',
                                                                border: '1px solid #000'
                                                            }}>
                                                                {new Date(portalDates[cohort]) <= new Date() ? '✅ OPEN' : `🔒 LOCKED`}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                                        <input
                                                            type="datetime-local"
                                                            value={portalDates[cohort] || ''}
                                                            onChange={e => setPortalDates(prev => ({ ...prev, [cohort]: e.target.value }))}
                                                            style={{
                                                                padding: '0.7rem 1rem', border: '2px solid #000', fontSize: '0.9rem',
                                                                fontFamily: 'Outfit', outline: 'none', background: '#fff', flex: '1 1 250px', boxSizing: 'border-box'
                                                            }}
                                                        />
                                                        {portalDates[cohort] && (
                                                            <button
                                                                onClick={() => setPortalDates(prev => { const n = { ...prev }; delete n[cohort]; return n; })}
                                                                style={{
                                                                    padding: '0.5rem 0.8rem', background: '#fff', color: '#dc2626', border: '2px solid #dc2626',
                                                                    fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap'
                                                                }}
                                                            >Clear</button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            onClick={async () => {
                                                const cleaned = {};
                                                Object.entries(portalDates).forEach(([k, v]) => { if (v) cleaned[k] = v; });
                                                setPortalDates(cleaned);
                                                localStorage.setItem('fta-portal-dates', JSON.stringify(cleaned));
                                                const { error } = await supabase.from('site_settings').upsert({ key: 'portal_dates', value: JSON.stringify(cleaned), updated_at: new Date().toISOString() });
                                                if (!error) alert('✅ Portal dates saved!');
                                                else alert('Saved locally. Supabase error: ' + error.message);
                                            }}
                                            style={{
                                                marginTop: '1.5rem', padding: '0.9rem 1.5rem',
                                                background: 'var(--accent-r)', color: '#ffffff', border: '3px solid #000',
                                                fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.9rem',
                                                textTransform: 'uppercase', cursor: 'pointer', boxShadow: '4px 4px 0 #000',
                                                alignSelf: 'flex-start'
                                            }}
                                        >
                                            Save All Portal Dates
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })()}
            </div >
        </div >
    );
};

/* ───────────────────────────────────────────
   CELEBRATION POPUP
   ─────────────────────────────────────────── */
const CelebrationModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '2rem', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)'
                }}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="reg-card"
                        style={{
                            maxWidth: '600px', width: '100%', textAlign: 'center',
                            background: '#fff', border: '5px solid #000', borderRadius: '3rem',
                            padding: '4rem 2rem', boxShadow: '20px 20px 0 #000', position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Decorative Icons */}
                        <motion.div
                            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            style={{ position: 'absolute', top: '2rem', left: '2rem', color: 'var(--accent-r)' }}
                        >
                            <PartyPopper size={40} />
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            style={{ position: 'absolute', bottom: '2rem', right: '2rem', color: '#000' }}
                        >
                            <Sparkles size={40} />
                        </motion.div>

                        <div style={{
                            display: 'inline-flex', background: 'var(--accent-r)', color: '#fff',
                            padding: '1.5rem', borderRadius: '2rem', border: '3px solid #000',
                            marginBottom: '2rem', boxShadow: '6px 6px 0 #000'
                        }}>
                            <Rocket size={48} />
                        </div>

                        <h2 style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '1.5rem', fontFamily: 'Outfit' }}>Success!</h2>
                        <p style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.5, color: '#333', marginBottom: '2.5rem' }}>
                            OOU Future Tech 2026 was a massive success! 🚀<br />
                            Together, we've set the stage for the next era of innovation.
                            Thank you to everyone who made this possible.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button
                                onClick={onClose}
                                className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center', fontSize: '1.2rem', padding: '1.5rem' }}
                            >
                                Let's Keep Building
                            </button>
                        </div>

                        <button
                            onClick={onClose}
                            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            <X size={24} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

/* ───────────────────────────────────────────
   PENDING CO-FOUNDERS DIRECTORY
   ─────────────────────────────────────────── */
const PendingFounders = ({ onConnect }) => {
    const [founders, setFounders] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPending = async () => {
        setLoading(true);
        setError(null);
        try {
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiBase = isLocal ? 'http://localhost:3001' : '';
            const res = await fetch(`${apiBase}/api/founders/pending?category=${filter}`);
            const data = await res.json();
            
            if (Array.isArray(data)) {
                setFounders(data);
            } else {
                console.error('Invalid Data Format:', data);
                setError(data.error || 'The matchmaking network is currently updating its cache. Please try again in 2 minutes.');
                setFounders([]);
            }
        } catch (err) {
            console.error('Fetch Pending Error:', err);
            setError('Could not connect to the matchmaking server. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPending();
    }, [filter]);

    return (
        <div className="pending-founders-container" style={{ padding: '2rem 0' }}>
            <div className="filter-tabs" style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {['all', 'technical_founder', 'non_technical_founder', 'technical_for_technical'].map(cat => (
                    <button 
                        key={cat} onClick={() => setFilter(cat)}
                        style={{
                            padding: '0.5rem 1rem', borderRadius: '25px', border: '1px solid #E63946',
                            background: filter === cat ? '#E63946' : 'transparent', color: '#fff',
                            cursor: 'pointer', textTransform: 'capitalize', fontSize: '0.8rem'
                        }}
                    >
                        {cat.replace(/_/g, ' ')}
                    </button>
                ))}
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>Scanning network...</div>
            ) : error ? (
                <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed #444', borderRadius: '15px' }}>
                    <p style={{ color: '#E63946', fontWeight: 'bold' }}>⚠️ DIRECTORY ERROR</p>
                    <p style={{ color: '#888', fontSize: '0.8rem' }}>{error}</p>
                    <button onClick={fetchPending} style={{ marginTop: '1rem', background: '#333', color: '#fff', padding: '0.5rem 1rem', borderRadius: '10px' }}>Retry</button>
                </div>
            ) : (
                <div className="founders-grid">
                    {founders.map(f => (
                        <motion.div 
                            key={f.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="founders-card" whileHover={{ y: -5, borderColor: '#E63946' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div style={{ padding: '0.2rem 0.6rem', borderRadius: '4px', background: '#E63946', fontSize: '0.65rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                    {f.user_type.replace(/_/g, ' ')}
                                </div>
                            </div>
                            <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0', color: '#fff' }}>{f.name}</h3>
                            <p style={{ fontSize: '0.85rem', color: '#aaa', margin: '0 0 1.2rem 0', lineHeight: '1.4' }}>
                                {f.ai_summary || "Founding member looking for challenge."}
                            </p>
                            <button 
                                onClick={() => onConnect(f)}
                                style={{
                                    width: '100%', padding: '0.7rem', borderRadius: '10px',
                                    background: '#fff', color: '#000', fontWeight: 'bold',
                                    border: 'none', cursor: 'pointer', fontSize: '0.9rem'
                                }}
                            >
                                Connect Instantly
                            </button>
                        </motion.div>
                    ))}
                    {founders.length === 0 && (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: '#555' }}>
                            Zero matches in this category yet. Be the first!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

/* ───────────────────────────────────────────
   FUTURE TECH ACADEMY (FTA) LEARNING PORTAL
   ─────────────────────────────────────────── */
const ACADEMY_COURSES = {
    'Frontend Engineering': {
        description: 'Master visual layouts, UI components, state management, and modern React web applications.',
        modules: [
            {
                title: 'Module 1: Grit & Growth Mindset',
                lessons: [
                    {
                        id: 'fe-grit-intro',
                        title: '1. What is Grit? — Angela Duckworth',
                        videoUrl: 'https://www.youtube.com/embed/H14bBuluwB8',
                        notes: `### What is Grit?\n\nGrit is passion and perseverance for long-term goals. Angela Duckworth's research shows that talent alone does not make you great — sustained effort does.\n\n*   **Grit > Talent**: IQ and talent are not the best predictors of success.\n*   **Effort Counts Twice**: Talent × Effort = Skill. Skill × Effort = Achievement.\n*   **The Hard Thing Rule**: Do one hard thing that requires deliberate practice.`
                    },
                    {
                        id: 'fe-growth-intro',
                        title: '2. Growth Mindset — Carol Dweck',
                        videoUrl: 'https://www.youtube.com/embed/ghRqS3-9LVM',
                        notes: `### Growth Mindset vs Fixed Mindset\n\nCarol Dweck's research reveals two beliefs about ability that shape how we learn.\n\n*   **Fixed Mindset**: "I'm either good or bad at this." Avoids challenges, gives up easily.\n*   **Growth Mindset**: "I can improve with effort." Embraces challenges, persists through setbacks.\n*   **The Power of Yet**: "I don't understand it YET" vs "I don't understand it."`
                    },
                    {
                        id: 'fe-nigerian-tech',
                        title: '3. Tech Problems in Nigeria & How You Can Solve Them',
                        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        notes: `### Real Problems You Can Solve With Code\n\nNigeria faces unique challenges that tech skills can address:\n\n*   **Financial Inclusion**: 36M+ adults are unbanked. Build fintech solutions.\n*   **Healthcare Access**: Rural areas lack doctors. Telemedicine apps save lives.\n*   **Education Gaps**: Quality learning materials are scarce. Build EdTech platforms.\n*   **Agriculture**: Farmers lack market access. Create marketplace platforms.\n\n**Your track is your weapon.** Frontend engineers build the interfaces people interact with.`
                    },
                    {
                        id: 'fe-collaboration',
                        title: '4. How Developers Work Together to Build Solutions',
                        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        notes: `### Collaboration in Tech\n\nGreat software is never built alone:\n\n*   **Pair Programming**: Two developers, one screen. Real-time code review.\n*   **Version Control**: Git lets teams work on the same codebase without conflicts.\n*   **Agile Sprints**: Break big goals into 1-2 week chunks. Ship, get feedback, improve.\n*   **Code Reviews**: Every pull request is a learning opportunity.`
                    }
                ]
            },
            {
                title: 'Module 2: Styling and CSS Architecture',
                lessons: [
                    {
                        id: 'fe-css-basics',
                        title: '6. CSS Basics',
                        videoUrl: 'https://www.youtube.com/embed/Z4pCqK-V_Wo',
                        notes: `### CSS Basics\n\nCSS (Cascading Style Sheets) controls the visual styling, presentation, layout, and responsiveness of web pages.\n\n*   **Selectors**: Target tags, classes, or IDs.\n*   **Properties & Values**: Modify styles (e.g., color: red; or font-size: 16px;).`
                    },
                    {
                        id: 'fe-css-types',
                        title: '7. Inline, External and Internal CSS',
                        videoUrl: 'https://www.youtube.com/embed/6EMkq7UqMGE',
                        notes: `### Types of CSS Integration\n\nCSS can be applied to HTML in three ways:\n\n1.  **Inline CSS**: Directly inside tags using the style attribute.\n2.  **Internal CSS**: Inside a <style> block in the document head.\n3.  **External CSS**: In a separate .css file linked using a <link> tag (Best Practice).`
                    },
                    {
                        id: 'fe-css-responsive',
                        title: '8. Responsive Design',
                        videoUrl: 'https://www.youtube.com/embed/OXGznpKZ_sA',
                        notes: `### Responsive Web Design\n\nCreate layouts that adjust dynamically to mobile, tablet, and desktop screens.\n\n*   **Media Queries**: Apply styles only when specific conditions are met (e.g., @media (max-width: 768px)).\n*   **Viewport Metatag**: Tells the mobile browser how to scale the page height/width.`
                    }
                ]
            },
            {
                title: 'Module 3: JavaScript Programming Basics',
                lessons: [
                    {
                        id: 'fe-js-intro',
                        title: '9. What is JavaScript',
                        videoUrl: 'https://www.youtube.com/embed/upDLs1sn7g4',
                        notes: `### Introduction to JavaScript\n\nJavaScript is a lightweight, dynamic, interpreted programming language that adds interactivity and logic to static pages.\n\n*   **Scripting Language**: Executes client-side inside the user's browser.\n*   **Dynamic UI**: Can modify text, change colors, submit forms, and pull API data without page refreshes.`
                    },
                    {
                        id: 'fe-js-run',
                        title: '10. How to Run JavaScript',
                        videoUrl: 'https://www.youtube.com/embed/3JVtC3sUFvo',
                        notes: `### Running JavaScript\n\nJavaScript can be executed in several environments:\n\n1.  **Browser Console**: Press F12 to run code immediately in the browser.\n2.  **Script Tag**: Encase JS inside a HTML <script> tag.\n3.  **Node.js**: Run JS directly on your terminal/server environment.`
                    },
                    {
                        id: 'fe-js-first',
                        title: '11. Writing My First JavaScript Code',
                        videoUrl: 'https://www.youtube.com/embed/wEwDaFXqLDA',
                        notes: `### First Steps in JS\n\nLearn the basic output operations and commands in JS:\n\n*   console.log("Hello, World!"); - Prints message to the developer console.\n*   alert("Welcome!"); - Displays an interactive popup dialog in the browser.`
                    },
                    {
                        id: 'fe-js-variables',
                        title: '12. Variables in JavaScript',
                        videoUrl: 'https://www.youtube.com/embed/nbX0MIV7-Ek',
                        notes: `### Variables & Memory Storage\n\nVariables store data values in computer memory for reuse. JavaScript has three declaration keywords:\n\n*   var: Legacy syntax, function-scoped.\n*   let: Modern syntax, block-scoped, re-assignable.\n*   const: Modern block-scoped syntax for read-only constants.`
                    },
                    {
                        id: 'fe-js-naming',
                        title: '13. Variable Naming Rules in JS',
                        videoUrl: 'https://www.youtube.com/embed/QYpx61K6cMQ',
                        notes: `### Variable Naming Conventions\n\nVariable names must follow rules and best practices:\n\n*   Must start with a letter, underscore (_), or dollar sign ($).\n*   Cannot start with a number.\n*   Case-sensitive (e.g. userName and username are different).\n*   Cannot use reserved JavaScript keywords (like class, if, const).`
                    },
                    {
                        id: 'fe-js-prototypes',
                        title: '14. Object Prototyping in JavaScript',
                        videoUrl: 'https://www.youtube.com/embed/hAK4PgReRPA',
                        notes: `### Prototypes and Inheritance\n\nJavaScript is a prototype-based language. Every object has a link to a prototype object from which it inherits properties and methods.\n\n*   Object.prototype: The root prototype object.\n*   Prototypal chain allows sharing functions across instances, saving memory.`
                    },
                    {
                        id: 'fe-js-datatypes',
                        title: '15. Data Types in JS',
                        videoUrl: 'https://www.youtube.com/embed/nCwQY8inRvU',
                        notes: `### Primitive vs Complex Data Types\n\nJavaScript data values belong to one of these types:\n\n*   **Primitive Types** (immutable, passed by value):\n    *   String, Number, Boolean, Null, Undefined, Symbol, BigInt.\n*   **Complex Types** (mutable, passed by reference):\n    *   Object, Array, Function.`
                    },
                    {
                        id: 'fe-js-casting',
                        title: '16. Type Casting in JavaScript',
                        videoUrl: 'https://www.youtube.com/embed/pTCGADi-RwY',
                        notes: `### Type Conversion & Coercion\n\nConverting data from one type to another:\n\n*   **Implicit Coercion**: JS engine automatically converts types (e.g., 5 + '5' = '55').\n*   **Explicit Casting**: Manual conversion using functions like Number(), String(), or parseInt().`
                    },
                    {
                        id: 'fe-js-equality',
                        title: '17. Equality and Comparison in JS',
                        videoUrl: 'https://www.youtube.com/embed/bBCS51qUjU8',
                        notes: `### Comparison Operators\n\n*   **Loose Equality** (==): Compares values after coercing types (e.g. 5 == '5' is true).\n*   **Strict Equality** (===): Compares values and data types without coercion (e.g. 5 === '5' is false - BEST PRACTICE).`
                    },
                    {
                        id: 'fe-js-functions',
                        title: '18. Functions in JavaScript',
                        videoUrl: 'https://www.youtube.com/embed/HFaxylC7bUc',
                        notes: `### Functions in JS\n\nFunctions are reusable blocks of code designed to perform a specific task.\n\n*   **Declaration**:\n    function greet(name) { return 'Hello ' + name; }\n*   **Arrow Function** (Modern ES6 syntax):\n    const greet = (name) => \`Hello \${name}\`;`
                    }
                ]
            },
            {
                title: 'Module 4: DOM API & Asynchronous JS',
                lessons: [
                    {
                        id: 'fe-js-dom-api',
                        title: '19. DOM API JS',
                        videoUrl: 'https://www.youtube.com/embed/wbQLEXg_urE',
                        notes: `### Document Object Model (DOM)\n\nThe DOM represents the structure of an HTML page as a tree object, allowing scripts to dynamically query and modify document components.\n\n*   document: The entry point object representing the current web page.`
                    },
                    {
                        id: 'fe-js-dom-manip',
                        title: '20. DOM Manipulations',
                        videoUrl: 'https://www.youtube.com/embed/5fb2aPlgoys',
                        notes: `### Modifying HTML Elements via JS\n\n*   **Querying Elements**: Use document.getElementById() or document.querySelector().\n*   **Updating Content**: Use element.textContent or element.innerHTML.\n*   **Listening to Events**: Use element.addEventListener("click", callback).`
                    },
                    {
                        id: 'fe-js-async-intro',
                        title: '21. Introduction to Asynchronous JavaScript',
                        videoUrl: 'https://www.youtube.com/embed/Coyy79wRz_s',
                        notes: `### Synchronous vs Asynchronous\n\n*   **Synchronous**: Blocking execution. Each line waits for the previous line to finish.\n*   **Asynchronous**: Non-blocking execution. Allows long-running tasks (like database queries) to execute in the background, keeping the main thread responsive.`
                    },
                    {
                        id: 'fe-js-event-loop-1',
                        title: '22. Asynchronous JS 2 (Event Loop)',
                        videoUrl: 'https://www.youtube.com/embed/8aGhZQkoFbQ',
                        notes: `### The Event Loop & Concurrency\n\nJavaScript is single-threaded, meaning it can only do one task at a time. The event loop orchestrates asynchronous tasks:\n\n*   **Call Stack**: Holds execution frames.\n*   **Callback Queue**: Tasks ready to run after call stack is empty.`
                    },
                    {
                        id: 'fe-js-event-loop-2',
                        title: '23. Event Loop',
                        videoUrl: 'https://www.youtube.com/embed/eiC58R16hb8',
                        notes: `### Microtasks and Macrotasks\n\n*   **Microtasks**: High priority tasks, executed immediately after call stack empties (e.g., Promises, queueMicrotask()).\n*   **Macrotasks**: Standard callbacks (e.g., setTimeout(), UI rendering events).`
                    },
                    {
                        id: 'fe-js-async-final',
                        title: '24. Async Final Course',
                        videoUrl: 'https://www.youtube.com/embed/ZYb_ZU8LNxs',
                        notes: `### Promises & Async/Await\n\nModern interfaces use Promises and Async/Await for non-blocking requests:\n\n*   const res = await fetch(url);\n*   Use try-catch blocks to cleanly capture network request rejections.`
                    },
                    {
                        id: 'fe-js-iterators',
                        title: '25. Using Iterators in JavaScript',
                        videoUrl: 'https://www.youtube.com/embed/2oU-DfdWM0c',
                        notes: `### Iterating Collections in JS\n\nWork with lists and arrays using modern iterative methods:\n\n*   forEach: Run callback for each item.\n*   map: Return a new array with modified values.\n*   filter: Extract subsets matching criteria.\n*   reduce: Accumulate elements into a single value.`
                    }
                ]
            },
            {
                title: 'Module 5: APIs & Web Protocols',
                lessons: [
                    {
                        id: 'fe-api-intro',
                        title: '26. What is an API',
                        videoUrl: 'https://www.youtube.com/embed/ByGJQzlzxQg',
                        notes: `### Application Programming Interface (API)\n\nAn API is a contract allowing different software programs to communicate with each other.\n\n*   **Request**: Sending parameters (Headers, Body) to a remote server.\n*   **Response**: Server answers back with status code and body payload (usually JSON).`
                    },
                    {
                        id: 'fe-api-rest',
                        title: '27. Restful API',
                        videoUrl: 'https://www.youtube.com/embed/lsMQRaeKNDk',
                        notes: `### REST Architecture (Representational State Transfer)\n\nA set of principles utilizing standard HTTP verbs for managing database resources:\n\n*   GET: Read resource.\n*   POST: Create resource.\n*   PUT / PATCH: Modify resource.\n*   DELETE: Remove resource.`
                    },
                    {
                        id: 'fe-api-soap-rest',
                        title: '28. Soap vs Rest API',
                        videoUrl: 'https://www.youtube.com/embed/MykDvTS86xs',
                        notes: `### REST vs SOAP protocols\n\n*   **REST**: Uses HTTP directly, supports JSON/XML/HTML, lightweight and fast (Best for Web).\n*   **SOAP**: Simple Object Access Protocol. Strict XML messaging format, high security (Enterprise/Banks).`
                    },
                    {
                        id: 'fe-api-graphql',
                        title: '29. GraphQL',
                        videoUrl: 'https://www.youtube.com/embed/Zg4XIpnLWQg',
                        notes: `### GraphQL Foundations\n\nA query language for APIs created by Facebook. Solves over-fetching and under-fetching:\n\n*   **Single Endpoint**: Request exactly the fields you need in a single roundtrip.\n*   **Schema**: Statically typed documentation.`
                    },
                    {
                        id: 'fe-api-fetch',
                        title: '30. How to Fetch API',
                        videoUrl: 'https://www.youtube.com/embed/37vxWr0WgQk',
                        notes: `### Fetching APIs Client-side\n\nUse browser-native fetch() api to request resource:\n\ntry {\n    const response = await fetch("https://api.com/data");\n    const data = await response.json();\n    console.log(data);\n} catch (error) {\n    console.error("Network error:", error);\n}`
                    },
                    {
                        id: 'fe-api-websocket',
                        title: '31. WebSocket Explained',
                        videoUrl: 'https://www.youtube.com/embed/CzcfeL7ymbU',
                        notes: `### WebSockets & Real-time Web\n\nWebSockets establish a persistent, bi-directional TCP channel between client and server.\n\n*   **Bi-directional**: Unlike HTTP requests, the server can push events to the client at any time without polling.`
                    }
                ]
            },
            {
                title: 'Module 6: Version Control with Git & GitHub',
                lessons: [
                    {
                        id: 'fe-git-intro',
                        title: '32. What is Version Control',
                        videoUrl: 'https://www.youtube.com/embed/Yc8sCSeMhi4',
                        notes: `### Introduction to Version Control\n\nVersion control systems track history of file changes over time, enabling safe experimentation, rollback, and team collaboration.\n\n*   **Local History**: Records snapshots of files locally.\n*   **Collaboration**: Prevents developers from overwriting each other's code modifications.`
                    },
                    {
                        id: 'fe-git-vs',
                        title: '33. Git vs Other Version Control',
                        videoUrl: 'https://www.youtube.com/embed/SAHkNyBh6Gk',
                        notes: `### Distributed vs Centralized VCS\n\n*   **Git** (Distributed): Every developer has a complete local clone of the project history. Fast operations, offline capability.\n*   **SVN** (Centralized): Rely on a single central server to check in and check out files.`
                    },
                    {
                        id: 'fe-git-install',
                        title: '34. Installing Git',
                        videoUrl: 'https://www.youtube.com/embed/t2-l3WvWvqg',
                        notes: `### Setting up Git Locally\n\nDownload and configure Git for your operating system:\n\n*   **Commands**:\n    \`\`\`bash\n    git config --global user.name "Your Name"\n    git config --global user.email "your.email@example.com"\n    \`\`\``
                    },
                    {
                        id: 'fe-git-repo',
                        title: '35. Creating a Repo',
                        videoUrl: 'https://www.youtube.com/embed/SgZhE40BvC4',
                        notes: `### Creating a Repository\n\nInitialize a folder to track it with git:\n\n*   \`git init\` - Initializes a new local git repository.\n*   \`git add .\` - Stages all files in the current directory for commit.\n*   \`git commit -m "initial commit"\` - Saves the staged snapshot to project history.`
                    },
                    {
                        id: 'fe-git-clone',
                        title: '36. Cloning Your First Repo',
                        videoUrl: 'https://www.youtube.com/embed/q9wc7hUrW8U',
                        notes: `### Cloning Git Repositories\n\nDownload an existing repository from a remote host like GitHub:\n\n*   \`git clone <url>\` - Downloads the repository and its entire history to your local machine.`
                    },
                    {
                        id: 'fe-git-remotes',
                        title: '37. Managing Remotes',
                        videoUrl: 'https://www.youtube.com/embed/8-PGbsaeEG0',
                        notes: `### Git Remotes\n\nLink your local repository to a remote server on GitHub/GitLab:\n\n*   \`git remote add origin <url>\` - Establishes default remote link.\n*   \`git remote -v\` - Lists all configured remote URLs.`
                    },
                    {
                        id: 'fe-git-push',
                        title: '38. How to Push Your Code',
                        videoUrl: 'https://www.youtube.com/embed/vpRkAoCqX3o',
                        notes: `### Pushing Local Commits\n\nUpload your local branch changes to the remote repository on GitHub:\n\n*   \`git push -u origin main\` - Pushes main branch commits and sets upstream tracker.`
                    },
                    {
                        id: 'fe-git-pull',
                        title: '39. Pulling Your Code',
                        videoUrl: 'https://www.youtube.com/embed/jRLGobWwA3Y',
                        notes: `### Pulling Remote Updates\n\nDownload and integrate remote commits into your current working branch:\n\n*   \`git pull origin main\` - Fetches remote changes and merges them automatically.`
                    },
                    {
                        id: 'fe-git-merge-rebase',
                        title: '40. Git Merge and Rebase',
                        videoUrl: 'https://www.youtube.com/embed/0chZFIZLR_0',
                        notes: `### Git Merge vs Rebase\n\n*   **Merge**: Combines two branches with a dedicated merge commit, preserving historical timeline shape.\n*   **Rebase**: Re-applies commits on top of another base, creating a linear history (rewriting logs).`
                    }
                ]
            },
            {
                title: 'Module 7: Modern Frontend Development with React & Next.js',
                lessons: [
                    {
                        id: 'fe-react-vite',
                        title: '41. CLI Tools (Vite)',
                        videoUrl: 'https://www.youtube.com/embed/KCrXgy8qtjM',
                        notes: `### Modern CLI Bundlers\n\nCreate fast React applications using Vite instead of Create-React-App:\n\n*   **Setup**:\n    \`\`\`bash\n    npm create vite@latest my-app -- --template react\n    npm install\n    npm run dev\n    \`\`\``
                    },
                    {
                        id: 'fe-react-components-1',
                        title: '42. Components in React JS',
                        videoUrl: 'https://www.youtube.com/embed/d5ooYpXioqE',
                        notes: `### React Components\n\nComponents are reusable UI blocks returned as JS functions containing HTML markup (JSX).\n\n*   **Props**: Arguments passed into components to customize parameters.`
                    },
                    {
                        id: 'fe-react-rendering',
                        title: '43. Rendering in React JS',
                        videoUrl: 'https://www.youtube.com/embed/VPtL6dU0YXc',
                        notes: `### JSX Rendering & Lists\n\nRender dynamically using expressions in braces:\n\n*   **Conditional Rendering**: Use ternary operators (\`condition ? true : false\`).\n*   **List Rendering**: Always use \`.map()\` and specify unique \`key\` attributes.`
                    },
                    {
                        id: 'fe-react-hooks',
                        title: '44. Hooks in React',
                        videoUrl: 'https://www.youtube.com/embed/V9i3cGD-mts',
                        notes: `### React Hooks Intro\n\nHooks let function components tap into state and lifecycle features:\n\n*   \`useState\`: Declares state variables.\n*   \`useEffect\`: Executes side-effects (fetching, event listeners).`
                    },
                    {
                        id: 'fe-react-routing',
                        title: '45. Routing',
                        videoUrl: 'https://www.youtube.com/embed/943D7U74_sQ',
                        notes: `### Client-side Routing\n\nUse React Router to navigate between different view pages without reloading the window page.\n\n*   \`<BrowserRouter>\`, \`<Routes>\`, and \`<Route>\` define path mappings.`
                    },
                    {
                        id: 'fe-react-state',
                        title: '46. State Management',
                        videoUrl: 'https://www.youtube.com/embed/-bEzt5ISACA',
                        notes: `### State Management Systems\n\nHandle shared data across complex components using:\n\n*   **Context API**: Built-in simple global state.\n*   **Redux / Zustand**: Modern, lightweight external state engines.`
                    },
                    {
                        id: 'fe-react-panda',
                        title: '47. Panda CSS',
                        videoUrl: 'https://www.youtube.com/embed/UlY-Ixddjm0',
                        notes: `### Panda CSS Foundations\n\nA modern, build-time CSS-in-JS engine providing type-safe utility styling:\n\n*   Combines the speed of CSS variables with build-time stylesheet generation.`
                    },
                    {
                        id: 'fe-react-tailwind',
                        title: '48. Tailwind CSS',
                        videoUrl: 'https://www.youtube.com/embed/6biMWgD6_JY',
                        notes: `### Tailwind CSS Utility Classes\n\nA utility-first CSS framework for building custom designs directly inside your markup:\n\n*   Example: \`className="flex gap-4 p-4 border border-black shadow-md"\``
                    },
                    {
                        id: 'fe-react-components-2',
                        title: '49. Advanced Components in React',
                        videoUrl: 'https://www.youtube.com/embed/d5ooYpXioqE',
                        notes: `### Advanced React Patterns\n\n*   **Children Props**: Pass markup blocks inside components.\n*   **Custom Hooks**: Extract and share state logic across multiple components.`
                    },
                    {
                        id: 'fe-react-api',
                        title: '50. API Calls in React',
                        videoUrl: 'https://www.youtube.com/embed/dW6-vE9r-s4',
                        notes: `### API Data Fetching\n\nFetch remote database resources inside \`useEffect\`:\n\n*   Use loading flags and local states to manage promise resolution and rendering.`
                    },
                    {
                        id: 'fe-react-testing',
                        title: '51. Testing in React JS',
                        videoUrl: 'https://www.youtube.com/embed/JBSUgDxICg8',
                        notes: `### React Component Testing\n\nWrite automated unit and integration tests using **Jest** and **React Testing Library**:\n\n*   Simulate button clicks, render output components, and check assertions.`
                    },
                    {
                        id: 'fe-react-hookforms',
                        title: '52. Hookforms in React',
                        videoUrl: 'https://www.youtube.com/embed/cc_xmawJ8Kg',
                        notes: `### React Hook Form\n\nA lightweight library to handle form state validation, reduce re-renders, and capture submission data cleanly.`
                    },
                    {
                        id: 'fe-react-nextjs',
                        title: '53. Next.js',
                        videoUrl: 'https://www.youtube.com/embed/ZVnjOPwW4ZA',
                        notes: `### Next.js React Framework\n\nNext.js enables server-side rendering (SSR), static generation (SSG), and API routes out of the box for production-ready applications.`
                    }
                ]
            }
        ]
    },
    'Backend Engineering': {
        description: 'Build robust servers, secure APIs, handle authentication, and orchestrate SQL databases.',
        modules: [
            {
                title: 'Module 1: Grit & Growth Mindset',
                lessons: [
                    {
                        id: 'be-grit-intro',
                        title: '1. What is Grit? — Angela Duckworth',
                        videoUrl: 'https://www.youtube.com/embed/H14bBuluwB8',
                        notes: `### What is Grit?\n\nGrit is passion and perseverance for long-term goals. Angela Duckworth's research shows that talent alone does not make you great — sustained effort does.\n\n*   **Grit > Talent**: IQ and talent are not the best predictors of success.\n*   **Effort Counts Twice**: Talent × Effort = Skill. Skill × Effort = Achievement.\n*   **The Hard Thing Rule**: Do one hard thing that requires deliberate practice.`
                    },
                    {
                        id: 'be-growth-intro',
                        title: '2. Growth Mindset — Carol Dweck',
                        videoUrl: 'https://www.youtube.com/embed/ghRqS3-9LVM',
                        notes: `### Growth Mindset vs Fixed Mindset\n\nCarol Dweck's research reveals two beliefs about ability that shape how we learn.\n\n*   **Fixed Mindset**: "I'm either good or bad at this." Avoids challenges, gives up easily.\n*   **Growth Mindset**: "I can improve with effort." Embraces challenges, persists through setbacks.\n*   **The Power of Yet**: "I don't understand it YET" vs "I don't understand it."`
                    },
                    {
                        id: 'be-nigerian-tech',
                        title: '3. Tech Problems in Nigeria & How You Can Solve Them',
                        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        notes: `### Real Problems You Can Solve With Code\n\nNigeria faces unique challenges that tech skills can address:\n\n*   **Financial Inclusion**: 36M+ adults are unbanked. Build fintech solutions.\n*   **Healthcare Access**: Rural areas lack doctors. Telemedicine apps save lives.\n*   **Education Gaps**: Quality learning materials are scarce. Build EdTech platforms.\n*   **Agriculture**: Farmers lack market access. Create marketplace platforms.\n\n**Your track is your weapon.** Backend engineers build the systems that power solutions.`
                    },
                    {
                        id: 'be-collaboration',
                        title: '4. How Developers Work Together to Build Solutions',
                        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        notes: `### Collaboration in Tech\n\nGreat software is never built alone:\n\n*   **Pair Programming**: Two developers, one screen. Real-time code review.\n*   **Version Control**: Git lets teams work on the same codebase without conflicts.\n*   **Agile Sprints**: Break big goals into 1-2 week chunks. Ship, get feedback, improve.\n*   **Code Reviews**: Every pull request is a learning opportunity.`
                    }
                ]
            }
        ]
    },
    'Product Design (UI/UX)': {
        description: 'Master User Experience (UX), Behavioral Psychology, Figma UI Design, Design Systems, and AI-Assisted Workflows.',
        modules: [
            {
                title: 'Module 1: Grit & Growth Mindset',
                lessons: [
                    {
                        id: 'pd-grit-intro',
                        title: '1. What is Grit? — Angela Duckworth',
                        videoUrl: 'https://www.youtube.com/embed/H14bBuluwB8',
                        notes: `### What is Grit?\n\nGrit is passion and perseverance for long-term goals. Angela Duckworth's research shows that talent alone does not make you great — sustained effort does.\n\n*   **Grit > Talent**: IQ and talent are not the best predictors of success.\n*   **Effort Counts Twice**: Talent × Effort = Skill. Skill × Effort = Achievement.\n*   **The Hard Thing Rule**: Do one hard thing that requires deliberate practice.`
                    },
                    {
                        id: 'pd-growth-intro',
                        title: '2. Growth Mindset — Carol Dweck',
                        videoUrl: 'https://www.youtube.com/embed/ghRqS3-9LVM',
                        notes: `### Growth Mindset vs Fixed Mindset\n\nCarol Dweck's research reveals two beliefs about ability that shape how we learn.\n\n*   **Fixed Mindset**: "I'm either good or bad at this." Avoids challenges, gives up easily.\n*   **Growth Mindset**: "I can improve with effort." Embraces challenges, persists through setbacks.\n*   **The Power of Yet**: "I don't understand it YET" vs "I don't understand it."`
                    },
                    {
                        id: 'pd-nigerian-tech',
                        title: '3. Tech Problems in Nigeria & How You Can Solve Them',
                        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        notes: `### Real Problems You Can Solve With Design\n\nNigeria faces unique challenges that design skills can address:\n\n*   **Financial Inclusion**: 36M+ adults are unbanked. Design accessible fintech apps.\n*   **Healthcare Access**: Rural areas lack doctors. Design telemedicine experiences.\n*   **Education Gaps**: Quality learning materials are scarce. Design learning platforms.\n*   **Agriculture**: Farmers lack market access. Design marketplace experiences.\n\n**Your track is your weapon.** Product designers craft the experiences people love to use.`
                    },
                    {
                        id: 'pd-collaboration',
                        title: '4. How Designers Work Together to Build Solutions',
                        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        notes: `### Collaboration in Tech\n\nGreat products are never designed alone:\n\n*   **Design Sprints**: Five-day process to solve problems quickly.\n*   **Design Systems**: Shared components ensure consistency across products.\n*   **User Testing**: Test prototypes with real users before building.\n*   **Handoff**: Clear specs and documentation for developers.`
                    }
                ]
            },
            {
                title: 'Module 2: UX Research, Strategy & Design Principles',
                lessons: [
                    {
                        id: 'pd-ucd-principles',
                        title: '6. User Centered Design (UCD)',
                        videoUrl: 'https://www.youtube.com/embed/4OVptMIxsT4',
                        notes: `### User-Centered Design (UCD)\n\nAn iterative design process where designers focus on users and their needs in each phase of design.\n\n*   **Understand Context**: Research user environments and goals.\n*   **Specify Requirements**: Define key user stories and pain points.\n*   **Design & Evaluate**: Test prototypes directly with real users.`
                    },
                    {
                        id: 'pd-collaborative-design',
                        title: '7. Collaboration Design',
                        videoUrl: 'https://www.youtube.com/embed/7vMpLXog6tA',
                        notes: `### Collaborative Design & Co-Creation\n\nInvolving cross-functional teams (developers, product managers, stakeholders) early in the design process to ensure alignment and technical feasibility.`
                    },
                    {
                        id: 'pd-heat-maps',
                        title: '8. Heat Maps & User Analytics',
                        videoUrl: 'https://www.youtube.com/embed/tokYjWcu5ok',
                        notes: `### Utilizing Heat Maps in UX\n\nVisual data representations showing where users click, scroll, and spend attention on your web pages.\n\n*   **Click Maps**: Identify hot spots vs ignored CTAs.\n*   **Scroll Maps**: See drop-off rates across page length.`
                    },
                    {
                        id: 'pd-journey-mapping',
                        title: '9. Customer Journey Mapping',
                        videoUrl: 'https://www.youtube.com/embed/NdJV8yuqBEA',
                        notes: `### Journey Mapping\n\nA visual roadmap depicting the end-to-end experience a user has with a product or service.\n\n*   **Touchpoints**: Key interactions between user and product.\n*   **Emotions**: Tracking user feelings at each phase.`
                    },
                    {
                        id: 'pd-problem-statements',
                        title: '10. Defining Problem Statements',
                        videoUrl: 'https://www.youtube.com/embed/yPofFSXctik',
                        notes: `### Problem Statements\n\nClear, concise descriptions of the issue that needs to be addressed before jumping into visual solutions.\n\n*   **Format**: [User] needs [Need] because [Insight].`
                    },
                    {
                        id: 'pd-hmw-questions',
                        title: '11. How Might We (HMW) Questions',
                        videoUrl: 'https://www.youtube.com/embed/51SX9CpFBnc',
                        notes: `### How Might We (HMW) Framework\n\nReframe insights and problem statements into actionable brainstorming opportunities.\n\n*   **How**: Presumes solutions exist.\n*   **Might**: Encourages wild/creative ideas.\n*   **We**: Fosters team collaboration.`
                    },
                    {
                        id: 'pd-business-user-needs',
                        title: '12. Balancing Business & User Needs',
                        videoUrl: 'https://www.youtube.com/embed/mPTHwlgtt0M',
                        notes: `### Aligning Business Goals with User Needs\n\nGreat product design sits at the intersection of user desirability, business viability, and technical feasibility.`
                    },
                    {
                        id: 'pd-prioritization',
                        title: '13. Prioritization Frameworks',
                        videoUrl: 'https://www.youtube.com/embed/CP30xxUdo-g',
                        notes: `### Feature Prioritization Frameworks\n\nDeciding what features to build first when resources and time are limited:\n\n*   **MoSCoW Method**: Must have, Should have, Could have, Won't have.\n*   **RICE Scoring**: Reach, Impact, Confidence, Effort.`
                    }
                ]
            },
            {
                title: 'Module 3: UI Design Tools, Wireframing & Layout Rules',
                lessons: [
                    {
                        id: 'pd-figma-intro',
                        title: '14. Introduction to Figma',
                        videoUrl: 'https://www.youtube.com/embed/kbZejnPXyLM',
                        notes: `### Introduction to Figma\n\nFigma is the industry-standard collaborative vector graphics and prototyping tool.\n\n*   **Frames**: Containers for UI layouts.\n*   **Auto Layout**: Dynamic responsive alignment.`
                    },
                    {
                        id: 'pd-sketch-ui',
                        title: '15. Sketch: Intro to User Interface',
                        videoUrl: 'https://www.youtube.com/embed/kbZejnPXyLM',
                        notes: `### Interface Fundamentals in Sketch & Digital Tools\n\nUnderstanding vector editing, symbols, artboards, and export options.`
                    },
                    {
                        id: 'pd-balsamiq',
                        title: '16. Low-Fidelity Wireframing with Balsamiq',
                        videoUrl: 'https://www.youtube.com/embed/dwqHdlXDCBQ',
                        notes: `### Wireframing with Balsamiq\n\nRapid low-fidelity prototyping to iterate on visual hierarchy and copy before committing to high-fidelity UI.`
                    },
                    {
                        id: 'pd-layout-rules',
                        title: '17. Good Layout Rules & Grid Systems',
                        videoUrl: 'https://www.youtube.com/embed/PKfZ1gnVJ44',
                        notes: `### UI Layout Rules & Grid Systems\n\n*   **8px Grid System**: Maintain mathematical consistency across padding, margins, and sizes.\n*   **Visual Hierarchy**: Size, contrast, and spacing to guide the eye.`
                    },
                    {
                        id: 'pd-figma-prototyping',
                        title: '18. Interactive Prototyping in Figma',
                        videoUrl: 'https://www.youtube.com/embed/k1iwiHJrAWI',
                        notes: `### Figma Prototyping\n\nConnecting frames with transitions, smart animate, overlay triggers, and interactive components.`
                    }
                ]
            },
            {
                title: 'Module 4: Advanced UI, Design Systems & AI-Assisted Design',
                lessons: [
                    {
                        id: 'pd-laws-of-ux',
                        title: '19. Laws of UX',
                        videoUrl: 'https://www.youtube.com/embed/fYs2Mdyasuc',
                        notes: `### Key Laws of UX\n\nPsychological principles every UI/UX designer must know:\n\n*   **Fitts's Law**: Target size and distance dictate acquisition time.\n*   **Hick's Law**: Decision time increases with number of choices.\n*   **Jakob's Law**: Users expect your site to work like other sites.`
                    },
                    {
                        id: 'pd-motion-interactions',
                        title: '20. Motion Design & Micro-Interactions',
                        videoUrl: 'https://www.youtube.com/embed/-L_MwLVYWDs',
                        notes: `### Motion and Micro-Interactions\n\nEnhancing UI feedback with subtle animations, hover states, and smooth transitions.`
                    },
                    {
                        id: 'pd-content-design',
                        title: '21. Content Design & UX Writing',
                        videoUrl: 'https://www.youtube.com/embed/Bir6IayQ-Bw',
                        notes: `### UX Writing & Content Design\n\nWriting clear, concise, and helpful copy for buttons, empty states, error messages, and onboarding.`
                    },
                    {
                        id: 'pd-ai-assisted-design',
                        title: '22. AI-Assisted Design Workflows',
                        videoUrl: 'https://www.youtube.com/embed/2u6bH17NIQk',
                        notes: `### Leveraging AI in Product Design\n\nUsing AI tools for user research synthesis, copy generation, wireframe ideas, and design inspiration.`
                    },
                    {
                        id: 'pd-design-systems',
                        title: '23. Building & Scaling Design Systems',
                        videoUrl: 'https://www.youtube.com/embed/YLo6g58vUm0',
                        notes: `### Design Systems\n\nA collection of reusable components and guidelines governing product design across platforms.\n\n*   **Tokens**: Colors, typography, spacing.\n*   **Components**: Buttons, inputs, modals.`
                    },
                    {
                        id: 'pd-multi-platform',
                        title: '24. Multi-Platform & Responsive Design',
                        videoUrl: 'https://www.youtube.com/embed/tOQ8llEwNHI',
                        notes: `### Cross-Platform UI Design\n\nAdapting design patterns across Mobile (iOS/Android) and Desktop viewports.`
                    },
                    {
                        id: 'pd-ai-figma',
                        title: '25. AI Features in Figma',
                        videoUrl: 'https://www.youtube.com/embed/qJoGFDHjLSE',
                        notes: `### Exploring Figma AI Capabilities\n\nUsing Figma AI for automated layer renaming, image generation, component search, and rapid layout generation.`
                    },
                    {
                        id: 'pd-full-design-project',
                        title: '26. Creating a Full Design Project in Figma',
                        videoUrl: 'https://www.youtube.com/embed/21t4YfNILg4',
                        notes: `### End-to-End Figma Design Project\n\nPutting it all together: From problem statement and wireframes to high-fidelity UI, design system components, and interactive prototype.`
                    }
                ]
            }
        ]
    }
};

/* ───────────────────────────────────────────
   FTA LEARNING MODULES ASSIGNMENT SYSTEM
   ─────────────────────────────────────────── */
const getModuleExercise = (courseKey, modIdx) => {
    if (courseKey === 'Frontend Engineering') {
        switch (modIdx) {
            case 0: return {
                title: 'Module 1 Coding Exercise: HTML Document Structure',
                instruction: `Write a complete, valid HTML5 document that includes:\n1. A <!DOCTYPE html> declaration\n2. An <html> tag wrapping the entire document\n3. A <head> section with a <title> tag containing "My Portfolio"\n4. A <body> section containing:\n   - An <h1> heading with your full name\n   - A <p> paragraph explaining what HTTPS encryption does (mention SSL/TLS)\n   - A <table> with at least 2 rows and 2 columns showing "Protocol" and "Port" (HTTP=80, HTTPS=443)\n   - An <a> anchor link pointing to "https://google.com"\n\nYour code must be properly indented and include HTML comments (<!-- -->) explaining at least 2 sections.`,
                langHint: 'html'
            };
            case 1: return {
                title: 'Module 2 Coding Exercise: CSS Styling Challenge',
                instruction: `Write a complete CSS stylesheet that includes:\n1. A class selector ".brutalist-card" with:\n   - border: 3px solid black\n   - box-shadow: 6px 6px 0 #000\n   - padding: 2rem\n   - background: #ffffff\n2. A class selector ".brutalist-button" with:\n   - border: 3px solid black\n   - box-shadow: 4px 4px 0 #000\n   - font-weight: 900\n   - text-transform: uppercase\n   - cursor: pointer\n3. A media query (@media) targeting max-width: 768px that changes .brutalist-card padding to 1rem\n4. Use at least one CSS variable (custom property) with var()\n\nAll property declarations must end with semicolons. Include CSS comments explaining each block.`,
                langHint: 'css'
            };
            case 2: return {
                title: 'Module 3 Coding Exercise: JavaScript Fundamentals',
                instruction: `Write a JavaScript program that:\n1. Declares a const variable named "greeting" with the value "Hello FutureTech"\n2. Uses console.log() to print the greeting\n3. Declares a function named "calculateAge" that takes a birth year (number) parameter and returns the current year minus the birth year\n4. Calls calculateAge() with a sample year and logs the result\n5. Creates an array named "students" with at least 3 string names\n6. Uses .forEach() to iterate over the array and log each name\n7. Uses .filter() to create a new array of names longer than 5 characters\n8. Uses strict equality (===) in at least one comparison\n\nAll statements must end with semicolons. Include inline comments (//) on every major line explaining what it does.`,
                langHint: 'javascript'
            };
            case 3: return {
                title: 'Module 4 Coding Exercise: DOM Manipulation & Async JS',
                instruction: `Write JavaScript code that:\n1. Uses document.querySelector() to select an element with class ".title-card"\n2. Changes its .style.color to "red"\n3. Uses document.getElementById() to select an element and updates its .textContent\n4. Adds an event listener (addEventListener) for "click" on a button element\n5. Writes an async function named "fetchData" that:\n   - Uses await fetch("https://api.example.com/data")\n   - Parses the response with .json()\n   - Logs the result with console.log\n   - Has a try/catch block for error handling\n6. Calls fetchData()\n\nAll statements must end with semicolons. Include inline comments (//) explaining each step.`,
                langHint: 'javascript'
            };
            case 4: return {
                title: 'Module 5 Coding Exercise: API Integration',
                instruction: `Write an async JavaScript function named "fetchUsers" that:\n1. Declares the function with the "async" keyword\n2. Uses await fetch() to call "https://api.com/users"\n3. Parses the JSON response\n4. Logs the data using console.log\n5. Includes a complete try/catch/finally error handling block\n6. Demonstrates understanding of REST by including comments explaining GET, POST, PUT, DELETE verbs\n7. Shows the difference between REST and GraphQL in a multi-line comment block\n\nInclude inline comments on every line. All statements must end with semicolons.`,
                langHint: 'javascript'
            };
            case 5: return {
                title: 'Module 6 Coding Exercise: Git Version Control',
                instruction: `Write the exact sequence of terminal commands (as a bash script) to:\n1. Initialize a new git repository (git init)\n2. Configure your git user name and email (git config)\n3. Create a .gitignore file listing node_modules and .env\n4. Stage all files (git add .)\n5. Create an initial commit with message "initial release" (git commit)\n6. Add a remote origin URL (git remote add)\n7. Push the code to the main branch (git push)\n8. Show how to pull updates (git pull)\n9. Demonstrate creating and merging a feature branch\n\nEach command must be on its own line. Include bash comments (#) explaining each step.`,
                langHint: 'bash'
            };
            case 6: return {
                title: 'Module 7 Coding Exercise: React Component',
                instruction: `Write a complete functional React component named "Profile" that:\n1. Imports React and useState from 'react'\n2. Declares a state variable "count" initialized to 0 using useState\n3. Returns JSX containing:\n   - A <div> wrapper\n   - An <h2> tag with your full name\n   - A <p> tag showing the count state value\n   - A <button> with onClick handler that increments count\n4. Exports the component as default\n5. Uses proper JSX syntax with className (not class)\n6. Includes a useEffect that logs "Component mounted" on first render\n\nInclude inline comments explaining props, state, and lifecycle concepts.`,
                langHint: 'jsx'
            };
            default: return {
                title: `Module ${modIdx + 1} Coding Exercise`,
                instruction: `Write a complete code solution demonstrating all core concepts from this module. Include inline comments explaining each step.`,
                langHint: 'javascript'
            };
        }
    }
    if (courseKey.includes('Product Design') || courseKey.includes('Design')) {
        switch (modIdx) {
            case 0: return {
                title: 'Module 1 Design Exercise: UX Psychology & Behavior Analysis',
                instruction: `Write a comprehensive UX case study outline applying BJ Fogg’s Behavior Model (B=MAP: Motivation, Ability, Prompt) and the Action Funnel to solve a user onboarding problem.\n\nYour write-up must include:\n1. Problem overview & Target User definition\n2. BJ Fogg Behavior Model breakdown (Motivation factors, Ability simplification, Prompt strategy)\n3. Action Funnel analysis (Awareness -> Evaluation -> Execution)\n4. Distinction between System 1 (fast) & System 2 (slow) thinking interventions\n5. Clear contrast between Product Design vs UI/UX scope\n\nInclude section headers and detailed design notes.`,
                langHint: 'text'
            };
            case 1: return {
                title: 'Module 2 Design Exercise: User Research & Journey Mapping',
                instruction: `Create a detailed User Research & Strategy document for a mobile app idea.\n\nYour write-up must include:\n1. A primary User Persona outline\n2. Customer Journey Map touchpoints and emotion tracking\n3. Clear Problem Statement in the format: [User] needs [Need] because [Insight]\n4. At least 3 "How Might We" (HMW) brainstorming questions\n5. Balancing Business Goals vs User Needs analysis\n6. Feature Prioritization matrix using MoSCoW (Must, Should, Could, Won't) or RICE framework\n7. Heat map analytics strategy (Click maps & Scroll maps)\n\nInclude section headers and structured bullet points.`,
                langHint: 'text'
            };
            case 2: return {
                title: 'Module 3 Design Exercise: Layout Systems & Wireframing',
                instruction: `Provide a detailed UI Layout & Wireframe Architecture specification for a 3-screen mobile flow (Home, Item Details, Checkout).\n\nYour write-up must include:\n1. Layout Grid specifications (8px grid system, columns, gutters, margins)\n2. Typography scale & hierarchy (Headings, Body, Labels)\n3. Low-fidelity Balsamiq wireframe structure description\n4. Auto Layout rules & component spacing in Figma\n5. Interactive Prototype triggers & transitions (Smart Animate, Overlays)\n\nInclude clear documentation and structure.`,
                langHint: 'text'
            };
            case 3: return {
                title: 'Module 4 Design Exercise: Design System & UX Principles',
                instruction: `Write a complete Design System & UX Governance specification.\n\nYour write-up must include:\n1. Design Tokens breakdown (Primary/Secondary Colors, Typography, Spacing, Shadows)\n2. Component Library variants (Buttons, Inputs, Cards, Modals)\n3. Application of Laws of UX (Hick's Law, Fitts's Law, Jakob's Law)\n4. Micro-interactions & Motion design guidelines\n5. UX Copy / Content Design standards\n6. AI-assisted design workflow integration in Figma\n7. Multi-platform responsive adaptations (Desktop vs Mobile)\n\nInclude detailed section headers and design rationale.`,
                langHint: 'text'
            };
            default: return {
                title: `Module ${modIdx + 1} Design Exercise`,
                instruction: `Write a comprehensive design case study outlining research, wireframes, and design system components for this module.`,
                langHint: 'text'
            };
        }
    }
    // Backend fallbacks
    return {
        title: `Module ${modIdx + 1} Coding Exercise`,
        instruction: `Write a complete code solution demonstrating all core concepts from this module. Include detailed inline comments.`,
        langHint: courseKey.includes('Backend') ? 'javascript' : 'text'
    };
};

const runAIGrader = (modIdx, code, courseKey) => {
    const trimmedCode = code.trim();
    const lowerCode = trimmedCode.toLowerCase();
    let steps = [];
    let score = 5; // Start at 5/100 — must EARN every point

    // ═══ UNIVERSAL PRE-CHECKS ═══
    // Step 1: Length check
    if (trimmedCode.length < 60) {
        steps.push('❌ Step 1 — Code Length: FAILED. Submission is extremely short (< 60 chars). A comprehensive solution is required. (+0)');
        return { score: 5, feedback: steps.join('\n'), steps };
    } else if (trimmedCode.length < 150) {
        steps.push('⚠️ Step 1 — Code Length: PARTIAL. Submission is short. Expect deductions for missing logic. (+2)');
        score += 2;
    } else {
        steps.push('✅ Step 1 — Code Length: PASSED. Substantial code submitted. (+5)');
        score += 5;
    }

    // Step 2: Comments check
    const hasComments = trimmedCode.includes('//') || trimmedCode.includes('/*') || trimmedCode.includes('<!--') || trimmedCode.includes('#');
    if (hasComments) {
        const commentCount = (trimmedCode.match(/\/\/|\/\*|\<\!--|#/g) || []).length;
        if (commentCount >= 3) {
            steps.push(`✅ Step 2 — Inline Documentation: PASSED. Found ${commentCount} comment markers. (+8)`);
            score += 8;
        } else {
            steps.push(`⚠️ Step 2 — Inline Documentation: PARTIAL. Only ${commentCount} comment(s) found, minimum 3 required. (+3)`);
            score += 3;
        }
    } else {
        steps.push('❌ Step 2 — Inline Documentation: FAILED. No comments found. Code must include inline documentation. (+0)');
    }

    // Step 3: Indentation / formatting quality
    const lines = trimmedCode.split('\n');
    const indentedLines = lines.filter(l => l.startsWith('  ') || l.startsWith('\t'));
    if (indentedLines.length >= 2) {
        steps.push(`✅ Step 3 — Code Formatting: PASSED. Proper indentation detected (${indentedLines.length} indented lines). (+5)`);
        score += 5;
    } else {
        steps.push('❌ Step 3 — Code Formatting: FAILED. Code lacks proper indentation. All nested blocks must be indented. (+0)');
    }

    // ═══ MODULE-SPECIFIC CHECKS ═══
    if (courseKey === 'Frontend Engineering') {
        if (modIdx === 0) {
            // Module 1: HTML & Internet
            const checks = [
                { test: lowerCode.includes('<!doctype html>'), label: 'DOCTYPE declaration', pts: 10 },
                { test: lowerCode.includes('<html') && lowerCode.includes('</html>'), label: '<html> wrapper', pts: 8 },
                { test: lowerCode.includes('<head') && lowerCode.includes('</head>'), label: '<head> section', pts: 8 },
                { test: lowerCode.includes('<title') && lowerCode.includes('</title>'), label: '<title> tag', pts: 5 },
                { test: lowerCode.includes('<body') && lowerCode.includes('</body>'), label: '<body> section', pts: 8 },
                { test: lowerCode.includes('<h1') && lowerCode.includes('</h1>'), label: '<h1> heading', pts: 8 },
                { test: lowerCode.includes('<p') && lowerCode.includes('</p>'), label: '<p> paragraph', pts: 5 },
                { test: (lowerCode.includes('ssl') || lowerCode.includes('tls')) && (lowerCode.includes('encrypt') || lowerCode.includes('https')), label: 'HTTPS/SSL/TLS mention', pts: 8 },
                { test: lowerCode.includes('<table') && lowerCode.includes('</table>'), label: '<table> element', pts: 8 },
                { test: (lowerCode.includes('80') && lowerCode.includes('443')), label: 'Port 80 & 443 data', pts: 5 },
                { test: lowerCode.includes('<a') && lowerCode.includes('href=') && lowerCode.includes('google.com'), label: '<a> anchor link', pts: 7 },
                { test: lowerCode.includes('<!--'), label: 'HTML comments', pts: 5 },
            ];
            checks.forEach((c, i) => {
                if (c.test) {
                    steps.push(`✅ Step ${i + 4} — ${c.label}: PASSED. (+${c.pts})`);
                    score += c.pts;
                } else {
                    steps.push(`❌ Step ${i + 4} — ${c.label}: FAILED. Not found in your code. (+0)`);
                }
            });
        } else if (modIdx === 1) {
            // Module 2: CSS
            const checks = [
                { test: lowerCode.includes('.brutalist-card'), label: '.brutalist-card selector', pts: 10 },
                { test: lowerCode.includes('.brutalist-button'), label: '.brutalist-button selector', pts: 10 },
                { test: lowerCode.includes('border') && lowerCode.includes('3px') && lowerCode.includes('solid'), label: '3px solid border', pts: 8 },
                { test: lowerCode.includes('box-shadow'), label: 'box-shadow property', pts: 8 },
                { test: lowerCode.includes('font-weight') && lowerCode.includes('900'), label: 'font-weight: 900', pts: 5 },
                { test: lowerCode.includes('text-transform') && lowerCode.includes('uppercase'), label: 'text-transform: uppercase', pts: 5 },
                { test: lowerCode.includes('cursor') && lowerCode.includes('pointer'), label: 'cursor: pointer', pts: 5 },
                { test: lowerCode.includes('@media'), label: '@media responsive query', pts: 10 },
                { test: lowerCode.includes('var('), label: 'CSS variable with var()', pts: 8 },
                { test: lowerCode.includes('{') && lowerCode.includes('}'), label: 'Proper CSS braces', pts: 5 },
                { test: trimmedCode.includes(';'), label: 'Semicolons on properties', pts: 5 },
                { test: lowerCode.includes('/*'), label: 'CSS comments', pts: 3 },
            ];
            checks.forEach((c, i) => {
                if (c.test) {
                    steps.push(`✅ Step ${i + 4} — ${c.label}: PASSED. (+${c.pts})`);
                    score += c.pts;
                } else {
                    steps.push(`❌ Step ${i + 4} — ${c.label}: FAILED. Not found in your code. (+0)`);
                }
            });
        } else if (modIdx === 2) {
            // Module 3: JavaScript Fundamentals
            const checks = [
                { test: lowerCode.includes('const') && lowerCode.includes('greeting') && code.includes('Hello FutureTech'), label: 'const greeting = "Hello FutureTech"', pts: 8 },
                { test: lowerCode.includes('console.log'), label: 'console.log() usage', pts: 5 },
                { test: lowerCode.includes('function') && lowerCode.includes('calculateage'), label: 'function calculateAge()', pts: 10 },
                { test: lowerCode.includes('return'), label: 'return statement', pts: 5 },
                { test: lowerCode.includes('students') && (lowerCode.includes('[') && lowerCode.includes(']')), label: 'students array declaration', pts: 8 },
                { test: lowerCode.includes('.foreach'), label: '.forEach() iterator', pts: 8 },
                { test: lowerCode.includes('.filter'), label: '.filter() method', pts: 8 },
                { test: trimmedCode.includes('==='), label: 'Strict equality (===)', pts: 8 },
                { test: trimmedCode.endsWith(';') || (trimmedCode.match(/;/g) || []).length >= 5, label: 'Semicolons on statements', pts: 8 },
                { test: (trimmedCode.match(/\/\//g) || []).length >= 4, label: 'Inline comments (// x4+)', pts: 10 },
                { test: lowerCode.includes('let') || lowerCode.includes('var'), label: 'Variable declarations (let/var)', pts: 4 },
            ];
            checks.forEach((c, i) => {
                if (c.test) {
                    steps.push(`✅ Step ${i + 4} — ${c.label}: PASSED. (+${c.pts})`);
                    score += c.pts;
                } else {
                    steps.push(`❌ Step ${i + 4} — ${c.label}: FAILED. Not found in your code. (+0)`);
                }
            });
        } else if (modIdx === 3) {
            // Module 4: DOM & Async
            const checks = [
                { test: lowerCode.includes('document.queryselector'), label: 'document.querySelector()', pts: 8 },
                { test: lowerCode.includes('.style.color') && lowerCode.includes('red'), label: '.style.color = "red"', pts: 8 },
                { test: lowerCode.includes('document.getelementbyid'), label: 'document.getElementById()', pts: 8 },
                { test: lowerCode.includes('.textcontent'), label: '.textContent update', pts: 5 },
                { test: lowerCode.includes('addeventlistener'), label: 'addEventListener()', pts: 8 },
                { test: lowerCode.includes('click'), label: '"click" event type', pts: 5 },
                { test: lowerCode.includes('async'), label: 'async keyword', pts: 8 },
                { test: lowerCode.includes('await') && lowerCode.includes('fetch('), label: 'await fetch() call', pts: 10 },
                { test: lowerCode.includes('.json()'), label: '.json() parsing', pts: 5 },
                { test: lowerCode.includes('try') && lowerCode.includes('catch'), label: 'try/catch error handling', pts: 8 },
                { test: (trimmedCode.match(/\/\//g) || []).length >= 3, label: 'Inline comments', pts: 7 },
                { test: trimmedCode.endsWith(';') || (trimmedCode.match(/;/g) || []).length >= 4, label: 'Semicolons', pts: 3 },
            ];
            checks.forEach((c, i) => {
                if (c.test) {
                    steps.push(`✅ Step ${i + 4} — ${c.label}: PASSED. (+${c.pts})`);
                    score += c.pts;
                } else {
                    steps.push(`❌ Step ${i + 4} — ${c.label}: FAILED. (+0)`);
                }
            });
        } else if (modIdx === 4) {
            // Module 5: APIs
            const checks = [
                { test: lowerCode.includes('async'), label: 'async keyword', pts: 8 },
                { test: lowerCode.includes('function') && lowerCode.includes('fetchusers'), label: 'Function named fetchUsers', pts: 10 },
                { test: lowerCode.includes('await') && lowerCode.includes('fetch('), label: 'await fetch() call', pts: 10 },
                { test: lowerCode.includes('api.com/users'), label: 'API endpoint URL', pts: 8 },
                { test: lowerCode.includes('.json()'), label: '.json() response parsing', pts: 5 },
                { test: lowerCode.includes('try') && lowerCode.includes('catch'), label: 'try/catch block', pts: 8 },
                { test: lowerCode.includes('finally'), label: 'finally block', pts: 5 },
                { test: lowerCode.includes('get') && lowerCode.includes('post'), label: 'REST verbs (GET/POST)', pts: 8 },
                { test: lowerCode.includes('put') || lowerCode.includes('delete'), label: 'REST verbs (PUT/DELETE)', pts: 5 },
                { test: lowerCode.includes('graphql'), label: 'GraphQL mention', pts: 5 },
                { test: (trimmedCode.match(/\/\//g) || []).length >= 4, label: 'Inline comments (4+)', pts: 8 },
                { test: (trimmedCode.match(/;/g) || []).length >= 4, label: 'Semicolons (4+)', pts: 3 },
            ];
            checks.forEach((c, i) => {
                if (c.test) {
                    steps.push(`✅ Step ${i + 4} — ${c.label}: PASSED. (+${c.pts})`);
                    score += c.pts;
                } else {
                    steps.push(`❌ Step ${i + 4} — ${c.label}: FAILED. (+0)`);
                }
            });
        } else if (modIdx === 5) {
            // Module 6: Git
            const checks = [
                { test: lowerCode.includes('git init'), label: 'git init', pts: 8 },
                { test: lowerCode.includes('git config'), label: 'git config', pts: 8 },
                { test: lowerCode.includes('.gitignore') || lowerCode.includes('node_modules'), label: '.gitignore file', pts: 5 },
                { test: lowerCode.includes('git add'), label: 'git add', pts: 8 },
                { test: lowerCode.includes('git commit') && lowerCode.includes('initial release'), label: 'git commit with message', pts: 10 },
                { test: lowerCode.includes('git remote add'), label: 'git remote add origin', pts: 8 },
                { test: lowerCode.includes('git push'), label: 'git push', pts: 8 },
                { test: lowerCode.includes('git pull'), label: 'git pull', pts: 8 },
                { test: lowerCode.includes('git branch') || lowerCode.includes('git checkout') || lowerCode.includes('git merge'), label: 'Branch operations', pts: 8 },
                { test: lowerCode.includes('#'), label: 'Bash comments (#)', pts: 8 },
                { test: lines.length >= 8, label: 'At least 8 command lines', pts: 5 },
            ];
            checks.forEach((c, i) => {
                if (c.test) {
                    steps.push(`✅ Step ${i + 4} — ${c.label}: PASSED. (+${c.pts})`);
                    score += c.pts;
                } else {
                    steps.push(`❌ Step ${i + 4} — ${c.label}: FAILED. (+0)`);
                }
            });
        } else if (modIdx === 6) {
            // Module 7: React
            const checks = [
                { test: code.includes('import') && (lowerCode.includes('react') || lowerCode.includes("'react'")), label: 'Import React', pts: 8 },
                { test: lowerCode.includes('usestate'), label: 'useState hook', pts: 10 },
                { test: code.includes('Profile'), label: 'Component named Profile', pts: 10 },
                { test: lowerCode.includes('return'), label: 'return statement', pts: 5 },
                { test: lowerCode.includes('<div') || lowerCode.includes('<div>'), label: '<div> wrapper in JSX', pts: 5 },
                { test: lowerCode.includes('<h2') && lowerCode.includes('</h2>'), label: '<h2> tag with name', pts: 8 },
                { test: lowerCode.includes('<button') || lowerCode.includes('<button>'), label: '<button> element', pts: 5 },
                { test: lowerCode.includes('onclick'), label: 'onClick handler', pts: 8 },
                { test: lowerCode.includes('export default') || lowerCode.includes('export {'), label: 'export default', pts: 5 },
                { test: lowerCode.includes('classname'), label: 'className (not class)', pts: 5 },
                { test: lowerCode.includes('useeffect'), label: 'useEffect hook', pts: 8 },
                { test: (trimmedCode.match(/\/\//g) || []).length >= 3, label: 'Inline comments (3+)', pts: 5 },
            ];
            checks.forEach((c, i) => {
                if (c.test) {
                    steps.push(`✅ Step ${i + 4} — ${c.label}: PASSED. (+${c.pts})`);
                    score += c.pts;
                } else {
                    steps.push(`❌ Step ${i + 4} — ${c.label}: FAILED. (+0)`);
                }
            });
        } else {
            // Generic module check
            const hasCode = lowerCode.includes('function') || lowerCode.includes('const') || lowerCode.includes('<') || lowerCode.includes('git');
            if (hasCode) {
                steps.push('✅ Step 4 — Code syntax detected. (+15)');
                score += 15;
            } else {
                steps.push('❌ Step 4 — No executable code found. (+0)');
            }
        }
    } else if (courseKey.includes('Product Design') || courseKey.includes('Design')) {
        // Product Design (UI/UX) Course Evaluation
        const designChecks = [
            { test: lowerCode.includes('fogg') || lowerCode.includes('b=map') || lowerCode.includes('motivation') || lowerCode.includes('behavior'), label: 'Behavioral Psychology / Fogg Model concepts', pts: 12 },
            { test: lowerCode.includes('user') || lowerCode.includes('persona') || lowerCode.includes('target') || lowerCode.includes('research'), label: 'User Persona / Target Audience definition', pts: 12 },
            { test: lowerCode.includes('journey') || lowerCode.includes('touchpoint') || lowerCode.includes('funnel') || lowerCode.includes('problem'), label: 'Journey Mapping / Funnel / Problem Statement', pts: 12 },
            { test: lowerCode.includes('grid') || lowerCode.includes('layout') || lowerCode.includes('8px') || lowerCode.includes('spacing'), label: 'Grid Systems & Spacing Rules', pts: 12 },
            { test: lowerCode.includes('figma') || lowerCode.includes('wireframe') || lowerCode.includes('balsamiq') || lowerCode.includes('sketch') || lowerCode.includes('component'), label: 'UI Prototyping & Design Tooling (Figma/Balsamiq)', pts: 12 },
            { test: lowerCode.includes('law') || lowerCode.includes('fitts') || lowerCode.includes('hick') || lowerCode.includes('jakob') || lowerCode.includes('heuristic'), label: 'Laws of UX / Heuristic Evaluation', pts: 12 },
            { test: lowerCode.includes('system') || lowerCode.includes('token') || lowerCode.includes('variant') || lowerCode.includes('prototype') || lowerCode.includes('motion'), label: 'Design System Tokens & Component Governance', pts: 10 }
        ];

        designChecks.forEach((c, i) => {
            if (c.test) {
                steps.push(`✅ Step ${i + 4} — ${c.label}: PASSED. (+${c.pts})`);
                score += c.pts;
            } else {
                steps.push(`❌ Step ${i + 4} — ${c.label}: FAILED. (+0)`);
            }
        });
    } else {
        // Non-frontend & Non-design courses: generic check
        const hasCode = lowerCode.includes('function') || lowerCode.includes('const') || lowerCode.includes('class') || lowerCode.includes('import');
        if (hasCode) {
            steps.push('✅ Step 4 — Code structure detected. (+20)');
            score += 20;
        } else {
            steps.push('❌ Step 4 — No code structure found. (+0)');
        }
    }

    // Cap at 100
    score = Math.min(100, score);

    // Final verdict step
    if (score >= 75) {
        steps.push(`\n🏁 FINAL VERDICT: PASSED ✅ — Score ${score}/100. Your code meets the minimum quality threshold.`);
    } else {
        steps.push(`\n🏁 FINAL VERDICT: FAILED ❌ — Score ${score}/100. You need 75/100 to pass. Review the failed steps and resubmit.`);
    }

    return { score, feedback: steps.join('\n'), steps };
};

const AcademyDashboard = ({ portalDates }) => {
    const [selectedCourse, setSelectedCourse] = useState(() => {
        return localStorage.getItem('fta-admin-assigned-course') || 'Frontend Engineering';
    });
    const course = ACADEMY_COURSES[selectedCourse] || ACADEMY_COURSES['Frontend Engineering'];
    const firstLesson = course.modules[0].lessons[0];
    const [selectedLesson, setSelectedLesson] = useState(firstLesson);
    const [selectedModIdx, setSelectedModIdx] = useState(0);
    const [selectedLesIdx, setSelectedLesIdx] = useState(0);
    
    // Accordion state
    const [expandedModules, setExpandedModules] = useState({ 0: true });
    
    const toggleModule = (idx) => {
        setExpandedModules(prev => ({
            ...prev,
            [idx]: !prev[idx]
        }));
    };
    // Candidate Profile State
    const [studentName, setStudentName] = useState(() => {
        const saved = localStorage.getItem('fta-student-session');
        return saved ? JSON.parse(saved).name : 'You (Active Student)';
    });
    const [studentAvatar, setStudentAvatar] = useState(() => {
        const saved = localStorage.getItem('fta-student-session');
        return saved ? JSON.parse(saved).avatar_url : '';
    });
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [editNameInput, setEditNameInput] = useState(studentName);

    // LMS Login System States
    const [studentSession, setStudentSession] = useState(() => {
        const saved = localStorage.getItem('fta-student-session');
        return saved ? JSON.parse(saved) : null;
    });
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [setupAvatar, setSetupAvatar] = useState('');
    const [loginStep, setLoginStep] = useState('email'); // 'email' | 'setup' | 'password'
    const [admittedRecord, setAdmittedRecord] = useState(null);
    const [loginError, setLoginError] = useState(null);
    const [loginLoading, setLoginLoading] = useState(false);

    // Forgotten Password States
    const [otpInput, setOtpInput] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [otpNotice, setOtpNotice] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleRequestOtp = async () => {
        setLoginError(null);
        setLoginLoading(true);
        try {
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedOtp(code);
            setOtpInput('');

            try {
                await fetch('/api/send-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: admittedRecord.email,
                        name: admittedRecord.name,
                        otp: code
                    })
                });
            } catch (err) {
                console.warn('OTP email fetch error:', err);
            }

            setOtpNotice(`A 6-digit verification code has been sent to ${admittedRecord.email}.`);
            setLoginStep('forgot_otp');
        } catch (err) {
            setLoginError('Failed to generate reset code.');
        }
        setLoginLoading(false);
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        setLoginError(null);
        if (otpInput.trim() !== generatedOtp.trim()) {
            setLoginError('Invalid code. Please check your email and try again.');
            return;
        }
        setLoginStep('forgot_reset');
    };

    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();
        setLoginError(null);
        if (newPassword.length < 6) {
            setLoginError('Password must be at least 6 characters.');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setLoginError('Passwords do not match.');
            return;
        }

        setLoginLoading(true);
        try {
            let existingProducts = {};
            try {
                existingProducts = typeof admittedRecord.products === 'string' ? JSON.parse(admittedRecord.products) : (admittedRecord.products || {});
            } catch (e) {}

            const updatedProducts = JSON.stringify({
                ...existingProducts,
                password: newPassword
            });

            const { error: updateError } = await supabase
                .from('registrations')
                .update({ products: updatedProducts })
                .eq('id', admittedRecord.id);

            if (updateError) throw updateError;

            const sessionData = {
                id: admittedRecord.id,
                name: admittedRecord.name,
                email: admittedRecord.email,
                course: admittedRecord.company_name || 'Frontend Engineering',
                cohort: admittedRecord.cohort || 'Cohort 1',
                avatar_url: existingProducts.avatar_url || ''
            };

            localStorage.setItem('fta-student-session', JSON.stringify(sessionData));
            setStudentName(admittedRecord.name);
            setStudentAvatar(existingProducts.avatar_url || '');
            localStorage.setItem('fta-student-name', admittedRecord.name);
            localStorage.setItem('fta-student-avatar', existingProducts.avatar_url || '');
            setStudentSession(sessionData);
        } catch (err) {
            console.error('Password reset error:', err);
            setLoginError('Failed to update password. Try again.');
        }
        setLoginLoading(false);
    };

    // Sync selected course track with admitted course when logging in
    useEffect(() => {
        if (studentSession && studentSession.course) {
            setSelectedCourse(studentSession.course);
        }
    }, [studentSession]);

    const handleCheckEmail = async (e) => {
        e.preventDefault();
        setLoginError(null);
        setLoginLoading(true);
        try {
            const cleanEmail = loginEmail.trim().toLowerCase();
            const { data: records, error } = await supabase
                .from('registrations')
                .select('*')
                .ilike('email', cleanEmail);

            if (error) throw error;

            if (!records || records.length === 0) {
                setLoginError('not yet admitted');
                setLoginLoading(false);
                return;
            }

            // Find an admitted record first, or fallback to the first record found
            const data = records.find(r => {
                try {
                    const p = typeof r.products === 'string' ? JSON.parse(r.products) : (r.products || {});
                    return p && p.admitted === true;
                } catch (e) { return false; }
            }) || records[0];

            let admitted = false;
            let password = '';
            let avatarUrl = '';
            try {
                const parsed = JSON.parse(data.products);
                if (parsed && typeof parsed === 'object') {
                    admitted = !!parsed.admitted;
                    password = parsed.password || '';
                    avatarUrl = parsed.avatar_url || '';
                }
            } catch (e) {}

            if (!admitted) {
                setLoginError('not yet admitted');
                setLoginLoading(false);
                return;
            }

            setAdmittedRecord(data);
            if (!password) {
                setLoginStep('setup');
            } else {
                setLoginStep('password');
            }
        } catch (err) {
            console.error('Email check error:', err);
            setLoginError('Verification failed. Try again.');
        }
        setLoginLoading(false);
    };

    const handleCompleteSetup = async (e) => {
        e.preventDefault();
        setLoginError(null);
        if (loginPassword.length < 6) {
            setLoginError('Password must be at least 6 characters.');
            return;
        }
        if (loginPassword !== confirmPassword) {
            setLoginError('Passwords do not match.');
            return;
        }

        setLoginLoading(true);
        try {
            let avatarUrl = setupAvatar;
            const avatarFile = document.getElementById('avatar-file-input')?.files[0];
            if (avatarFile) {
                const fileName = `student_avatars/${Date.now()}_${avatarFile.name}`;
                let { error: uploadError } = await supabase.storage
                    .from('partners')
                    .upload(fileName, avatarFile);
                if (uploadError) throw uploadError;

                const { data: publicUrlData } = supabase.storage
                    .from('partners')
                    .getPublicUrl(fileName);
                avatarUrl = publicUrlData.publicUrl;
            }

            let level = 'Beginner';
            try {
                const parsed = JSON.parse(admittedRecord.products);
                if (parsed && typeof parsed === 'object') {
                    level = parsed.level || 'Beginner';
                }
            } catch (e) {
                level = admittedRecord.products || 'Beginner';
            }

            const productsValue = JSON.stringify({
                level: level,
                admitted: true,
                password: loginPassword,
                avatar_url: avatarUrl
            });

            const { error: updateError } = await supabase
                .from('registrations')
                .update({ products: productsValue })
                .eq('id', admittedRecord.id);

            if (updateError) throw updateError;

            const sessionData = {
                id: admittedRecord.id,
                name: admittedRecord.name,
                email: admittedRecord.email,
                course: admittedRecord.company_name || 'Frontend Engineering',
                cohort: admittedRecord.cohort || 'Cohort 1',
                avatar_url: avatarUrl
            };

            localStorage.setItem('fta-student-session', JSON.stringify(sessionData));
            setStudentName(admittedRecord.name);
            setStudentAvatar(avatarUrl);
            localStorage.setItem('fta-student-name', admittedRecord.name);
            localStorage.setItem('fta-student-avatar', avatarUrl);
            setStudentSession(sessionData);
        } catch (err) {
            console.error('Setup error:', err);
            setLoginError('Failed to complete onboarding. Try again.');
        }
        setLoginLoading(false);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoginError(null);
        setLoginLoading(true);
        try {
            let storedPassword = '';
            let avatarUrl = '';
            try {
                const parsed = JSON.parse(admittedRecord.products);
                if (parsed && typeof parsed === 'object') {
                    storedPassword = parsed.password || '';
                    avatarUrl = parsed.avatar_url || '';
                }
            } catch (e) {}

            if (loginPassword !== storedPassword) {
                setLoginError('Incorrect password. Please try again.');
                setLoginLoading(false);
                return;
            }

            const sessionData = {
                id: admittedRecord.id,
                name: admittedRecord.name,
                email: admittedRecord.email,
                course: admittedRecord.company_name || 'Frontend Engineering',
                cohort: admittedRecord.cohort || 'Cohort 1',
                avatar_url: avatarUrl
            };

            localStorage.setItem('fta-student-session', JSON.stringify(sessionData));
            setStudentName(admittedRecord.name);
            setStudentAvatar(avatarUrl);
            localStorage.setItem('fta-student-name', admittedRecord.name);
            localStorage.setItem('fta-student-avatar', avatarUrl);
            setStudentSession(sessionData);
        } catch (err) {
            console.error('Login error:', err);
            setLoginError('Failed to sign in. Try again.');
        }
        setLoginLoading(false);
    };

    const handleLogOut = () => {
        localStorage.removeItem('fta-student-session');
        localStorage.removeItem('fta-student-name');
        localStorage.removeItem('fta-student-avatar');
        setStudentSession(null);
        setLoginEmail('');
        setLoginPassword('');
        setConfirmPassword('');
        setLoginStep('email');
        setAdmittedRecord(null);
    };

    // Read Peer Posts State (for unread counter icon)
    const [readPostIds, setReadPostIds] = useState(() => JSON.parse(localStorage.getItem('fta-read-posts') || '[]'));

    // Stuck in Task Modal State
    const [showStuckModal, setShowStuckModal] = useState(false);
    const [stuckTaskData, setStuckTaskData] = useState(null);

    // Mobile Modules Drawer State
    const [showMobileModulesDrawer, setShowMobileModulesDrawer] = useState(false);

    // Post Challenge Popup State
    const [showPostForm, setShowPostForm] = useState(false);

    // Header Brand Dropdown State
    const [showHeaderDropdown, setShowHeaderDropdown] = useState(false);
    const [showProfileDropdownDesktop, setShowProfileDropdownDesktop] = useState(false);
    const [openReplyBoxes, setOpenReplyBoxes] = useState({});

    // Cohort — assigned by admin per student in database
    const studentCohort = studentSession?.cohort || localStorage.getItem('fta-admin-assigned-cohort') || 'Cohort 1';
    const [releasedModuleIndices, setReleasedModuleIndices] = useState([]);
    const [releaseLoading, setReleaseLoading] = useState(true);
    const [assignmentText, setAssignmentText] = useState('');
    const [isGrading, setIsGrading] = useState(false);
    const [gradingResult, setGradingResult] = useState(null);
    const [recentSubmissionCount, setRecentSubmissionCount] = useState(0);

    // Sub-tab switching
    const [academyTab, setAcademyTab] = useState('curriculum'); // 'curriculum' | 'peers' | 'notifications'

    // Portal dates sync state
    const [localPortalDates, setLocalPortalDates] = useState(() => {
        if (portalDates && Object.keys(portalDates).length > 0) return portalDates;
        try { return JSON.parse(localStorage.getItem('fta-portal-dates') || '{}'); } catch { return {}; }
    });

    useEffect(() => {
        if (portalDates && Object.keys(portalDates).length > 0) {
            setLocalPortalDates(portalDates);
        } else {
            supabase.from('site_settings').select('*').eq('key', 'portal_dates').maybeSingle().then(({ data }) => {
                if (data && data.value) {
                    try {
                        const parsed = JSON.parse(data.value);
                        setLocalPortalDates(parsed);
                        localStorage.setItem('fta-portal-dates', data.value);
                    } catch {}
                }
            });
        }
    }, [portalDates]);

    const effectivePortalDates = (portalDates && Object.keys(portalDates).length > 0) ? portalDates : localPortalDates;
    const myPortalDate = effectivePortalDates?.[studentCohort] || '';
    const portalUnlockTime = myPortalDate ? new Date(myPortalDate) : null;
    const portalIsLocked = studentSession && portalUnlockTime && portalUnlockTime > new Date();

    const [portalCountdown, setPortalCountdown] = useState(() => {
        if (!portalUnlockTime) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        const diff = portalUnlockTime - new Date();
        return {
            days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
            hours: Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
            minutes: Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))),
            seconds: Math.max(0, Math.floor((diff % (1000 * 60)) / 1000))
        };
    });

    useEffect(() => {
        if (!portalIsLocked || !portalUnlockTime) return;
        const timer = setInterval(() => {
            const diff = portalUnlockTime - new Date();
            if (diff <= 0) { clearInterval(timer); window.location.reload(); return; }
            setPortalCountdown({
                days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
                hours: Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
                minutes: Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))),
                seconds: Math.max(0, Math.floor((diff % (1000 * 60)) / 1000))
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [portalIsLocked, portalUnlockTime]);

    // Student Score & Manual Grades State
    const [manualGrades, setManualGrades] = useState([]);
    const [customModules, setCustomModules] = useState([]);
    const [selectedScoreModule, setSelectedScoreModule] = useState(null);
    const [peerSubmissions, setPeerSubmissions] = useState([]);
    const [showScoreModal, setShowScoreModal] = useState(false);

    // Fetch manual grades from Supabase
    useEffect(() => {
        if (studentSession && studentSession.email) {
            supabase.from('manual_grades').select('*').eq('student_email', studentSession.email).then(({ data }) => {
                if (data) setManualGrades(data);
            });
        }
    }, [studentSession]);

    // Fetch custom modules from Supabase
    useEffect(() => {
        supabase.from('custom_modules').select('*').order('order_index').then(({ data }) => {
            if (data) setCustomModules(data);
        });
    }, []);

    // Fetch peer submissions from Supabase (filtered by track/course)
    useEffect(() => {
        if (studentSession) {
            supabase.from('peer_submissions').select('*').eq('track', selectedCourse).order('created_at', { ascending: false }).then(({ data }) => {
                if (data) setPeerSubmissions(data);
            });
        }
    }, [studentSession, selectedCourse]);

    // Fetch student's peer groups
    const [myPeerGroups, setMyPeerGroups] = useState([]);
    const [showPeerDetails, setShowPeerDetails] = useState(null);
    const [peerSubmitText, setPeerSubmitText] = useState('');
    const [peerSubmitLoading, setPeerSubmitLoading] = useState(false);
    useEffect(() => {
        if (studentSession && studentSession.email) {
            const studentCohort = studentSession.cohort || 'Cohort 1';
            supabase.from('peer_groups').select('*').eq('track', selectedCourse).eq('cohort', studentCohort).order('created_at', { ascending: false }).then(({ data }) => {
                if (data && data.length > 0) {
                    const myGroups = data.filter(g =>
                        g.members.some(m => m.email === studentSession.email)
                    );
                    setMyPeerGroups(myGroups);
                } else {
                    setMyPeerGroups([]);
                }
            });
        }
    }, [studentSession, selectedCourse]);

    const handleSubmitPeerProject = async (group) => {
        if (!peerSubmitText.trim()) { alert('Paste your project link or describe your submission.'); return; }
        setPeerSubmitLoading(true);
        try {
            const { error } = await supabase.from('peer_submissions').insert({
                cohort: group.cohort,
                track: group.track,
                module_index: group.module_index,
                group_name: `Group ${group.group_number}`,
                members: group.members,
                submission_text: peerSubmitText.trim(),
                submitter_email: studentSession.email,
                submitter_name: studentSession.name || studentSession.email
            });
            if (error) throw error;
            setPeerSubmitText('');
            const { data } = await supabase.from('peer_submissions').select('*').eq('track', selectedCourse).order('created_at', { ascending: false });
            if (data) setPeerSubmissions(data);
            alert('✅ Submission received! You will see your score within 24 hours after admin review.');
        } catch (err) {
            alert('Error: ' + err.message);
        }
        setPeerSubmitLoading(false);
    };

    // Calculate total score from manual grades + exercise scores + deadline penalties
    const totalScore = React.useMemo(() => {
        let total = 0;
        let count = 0;
        if (manualGrades.length > 0) {
            manualGrades.forEach(g => { total += g.score; count++; });
        }
        // Add exercise scores
        const exerciseState = gradingResult?.breakdown || {};
        Object.values(exerciseState).forEach(b => {
            if (b.earned) { total += b.earned; count++; }
        });
        // Penalty: if student is in a peer group and deadline passed without submission, score=0 for that module
        myPeerGroups.forEach(pg => {
            if (pg.deadline && new Date(pg.deadline) < new Date() && !pg.is_unpaired) {
                const hasSubmitted = peerSubmissions.some(s => s.module_index === pg.module_index && s.submitter_email === studentSession?.email);
                if (!hasSubmitted) {
                    // Check if already graded for this module
                    const alreadyGraded = manualGrades.some(g => g.module_index === pg.module_index);
                    if (!alreadyGraded) {
                        total += 0;
                        count++;
                    }
                }
            }
        });
        if (count === 0) return 0;
        return Math.round(total / count);
    }, [manualGrades, gradingResult, myPeerGroups, peerSubmissions, studentSession]);

    // Get per-module grade breakdown (includes deadline penalty)
    const moduleGrades = React.useMemo(() => {
        const track = selectedCourse;
        const course = ACADEMY_COURSES[track];
        if (!course) return [];
        const getScoreForModule = (idx) => {
            const grade = manualGrades.find(g => g.module_index === idx && g.track === track);
            if (grade) return { score: grade.score, feedback: grade.feedback, graded_at: grade.graded_at };
            // Check peer group deadline penalty
            const pg = myPeerGroups.find(g => g.module_index === idx && g.track === track);
            if (pg && pg.deadline && new Date(pg.deadline) < new Date() && !pg.is_unpaired) {
                const hasSubmitted = peerSubmissions.some(s => s.module_index === idx && s.submitter_email === studentSession?.email);
                if (!hasSubmitted) return { score: 0, feedback: 'Deadline passed — no submission', graded_at: pg.deadline };
            }
            return { score: null, feedback: null, graded_at: null };
        };
        const builtinModules = course.modules.map((mod, idx) => {
            const result = getScoreForModule(idx);
            return { index: idx, title: mod.title, ...result, isCustom: false };
        });
        const customMods = customModules.filter(m => m.track === track).map((cm, i) => {
            const idx = course.modules.length + i;
            const result = getScoreForModule(idx);
            return { index: idx, title: cm.title, ...result, isCustom: true };
        });
        return [...builtinModules, ...customMods];
    }, [manualGrades, selectedCourse, customModules, myPeerGroups, peerSubmissions, studentSession]);

    // Peer posts states — loaded from Supabase, not localStorage
    const [peerPosts, setPeerPosts] = useState([]);
    const [peerPostsLoaded, setPeerPostsLoaded] = useState(false);
    const [peerTitle, setPeerTitle] = useState('');
    const [peerBody, setPeerBody] = useState('');
    const [peerTag, setPeerTag] = useState('Bug 🐛');
    const [replyInputs, setReplyInputs] = useState({});

    const fetchPeerPosts = async () => {
        const { data, error } = await supabase
            .from('peer_messages')
            .select('*')
            .eq('cohort', studentCohort)
            .eq('track', selectedCourse)
            .order('created_at', { ascending: false });
        if (!error && data) {
            setPeerPosts(data.map(m => ({
                id: m.id,
                channel: m.channel,
                title: m.title,
                body: m.body,
                tag: m.tag,
                author: m.author,
                authorAvatar: m.author_avatar,
                date: m.message_date,
                cohort: m.cohort,
                track: m.track,
                replies: m.replies || []
            })));
        }
        setPeerPostsLoaded(true);
    };

    useEffect(() => {
        if (studentSession) {
            fetchPeerPosts();
        }
    }, [studentSession, studentCohort, selectedCourse]);

    // Real-time subscription for peer messages (filtered by cohort + track client-side)
    useEffect(() => {
        if (!studentSession) return;

        const channel = supabase
            .channel('peer-messages-realtime')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'peer_messages',
                filter: `cohort=eq.${studentCohort}`
            }, (payload) => {
                const m = payload.new;
                if (m.track && m.track !== selectedCourse) return;
                setPeerPosts(prev => {
                    if (prev.some(p => p.id === m.id)) return prev;
                    return [...prev, {
                        id: m.id,
                        channel: m.channel,
                        title: m.title,
                        body: m.body,
                        tag: m.tag,
                        author: m.author,
                        authorAvatar: m.author_avatar,
                        date: m.message_date,
                        cohort: m.cohort,
                        track: m.track,
                        replies: m.replies || []
                    }];
                });
            })
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'peer_messages',
                filter: `cohort=eq.${studentCohort}`
            }, (payload) => {
                const m = payload.new;
                if (m.track && m.track !== selectedCourse) return;
                setPeerPosts(prev => prev.map(p =>
                    p.id === m.id ? {
                        ...p,
                        replies: m.replies || []
                    } : p
                ));
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [studentSession, studentCohort, selectedCourse]);

    // Discord Peer Hub states
    const [activeChannel, setActiveChannel] = useState('general-questions');
    const [discordInput, setDiscordInput] = useState('');
    const [replyTargetPost, setReplyTargetPost] = useState(null);
    const [mobileShowSidebar, setMobileShowSidebar] = useState(true);

    // Challenge visibility state
    const [showModuleChallenge, setShowModuleChallenge] = useState(false);

    // Notifications states
    const [notifications, setNotifications] = useState(() => JSON.parse(localStorage.getItem('fta-notifications') || '[]'));
    const [unreadCount, setUnreadCount] = useState(() => {
        const notes = JSON.parse(localStorage.getItem('fta-notifications') || '[]');
        return notes.filter(n => !n.read).length;
    });

    // Compute live user module exercise scores
    const totalModules = course.modules.length;
    const allScores = releasedModuleIndices.map(idx => localStorage.getItem(`fta-exercise-score-mod-${idx}`)).filter(Boolean).map(Number);
    const completedCount = allScores.length;
    const avgScore = completedCount > 0 ? Math.round(allScores.reduce((a,b)=>a+b,0)/completedCount) : 0;
    const passedCount = allScores.filter(s => s >= 50).length;

    // Reset showModuleChallenge when lesson or module changes
    useEffect(() => {
        setShowModuleChallenge(false);
    }, [selectedModIdx, selectedLesIdx]);

    // Sync selected lesson when course changes
    useEffect(() => {
        if (releasedModulesWithIndex.length > 0) {
            const firstReleased = releasedModulesWithIndex[0];
            setSelectedLesson(firstReleased.lessons[0]);
            setSelectedModIdx(firstReleased.originalIdx);
            setSelectedLesIdx(0);
            setExpandedModules({ [firstReleased.originalIdx]: true });
        } else {
            setSelectedLesson(course.modules[0].lessons[0]);
            setSelectedModIdx(0);
            setSelectedLesIdx(0);
            setExpandedModules({ 0: true });
        }
    }, [selectedCourse]);

    // Fetch released modules for this student's cohort + track
    useEffect(() => {
        const fetchReleases = async () => {
            setReleaseLoading(true);
            const { data, error } = await supabase
                .from('module_releases')
                .select('module_index')
                .eq('cohort', studentCohort)
                .eq('track', selectedCourse);
            if (!error && data) {
                setReleasedModuleIndices(data.map(r => r.module_index));
            }
            setReleaseLoading(false);
        };
        fetchReleases();
    }, [studentCohort, selectedCourse]);

    // Build released-only module list
    const releasedModules = course.modules.filter((_, idx) => releasedModuleIndices.includes(idx));
    const hasReleasedModules = releasedModules.length > 0;
    const releasedModulesWithIndex = [
        ...course.modules.map((mod, idx) => ({ originalIdx: idx, ...mod })),
        ...customModules.filter(m => m.track === selectedCourse).map((m, i) => ({
            originalIdx: course.modules.length + i,
            title: m.title,
            lessons: m.lessons || [],
            isCustom: true
        }))
    ].filter(m => releasedModuleIndices.includes(m.originalIdx));

    // Sync assignment text and grading status when lesson changes or on submission
    useEffect(() => {
        setAssignmentText('');
        const savedScore = localStorage.getItem(`fta-exercise-score-mod-${selectedModIdx}`);
        const savedFeedback = localStorage.getItem(`fta-exercise-feedback-mod-${selectedModIdx}`);
        const savedCode = localStorage.getItem(`fta-exercise-code-mod-${selectedModIdx}`);
        
        if (savedScore) {
            setGradingResult({
                score: parseInt(savedScore),
                feedback: savedFeedback,
                code: savedCode
            });
        } else {
            setGradingResult(null);
        }
    }, [selectedModIdx, recentSubmissionCount]);

    // Check if a lesson is locked
    const isLessonLocked = (les, modIdx, lesIdx) => {
        // 0. Module not released → hidden/locked
        if (!releasedModuleIndices.includes(modIdx)) {
            return true;
        }

        // 1. Admin cohort lock check
        const cohortLocks = JSON.parse(localStorage.getItem('fta-cohort-locks') || '{}');
        const isModuleLockedByAdmin = cohortLocks[`${studentCohort}-${selectedCourse}-module-${modIdx}`];
        
        // If explicitly locked by admin -> locked
        if (isModuleLockedByAdmin === true) {
            return true;
        }
        // If explicitly unlocked from the admin page -> unlock all topics
        if (isModuleLockedByAdmin === false) {
            return false;
        }

        // 2. Sequential module progression check (default behavior when not overridden by admin)
        // First module is unlocked by default
        if (modIdx === 0) {
            return false;
        }

        // Higher modules are locked until the previous module is passed (score >= 50)
        const prevModIdx = modIdx - 1;
        const scoreStr = localStorage.getItem(`fta-exercise-score-mod-${prevModIdx}`);
        if (!scoreStr) {
            return true;
        }
        const scoreVal = parseInt(scoreStr);
        if (isNaN(scoreVal) || scoreVal < 50) {
            return true;
        }

        return false;
    };

    // Scratchpad notes state
    const [noteText, setNoteText] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [showNotesModal, setShowNotesModal] = useState(false);

    // Load saved notes when lesson changes
    useEffect(() => {
        const saved = localStorage.getItem(`fta-notes-${selectedLesson.id}`) || '';
        setNoteText(saved);
    }, [selectedLesson]);

    const handleNoteChange = (e) => {
        const val = e.target.value;
        setNoteText(val);
        setIsSaving(true);
        localStorage.setItem(`fta-notes-${selectedLesson.id}`, val);
        setTimeout(() => setIsSaving(false), 500);
    };

    const handleDownloadNotes = () => {
        const blob = new Blob([noteText], { type: 'text/plain;charset=utf-8' });
        download(blob, `FTA-Notes-${selectedLesson.id}.txt`, 'text/plain');
    };

    const handleClearNotes = () => {
        if (confirm('Are you sure you want to clear your scratchpad notes for this lesson?')) {
            setNoteText('');
            localStorage.removeItem(`fta-notes-${selectedLesson.id}`);
        }
    };

    if (!studentSession) {
        return (
            <div style={{
                minHeight: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem 1rem',
                fontFamily: "'Outfit', sans-serif"
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '450px',
                    background: '#ffffff',
                    border: '4px solid #000000',
                    boxShadow: '8px 8px 0 #000000',
                    padding: '2.5rem',
                    boxSizing: 'border-box',
                    animation: 'fadeIn 0.3s ease-out'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <span style={{ fontSize: '3rem' }}>🎓</span>
                        <h2 style={{ fontFamily: 'Outfit', fontWeight: 950, fontSize: '1.6rem', color: '#000000', margin: '0.8rem 0 0.4rem 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Academy LMS Login
                        </h2>
                        <p style={{ color: '#52525b', fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>
                            Future Tech Academy Portal • Cohort One
                        </p>
                    </div>

                    {loginError && (
                        <div style={{
                            background: '#fef2f2',
                            color: '#b91c1c',
                            border: '2px solid #000000',
                            padding: '0.8rem 1rem',
                            borderRadius: '0.4rem',
                            marginBottom: '1.5rem',
                            fontSize: '0.82rem',
                            fontWeight: 900,
                            textAlign: 'center',
                            textTransform: 'uppercase'
                        }}>
                            ⚠️ {loginError}
                        </div>
                    )}

                    {loginStep === 'email' && (
                        <form onSubmit={handleCheckEmail} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <label style={{ fontSize: '0.78rem', fontWeight: 900, textTransform: 'uppercase', color: '#000' }}>Enter Student Email</label>
                                <input
                                    type="email"
                                    required
                                    value={loginEmail}
                                    onChange={e => setLoginEmail(e.target.value)}
                                    placeholder="your.email@example.com"
                                    style={{
                                        padding: '0.9rem 1.2rem',
                                        border: '3px solid #000000',
                                        fontSize: '0.95rem',
                                        fontFamily: 'Inter, sans-serif',
                                        outline: 'none',
                                        background: '#ffffff',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loginLoading}
                                style={{
                                    background: 'var(--accent-r)',
                                    color: '#ffffff',
                                    border: '3px solid #000000',
                                    padding: '1rem',
                                    fontFamily: 'Outfit',
                                    fontWeight: 900,
                                    fontSize: '0.95rem',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    boxShadow: '4px 4px 0 #000000',
                                    transition: 'all 0.1s ease',
                                    width: '100%'
                                }}
                            >
                                {loginLoading ? 'Checking Admission...' : 'Continue →'}
                            </button>
                        </form>
                    )}

                    {loginStep === 'setup' && (
                        <form onSubmit={handleCompleteSetup} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div style={{ background: '#dcfce7', color: '#15803d', border: '2px solid #000', padding: '0.6rem 0.8rem', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', borderRadius: '0.4rem', textAlign: 'center' }}>
                                🔓 Admission Confirmed! Let's set up your account.
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <label style={{ fontSize: '0.78rem', fontWeight: 900, textTransform: 'uppercase', color: '#000' }}>Choose Password</label>
                                <input
                                    type="password"
                                    required
                                    minLength={6}
                                    value={loginPassword}
                                    onChange={e => setLoginPassword(e.target.value)}
                                    placeholder="Minimum 6 characters"
                                    style={{
                                        padding: '0.9rem 1.2rem',
                                        border: '3px solid #000000',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <label style={{ fontSize: '0.78rem', fontWeight: 900, textTransform: 'uppercase', color: '#000' }}>Confirm Password</label>
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    placeholder="Repeat chosen password"
                                    style={{
                                        padding: '0.9rem 1.2rem',
                                        border: '3px solid #000000',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <label style={{ fontSize: '0.78rem', fontWeight: 900, textTransform: 'uppercase', color: '#000' }}>Upload Profile Picture</label>
                                <input
                                    type="file"
                                    id="avatar-file-input"
                                    accept="image/*"
                                    style={{
                                        padding: '0.6rem 0.8rem',
                                        border: '3px solid #000000',
                                        fontSize: '0.85rem',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loginLoading}
                                style={{
                                    background: 'var(--accent-r)',
                                    color: '#ffffff',
                                    border: '3px solid #000000',
                                    padding: '1rem',
                                    fontFamily: 'Outfit',
                                    fontWeight: 900,
                                    fontSize: '0.95rem',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    boxShadow: '4px 4px 0 #000000',
                                    transition: 'all 0.1s ease',
                                    width: '100%'
                                }}
                            >
                                {loginLoading ? 'Setting up Account...' : 'Complete Setup & Enter LMS 🚀'}
                            </button>
                        </form>
                    )}

                    {loginStep === 'password' && (
                        <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                                <div style={{ background: 'var(--accent-r)', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, border: '1.5px solid #000' }}>
                                    {admittedRecord.name.charAt(0)}
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontWeight: 900, fontSize: '0.85rem', color: '#000' }}>{admittedRecord.name}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#71717a' }}>{admittedRecord.email}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label style={{ fontSize: '0.78rem', fontWeight: 900, textTransform: 'uppercase', color: '#000' }}>Enter Password</label>
                                    <button
                                        type="button"
                                        onClick={handleRequestOtp}
                                        style={{ background: 'none', border: 'none', color: 'var(--accent-r)', fontSize: '0.72rem', fontWeight: 900, cursor: 'pointer', textDecoration: 'underline' }}
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={loginPassword}
                                    onChange={e => setLoginPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={{
                                        padding: '0.9rem 1.2rem',
                                        border: '3px solid #000000',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loginLoading}
                                style={{
                                    background: 'var(--accent-r)',
                                    color: '#ffffff',
                                    border: '3px solid #000000',
                                    padding: '1rem',
                                    fontFamily: 'Outfit',
                                    fontWeight: 900,
                                    fontSize: '0.95rem',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    boxShadow: '4px 4px 0 #000000',
                                    transition: 'all 0.1s ease',
                                    width: '100%'
                                }}
                            >
                                {loginLoading ? 'Signing In...' : 'Log In →'}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setLoginStep('email');
                                    setLoginPassword('');
                                    setAdmittedRecord(null);
                                }}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#71717a',
                                    fontSize: '0.75rem',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }}
                            >
                                Switch Account
                            </button>
                        </form>
                    )}

                    {loginStep === 'forgot_otp' && (
                        <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div style={{ background: '#fef3c7', color: '#b45309', border: '2px solid #000', padding: '0.7rem', borderRadius: '0.4rem', fontSize: '0.75rem', fontWeight: 900, textAlign: 'center' }}>
                                📩 {otpNotice}
                            </div>

                            {generatedOtp && (
                                <div style={{ background: '#f4f4f5', border: '2px dashed #000', padding: '0.5rem', borderRadius: '0.4rem', fontSize: '0.7rem', fontWeight: 900, textAlign: 'center', color: '#000' }}>
                                    🔑 Dev Testing OTP Code: <span style={{ color: 'var(--accent-r)', fontSize: '1rem', letterSpacing: '2px' }}>{generatedOtp}</span>
                                </div>
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <label style={{ fontSize: '0.78rem', fontWeight: 900, textTransform: 'uppercase', color: '#000' }}>Enter 6-Digit Code</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={6}
                                    value={otpInput}
                                    onChange={e => setOtpInput(e.target.value)}
                                    placeholder="123456"
                                    style={{
                                        padding: '0.9rem 1.2rem',
                                        border: '3px solid #000000',
                                        fontSize: '1.2rem',
                                        fontFamily: 'monospace',
                                        fontWeight: 900,
                                        letterSpacing: '4px',
                                        textAlign: 'center',
                                        outline: 'none',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loginLoading}
                                style={{
                                    background: 'var(--accent-r)',
                                    color: '#ffffff',
                                    border: '3px solid #000000',
                                    padding: '1rem',
                                    fontFamily: 'Outfit',
                                    fontWeight: 900,
                                    fontSize: '0.95rem',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    boxShadow: '4px 4px 0 #000000',
                                    width: '100%'
                                }}
                            >
                                Verify Code →
                            </button>

                            <button
                                type="button"
                                onClick={() => setLoginStep('password')}
                                style={{ background: 'none', border: 'none', color: '#71717a', fontSize: '0.75rem', fontWeight: 900, cursor: 'pointer', textDecoration: 'underline' }}
                            >
                                ← Back to Login
                            </button>
                        </form>
                    )}

                    {loginStep === 'forgot_reset' && (
                        <form onSubmit={handleResetPasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div style={{ background: '#dcfce7', color: '#15803d', border: '2px solid #000', padding: '0.6rem', borderRadius: '0.4rem', fontSize: '0.75rem', fontWeight: 900, textAlign: 'center' }}>
                                ✅ Code Verified! Enter your new LMS password below.
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <label style={{ fontSize: '0.78rem', fontWeight: 900, textTransform: 'uppercase', color: '#000' }}>New Password</label>
                                <input
                                    type="password"
                                    required
                                    minLength={6}
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    placeholder="Minimum 6 characters"
                                    style={{
                                        padding: '0.9rem 1.2rem',
                                        border: '3px solid #000000',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <label style={{ fontSize: '0.78rem', fontWeight: 900, textTransform: 'uppercase', color: '#000' }}>Confirm New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={confirmNewPassword}
                                    onChange={e => setConfirmNewPassword(e.target.value)}
                                    placeholder="Repeat new password"
                                    style={{
                                        padding: '0.9rem 1.2rem',
                                        border: '3px solid #000000',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loginLoading}
                                style={{
                                    background: 'var(--accent-r)',
                                    color: '#ffffff',
                                    border: '3px solid #000000',
                                    padding: '1rem',
                                    fontFamily: 'Outfit',
                                    fontWeight: 900,
                                    fontSize: '0.95rem',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    boxShadow: '4px 4px 0 #000000',
                                    width: '100%'
                                }}
                            >
                                {loginLoading ? 'Updating Password...' : 'Save New Password & Enter LMS 🚀'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        );
    }

    if (portalIsLocked) {
        return (
            <div style={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem 1rem',
                fontFamily: "'Outfit', sans-serif"
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '560px',
                    background: '#ffffff',
                    border: '5px solid #000000',
                    boxShadow: '10px 10px 0 #000000',
                    padding: '2.5rem',
                    borderRadius: '1.2rem',
                    boxSizing: 'border-box',
                    textAlign: 'center',
                    animation: 'fadeIn 0.3s ease-out'
                }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🔒</div>
                    
                    <h2 style={{
                        fontFamily: 'Outfit',
                        fontWeight: 950,
                        fontSize: '1.8rem',
                        color: '#000000',
                        margin: '0 0 0.5rem 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                    }}>
                        Portal Locked
                    </h2>

                    <p style={{ color: '#52525b', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 1.8rem 0' }}>
                        Future Tech Academy • {studentCohort}
                    </p>

                    <div style={{
                        background: '#fffbeb',
                        border: '3px solid #d97706',
                        borderRadius: '0.8rem',
                        padding: '1.2rem',
                        marginBottom: '1.8rem',
                        textAlign: 'left'
                    }}>
                        <div style={{ fontSize: '0.85rem', color: '#92400e', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                            🎉 Admission Confirmed, {studentSession?.name || studentSession?.email}!
                        </div>
                        <div style={{ fontSize: '0.88rem', color: '#78350f', lineHeight: 1.5 }}>
                            Your admission is fully confirmed for the <strong>{selectedCourse}</strong> track ({studentCohort}). The learning portal for your cohort is scheduled to open on:
                        </div>
                        <div style={{
                            marginTop: '0.8rem',
                            padding: '0.6rem 0.8rem',
                            background: '#ffffff',
                            border: '2px solid #000',
                            borderRadius: '0.5rem',
                            fontWeight: 900,
                            fontSize: '0.95rem',
                            color: '#000',
                            textAlign: 'center'
                        }}>
                            📅 {new Date(myPortalDate).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>

                    {/* Countdown Card */}
                    <div style={{
                        background: '#000000',
                        color: '#ffffff',
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        border: '3px solid #000',
                        boxShadow: '4px 4px 0 var(--accent-r)',
                        marginBottom: '2rem'
                    }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#e4e4e7', marginBottom: '1rem' }}>
                            ⏱️ Portal Opens In
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
                            <div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 950, color: 'var(--accent-r)' }}>{portalCountdown.days}</div>
                                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 800, color: '#a1a1aa' }}>Days</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 950, color: 'var(--accent-r)' }}>{portalCountdown.hours}</div>
                                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 800, color: '#a1a1aa' }}>Hours</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 950, color: 'var(--accent-r)' }}>{portalCountdown.minutes}</div>
                                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 800, color: '#a1a1aa' }}>Mins</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 950, color: 'var(--accent-r)' }}>{portalCountdown.seconds}</div>
                                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 800, color: '#a1a1aa' }}>Secs</div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogOut}
                        style={{
                            background: '#ffffff',
                            color: '#dc2626',
                            border: '2.5px solid #dc2626',
                            padding: '0.75rem 1.8rem',
                            borderRadius: '0.6rem',
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 900,
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            cursor: 'pointer'
                        }}
                    >
                        🚪 Log Out
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '2rem auto 5rem auto', padding: '0 1.5rem' }} className="fta-container">

            {/* ── PEER HUB FULL-SCREEN VIEW ── */}
            {academyTab === 'peers' && (() => {
                const discordChannels = [
                    { id: 'general-questions', name: 'weird-questions', desc: 'Ask everything that is or sounds weird.', icon: '#' },
                    { id: 'help-and-bugs', name: 'help-and-bugs', desc: 'Post code syntax bugs & technical questions.', icon: '#' },
                    { id: 'project-showcase', name: 'project-showcase', desc: 'Show off your designs and completed tasks.', icon: '#' },
                    { id: 'announcements', name: 'announcements', desc: 'Official updates and curator notes.', icon: '📢' },
                ];

                const currChannelObj = discordChannels.find(c => c.id === activeChannel) || discordChannels[0];

                const seedMessages = [
                    {
                        id: 101,
                        channel: 'general-questions',
                        author: 'Master Clyde',
                        authorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Clyde',
                        date: 'Today at 9:15 AM',
                        body: 'Anything that you would like to say?',
                        cohort: studentCohort,
                        track: selectedCourse,
                        replies: []
                    },
                    {
                        id: 102,
                        channel: 'general-questions',
                        author: 'Master Clyde',
                        authorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Clyde',
                        date: 'Today at 10:23 AM',
                        body: "Please tell me, I've been waiting for one hour.",
                        cohort: studentCohort,
                        track: selectedCourse,
                        replies: []
                    },
                    {
                        id: 103,
                        channel: 'general-questions',
                        author: 'Wumpus',
                        authorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Wumpus',
                        date: 'Today at 10:27 AM',
                        body: '*tremble fearfully*',
                        cohort: studentCohort,
                        track: selectedCourse,
                        replies: []
                    },
                    {
                        id: 104,
                        channel: 'general-questions',
                        author: 'Master Clyde',
                        authorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Clyde',
                        date: 'Today at 10:27 AM',
                        body: 'Do you have something to say Wumpus?\nor maybe anyone else?\npls I want to hear you guys',
                        cohort: studentCohort,
                        track: selectedCourse,
                        replies: []
                    },
                    {
                        id: 105,
                        channel: 'general-questions',
                        author: 'Wumpus cousin',
                        authorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Cousin',
                        date: 'Today at 10:29 AM',
                        body: '*smells the sandwich that Wumpus just left*',
                        cohort: studentCohort,
                        track: selectedCourse,
                        replies: []
                    },
                    {
                        id: 106,
                        channel: 'general-questions',
                        author: 'Master Clyde',
                        authorAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Clyde',
                        date: 'Today at 10:29 AM',
                        body: "come on\nSo as nobody is asking, I'll ask first\nDoes anybody feels like something is different?",
                        cohort: studentCohort,
                        track: selectedCourse,
                        replies: []
                    },
                    {
                        id: 107,
                        channel: 'help-and-bugs',
                        author: 'Ogunkoya Samuel Opemipo',
                        authorAvatar: '',
                        date: 'Today at 10:35 AM',
                        body: 'Getting TypeError: Illegal constructor in React — Make sure you import components properly from lucide-react!',
                        cohort: studentCohort,
                        track: selectedCourse,
                        replies: [
                            { author: 'Ademuwagun Precious', authorAvatar: '', body: 'Thanks Samuel! This saved me hours of debugging.', date: 'Today at 10:40 AM' }
                        ]
                    }
                ];

                const activeList = peerPosts.length > 0 ? peerPosts : seedMessages;
                const channelMessages = activeList.filter(m => (m.channel === activeChannel || (!m.channel && activeChannel === 'general-questions')) && (m.cohort === studentCohort || !m.cohort) && (m.track === selectedCourse || !m.track));

                const handleSendDiscordMessage = async (e) => {
                    if (e) e.preventDefault();
                    if (!discordInput.trim()) return;

                    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    if (replyTargetPost) {
                        const newReply = {
                            author: studentName,
                            authorAvatar: studentAvatar,
                            body: discordInput,
                            date: `Today at ${timeStr}`
                        };
                        const updatedReplies = [...(replyTargetPost.replies || []), newReply];
                        const { error } = await supabase
                            .from('peer_messages')
                            .update({ replies: updatedReplies })
                            .eq('id', replyTargetPost.id);
                        if (!error) {
                            setPeerPosts(prev => prev.map(p =>
                                p.id === replyTargetPost.id ? { ...p, replies: updatedReplies } : p
                            ));
                        }
                        setDiscordInput('');
                        setReplyTargetPost(null);
                    } else {
                        const { data, error } = await supabase
                            .from('peer_messages')
                            .insert([{
                                channel: activeChannel,
                                title: discordInput.slice(0, 50),
                                body: discordInput,
                                tag: 'Chat',
                                author: studentName,
                                author_avatar: studentAvatar,
                                message_date: `Today at ${timeStr}`,
                                cohort: studentCohort,
                                track: selectedCourse,
                                replies: []
                            }])
                            .select()
                            .single();
                        if (!error && data) {
                            setPeerPosts(prev => [...prev, {
                                id: data.id,
                                channel: data.channel,
                                title: data.title,
                                body: data.body,
                                tag: data.tag,
                                author: data.author,
                                authorAvatar: data.author_avatar,
                                date: data.message_date,
                                cohort: data.cohort,
                                track: data.track,
                                replies: data.replies || []
                            }]);
                        }
                        setDiscordInput('');
                    }
                };

                return (
                    <div style={{
                        background: '#2b2a4a',
                        color: '#ffffff',
                        borderRadius: '1rem',
                        border: '3px solid #000000',
                        boxShadow: '8px 8px 0 #000000',
                        display: 'grid',
                        gridTemplateColumns: '260px 1fr',
                        height: 'min(760px, 82vh)',
                        overflow: 'hidden',
                        fontFamily: "'Outfit', system-ui, sans-serif",
                        animation: 'fadeIn 0.2s ease-out'
                    }} className="discord-community-container">
                        <style>{`
                            @media (max-width: 768px) {
                                .discord-community-container {
                                    grid-template-columns: 1fr !important;
                                    height: 80vh !important;
                                }
                                .discord-sidebar {
                                    display: ${mobileShowSidebar ? 'flex' : 'none'} !important;
                                    width: 100% !important;
                                    border-right: none !important;
                                }
                                .discord-chat-column {
                                    display: ${!mobileShowSidebar ? 'flex' : 'none'} !important;
                                    width: 100% !important;
                                }
                                .discord-mobile-menu-btn {
                                    display: flex !important;
                                }
                            }
                            @media (max-width: 600px) {
                                .discord-topic-desc, .discord-header-actions {
                                    display: none !important;
                                }
                            }
                            @media (min-width: 769px) {
                                .discord-sidebar {
                                    display: flex !important;
                                }
                                .discord-chat-column {
                                    display: flex !important;
                                }
                                .discord-mobile-menu-btn {
                                    display: none !important;
                                }
                            }
                        `}</style>

                        {/* LEFT SIDEBAR (#22213d) */}
                        <div className="discord-sidebar" style={{ background: '#22213d', borderRight: '3px solid #000000', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                            {/* Community Server Header */}
                            <div style={{ padding: '1.2rem 1rem', borderBottom: '3px solid #000000', background: '#22213d', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <h3 style={{ fontFamily: 'Outfit', fontWeight: 955, fontSize: '0.95rem', margin: 0, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        💬 ${studentCohort} Hub
                                    </h3>
                                    <span style={{ fontSize: '0.65rem', background: 'var(--accent-r)', color: '#fff', padding: '0.15rem 0.5rem', borderRadius: '1rem', fontWeight: 900, border: '1.5px solid #000' }}>PRO</span>
                                </div>

                                {/* BACK BUTTON TO LEARNING DASHBOARD */}
                                <button
                                    onClick={() => setAcademyTab('curriculum')}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        width: '100%',
                                        padding: '0.65rem 0.8rem',
                                        background: 'var(--accent-r)',
                                        color: '#ffffff',
                                        border: '2px solid #000000',
                                        borderRadius: '0.5rem',
                                        fontFamily: 'Outfit',
                                        fontWeight: 900,
                                        fontSize: '0.78rem',
                                        cursor: 'pointer',
                                        boxShadow: '3px 3px 0 #000000',
                                        textTransform: 'uppercase',
                                        transition: 'all 0.12s ease'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-1px,-1px)'; e.currentTarget.style.boxShadow = '4px 4px 0 #000000'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '3px 3px 0 #000000'; }}
                                >
                                    <span>←</span> Learning Dashboard
                                </button>
                            </div>

                            {/* Channels List */}
                            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0.6rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                <div style={{ fontSize: '0.68rem', fontWeight: 900, textTransform: 'uppercase', color: '#94a3b8', padding: '0 0.5rem 0.4rem 0.5rem', letterSpacing: '0.05em' }}>
                                    TEXT CHANNELS
                                </div>

                                {discordChannels.map(ch => {
                                    const isSelected = activeChannel === ch.id;
                                    return (
                                        <button
                                            key={ch.id}
                                            onClick={() => { setActiveChannel(ch.id); setReplyTargetPost(null); setMobileShowSidebar(false); }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.6rem',
                                                width: '100%',
                                                padding: '0.55rem 0.7rem',
                                                borderRadius: '0.4rem',
                                                background: isSelected ? 'var(--accent-r)' : 'transparent',
                                                color: '#ffffff',
                                                border: isSelected ? '2px solid #000000' : 'none',
                                                cursor: 'pointer',
                                                fontFamily: 'Outfit',
                                                fontWeight: isSelected ? 900 : 700,
                                                fontSize: '0.85rem',
                                                textAlign: 'left',
                                                transition: 'all 0.1s ease',
                                                boxShadow: isSelected ? '2px 2px 0 #000000' : 'none'
                                            }}
                                            onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.background = '#2b2a4a'; } }}
                                            onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.background = 'transparent'; } }}
                                        >
                                            <span style={{ fontSize: '1rem', color: isSelected ? '#fff' : '#94a3b8' }}>{ch.icon}</span>
                                            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ch.name}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* User Info Bar at bottom of sidebar */}
                            <div style={{ background: '#1c1b33', padding: '0.8rem 1rem', borderTop: '3px solid #000000', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                                <div style={{ position: 'relative' }}>
                                    {studentAvatar ? (
                                        <img src={studentAvatar} alt={studentName} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #000000' }} />
                                    ) : (
                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-r)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.9rem', border: '1.5px solid #000000' }}>
                                            {studentName.charAt(0)}
                                        </div>
                                    )}
                                    <span style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', background: '#22c55e', borderRadius: '50%', border: '2px solid #1c1b33' }} />
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{studentName}</div>
                                    <div style={{ fontSize: '0.65rem', color: '#22c55e', fontWeight: 800 }}>Online • ${studentCohort}</div>
                                </div>
                            </div>
                        </div>

                        {/* MAIN CHAT COLUMN (#2b2a4a) */}
                        <div className="discord-chat-column" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#2b2a4a', overflow: 'hidden' }}>
                            
                            {/* Header Bar */}
                            <div style={{ padding: '0.9rem 1.5rem', background: '#2b2a4a', borderBottom: '3px solid #000000', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    
                                    {/* Mobile Hamburger toggle */}
                                    <button
                                        onClick={() => setMobileShowSidebar(true)}
                                        className="discord-mobile-menu-btn"
                                        style={{
                                            display: 'none',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: 'var(--accent-r)',
                                            color: '#ffffff',
                                            border: '2px solid #000000',
                                            borderRadius: '0.4rem',
                                            padding: '0.35rem 0.6rem',
                                            fontFamily: 'Outfit',
                                            fontWeight: 900,
                                            fontSize: '0.72rem',
                                            cursor: 'pointer',
                                            marginRight: '0.4rem',
                                            boxShadow: '2px 2px 0 #000000'
                                        }}
                                    >
                                        ☰ Channels
                                    </button>

                                    <span style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 900 }}>#</span>
                                    <h2 style={{ fontFamily: 'Outfit', fontWeight: 955, fontSize: '1.1rem', margin: 0, color: '#ffffff' }}>
                                        {currChannelObj.name}
                                    </h2>
                                    <span className="discord-topic-desc" style={{ color: '#000000', margin: '0 0.4rem', fontWeight: 900 }}>|</span>
                                    <span className="discord-topic-desc" style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>{currChannelObj.desc}</span>
                                </div>

                                {/* Action Icons Panel matching Discord header */}
                                <div className="discord-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ cursor: 'pointer', fontSize: '1.2rem' }} title="Members">👥</span>
                                    <span style={{ cursor: 'pointer', fontSize: '1.2rem' }} title="Pinned Messages">📌</span>
                                    <span style={{ cursor: 'pointer', fontSize: '1.2rem' }} title="Mute Notifications">🔔</span>
                                    <div style={{ background: '#22213d', border: '1.5px solid #000000', borderRadius: '0.4rem', padding: '0.2rem 0.5rem', display: 'flex', alignItems: 'center', width: '130px' }}>
                                        <input type="text" placeholder="Search" style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '0.7rem', width: '100%' }} />
                                        <span>🔍</span>
                                    </div>
                                </div>
                            </div>

                            {/* Message Stream */}
                            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                
                                {/* Welcome Giant Title Banner */}
                                <div style={{ marginBottom: '1.5rem', borderBottom: '2px solid #000000', paddingBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div>
                                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#22213d', border: '3px solid #000000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: '#fff', marginBottom: '0.8rem', boxShadow: '3px 3px 0 #000000' }}>
                                            #
                                        </div>
                                        <h1 style={{ fontFamily: 'Outfit', fontWeight: 955, fontSize: '2.2rem', color: '#fff', margin: '0 0 0.4rem 0' }}>
                                            Welcome to #${currChannelObj.name}!
                                        </h1>
                                        <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0, fontWeight: 700 }}>
                                            Ask everything that is or sounds weird.
                                        </p>
                                    </div>
                                    <span className="discord-topic-desc" style={{ color: '#4ade80', fontSize: '0.8rem', fontWeight: 900, cursor: 'pointer', textDecoration: 'underline' }}>Edit channel</span>
                                </div>

                                {/* Messages list */}
                                {channelMessages.map((msg) => {
                                    const isSelf = msg.author === studentName;
                                    return (
                                        <div
                                            key={msg.id}
                                            style={{
                                                display: 'flex',
                                                gap: '1rem',
                                                padding: '0.6rem 0.8rem',
                                                borderRadius: '0.5rem',
                                                transition: 'background 0.1s ease',
                                                position: 'relative'
                                            }}
                                            className="discord-message-row"
                                            onMouseEnter={e => {
                                                e.currentTarget.style.background = '#22213d';
                                                const actionBtn = e.currentTarget.querySelector('.msg-action-bar');
                                                if (actionBtn) actionBtn.style.opacity = '1';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.background = 'transparent';
                                                const actionBtn = e.currentTarget.querySelector('.msg-action-bar');
                                                if (actionBtn) actionBtn.style.opacity = '0';
                                            }}
                                        >
                                            {/* Author Avatar with color fallback */}
                                            {msg.authorAvatar ? (
                                                <img src={msg.authorAvatar} alt={msg.author} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2.5px solid #000000' }} />
                                            ) : (
                                                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: isSelf ? 'var(--accent-r)' : '#eb459e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.15rem', flexShrink: 0, border: '2.5px solid #000000' }}>
                                                    {msg.author.charAt(0)}
                                                </div>
                                            )}

                                            {/* Message Header & Body */}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.15rem' }}>
                                                    <span style={{ fontWeight: 900, fontSize: '0.95rem', color: '#ffffff', fontFamily: 'Outfit' }}>
                                                        {msg.author}
                                                    </span>
                                                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>
                                                        {msg.date}
                                                    </span>
                                                </div>

                                                <div style={{ color: '#f1f5f9', fontSize: '0.9rem', lineHeight: '1.5', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontWeight: 600 }}>
                                                    {msg.body}
                                                </div>

                                                {/* Nested Replies Stream - Smaller in Width */}
                                                {msg.replies && msg.replies.length > 0 && (
                                                    <div style={{
                                                        marginTop: '0.6rem',
                                                        padding: '0.6rem 0.8rem',
                                                        background: '#22213d',
                                                        border: '2px solid #000000',
                                                        borderRadius: '0.6rem',
                                                        boxShadow: '3px 3px 0 #000000',
                                                        maxWidth: '420px',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '0.4rem'
                                                    }}>
                                                        {msg.replies.map((rep, rIdx) => (
                                                            <div key={rIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                                                                {rep.authorAvatar ? (
                                                                    <img src={rep.authorAvatar} alt={rep.author} style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} />
                                                                ) : (
                                                                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--accent-r)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.65rem' }}>
                                                                        {rep.author.charAt(0)}
                                                                    </div>
                                                                )}
                                                                <span style={{ fontWeight: 900, color: rep.author === studentName ? 'var(--accent-r)' : '#ffffff' }}>
                                                                    {rep.author}:
                                                                </span>
                                                                <span style={{ color: '#f1f5f9', fontWeight: 600 }}>
                                                                    {rep.body}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Hover Reply Icon */}
                                            <div
                                                className="msg-action-bar"
                                                style={{
                                                    position: 'absolute',
                                                    right: '1rem',
                                                    top: '-0.5rem',
                                                    background: '#22213d',
                                                    border: '2px solid #000000',
                                                    borderRadius: '0.4rem',
                                                    padding: '0.2rem 0.5rem',
                                                    opacity: 0,
                                                    transition: 'opacity 0.15s ease',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    boxShadow: '3px 3px 0 #000000'
                                                }}
                                            >
                                                <button
                                                    onClick={() => setReplyTargetPost({ id: msg.id, author: msg.author, title: msg.title || msg.body.slice(0, 30) })}
                                                    title="Reply to message"
                                                    style={{
                                                        background: 'transparent',
                                                        border: 'none',
                                                        color: '#ffffff',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.3rem',
                                                        fontFamily: 'Outfit',
                                                        fontWeight: 900,
                                                        fontSize: '0.72rem'
                                                    }}
                                                >
                                                    <span>💬</span> Reply
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Discord Bottom Input Bar */}
                            <div style={{ padding: '1rem 1.5rem', background: '#2b2a4a', borderTop: '3px solid #000000' }}>
                                {/* Reply Banner if active */}
                                {replyTargetPost && (
                                    <div style={{ background: '#22213d', border: '2px solid #000000', borderBottom: 'none', borderRadius: '0.5rem 0.5rem 0 0', padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#ffffff', marginBottom: '-2px', maxWidth: '420px' }}>
                                        <div>
                                            Replying to <strong style={{ color: 'var(--accent-r)' }}>@${replyTargetPost.author}</strong>
                                        </div>
                                        <button onClick={() => setReplyTargetPost(null)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 900 }}>✕</button>
                                    </div>
                                )}

                                <form onSubmit={handleSendDiscordMessage} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#22213d', borderRadius: '2rem', padding: '0.4rem 1rem', border: '2px solid #000000', boxShadow: '3px 3px 0 #000000' }}>
                                    {/* Discord plus symbol on left */}
                                    <div style={{ background: '#4e5058', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '0.9rem', cursor: 'pointer' }}>+</div>

                                    <input
                                        type="text"
                                        value={discordInput}
                                        onChange={e => setDiscordInput(e.target.value)}
                                        placeholder={`Message #${currChannelObj.name}`}
                                        style={{
                                            flex: 1,
                                            background: 'transparent',
                                            border: 'none',
                                            outline: 'none',
                                            color: '#ffffff',
                                            fontFamily: 'Outfit',
                                            fontSize: '0.9rem',
                                            padding: '0.5rem 0'
                                        }}
                                    />

                                    {/* Emoji Face and Gift/Send Button */}
                                    <span style={{ fontSize: '1.2rem', cursor: 'pointer' }}>😃</span>
                                    <button
                                        type="submit"
                                        style={{
                                            background: 'var(--accent-r)',
                                            color: '#fff',
                                            border: '2px solid #000000',
                                            padding: '0.4rem 1rem',
                                            borderRadius: '1.5rem',
                                            fontFamily: 'Outfit',
                                            fontWeight: 900,
                                            fontSize: '0.78rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.3rem',
                                            boxShadow: '2px 2px 0 #000000'
                                        }}
                                    >
                                        🚀
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>                );
            })()}
{/* ── ALL OTHER VIEWS (curriculum / notifications) ── */}
            {academyTab !== 'peers' && (<>
            <div style={{ background: '#ffffff', border: '3px solid #000000', padding: '2rem', boxShadow: '8px 8px 0 #000000', marginBottom: '2.5rem' }} className="fta-header-branding">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ background: '#000', color: '#fff', padding: '0.8rem', border: '2px solid #000', borderRadius: '8px' }}>
                        <BookOpen size={28} />
                    </div>
                    {/* FTA NAVIGATION (DESKTOP NAV BAR / MOBILE DROPDOWN) */}
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative' }}>
                        
                        {/* 1. MOBILE ONLY DROPDOWN TRIGGER & MENU */}
                        <div className="fta-mobile-dropdown-trigger" style={{ flex: 1, position: 'relative' }}>
                            <button
                                onClick={() => setShowHeaderDropdown(v => !v)}
                                style={{
                                    display: 'flex', alignItems: 'flex-start', flexDirection: 'column',
                                    gap: '0.1rem', background: 'none', border: 'none',
                                    cursor: 'pointer', padding: 0, textAlign: 'left'
                                }}
                                aria-haspopup="true"
                                aria-expanded={showHeaderDropdown}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <h1 style={{ fontSize: '1.8rem', margin: 0, textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif', fontWeight: 900 }} className="fta-header-title">
                                        Future Tech Academy (FTA)
                                    </h1>
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                        width: '22px', height: '22px', background: '#000', color: '#fff',
                                        borderRadius: '4px', fontSize: '0.7rem', fontWeight: 900,
                                        transform: showHeaderDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.2s ease', flexShrink: 0
                                    }}>▾</span>
                                </div>
                                <span style={{ color: 'var(--accent-r)', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>LEARNING PORTAL</span>
                            </button>

                            {/* DROPDOWN MENU */}
                            {showHeaderDropdown && (
                                <>
                                    {/* Click-away overlay */}
                                    <div
                                        style={{ position: 'fixed', inset: 0, zIndex: 998 }}
                                        onClick={() => setShowHeaderDropdown(false)}
                                    />
                                    <div style={{
                                        position: 'absolute', top: 'calc(100% + 10px)', left: 0,
                                        background: '#fff', border: '3px solid #000',
                                        boxShadow: '8px 8px 0 #000', zIndex: 999,
                                        minWidth: '260px', animation: 'slideUp 0.18s ease-out',
                                        overflow: 'hidden', borderRadius: '0.5rem'
                                    }}>
                                        {/* Menu Header */}
                                        <div style={{ background: '#000', color: '#fff', padding: '0.8rem 1rem', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            📚 FTA Navigation
                                        </div>

                                        {[
                                            { icon: '🎓', label: 'Curriculum', sub: 'Videos & Lessons', tab: 'curriculum' },
                                            { icon: '👥', label: 'Peer Hub', sub: 'Bug Board & Help', tab: 'peers' },
                                            { icon: '🔔', label: 'Notifications', sub: `${unreadCount} unread`, tab: 'notifications' },
                                        ].map(item => (
                                            <button
                                                key={item.tab}
                                                onClick={() => { setAcademyTab(item.tab); setShowHeaderDropdown(false); }}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '0.8rem',
                                                    width: '100%', padding: '0.9rem 1rem',
                                                    background: academyTab === item.tab ? '#fff8f8' : '#fff',
                                                    border: 'none', borderBottom: '2px solid #f1f5f9',
                                                    cursor: 'pointer', textAlign: 'left',
                                                    borderLeft: academyTab === item.tab ? '4px solid var(--accent-r)' : '4px solid transparent',
                                                    transition: 'background 0.1s ease'
                                                }}
                                                onMouseOver={e => e.currentTarget.style.background = '#f8fafc'}
                                                onMouseOut={e => e.currentTarget.style.background = academyTab === item.tab ? '#fff8f8' : '#fff'}
                                            >
                                                <span style={{ fontSize: '1.2rem', width: '28px', textAlign: 'center' }}>{item.icon}</span>
                                                <div>
                                                    <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.9rem', color: '#000' }}>{item.label}</div>
                                                    <div style={{ fontFamily: 'Outfit', fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>{item.sub}</div>
                                                </div>
                                                {academyTab === item.tab && <span style={{ marginLeft: 'auto', color: 'var(--accent-r)', fontWeight: 900, fontSize: '0.8rem' }}>●</span>}
                                            </button>
                                        ))}

                                        {/* Divider */}
                                        <div style={{ borderTop: '2px solid #000', margin: '0' }} />

                                        {/* Profile — expanded card with avatar + stats */}
                                        <div style={{ padding: '1rem', background: '#fafafa', borderTop: '2px solid #000' }}>
                                            {/* Avatar Row */}
                                            <div
                                                onClick={() => { setEditNameInput(studentName); setShowProfileModal(true); setShowHeaderDropdown(false); }}
                                                style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', marginBottom: '0.9rem' }}
                                                title="Edit profile picture"
                                            >
                                                {studentAvatar ? (
                                                    <img src={studentAvatar} alt={studentName} style={{ width: '46px', height: '46px', borderRadius: '50%', border: '3px solid #000', objectFit: 'cover', flexShrink: 0 }} />
                                                ) : (
                                                    <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'var(--accent-r)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, border: '3px solid #000', fontSize: '1rem', flexShrink: 0 }}>
                                                        <User size={22} />
                                                    </div>
                                                )}
                                                <div>
                                                    <div style={{ fontFamily: 'Outfit', fontWeight: 950, fontSize: '0.95rem', color: '#000' }}>{studentName}</div>
                                                    <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 700 }}>🟢 Active Student</div>
                                                    <div style={{ fontSize: '0.6rem', color: 'var(--accent-r)', fontWeight: 800, marginTop: '0.1rem' }}>📷 Edit Profile Picture</div>
                                                </div>
                                            </div>

                                            {/* Stat Cards 2x2 Grid */}
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                                {[
                                                    { label: 'Modules Done', val: `${completedCount}/${releasedModuleIndices.length}`, color: '#000' },
                                                    { label: 'Avg Score', val: avgScore > 0 ? `${avgScore}/100` : '—', color: avgScore >= 50 ? '#059669' : avgScore > 0 ? '#dc2626' : '#94a3b8' },
                                                    { label: 'Passed', val: `${passedCount}/${releasedModuleIndices.length}`, color: '#059669' },
                                                    { label: 'Cohort', val: studentCohort, color: '#6d28d9' },
                                                ].map((stat, i) => (
                                                    <div key={i} style={{ background: '#fff', border: '2px solid #000', borderRadius: '0.5rem', padding: '0.5rem 0.7rem', textAlign: 'center', boxShadow: '2px 2px 0 #000' }}>
                                                        <div style={{ fontSize: '0.55rem', fontWeight: 900, textTransform: 'uppercase', color: '#94a3b8', fontFamily: 'Outfit' }}>{stat.label}</div>
                                                        <div style={{ fontSize: '1rem', fontWeight: 900, color: stat.color, fontFamily: 'Outfit', marginTop: '0.1rem' }}>{stat.val}</div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                 onClick={handleLogOut}
                                                 style={{
                                                     width: '100%',
                                                     marginTop: '0.8rem',
                                                     background: '#fee2e2',
                                                     color: '#dc2626',
                                                     border: '2px solid #000000',
                                                     borderRadius: '0.4rem',
                                                     padding: '0.5rem',
                                                     fontFamily: 'Outfit',
                                                     fontWeight: 900,
                                                     fontSize: '0.8rem',
                                                     textTransform: 'uppercase',
                                                     cursor: 'pointer',
                                                     boxShadow: '2px 2px 0 #000000'
                                                 }}
                                             >
                                                 🚪 Log Out
                                             </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* 2. DESKTOP ONLY NAVBAR (MENU BAR ON WIDESCREENS) */}
                        <div className="fta-desktop-navbar" style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '1.5rem' }}>
                            {/* Static Branding */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                                <h1 style={{ fontSize: '1.6rem', margin: 0, textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif', fontWeight: 900 }}>
                                    Future Tech Academy (FTA)
                                </h1>
                                <span style={{ color: 'var(--accent-r)', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '1px' }}>LEARNING PORTAL</span>
                            </div>

                            {/* Score Circle */}
                            <button
                                onClick={() => setShowScoreModal(true)}
                                style={{
                                    width: '52px', height: '52px', borderRadius: '50%',
                                    background: `conic-gradient(${totalScore >= 75 ? '#059669' : totalScore >= 50 ? '#f59e0b' : totalScore > 0 ? '#dc2626' : '#94a3b8'} ${totalScore * 3.6}deg, #e2e8f0 0deg)`,
                                    border: '3px solid #000', boxShadow: '3px 3px 0 #000',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', flexShrink: 0, position: 'relative',
                                    transition: 'transform 0.15s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                title="Click to view score breakdown"
                            >
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '50%',
                                    background: '#fff', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', flexDirection: 'column',
                                }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 900, fontFamily: 'Outfit', color: totalScore >= 75 ? '#059669' : totalScore >= 50 ? '#f59e0b' : totalScore > 0 ? '#dc2626' : '#94a3b8', lineHeight: 1 }}>
                                        {totalScore > 0 ? totalScore : '—'}
                                    </span>
                                    <span style={{ fontSize: '0.35rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.03em' }}>/100</span>
                                </div>
                            </button>

                            {/* Menu links bar */}
                            <div style={{ display: 'flex', gap: '0.4rem', background: '#f1f5f9', padding: '0.3rem', border: '3px solid #000', borderRadius: '0.8rem', boxShadow: '3px 3px 0 #000', marginLeft: '2rem' }}>
                                {[
                                    { icon: '📚', label: 'Curriculum', tab: 'curriculum' },
                                    { icon: '👥', label: 'Peer Hub', tab: 'peers' },
                                    { icon: '🔔', label: `Notifications${unreadCount > 0 ? ` (${unreadCount})` : ''}`, tab: 'notifications' },
                                ].map(item => (
                                    <button
                                        key={item.tab}
                                        onClick={() => setAcademyTab(item.tab)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.5rem 1rem',
                                            background: academyTab === item.tab ? '#000' : 'transparent',
                                            color: academyTab === item.tab ? '#fff' : '#000',
                                            border: 'none',
                                            borderRadius: '0.5rem',
                                            fontFamily: 'Outfit',
                                            fontWeight: 900,
                                            fontSize: '0.8rem',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer',
                                            transition: 'all 0.15s ease'
                                        }}
                                    >
                                        <span>{item.icon}</span>
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Profile Dropdown Button */}
                            <div style={{ position: 'relative', marginLeft: 'auto' }}>
                                <button
                                    onClick={() => setShowProfileDropdownDesktop(v => !v)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.6rem',
                                        background: '#fff',
                                        border: '3px solid #000',
                                        borderRadius: '0.8rem',
                                        padding: '0.4rem 0.8rem',
                                        cursor: 'pointer',
                                        boxShadow: '3px 3px 0 #000',
                                        transition: 'transform 0.1s ease',
                                    }}
                                    onMouseDown={e => e.currentTarget.style.transform = 'translate(2px, 2px)'}
                                    onMouseUp={e => e.currentTarget.style.transform = 'none'}
                                >
                                    {studentAvatar ? (
                                        <img src={studentAvatar} alt={studentName} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #000', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-r)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, border: '2px solid #000', fontSize: '0.7rem' }}>
                                            <User size={14} />
                                        </div>
                                    )}
                                    <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.78rem', textTransform: 'uppercase', color: '#000' }}>My Profile</span>
                                    <span style={{ fontSize: '0.7rem', transform: showProfileDropdownDesktop ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
                                </button>

                                {showProfileDropdownDesktop && (
                                    <>
                                        <div style={{ position: 'fixed', inset: 0, zIndex: 998 }} onClick={() => setShowProfileDropdownDesktop(false)} />
                                        <div style={{
                                            position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                                            background: '#fff', border: '3px solid #000', borderRadius: '0.8rem',
                                            boxShadow: '6px 6px 0 #000', zIndex: 999, width: '280px',
                                            padding: '1rem', animation: 'slideUp 0.15s ease-out'
                                        }}>
                                            <div
                                                onClick={() => { setEditNameInput(studentName); setShowProfileModal(true); setShowProfileDropdownDesktop(false); }}
                                                style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', marginBottom: '0.8rem', borderBottom: '2px dashed #eee', paddingBottom: '0.8rem' }}
                                                title="Edit profile picture"
                                            >
                                                {studentAvatar ? (
                                                    <img src={studentAvatar} alt={studentName} style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid #000', objectFit: 'cover' }} />
                                                ) : (
                                                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--accent-r)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, border: '2px solid #000' }}>
                                                        <User size={18} />
                                                    </div>
                                                )}
                                                <div>
                                                    <div style={{ fontFamily: 'Outfit', fontWeight: 950, fontSize: '0.85rem', color: '#000' }}>{studentName}</div>
                                                    <div style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 700 }}>🟢 Active Student</div>
                                                    <div style={{ fontSize: '0.55rem', color: 'var(--accent-r)', fontWeight: 800 }}>📷 Edit Profile Picture</div>
                                                </div>
                                            </div>
                                            {/* Stat Cards 2x2 Grid */}
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                                                {[
                                                    { label: 'Modules Done', val: `${completedCount}/${releasedModuleIndices.length}`, color: '#000' },
                                                    { label: 'Avg Score', val: avgScore > 0 ? `${avgScore}/100` : '—', color: avgScore >= 50 ? '#059669' : avgScore > 0 ? '#dc2626' : '#94a3b8' },
                                                    { label: 'Passed', val: `${passedCount}/${releasedModuleIndices.length}`, color: '#059669' },
                                                    { label: 'Cohort', val: studentCohort, color: '#6d28d9' },
                                                ].map((stat, i) => (
                                                    <div key={i} style={{ background: '#f8fafc', border: '2px solid #000', borderRadius: '0.4rem', padding: '0.4rem 0.5rem', textAlign: 'center', boxShadow: '2px 2px 0 #000' }}>
                                                        <div style={{ fontSize: '0.5rem', fontWeight: 900, textTransform: 'uppercase', color: '#94a3b8', fontFamily: 'Outfit' }}>{stat.label}</div>
                                                        <div style={{ fontSize: '0.8rem', fontWeight: 900, color: stat.color, fontFamily: 'Outfit', marginTop: '0.1rem' }}>{stat.val}</div>
                                                    </div>
                                                ))}
                                            </div>
                                             <button
                                                 onClick={handleLogOut}
                                                 style={{
                                                     width: '100%',
                                                     marginTop: '0.8rem',
                                                     background: '#fee2e2',
                                                     color: '#dc2626',
                                                     border: '2px solid #000000',
                                                     borderRadius: '0.4rem',
                                                     padding: '0.4rem',
                                                     fontFamily: 'Outfit',
                                                     fontWeight: 900,
                                                     fontSize: '0.75rem',
                                                     textTransform: 'uppercase',
                                                     cursor: 'pointer',
                                                     boxShadow: '2px 2px 0 #000000'
                                                 }}
                                             >
                                                 🚪 Log Out
                                             </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Mobile Score Circle */}
                        <button
                            className="fta-mobile-score-circle"
                            onClick={() => setShowScoreModal(true)}
                            style={{
                                width: '48px', height: '48px', borderRadius: '50%',
                                background: `conic-gradient(${totalScore >= 75 ? '#059669' : totalScore >= 50 ? '#f59e0b' : totalScore > 0 ? '#dc2626' : '#94a3b8'} ${totalScore * 3.6}deg, #e2e8f0 0deg)`,
                                border: '3px solid #000', boxShadow: '3px 3px 0 #000',
                                display: 'none', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', flexShrink: 0, padding: 0,
                            }}
                            title="Click to view score breakdown"
                        >
                            <div style={{
                                width: '36px', height: '36px', borderRadius: '50%',
                                background: '#fff', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', flexDirection: 'column',
                            }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: 900, fontFamily: 'Outfit', color: totalScore >= 75 ? '#059669' : totalScore >= 50 ? '#f59e0b' : totalScore > 0 ? '#dc2626' : '#94a3b8', lineHeight: 1 }}>
                                    {totalScore > 0 ? totalScore : '—'}
                                </span>
                                <span style={{ fontSize: '0.3rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>/100</span>
                            </div>
                        </button>

                    </div>
                </div>
                <p style={{ color: '#555', margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>
                    Select your track and access high-value programming curriculum. Access coding lectures, check curator notes, and jot down study notes on the interactive scratchpad.
                </p>
            </div>

            {/* Course Selector + Cohort (read-only, admin-assigned) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#eff6ff', border: '3px solid #3b82f6', padding: '0.6rem 1.2rem', borderRadius: '1rem', boxShadow: '4px 4px 0 #000' }} className="fta-assigned-course-badge">
                    <BookOpen size={16} color="#3b82f6" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', fontFamily: 'Outfit', color: '#1d4ed8' }}>Assigned Track:</span>
                    <span style={{ fontFamily: 'Outfit', fontWeight: 950, fontSize: '0.9rem', color: '#1e3a8a', textTransform: 'uppercase' }}>{selectedCourse}</span>
                    <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#3b82f6', background: '#dbeafe', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', border: '1px solid #3b82f6' }}>ADMIN ASSIGNED</span>
                </div>
                {/* Cohort badge — admin assigned, read-only */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#f3e8ff', border: '3px solid #7c3aed', padding: '0.6rem 1.2rem', borderRadius: '1rem', boxShadow: '4px 4px 0 #000' }} className="fta-cohort-badge">
                    <Users size={16} color="#7c3aed" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', fontFamily: 'Outfit', color: '#6d28d9' }}>Your Cohort:</span>
                    <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.9rem', color: '#4c1d95' }}>{studentCohort}</span>
                    <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#7c3aed', background: '#ede9fe', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', border: '1px solid #7c3aed' }}>ADMIN ASSIGNED</span>
                </div>
            </div>

            {/* Mobile course modules menu trigger (hidden on desktop via CSS) */}
            {(() => {
                const activePostsList = peerPosts.length > 0 ? peerPosts : [
                    { id: 1, title: 'Getting TypeError: Illegal constructor in React', body: '', tag: 'Bug 🐛', author: 'Ogunkoya Samuel Opemipo', authorAvatar: '', date: '7/19/2026', cohort: studentCohort, track: selectedCourse, replies: [{ author: 'Ademuwagun Precious', authorAvatar: '', body: 'Thanks Samuel!', date: '7/19/2026' }] },
                    { id: 2, title: 'HTML Intro grading fails - help!', body: '', tag: 'Question ❓', author: 'Chioma Okafor', authorAvatar: '', date: '7/19/2026', cohort: studentCohort, track: selectedCourse, replies: [{ author: 'Omotoyosi Agboola', authorAvatar: '', body: 'Add DOCTYPE!', date: '7/19/2026' }] }
                ];
                const cohortFilteredPosts = activePostsList.filter(p => p.cohort === studentCohort && (p.track === selectedCourse || !p.track));
                // keep unreadPeerCount in scope for badge updates
                void cohortFilteredPosts.filter(p => !readPostIds.includes(p.id)).length;

                return (
                    <div className="fta-mobile-menu-trigger" style={{ gap: '0.8rem', marginBottom: '1.5rem', width: '100%', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => setShowMobileModulesDrawer(true)}
                            style={{
                                flex: 1, padding: '0.85rem 1.2rem',
                                background: '#000000', color: '#ffffff',
                                border: '3px solid #000', fontWeight: 950,
                                fontFamily: 'Outfit', fontSize: '0.85rem',
                                textTransform: 'uppercase', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                gap: '0.6rem', boxShadow: '4px 4px 0 var(--accent-r)', borderRadius: '0.6rem'
                            }}
                        >
                            <Menu size={20} />
                            📚 Course Modules Menu 🍔
                        </button>
                    </div>
                );
            })()}

            {/* My Peer Groups */}
            {myPeerGroups.length > 0 && academyTab === 'curriculum' && (() => {
                const currentModIdx = selectedModIdx;
                const currentGroup = myPeerGroups.find(pg => pg.module_index === currentModIdx);
                if (!currentGroup) return null;
                const isUnpaired = currentGroup.is_unpaired;
                const partner = currentGroup.members.find(m => m.email !== studentSession.email);
                const myInfo = currentGroup.members.find(m => m.email === studentSession.email);
                const deadlinePassed = currentGroup.deadline ? new Date(currentGroup.deadline) < new Date() : false;
                const hasSubmitted = peerSubmissions.some(s => s.module_index === currentModIdx && s.submitter_email === studentSession.email);
                const mySubmission = peerSubmissions.find(s => s.module_index === currentModIdx && s.submitter_email === studentSession.email);
                const partnerSubmission = peerSubmissions.find(s => s.module_index === currentModIdx && partner && s.submitter_email === partner.email);
                const myGrade = manualGrades.find(g => g.module_index === currentModIdx && g.track === currentGroup.track);
                const isExpanded = showPeerDetails === currentModIdx;

                return (
                    <div style={{
                        background: isUnpaired ? '#fef2f2' : deadlinePassed && !hasSubmitted ? '#fef2f2' : '#f0fdf4',
                        border: `3px solid ${isUnpaired ? '#ef4444' : deadlinePassed && !hasSubmitted ? '#ef4444' : '#22c55e'}`,
                        padding: '1.2rem 1.5rem', marginBottom: '1.5rem',
                        boxShadow: `4px 4px 0 ${isUnpaired ? '#ef4444' : deadlinePassed && !hasSubmitted ? '#ef4444' : '#22c55e'}`,
                    }}>
                        {/* Top row */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                            <div style={{ flex: '1 1 auto' }}>
                                <h4 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1rem', margin: '0 0 0.3rem 0', textTransform: 'uppercase' }}>
                                    {isUnpaired ? '⚠️ You are Not Peered' : deadlinePassed && !hasSubmitted ? '❌ Deadline Passed — Score: 0' : `🤝 Your Peer Group — Group ${currentGroup.group_number}`}
                                </h4>
                                {!isUnpaired && !deadlinePassed && (
                                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.8rem', fontWeight: 700 }}>
                                        <span><strong>Partner:</strong> {partner?.name || 'Unknown'}</span>
                                        <span><strong>Partner #:</strong> {partner?.number || '—'}</span>
                                        <span><strong>You #:</strong> {myInfo?.number || currentGroup.group_number}</span>
                                    </div>
                                )}
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {!isUnpaired && (
                                    <button onClick={() => setShowPeerDetails(isExpanded ? null : currentModIdx)} style={{ padding: '0.5rem 1rem', background: '#000', color: '#fff', border: '2px solid #000', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '3px 3px 0 var(--accent-r)' }}>
                                        {isExpanded ? 'Hide Details' : '📋 More Details'}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Unpaired message */}
                        {isUnpaired && (
                            <p style={{ fontSize: '0.8rem', color: '#dc2626', fontWeight: 700, margin: 0 }}>The total number of students was odd. You will be paired in the next module release.</p>
                        )}

                        {/* Deadline expired message */}
                        {deadlinePassed && !hasSubmitted && (
                            <p style={{ fontSize: '0.8rem', color: '#dc2626', fontWeight: 700, margin: 0 }}>The submission deadline has passed and you did not submit. Your score for this module is <strong>0</strong>.</p>
                        )}

                        {/* Deadline countdown */}
                        {!isUnpaired && !deadlinePassed && currentGroup.deadline && (
                            <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#059669', marginBottom: '0.5rem' }}>
                                ⏰ Deadline: {new Date(currentGroup.deadline).toLocaleString()} ({Math.max(0, Math.ceil((new Date(currentGroup.deadline) - new Date()) / 3600000))}h remaining)
                            </div>
                        )}

                        {/* Per-partner submission status */}
                        {!isUnpaired && (hasSubmitted || partnerSubmission) && (
                            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                                <div style={{ flex: '1 1 200px', background: hasSubmitted ? '#ecfdf5' : '#fef2f2', border: `2px solid ${hasSubmitted ? '#22c55e' : '#ef4444'}`, padding: '0.6rem 0.8rem', borderRadius: '0.4rem' }}>
                                    <div style={{ fontWeight: 900, fontSize: '0.75rem', color: hasSubmitted ? '#059669' : '#dc2626' }}>
                                        {hasSubmitted ? '✅ You: Submitted' : '❌ You: Not Submitted'}
                                    </div>
                                    {mySubmission && (
                                        <div style={{ fontSize: '0.65rem', color: '#555', marginTop: '0.2rem', wordBreak: 'break-word' }}>
                                            {mySubmission.submission_text?.slice(0, 60)}{mySubmission.submission_text?.length > 60 ? '...' : ''}
                                        </div>
                                    )}
                                </div>
                                <div style={{ flex: '1 1 200px', background: partnerSubmission ? '#ecfdf5' : '#fef2f2', border: `2px solid ${partnerSubmission ? '#22c55e' : '#ef4444'}`, padding: '0.6rem 0.8rem', borderRadius: '0.4rem' }}>
                                    <div style={{ fontWeight: 900, fontSize: '0.75rem', color: partnerSubmission ? '#059669' : '#dc2626' }}>
                                        {partnerSubmission ? `✅ ${partner?.name || 'Partner'}: Submitted` : `❌ ${partner?.name || 'Partner'}: Not Submitted`}
                                    </div>
                                    {partnerSubmission && (
                                        <div style={{ fontSize: '0.65rem', color: '#555', marginTop: '0.2rem', wordBreak: 'break-word' }}>
                                            {partnerSubmission.submission_text?.slice(0, 60)}{partnerSubmission.submission_text?.length > 60 ? '...' : ''}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {hasSubmitted && (
                            <div style={{ background: '#ecfdf5', border: '2px solid #22c55e', padding: '0.8rem 1rem', borderRadius: '0.4rem', marginBottom: '0.5rem' }}>
                                <div style={{ fontWeight: 900, fontSize: '0.85rem', color: '#059669' }}>✅ Your submission is in!</div>
                                {myGrade ? (
                                    <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#fff', border: '2px solid #000', display: 'inline-block' }}>
                                        <span style={{ fontWeight: 900, fontSize: '0.8rem' }}>Your Score: </span>
                                        <span style={{ fontWeight: 950, fontSize: '1.1rem', color: myGrade.score >= 70 ? '#059669' : myGrade.score >= 50 ? '#f59e0b' : '#ef4444' }}>{myGrade.score}/100</span>
                                        {myGrade.feedback && <div style={{ fontSize: '0.7rem', color: '#555', marginTop: '0.2rem' }}>{myGrade.feedback}</div>}
                                    </div>
                                ) : (
                                    <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', fontWeight: 800, color: '#f59e0b' }}>⏳ You will see your score within 24 hours after admin review.</div>
                                )}
                            </div>
                        )}

                        {/* Expanded details */}
                        {isExpanded && !isUnpaired && (
                            <div style={{ background: '#fff', border: '2px solid #e5e7eb', padding: '1rem', borderRadius: '0.4rem', marginBottom: '0.8rem' }}>
                                <h5 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.85rem', margin: '0 0 0.8rem 0', textTransform: 'uppercase' }}>🤝 Peer Project Guidelines</h5>
                                <div style={{ fontSize: '0.8rem', lineHeight: '1.6', color: '#333' }}>
                                    <p style={{ margin: '0 0 0.5rem 0' }}>You are required to work <strong>together with your partner</strong> to complete this project.</p>
                                    <ul style={{ margin: '0 0 0.5rem 0', paddingLeft: '1.5rem' }}>
                                        <li>Contact your partner via email: <strong>{partner?.email || 'N/A'}</strong></li>
                                        <li>Discuss and divide the work based on your strengths</li>
                                        <li>Collaborate on the solution — pair program if possible</li>
                                        <li>Each partner must submit their own work individually</li>
                                    </ul>
                                </div>
                                {currentGroup.task_description && (
                                    <div style={{ marginTop: '0.6rem', padding: '0.6rem', background: '#f0f9ff', borderLeft: '3px solid #3b82f6', fontSize: '0.8rem' }}>
                                        <strong>Task:</strong> {currentGroup.task_description}
                                    </div>
                                )}
                                {currentGroup.submission_prompt && (
                                    <div style={{ marginTop: '0.4rem', padding: '0.6rem', background: '#fefce8', borderLeft: '3px solid #f59e0b', fontSize: '0.8rem' }}>
                                        <strong>What to Submit:</strong> {currentGroup.submission_prompt}
                                    </div>
                                )}

                                {/* Submit form */}
                                {!hasSubmitted && !deadlinePassed ? (
                                    <div style={{ marginTop: '1rem', borderTop: '2px solid #eee', paddingTop: '1rem' }}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.4rem' }}>Paste your project link or submission</label>
                                        <textarea value={peerSubmitText} onChange={e => setPeerSubmitText(e.target.value)} rows={3} placeholder="Paste your project link or describe your individual contribution..." style={{ border: '2px solid #000', padding: '0.7rem', fontFamily: 'Outfit', fontWeight: 700, width: '100%', resize: 'vertical', boxSizing: 'border-box' }} />
                                        <button onClick={() => handleSubmitPeerProject(currentGroup)} disabled={peerSubmitLoading} style={{ marginTop: '0.5rem', padding: '0.7rem 1.5rem', background: peerSubmitLoading ? '#94a3b8' : '#22c55e', color: '#fff', border: '3px solid #000', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', cursor: peerSubmitLoading ? 'not-allowed' : 'pointer', boxShadow: '3px 3px 0 #000' }}>
                                            {peerSubmitLoading ? 'Submitting...' : '🚀 Submit Your Part'}
                                        </button>
                                    </div>
                                ) : hasSubmitted ? (
                                    <div style={{ marginTop: '1rem', borderTop: '2px solid #eee', paddingTop: '1rem' }}>
                                        <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 800, marginBottom: '0.5rem' }}>
                                            ✅ You have already submitted your project.
                                        </div>
                                        {mySubmission && (
                                            <div style={{ background: '#f0fdf4', border: '2px solid #22c55e', padding: '0.7rem 1rem', borderRadius: '0.4rem', fontSize: '0.75rem', color: '#333', wordBreak: 'break-word' }}>
                                                <strong>Your Submission:</strong>
                                                <div style={{ marginTop: '0.3rem' }}>
                                                    {mySubmission.submission_text?.startsWith('http') ? (
                                                        <a href={mySubmission.submission_text} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 700 }}>{mySubmission.submission_text}</a>
                                                    ) : (
                                                        <span>{mySubmission.submission_text}</span>
                                                    )}
                                                </div>
                                                <div style={{ marginTop: '0.4rem', fontSize: '0.65rem', color: '#71717a' }}>
                                                    Submitted {mySubmission.created_at ? new Date(mySubmission.created_at).toLocaleString() : 'recently'}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>
                );
            })()}

            {/* Main Dashboard Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: academyTab === 'curriculum' ? 'minmax(0, 320px) 1fr' : '1fr', gap: '2rem', alignItems: 'start' }} className="academy-grid">
                
                {/* SIDEBAR: Curriculum Content */}
                {academyTab === 'curriculum' && (
                    <div style={{ background: '#ffffff', border: '3px solid #000000', padding: '1.5rem', boxShadow: '6px 6px 0 #000000' }} className="fta-desktop-curriculum-sidebar">
                    <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase', margin: '0 0 1.2rem 0', paddingBottom: '0.8rem', borderBottom: '3px solid #000' }}>
                        Curriculum
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.4', marginBottom: '1.5rem' }}>
                        {course.description}
                    </p>

                    {releaseLoading ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
                            <p style={{ fontWeight: 700, fontSize: '0.85rem' }}>Loading modules...</p>
                        </div>
                    ) : !hasReleasedModules ? (
                        <div style={{ textAlign: 'center', padding: '2rem 1rem', background: '#f8fafc', border: '2px dashed #d1d5db', borderRadius: '0.5rem' }}>
                            <Lock size={32} color="#9ca3af" style={{ margin: '0 auto 1rem auto' }} />
                            <p style={{ fontWeight: 900, fontSize: '0.9rem', color: '#374151', margin: '0 0 0.5rem 0' }}>No Modules Released Yet</p>
                            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>Your instructor hasn't released any modules for your cohort yet. Please check back later.</p>
                        </div>
                    ) : (
                        releasedModulesWithIndex.map(({ originalIdx, ...mod }) => {
                            const isExpanded = !!expandedModules[originalIdx];

                            return (
                                <div key={originalIdx} style={{ marginBottom: '1rem', border: '2px solid #000', borderRadius: '0.5rem', overflow: 'hidden' }}>
                                    {/* Module Accordion Header */}
                                    <div
                                        onClick={() => toggleModule(originalIdx)}
                                        style={{
                                            background: isExpanded ? '#000000' : '#f8fafc',
                                            color: isExpanded ? '#ffffff' : '#000000',
                                            padding: '0.8rem 1rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            userSelect: 'none',
                                            transition: 'background 0.2s ease'
                                        }}
                                    >
                                        <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase' }}>
                                            {mod.title}
                                        </span>
                                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                    </div>

                                    {/* Module Lessons List */}
                                    {isExpanded && (
                                        <div style={{ background: '#ffffff', padding: '0.5rem' }}>
                                            {mod.lessons.map((les, lesIdx) => {
                                                const isSelected = selectedLesson.id === les.id;
                                                const locked = isLessonLocked(les, originalIdx, lesIdx);

                                                return (
                                                    <button
                                                        key={les.id}
                                                        onClick={() => {
                                                            if (!locked) {
                                                                setSelectedLesson(les);
                                                            }
                                                        }}
                                                        disabled={locked}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.6rem',
                                                            width: '100%',
                                                            padding: '0.6rem 0.8rem',
                                                            margin: '0.2rem 0',
                                                            border: '2px solid',
                                                            borderColor: isSelected ? 'var(--accent-r)' : 'transparent',
                                                            background: isSelected ? '#fff0f3' : locked ? '#f1f5f9' : 'transparent',
                                                            borderRadius: '0.4rem',
                                                            cursor: locked ? 'not-allowed' : 'pointer',
                                                            textAlign: 'left',
                                                            color: locked ? '#94a3b8' : '#000000',
                                                            fontWeight: isSelected ? 900 : 700,
                                                            fontSize: '0.8rem',
                                                            opacity: locked ? 0.7 : 1,
                                                            transition: 'all 0.1s ease'
                                                        }}
                                                    >
                                                        {locked ? (
                                                            <Lock size={14} style={{ color: '#94a3b8', flexShrink: 0 }} />
                                                        ) : isSelected ? (
                                                            <CheckCircle size={14} style={{ color: 'var(--accent-r)', flexShrink: 0 }} />
                                                        ) : (
                                                            <PlayCircle size={14} style={{ color: '#64748b', flexShrink: 0 }} />
                                                        )}
                                                        <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                            {les.title}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
                )}

                {/* MAIN CONTENT AREA: Video, Notes & Coding Assignment */}
                {academyTab === 'curriculum' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {(() => {
                        if (!hasReleasedModules && !releaseLoading) {
                            return (
                                <div style={{ background: '#ffffff', border: '3px solid #000000', padding: '4rem 2rem', boxShadow: '8px 8px 0 #000000', textAlign: 'center' }}>
                                    <div style={{ background: '#f0f9ff', color: '#3b82f6', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', border: '3px solid #000' }}>
                                        <BookOpen size={32} />
                                    </div>
                                    <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, textTransform: 'uppercase', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                                        Waiting for Module Release
                                    </h2>
                                    <p style={{ color: '#475569', fontSize: '0.95rem', fontWeight: 700, maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
                                        Your instructor hasn't released any modules for {studentCohort} yet. New content is released weekly — check back soon!
                                    </p>
                                </div>
                            );
                        }

                        let selectedModIdx = 0;
                        let selectedLesIdx = 0;
                        course.modules.forEach((mod, mIdx) => {
                            mod.lessons.forEach((les, lIdx) => {
                                if (les.id === selectedLesson.id) {
                                    selectedModIdx = mIdx;
                                    selectedLesIdx = lIdx;
                                }
                            });
                        });

                        const isLocked = isLessonLocked(selectedLesson, selectedModIdx, selectedLesIdx);
                        const cohortLocks = JSON.parse(localStorage.getItem('fta-cohort-locks') || '{}');
                        const isLockedByAdmin = cohortLocks[`${studentCohort}-${selectedCourse}-module-${selectedModIdx}`];
                        const isNotReleased = !releasedModuleIndices.includes(selectedModIdx);

                        if (isLocked) {
                            return (
                                <div style={{ background: '#ffffff', border: '3px solid #000000', padding: '3rem 2rem', boxShadow: '8px 8px 0 #000000', textAlign: 'center' }}>
                                    <div style={{ background: '#fee2e2', color: '#dc2626', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', border: '3px solid #000' }}>
                                        <Lock size={30} />
                                    </div>
                                    <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, textTransform: 'uppercase', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                                        {isNotReleased ? 'Module Not Yet Released' : isLockedByAdmin ? "Module Locked by Administrator" : "Lecture Locked"}
                                    </h2>
                                    <p style={{ color: '#475569', fontSize: '0.95rem', fontWeight: 700, maxWidth: '500px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
                                        {isNotReleased
                                           ? `This module hasn't been released yet for ${studentCohort}. Wait for your instructor to release it.`
                                           : isLockedByAdmin 
                                           ? `The administrator has locked ${course.modules[selectedModIdx]?.title || 'this module'} for students in ${studentCohort}.` 
                                           : "You must complete the previous lesson's coding assignment to unlock this lecture. Sequential learning is required!"}
                                    </p>
                                </div>
                            );
                        }

                        const handleGradeAssignment = () => {
                            if (!assignmentText.trim()) {
                                alert('Please type or paste your code submission before grading!');
                                return;
                            }
                            setIsGrading(true);
                            setTimeout(() => {
                                const result = runAIGrader(selectedModIdx, assignmentText, selectedCourse);
                                
                                // Save to localStorage keyed by module
                                localStorage.setItem(`fta-exercise-score-mod-${selectedModIdx}`, result.score.toString());
                                localStorage.setItem(`fta-exercise-feedback-mod-${selectedModIdx}`, result.feedback);
                                localStorage.setItem(`fta-exercise-code-mod-${selectedModIdx}`, assignmentText);
                                
                                // Save score to user leaderboard scores tracking
                                const userScores = JSON.parse(localStorage.getItem('fta-user-scores') || '[]');
                                userScores.push(result.score);
                                localStorage.setItem('fta-user-scores', JSON.stringify(userScores));

                                setGradingResult({
                                    score: result.score,
                                    feedback: result.feedback,
                                    steps: result.steps || [],
                                    code: assignmentText
                                });
                                setIsGrading(false);
                                setRecentSubmissionCount(prev => prev + 1);

                                // Trigger Pop-up Prompt if candidate is stuck (score < 75)
                                if (result.score < 75) {
                                    const exercise = getModuleExercise(selectedCourse, selectedModIdx);
                                    setStuckTaskData({
                                        title: exercise.title,
                                        code: assignmentText,
                                        feedback: result.feedback,
                                        score: result.score
                                    });
                                    setShowStuckModal(true);
                                }
                            }, 2500);
                        };

                        return (
                            <>
                                {/* VIDEO PLAYER CARD */}
                                <div style={{ background: '#ffffff', border: '3px solid #000000', padding: '1.5rem', boxShadow: '8px 8px 0 #000000' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid #000', paddingBottom: '0.8rem' }}>
                                        <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.3rem', margin: 0, textTransform: 'uppercase' }}>
                                            {selectedLesson.title}
                                        </h2>
                                        <span style={{ background: 'var(--accent-r)', color: '#ffffff', padding: '0.3rem 0.8rem', border: '2px solid #000', borderRadius: '0.5rem', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase' }}>
                                            Lesson {selectedLesIdx + 1} of {course.modules[selectedModIdx].lessons.length}
                                        </span>
                                    </div>

                                    {/* Responsive 16:9 Video Container */}
                                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', border: '3px solid #000000', background: '#000000', marginBottom: '1.5rem' }}>
                                        <iframe
                                            src={selectedLesson.videoUrl}
                                            title={selectedLesson.title}
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                </div>

                                {/* NOTES & SCRATCHPAD BUTTON */}
                                <button
                                    onClick={() => setShowNotesModal(true)}
                                    style={{
                                        background: '#ffffff',
                                        border: '3px solid #000000',
                                        padding: '1rem 1.5rem',
                                        boxShadow: '8px 8px 0 #000000',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.6rem',
                                        cursor: 'pointer',
                                        width: '100%',
                                        borderRadius: 0,
                                        fontWeight: 900,
                                        textTransform: 'uppercase',
                                        fontFamily: 'Outfit',
                                        fontSize: '1rem',
                                        color: '#000',
                                        transition: 'transform 0.15s, box-shadow 0.15s',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-2px, -2px)'; e.currentTarget.style.boxShadow = '10px 10px 0 #000000'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '8px 8px 0 #000000'; }}
                                >
                                    <FileText size={18} style={{ color: 'var(--accent-r)' }} />
                                    Curator Notes & Scratchpad
                                    <span style={{ marginLeft: 'auto', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Click to open →</span>
                                </button>

                                {/* NOTES & SCRATCHPAD MODAL */}
                                {showNotesModal && (
                                    <div
                                        style={{
                                            position: 'fixed',
                                            top: 0,
                                            left: 0,
                                            width: '100vw',
                                            height: '100vh',
                                            background: 'rgba(0,0,0,0.6)',
                                            zIndex: 9999,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '1.5rem',
                                        }}
                                        onClick={(e) => { if (e.target === e.currentTarget) setShowNotesModal(false); }}
                                    >
                                        <div style={{
                                            background: '#ffffff',
                                            border: '3px solid #000000',
                                            padding: '1.5rem',
                                            boxShadow: '8px 8px 0 #000000',
                                            width: '100%',
                                            maxWidth: '900px',
                                            maxHeight: '90vh',
                                            overflowY: 'auto',
                                            position: 'relative',
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '0.8rem', marginBottom: '1.5rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, textTransform: 'uppercase', fontFamily: 'Outfit', fontSize: '1rem', color: '#000' }}>
                                                    <FileText size={18} style={{ color: 'var(--accent-r)' }} />
                                                    Curator Notes & Scratchpad
                                                </div>
                                                <button
                                                    onClick={() => setShowNotesModal(false)}
                                                    style={{
                                                        background: '#f1f5f9',
                                                        border: '2px solid #000',
                                                        borderRadius: '0.4rem',
                                                        width: '32px',
                                                        height: '32px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        cursor: 'pointer',
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="notes-scratchpad-grid">
                                                {/* Left Side: Curator Notes */}
                                                <div style={{ background: '#f8fafc', border: '2px solid #000', padding: '1.2rem', borderRadius: '0.8rem' }}>
                                                    <div style={{ fontSize: '0.75rem', fontWeight: 950, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.8rem', letterSpacing: '0.05em' }}>
                                                        📌 Curator Study Notes
                                                    </div>
                                                    <div style={{ fontSize: '0.85rem', color: '#1e293b', lineHeight: '1.6', fontWeight: 650 }}>
                                                        {selectedLesson.notes.split('\n').map((line, idx) => {
                                                            if (line.startsWith('### ')) return <h4 key={idx} style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1rem', marginTop: idx > 0 ? '1rem' : 0, marginBottom: '0.4rem', color: '#0f172a' }}>{line.replace('### ', '')}</h4>;
                                                            if (line.startsWith('• ')) return <li key={idx} style={{ marginLeft: '1rem', marginBottom: '0.2rem' }}>{line.replace('• ', '')}</li>;
                                                            if (line.startsWith('const ') || line.includes('function') || line.includes('import')) {
                                                                return <pre key={idx} style={{ background: '#0f172a', color: '#38bdf8', padding: '0.6rem', borderRadius: '0.4rem', fontSize: '0.75rem', overflowX: 'auto', margin: '0.4rem 0' }}>{line}</pre>;
                                                            }
                                                            return <p key={idx} style={{ margin: '0.4rem 0' }}>{line}</p>;
                                                        })}
                                                    </div>
                                                </div>

                                                {/* Right Side: Interactive Scratchpad */}
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <label style={{ fontSize: '0.75rem', fontWeight: 955, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em' }}>
                                                            📝 Your Personal Scratchpad
                                                        </label>
                                                        {isSaving && <span style={{ fontSize: '0.65rem', color: '#059669', fontWeight: 800 }}>Saved ✓</span>}
                                                    </div>

                                                    <textarea
                                                        value={noteText}
                                                        onChange={handleNoteChange}
                                                        placeholder="Take notes while watching the lecture... (Auto-saves to browser storage)"
                                                        style={{
                                                            width: '100%',
                                                            minHeight: '220px',
                                                            padding: '1rem',
                                                            border: '2px solid #000000',
                                                            borderRadius: '0.8rem',
                                                            outline: 'none',
                                                            fontSize: '0.85rem',
                                                            fontFamily: 'monospace',
                                                            background: '#fffbeb',
                                                            color: '#1e293b',
                                                            lineHeight: '1.5',
                                                            resize: 'vertical',
                                                            boxSizing: 'border-box'
                                                        }}
                                                    />

                                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                        <button
                                                            onClick={handleClearNotes}
                                                            style={{ background: '#f1f5f9', border: '2px solid #000', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer' }}
                                                        >
                                                            Clear Notes
                                                        </button>
                                                        <button
                                                            onClick={handleDownloadNotes}
                                                            style={{ background: '#000', color: '#fff', border: '2px solid #000', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', fontSize: '0.7rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                                        >
                                                            <Download size={12} /> Save to TXT
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* SCORE BREAKDOWN MODAL */}
                                {showScoreModal && (
                                    <div
                                        style={{
                                            position: 'fixed', top: 0, left: 0,
                                            width: '100vw', height: '100vh',
                                            background: 'rgba(0,0,0,0.6)', zIndex: 9999,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            padding: '1.5rem',
                                        }}
                                        onClick={(e) => { if (e.target === e.currentTarget) setShowScoreModal(false); }}
                                    >
                                        <div style={{
                                            background: '#ffffff', border: '3px solid #000000',
                                            boxShadow: '8px 8px 0 #000000', width: '100%', maxWidth: '700px',
                                            maxHeight: '90vh', overflowY: 'auto', padding: '2rem',
                                        }}>
                                            {/* Header */}
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <Award size={22} style={{ color: 'var(--accent-r)' }} />
                                                    <h2 style={{ margin: 0, fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase' }}>Score Breakdown</h2>
                                                </div>
                                                <button
                                                    onClick={() => setShowScoreModal(false)}
                                                    style={{
                                                        background: '#f1f5f9', border: '2px solid #000',
                                                        borderRadius: '0.4rem', width: '32px', height: '32px',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        cursor: 'pointer', flexShrink: 0,
                                                    }}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>

                                            {/* Total Score Circle */}
                                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                                                <div style={{
                                                    width: '120px', height: '120px', borderRadius: '50%',
                                                    background: `conic-gradient(${totalScore >= 75 ? '#059669' : totalScore >= 50 ? '#f59e0b' : totalScore > 0 ? '#dc2626' : '#94a3b8'} ${totalScore * 3.6}deg, #e2e8f0 0deg)`,
                                                    border: '4px solid #000', boxShadow: '4px 4px 0 #000',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                }}>
                                                    <div style={{
                                                        width: '96px', height: '96px', borderRadius: '50%',
                                                        background: '#fff', display: 'flex', alignItems: 'center',
                                                        justifyContent: 'center', flexDirection: 'column',
                                                    }}>
                                                        <span style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'Outfit', color: totalScore >= 75 ? '#059669' : totalScore >= 50 ? '#f59e0b' : totalScore > 0 ? '#dc2626' : '#94a3b8', lineHeight: 1 }}>
                                                            {totalScore > 0 ? totalScore : '—'}
                                                        </span>
                                                        <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>/100</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Stats Row */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', marginBottom: '1.5rem' }}>
                                                {[
                                                    { label: 'Modules Done', val: `${completedCount}/${releasedModuleIndices.length}`, color: '#000' },
                                                    { label: 'Passed', val: `${passedCount}/${releasedModuleIndices.length}`, color: '#059669' },
                                                    { label: 'Avg Score', val: avgScore > 0 ? `${avgScore}/100` : '—', color: avgScore >= 50 ? '#059669' : avgScore > 0 ? '#dc2626' : '#94a3b8' },
                                                ].map((s, i) => (
                                                    <div key={i} style={{ background: '#f8fafc', border: '2px solid #000', borderRadius: '0.5rem', padding: '0.6rem', textAlign: 'center', boxShadow: '2px 2px 0 #000' }}>
                                                        <div style={{ fontSize: '0.55rem', fontWeight: 900, textTransform: 'uppercase', color: '#94a3b8', fontFamily: 'Outfit' }}>{s.label}</div>
                                                        <div style={{ fontSize: '1rem', fontWeight: 900, color: s.color, fontFamily: 'Outfit' }}>{s.val}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Per-Module Breakdown */}
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', color: '#000', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    📊 Per-Module Breakdown
                                                </h3>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    {moduleGrades.map((mod) => {
                                                        const aiScore = localStorage.getItem(`fta-exercise-score-mod-${mod.index}`);
                                                        const displayScore = mod.score !== null ? mod.score : (aiScore ? parseInt(aiScore) : null);
                                                        const isPassed = displayScore !== null && displayScore >= 50;
                                                        return (
                                                            <div key={mod.index} style={{
                                                                display: 'flex', alignItems: 'center', gap: '0.8rem',
                                                                background: '#f8fafc', border: '2px solid #000',
                                                                borderRadius: '0.5rem', padding: '0.7rem 1rem',
                                                                boxShadow: '2px 2px 0 #000',
                                                            }}>
                                                                <div style={{
                                                                    width: '36px', height: '36px', borderRadius: '50%',
                                                                    background: displayScore !== null ? (isPassed ? '#dcfce7' : '#fee2e2') : '#f1f5f9',
                                                                    border: '2px solid #000', display: 'flex',
                                                                    alignItems: 'center', justifyContent: 'center',
                                                                    fontWeight: 900, fontSize: '0.75rem', fontFamily: 'Outfit',
                                                                    color: displayScore !== null ? (isPassed ? '#16a34a' : '#dc2626') : '#94a3b8',
                                                                    flexShrink: 0,
                                                                }}>
                                                                    {displayScore !== null ? displayScore : '—'}
                                                                </div>
                                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                                    <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '0.8rem', color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                        Module {mod.index + 1}: {mod.title}
                                                                    </div>
                                                                    {mod.feedback && (
                                                                        <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '0.15rem', lineHeight: '1.3' }}>
                                                                            {mod.feedback.length > 80 ? mod.feedback.substring(0, 80) + '...' : mod.feedback}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>
                                                                    {isPassed && <CheckCircle size={14} style={{ color: '#16a34a' }} />}
                                                                    {mod.score !== null && <span style={{ fontSize: '0.55rem', fontWeight: 800, color: '#6d28d9', background: '#f3e8ff', padding: '0.15rem 0.4rem', borderRadius: '0.3rem', border: '1px solid #6d28d9' }}>ADMIN</span>}
                                                                    {mod.score === null && aiScore && <span style={{ fontSize: '0.55rem', fontWeight: 800, color: '#2563eb', background: '#dbeafe', padding: '0.15rem 0.4rem', borderRadius: '0.3rem', border: '1px solid #2563eb' }}>AI</span>}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Admin Manual Grades Section */}
                                            {manualGrades.length > 0 && (
                                                <div>
                                                    <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', color: '#6d28d9', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                        🎓 Admin Manual Grades
                                                    </h3>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                        {manualGrades.map((grade, i) => (
                                                            <div key={i} style={{
                                                                background: '#faf5ff', border: '2px solid #6d28d9',
                                                                borderRadius: '0.5rem', padding: '0.8rem 1rem',
                                                                boxShadow: '2px 2px 0 #6d28d9',
                                                            }}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                                                                    <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.8rem', color: '#6d28d9' }}>
                                                                        Module {grade.module_index + 1} — {grade.score}/100
                                                                    </span>
                                                                    <span style={{ fontSize: '0.55rem', color: '#94a3b8', fontWeight: 700 }}>
                                                                        {new Date(grade.graded_at).toLocaleDateString()}
                                                                    </span>
                                                                </div>
                                                                {grade.feedback && (
                                                                    <div style={{ fontSize: '0.7rem', color: '#1e293b', lineHeight: '1.4', background: '#fff', padding: '0.5rem', borderRadius: '0.3rem', border: '1px solid #e9d5ff' }}>
                                                                        {grade.feedback}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {manualGrades.length === 0 && (
                                                <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', border: '2px dashed #94a3b8', borderRadius: '0.5rem' }}>
                                                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, margin: 0 }}>No admin grades yet. Your grades will appear here once your instructor reviews your work.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* CODING EXERCISE — ONLY APPEARS ON LAST LESSON OF MODULE */}
                                {(() => {
                                    const currentModule = course.modules[selectedModIdx];
                                    const isLastLessonInModule = selectedLesIdx === currentModule.lessons.length - 1;
                                    if (!isLastLessonInModule) return null;

                                    const exercise = getModuleExercise(selectedCourse, selectedModIdx);
                                    const savedScore = localStorage.getItem(`fta-exercise-score-mod-${selectedModIdx}`);
                                    const savedFeedback = localStorage.getItem(`fta-exercise-feedback-mod-${selectedModIdx}`);
                                    const savedCode = localStorage.getItem(`fta-exercise-code-mod-${selectedModIdx}`);
                                    const hasPreviousSubmission = savedScore && !gradingResult;

                                    // Line number display helper
                                    const codeLines = assignmentText.split('\n');
                                    const lineCount = Math.max(codeLines.length, 15);

                                    return (
                                        <>
                                            {/* Inline button to open challenge */}
                                            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                                                <button
                                                    onClick={() => setShowModuleChallenge(true)}
                                                    style={{
                                                        background: 'var(--accent-r)',
                                                        color: '#ffffff',
                                                        border: '3px solid #000000',
                                                        padding: '1.1rem 2.5rem',
                                                        borderRadius: '0.8rem',
                                                        fontFamily: 'Outfit',
                                                        fontWeight: 955,
                                                        fontSize: '1.05rem',
                                                        textTransform: 'uppercase',
                                                        cursor: 'pointer',
                                                        boxShadow: '6px 6px 0 #000000',
                                                        transition: 'all 0.12s ease'
                                                    }}
                                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '8px 8px 0 #000000'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '6px 6px 0 #000000'; }}
                                                >
                                                    🚀 Enter Task/Challenge for this Module
                                                </button>
                                            </div>

                                            {/* CHALLENGE MODAL POPUP */}
                                            {showModuleChallenge && (
                                                <div style={{
                                                    position: 'fixed',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100vw',
                                                    height: '100vh',
                                                    background: 'rgba(0, 0, 0, 0.75)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    zIndex: 9999,
                                                    padding: '1.5rem',
                                                    boxSizing: 'border-box'
                                                }}>
                                                    <div style={{
                                                        background: '#0d1117',
                                                        border: '3px solid #000000',
                                                        boxShadow: '10px 10px 0 var(--accent-r)',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        width: '100%',
                                                        maxWidth: '900px',
                                                        maxHeight: '90vh',
                                                        overflow: 'hidden',
                                                        borderRadius: '0.8rem',
                                                        position: 'relative',
                                                        animation: 'zoomIn 0.2s ease-out'
                                                    }}>
                                                        {/* Modal Header */}
                                                        <div style={{ background: '#161b22', padding: '1.2rem 1.5rem', borderBottom: '2px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.8rem' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                                                <div style={{ background: 'var(--accent-r)', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.9rem', border: '2px solid #000', flexShrink: 0 }}>
                                                                    <Cpu size={16} />
                                                                </div>
                                                                <div>
                                                                    <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.1rem', margin: 0, textTransform: 'uppercase', color: '#e6edf3' }}>
                                                                        💻 {exercise.title}
                                                                    </h3>
                                                                    <div style={{ fontSize: '0.7rem', color: '#8b949e', fontWeight: 700, marginTop: '0.2rem' }}>
                                                                        Language: {exercise.langHint.toUpperCase()} &nbsp;•&nbsp; Passing Score: 75/100 &nbsp;•&nbsp; AI Strict Mode: ON
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => setShowModuleChallenge(false)}
                                                                style={{
                                                                    background: '#f43f5e',
                                                                    color: '#fff',
                                                                    border: '2px solid #000000',
                                                                    borderRadius: '0.4rem',
                                                                    width: '32px',
                                                                    height: '32px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontWeight: 955,
                                                                    fontSize: '1rem',
                                                                    cursor: 'pointer',
                                                                    boxShadow: '2px 2px 0 #000000'
                                                                }}
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>

                                                        {/* Modal Scrollable Content Container */}
                                                        <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                            {/* Instructions Panel */}
                                                            <div style={{ background: '#161b22', padding: '1.2rem 1.5rem', borderBottom: '2px solid #30363d' }}>
                                                                <div style={{ fontWeight: 955, fontSize: '0.65rem', textTransform: 'uppercase', color: '#f0883e', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>📋 Exercise Instructions</div>
                                                                <pre style={{ background: '#0d1117', border: '1px solid #30363d', padding: '1rem', borderRadius: '0.6rem', fontSize: '0.8rem', fontFamily: "'Fira Code', 'Cascadia Code', 'SF Mono', monospace", color: '#c9d1d9', margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                                                                    {exercise.instruction}
                                                                </pre>
                                                            </div>

                                                            {/* Display previous submission OR new editor */}
                                                            {(gradingResult || hasPreviousSubmission) ? (
                                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                    {/* Score Header & Stuck Action */}
                                                                    {(() => {
                                                                        const sc = gradingResult ? gradingResult.score : parseInt(savedScore);
                                                                        const fb = gradingResult ? gradingResult.feedback : savedFeedback;
                                                                        const cd = gradingResult ? gradingResult.code : savedCode;
                                                                        const passed = sc >= 50;
                                                                        return (
                                                                            <>
                                                                                {/* Score Badge & Stuck Action */}
                                                                                <div style={{ padding: '1.2rem 1.5rem', background: passed ? '#0d2818' : '#2d1117', borderBottom: '2px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                                                        <div style={{ background: passed ? '#2e7d32' : '#d32f2f', color: '#fff', padding: '0.4rem 1rem', borderRadius: '0.4rem', fontWeight: 950, fontSize: '0.9rem', border: '2px solid #000', boxShadow: '2px 2px 0 #000' }}>
                                                                                            SCORE: {sc}/100
                                                                                        </div>
                                                                                        <span style={{ color: passed ? '#4ade80' : '#f87171', fontWeight: 800, fontSize: '0.85rem' }}>
                                                                                            {passed ? '🎉 PASSED!' : '❌ FAILED (Requires 75+ to pass)'}
                                                                                        </span>
                                                                                    </div>

                                                                                    {/* Request stuck guidance */}
                                                                                    {!passed && (
                                                                                        <button
                                                                                            onClick={() => {
                                                                                                setStuckTaskData({
                                                                                                    lessonTitle: exercise.title,
                                                                                                    code: cd,
                                                                                                    feedback: fb,
                                                                                                    score: sc
                                                                                                });
                                                                                                setShowStuckModal(true);
                                                                                            }}
                                                                                            style={{
                                                                                                background: '#ca8a04',
                                                                                                color: '#000',
                                                                                                border: '2px solid #000',
                                                                                                padding: '0.5rem 1rem',
                                                                                                borderRadius: '0.4rem',
                                                                                                fontFamily: 'Outfit',
                                                                                                fontWeight: 900,
                                                                                                fontSize: '0.75rem',
                                                                                                cursor: 'pointer',
                                                                                                boxShadow: '2px 2px 0 #000',
                                                                                                textTransform: 'uppercase'
                                                                                            }}
                                                                                        >
                                                                                            💡 Ask AI Mentor for Help
                                                                                        </button>
                                                                                    )}
                                                                                </div>

                                                                                {/* Feedback Panel */}
                                                                                <div style={{ padding: '1.2rem 1.5rem', borderBottom: '2px solid #30363d', background: '#0d1117' }}>
                                                                                    <div style={{ fontWeight: 955, fontSize: '0.65rem', textTransform: 'uppercase', color: '#8b949e', marginBottom: '0.5rem' }}>🤖 AI Assistant Feedback</div>
                                                                                    <pre style={{ background: '#161b22', border: '1px solid #30363d', padding: '1rem', borderRadius: '0.6rem', fontSize: '0.8rem', fontFamily: "'Fira Code', monospace", color: '#e6edf3', margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                                                                                        {fb}
                                                                                    </pre>
                                                                                </div>

                                                                                {/* Saved Code Display */}
                                                                                <div style={{ padding: '1.2rem 1.5rem', background: '#0d1117' }}>
                                                                                    <div style={{ fontWeight: 955, fontSize: '0.65rem', textTransform: 'uppercase', color: '#8b949e', marginBottom: '0.5rem' }}>📂 Submitted Code</div>
                                                                                    <pre style={{ background: '#161b22', border: '1px solid #30363d', padding: '1rem', borderRadius: '0.6rem', fontSize: '0.8rem', fontFamily: "'Fira Code', monospace", color: '#8892b0', margin: 0, overflowX: 'auto', lineHeight: '1.5' }}>
                                                                                        {cd}
                                                                                    </pre>

                                                                                    {/* Redo Button logic based on score status */}
                                                                                    {(() => {
                                                                                        const isRedoAllowed = sc < 50;
                                                                                        if (isRedoAllowed) {
                                                                                            return (
                                                                                                <div style={{ marginTop: '1.2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                                                                    <button
                                                                                                        onClick={() => {
                                                                                                            if (confirm('Are you sure you want to clear your previous submission and try again?')) {
                                                                                                                localStorage.removeItem(`fta-exercise-score-mod-${selectedModIdx}`);
                                                                                                                localStorage.removeItem(`fta-exercise-feedback-mod-${selectedModIdx}`);
                                                                                                                localStorage.removeItem(`fta-exercise-code-mod-${selectedModIdx}`);
                                                                                                                setGradingResult(null);
                                                                                                                setAssignmentText('');
                                                                                                                setRecentSubmissionCount(prev => prev + 1);
                                                                                                            }
                                                                                                        }}
                                                                                                        style={{
                                                                                                            background: '#eab308',
                                                                                                            color: '#000',
                                                                                                            border: '3px solid #000',
                                                                                                            padding: '0.6rem 1.2rem',
                                                                                                            fontFamily: 'Outfit',
                                                                                                            fontWeight: 900,
                                                                                                            textTransform: 'uppercase',
                                                                                                            fontSize: '0.75rem',
                                                                                                            cursor: 'pointer',
                                                                                                            boxShadow: '3px 3px 0 #000',
                                                                                                            transition: 'transform 0.1s ease',
                                                                                                        }}
                                                                                                        onMouseDown={e => e.currentTarget.style.transform = 'translate(2px, 2px)'}
                                                                                                        onMouseUp={e => e.currentTarget.style.transform = 'none'}
                                                                                                    >
                                                                                                        ✏️ Clear & Redo Exercise
                                                                                                    </button>
                                                                                                </div>
                                                                                            );
                                                                                        }
                                                                                        return (
                                                                                            <div style={{ fontSize: '0.7rem', color: '#484f58', fontWeight: 700, fontStyle: 'italic', marginTop: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                                                                🔒 Submission locked. Exercises can only be graded once per module per cohort.
                                                                                            </div>
                                                                                        );
                                                                                    })()}
                                                                                </div>
                                                                            </>
                                                                        );
                                                                    })()}
                                                                </div>
                                                            ) : (
                                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                    {/* IDE-like Code Editor */}
                                                                    <div style={{ display: 'flex', background: '#0d1117' }}>
                                                                        {/* Line Numbers */}
                                                                        <div style={{
                                                                            padding: '1rem 0.6rem 1rem 0.8rem',
                                                                            background: '#161b22',
                                                                            borderRight: '1px solid #30363d',
                                                                            textAlign: 'right',
                                                                            userSelect: 'none',
                                                                            minWidth: '40px'
                                                                        }}>
                                                                            {Array.from({ length: lineCount }, (_, i) => (
                                                                                <div key={i} style={{ fontSize: '0.78rem', fontFamily: "'Fira Code', monospace", color: '#484f58', lineHeight: '1.5', height: '1.17rem' }}>
                                                                                    {i + 1}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        {/* Code Input Area */}
                                                                        <textarea
                                                                            value={assignmentText}
                                                                            onChange={(e) => setAssignmentText(e.target.value)}
                                                                            placeholder={`// Write your ${exercise.langHint.toUpperCase()} code here...\n// The AI grader starts you at 5/100.\n// You must EARN every point.\n// Be thorough. Include comments.\n`}
                                                                            disabled={isGrading}
                                                                            spellCheck={false}
                                                                            style={{
                                                                                flex: 1,
                                                                                padding: '1rem',
                                                                                background: '#0d1117',
                                                                                color: '#c9d1d9',
                                                                                border: 'none',
                                                                                outline: 'none',
                                                                                fontSize: '0.85rem',
                                                                                fontFamily: "'Fira Code', 'Cascadia Code', 'SF Mono', 'Consolas', monospace",
                                                                                lineHeight: '1.5',
                                                                                resize: 'vertical',
                                                                                minHeight: '280px',
                                                                                boxSizing: 'border-box',
                                                                                caretColor: '#58a6ff',
                                                                                tabSize: 2
                                                                            }}
                                                                            onKeyDown={(e) => {
                                                                                if (e.key === 'Tab') {
                                                                                    e.preventDefault();
                                                                                    const start = e.target.selectionStart;
                                                                                    const end = e.target.selectionEnd;
                                                                                    const newVal = assignmentText.substring(0, start) + '  ' + assignmentText.substring(end);
                                                                                    setAssignmentText(newVal);
                                                                                    setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = start + 2; }, 0);
                                                                                }
                                                                            }}
                                                                        />
                                                                    </div>

                                                                    {/* Submit Bar */}
                                                                    <div style={{ padding: '1rem 1.5rem', background: '#161b22', borderTop: '2px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                                                                        <div style={{ fontSize: '0.7rem', color: '#8b949e', fontWeight: 700 }}>
                                                                            {assignmentText.trim().length} characters &nbsp;•&nbsp; {assignmentText.split('\n').length} lines &nbsp;•&nbsp; {exercise.langHint.toUpperCase()}
                                                                        </div>
                                                                        <button
                                                                            onClick={handleGradeAssignment}
                                                                            disabled={isGrading || !assignmentText.trim()}
                                                                            style={{
                                                                                background: isGrading ? '#21262d' : '#238636',
                                                                                color: isGrading ? '#484f58' : '#ffffff',
                                                                                border: '2px solid #000',
                                                                                padding: '0.8rem 2rem',
                                                                                borderRadius: '0.6rem',
                                                                                fontFamily: 'Outfit',
                                                                                fontWeight: 955,
                                                                                textTransform: 'uppercase',
                                                                                fontSize: '0.85rem',
                                                                                cursor: (isGrading || !assignmentText.trim()) ? 'not-allowed' : 'pointer',
                                                                                boxShadow: (isGrading || !assignmentText.trim()) ? 'none' : '3px 3px 0 #000000',
                                                                                transition: 'all 0.15s ease',
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                gap: '0.5rem'
                                                                            }}
                                                                        >
                                                                            {isGrading ? (
                                                                                <>🧠 AI Analyzing Code Step-by-Step...</>
                                                                            ) : (
                                                                                <>
                                                                                    <Cpu size={16} /> Submit & Grade Code
                                                                                </>
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    );
                                })()}                            </>
                        );
                    })()}
                </div>
                )}

                {/* 👥 PEER TO PEER HUB VIEW */}
                {academyTab === 'peers' && (() => {
                    const handleCreatePost = async (e) => {
                        e.preventDefault();
                        if (!peerTitle.trim() || !peerBody.trim()) {
                            alert('Please write a title and content for your peer post!');
                            return;
                        }
                        const { data, error } = await supabase
                            .from('peer_messages')
                            .insert([{
                                channel: 'general-questions',
                                title: peerTitle,
                                body: peerBody,
                                tag: peerTag,
                                author: studentName,
                                author_avatar: studentAvatar,
                                message_date: new Date().toLocaleDateString(),
                                cohort: studentCohort,
                                track: selectedCourse,
                                replies: []
                            }])
                            .select()
                            .single();
                        if (!error && data) {
                            setPeerPosts(prev => [{
                                id: data.id,
                                channel: data.channel,
                                title: data.title,
                                body: data.body,
                                tag: data.tag,
                                author: data.author,
                                authorAvatar: data.author_avatar,
                                date: data.message_date,
                                cohort: data.cohort,
                                track: data.track,
                                replies: data.replies || []
                            }, ...prev]);
                        }
                        setPeerTitle('');
                        setPeerBody('');
                        alert('✅ Challenge ticket posted successfully in your Cohort hub!');
                    };

                    const handleAddReply = async (postId) => {
                        const replyText = replyInputs[postId] || '';
                        if (!replyText.trim()) {
                            alert('Please write a comment first!');
                            return;
                        }
                        const targetPost = peerPosts.find(p => p.id === postId);
                        const updatedReplies = [...(targetPost?.replies || []), {
                            author: studentName,
                            authorAvatar: studentAvatar,
                            body: replyText,
                            date: new Date().toLocaleDateString()
                        }];
                        const { error } = await supabase
                            .from('peer_messages')
                            .update({ replies: updatedReplies })
                            .eq('id', postId);
                        if (!error) {
                            setPeerPosts(prev => prev.map(p =>
                                p.id === postId ? { ...p, replies: updatedReplies } : p
                            ));
                        }
                        setReplyInputs(prev => ({ ...prev, [postId]: '' }));
                    };

                    // Seed active posts if storage is empty
                    const activePosts = peerPosts.length > 0 ? peerPosts : [
                        {
                            id: 1,
                            title: 'Getting TypeError: Illegal constructor in React',
                            body: 'I noticed this error occurs when referencing Lock without importing it from lucide-react. Make sure you check your imports at the top of main or App!',
                            tag: 'Bug 🐛',
                            author: 'Ogunkoya Samuel Opemipo',
                            authorAvatar: '',
                            date: '7/19/2026',
                            cohort: studentCohort,
                            track: selectedCourse,
                            replies: [
                                { author: 'Ademuwagun Precious', authorAvatar: '', body: 'Thanks Samuel! This saved me hours of debugging.', date: '7/19/2026' }
                            ]
                        },
                        {
                            id: 2,
                            title: 'HTML Intro grading fails - help!',
                            body: 'I keep getting 55/100 and Failed on the HTML introduction assignment. I included h1, p, and a tags. What else is needed?',
                            tag: 'Question ❓',
                            author: 'Chioma Okafor',
                            authorAvatar: '',
                            date: '7/19/2026',
                            cohort: studentCohort,
                            track: selectedCourse,
                            replies: [
                                { author: 'Omotoyosi Agboola', authorAvatar: '', body: 'Make sure you add the exact DOCTYPE declaration: <!doctype html> at the very top. The strict AI grader validates the entire skeleton!', date: '7/19/2026' }
                            ]
                        }
                    ];

                    const cohortFilteredPosts = activePosts.filter(p => p.cohort === studentCohort && (p.track === selectedCourse || !p.track));

                    return (
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 420px) 1fr', gap: '2rem', alignItems: 'start', width: '100%' }} className="peer-hub-grid">
                            
                            {/* POST CREATOR PANEL */}
                            <div style={{ background: '#ffffff', border: '3px solid #000000', padding: '2rem', boxShadow: '8px 8px 0 #000000', display: 'flex', flexDirection: 'column', gap: '1.2rem', height: 'fit-content' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '2px solid #000', paddingBottom: '0.5rem' }}>
                                    <Cpu size={20} style={{ color: 'var(--accent-r)' }} />
                                    <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.2rem', margin: 0, textTransform: 'uppercase' }}>
                                        🚀 Post Challenge
                                    </h3>
                                </div>
                                <p style={{ fontSize: '0.75rem', color: '#666', lineHeight: '1.4', margin: 0 }}>
                                    Ask for bug fixes, share structural design issues, or request coding assistance from peers in **{studentCohort}**.
                                </p>
                                
                                <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.3rem', color: '#71717a' }}>Title / Bug Area</label>
                                        <input
                                            type="text"
                                            value={peerTitle}
                                            onChange={e => setPeerTitle(e.target.value)}
                                            placeholder="e.g. CSS Grid alignment issue"
                                            style={{ border: '2px solid #000', padding: '0.8rem', width: '100%', borderRadius: '0.6rem', fontFamily: 'Outfit', fontWeight: 700 }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.3rem', color: '#71717a' }}>Tag</label>
                                        <select
                                            value={peerTag}
                                            onChange={e => setPeerTag(e.target.value)}
                                            style={{ border: '2px solid #000', padding: '0.8rem', width: '100%', borderRadius: '0.6rem', fontFamily: 'Outfit', fontWeight: 900, cursor: 'pointer' }}
                                        >
                                            <option value="Bug 🐛">Bug 🐛</option>
                                            <option value="Question ❓">Question ❓</option>
                                            <option value="Challenge 🎯">Challenge 🎯</option>
                                            <option value="Idea 💡">Idea 💡</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.3rem', color: '#71717a' }}>Detailed Explanation</label>
                                        <textarea
                                            value={peerBody}
                                            onChange={e => setPeerBody(e.target.value)}
                                            placeholder="Paste error logs, explain what you've tried, or describe code syntax issues..."
                                            style={{ border: '2px solid #000', padding: '0.8rem', width: '100%', minHeight: '120px', borderRadius: '0.6rem', fontFamily: 'Outfit', fontWeight: 650, resize: 'vertical' }}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        style={{ width: '100%', padding: '0.8rem', background: '#000', color: '#fff', border: '3px solid #000', fontWeight: 950, textTransform: 'uppercase', cursor: 'pointer', boxShadow: '4px 4px 0 var(--accent-r)' }}
                                    >
                                        Submit Ticket 🚀
                                    </button>
                                </form>
                            </div>

                            {/* STREAM OF TICKETS */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ borderBottom: '3px solid #000', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.3rem', margin: 0, textTransform: 'uppercase' }}>
                                        💬 Active Bug Board ({cohortFilteredPosts.length})
                                    </h3>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#71717a' }}>Viewing only challenges for {studentCohort}</span>
                                </div>

                                {cohortFilteredPosts.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '4rem', color: '#71717a', border: '3px dashed #ccc', background: '#fff', borderRadius: '1rem' }}>
                                        <Users size={32} style={{ marginBottom: '1rem', opacity: 0.3, display: 'inline-block' }} />
                                        <p style={{ fontWeight: 800 }}>Clean Board! No active bugs posted in your cohort yet.</p>
                                    </div>
                                ) : (
                                    cohortFilteredPosts.map((post) => (
                                        <div key={post.id} style={{ background: '#fff', border: '3px solid #000', padding: '1.5rem', boxShadow: '6px 6px 0 #000', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                                    {post.authorAvatar ? (
                                                        <img src={post.authorAvatar} alt={post.author} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #000', objectFit: 'cover' }} />
                                                    ) : (
                                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem', border: '2px solid #000' }}>
                                                            {post.author.charAt(0)}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div style={{ fontSize: '0.85rem', fontWeight: 950, color: '#000', fontFamily: 'Outfit' }}>{post.author}</div>
                                                        <div style={{ fontSize: '0.65rem', color: '#71717a', fontWeight: 700 }}>Posted on {post.date} • {post.cohort}</div>
                                                    </div>
                                                </div>
                                                <span style={{ background: '#000', color: '#fff', padding: '0.2rem 0.6rem', border: '1px solid #000', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase' }}>{post.tag}</span>
                                            </div>

                                            <h4 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.1rem', margin: 0 }}>{post.title}</h4>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#334155', fontWeight: 650, lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{post.body}</p>

                                            {/* REPLIES BOX */}
                                            <div style={{ background: '#f8fafc', borderTop: '2px solid #000', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '0.5rem' }}>
                                                <div style={{ fontSize: '0.7rem', fontWeight: 955, textTransform: 'uppercase', color: '#71717a' }}>Replies ({post.replies?.length || 0})</div>
                                                
                                                {(post.replies || []).map((rep, idx) => (
                                                    <div key={idx} style={{ paddingBottom: '0.5rem', borderBottom: idx < post.replies.length - 1 ? '1px dashed #cbd5e1' : 'none' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                                                            {rep.authorAvatar ? (
                                                                <img src={rep.authorAvatar} alt={rep.author} style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #000', objectFit: 'cover' }} />
                                                            ) : (
                                                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-r)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.65rem', border: '1px solid #000' }}>
                                                                    {rep.author.charAt(0)}
                                                                </div>
                                                            )}
                                                            <div style={{ fontSize: '0.7rem', fontWeight: 900, color: rep.author === studentName ? 'var(--accent-r)' : '#000' }}>
                                                                {rep.author} <span style={{ fontWeight: 400, color: '#94a3b8' }}>• {rep.date}</span>
                                                            </div>
                                                        </div>
                                                        <div style={{ fontSize: '0.8rem', color: '#334155', fontWeight: 650, marginLeft: '1.8rem' }}>{rep.body}</div>
                                                    </div>
                                                ))}

                                                {!openReplyBoxes[post.id] ? (
                                                    <button
                                                        onClick={() => setOpenReplyBoxes(prev => ({ ...prev, [post.id]: true }))}
                                                        style={{
                                                            marginTop: '0.8rem',
                                                            background: 'transparent',
                                                            border: '2px solid #000',
                                                            padding: '0.4rem 0.9rem',
                                                            borderRadius: '0.4rem',
                                                            fontFamily: 'Outfit',
                                                            fontWeight: 900,
                                                            fontSize: '0.75rem',
                                                            cursor: 'pointer',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '0.3rem',
                                                            boxShadow: '2px 2px 0 #000',
                                                            transition: 'all 0.1s ease'
                                                        }}
                                                        onMouseOver={e => e.currentTarget.style.background = '#f1f5f9'}
                                                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                                                    >
                                                        💬 Reply
                                                    </button>
                                                ) : (
                                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.8rem', background: '#f8fafc', padding: '0.8rem', borderRadius: '0.6rem', border: '2px dashed #cbd5e1' }}>
                                                        <input
                                                            type="text"
                                                            placeholder="Add a reply..."
                                                            value={replyInputs[post.id] || ''}
                                                            onChange={e => setReplyInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                                                            style={{ flex: 1, border: '2px solid #000', padding: '0.5rem 0.8rem', fontFamily: 'Outfit', fontSize: '0.8rem', borderRadius: '0.4rem' }}
                                                            onKeyDown={e => {
                                                                if (e.key === 'Enter') {
                                                                    handleAddReply(post.id);
                                                                    setOpenReplyBoxes(prev => ({ ...prev, [post.id]: false }));
                                                                }
                                                            }}
                                                            autoFocus
                                                        />
                                                        <button 
                                                            onClick={() => {
                                                                handleAddReply(post.id);
                                                                setOpenReplyBoxes(prev => ({ ...prev, [post.id]: false }));
                                                            }} 
                                                            style={{ background: 'var(--accent-r)', color: '#fff', border: '2px solid #000', padding: '0.5rem 1rem', fontFamily: 'Outfit', fontWeight: 900, cursor: 'pointer', borderRadius: '0.4rem', boxShadow: '2px 2px 0 #000' }}
                                                        >
                                                            <Send size={14} />
                                                        </button>
                                                        <button 
                                                            onClick={() => setOpenReplyBoxes(prev => ({ ...prev, [post.id]: false }))} 
                                                            style={{ background: '#fff', color: '#000', border: '2px solid #000', padding: '0.5rem 1rem', fontFamily: 'Outfit', fontWeight: 900, cursor: 'pointer', borderRadius: '0.4rem' }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })()}


                {/* 🔔 NOTIFICATIONS VIEW */}

                {academyTab === 'notifications' && (() => {
                    const activeNotes = notifications.length > 0 ? notifications : [
                        {
                            id: 1,
                            title: 'Welcome to the Future Tech Academy (FTA)!',
                            body: 'Welcome to the learning space! Please complete coding assignments sequentially to advance. Remember, AI grading requires at least a 75/100 score to unlock next lessons.',
                            date: new Date().toLocaleDateString()
                        }
                    ];

                    return (
                        <div style={{ maxWidth: '800px', margin: '0 auto', animation: 'fadeIn 0.3s ease-out', width: '100%' }}>
                            <div style={{ borderBottom: '3px solid #000', paddingBottom: '0.5rem', marginBottom: '2rem' }}>
                                <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.3rem', margin: 0, textTransform: 'uppercase' }}>
                                    🔔 Cohort Notifications & Broadcasts
                                </h3>
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#71717a', margin: '0.2rem 0 0 0' }}>Alerts and meetings posted by curriculum curators</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {activeNotes.map((note) => (
                                    <div key={note.id} style={{ background: '#fff', border: '3px solid #000', padding: '1.5rem', boxShadow: '6px 6px 0 #000', display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                        <div style={{ background: 'var(--accent-r)', color: '#fff', padding: '0.5rem', border: '2px solid #000', borderRadius: '6px', flexShrink: 0 }}>
                                            <Mail size={20} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                <h4 style={{ fontFamily: 'Outfit', fontWeight: 955, fontSize: '1rem', margin: 0 }}>{note.title}</h4>
                                                <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>{note.date}</span>
                                            </div>
                                            <p style={{ margin: '0.6rem 0 0 0', fontSize: '0.85rem', color: '#334155', fontWeight: 650, lineHeight: '1.5' }}>{note.body}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })()}

            </div>
            </>)}

            {/* MOBILE MODULES MENU DRAWER MODAL */}
            {showMobileModulesDrawer && (
                <div className="fta-mobile-drawer-overlay" onClick={() => setShowMobileModulesDrawer(false)}>
                    <div className="fta-mobile-drawer-content" onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid #000', paddingBottom: '0.8rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <BookOpen size={20} color="var(--accent-r)" />
                                <h3 style={{ fontFamily: 'Outfit', fontWeight: 950, fontSize: '1.1rem', margin: 0, textTransform: 'uppercase' }}>
                                    Course Modules
                                </h3>
                            </div>
                            <button onClick={() => setShowMobileModulesDrawer(false)} style={{ background: '#000', color: '#fff', border: 'none', fontWeight: 900, cursor: 'pointer', fontSize: '1rem', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                        </div>

                        <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, margin: 0 }}>
                            Select any module & lesson to switch lectures on mobile:
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {!hasReleasedModules ? (
                                <div style={{ textAlign: 'center', padding: '2rem 1rem', background: '#f8fafc', border: '2px dashed #d1d5db', borderRadius: '0.5rem' }}>
                                    <Lock size={24} color="#9ca3af" style={{ margin: '0 auto 0.5rem auto' }} />
                                    <p style={{ fontWeight: 900, fontSize: '0.85rem', color: '#374151', margin: 0 }}>No Modules Released Yet</p>
                                </div>
                            ) : releasedModulesWithIndex.map(({ originalIdx, ...mod }) => {
                                const isExpanded = !!expandedModules[originalIdx];
                                return (
                                    <div key={originalIdx} style={{ border: '2px solid #000', borderRadius: '0.5rem', overflow: 'hidden' }}>
                                        <div
                                            onClick={() => toggleModule(originalIdx)}
                                            style={{
                                                background: isExpanded ? '#000000' : '#f8fafc',
                                                color: isExpanded ? '#ffffff' : '#000000',
                                                padding: '0.8rem 1rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                fontWeight: 900,
                                                fontSize: '0.85rem'
                                            }}
                                        >
                                            <span>{mod.title}</span>
                                            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                        </div>

                                        {isExpanded && (
                                            <div style={{ background: '#fff', padding: '0.4rem' }}>
                                                {mod.lessons.map((les, lesIdx) => {
                                                    const isSelected = selectedLesson.id === les.id;
                                                    const locked = isLessonLocked(les, originalIdx, lesIdx);
                                                    return (
                                                        <button
                                                            key={les.id}
                                                            disabled={locked}
                                                            onClick={() => {
                                                                if (!locked) {
                                                                    setSelectedModIdx(originalIdx);
                                                                    setSelectedLesIdx(lesIdx);
                                                                    setSelectedLesson(les);
                                                                    setShowMobileModulesDrawer(false);
                                                                }
                                                            }}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '0.6rem',
                                                                width: '100%',
                                                                padding: '0.6rem 0.8rem',
                                                                margin: '0.2rem 0',
                                                                border: '2px solid',
                                                                borderColor: isSelected ? 'var(--accent-r)' : 'transparent',
                                                                background: isSelected ? '#fff0f3' : locked ? '#f1f5f9' : 'transparent',
                                                                borderRadius: '0.4rem',
                                                                cursor: locked ? 'not-allowed' : 'pointer',
                                                                textAlign: 'left',
                                                                fontWeight: isSelected ? 900 : 700,
                                                                fontSize: '0.8rem',
                                                                opacity: locked ? 0.7 : 1
                                                            }}
                                                        >
                                                            {locked ? <Lock size={14} color="#94a3b8" /> : <Play size={14} color="var(--accent-r)" />}
                                                            <span style={{ flex: 1 }}>{les.title}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
            {/* CANDIDATE PROFILE MODAL */}
            {showProfileModal && (
                <div className="fta-mobile-drawer-overlay" style={{ justifyContent: 'center', alignItems: 'center' }} onClick={() => setShowProfileModal(false)}>
                    <div className="fta-modal-content" onClick={e => e.stopPropagation()} style={{ background: '#fff', border: '4px solid #000', padding: '2rem', boxShadow: '8px 8px 0 #000', maxWidth: '450px', width: '90%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '3px solid #000', paddingBottom: '0.8rem' }}>
                            <h3 style={{ fontFamily: 'Outfit', fontWeight: 950, fontSize: '1.2rem', margin: 0, textTransform: 'uppercase' }}>Candidate Profile</h3>
                            <button onClick={() => setShowProfileModal(false)} style={{ background: '#000', color: '#fff', border: 'none', fontWeight: 900, cursor: 'pointer', fontSize: '1rem', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', marginBottom: '1.5rem' }}>
                            <div style={{ position: 'relative' }}>
                                {studentAvatar ? (
                                    <img src={studentAvatar} alt={studentName} style={{ width: '90px', height: '90px', borderRadius: '50%', border: '4px solid #000', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'var(--accent-r)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, border: '4px solid #000', fontSize: '2.5rem' }}>
                                        {studentName.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <label style={{ cursor: 'pointer', background: '#000', color: '#fff', padding: '0.5rem 1rem', border: '2px solid #000', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', borderRadius: '0.4rem', boxShadow: '3px 3px 0 var(--accent-r)' }}>
                                📷 Upload Profile Picture
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            if (file.size > 2 * 1024 * 1024) {
                                                alert('Please choose an image under 2MB.');
                                                return;
                                            }
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setStudentAvatar(reader.result);
                                                localStorage.setItem('fta-student-avatar', reader.result);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </label>
                            {studentAvatar && (
                                <button
                                    onClick={() => {
                                        setStudentAvatar('');
                                        localStorage.removeItem('fta-student-avatar');
                                    }}
                                    style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    Remove Picture
                                </button>
                            )}
                        </div>

                        {/* Score Circle + Per-Module Breakdown */}
                        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                            <div
                                onClick={() => setSelectedScoreModule(selectedScoreModule === null ? 'breakdown' : null)}
                                style={{
                                    width: '100px', height: '100px', borderRadius: '50%',
                                    background: `conic-gradient(${totalScore >= 70 ? '#22c55e' : totalScore >= 50 ? '#f59e0b' : '#ef4444'} ${totalScore * 3.6}deg, #e5e7eb 0deg)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto', cursor: 'pointer', border: '4px solid #000',
                                    boxShadow: '4px 4px 0 #000', transition: 'transform 0.2s'
                                }}
                                title="Click to see per-module breakdown"
                            >
                                <div style={{
                                    width: '76px', height: '76px', borderRadius: '50%', background: '#fff',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <span style={{ fontFamily: 'Outfit', fontWeight: 950, fontSize: '1.5rem', color: totalScore >= 70 ? '#22c55e' : totalScore >= 50 ? '#f59e0b' : '#ef4444' }}>{totalScore}%</span>
                                    <span style={{ fontSize: '0.5rem', fontWeight: 800, textTransform: 'uppercase', color: '#666' }}>Score</span>
                                </div>
                            </div>
                            <div style={{ fontSize: '0.65rem', color: '#888', marginTop: '0.4rem', fontWeight: 700 }}>Click circle for breakdown</div>

                            {selectedScoreModule === 'breakdown' && (
                                <div style={{ marginTop: '1rem', border: '2px solid #000', borderRadius: '0.5rem', overflow: 'hidden' }}>
                                    <div style={{ background: '#000', color: '#fff', padding: '0.5rem', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase', fontFamily: 'Outfit' }}>Per-Module Grades</div>
                                    {moduleGrades.length === 0 ? (
                                        <div style={{ padding: '1rem', fontSize: '0.8rem', color: '#888' }}>No modules available</div>
                                    ) : (
                                        moduleGrades.map((mg) => (
                                            <div key={mg.index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.8rem', borderBottom: '1px solid #eee', background: mg.score !== null ? '#f0fdf4' : '#fff' }}>
                                                <div style={{ textAlign: 'left', flex: 1 }}>
                                                    <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '0.75rem' }}>{mg.title}</div>
                                                    {mg.feedback && <div style={{ fontSize: '0.6rem', color: '#666', marginTop: '0.1rem' }}>{mg.feedback}</div>}
                                                </div>
                                                <div style={{
                                                    width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #000',
                                                    background: mg.score !== null ? (mg.score >= 70 ? '#22c55e' : mg.score >= 50 ? '#f59e0b' : '#ef4444') : '#e5e7eb',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontWeight: 950, fontSize: '0.7rem', color: mg.score !== null ? '#fff' : '#999', flexShrink: 0
                                                }}>
                                                    {mg.score !== null ? `${mg.score}%` : '—'}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', fontFamily: 'Outfit' }}>Your Full Name / Peer Name:</label>
                            <input
                                type="text"
                                value={editNameInput}
                                onChange={(e) => setEditNameInput(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', border: '2px solid #000', fontWeight: 700, fontFamily: 'Outfit', fontSize: '0.9rem' }}
                            />
                        </div>

                        <button
                            onClick={() => {
                                if (editNameInput.trim()) {
                                    setStudentName(editNameInput.trim());
                                    localStorage.setItem('fta-student-name', editNameInput.trim());
                                    setShowProfileModal(false);
                                }
                            }}
                            style={{ width: '100%', padding: '0.8rem', background: 'var(--accent-r)', color: '#fff', border: '3px solid #000', fontWeight: 950, fontSize: '0.9rem', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '4px 4px 0 #000' }}
                        >
                            Save Profile
                        </button>
                    </div>
                </div>
            )}

            {/* STUCK IN TASK MODAL */}
            {showStuckModal && stuckTaskData && (
                <div className="fta-mobile-drawer-overlay" style={{ justifyContent: 'center', alignItems: 'center' }} onClick={() => setShowStuckModal(false)}>
                    <div className="fta-modal-content" onClick={e => e.stopPropagation()} style={{ background: '#fff', border: '4px solid #000', padding: '2rem', boxShadow: '8px 8px 0 #000', maxWidth: '520px', width: '90%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '3px solid #000', paddingBottom: '0.8rem' }}>
                            <h3 style={{ fontFamily: 'Outfit', fontWeight: 950, fontSize: '1.2rem', margin: 0, textTransform: 'uppercase', color: '#dc2626' }}>
                                🚨 Stuck in a Task?
                            </h3>
                            <button onClick={() => setShowStuckModal(false)} style={{ background: '#000', color: '#fff', border: 'none', fontWeight: 900, cursor: 'pointer', fontSize: '1rem', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                        </div>

                        <p style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 650, lineHeight: '1.5', marginBottom: '1rem' }}>
                            You scored <strong>{stuckTaskData.score}/100</strong> on <strong>{stuckTaskData.lessonTitle}</strong>. Would you like to drop this task on the Peer Hub so fellow candidates in <strong>{studentCohort}</strong> can review and assist you?
                        </p>

                        <div style={{ background: '#f8fafc', border: '2px solid #000', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', maxHeight: '140px', overflowY: 'auto' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#dc2626', textTransform: 'uppercase', marginBottom: '0.4rem' }}>AI Grader Diagnostic:</div>
                            <pre style={{ fontSize: '0.75rem', whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'monospace' }}>{stuckTaskData.feedback}</pre>
                        </div>

                        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => setShowStuckModal(false)}
                                style={{ padding: '0.7rem 1.2rem', background: '#fff', border: '2px solid #000', fontWeight: 900, cursor: 'pointer', fontSize: '0.8rem', textTransform: 'uppercase' }}
                            >
                                Dismiss
                            </button>
                            <button
                                onClick={async () => {
                                    const newPost = {
                                        title: `Stuck on ${stuckTaskData.lessonTitle} (Score: ${stuckTaskData.score}/100)`,
                                        body: `I need help with ${stuckTaskData.lessonTitle}.\n\nMy Submitted Code:\n\`\`\`\n${stuckTaskData.code || 'No code entered'}\n\`\`\`\n\nAI Diagnostic:\n${stuckTaskData.feedback}`,
                                        tag: 'Bug 🐛',
                                        author: studentName,
                                        authorAvatar: studentAvatar,
                                        date: new Date().toLocaleDateString(),
                                        cohort: studentCohort,
                                        track: selectedCourse,
                                        replies: []
                                    };
                                    const { data, error } = await supabase
                                        .from('peer_messages')
                                        .insert([{
                                            channel: 'help-and-bugs',
                                            title: newPost.title,
                                            body: newPost.body,
                                            tag: newPost.tag,
                                            author: newPost.author,
                                            author_avatar: newPost.authorAvatar,
                                            message_date: newPost.date,
                                            cohort: newPost.cohort,
                                            track: selectedCourse,
                                            replies: []
                                        }])
                                        .select()
                                        .single();
                                    if (!error && data) {
                                        setPeerPosts(prev => [{
                                            id: data.id,
                                            channel: data.channel,
                                            title: data.title,
                                            body: data.body,
                                            tag: data.tag,
                                            author: data.author,
                                            authorAvatar: data.author_avatar,
                                            date: data.message_date,
                                            cohort: data.cohort,
                                            track: data.track,
                                            replies: data.replies || []
                                        }, ...prev]);
                                    }
                                    setShowStuckModal(false);
                                    setAcademyTab('peers');
                                }}
                                style={{ padding: '0.7rem 1.4rem', background: 'var(--accent-r)', color: '#fff', border: '3px solid #000', fontWeight: 950, cursor: 'pointer', fontSize: '0.8rem', textTransform: 'uppercase', boxShadow: '3px 3px 0 #000' }}
                            >
                                🚀 Drop Task on Peer Hub
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

/* ───────────────────────────────────────────
   SCREENING TEST PAGE (FUTURE TECH ACADEMY - FTA)
   ─────────────────────────────────────────── */

const SCREENING_QUESTIONS = {
    'Frontend Engineering': [
        {
            q: 'You visit a website and the words are all over the place, making it difficult to know what to read first. What would make the page easier to understand?',
            options: [
                'Add more colors to every section',
                'Organize the information clearly and create a clear reading order',
                'Make every word the same size',
                'Add more information to fill empty spaces'
            ],
            answer: 1
        },
        {
            q: 'Imagine you are ordering food online. You click "Place Order," but nothing appears to happen. What would you expect the website to do?',
            options: [
                'Change the entire page without explanation',
                'Give you some indication that your order is being processed',
                'Close the website immediately',
                'Ask you to start the order again without explanation'
            ],
            answer: 1
        },
        {
            q: 'A friend visits a website on their phone, but everything looks too large and they have to constantly zoom in and out. What is the likely problem?',
            options: [
                'The website was not designed to adjust properly to different screen sizes',
                'The website has too many pictures',
                'The website has too many words',
                'The phone needs a new operating system'
            ],
            answer: 0
        },
        {
            q: 'You are filling out a registration form and accidentally leave your phone number empty. What would be most helpful?',
            options: [
                'The form should clearly tell you what information is missing',
                'The form should delete everything you entered',
                'The form should submit anyway',
                'The form should close without explanation'
            ],
            answer: 0
        },
        {
            q: 'You are given a long list of 100 items and asked to find one specific item. Which approach would make the task easier?',
            options: [
                'Make the list longer',
                'Add a way to search or filter the items',
                'Remove all labels from the items',
                'Put everything on one line'
            ],
            answer: 1
        },
        {
            q: 'A website takes several seconds to respond after you click something. What would help you understand that your action was received?',
            options: [
                'Nothing should change until the process finishes',
                'A loading indicator or message showing that something is happening',
                'The website should immediately close',
                'The button should disappear permanently'
            ],
            answer: 1
        },
        {
            q: 'You are designing a page for people who have never used it before. What is the best approach?',
            options: [
                'Assume they will figure everything out themselves',
                'Make important actions and instructions clear and easy to understand',
                'Hide the instructions to keep the page clean',
                'Use complicated words to make the page look professional'
            ],
            answer: 1
        },
        {
            q: 'You change something on a website and later realize the change caused another part to stop working. What would be useful when working on a project with many changes?',
            options: [
                'A way to keep track of previous changes',
                'Deleting the entire project',
                'Making changes without recording them',
                'Starting from scratch every time'
            ],
            answer: 0
        },
        {
            q: 'You are creating a shopping website. A customer clicks "Buy Now" several times because they are unsure whether the first click worked. What could prevent this?',
            options: [
                'Give clear feedback after the first click',
                'Remove the button completely',
                'Add five more buttons',
                'Make the button smaller'
            ],
            answer: 0
        },
        {
            q: 'You are given a problem you have never encountered before. What is the best first step?',
            options: [
                'Randomly change things until something works',
                'Understand the problem, break it into smaller parts, and investigate possible solutions',
                'Immediately give up because you have never seen it before',
                'Copy someone else\'s solution without understanding it'
            ],
            answer: 1
        }
    ],
    'Product Design (UI/UX)': [
        {
            q: 'You enter a new supermarket for the first time. You cannot find where to pay because there are no signs. What is the main problem?',
            options: [
                'The supermarket has too many products',
                'The environment does not clearly guide people to where they need to go',
                'The supermarket needs more colors',
                'The products are too expensive'
            ],
            answer: 1
        },
        {
            q: 'Imagine you are creating a new school cafeteria. Before deciding where to put everything, what would be most useful to understand first?',
            options: [
                'What students need and how they normally use the cafeteria',
                'What color the designer personally likes',
                'What font is currently popular',
                'How many decorations can fit inside'
            ],
            answer: 0
        },
        {
            q: 'A person is trying to withdraw money from an ATM but keeps pressing the wrong button. What should you investigate first?',
            options: [
                'Why the person is having difficulty understanding the available options',
                'Whether the ATM should have more animations',
                'Whether the ATM should use more colors',
                'Whether the ATM should play music'
            ],
            answer: 0
        },
        {
            q: 'You want to build a new app that helps students find accommodation. What is the best thing to do before designing the final app?',
            options: [
                'Immediately choose colors and start decorating the screens',
                'Understand how students currently search for accommodation and what problems they face',
                'Add as many features as possible',
                'Copy another accommodation app exactly'
            ],
            answer: 1
        },
        {
            q: 'A restaurant gives customers a menu with 200 food options, but most customers struggle to decide what to order. What could improve the experience?',
            options: [
                'Add another 100 options',
                'Organize the options into clear categories and make popular choices easy to find',
                'Remove all food names',
                'Make every option look exactly the same'
            ],
            answer: 1
        },
        {
            q: 'You design a new process for booking a bus. You believe it is easy, but three people try it and all get confused at the same step. What should you do?',
            options: [
                'Tell them they are using it incorrectly',
                'Investigate the confusing step and improve the process based on their feedback',
                'Add more steps to make it clearer',
                'Ignore their feedback because you designed it'
            ],
            answer: 1
        },
        {
            q: 'A hospital has two doors. One leads to the emergency room and the other leads to the reception. Both doors look exactly the same. What is the biggest issue?',
            options: [
                'People may have difficulty knowing which door to use',
                'The hospital needs more doors',
                'Both doors should be painted different colors randomly',
                'The doors should be removed'
            ],
            answer: 0
        },
        {
            q: 'You are designing a school portal. Students frequently ask, "Where do I check my results?" What does this suggest?',
            options: [
                'The students should have to ask more questions',
                'The location of the results should be made easier to find',
                'The portal needs more complicated features',
                'The results should be removed'
            ],
            answer: 1
        },
        {
            q: 'You are asked to improve a product that people already use. What is the most useful approach?',
            options: [
                'Change everything immediately',
                'Understand what currently works and what causes problems before making changes',
                'Add features based only on personal preference',
                'Make the product look completely different regardless of user needs'
            ],
            answer: 1
        },
        {
            q: 'Two people are given the same task using a new service. One completes it easily while the other gets confused. What would be useful to learn?',
            options: [
                'Only which person you personally prefer',
                'What each person did and where the confused person encountered difficulty',
                'Nothing, because one person succeeded',
                'Whether the confused person likes the service\'s colors'
            ],
            answer: 1
        }
    ]
};
SCREENING_QUESTIONS['UI/UX Product Design'] = SCREENING_QUESTIONS['Product Design (UI/UX)'];

const TIMER_PER_QUESTION = 15; // seconds

function PayCheckout() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [course, setCourse] = useState('Frontend Engineering');
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentRef, setPaymentRef] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('email')) setEmail(params.get('email'));
        if (params.get('name')) setName(params.get('name'));
        if (params.get('course')) setCourse(params.get('course'));

        if (!document.getElementById('paystack-js')) {
            const script = document.createElement('script');
            script.id = 'paystack-js';
            script.src = 'https://js.paystack.co/v1/inline.js';
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    const handlePaystackPayment = () => {
        if (!email || !email.includes('@')) {
            alert('Please enter a valid registered email address.');
            return;
        }

        if (typeof window.PaystackPop === 'undefined') {
            alert('Paystack payment system is still initializing. Please try again in a few seconds.');
            return;
        }

        setLoading(true);

        const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_live_cf6029110cbb5f3362b36cdd46f6538ba6c99b58';

        const handler = window.PaystackPop.setup({
            key: publicKey,
            email: email.trim(),
            amount: 1000000, // ₦10,000 in Kobo
            currency: 'NGN',
            ref: 'FTA-PAY-' + Math.floor((Math.random() * 1000000000) + 1),
            metadata: {
                name: name || 'Student',
                course: course || 'Tech Track',
                custom_fields: [
                    { display_name: "Student Name", variable_name: "student_name", value: name || 'Student' },
                    { display_name: "Course Track", variable_name: "course_track", value: course || 'Tech Track' }
                ]
            },
            callback: function(response) {
                setLoading(false);
                setPaymentRef(response.reference);
                setPaymentSuccess(true);
            },
            onClose: function() {
                setLoading(false);
            }
        });

        handler.openIframe();
    };

    if (paymentSuccess) {
        return (
            <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '2.5rem', background: '#fff', border: '5px solid #000', borderRadius: '1.5rem', boxShadow: '8px 8px 0 #000', fontFamily: 'Outfit, sans-serif' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🎉</div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 950, color: '#16a34a', textTransform: 'uppercase', margin: 0 }}>
                        Payment Successful!
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, marginTop: '0.3rem' }}>
                        Payment Reference: <span style={{ fontFamily: 'monospace', color: '#000' }}>{paymentRef}</span>
                    </p>
                </div>

                <div style={{ background: '#eff6ff', border: '3px solid #2563eb', padding: '1.5rem', borderRadius: '1rem', marginBottom: '1.5rem' }}>
                    <h4 style={{ margin: '0 0 0.8rem 0', color: '#1e40af', fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase' }}>
                        📌 Important Next Steps
                    </h4>
                    <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.95rem', color: '#1e3a8a', lineHeight: 1.6, fontWeight: 700 }}>
                        The admin will send you an email to log in to your dashboard soon!
                    </p>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#1e40af', lineHeight: 1.6 }}>
                        <strong>Cohort 1 starts August 15th.</strong> You will have access to tutors every 2 weeks and also a community of fellow learners to build and grow together!
                    </p>
                </div>

                <button
                    onClick={() => {
                        window.location.href = '/';
                    }}
                    style={{
                        width: '100%',
                        background: '#000',
                        color: '#fff',
                        border: '3px solid #000',
                        padding: '1rem',
                        borderRadius: '0.8rem',
                        fontWeight: 900,
                        fontSize: '1rem',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        boxShadow: '4px 4px 0 var(--accent-r)'
                    }}
                >
                    Return to Homepage
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '550px', margin: '4rem auto', padding: '2.5rem', background: '#fff', border: '5px solid #000', borderRadius: '1.5rem', boxShadow: '8px 8px 0 #000', fontFamily: 'Outfit, sans-serif' }}>
            <div style={{ textTransform: 'uppercase', fontWeight: 900, fontSize: '0.8rem', color: '#dc2626', letterSpacing: '1px', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>🔒</span> Future Tech Academy • Cohort 1 Locked
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 950, textTransform: 'uppercase', margin: '0 0 1rem 0', color: '#000' }}>
                Payment Portal Locked
            </h2>

            <div style={{ background: '#fef2f2', border: '3px solid #dc2626', padding: '1.5rem', borderRadius: '1rem', marginBottom: '1.5rem', boxShadow: '4px 4px 0 #000' }}>
                <div style={{ fontSize: '2.8rem', textAlign: 'center', marginBottom: '0.5rem' }}>🔒</div>
                <h3 style={{ margin: '0 0 0.5rem 0', textAlign: 'center', color: '#991b1b', fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase' }}>
                    Payment Locked for Cohort 1
                </h3>
                <p style={{ margin: 0, textAlign: 'center', color: '#7f1d1d', fontSize: '0.92rem', lineHeight: 1.6, fontWeight: 700 }}>
                    Course commitment fee payments for <strong>Cohort 1</strong> are officially closed and locked. No further payments can be made for Cohort 1.
                </p>
            </div>

            <div style={{ background: '#f4f4f5', border: '3px solid #000', padding: '1.2rem', borderRadius: '1rem', marginBottom: '1.5rem', boxShadow: '4px 4px 0 #000' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#71717a', fontWeight: 700 }}>Payment Status:</span>
                    <span style={{ fontWeight: 900, color: '#dc2626' }}>CLOSED / LOCKED</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.9rem' }}>
                    <span style={{ color: '#71717a', fontWeight: 700 }}>Cohort:</span>
                    <span style={{ fontWeight: 900, color: '#000' }}>Cohort 1</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: '#71717a', fontWeight: 700 }}>Next Application:</span>
                    <span style={{ fontWeight: 900, color: '#2563eb' }}>Cohort 2 (Coming Soon)</span>
                </div>
            </div>

            <button
                disabled
                onClick={() => alert('Payment for Cohort 1 is locked. No further payments are being accepted.')}
                style={{
                    width: '100%',
                    background: '#ef4444',
                    color: '#ffffff',
                    border: '3.5px solid #000',
                    padding: '1.1rem',
                    borderRadius: '0.8rem',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 950,
                    fontSize: '1.05rem',
                    textTransform: 'uppercase',
                    cursor: 'not-allowed',
                    boxShadow: '4px 4px 0 #000',
                    letterSpacing: '0.5px'
                }}
            >
                🔒 Payment Locked for Cohort 1
            </button>

            <div style={{ textAlign: 'center', marginTop: '1.2rem' }}>
                <button
                    onClick={() => { window.location.href = '/'; }}
                    style={{ background: 'none', border: 'none', textDecoration: 'underline', fontWeight: 800, cursor: 'pointer', fontSize: '0.85rem', color: '#000' }}
                >
                    Return to Homepage
                </button>
            </div>
        </div>
    );
}

const ScreeningTest = () => {
    const [step, setStep] = useState('email'); // 'email' | 'taking' | 'done' | 'blocked'
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [checking, setChecking] = useState(false);
    const [registrationData, setRegistrationData] = useState(null);

    // Test state
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeLeft, setTimeLeft] = useState(TIMER_PER_QUESTION);
    const [finalScore, setFinalScore] = useState(null);
    const [blockedReason, setBlockedReason] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const questions = registrationData
        ? (SCREENING_QUESTIONS[registrationData.track] || SCREENING_QUESTIONS['Frontend Engineering'])
        : [];

    // ── TIMER ─────────────────────────────────────────────────────────────────
    useEffect(() => {
        if (step !== 'taking') return;
        setTimeLeft(TIMER_PER_QUESTION);
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    // Auto-advance: record no answer (null) and go next
                    setAnswers(a => ({ ...a, [currentQ]: selectedOption }));
                    setSelectedOption(null);
                    setCurrentQ(q => {
                        const next = q + 1;
                        if (next >= questions.length) {
                            clearInterval(interval);
                            return q; // will be handled by useEffect below
                        }
                        return next;
                    });
                    return TIMER_PER_QUESTION;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [step, currentQ]);

    // Detect when all questions answered by auto-advance
    useEffect(() => {
        if (step !== 'taking') return;
        if (currentQ >= questions.length && questions.length > 0) {
            handleSubmitTest();
        }
    }, [currentQ, step]);

    // ── EMAIL CHECK ───────────────────────────────────────────────────────────
    const handleEmailCheck = async () => {
        const trimmed = email.trim().toLowerCase();
        if (!trimmed || !trimmed.includes('@')) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        setChecking(true);
        setEmailError('');

        // Look for email in registrations (tech waitlist entries)
        const { data, error } = await supabase
            .from('registrations')
            .select('*')
            .eq('email', trimmed)
            .maybeSingle();

        setChecking(false);

        if (error || !data) {
            setBlockedReason('Your email is not on our waitlist. Please join the Academy Waitlist first before taking this test.');
            setStep('blocked');
            return;
        }

        const products = typeof data.products === 'string' ? JSON.parse(data.products) : (data.products || {});
        const rawTrack = data.company_name || data.track || products.track || products.course || 'Frontend Engineering';
        
        let track = 'Frontend Engineering';
        if (rawTrack.includes('UI') || rawTrack.includes('Product Design') || rawTrack.includes('UX')) {
            track = 'Product Design (UI/UX)';
        } else if (rawTrack.includes('Backend')) {
            track = 'Backend Engineering';
        } else if (rawTrack.includes('Mobile')) {
            track = 'Mobile App Development';
        } else if (rawTrack.includes('Data') || rawTrack.includes('AI')) {
            track = 'Data Science & AI';
        } else if (rawTrack.includes('Cyber')) {
            track = 'Cybersecurity';
        } else if (SCREENING_QUESTIONS[rawTrack]) {
            track = rawTrack;
        }

        // Already admitted?
        if (products.admitted === true) {
            setBlockedReason('You have already been admitted to the Academy. This screening test is no longer applicable to you. Please log into the LMS with your email.');
            setStep('blocked');
            return;
        }

        // Already completed test?
        if (products.test_done === true) {
            const score = products.test_score ?? '—';
            setBlockedReason(`You have already completed this screening test (Score: ${score}/100). Each applicant can only take the test once.`);
            setStep('blocked');
            return;
        }

        setRegistrationData({ ...data, track });
        setStep('taking');
        setCurrentQ(0);
        setAnswers({});
        setSelectedOption(null);
        setTimeLeft(TIMER_PER_QUESTION);
    };

    // ── NEXT QUESTION ────────────────────────────────────────────────────────
    const handleNext = () => {
        setAnswers(prev => ({ ...prev, [currentQ]: selectedOption }));
        setSelectedOption(null);
        if (currentQ + 1 >= questions.length) {
            handleSubmitTest({ ...answers, [currentQ]: selectedOption });
        } else {
            setCurrentQ(q => q + 1);
        }
    };

    // ── SUBMIT ───────────────────────────────────────────────────────────────
    const handleSubmitTest = async (finalAnswers) => {
        const ans = finalAnswers || { ...answers, [currentQ]: selectedOption };
        let correct = 0;
        questions.forEach((q, i) => {
            if (ans[i] === q.answer) correct++;
        });
        const score = Math.round((correct / questions.length) * 100);
        setFinalScore(score);
        setSubmitting(true);

        // Save to Supabase — update the registrant's products JSON
        try {
            const existingProducts = typeof registrationData.products === 'string' ? JSON.parse(registrationData.products) : (registrationData.products || {});
            const updatedProducts = {
                ...existingProducts,
                test_done: true,
                test_score: score,
                test_date: new Date().toISOString(),
                test_track: registrationData.track
            };
            await supabase
                .from('registrations')
                .update({ products: updatedProducts })
                .eq('email', registrationData.email);
        } catch (e) {
            console.warn('Could not save test result:', e);
        }

        setSubmitting(false);
        setStep('done');
    };

    const timerPct = (timeLeft / TIMER_PER_QUESTION) * 100;
    const timerColor = timeLeft > 12 ? '#22c55e' : timeLeft > 6 ? '#f59e0b' : '#ef4444';

    // ── RENDER ────────────────────────────────────────────────────────────────
    return (
        <div style={{
            minHeight: '100vh', background: '#f8fafc',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem 1rem', fontFamily: 'Outfit, sans-serif'
        }}>
            <div style={{ width: '100%', maxWidth: '680px' }}>

                {/* Header Logo */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#000', color: '#fff', padding: '0.6rem 1.4rem', border: '3px solid #000', boxShadow: '4px 4px 0 var(--accent-r, #e63946)' }}>
                        <span style={{ fontSize: '1.3rem' }}>🎓</span>
                        <span style={{ fontWeight: 950, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Future Tech Academy</span>
                    </div>
                    <div style={{ marginTop: '0.6rem', fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>Screening Test Portal</div>
                </div>

                {/* ── STEP: EMAIL GATE ── */}
                {step === 'email' && (
                    <div style={{ background: '#fff', border: '4px solid #000', padding: '2.5rem', boxShadow: '8px 8px 0 #000' }}>
                        <h1 style={{ fontFamily: 'Outfit', fontWeight: 950, fontSize: '1.6rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
                            🧪 Aptitude Screening Test
                        </h1>
                        <p style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, margin: '0 0 2rem 0', lineHeight: 1.6 }}>
                            This test is for registered FTA waitlist applicants only. Enter your registered email to begin. <strong>You can only take this test once.</strong>
                        </p>

                        <div style={{ marginBottom: '0.8rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                                Registered Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => { setEmail(e.target.value); setEmailError(''); }}
                                onKeyDown={e => e.key === 'Enter' && handleEmailCheck()}
                                placeholder="your@email.com"
                                style={{
                                    width: '100%', padding: '0.9rem 1rem',
                                    border: emailError ? '3px solid #ef4444' : '3px solid #000',
                                    fontFamily: 'Outfit', fontWeight: 700, fontSize: '1rem',
                                    outline: 'none', boxSizing: 'border-box'
                                }}
                            />
                            {emailError && <div style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 800, marginTop: '0.4rem' }}>{emailError}</div>}
                        </div>

                        <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', padding: '0.8rem 1rem', borderRadius: '0.4rem', marginBottom: '1.5rem', fontSize: '0.78rem', fontWeight: 700, color: '#92400e' }}>
                            ⚠️ Rules: 10 questions · 20 seconds per question · Auto-advances when time runs out · One attempt only
                        </div>

                        <button
                            onClick={handleEmailCheck}
                            disabled={checking}
                            style={{
                                width: '100%', padding: '1rem',
                                background: checking ? '#94a3b8' : '#000',
                                color: '#fff', border: '3px solid #000',
                                fontFamily: 'Outfit', fontWeight: 950, fontSize: '1rem',
                                textTransform: 'uppercase', cursor: checking ? 'not-allowed' : 'pointer',
                                boxShadow: checking ? 'none' : '5px 5px 0 #e63946', transition: 'all 0.15s'
                            }}
                        >
                            {checking ? '⏳ Verifying...' : '🚀 Begin Screening Test'}
                        </button>
                    </div>
                )}

                {/* ── STEP: BLOCKED ── */}
                {step === 'blocked' && (
                    <div style={{ background: '#fff', border: '4px solid #ef4444', padding: '2.5rem', boxShadow: '8px 8px 0 #ef4444', textAlign: 'center' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🚫</div>
                        <h2 style={{ fontFamily: 'Outfit', fontWeight: 950, fontSize: '1.4rem', margin: '0 0 1rem 0', color: '#ef4444', textTransform: 'uppercase' }}>
                            Access Denied
                        </h2>
                        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155', lineHeight: 1.7, margin: '0 0 2rem 0' }}>
                            {blockedReason}
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => { setStep('email'); setEmail(''); setBlockedReason(''); }}
                                style={{ padding: '0.7rem 1.5rem', background: '#fff', border: '3px solid #000', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '3px 3px 0 #000' }}
                            >
                                ← Try Different Email
                            </button>
                            <a href="/waitlist" style={{ padding: '0.7rem 1.5rem', background: '#000', color: '#fff', border: '3px solid #000', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '3px 3px 0 #e63946', textDecoration: 'none', display: 'inline-block' }}>
                                Join Waitlist →
                            </a>
                        </div>
                    </div>
                )}

                {/* ── STEP: TAKING TEST ── */}
                {step === 'taking' && questions.length > 0 && currentQ < questions.length && (
                    <div style={{ background: '#fff', border: '4px solid #000', boxShadow: '8px 8px 0 #000', overflow: 'hidden' }}>

                        {/* Progress Bar */}
                        <div style={{ background: '#f1f5f9', height: '6px' }}>
                            <div style={{ height: '100%', background: '#000', width: `${((currentQ) / questions.length) * 100}%`, transition: 'width 0.4s ease' }} />
                        </div>

                        {/* Header */}
                        <div style={{ background: '#000', color: '#fff', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', color: '#9ca3af' }}>
                                    {registrationData?.track} · Screening Test
                                </div>
                                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '0.2rem' }}>
                                    Question {currentQ + 1} of {questions.length}
                                </div>
                            </div>

                            {/* Timer */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                                <div style={{ position: 'relative', width: '52px', height: '52px' }}>
                                    <svg width="52" height="52" style={{ transform: 'rotate(-90deg)' }}>
                                        <circle cx="26" cy="26" r="22" fill="none" stroke="#333" strokeWidth="4" />
                                        <circle
                                            cx="26" cy="26" r="22" fill="none"
                                            stroke={timerColor} strokeWidth="4"
                                            strokeDasharray={`${2 * Math.PI * 22}`}
                                            strokeDashoffset={`${2 * Math.PI * 22 * (1 - timerPct / 100)}`}
                                            style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s' }}
                                        />
                                    </svg>
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit', fontWeight: 950, fontSize: '1rem', color: timerColor }}>
                                        {timeLeft}
                                    </div>
                                </div>
                                <div style={{ fontSize: '0.55rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase' }}>secs</div>
                            </div>
                        </div>

                        {/* Question */}
                        <div style={{ padding: '1.8rem 1.5rem 1.2rem 1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '1.5rem' }}>
                                <span style={{ background: '#e63946', color: '#fff', padding: '0.2rem 0.6rem', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.8rem', flexShrink: 0, marginTop: '0.1rem' }}>
                                    Q{currentQ + 1}
                                </span>
                                <p style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.05rem', margin: 0, lineHeight: 1.5, color: '#0f172a' }}>
                                    {questions[currentQ].q}
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                                {questions[currentQ].options.map((opt, oi) => (
                                    <button
                                        key={oi}
                                        onClick={() => setSelectedOption(oi)}
                                        style={{
                                            padding: '0.8rem 1.1rem',
                                            border: selectedOption === oi ? '3px solid #000' : '2px solid #cbd5e1',
                                            borderRadius: '0.4rem',
                                            background: selectedOption === oi ? '#000' : '#fff',
                                            color: selectedOption === oi ? '#fff' : '#1e293b',
                                            fontWeight: selectedOption === oi ? 900 : 700,
                                            fontFamily: 'Outfit',
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.12s',
                                            boxShadow: selectedOption === oi ? '3px 3px 0 #e63946' : 'none',
                                            display: 'flex', alignItems: 'center', gap: '0.7rem'
                                        }}
                                    >
                                        <span style={{
                                            width: '24px', height: '24px', borderRadius: '50%', border: '2px solid',
                                            borderColor: selectedOption === oi ? '#fff' : '#94a3b8',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontWeight: 900, fontSize: '0.7rem', flexShrink: 0,
                                            color: selectedOption === oi ? '#fff' : '#64748b'
                                        }}>
                                            {['A', 'B', 'C', 'D'][oi]}
                                        </span>
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div style={{ padding: '1rem 1.5rem', borderTop: '2px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>
                                {selectedOption !== null ? '✅ Answer selected' : '⏳ Select an answer or wait for auto-advance'}
                            </div>
                            <button
                                onClick={handleNext}
                                disabled={selectedOption === null}
                                style={{
                                    padding: '0.7rem 1.6rem',
                                    background: selectedOption !== null ? '#e63946' : '#94a3b8',
                                    color: '#fff', border: '3px solid #000',
                                    fontFamily: 'Outfit', fontWeight: 950, fontSize: '0.85rem',
                                    textTransform: 'uppercase', cursor: selectedOption !== null ? 'pointer' : 'not-allowed',
                                    boxShadow: selectedOption !== null ? '3px 3px 0 #000' : 'none',
                                    transition: 'all 0.12s'
                                }}
                            >
                                {currentQ + 1 === questions.length ? '📝 Submit' : 'Next →'}
                            </button>
                        </div>
                    </div>
                )}

                {/* ── STEP: DONE ── */}
                {step === 'done' && (
                    <div style={{ background: '#fff', border: '4px solid #000', padding: '2.5rem', boxShadow: '8px 8px 0 #000', textAlign: 'center' }}>
                        {submitting ? (
                            <div style={{ padding: '3rem', color: '#64748b', fontWeight: 700 }}>⏳ Saving your results...</div>
                        ) : (
                            <>
                                {/* Score Circle */}
                                <div style={{
                                    width: '140px', height: '140px', borderRadius: '50%',
                                    background: `conic-gradient(${finalScore >= 70 ? '#22c55e' : finalScore >= 50 ? '#f59e0b' : '#ef4444'} ${finalScore * 3.6}deg, #e5e7eb 0deg)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1.5rem auto', border: '5px solid #000', boxShadow: '5px 5px 0 #000'
                                }}>
                                    <div style={{ width: '106px', height: '106px', borderRadius: '50%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontFamily: 'Outfit', fontWeight: 950, fontSize: '2rem', color: finalScore >= 70 ? '#22c55e' : finalScore >= 50 ? '#f59e0b' : '#ef4444' }}>
                                            {finalScore}%
                                        </span>
                                        <span style={{ fontSize: '0.55rem', fontWeight: 800, color: '#888', textTransform: 'uppercase' }}>Your Score</span>
                                    </div>
                                </div>

                                <h2 style={{ fontFamily: 'Outfit', fontWeight: 950, fontSize: '1.5rem', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>
                                    {finalScore >= 70 ? '🎉 Well Done!' : finalScore >= 50 ? '👍 Good Attempt!' : '📚 Test Complete'}
                                </h2>
                                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569', lineHeight: 1.7, margin: '0 0 0.5rem 0' }}>
                                    You scored <strong>{finalScore}/100</strong> on the <strong>{registrationData?.track}</strong> Screening Test.
                                </p>
                                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', margin: '0 0 2rem 0' }}>
                                    Your results have been recorded. Our team will review all applications and contact admitted candidates via email with next steps.
                                </p>

                                <div style={{ background: '#f0fdf4', border: '2px solid #22c55e', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', fontSize: '0.82rem', color: '#166534', fontWeight: 700 }}>
                                    ✅ Test submitted successfully. You will receive an email if you are admitted to Cohort 1.
                                </div>

                                <a href="/" style={{ display: 'inline-block', padding: '0.8rem 2rem', background: '#000', color: '#fff', border: '3px solid #000', fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '4px 4px 0 #e63946' }}>
                                    ← Back to Homepage
                                </a>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

/* ───────────────────────────────────────────
   TECH WAITLIST SECTION (FUTURE TECH ACADEMY - FTA)
   ─────────────────────────────────────────── */
const TechWaitlistSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        track: 'Frontend Engineering',
        level: 'Beginner'
    });
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [assignedTicketId, setAssignedTicketId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Check if email already registered globally (email is UNIQUE in the registrations table)
        const { data: existing, error: checkError } = await supabase
            .from('registrations')
            .select('email')
            .eq('email', formData.email)
            .maybeSingle();

        if (existing) {
            setError('This email address is already registered in our system. Please use a different email.');
            setLoading(false);
            return;
        }

        const ticketId = `#OOU-EDU-${Math.floor(10000 + Math.random() * 90000)}`;

        const { error: insertError } = await supabase
            .from('registrations')
            .insert([{
                name: formData.name,
                email: formData.email,
                ticket_type: `tech_waitlist_${formData.track.toLowerCase().replace(/\s+/g, '_')}`,
                ticket_id: ticketId,
                whatsapp_number: formData.whatsapp,
                company_name: formData.track,
                products: formData.level
            }]);

        if (insertError) {
            console.error('Waitlist Supabase Error:', insertError);
            if (insertError.code === '23505') {
                setError('This email address is already registered in our system. Please use a different email.');
            } else {
                setError('Failed to join the waitlist. Please check your connection.');
            }
            setLoading(false);
            return;
        }

        setAssignedTicketId(ticketId);
        setIsSubmitted(true);
        setLoading(false);
    };

    if (isSubmitted) {
        return (
            <div style={{ maxWidth: '600px', margin: '3rem auto', padding: '0 1rem' }}>
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    style={{ background: '#ffffff', border: '3px solid #000000', padding: '3rem 2rem', textAlign: 'center', boxShadow: '8px 8px 0 #000000' }}>
                    <div style={{ display: 'inline-flex', background: 'var(--accent-r)', color: '#fff', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', border: '2px solid #000' }}>
                        <CheckCircle size={36} />
                    </div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>You're on the list!</h2>
                    <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                        Welcome to Future Tech Academy (FTA). We have reserved your spot in the learning pipeline. We will notify you once admission begins for the upcoming cohort.
                    </p>
                    
                    {/* Neo-brutalist Ticket Stub */}
                    <div style={{ border: '3px dashed #000', padding: '2rem 1.5rem', position: 'relative', background: '#fafafa', marginBottom: '2.5rem', textAlign: 'left' }}>
                        <div style={{ position: 'absolute', top: '-15px', left: '-15px', width: '30px', height: '30px', background: '#fff', borderRadius: '50%', border: '3px solid #000' }}></div>
                        <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '30px', height: '30px', background: '#fff', borderRadius: '50%', border: '3px solid #000' }}></div>
                        <div style={{ position: 'absolute', bottom: '-15px', left: '-15px', width: '30px', height: '30px', background: '#fff', borderRadius: '50%', border: '3px solid #000' }}></div>
                        <div style={{ position: 'absolute', bottom: '-15px', right: '-15px', width: '30px', height: '30px', background: '#fff', borderRadius: '50%', border: '3px solid #000' }}></div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #000', paddingBottom: '1rem', marginBottom: '1rem' }}>
                            <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase' }}>Future Tech Academy (FTA)</span>
                            <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.1rem', color: 'var(--accent-r)' }}>{assignedTicketId}</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                            <div>
                                <span style={{ display: 'block', color: '#666', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 'bold' }}>ADMITTEE</span>
                                <strong style={{ fontSize: '1rem' }}>{formData.name}</strong>
                            </div>
                            <div>
                                <span style={{ display: 'block', color: '#666', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 'bold' }}>TRACK</span>
                                <strong style={{ fontSize: '1rem' }}>{formData.track}</strong>
                            </div>
                            <div>
                                <span style={{ display: 'block', color: '#666', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 'bold' }}>WHATSAPP</span>
                                <strong style={{ fontSize: '1rem' }}>{formData.whatsapp}</strong>
                            </div>
                            <div>
                                <span style={{ display: 'block', color: '#666', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 'bold' }}>LEVEL</span>
                                <strong style={{ fontSize: '1rem' }}>{formData.level}</strong>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto 5rem auto', padding: '0 1.5rem' }}>
            <div style={{ background: '#ffffff', border: '3px solid #000000', padding: '2.5rem 2rem', boxShadow: '8px 8px 0 #000000' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ background: 'var(--accent-r)', color: '#fff', padding: '0.8rem', border: '2px solid #000', borderRadius: '8px' }}>
                        <Terminal size={28} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.6rem', margin: 0, textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif', fontWeight: 900 }}>Future Tech Academy (FTA)</h1>
                        <span style={{ color: 'var(--accent-r)', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>COHORT WAITLIST</span>
                    </div>
                </div>

                <p style={{ color: '#444', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '2rem' }}>
                    Join the waitlist to master high-value programming skills. You will get complete roadmaps, curated industry courses, practical projects, personal mentorship, and direct internship alerts.
                </p>

                {error && (
                    <div style={{ background: '#fef2f2', border: '2px solid #ef4444', color: '#b91c1c', padding: '1rem', marginBottom: '1.5rem', fontWeight: 'bold', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 900, marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem' }}>Full Name</label>
                        <input
                            type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter your name"
                            style={{ width: '100%', padding: '1rem', border: '3px solid #000', outline: 'none', background: '#fff', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontWeight: 900, marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem' }}>Email Address</label>
                        <input
                            type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter your email address"
                            style={{ width: '100%', padding: '1rem', border: '3px solid #000', outline: 'none', background: '#fff', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontWeight: 900, marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem' }}>WhatsApp Number</label>
                        <input
                            type="tel" required value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                            placeholder="e.g. +2348012345678"
                            style={{ width: '100%', padding: '1rem', border: '3px solid #000', outline: 'none', background: '#fff', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontWeight: 900, marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem' }}>Select Learning Track</label>
                        <select
                            value={formData.track} onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                            style={{ width: '100%', padding: '1rem', border: '3px solid #000', outline: 'none', background: '#fff', fontSize: '1rem', fontFamily: 'Outfit, sans-serif', fontWeight: 900 }}
                        >
                            <option value="Frontend Engineering">Frontend Engineering (HTML/CSS/JS/React)</option>
                            <option value="Backend Engineering">Backend Engineering (Node.js/Database/Cloud)</option>
                            <option value="Product Design">Product Design (UI/UX/Figma)</option>
                            <option value="Mobile Development">Mobile Development (Flutter/React Native)</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontWeight: 900, marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem' }}>Experience Level</label>
                        <select
                            value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                            style={{ width: '100%', padding: '1rem', border: '3px solid #000', outline: 'none', background: '#fff', fontSize: '1rem', fontFamily: 'Outfit, sans-serif', fontWeight: 900 }}
                        >
                            <option value="Beginner">Beginner (No prior coding experience)</option>
                            <option value="Intermediate">Intermediate (Understand programming basics)</option>
                        </select>
                    </div>

                    <button
                        type="submit" disabled={loading}
                        style={{
                            background: 'var(--accent-r)',
                            color: '#ffffff',
                            padding: '1.2rem',
                            border: '3px solid #000',
                            boxShadow: '4px 4px 0 #000',
                            fontSize: '1.1rem',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            marginTop: '1rem',
                            transition: 'all 0.15s ease',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'joining waitlist...' : 'join the cohort waitlist'}
                    </button>
                </form>
            </div>
        </div>
    );
};

/* ───────────────────────────────────────────
   FOUNDERS CONNECT CLUB SECTION
   ─────────────────────────────────────────── */
const FoundersSection = () => {
    const [view, setView] = useState('chat');
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Welcome to the Elite Co-Founder Matching Club. 🚀 I’m your AI matchmaker. Before we begin scanning for partners, I need to understand your vision. Are you building a startup, or are you a technical expert looking for your next big challenge?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [extractedData, setExtractedData] = useState({ user_category: null, name: null, tech_stack: null });
    const [smartFeedback, setSmartFeedback] = useState('Initializing search parameters...');
    const [isComplete, setIsComplete] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isFinalizing, setIsFinalizing] = useState(false);
    const [manualEmail, setManualEmail] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectionMatch, setConnectionMatch] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(() => scrollToBottom(), [messages, isTyping]);

    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();
        if (!input.trim() || isTyping) return;
        const userMessage = { role: 'user', content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsTyping(true);
        try {
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiBase = isLocal ? 'http://localhost:3001' : '';
            const res = await fetch(`${apiBase}/api/founders/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages })
            });

            // Extract accurate server error if 500 occurs
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || `Server Error ${res.status}`);
            }

            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.message, is_match: data.match_found }]);
            if (data.extracted_data) setExtractedData(prev => ({ ...prev, ...data.extracted_data }));
            if (data.smart_feedback) setSmartFeedback(data.smart_feedback);
            if (data.is_complete) setIsComplete(true);
        } catch (err) { 
            console.error('Chat Error:', err);
            const errMsg = err.message || 'The AI server is recalibrating. Please try again in 30 seconds.';
            setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ SERVER ERROR: ${errMsg}. This usually happens during deployment updates.` }]);
        } finally { 
            setIsTyping(false); 
        }
    };

    const handleCVUpload = async (file) => {
        if (!file) return;
        setIsTyping(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiBase = isLocal ? 'http://localhost:3001' : '';
            const res = await fetch(`${apiBase}/api/founders/cv-scan`, { method: 'POST', body: formData });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', content: `Scanned ${file.name}. Profile updated.` }]);
            setExtractedData(prev => ({ ...prev, name: data.name, tech_stack: data.tech_stack?.join(', ') }));
        } catch (err) { console.error(err); } finally { setIsTyping(false); }
    };

    const handleConnectManual = async (target) => {
        const confirm = window.confirm(`Connect with ${target.name}?`);
        if (!confirm) return;
        setIsConnecting(true);
        try {
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiBase = isLocal ? 'http://localhost:3001' : '';
            const res = await fetch(`${apiBase}/api/founders/connect`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ senderId: '00000000-0000-0000-0000-000000000000', receiverId: target.id })
            });
            const data = await res.json();
            if (data.success) {
                // Add a small delay for premium feels
                setTimeout(() => {
                    setConnectionMatch(data.contact);
                    setIsConnecting(false);
                }, 1500);
            } else {
                setIsConnecting(false);
                alert('Connection failed. Please try again.');
            }
        } catch (err) { 
            console.error(err); 
            setIsConnecting(false);
        }
    };

    const handleFinalSubmit = async () => {
        // Fallback for missing email from AI extraction
        if (!extractedData.email && !manualEmail) {
            alert('Please provide your contact email to activate your profile.');
            return;
        }

        const finalProfile = {
            ...extractedData,
            email: extractedData.email || manualEmail
        };

        setIsFinalizing(true);
        try {
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiBase = isLocal ? 'http://localhost:3001' : '';
            const res = await fetch(`${apiBase}/api/founders/finalize`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ profile: finalProfile })
            });
            const data = await res.json();
            if (data.success) {
                setSubmitted(true);
                // Auto-switch to directory view after a short delay
                setTimeout(() => {
                    setSubmitted(false);
                    setView('browse');
                }, 4000);
            } else {
                alert(`Finalization failed: ${data.error || 'Unknown error'}. Please try again.`);
            }
        } catch (err) {
            console.error('Final Save Error:', err);
            alert('A network error occurred while saving your profile. Please check your connection and try again.');
        } finally {
            setIsFinalizing(false);
        }
    };

    if (submitted) {
        return (
            <section id="founders" className="founders-section">
                <div className="founders-container" style={{ maxWidth: '600px' }}>
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="success-card">
                        <div style={{ display: 'inline-flex', background: '#E63946', color: '#fff', padding: '1.2rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                            <Rocket size={32} />
                        </div>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem' }}>Welcome to the Club!</h2>
                        <p style={{ color: '#888', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                            Your application is live. Our team will reach out as soon as a compatible co-founder joins the club.
                        </p>
                        <button 
                            onClick={() => { setSubmitted(false); setView('browse'); }} 
                            style={{ width: '100%', padding: '1rem', borderRadius: '15px', background: '#fff', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                        >
                            Explore Local Directory
                        </button>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="founders" className="founders-section">
            <style>{`
                .founders-section {
                    padding: 80px 20px;
                    background: #000;
                    position: relative;
                    overflow: hidden;
                }
                .founders-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 10;
                }
                .founders-header {
                    text-align: center;
                    margin-bottom: 4rem;
                }
                .founders-title {
                    font-size: clamp(2rem, 8vw, 3.5rem);
                    font-weight: 900;
                    text-transform: uppercase;
                    color: #fff;
                    margin-bottom: 1rem;
                }
                .founders-nav {
                    display: inline-flex;
                    background: #111;
                    padding: 0.5rem;
                    border-radius: 20px;
                    border: 1px solid #333;
                    margin-top: 1.5rem;
                }
                .founders-nav-btn {
                    padding: 0.8rem 2rem;
                    border-radius: 15px;
                    font-weight: 700;
                    transition: all 0.3s ease;
                    border: none;
                    cursor: pointer;
                    font-size: 0.95rem;
                }
                .founders-box {
                    max-width: 1000px;
                    margin: 0 auto;
                    background: #0a0a0a;
                    border: 1px solid #222;
                    border-radius: 30px;
                    overflow: hidden;
                    box-shadow: 0 40px 80px rgba(0,0,0,0.6);
                }
                .chat-container {
                    height: 700px;
                    display: flex;
                    flex-direction: column;
                }
                .chat-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .message-bubble {
                    max-width: 80%;
                    padding: 1.2rem 1.6rem;
                    border-radius: 20px;
                    font-size: 1rem;
                    line-height: 1.5;
                }
                .message-user {
                    align-self: flex-end;
                    background: #E63946;
                    color: #fff;
                    border-bottom-right-radius: 4px;
                }
                .message-bot {
                    align-self: flex-start;
                    background: #1a1a1a;
                    color: #fff;
                    border: 1px solid #333;
                    border-bottom-left-radius: 4px;
                }
                .chat-input-area {
                    padding: 1.5rem 2rem;
                    border-top: 1px solid #222;
                    background: #0f0f0f;
                }

                @media (max-width: 768px) {
                    .founders-section { padding: 40px 0 !important; }
                    .founders-container { padding: 0 !important; width: 100% !important; }
                    .founders-header { margin-bottom: 2rem; padding: 0 15px; }
                    .founders-box { 
                        border-radius: 0 !important; 
                        width: 100% !important; 
                        max-width: 100% !important;
                        border-left: none !important;
                        border-right: none !important;
                    }
                    .chat-container { height: 85vh !important; }
                    .chat-messages { padding: 1rem; }
                    .message-bubble { 
                        max-width: 88% !important; 
                        font-size: 0.95rem; 
                        padding: 0.8rem 1rem;
                        word-break: break-word;
                    }
                    .chat-input-area { 
                        padding: 1rem !important; 
                        position: sticky;
                        bottom: 0;
                    }
                    .founders-nav-btn { padding: 0.6rem 1rem; font-size: 0.8rem; }
                    .founders-card { padding: 1rem !important; margin: 0 10px; }
                    .founders-grid { grid-template-columns: 1fr !important; gap: 1rem !important; padding: 0 10px; }
                }

                .founders-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    padding: 1.5rem;
                    transition: all 0.3s ease;
                }
                .founders-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1.5rem;
                }
                .success-card {
                    background: #111;
                    border: 2px solid #E63946;
                    border-radius: 30px;
                    padding: 4rem 2rem;
                    text-align: center;
                }
                @media (max-width: 768px) {
                    .success-card { padding: 3rem 1.5rem; border-radius: 20px; }
                }
            `}</style>
            
            <canvas id="founders-bg" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.1, pointerEvents: 'none' }}></canvas>
            
            <AnimatePresence>
                {isConnecting && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(15px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '20px' }}
                    >
                        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity }} style={{ color: '#E63946', marginBottom: '2rem' }}>
                            <Shield size={60} />
                        </motion.div>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 900, color: '#fff', textAlign: 'center' }}>SEALING CONNECTION...</h2>
                        <p style={{ color: '#888', marginTop: '1rem', letterSpacing: '2px', fontSize: '0.8rem' }}>VERIFYING MATCH INTEGRITY</p>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="founders-container">
                <div className="founders-header">
                    <h2 className="founders-title">Co-Founder <span style={{ color: '#E63946' }}>Matchmaker</span></h2>
                    <div className="founders-nav">
                        <button onClick={() => setView('chat')} className="founders-nav-btn" style={{ background: view === 'chat' ? '#E63946' : 'transparent', color: '#fff' }}>AI Onboarding</button>
                        <button onClick={() => setView('browse')} className="founders-nav-btn" style={{ background: view === 'browse' ? '#E63946' : 'transparent', color: '#fff' }}>Browse Directory</button>
                    </div>
                </div>

                <div className="founders-box">
                    {view === 'chat' ? (
                        <div className="chat-container">
                            <div className="chat-header" style={{ padding: '1.2rem 2rem', borderBottom: '1px solid #222', background: '#0f0f0f', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00FF00', boxShadow: '0 0 10px #00FF00' }}></div>
                                    <span style={{ fontWeight: 'bold', letterSpacing: '1px', fontSize: '0.8rem', color: '#fff' }}>AI MATCHMAKER LIVE</span>
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#666', fontStyle: 'italic' }}>{smartFeedback}</div>
                            </div>

                            <div className="chat-messages">
                                {messages.map((m, i) => (
                                    <div key={i} className={m.role === 'user' ? 'message-user message-bubble' : 'message-bot message-bubble'} style={{ whiteSpace: 'pre-wrap' }}>
                                        {m.is_match && <div style={{ padding: '0.3rem 0.6rem', background: '#E63946', borderRadius: '5px', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '0.8rem', display: 'inline-block' }}>MATCH IDENTIFIED</div>}
                                        {m.content}
                                    </div>
                                ))}
                                {isTyping && <div style={{ alignSelf: 'flex-start', color: '#E63946', fontSize: '0.85rem', fontStyle: 'italic', paddingLeft: '1rem' }}>AI Matchmaker is analyzing...</div>}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="chat-input-area">
                                {isComplete ? (
                                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                                        <p style={{ color: '#00FF00', fontWeight: 'bold', marginBottom: '1.5rem', fontSize: '0.9rem' }}>⚡ PROFILE ANALYSIS COMPLETE</p>
                                        {!extractedData.email && (
                                            <div style={{ marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto' }}>
                                                <input 
                                                    type="email" value={manualEmail} onChange={(e) => setManualEmail(e.target.value)}
                                                    placeholder="Enter your email to finalize..."
                                                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: '#1a1a1a', border: '1px solid #444', color: '#fff', outline: 'none', textAlign: 'center' }}
                                                />
                                            </div>
                                        )}
                                        <button 
                                            onClick={handleFinalSubmit} disabled={isFinalizing}
                                            style={{ width: '100%', maxWidth: '400px', padding: '1.2rem', borderRadius: '15px', background: isFinalizing ? '#444' : '#E63946', color: '#fff', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                                        >
                                            {isFinalizing ? 'ACTIVATING PROFILE...' : 'FINALIZE MEMBERSHIP'}
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                                        <label style={{ cursor: 'pointer', color: '#E63946', padding: '0.5rem' }}>
                                            <Paperclip size={22} />
                                            <input type="file" hidden onChange={(e) => handleCVUpload(e.target.files[0])} />
                                        </label>
                                        <input 
                                            type="text" value={input} onChange={(e) => setInput(e.target.value)}
                                            placeholder="Message the matchmaker..."
                                            style={{ flex: 1, background: '#1a1a1a', border: '1px solid #333', borderRadius: '15px', padding: '1.1rem 1.5rem', color: '#fff', outline: 'none', fontSize: '1rem' }}
                                        />
                                        <button type="submit" style={{ width: '55px', height: '55px', minWidth: '55px', borderRadius: '50%', background: '#E63946', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Send size={24} />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    ) : (
                        <PendingFounders onConnect={handleConnectManual} />
                    )}
                </div>
            </div>

            <AnimatePresence>
                {connectionMatch && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.9)' }}>
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ maxWidth: '500px', width: '90%', background: '#111', border: '2px solid #E63946', borderRadius: '30px', padding: '3rem', textAlign: 'center' }}
                        >
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff' }}>🔥 Connection Sealed!</h2>
                            <p style={{ color: '#aaa', marginBottom: '2.5rem', fontSize: '1.1rem' }}>You are now matched with {connectionMatch.name}.</p>
                            <div style={{ background: '#222', padding: '1.2rem', borderRadius: '15px', marginBottom: '1rem', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>{connectionMatch.whatsapp_number}</div>
                            <div style={{ background: '#222', padding: '1.2rem', borderRadius: '15px', marginBottom: '2.5rem', color: '#fff', fontSize: '1.1rem' }}>{connectionMatch.email}</div>
                            <button onClick={() => setConnectionMatch(null)} style={{ padding: '1rem 3rem', borderRadius: '15px', background: '#E63946', color: '#fff', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Close Window</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
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
   VERIFICATION PORTAL (STAFF CHECK-IN)
   ─────────────────────────────────────────── */
const VerificationPortal = ({ onBack }) => {
    const [attendees, setAttendees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // 'all', 'checked-in', 'absent'
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, checkedIn: 0, absent: 0 });

    useEffect(() => {
        fetchAttendees();
    }, []);

    const fetchAttendees = async () => {
        setLoading(true);
        try {
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiBase = isLocal ? 'http://localhost:3001' : '';
            const res = await fetch(`${apiBase}/api/attendees`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setAttendees(data);
                calculateStats(data);
            }
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (data) => {
        const total = data.length;
        const checkedIn = data.filter(a => a.checked_in).length;
        setStats({ total, checkedIn, absent: total - checkedIn });
    };

    const handleToggleCheckIn = async (attendee) => {
        const newStatus = !attendee.checked_in;
        // Optimistic update
        const originalAttendees = [...attendees];
        setAttendees(prev => prev.map(a => a.ticket_id === attendee.ticket_id ? { ...a, checked_in: newStatus } : a));
        
        try {
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiBase = isLocal ? 'http://localhost:3001' : '';
            const res = await fetch(`${apiBase}/api/toggle-check-in`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ticket_id: attendee.ticket_id, checked_in: newStatus })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Failed to update');
            }

            const updated = await res.json();
            
            // Final update and re-calc stats
            setAttendees(prev => prev.map(a => a.ticket_id === attendee.ticket_id ? { ...a, checked_in: updated.checked_in, checked_in_at: updated.checked_in_at } : a));
            setStats(prev => {
                const newCheckedIn = prev.checkedIn + (newStatus ? 1 : -1);
                return { ...prev, checkedIn: newCheckedIn, absent: prev.total - newCheckedIn };
            });
        } catch (err) {
            setAttendees(originalAttendees);
            alert(`Error updating check-in status: ${err.message}. \n\nIMPORTANT: Make sure you have added the 'checked_in' column to the database.`);
        }
    };

    const filtered = attendees.filter(a => {
        const term = searchTerm.toLowerCase();
        const matchesSearch = (a.name || '').toLowerCase().includes(term) || 
                              (a.email || '').toLowerCase().includes(term) || 
                              (a.ticket_id || '').toLowerCase().includes(term);
        
        if (filter === 'checked-in') return matchesSearch && a.checked_in;
        if (filter === 'absent') return matchesSearch && !a.checked_in;
        return matchesSearch;
    });

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '4rem 2rem' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--accent-r)', marginBottom: '0.5rem' }}>
                            <CheckCircle size={24} />
                            <span style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Staff Verification Portal</span>
                        </div>
                        <h1 className="section-h2" style={{ margin: 0, textAlign: 'left' }}>Attendee Check-In</h1>
                    </div>
                    <button onClick={onBack} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <X size={18} /> Exit Portal
                    </button>
                </div>

                {/* STATS */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    {[
                        { label: 'Total Registered', val: stats.total, icon: <Users size={20} />, color: '#000' },
                        { label: 'Checked In', val: stats.checkedIn, icon: <CheckCircle size={20} />, color: '#16a34a' },
                        { label: 'Absent', val: stats.absent, icon: <X size={20} />, color: '#dc2626' }
                    ].map((s, i) => (
                        <div key={i} style={{ background: '#fff', border: '3px solid #000', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: '4px 4px 0 #000' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#64748b', marginBottom: '0.8rem', fontWeight: 900, fontSize: '0.7rem', textTransform: 'uppercase' }}>
                                {s.icon} {s.label}
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 950, color: s.color }}>{s.val}</div>
                        </div>
                    ))}
                </div>

                {/* SEARCH & FILTERS */}
                <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '2rem', padding: '2rem', boxShadow: '12px 12px 0 #000', marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Search by name, email or ticket ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ margin: 0 }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {['all', 'checked-in', 'absent'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    style={{
                                        padding: '0.8rem 1.2rem',
                                        borderRadius: '1rem',
                                        border: '2px solid #000',
                                        textTransform: 'uppercase',
                                        fontWeight: 900,
                                        fontSize: '0.7rem',
                                        background: filter === f ? '#000' : '#fff',
                                        color: filter === f ? '#fff' : '#000',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {f.replace('-', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem' }}>
                            <div style={{ animation: 'spin 1.2s linear infinite', display: 'inline-block', marginBottom: '1rem' }}><Rocket size={32} /></div>
                            <p style={{ fontWeight: 800 }}>Loading Attendee Database...</p>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '3px solid #000', textAlign: 'left' }}>
                                        <th style={{ padding: '1.2rem', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase' }}>Attendee Details</th>
                                        <th style={{ padding: '1.2rem', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase' }}>Ticket ID</th>
                                        <th style={{ padding: '1.2rem', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase' }}>Type</th>
                                        <th style={{ padding: '1.2rem', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase' }}>Check-In Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((a) => (
                                        <tr key={`${a.email}-${a.ticket_id}`} style={{ borderBottom: '1px solid #eee', background: a.checked_in ? '#f0fdf4' : 'transparent' }}>
                                            <td style={{ padding: '1.2rem' }}>
                                                <div style={{ fontWeight: 900, fontSize: '1rem' }}>{a.name}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{a.email}</div>
                                                {a.is_legacy && <span style={{ fontSize: '0.6rem', background: '#e2e8f0', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 900, marginLeft: '0.5rem' }}>LEGACY</span>}
                                            </td>
                                            <td style={{ padding: '1.2rem', fontFamily: 'monospace', fontWeight: 900, color: 'var(--accent-r)' }}>
                                                {a.ticket_id}
                                            </td>
                                            <td style={{ padding: '1.2rem' }}>
                                                <span style={{ fontSize: '0.65rem', fontWeight: 950, background: a.ticket_type === 'Pro' ? '#000' : '#f8fafc', color: a.ticket_type === 'Pro' ? '#fff' : '#000', padding: '0.3rem 0.6rem', border: '2px solid #000', borderRadius: '0.6rem' }}>
                                                    {a.ticket_type}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1.2rem' }}>
                                                <button
                                                    onClick={() => handleToggleCheckIn(a)}
                                                    style={{
                                                        background: a.checked_in ? '#16a34a' : '#fff',
                                                        color: a.checked_in ? '#fff' : '#000',
                                                        border: '2px solid #000',
                                                        padding: '0.6rem 1rem',
                                                        borderRadius: '0.8rem',
                                                        fontWeight: 900,
                                                        fontSize: '0.75rem',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        boxShadow: a.checked_in ? 'none' : '3px 3px 0 #000',
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    {a.checked_in ? <><CheckCircle size={14} /> Checked-In</> : 'Verify & Check-In'}
                                                </button>
                                                {a.checked_in_at && (
                                                    <div style={{ fontSize: '0.6rem', color: '#16a34a', marginTop: '0.4rem', fontWeight: 700 }}>
                                                        at {new Date(a.checked_in_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {filtered.length === 0 && (
                                        <tr>
                                            <td colSpan="4" style={{ padding: '4rem', textAlign: 'center', color: '#64748b', fontWeight: 700 }}>
                                                No attendees found matching your criteria.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ───────────────────────────────────────────
   APP ROOT
   ─────────────────────────────────────────── */
export default function App() {
    const [view, setView] = useState('site'); // 'site', 'admin-login', 'admin', 'founders'
    const [showOnboardingPopup, setShowOnboardingPopup] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
    const [selectedTicketType, setSelectedTicketType] = useState('Standard');
    const [isProDisclaimerOpen, setIsProDisclaimerOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Dynamic CMS State
    const [dynamicSpeakers, setDynamicSpeakers] = useState([]);
    const [dynamicPartners, setDynamicPartners] = useState([]);
    const [dynamicTeam, setDynamicTeam] = useState([]);
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
    const [speakersMode, setSpeakersMode] = useState('live'); // 'live' or 'coming_soon'
    const [comingSoonText, setComingSoonText] = useState('Exciting lineup coming soon! Stay tuned.');
    const [isEventTagsOpen, setIsEventTagsOpen] = useState(true);
    const [portalDates, setPortalDates] = useState(() => {
        try { return JSON.parse(localStorage.getItem('fta-portal-dates') || '{}'); } catch { return {}; }
    });

    useEffect(() => {
        fetchCMSData();
        const path = window.location.pathname;
        if (path === '/techwaitlist' || path === '/techwaitlist/' || path === '/waitlist' || path === '/waitlist/') {
            setView('techwaitlist');
            setShowOnboardingPopup(false);
        } else if (path === '/academy' || path === '/academy/') {
            setView('academy');
            setShowOnboardingPopup(false);
        } else if (path === '/test' || path === '/test/') {
            setView('test');
            setShowOnboardingPopup(false);
        } else if (path === '/pay' || path === '/pay/') {
            setView('pay');
            setShowOnboardingPopup(false);
        } else {
            setView('site');
            setShowOnboardingPopup(true);
        }
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
                // Enforce registration closed since the conference is finished
                setIsRegistrationOpen(false);

                const modeSetting = settings.find(s => s.key === 'speakers_mode');
                if (modeSetting) setSpeakersMode(modeSetting.value);

                const textSetting = settings.find(s => s.key === 'speakers_coming_soon_text');
                if (textSetting) setComingSoonText(textSetting.value);

                const etSetting = settings.find(s => s.key === 'event_tags_open');
                if (etSetting) setIsEventTagsOpen(etSetting.value === 'true');

                const portalSetting = settings.find(s => s.key === 'portal_dates');
                if (portalSetting && portalSetting.value) {
                    try {
                        const parsed = JSON.parse(portalSetting.value);
                        setPortalDates(parsed);
                        localStorage.setItem('fta-portal-dates', portalSetting.value);
                    } catch {}
                }
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
                        // If we stored where we wanted to go, go there, otherwise dashboard
                        setView(localStorage.getItem('admin_redirect') || 'admin');
                        localStorage.removeItem('admin_redirect');
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
                    isEventTagsOpen={isEventTagsOpen}
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

            {view === 'event-tags' ? (
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
                    <EventTagsSection isOpen={isEventTagsOpen} />
                </div>
            ) : view === 'pitch' ? (
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
                    <PitchSection />
                </div>
            ) : view === 'founders' ? (
                <div style={{ paddingTop: '5rem' }}>
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
                    <FoundersSection />
                </div>
            ) : view === 'techwaitlist' ? (
                <div style={{ paddingTop: '8rem' }}>
                    <div className="container" style={{ marginBottom: '2rem' }}>
                        <button
                            onClick={() => {
                                setView('site');
                                window.history.pushState({}, '', '/');
                            }}
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
                    <TechWaitlistSection />
                </div>
            ) : view === 'academy' ? (
                <div style={{ paddingTop: '8rem' }}>
                    <div className="container" style={{ marginBottom: '2rem' }}>
                        <button
                            onClick={() => {
                                setView('site');
                                window.history.pushState({}, '', '/');
                            }}
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
                    <AcademyDashboard portalDates={portalDates} />
                </div>
            ) : view === 'test' ? (
                <div style={{ paddingTop: '8rem' }}>
                    <div className="container" style={{ marginBottom: '2rem' }}>
                        <button
                            onClick={() => {
                                setView('site');
                                window.history.pushState({}, '', '/');
                            }}
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
                    <ScreeningTest />
                </div>
            ) : view === 'pay' ? (
                <div style={{ paddingTop: '8rem' }}>
                    <div className="container" style={{ marginBottom: '2rem' }}>
                        <button
                            onClick={() => {
                                setView('site');
                                window.history.pushState({}, '', '/');
                            }}
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
                    <PayCheckout />
                </div>
            ) : view === 'verify' ? (
                <VerificationPortal onBack={() => setView('site')} />
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
            <Footer onAdmin={(targetView) => { 
                localStorage.setItem('admin_redirect', targetView); 
                setView('admin-login'); 
            }} />


            <RegisterModal
                isOpen={isRegModalOpen}
                onClose={() => setIsRegModalOpen(false)}
                initialType={selectedTicketType}
                isRegistrationOpen={isRegistrationOpen}
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


            {showOnboardingPopup && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0, 0, 0, 0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10000,
                    padding: '1.5rem',
                    boxSizing: 'border-box'
                }}>
                    <div style={{
                        background: '#161b22',
                        border: '4px solid #000000',
                        boxShadow: '10px 10px 0 var(--accent-r)',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        maxWidth: '500px',
                        borderRadius: '0.8rem',
                        padding: '2.5rem',
                        boxSizing: 'border-box',
                        textAlign: 'center',
                        fontFamily: "'Outfit', sans-serif"
                    }}>
                        <div style={{ fontSize: '3.3rem', marginBottom: '1rem' }}>🚀</div>
                        <h2 style={{ fontFamily: 'Outfit', fontWeight: 950, fontSize: '1.8rem', color: '#ffffff', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Welcome to OOU Future Tech
                        </h2>
                        <p style={{ color: '#8b949e', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 2rem 0', lineHeight: '1.5' }}>
                            Please choose how you would like to proceed:
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <button
                                onClick={() => {
                                    setShowOnboardingPopup(false);
                                    window.history.pushState({}, '', '/waitlist');
                                    setView('techwaitlist');
                                }}
                                style={{
                                    background: 'var(--accent-r)',
                                    color: '#ffffff',
                                    border: '3px solid #000000',
                                    padding: '1.1rem 1.5rem',
                                    borderRadius: '0.6rem',
                                    fontFamily: 'Outfit',
                                    fontWeight: 900,
                                    fontSize: '0.98rem',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    boxShadow: '4px 4px 0 #000000',
                                    transition: 'all 0.1s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-1px,-1px)'; e.currentTarget.style.boxShadow = '5px 5px 0 #000000'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '4px 4px 0 #000000'; }}
                            >
                                🎓 Enter Academy Waitlist
                            </button>

                            <button
                                onClick={() => {
                                    setShowOnboardingPopup(false);
                                }}
                                style={{
                                    background: '#ffffff',
                                    color: '#000000',
                                    border: '3px solid #000000',
                                    padding: '1.1rem 1.5rem',
                                    borderRadius: '0.6rem',
                                    fontFamily: 'Outfit',
                                    fontWeight: 900,
                                    fontSize: '0.98rem',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    boxShadow: '4px 4px 0 #000000',
                                    transition: 'all 0.1s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-1px,-1px)'; e.currentTarget.style.boxShadow = '5px 5px 0 #000000'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '4px 4px 0 #000000'; }}
                            >
                                🌐 Enter Conference Website
                            </button>
                        </div>
                    </div>
                </div>
            )}        </>
    );
}
