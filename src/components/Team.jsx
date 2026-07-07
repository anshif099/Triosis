import React from 'react';
import bajeelImg from '../assets/bajeel.png';
import ansabImg from '../assets/ansab.jpg';
import amalImg from '../assets/amal.jpg';
import './Team.css';

const teamMembers = [
  {
    name: 'BAJEEL P',
    role: 'Founder & CEO',
    image: bajeelImg,
    socials: ['x', 'instagram', 'website', 'behance']
  },
  {
    name: 'Muhamed Ansab K',
    role: 'Co-Founder & CCO',
    image: ansabImg,
    socials: ['instagram']
  },
  {
    name: 'Amal Jiyad',
    role: 'Co-Founder & CFO',
    image: amalImg,
    socials: ['instagram', 'behance']
  }
];

const SocialIcon = ({ type }) => {
  if (type === 'x') {
    return (
      <svg className="social-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    );
  }
  if (type === 'instagram') {
    return (
      <svg className="social-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    );
  }
  if (type === 'website') {
    return (
      <svg className="social-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    );
  }
  if (type === 'behance') {
    return (
      <svg className="social-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.228 15.011c.522 0 .979-.108 1.371-.324a2.2 2.2 0 0 0 .907-.905c.224-.4.336-.879.336-1.436 0-.582-.124-1.071-.373-1.468a2.12 2.12 0 0 0-.991-.871 4.542 4.542 0 0 0 1.258-1.282c.221-.362.332-.796.332-1.302 0-.528-.112-.993-.336-1.393a2.158 2.158 0 0 0-.923-.923c-.41-.225-.92-.338-1.529-.338H3v10.14h5.228zm-2.85-6.524h2.247c.361 0 .638.071.83.214s.288.358.288.647c0 .265-.091.472-.272.622s-.442.225-.783.225H5.378V8.487zm0 2.923h2.399c.381 0 .675.083.882.25s.31.411.31.734c0 .324-.105.578-.316.762s-.499.276-.865.276H5.378V11.41zm11.758 3.601c.712 0 1.309-.126 1.792-.377a3.483 3.483 0 0 0 1.253-1.066c.307-.46.46-1.002.46-1.626h-2.1c0 .4-.117.712-.351.938s-.545.338-.936.338c-.461 0-.824-.148-1.09-.444-.266-.296-.407-.723-.423-1.28h6.149c.01-.157.016-.312.016-.466 0-.749-.126-1.428-.377-2.039a3.792 3.792 0 0 0-1.127-1.503c-.499-.408-1.111-.612-1.835-.612a3.84 3.84 0 0 0-1.928.482 3.447 3.447 0 0 0-1.323 1.347c-.313.576-.469 1.265-.469 2.067 0 .809.158 1.501.474 2.077a3.52 3.52 0 0 0 1.344 1.347c.582.316 1.256.475 2.025.475zm-.058-5.321c.421 0 .753.132.996.397.243.265.374.629.394 1.09h-2.82c.026-.45.148-.807.368-1.072.22-.265.575-.397 1.062-.397zm-.478-4.225V4.254h3.6v1.212h-3.6z"/>
      </svg>
    );
  }
  return null;
};

function Team() {
  return (
    <section className="team-section">
      <div className="team-header">
        <h2 className="team-title">
          Let's Make <span className="text-gray">Something</span><br />
          <span className="text-gray">Extraordinary</span> Together
        </h2>
        <div className="team-separator"></div>
      </div>

      <div className="team-list">
        {teamMembers.map((member) => (
          <div className="team-card" key={member.name}>
            <div className="team-card-left">
              <img src={member.image} alt={member.name} className="team-card-image" />
            </div>
            
            <div className="team-card-middle">
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
            </div>

            <div className="team-card-right">
              <div className="member-socials">
                {member.socials.map((social) => (
                  <a 
                    href={`#${social}`} 
                    className="social-btn" 
                    key={social}
                    onClick={(e) => e.stopPropagation()} // Prevent card navigation trigger
                  >
                    <SocialIcon type={social} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Team;
