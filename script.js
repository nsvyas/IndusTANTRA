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
  railtwinx: {
    img: "img_railtwin.jpg",
    name: "RailTwinX",
    tag: "Wayside Intelligence · 21-Class Fault · CNN · EN Standards",
    desc: "RailTwinX is a physics-informed wayside intelligence platform that delivers explainable rolling stock and track fault diagnosis from a single trackside sensor array — no onboard instrumentation required. Sixteen wayside channels across five sensor groups (strain, accelerometer, acoustic, context, speed) feed an STFT-based CNN pipeline. Physics-synthetic training generates correct STFT signatures for all 21 fault classes from closed-form models — Hertz contact, Winkler beam, Archard wear, Klingel's hunting formula — without requiring labelled field recordings from the target installation.",
    desc2: "Two complementary Health Indices — Train Health Index (THI) for rolling stock and Track Health Index (TkHI) for track structure — are computed from the same wayside sensors per train passage. Comparing THI against TkHI isolates whether an anomaly originates in the vehicle or the track without any onboard sensor. Four EN-aligned action zones (Normal / Alert / Intervention / Withdrawal) drive maintenance decisions. Grad-CAM attribution maps provide a visual physics explanation per classification — regulators and rail engineers are never handed a black-box verdict. Validated at 96.4% weighted F1 on Indian Railways LHB coach data. Presented as an Invited Lecture at Railways 2026 · STECH 2026, Budapest.",
    features: [
      "16 wayside channels · 5 sensor groups — strain · accelerometer · acoustic · context · speed",
      "21-class fault taxonomy — wheel tread · profile · bogie · bearing · track structural faults",
      "Physics-synthetic CNN training — no labelled field data required at target installation",
      "THI (rolling stock) + TkHI (track) from one sensor array — isolates vehicle vs. track root cause",
      "Grad-CAM explainability — physics-tied attribution per classification, per passage",
      "EN 50126 RAMS · EN 50128 software safety · EN 13231 · EN 15313 encoded in architecture"
    ],
    stats: [{num:"96.4%", label:"Weighted F1"},{num:"21", label:"Fault classes"},{num:"46", label:"Physics equations"}],
    badges: ["THI · TkHI dual health indices","Grad-CAM XAI per passage","EN 50126 · EN 50128 · EN 15313"]
  },
  trackpulse: {
    img: "img_trackpulse.jpg",
    name: "TrackPulse",
    tag: "Wayside · Plug-In Intelligence · Sensor-Agnostic · 25+ Sites",
    desc: "TrackPulse is a pre-built, sensor-agnostic intelligence layer that installs above any existing trackside sensing infrastructure — WILD strain gauges, Distributed Acoustic Sensing (DAS), fibre-optic arrays, rail accelerometers — and immediately delivers full-spectrum rolling stock diagnostics. No changes to hardware, firmware, or sensing infrastructure. ResNet-18 CNN pre-trained and validated on LHB coach fault data, ready for fine-tuning on new rolling stock types within days.",
    desc2: "A scalar Train Health Index (THI) is generated on every train passage and tracked longitudinally per rake — building a continuous degradation record across days, weeks, and months. Grad-CAM attribution maps show exactly which signal regions triggered each diagnostic decision. The alternative — building an equivalent ML pipeline from scratch — requires 2–3 years and USD 500K–1.5M. TrackPulse compresses that to immediate deployment. Validated across 25+ wayside sites. Twelve diagnosable rolling stock fault classes covering wheel, suspension, axle, loading, and bearing conditions.",
    features: [
      "Plug-in above any existing wayside system — WILD · DAS · fibre-optic · accelerometer",
      "No new hardware, no firmware changes — zero disruption to existing infrastructure",
      "12-class rolling stock fault taxonomy — wheel · suspension · axle · loading · bearing",
      "Live Train Health Index (THI) per passage — longitudinal rake tracking over time",
      "Grad-CAM XAI — operator-visible signal attribution per diagnostic decision",
      "25+ wayside sites validated · ResNet-18 backbone · fine-tunable per rolling stock type"
    ],
    stats: [{num:"25+", label:"Wayside sites validated"},{num:"12", label:"Fault classes"},{num:"Day 1", label:"Deployment ready"}],
    badges: ["Sensor-agnostic plug-in layer","WILD · DAS · fibre-optic compatible","Grad-CAM XAI per passage"]
  },
  bogiepulse: {
    img: "img_bogiepulse.jpg",
    name: "BogiePulse",
    tag: "Onboard · OEM · White-Label · Fleet-Agnostic · European Market",
    desc: "BogiePulse is a pre-built, fleet-agnostic, physics-informed onboard Condition-Based Maintenance intelligence engine designed for rolling stock OEMs. It embeds into any vehicle platform and delivers continuous structural health monitoring, six-class fault diagnosis, and a Vehicle Health Index (0–100) from Day One of service. Physics-informed synthetic data generation means a new vehicle type — new bogie geometry, wheel diameter, suspension configuration — is ready for deployment in weeks, not the 12–18 months required by field-data-dependent alternatives.",
    desc2: "A hierarchical 28-channel sensor architecture — axle-box piezo accelerometers at 20 kHz, bogie frame MEMS at 1 kHz, carbody accelerometers at 200 Hz, and brake disc IR pyrometers — covers the full structural dynamic bandwidth. A dual-head CNN simultaneously classifies fault type (CrossEntropy) and regresses continuous severity (MSE). Five selectable architectures from a 52K-parameter edge Lite to a 1.8M BiLSTM. VHI prognosis date is calculable from slope — enabling CBM-scheduled inspection before failure, not emergency withdrawal. White-label configurable per OEM: vehicle type, speed corridor, fault class set, and output to depot server, fleet management cloud, or ERA TAF TSI data streams.",
    features: [
      "Fleet-agnostic — any bogie, any vehicle type, any OEM — white-label configurable",
      "Physics-informed synthetic training — new vehicle type ready in weeks, no field data required",
      "28-channel hierarchical sensor fusion — axle-box 20 kHz → carbody 200 Hz",
      "Dual-head CNN — simultaneous fault classification + continuous severity regression",
      "Vehicle Health Index (0–100) — prognosis date calculable from VHI degradation slope",
      "Five selectable CNN architectures — 52K edge Lite to 1.8M BiLSTM"
    ],
    stats: [{num:"28", label:"Sensor channels"},{num:"VHI 0–100", label:"Vehicle Health Index"},{num:"Weeks", label:"New vehicle type ready"}],
    badges: ["Fleet-agnostic · white-label OEM","Physics-synthetic — zero field data","EN 50126 · ERA TAF TSI"]
  },
  rotortwin: {
    img: "img_rotortwin.jpg",
    name: "Rotor-Bearing-Gearbox Digital Twins",
    tag: "Rotating Machinery · VibLab IIT Kanpur · CNN · STFT",
    desc: "Physics-informed digital twin for rotor-bearing-gearbox fault diagnosis and Health Index tracking. Raw vibration signals from rotating machinery are converted to STFT spectrograms — turning a 1D signal into a 2D time-frequency image — and classified by the VibLab IIT Kanpur CNN v2. Five fault classes resolved: Healthy, Unbalance, Crack, Outer Race (BPFO), and Inner Race (BPFI) bearing defects. Achieves 93–100% classification accuracy on a 5-class rotor dataset.",
    desc2: "t-SNE dimensionality reduction visualises the CNN feature space — confirming class separability and classifier confidence before deployment. Bearing fault frequencies (BPFO, BPFI, BSF) are tracked continuously and cross-referenced against physics-predicted defect frequencies. A monotonically computed Health Index is extracted from feature-layer activations and trended over operational life. Multi-architecture support — VibLab CNN v2, ResNetMini, CNN1D-LSTM — allows selection by inference speed or accuracy requirement. Automated DOCX/PDF diagnostic report generated per analysis run.",
    features: [
      "STFT spectrogram pipeline — raw vibration signal → 2D time-frequency image → CNN",
      "VibLab IITK CNN v2 · ResNetMini · CNN1D-LSTM — five selectable architectures",
      "Five fault classes: Healthy · Unbalance · Crack · BPFO · BPFI",
      "BPFO / BPFI bearing defect frequency tracking against physics predictions",
      "t-SNE feature-space visualisation — class separability confirmed before deployment",
      "Health Index trending over operational life · automated DOCX/PDF diagnostic report"
    ],
    stats: [{num:"93–100%", label:"Fault classification accuracy"},{num:"5-class", label:"Rotor fault dataset"},{num:"CNN v2", label:"VibLab IITK architecture"}],
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
    tag: "Power Generation · Condition Monitoring · FFT · Health Index",
    desc: "Condition monitoring digital twin for power generation assets — turbines, generators, and auxiliary machinery. Translates legacy LabVIEW PoP Monitor data acquisitions into an open-source Python analytics pipeline with FFT spectral analysis, harmonic identification, and Health Index trending. Shares the same validated vibration processing engine as Rotor-Bearing-Gearbox Digital Twins, with domain-specific presets calibrated for power plant shaft speeds and bearing fault frequencies.",
    desc2: "Shaft-speed harmonics (1× and 2×) and bearing fault frequencies (BPFO, BPFI, BSF) are identified and tracked from vibration data. A monotonically computed Health Index trends over operational life — detecting early anomalies before threshold alarms trigger. The migration pathway from LabVIEW to Python eliminates proprietary vendor dependency. Configurable alarm thresholds per machine type. DST-funded origins: joint project with NTPC, BHEL, and CSIO Chandigarh (1996–2001), forming the validated foundation for this platform.",
    features: [
      "LabVIEW PoP Monitor → open-source Python migration — no vendor lock-in",
      "FFT spectral analysis — shaft-speed harmonics 1× · 2× and bearing fault frequencies",
      "BPFO · BPFI · BSF bearing defect frequency identification and tracking",
      "Monotonic Health Index trending — early anomaly detection before threshold alarms",
      "Shared VibLab IITK vibration processing engine with domain-specific power plant presets",
      "DST-funded validation: NTPC · BHEL · CSIO Chandigarh (1996–2001)"
    ],
    stats: [{num:"FFT", label:"Spectral analysis engine"},{num:"1× · 2×", label:"Harmonic tracking"},{num:"HI", label:"Health Index trending"}],
    badges: ["BPFO · BPFI · BSF bearing diagnostics","LabVIEW → Python migration","NTPC · BHEL · DST validated origins"]
  },
  rtmon: {
    img: "img_rtmon.jpg",
    name: "Real-Time Production Monitoring",
    tag: "Shopfloor DAQ · Live Dashboard · RFID · MCF Raebareli",
    desc: "Real-time shopfloor intelligence platform for heterogeneous manufacturing environments — CNC machines, welding robots, and manual work centres. Data from all machine types is homogenised into a unified acquisition layer and visualised on a live web dashboard. Deployed and validated at Modern Coach Factory (MCF) Raebareli, India's most advanced rail coach manufacturing facility, under the Technology Mission for Indian Railways.",
    desc2: "RFID-based material and WIP (Work-in-Progress) tracking is integrated with an Android HMI for operator-machine geo-location — knowing where every component and operator is on the shopfloor at any moment. A cloud VPS relay enables plant managers to monitor production from anywhere. Historical data storage supports utilisation analytics, Overall Equipment Effectiveness (OEE), and cycle time trending. Foundation layer for the Process Scheduling digital twin.",
    features: [
      "Multi-machine DAQ homogenisation — CNC · welding robot · manual work centre",
      "Live web dashboard with configurable machine-status and production views",
      "RFID WIP tracking — component location and status across the shopfloor",
      "Android HMI geo-location — operator-machine assignment in real time",
      "Cloud VPS relay — remote plant monitoring by managers anywhere",
      "OEE · utilisation · cycle time analytics from historical data store"
    ],
    stats: [{num:"MCF", label:"Raebareli deployment"},{num:"RFID", label:"WIP material tracking"},{num:"OEE", label:"Live utilisation analytics"}],
    badges: ["CNC · Robot · Manual machine DAQ","Android HMI geo-location","Live OEE and utilisation analytics"]
  },
  sched: {
    img: "img_sched.jpg",
    name: "Process Scheduling",
    tag: "Shopfloor Digital Twin · SimPy Discrete-Event · MCF Raebareli",
    desc: "Full shopfloor digital twin using discrete-event simulation — every machine, workstation, and component modelled as a Python/SimPy object at 1-minute resolution. Automated schedule generation, bottleneck identification, Gantt chart output, and machine loading charts under any job-order mix and dispatching priority. Deployed and validated at Modern Coach Factory (MCF), Raebareli, under the Technology Mission for Indian Railways.",
    desc2: "Priority-based dispatching reduced lead time for highest-priority coach variants by up to 10 days compared to random dispatching — a directly measurable improvement in delivery performance. Bottleneck analysis identified the Shell Shop as the primary constraint station at 86–88% utilisation, enabling targeted investment decisions. Scenario analysis allows planners to test any order mix or dispatching rule before committing to a schedule. ERP integration pathway built in.",
    features: [
      "Full shopfloor DES — every machine and workstation as a Python/SimPy object",
      "1-minute simulation resolution — captures real production dynamics",
      "Priority-based · FIFO · SPT · custom dispatching rules — scenario comparison",
      "Gantt chart + machine loading chart auto-generated per schedule run",
      "Bottleneck identification — utilisation analytics per station",
      "ERP integration pathway · deployed at MCF Raebareli Shell Shop"
    ],
    stats: [{num:"10 days", label:"Lead time reduction (MCF)"},{num:"1 min", label:"Simulation resolution"},{num:"86–88%", label:"Bottleneck utilisation identified"}],
    badges: ["SimPy discrete-event engine","Priority-based job dispatching","Gantt + machine loading charts"]
  },
  smartcity: {
    img: "img_smartcity.jpg",
    name: "Smart City Digital Twin",
    tag: "Urban Systems · Traffic · Event Management · IoT-Ready",
    desc: "City-scale digital twin for traffic, mobility, and urban infrastructure management — built for the challenge of large-scale public events where footfalls in millions stress every system simultaneously. OSMnx extracts the full road network from OpenStreetMap. Zone-specific congestion multipliers model the impact of religious gatherings, political rallies, and sporting events. Animated Plotly visualisation shows congestion evolving across the road network in sequential time steps — green to red — enabling anticipatory management before gridlock occurs.",
    desc2: "The platform is IoT-ready by design: once ANPR cameras, GPS buses, or sensor feeds are connected, live data replaces the synthetic model with the same codebase and dashboard — no rebuild required. Streamlit browser-based dashboard requires no proprietary GIS software. Scalable beyond traffic to sanitation logistics, emergency response routing, and public transport optimisation. Applicable to any Indian city expecting large-scale event footfalls — Prayagraj, Varanasi, stadium cities, election rally venues.",
    features: [
      "OSMnx road network extraction from OpenStreetMap — full city-scale graph",
      "Zone-specific congestion multiplier modelling for large public events",
      "Animated Plotly congestion visualisation — green → red across road network",
      "Streamlit browser dashboard — no proprietary GIS or mapping software",
      "IoT / ANPR / GPS integration pathway — same codebase, live data replaces synthetic",
      "Scalable to sanitation · emergency response · public transport optimisation"
    ],
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
    name: "Community Health Analytics Platform",
    tag: "Social Impact · Health Camp Analytics · Population Health · Doctors Consortium",
    desc: "The same digital twinning philosophy that monitors industrial assets is applied to community health — creating a living analytical twin of population health from organised health camp data. In collaboration with a consortium of medical doctors, the platform ingests biomarker-rich datasets and applies 18+ computed risk scores covering cardiovascular, liver, kidney, thyroid, metabolic syndrome, and lifestyle risk domains. Each patient record generates an individual health twin with a personalised PDF report for physician use.",
    desc2: "Community-level aggregation identifies locality-specific disease prevalence, risk clustering, and high-priority intervention zones — enabling targeted public health planning by municipal and state health bodies. Physician-defined reference ranges are integrated for clinical accuracy. Patients with incomplete entries are safely excluded from community analytics while their individual reports are still generated. Streamlit web dashboard with risk distribution visualisations, locality-level intelligence, and biomarker heatmaps. No proprietary software required.",
    features: [
      "18+ biomarker computed risk scores — cardiovascular · liver · kidney · thyroid · metabolic",
      "Individual patient health twin — personalised PDF report per patient for physician use",
      "Population-level analytics — locality risk clustering and high-priority intervention zones",
      "Doctors consortium collaboration — physician-defined reference ranges integrated",
      "Safe incomplete-entry exclusion — individual reports generated regardless",
      "Streamlit web dashboard — risk distributions · biomarker heatmaps · locality intelligence"
    ],
    stats: [{num:"18+", label:"Computed biomarker risk scores"},{num:"PDF", label:"Individual + population reports"},{num:"Locality", label:"Level risk stratification"}],
    badges: ["Cardiovascular · Liver · Kidney · Thyroid risk","Doctors consortium collaboration","Population-level locality risk mapping"]
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
