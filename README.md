# Dreamy Toy Makers - Custom 3D Anime Toys

A beautiful web application for ordering custom 3D printed anime character toys. Upload your original character (OC) image and get a personalized toy created just for you!

## Features

- 🎨 Upload your anime OC image
- ✨ Preview your custom toy design
- 💳 Multiple payment options (PayPal and other methods)
- 📧 Email notifications for order confirmation
- 🎯 Responsive design with smooth animations
- 🌈 Beautiful watercolor-themed UI

## Technologies Used

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Email Service**: EmailJS
- **Notifications**: Custom toast system

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd dreamy-toy-makers
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── styles/             # Global styles and Tailwind config
```

## Deployment

This project can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Configuration

### EmailJS Setup

To enable email functionality:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Set up a service and email template
3. Update the EmailJS configuration in `src/pages/CustomizePage.tsx`:
   - Replace `'service_id'` with your service ID
   - Replace `'template_id'` with your template ID
   - Replace `'public_key'` with your public key

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is private and proprietary.
