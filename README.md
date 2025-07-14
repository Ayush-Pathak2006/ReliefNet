# 🛟 ReliefNet - Emergency Disaster Response Network

**ReliefNet** is a responsive, interactive disaster relief platform designed to assist communities during emergencies like floods, fires, and earthquakes. It connects users to nearby responders, allows SOS alerts with location data, enables donations, and offers a volunteer management system.

---

## 🚀 Features

- **SOS Emergency System**: Send real-time SOS alerts with geolocation and emergency category.
- **Live Disaster Mapping**: Visualize ongoing disasters and risk zones using Google Maps.
- **Volunteer Dashboard**: Track assigned tasks, profile stats, and community contributions.
- **Donation System**: Make monetary contributions through a simulated payment interface.
- **Weather Widget**: Live weather-based status (Harsh, Moderate, Normal) with a floating widget.
- **Authentication Modal**: Register and login for volunteers and admins using toggle UI.

---

## 🖥️ Tech Stack

| Frontend        | JavaScript, HTML5, CSS3 (Bootstrap 5, Tailwind) |
|----------------|--------------------------------------------------|
| Maps           | Google Maps API                                 |
| Charts         | Chart.js for analytics in the volunteer section |
| Fonts & Icons  | Google Fonts, Font Awesome                      |

## 📂 Project Structure
```
ReliefNet/
├── index.html
├── SOS.html
├── sosConfirm.html
├── volunteer.html
├── payment.html
├── suslogin.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── images/
```

## ⚙️ Setup Instructions

> Follow the steps to run this project locally:

1. **Clone the repository**

```bash
git clone https://github.com/your-username/reliefnet.git
cd reliefnet
Replace Google Maps API Key

Update this line in index.html with your own key:

html
Copy
Edit
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
```
Open in Browser

Just open index.html in your browser to run it locally.

🧑‍💻 Contributing
We welcome contributions to improve ReliefNet!

Fork the repo

Create your feature branch: git checkout -b feature-name

Commit your changes: git commit -am 'Add feature'

Push to the branch: git push origin feature-name

Create a new Pull Request

📬 Contact
If you have any questions or ideas:

Email: ayushpathak13022006@gmail.com

LinkedIn: https://www.linkedin.com/in/ayush-pathak-75a985293/

Made with care for communities in crisis. Together, we are stronger.
