
import React, { useState, useCallback } from 'react';

// Define the structure for Modal content
interface ModalContent {
  title: string;
  body: React.ReactNode;
}

// Modal Component defined outside Layout to prevent re-renders
const Modal: React.FC<{ content: ModalContent; onClose: () => void }> = ({ content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-800 text-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold">{content.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>
        <div className="p-6">{content.body}</div>
      </div>
    </div>
  );
};

// Galaxy Background Component
const GalaxyBackground: React.FC = () => (
  <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-black">
    <style>{`
      @keyframes move-stars {
        from { transform: translateY(0px); }
        to { transform: translateY(-2000px); }
      }
      @keyframes twinkle {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .stars, .stars2, .stars3 {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        display: block;
      }
      .stars {
        background: black url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000"><circle fill="white" cx="100" cy="100" r="1.5"/><circle fill="white" cx="300" cy="400" r="1"/><circle fill="white" cx="500" cy="200" r="1.2"/><circle fill="white" cx="700" cy="800" r="0.8"/><circle fill="white" cx="900" cy="600" r="1.5"/><circle fill="white" cx="1100" cy="300" r="1.1"/><circle fill="white" cx="1300" cy="900" r="0.9"/><circle fill="white" cx="1500" cy="500" r="1.3"/><circle fill="white" cx="1700" cy="700" r="1"/><circle fill="white" cx="1900" cy="100" r="1.4"/></svg>') top center;
        background-repeat: repeat;
        background-size: 2000px 2000px;
        animation: move-stars 220s linear infinite, twinkle 10s ease-in-out infinite;
      }
      .stars2 {
        background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000"><circle fill="white" cx="200" cy="600" r="1.2"/><circle fill="white" cx="400" cy="100" r="0.8"/><circle fill="white" cx="600" cy="900" r="1.4"/><circle fill="white" cx="800" cy="300" r="1"/><circle fill="white" cx="1000" cy="700" r="1.1"/><circle fill="white" cx="1200" cy="200" r="0.9"/><circle fill="white" cx="1400" cy="800" r="1.3"/><circle fill="white" cx="1600" cy="400" r="1"/><circle fill="white" cx="1800" cy="900" r="1.2"/><circle fill="white" cx="50" cy="1200" r="0.7"/></svg>') top center;
        background-repeat: repeat;
        background-size: 2000px 2000px;
        animation: move-stars 170s linear infinite, twinkle 12s ease-in-out infinite;
      }
      .stars3 {
        background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000"><circle fill="white" cx="150" cy="700" r="0.9"/><circle fill="white" cx="350" cy="250" r="1.1"/><circle fill="white" cx="550" cy="850" r="0.7"/><circle fill="white" cx="750" cy="150" r="1.3"/><circle fill="white" cx="950" cy="950" r="0.8"/><circle fill="white" cx="1150" cy="450" r="1.2"/><circle fill="white" cx="1350" cy="750" r="1"/><circle fill="white" cx="1550" cy="50" r="1.4"/><circle fill="white" cx="1750" cy="950" r="0.9"/><circle fill="white" cx="1950" cy="350" r="1.1"/></svg>') top center;
        background-repeat: repeat;
        background-size: 2000px 2000px;
        animation: move-stars 120s linear infinite, twinkle 8s ease-in-out infinite;
      }
      .nebula {
        position: absolute;
        width: 200%;
        height: 200%;
        top: -50%;
        left: -50%;
        background-image: radial-gradient(ellipse at center, rgba(138, 43, 226, 0.2) 0%, rgba(0,0,0,0) 60%), radial-gradient(ellipse at 20% 80%, rgba(0, 191, 255, 0.2) 0%, rgba(0,0,0,0) 50%), radial-gradient(ellipse at 80% 30%, rgba(255, 20, 147, 0.2) 0%, rgba(0,0,0,0) 50%);
        animation: rotate-nebula 360s linear infinite;
      }
      @keyframes rotate-nebula {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
    <div className="stars"></div>
    <div className="stars2"></div>
    <div className="stars3"></div>
    <div className="nebula"></div>
  </div>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = useCallback((modalId: string) => {
    setActiveModal(modalId);
  }, []);
  
  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const modalContents: { [key: string]: ModalContent } = {
    about: { title: "About Us", body: <p>This is a placeholder UI for a secure, client-side PDF tool. All processing happens on your device, ensuring your documents remain private.</p> },
    contact: { title: "Contact", body: <p>For inquiries, please reach out to hsini.web@gmail.com or visit doodax.com.</p> },
    guide: { title: "How to Use", body: <div><h3 className="font-bold mb-2">Merge PDFs:</h3><p>Select multiple PDF files, drag to reorder them, and click 'Merge'.</p><h3 className="font-bold mt-4 mb-2">Split PDF:</h3><p>Select a single PDF, enter page ranges (e.g., 1-3, 5, 8-10) or choose to extract all pages individually, then click 'Split'.</p></div> },
    privacy: { title: "Privacy Policy", body: <p>Your privacy is our priority. Since this application processes files locally in your browser, no data is ever sent to or stored on our servers. Your documents never leave your computer.</p> },
    terms: { title: "Terms of Service", body: <p>By using this service, you agree to use it for lawful purposes. This tool is provided as-is without any warranties.</p> },
    dmca: { title: "DMCA", body: <p>We respect intellectual property rights. As no files are hosted on our servers, we do not handle user content. If you have concerns, please contact us.</p> },
  };

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'guide', label: 'Guide' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms of Service' },
    { id: 'dmca', label: 'DMCA' },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white font-sans flex flex-col">
      <GalaxyBackground />

      <header className="py-4 px-4 sm:px-6 md:px-8 bg-black/30 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-40">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Galaxy PDF</div>
          <ul className="hidden md:flex items-center space-x-4">
            {navLinks.map(link => (
              <li key={link.id}>
                <button onClick={() => openModal(link.id)} className="text-gray-300 hover:text-white transition-colors duration-200">{link.label}</button>
              </li>
            ))}
          </ul>
           <button className="md:hidden text-gray-300 hover:text-white" onClick={() => openModal(navLinks.map(l => l.id).join(','))}>Menu</button>
        </nav>
      </header>

      {activeModal && activeModal.includes(',') && (
         <Modal content={{title: "Menu", body: 
         <ul className="flex flex-col space-y-2">
            {navLinks.map(link => (
              <li key={link.id}>
                <button onClick={() => openModal(link.id)} className="w-full text-left p-2 rounded hover:bg-gray-700 transition-colors duration-200">{link.label}</button>
              </li>
            ))}
          </ul>
         }} onClose={closeModal} />
      )}

      {activeModal && !activeModal.includes(',') && modalContents[activeModal] && (
        <Modal content={modalContents[activeModal]} onClose={closeModal} />
      )}

      <div className="flex-grow">{children}</div>

      <footer className="py-6 px-4 sm:px-6 md:px-8 bg-black/30 backdrop-blur-sm border-t border-gray-700/50 text-center text-gray-400">
        <div className="container mx-auto">
          <p>Powered by <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 font-bold transition-colors duration-200">HSINI MOHAMED</a></p>
          <p className="text-sm mt-1">doodax.com | hsini.web@gmail.com</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
