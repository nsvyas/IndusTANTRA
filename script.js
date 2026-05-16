// ── NAV SCROLL ──
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ── SMOOTH ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const observerOpts = { rootMargin: '-40% 0px -50% 0px' };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, observerOpts);

sections.forEach(s => sectionObserver.observe(s));

// ── REVEAL ON SCROLL ──
const revealEls = document.querySelectorAll(
  '.product-card, .project-item, .project-item-sm, .news-group, .about-layout, .contact-layout, .stat'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ── COUNTER ANIMATION for hero stats ──
function animateCount(el, target, suffix = '') {
  let start = 0;
  const duration = 1200;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = start + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        const text = el.textContent;
        const num = parseInt(text);
        const sup = el.querySelector('sup');
        if (!isNaN(num)) {
          el.textContent = '0';
          if (sup) el.appendChild(sup);
          setTimeout(() => {
            let cur = 0;
            const inc = Math.max(1, Math.ceil(num / 60));
            const t = setInterval(() => {
              cur += inc;
              if (cur >= num) { cur = num; clearInterval(t); }
              el.textContent = cur;
              if (sup) el.appendChild(sup);
            }, 20);
          }, 600);
        }
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ── PRODUCT DETAIL DATA ──
const PRODUCTS = {
  maintellix: {
    img: "img_maintellix.jpg",
    name: "MaintelliGenX",
    tag: "Flagship · Integrated Digital Twin Platform",
    desc: "Unified orchestration layer integrating RotorTwinX, AeroEngineTwinX, PowerPlantTwin, RailTwin, and the Process Scheduling module into a single physics-informed, data-driven operations intelligence platform. One landing screen. Every asset. Every domain.",
    desc2: "Session state is namespaced per module; a unified DOCX/PDF report engine serves all domains. Validated on NASA C-MAPSS (709 engines, 159,359 cycles) for the aerospace twin and on MCF Raebareli shopfloor data for the process modules.",
    features: ["Domain-selector landing: choose asset class, load full twin module","Shared Health Index engine — physics-grounded, monotonically decreasing","Unified DOCX/PDF automated report generation","Streamlit · PyTorch · SimPy · Cloud VPS architecture","NASA C-MAPSS & MCF Raebareli validated"],
    stats: [{num:"4+", label:"Sub-twin domains"},{num:"C-MAPSS", label:"NASA validated"},{num:"Streamlit", label:"Deployment stack"}],
    badges: ["Physics-informed · Data-driven · Cloud-ready","Unified report engine: DOCX + PDF","Session-namespaced multi-domain architecture"]
  },
  rotortwin: {
    img: "img_rotortwin.jpg",
    name: "RotorTwinX",
    tag: "Rotating Machinery Diagnostics · VibLab IIT Kanpur",
    desc: "Digital twin for rotor-bearing fault classification. Raw vibration signals are processed via STFT into time-frequency spectrograms, fed to the VibLab IIT Kanpur CNN v2, and visualised with t-SNE clustering. Detects Healthy, Unbalance, Crack, BPFO, and BPFI conditions.",
    desc2: "Achieves 93–100% accuracy on a 5-class rotor dataset. Multi-architecture support: VibLab CNN v2, ResNetMini, CNN1D-LSTM. Health Index extracted from feature-layer activations and tracked over operational time. Automated DOCX/PDF diagnostic report.",
    features: ["STFT spectrogram pipeline (raw signal → image → CNN)","VibLab IITK CNN v2 · ResNetMini · CNN1D-LSTM","t-SNE dimensionality reduction visualisation","BPFO / BPFI bearing fault frequency tracking","93–100% accuracy on 5-class dataset","Automated DOCX/PDF diagnostic report"],
    stats: [{num:"93–100%", label:"Fault detection accuracy"},{num:"5-class", label:"Rotor fault dataset"},{num:"CNN v2", label:"VibLab IITK architecture"}],
    badges: ["HC · UB · CR · BPFO · BPFI fault classes","STFT spectrogram pipeline","t-SNE cluster visualisation"]
  },
  aerotwin: {
    img: "img_aerotwin.jpg",
    name: "AeroEngineTwinX",
    tag: "Turbofan Engine Prognostics · NASA C-MAPSS",
    desc: "Physics-informed digital twin for gas turbine engine health management. Thermodynamic cycle reconstruction from partial sensor data yields a component-resolved Health Index — Fan, HPC, HPT, LPT — without requiring run-to-failure labels.",
    desc2: "Validated across all four NASA C-MAPSS sub-datasets: 87% component diagnosis accuracy on single-fault configurations, strong HI–RUL correlation. Fleet-wide monitoring dashboard with per-engine deep-dive, T-s / P-v diagrams, and automated report generation.",
    features: ["4-step physics-informed HI pipeline — no RUL labels needed","T-s and P-v thermodynamic cycle reconstruction","87% component diagnosis accuracy (C-MAPSS single-fault)","Fleet monitoring: triage · tracking · automated reports","Stratified confidence levels per component","8-tab interactive dashboard"],
    stats: [{num:"87%", label:"Component diagnosis accuracy"},{num:"709", label:"Engines validated (C-MAPSS)"},{num:"159,359", label:"Operational cycles"}],
    badges: ["Fan · HPC · HPT · LPT component resolution","No run-to-failure labels required","8-tab MRO-ready dashboard"]
  },
  powerplant: {
    img: "img_powerplant.jpg",
    name: "PowerPlantTwin",
    tag: "Power Generation Asset Monitoring",
    desc: "Condition monitoring digital twin for power generation assets — turbines, generators, auxiliary machinery. Translates legacy LabVIEW PoP Monitor acquisitions into a Python-based analytics pipeline with FFT spectral analysis and Health Index tracking.",
    desc2: "Shares the vibration processing engine with RotorTwinX, with domain-specific presets for shaft speeds and bearing frequencies. Harmonic identification (1×, 2× and fault lines), anomaly detection, and HI trending over operational life.",
    features: ["LabVIEW PoP Monitor → Python migration pathway","FFT spectral analysis · harmonic identification","1× 2× shaft-speed and fault-frequency tracking","Health Index trending over operational life","Shared RotorTwinX vibration engine","Anomaly detection with configurable thresholds"],
    stats: [{num:"FFT", label:"Spectral analysis engine"},{num:"LabVIEW", label:"Legacy migration source"},{num:"HI", label:"Health Index tracking"}],
    badges: ["1× · 2× harmonic identification","Fault-frequency bearing diagnostics","Shared RotorTwinX vibration engine"]
  },
  rtmon: {
    img: "img_rtmon.jpg",
    name: "Real-Time Monitoring",
    tag: "DAQ · Dashboard · HMI · Shopfloor",
    desc: "Shopfloor data acquisition from heterogeneous machines — CNC, welding robots, manual work centres — homogenised and visualised in a live web dashboard. Deployed and validated at MCF Raebareli, India's most modern coach factory.",
    desc2: "RFID-based material and WIP tracking integrated with an Android HMI for operator-machine geo-location. Cloud VPS relay enables remote access by plant managers anywhere. Historical storage supports utilisation analytics, OEE, and cycle time trending.",
    features: ["Multi-machine DAQ homogenisation (CNC, robot, manual)","RFID WIP tracking · Android HMI geo-location","Live web dashboard with configurable views","Utilisation · cycle time · OEE analytics","Cloud VPS relay for remote monitoring","Historical data storage and retrieval"],
    stats: [{num:"MCF", label:"Raebareli deployment"},{num:"RFID", label:"Material tracking"},{num:"VPS", label:"Cloud relay"}],
    badges: ["CNC · Robot · Manual machine DAQ","Android HMI geo-location","Live OEE and utilisation analytics"]
  },
  sched: {
    img: "img_sched.jpg",
    name: "Process Scheduling",
    tag: "Shopfloor Digital Twin · SimPy Discrete-Event",
    desc: "Discrete-event simulation of the production shopfloor — each machine and component modelled as a Python/SimPy object. Automated schedule generation, scenario analysis, and bottleneck identification under any order mix and priority.",
    desc2: "Deployed at MCF Raebareli Shell Shop. Priority-based dispatching reduced lead time for highest-priority coach variants by up to 10 days vs random dispatching. Bottleneck analysis identified primary constraint stations at ~86–88% utilisation.",
    features: ["SimPy discrete-event simulation at 1-minute resolution","Each machine and component modelled as Python objects","Priority-based job dispatching rules","Gantt chart + machine loading chart generation","Bottleneck identification (utilisation analytics)","ERP integration flexibility"],
    stats: [{num:"10 days", label:"Lead time reduction (MCF)"},{num:"1 min", label:"Simulation resolution"},{num:"86–88%", label:"Bottleneck utilisation"}],
    badges: ["SimPy discrete-event engine","Priority-based job dispatching","Gantt + machine loading charts"]
  },
  smartcity: {
    img: "img_smartcity.jpg",
    name: "Smart City Digital Twin",
    tag: "Urban Systems · Traffic · IoT · Event Management",
    desc: "City-scale digital twin for traffic, mobility, and urban infrastructure management. Built on OSMnx for geospatial road network extraction, with synthetic congestion modelling and animated visualisation. Designed for event scenario planning and command-centre dashboards.",
    desc2: "Congestion zones are dynamically colour-coded (green → red) across the road network in sequential time steps. Framework is IoT-ready: once ANPR cameras, GPS buses, or sensor feeds are available, live data replaces the synthetic model — same codebase, different source. Scalable to sanitation logistics, emergency response, and public transport optimisation.",
    features: ["OSMnx road network extraction from OpenStreetMap","Animated congestion visualisation (green → red)","Event scenario modelling with zone multipliers","Streamlit browser dashboard — no proprietary software","IoT / ANPR / GPS integration pathway","CSV export per simulated frame"],
    stats: [{num:"OSMnx", label:"Road network extraction"},{num:"IoT-ready", label:"ANPR/GPS integration path"},{num:"Plotly", label:"Animated visualisation"}],
    badges: ["Colour-coded congestion mapping","Event scenario zone multipliers","Streamlit dashboard — no proprietary tools"]
  },
  scada: {
    img: "img_scada.jpg",
    name: "Hyper-ML for SCADA Systems",
    tag: "Power Infrastructure · Non-Intrusive ML Overlay",
    desc: "A non-intrusive Machine Learning overlay for existing SCADA and DCS systems in power utilities and critical infrastructure. Reads from the supervisory tier via OPC UA and IEC 61850/104 — without touching the control plane — and feeds anomaly alerts, RUL predictions, and digital twin signals upward.",
    desc2: "Six overlapping implementation phases across a 28-week pilot. Value flywheel: richer SCADA data → accurate anomaly detection → precise failure prediction → operational optimisation → ROI → scale-up. Targets power utilities, water treatment, oil & gas, and any IEC 61850-compliant installation.",
    features: ["Non-intrusive overlay — no control-plane modification","OPC UA · IEC 61850/104 · Modbus interface","Anomaly detection · RUL prediction · fault classification","Digital Twin bridging for physics-informed insights","28-week phased pilot programme","Value Flywheel: data → prediction → optimisation → ROI"],
    stats: [{num:"28-week", label:"Pilot programme"},{num:"OPC UA", label:"Primary interface"},{num:"IEC 61850", label:"Protocol standard"}],
    badges: ["Non-intrusive — no control-plane touch","Anomaly detection · RUL prediction","Value flywheel: data → ROI → scale"]
  },
  health: {
    img: "img_health.jpg",
    name: "Comprehensive Community Health",
    tag: "Social Impact · HealthCamp Analytics · Public Health",
    desc: "AI-powered analytics platform for community health camp data. Ingests biomarker-rich Excel datasets, applies 18+ computed risk scores (cardiovascular, liver, kidney, thyroid, metabolic syndrome, lifestyle), and produces individual patient PDFs alongside population-level community reports.",
    desc2: "Patients with incomplete entries are excluded from community analytics while individual reports are still generated. Dashboard visualisations cover risk distributions, locality-level intelligence, and biomarker heatmaps. Physician-defined reference ranges integrated for clinical accuracy.",
    features: ["18+ biomarker computed risk scores","Individual patient PDF + community population report","Locality-level analytics and risk stratification","Physician-defined reference range integration","Incomplete-entry exclusion from community analytics","Streamlit web dashboard · no proprietary software"],
    stats: [{num:"18+", label:"Computed biomarker scores"},{num:"PDF", label:"Individual + population reports"},{num:"Locality", label:"Level risk intelligence"}],
    badges: ["Cardiovascular · Liver · Kidney · Thyroid risk","Physician reference range integration","Incomplete-entry safe exclusion"]
  },
  draide: {
    img: "img_draide.jpg",
    name: "Dr_AIde",
    tag: "Clinical AI · Decision Support · Diagnosis Assistance",
    desc: "AI-powered clinical decision support system designed to assist healthcare providers with symptom analysis, differential diagnosis generation, and triage intelligence. Bridges the gap between patient-reported symptoms and structured clinical decision pathways.",
    desc2: "Built with a professional clinical UI theme. Intended for physicians, community health workers, and rural health centres where specialist access is limited. Complements the Community Health platform with individual-level AI clinical reasoning — applying the same deep-learning rigour developed for industrial systems to human health.",
    features: ["Symptom-to-differential diagnosis pathway","Triage intelligence for community health workers","Professional clinical UI presentation","Integrates with Community Health HealthCamp data","Designed for resource-limited healthcare settings","Social impact application of industrial AI methods"],
    stats: [{num:"AI", label:"Clinical decision support"},{num:"Triage", label:"Intelligence engine"},{num:"Rural", label:"Health focus"}],
    badges: ["Symptom-to-differential diagnosis","Community health worker interface","Social impact application of industrial AI"]
  },
  otit: {
    img: "img_otit.jpg",
    name: "OT–IT Bridge",
    tag: "Operational Technology · Information Technology Integration",
    desc: "Indigenous platform bridging Operational Technology (PLCs, CNCs, embedded systems, RFID, cameras) with Information Technology (enterprise analytics, cloud dashboards, ERP). Secure integration without dependence on proprietary vendor ecosystems.",
    desc2: "Supports Modbus, OPC-UA, MQTT, RS-232/485, and RFID protocols. Designed for the full range of Indian manufacturing environments — from fully automated CNC lines to semi-manual work centres. Secure data ownership is a core design principle.",
    features: ["Industrial controllers · embedded systems · HMI","Modbus · OPC-UA · MQTT · RS-232/485 · RFID","Camera and scanner integration","Secure, indigenous data ownership model","Scalable from single machine to full factory","Foundation layer for all IndusTANTRA platforms"],
    stats: [{num:"5+", label:"Industrial protocols"},{num:"Scalable", label:"Single machine to factory"},{num:"Indigenous", label:"No vendor lock-in"}],
    badges: ["Modbus · OPC-UA · MQTT · RS-232/485","RFID + camera integration","Foundation for all IndusTANTRA platforms"]
  }
};

function openDetail(key) {
  const p = PRODUCTS[key];
  if (!p) return;

  document.getElementById('pov-tag').textContent = p.tag;
  document.getElementById('pov-name').textContent = p.name;

  const descEl = document.getElementById('pov-desc');
  descEl.innerHTML = `<p>${p.desc}</p>${p.desc2 ? '<p>' + p.desc2 + '</p>' : ''}`;

  const featEl = document.getElementById('pov-features');
  featEl.innerHTML = p.features.map(f => `<li>${f}</li>`).join('');

  // Right panel: stat cards / badges
  const right = document.getElementById('pov-right');
  const stats = p.stats || [];
  const badges = p.badges || [];
  const imgHTML = p.img
    ? `<div class="pov-img-wrap"><img src="${p.img}" alt="${p.name}" /></div>`
    : `<div class="pov-img-placeholder"><span>${p.name[0]}</span></div>`;
  right.innerHTML =
    imgHTML +
    stats.map(s => `<div class="pov-stat-card"><span class="stat-num">${s.num}</span><span class="stat-label">${s.label}</span></div>`).join('') +
    badges.map(b => `<div class="pov-badge"><span>›</span>${b}</div>`).join('');

  const ov = document.getElementById('product-overlay');
  ov.classList.remove('pov-hidden');
  ov.classList.add('pov-open');
  ov.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeProduct() {
  const ov = document.getElementById('product-overlay');
  ov.classList.remove('pov-open');
  ov.classList.add('pov-hidden');
  document.body.style.overflow = '';
}
