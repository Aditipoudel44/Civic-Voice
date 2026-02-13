#Civic Voice
Civic Voice is a frontend-only public complaint management system that allows citizens to report civic issues and helps administrators track and resolve them efficiently. 
It focuses on bridging the gap between citizens and local authorities through a simple, interactive digital platform.
##Problem Statement
Many communities still rely on manual complaint reporting. Citizens have to visit offices or rely on word-of-mouth to report problems like road damage, water issues, or electricity outages.
This slows down response time and reduces transparency.
This project provides a digital platform where citizens can submit complaints online, and administrators can efficiently manage, track, and resolve them—making civic management faster, organized, and more accountable.
##Purpose of the Project
-Practice frontend development skills with a real-world application.
-Understand civic service workflows and how digital tools can improve them.
-Demonstrate how a simple digital platform can help citizens communicate issues and administrators take action efficiently.
##Features
- Submit Complaints
  - Citizens can submit complaints with details including:
  - Full Name
  - Municipality
  - Ward Number
  - Issue Category (Road, Water, Electricity, Garbage, Street Light, Drainage, Public Property Damage, Others)
  - Specific Location
  - Description of the issue
  - Ensures all required fields are filled before submission.

- Admin Panel
  - Admins can switch to Admin Mode using a password (admin123).
  - Admins can mark complaints as Resolved.
  - Admins can Delete complaints if necessary.
  - Stats display total, pending, and resolved complaints in real-time.

- Dashboard & Stats
  - Color-coded cards for quick overview:
  - Total complaints (blue)
  - Resolved (green)
  - Pending (orange)
  - Recent complaints are displayed in cards with clear Pending / Resolved labels.

- Design & UI Features
  - Responsive layout using Tailwind CSS.
  - Modern, clean, and user-friendly interface.
  - Interactive hover effects on stats and complaint cards.
  - Admin mode indicator clearly shows when administrative features are enabled.

##Technologies Used
- HTML
- CSS
- Tailwind CSS
- JavaScript
- Git and GitHub

##Data Validation and Functionality
- Required fields validated before submission.
- Prevents form submission if fields are empty.
- Status updates dynamically when complaints are resolved.
- Admin-only features for security.
- Data stored in localStorage, persisting across page reloads.
