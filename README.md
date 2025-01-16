# EditFlow

EditFlow is a collaborative coding platform that allows developers to write, share, and collaborate on code in real-time. With support for multiple programming languages and a robust feature set, EditFlow provides a seamless environment for both individual developers and teams.

## ✨ Features

- **Multi-Language Support**: Write and execute code in multiple programming languages effortlessly
- **Real-Time Collaboration**: Work together with your team in shared code rooms
- **One-Click Code Sharing**: Generate shareable links instantly for your code
- **100% Uptime Guarantee**: Experience reliable, uninterrupted coding sessions
- **Secure and Private**: Enhanced security with robust authentication
- **Customizable Workspace**: Tailor your coding environment to your preferences
- **Seamless Code Import/Export**: Effortlessly transfer code between projects and tools
- **Trusted Platform**: Strong focus on code privacy and user satisfaction

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- MongoDB (for database)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/IamDevTrivedi/WoC_React_202301150.git
```

2. Install root dependencies:

```bash
npm install
```

3. Install client dependencies:

```bash
cd client
npm install
```

4. Install server dependencies:

```bash
cd ../server
npm install
```

5. Configure environment variables:

   - Rename `.env.example` to `.env` in both client and server directories
   - Update the values in the `.env` files with your actual configuration

6. Start the application from the Root Directory:

```bash
npm start
```

## 🛠️ Technology Stack

### Frontend

- React
- Three.js for 3D visualizations
- Monaco Editor for code editing
- Socket.IO for real-time features
- UI Libraries:
  - Acernity UI
  - shadCN
  - Ant Design
  - Material UI
  - Framer Motion
- Additional packages:
  - @react-three/fiber & drei
  - React Router
  - Axios
  - Tailwind CSS

### Backend

- Express.js
- MongoDB with Mongoose
- Socket.IO for real-time communication
- JWT for authentication
- Additional features:

  - Nodemailer for email services
  - bcryptjs for encryption
  - CORS support
  - Cookie parsing

  ## Directory structure

  ```
  Directory structure:
  └── iamdevtrivedi-woc_react_202301150/
    ├── README.md
    ├── LICENSE.md
    ├── package.json
    ├── client/
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── tailwind.config.js
    │   ├── .env.example
    │   ├── .gitignore
    │   ├── public/
    │   │   ├── index.html
    │   │   ├── manifest.json
    │   │   └── robots.txt
    │   └── src/
    │       ├── App.js
    │       ├── App.test.js
    │       ├── index.css
    │       ├── index.js
    │       ├── setupTests.js
    │       ├── Constants/
    │       │   ├── globe.json
    │       │   └── languages.js
    │       ├── Context/
    │       │   └── AppContext.js
    │       ├── components/
    │       │   ├── AnimatedPinDemo.js
    │       │   ├── BackgroundGradientAnimationDemo.js
    │       │   ├── BackgroundLinesDemo.js
    │       │   ├── ChatInput.js
    │       │   ├── ChatMessage.js
    │       │   ├── CodeBlockDemo.js
    │       │   ├── FeaturesSectionDemo.js
    │       │   ├── Footer.js
    │       │   ├── GitGlobe.js
    │       │   ├── HeroHighlightDemo.js
    │       │   ├── Loading.js
    │       │   ├── LoadingDots.js
    │       │   ├── MacbookScrollDemo.js
    │       │   ├── NavbarDemo.js
    │       │   ├── StickyScrollRevealDemo.js
    │       │   └── ui/
    │       │       ├── 3d-pin.jsx
    │       │       ├── background-gradient-animation.jsx
    │       │       ├── background-lines.jsx
    │       │       ├── button.jsx
    │       │       ├── code-block.jsx
    │       │       ├── globe.jsx
    │       │       ├── hero-highlight.jsx
    │       │       ├── hover-border-gradient.jsx
    │       │       ├── input.jsx
    │       │       ├── label.jsx
    │       │       ├── macbook-scroll.jsx
    │       │       ├── navbar-menu.jsx
    │       │       └── sticky-scroll-reveal.jsx
    │       ├── lib/
    │       │   └── utils.js
    │       └── pages/
    │           ├── About.js
    │           ├── Chat.js
    │           ├── CodeRoom.js
    │           ├── Contact.js
    │           ├── CreateRoom.js
    │           ├── ForgotPassword.js
    │           ├── Home.js
    │           ├── JoinRoom.js
    │           ├── Login.js
    │           ├── Privacy.js
    │           ├── Room.js
    │           ├── SignUp.js
    │           └── VerifyEmail.js
    └── server/
        ├── index.js
        ├── package-lock.json
        ├── package.json
        ├── .env.example
        ├── Constants/
        │   └── languages.js
        ├── config/
        │   ├── db.config.js
        │   └── nodemailer.config.js
        ├── controllers/
        │   ├── auth.controller.js
        │   ├── health.controller.js
        │   ├── room.controller.js
        │   └── user.controller.js
        ├── lib/
        │   ├── logger.lib.js
        │   ├── otp.lib.js
        │   ├── templates.lib.js
        │   ├── token.lib.js
        │   └── validators.lib.js
        ├── middlewares/
        │   └── auth.middleware.js
        ├── models/
        │   ├── room.model.js
        │   └── user.model.js
        ├── routes/
        │   ├── auth.router.js
        │   ├── heath.router.js
        │   ├── room.router.js
        │   └── user.router.js
        └── sockets/
            └── codeRoom.socket.js

  ```

## 👤 Contact & Support

- **Created by**: [@IamDevTrivedi](https://github.com/IamDevTrivedi)
- **LinkedIn**: [Dev Trivedi](https://www.linkedin.com/in/contact-devtrivedi/)
- **GitHub**: [@IamDevTrivedi](https://github.com/IamDevTrivedi)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ by Dev Trivedi
