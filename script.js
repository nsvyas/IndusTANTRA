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
  railtwin: {
    img: "img_railtwin.jpg",
    name: "RailTwin",
    tag: "Rolling Stock · WILD · Railway Digital Twin · IITK × CRIS",
    desc: "Comprehensive digital twin platform for Indian Railways spanning three interconnected capabilities: (1) a WILD-based CNN classification platform for rolling stock condition assessment using strain-gauge signals; (2) a feedforward neural network for real-time rail-wheel contact force and track irregularity estimation from on-board accelerometers; and (3) a cross-functional digital twinning framework for network-level freight congestion analytics developed with CRIS.",
    desc2: "The WILD platform, designed at IIT Kanpur and productised by APNA Technologies, is deployed at nearly 20 locations across Indian Railways. The network-level twin integrates IR-GIS, COA, and FOIS data streams for the Waltair Division pilot, identifying the KRDL-KTV section as a critical congestion bottleneck with 210+ sub-20 km/h events per month. Presented at RAIL 26, Budapest.",
    features: [
      "Wayside Wheel Impact Load Monitoring - WILD",
      "Deployed at 20 IR locations: ResNet-18 CNN classification",
      "On-board Rolling Stock Condition Monitoring Platform",
      "CRIS collaboration: Cross-functional framework: IR-GIS + COA + FOIS data lake",
      "Waltair Division pilot — KRDL-KTV bottleneck identified",
      "Animated GIS map · congestion heat maps · dwell-time analytics"
    ],
    stats: [{num:"20+", label:"IR deployment sites (WILD)"},{num:"R²=0.95", label:"Lateral force accuracy"},{num:"RAIL 26", label:"Budapest 2026 paper"}],
    badges: ["WILD · CNN · ResNet-18 classification","On-board accelerometer force estimation","IR-GIS · COA · FOIS data integration"]
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
    tag: "Turbofan · Gas Turbine · Physics-Informed · NASA C-MAPSS",
    desc: "AeroEngineTwinX is a deployable, physics-informed digital twin platform for turbofan engine health management and Remaining Useful Life prediction. The platform requires no run-to-failure labels — it works directly on operational sensor data. Sensor groupings and sign conventions follow the gas-path thermodynamics: Fan → LPC → HPC → Combustor → HPT → LPT. Validated across all four NASA C-MAPSS sub-datasets — 709 engines, 159,359 operational cycles.",
    desc2: "A unique capability is the per-cycle reconstruction of T-s and P-v Brayton cycle diagrams from partial sensor coverage — the enclosed area in the P-v diagram shrinks measurably as HPC degrades, providing a thermodynamic confirmation of the Health Index. The 8-tab Streamlit dashboard covers engine overview, sensor trends, component HI, gas path map, T-s/P-v diagrams, compressor maps, fleet comparison, and one-click automated DOCX/PDF report generation. Air-gapped deployment — no cloud, no OEM vendor dependency.",
    features: [
      "Four-stage physics pipeline — normalisation · signed deviation · component HI · RUL",
      "Signed sensor deviations set by thermodynamic physics, not data fitting — δ ≥ 0 guaranteed",
      "Separate Health Index per component: Fan · LPC · HPC · Combustor · HPT",
      "100% HI monotonicity — structural guarantee verified across all 709 C-MAPSS engines",
      "Brayton cycle T-s / P-v reconstruction per flight cycle from partial sensor data",
      "8-tab Streamlit dashboard · automated DOCX/PDF reports · air-gapped deployment"
    ],
    stats: [{num:"100%", label:"HI monotonicity guarantee"},{num:"709", label:"Engines validated (C-MAPSS)"},{num:"87%", label:"Component diagnosis accuracy"}],
    badges: ["Fan · LPC · HPC · Combustor · HPT resolved","No run-to-failure labels required","Brayton cycle T-s/P-v reconstruction"]
  },
  aerophm: {
    img: "img_aerophm.jpg",
    name: "AeroPHM-DT",
    tag: "Full-Aircraft IVHM · 9 Subsystems · Physics ODE · Safety-Critical",
    desc: "AeroPHM-DT is a full-aircraft Integrated Vehicle Health Management (IVHM) platform — nine coupled subsystem digital twins, each governed by real physics ODEs with named material constants. Subsystems covered: Fuel, Hydraulic, ILSS/OBOGS (life-critical), ECS, SPS, Undercarriage BMS, Structures (fracture mechanics), Structures (modal vibration), and Fire. Every Health Index value is traceable from sensor → signed deviation → subsystem HI → system HI → maintenance action. Certification-grade explainability: EASA, FAA, and MIL-SPEC demand causal traceability — statistical correlation alone is insufficient.",
    desc2: "The safety-weighted system Health Index assigns weights by consequence of failure, not sensor count — ILSS/OBOGS carries the highest weight (16%) because OBOGS failure has caused Class A mishaps. A 3-tier alert system (Caution / Warning / Critical) drives maintenance decisions. Physics ODE predictions track real sensor data within 4% tolerance across 16 validation figures — hydraulic pressure, ECS bleed, structural strain, and wing accelerometer data. Delivered as complete Python source, 9-tab Streamlit dashboard, 32-equation physics documentation, and automated DOCX/PDF reports. Air-gapped — any laptop, no cloud.",
    features: [
      "Nine coupled subsystem DTs — Fuel · Hydraulic · ILSS/OBOGS · ECS · SPS · U/C BMS · Structures · Vibration · Fire",
      "62 coupled state variables · 32 governing physics ODEs · 13 cross-subsystem couplings",
      "Safety-weighted system HI — weights by consequence of failure, not sensor count",
      "ILSS/OBOGS life-critical monitoring — crew O₂ alert on ECS bleed pressure drop",
      "Structural RUL from Paris–Erdogan fracture mechanics — crack propagation forecast with MSG-3 intervals",
      "3-tier alert system · 9-tab Streamlit dashboard · automated DOCX/PDF · air-gapped deployment"
    ],
    stats: [{num:"9", label:"Coupled subsystem digital twins"},{num:"62", label:"Coupled state variables"},{num:"32", label:"Governing physics ODEs"}],
    badges: ["EASA · FAA · MIL-SPEC traceable","Life-critical ILSS/OBOGS monitoring","Paris Law · Coffin-Manson · Brayton ODE models"]
  },
  coptergb: {
    img: "img_copter.jpg",
    name: "CopterGBTwin",
    tag: "Helicopter · Drivetrain Health · STFT · ML Fault Classifier",
    desc: "CopterGBTwin is a fleet-wide helicopter drivetrain health monitoring platform — covering Main Gearbox (MGB), Intermediate Gearbox (IGB), and Tail Gearbox (TGB). Six dedicated vibration sensors per aircraft, processed through FFT and STFT spectral analysis, feed an ML fault classifier trained on labeled wear signatures. The classifier names the specific component and failure mode — not just 'something changed.' A continuously computed Health Index per aircraft drives a 3-tier fleet dashboard: Critical / Flagged / Healthy.",
    desc2: "Validated on a 4-aircraft fleet (H1–H4) with 3.5 years of continuous sensor logging recorded through to component failure on Aircraft H1. The MGB Output Quill shaft — a swashplate-linked torsional load path — was identified as the degrading component from spectral evidence alone, before failure. The same signatures appeared in H2 (+58% MGB Output Quill RMS, +124% TGB Axial RMS, +30% IGB RMS) years earlier in its service life — demonstrating advance warning capability. Delivered in two phases: Offline batch processing for fleet baselining and root-cause fault library, followed by Online streaming with live dashboard, automated alerts, and predictive maintenance scheduling.",
    features: [
      "Six vibration sensors per aircraft — MGB · IGB · TGB — processed every flight across the full fleet",
      "FFT + STFT spectral analysis — noise floor rise and spectral line broadening detected automatically",
      "ML fault classifier trained on labeled signatures — names the component and failure mode",
      "Archard tribological wear model → gearbox Health Index computed per aircraft per flight",
      "3-tier fleet Health Index dashboard — Critical · Flagged · Healthy — per aircraft",
      "Offline batch (Phase 1) → Online streaming with live alerts and predictive scheduling (Phase 2)"
    ],
    stats: [{num:"3.5 yrs", label:"Fleet logging, H1 to failure"},{num:"4", label:"Aircraft fleet validated"},{num:"+124%", label:"TGB Axial RMS detected in H2"}],
    badges: ["MGB · IGB · TGB component resolution","FFT · STFT · ML classifier pipeline","Offline batch → Online streaming"]
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
