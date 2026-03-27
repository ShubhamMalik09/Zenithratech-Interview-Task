
## 🚀 Live Demo

👉 https://zenithratech-interview-task.vercel.app/

---

## 🎯 Features

### 📷 Camera (WebRTC)

* Accesses user webcam using `getUserMedia`
* Start/Stop control with real-time preview
* Handles permission denial gracefully

### 🎤 Voice to Text (Web Speech API)

* Converts speech to real-time text
* Continuous listening with auto-restart
* Single-button UX (Start / Stop)
* Handles permission and browser limitations

### 🦷 Bluetooth (Web Bluetooth API)

* Scans nearby Bluetooth devices
* Displays selected device information
* Handles unsupported/unnamed devices

---

## 🧠 Key Concepts Implemented

* **Secure Context (HTTPS)** for hardware APIs
* **Permission Handling** using `navigator.permissions`
* **State-driven UI** for better UX
* **Continuous Speech Recognition** using `onend` restart logic
* **Fallback Handling** for device limitations (e.g., unknown Bluetooth devices)

---

## 🏗️ Tech Stack

* React (Vite)
* Tailwind CSS
* Web APIs:

  * WebRTC (`getUserMedia`)
  * Web Speech API
  * Web Bluetooth API

---

## 📁 Project Structure

```
src/
 ├── components/
 │   ├── Camera.jsx
 │   ├── Voice.jsx
 │   ├── Bluetooth.jsx
 │
 ├── pages/
 │   ├── CameraPage.jsx
 │   ├── VoicePage.jsx
 │   ├── BluetoothPage.jsx
 |   ├── Home.jsx
 │
 ├── utils/
 │   ├── status-config.js
```

---

## ⚙️ How to Run Locally

```bash
git clone https://github.com/ShubhamMalik09/Zenithratech-Interview-Task
cd Zenithratech-Interview-Task
npm install
npm run dev
```

---

## 🌐 Deployment

Deployed on **Vercel** to ensure HTTPS support required for hardware APIs.

---

## ⚠️ Limitations

* Web Speech API is not supported in all browsers (best in Chrome)
* Web Bluetooth works only on HTTPS and supported devices
* Some Bluetooth devices may appear as "Unknown" due to hardware restrictions
* Speech recognition may require internet (depends on browser implementation)

---

## 🧠 Learnings

* Understanding browser security model (HTTPS & secure context)
* Handling asynchronous hardware APIs
* Managing permissions and user interaction flows
* Designing clean, scalable frontend architecture

---
