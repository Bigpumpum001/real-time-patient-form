# Real-Time Patient Form System

A responsive, real-time patient input form and staff monitoring system built with Next.js, TailwindCSS, and Socket.io.

## 🏥 Project Overview

This system provides two main interfaces:

- **Patient Form**: A responsive form where patients can enter their personal information
- **Staff View**: A real-time interface for staff members to monitor patient form submissions

The two interfaces synchronize instantly using WebSockets, allowing staff to see patient input in real-time as it's being entered.

## ✨ Features

### Patient Form
- **Comprehensive Input Fields**:
  - First Name, Middle Name (optional), Last Name
  - Date of Birth, Gender
  - Phone Number, Email
  - Address
  - Preferred Language, Nationality
  - Emergency Contact (name, relationship, phone - optional)
  - Religion (optional)
- **Form Validation**: Required fields, email format, phone number validation
- **Responsive Design**: Optimized for both mobile and desktop devices

### Staff View
- **Real-time Display**: Shows patient input instantly as they type
- **Status Indicators**: 
  - 🟢 **Typing** - Patient is actively filling the form
  - 🔵 **Submitted** - Form has been submitted
  - ⚪ **Inactive** - No activity for 30 seconds
- **Responsive Design**: Works on all screen sizes

## 🔄 Real-Time Architecture

### Real-Time Synchronization
- **WebSocket Technology**: Instant data synchronization using Socket.io
- **Inactivity Detection**: Automatically sets status to inactive after 30 seconds
- **The staff view always reflects the latest active patient session (last input wins).**

### Session Behavior
The system displays the most recent active patient input. 
If a new patient starts typing, the staff view will update to the latest session data.

### Data Flow
1. **Patient Input** → Typing event (real-time)
2. **Submit** → Validation + emit final data
3. **Socket Server** → Process data → Broadcast to all clients 
4. **Staff View** → Listen for updates → Display in real-time

### Real-time Events
- `patient-typing` – Sends live form updates while the patient is filling the form
- `patient-submit` – Sends the final submitted form data
- `form-update` – Updates the staff view with the latest patient data

## 🧩 Design Decisions (UI/UX)

- Simple and minimal medical-friendly UI
- Large input fields for accessibility
- Real-time feedback for staff monitoring
- Mobile-first responsive layout
- Clear visual status indicators for staff awareness

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **Styling**: TailwindCSS
- **Real-time**: Socket.io for WebSocket communication
- **Validation**: Zod for form validation
- **UI Components**: shadcn/ui
- **TypeScript**: Full type safety
- **Deployment**:
  - Frontend: Vercel
  - WebSocket Server: Docker + Google Cloud Run

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── patient/           # Patient form page
│   ├── staff/             # Staff view page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Role selection page
├── components/            # React components
│   ├── PatientForm.tsx    # Patient input form
│   ├── StaffViewForm.tsx  # Staff monitoring interface
│   ├── RoleSelectPage.tsx # Landing page
│   ├── navbar.tsx         # Navigation bar
│   └── ui/               # Reusable UI components (shadcn/ui)
├── lib/                   # Utility libraries
│   ├── socket.ts         # Socket.io client configuration
│   ├── utils.ts          # Helper functions
│   └── validation.ts     # Form validation schemas (ใช้ zod)
├── server/                # Backend server
│   └── socket.ts         # WebSocket server logic
├── types/                 # TypeScript type definitions
│   └── form.ts           # Form data types
├── public/               # Static assets
├── compose.yaml          # Docker Compose configuration
├── Dockerfile           # Docker container setup
└── package.json         # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/Bigpumpum001/real-time-patient-form
cd real-time-patient-form
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
Create a `.env.local` file:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
PORT=3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001 
```

### Running the Application

**Option 1: Development (Recommended)**
```bash
npm run dev:full
```
This starts both the Next.js dev server (port 3000) and Socket server (port 3001) concurrently.

**Option 2: Manual Setup**
```bash
# Terminal 1: Start Socket server
npm run socket-server

# Terminal 2: Start Next.js dev server
npm run dev
```

### Access the Application

- **Main Application**: http://localhost:3000
- **Patient Form**: http://localhost:3000/patient
- **Staff View**: http://localhost:3000/staff

## 🐳 Docker Deployment

### Run WebSocket Server with Docker
```bash
docker-compose up -d --build
```

Then run frontend:

```bash
npm run dev
```

## 📱 Usage Instructions

### For Patients
1. Navigate to the patient form page
2. Fill in all required fields (marked with *)
3. Optional fields can be left blank
4. Click "Submit" when complete
5. Form validates all inputs before submission

### For Staff
1. Navigate to the staff view page
2. Watch real-time updates as patients fill the form
3. Monitor patient status indicators
4. See form data instantly as it's entered

## 🔧 Development

### Available Scripts
- `npm run dev:full` - Run both Next.js (frontend) and Socket.io server concurrently (recommended)
- `npm run dev` - Start Next.js development server only
- `npm run socket-server` - Start Socket.io server only

### Component Architecture
- **PatientForm**: Handles form state, validation, and real-time updates
- **StaffViewForm**: Displays real-time data with status indicators
- **RoleSelectPage**: Landing page for role selection
- **Socket Integration**: Custom hooks for WebSocket management

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on git push

### Backend (WebSocket Server)
The Socket.io server is containerized with Docker and deployed on Google Cloud Run.

Steps:
1. Build Docker image
2. Push to Artifact Registry
3. Deploy to Cloud Run
4. Add the Cloud Run public URL to NEXT_PUBLIC_SOCKET_URL in the Vercel environment variables

**Environment Variables for Production**:
```env
NEXT_PUBLIC_SOCKET_URL=https://your-socket-server-url 
```

## 🧪 Testing
### Manual Testing
- Open `/patient` and `/staff` in separate tabs
- Fill the form and verify real-time updates
- Test validation with invalid inputs
- Verify 30-second inactivity detection

---