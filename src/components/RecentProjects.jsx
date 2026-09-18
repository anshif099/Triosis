import React, { useRef } from 'react';
import { EditableText, EditableImage } from '@anshif.rainhopes/reactcms-sdk';
import digitalSuccessImg from '../assets/digital_success.png';
import './RecentProjects.css';

function RecentProjects() {
  const sectionRef = useRef(null);

  return (
    <section className="projects-section" ref={sectionRef}>
      <div className="projects-sticky">
        <div className="projects-layout">
          <div className="projects-title-container">
            <EditableText regionId="projects.subtitle" label="Projects Subtitle" defaultValue="Our Recent Projects" className="projects-subtitle" />
            <EditableText
              regionId="projects.title"
              label="Projects Title"
              defaultValue="Building Digital Success Across Industries"
              className="projects-title"
              as="h2"
            />
          </div>

          <div className="project-card">
            <div className="project-image-wrapper">
              <EditableImage
                regionId="projects.card_image"
                label="Project Card Image"
                defaultValue={{ src: digitalSuccessImg, alt: "Digital Success Platform" }}
              />
            </div>
            <div className="project-info">
              <EditableText regionId="projects.card_title" label="Project Card Title" defaultValue="Digital Success Platform" as="h4" />
              <EditableText regionId="projects.card_subtitle" label="Project Card Subtitle" defaultValue="Growth & Analytics" as="p" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecentProjects;
