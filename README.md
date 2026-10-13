# EcoCampus AI — Dayananda Sagar University (DSU) Smart Sustainability Platform

**AI-Powered Campus Sustainability Intelligence for Hackathon Demonstration**

> **Notice:** This is an independent hackathon prototype designed for demonstration purposes with simulated telemetry data for Dayananda Sagar University (DSU), Bengaluru. Values and measurements are simulated.

---

## 🌟 Key Features

1. **Main Executive Dashboard**
   - 6 Core Real-Time KPIs: Electricity Demand (kWh/day), Water Usage (L/day), Waste Generated (kg/day), Recycling Ratio (%), Estimated Carbon Footprint (kg CO2e/day), and Campus Sustainability Score (0–100).
   - Interactive Recharts visualizations: 7-day diurnal electricity profile with rooftop solar generation offset, facility-wise water allocation bar chart, and 6-stream waste segregation doughnut.
   - Live Campus Issue Alert sentinel and AI-generated efficiency directives.

2. **DSU Campus Digital Twin & What-If Simulation Engine**
   - Interactive 2D spatial canvas mapping 8 key DSU blocks: *Academic Block, Central Library, Campus Canteen & Food Court, Student Hostel Block (Kaveri), Advanced Research Laboratory, North Campus Parking & EV Hub, Administrative & Chancellor Block, and Sports Complex & Grounds*.
   - Live color-coded status beacons (Optimal, Warning, Critical) with node inspection modals displaying diurnal load curves and targeted improvement actions.
   - What-If Simulation Engine with sliders for smart scheduling, LED retrofits, occupancy shifting, and water conservation—calculating live ₹ utility savings and CO2 reductions.

3. **Computer Vision Waste Stream Classifier**
   - Optical intake viewport simulating an edge-deployed YOLOv8 model for cafeteria and classroom waste sorting.
   - 1-Click test samples for judges: *Plastic Water Bottle (PET), Research Paper Notes, Aluminum Can, Fruit Scraps (Organic), Laboratory Glassware, and Lithium Button Battery / E-Waste*.
   - Live material confidence scoring, designated campus bin assignment (Blue, Green, Yellow, Red), step-by-step handling directives, and carbon offset tracking.

4. **Water Intelligence & Acoustic Leak Detection**
   - Real-time sub-metering breakdown across hostels, kitchens, and landscaping.
   - Anomaly sentinel flagging continuous tap drips and evaporative sprinkler losses.

5. **Campus Energy & Smart Grid Monitoring**
   - Subsystem load split: HVAC & central chilling (42%), lighting (24%), lab machinery (21%), and residential appliances (13%).
   - Diurnal solar photovoltaic generation (345 kWh/day) and avoided utility tariff tracking.

6. **Issue Management & Dispatch Hub**
   - User report submission form with categories, DSU block selection, priority levels, and simulated evidence attachments.
   - State machine dashboard with filters (*Pending → In Progress → Resolved*) and local persistence.

7. **Eco AI Sustainability Assistant**
   - Contextual chatbot co-pilot synthesizing live building telemetry into structured recommendations, environmental benefits, and ROI calculations.
   - Pre-configured quick prompts for judges and clean service layer for external LLM API integration.

8. **Carbon Footprint & GHG Protocol Calculator**
   - Transparent emission estimations across Scope 2 (grid electricity) and Scope 3 (commuter transit and solid waste).
   - Configurable Central Electricity Authority (CEA) emission factors and 2028 campus reduction roadmap.

9. **Sustainability Reports & Audit Export**
   - Daily and Monthly executive compliance audit layouts.
   - 1-Click CSV dataset export and formatted print/PDF generation.

10. **Green Campus Leaderboard**
    - Inter-departmental gamification ranking blocks with Green Points, badges, and trends.
    - Interactive "Run Inter-Block Green Challenge" feature with instant celebratory score updates.

11. **1-Click Judge Scenario**
    - Dedicated banner toggle that instantly simulates a 15% energy reduction, 18% water conservation, and upgraded recycling compliance across all platform views.

---

## 🚀 Quick Start Instructions

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Execution
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Open in browser
# Navigate to http://localhost:5173
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🛠️ Technology Stack
- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS (Dark navy `#060B18` with Emerald `#10B981` and Cyan `#06B6D4` accents), Glassmorphism
- **Icons & Data Visualization:** Lucide React, Recharts
- **Routing & State:** React Router DOM, React Context API with LocalStorage persistence
