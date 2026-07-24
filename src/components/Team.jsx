import React from 'react';
import { EditableText, EditableSection } from '@anshif.rainhopes/reactcms-sdk';
import './Team.css';

const expertDivisions = [
  {
    name: 'Strategy & Consulting',
    role: 'Market research, business growth, and brand positioning strategy.',
    icon: 'strategy'
  },
  {
    name: 'Creative Design',
    role: 'Logo, branding assets, visual identity, UI/UX, and graphics.',
    icon: 'design'
  },
  {
    name: 'Web Development',
    role: 'Fast, secure, responsive, and performance-tuned websites.',
    icon: 'development'
  },
  {
    name: 'Digital Marketing',
    role: 'Ad campaigns, lead generation, and social media marketing systems.',
    icon: 'marketing'
  },
  {
    name: 'SEO Specialists',
    role: 'Search optimization, keyword ranking, and visibility growth.',
    icon: 'seo'
  },
  {
    name: 'AI Automation Experts',
    role: 'Smart workflow automation, integrations, and intelligent setups.',
    icon: 'ai'
  }
];

const ExpertIcon = ({ type }) => {
  const svgProps = {
    className: "expert-svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  switch (type) {
    case 'strategy':
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case 'design':
      return (
        <svg {...svgProps}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      );
    case 'development':
      return (
        <svg {...svgProps}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'marketing':
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'seo':
      return (
        <svg {...svgProps}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      );
    case 'ai':
      return (
        <svg {...svgProps}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
        </svg>
      );
    default:
      return null;
  }
};

function Team() {
  return (
    <EditableSection regionId="team.section" label="Team Section" className="team-section">
      <div className="team-header">
        <EditableText
          regionId="team.title"
          label="Team Title"
          defaultValue="Meet Our Digital Experts"
          className="team-title"
          as="h2"
        />
        <div className="team-separator"></div>
      </div>

      <div className="team-list">
        {expertDivisions.map((division, index) => (
          <div className="team-card" key={division.name}>
            <div className="team-card-left icon-container">
              <ExpertIcon type={division.icon} />
            </div>
            
            <div className="team-card-middle">
              <EditableText
                regionId={`team.member_${index}.name`}
                label={`Team Member ${index + 1} Name`}
                defaultValue={division.name}
                className="member-name"
                as="h3"
              />
              <EditableText
                regionId={`team.member_${index}.role`}
                label={`Team Member ${index + 1} Role`}
                defaultValue={division.role}
                className="member-role"
                as="p"
              />
            </div>

            <div className="team-card-right">
              <span className="arrow-btn">→</span>
            </div>
          </div>
        ))}
      </div>
    </EditableSection>
  );
}

export default Team;
