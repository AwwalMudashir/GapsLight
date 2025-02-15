# GapsLight Website Documentation  

GapsLight is a web-based platform designed to showcase projects, manage directors, and provide an admin dashboard for content management. The website is built using 
**HTML, CSS, and JavaScript** for the frontend, while the backend runs on **Node.js and Express.js**, with **MongoDB Atlas** as the database. The hosting is set up on 
`gapslight.com.ng` with **HTTPS enabled**. The project structure includes a `public_html` directory containing all frontend files, while the backend logic is managed inside a 
`backend` folder. Key features include a **homepage (`index.html`)**, **about page (`about.html`)**, **contact page (`contact.html`)**, and an **admin panel 
(`/admin` and a dashboard page)**. The backend provides RESTful APIs, such as `/api/projects` (to fetch and manage projects), `/api/directors` (to manage director profiles),
and `/api/admins` (for admin management and authentication via `/api/login`). MongoDB schemas are defined for **Users (Admins), Projects, and Directors**, ensuring structured
data storage. The backend is configured with CORS, body-parsing middleware, and file upload handling using Multer. Deployment involves running `npm install` to install
dependencies and starting the server with `node server.js`. MongoDB Atlas is configured with open IP access to allow connections. Known issues fixed include 
**Mixed Content errors** (by ensuring API calls use HTTPS), **admin panel loading issues** (by correctly serving static files), and **MongoDB connection problems** 
(by properly configuring Atlas permissions). Future improvements include **JWT authentication**, **image hosting via Cloudinary**, and **UI/UX enhancements**. 
This documentation serves as a guide for maintaining and extending the website's functionality while ensuring security and performance optimizations. 
