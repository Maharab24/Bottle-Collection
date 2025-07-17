# Bottle Collection

**Bottle Collection** is a simple e-commerce web application built with **ReactJS**, **Vite**, and a **custom API**. Users can browse a collection of bottles, view details, and add their desired bottles to a cart — simulating an online shopping experience.

---

## Live Page Link

https://bottle-collection.surge.sh/

---

## Features

-  Browse a variety of bottles
-  Add bottles to cart
-  View cart with item count (synced with localStorage)
-  Fast performance using Vite
-  Client-side routing with React Router
-  Smart state updates (cart count without page reload)

---

##  Tech Stack

| Technology   | Purpose                         |
|--------------|----------------------------------|
| ReactJS      | Frontend library                 |
| Vite         | Build tool for fast dev server   |
| Tailwind CSS | Styling framework                |
| DaisyUI      | Pre-built Tailwind components    |
| Custom API   | Bottle data fetching             |
| localStorage | Client-side cart persistence     |
| React Router | Page navigation                  |

---

## 📂 Project Structure

bottle-collection/
├── public/
│   └── bottles.json
├── src/
│   ├── Components/
│   │   ├── Bottles/
│   │   │   ├── Bottle.jsx
│   │   │   └── Bottles.jsx
│   │   ├── Body/
│   │   │   └── Body.jsx
│   │   ├── Cart/
│   │   │   └── CartPage.jsx
│   │   └── Home/
│   │       └── Header.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── package.json
├── vite.config.js
└── README.md

