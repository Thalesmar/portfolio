import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    // Add Font Awesome CSS link to head
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    // Add favicon
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = '/logo/favicon1.png';
    document.head.appendChild(favicon);

    // Cleanup function to remove elements if component unmounts
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.head.contains(favicon)) {
        document.head.removeChild(favicon);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Header hide/show logic
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        setHeaderHidden(true);
      } else {
        setHeaderHidden(false);
      }
      setLastScrollTop(scrollTop);

      // Active section highlighting
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.menu a');
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Animate skill bars
          if (entry.target.classList.contains('skill-progress')) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width;
          }
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.project-card, .about-text p, .skill-progress, .card-1, .card-2').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    closeMenu();
    
    if (targetId.startsWith('#')) {
      const target = document.querySelector(targetId);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 300);
      }
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const projects = [
    {
      title: "SoloLevelingSeason",
      description: "A dedicated platform for Solo Leveling fans featuring the latest updates, episode discussions, and community engagement. Built with modern web technologies for optimal performance and user experience.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "AWS"],
      links: {
        live: "https://sololevelingseason.com",
        github: "https://github.com/Thalesmar/sololevelingseason"
      }
    },
    {
      title: "RistoAnime",
      description: "A modern anime streaming platform with advanced features including a vast library of anime content, user profiles, watchlist management, and community integration. Optimized for seamless streaming experience.",
      techStack: ["React", "Node.js", "MongoDB", "AWS", "Redis"],
      links: {
        live: "https://ristoanime.com",
        github: "https://github.com/Thalesmar/ristoanime"
      }
    },
    {
      title: "Portfolio Website",
      description: "A modern and interactive portfolio website showcasing my work and skills. Features smooth animations, responsive design, and optimized performance.",
      techStack: ["HTML5", "CSS3", "JavaScript", "GSAP"],
      links: {
        github: "https://github.com/Thalesmar/portfolio"
      }
    },
    {
      title: "AnimeWitcher",
      description: "A specialized anime streaming platform focused on providing high-quality content with an intuitive user interface. Features include a curated anime library, responsive design, and seamless video playback experience.",
      techStack: ["HTML5", "CSS3", "JavaScript", "Node.js", "MongoDB"],
      links: {
        live: "https://animewitcher.cyou",
        github: "https://github.com/Thalesmar/animewitcher"
      }
    }
  ];

  const skills = [
    {
      category: "Languages",
      items: [
        { name: "JavaScript", level: "90%" },
        { name: "CSS", level: "85%" },
        { name: "HTML", level: "88%" }
      ]
    },
    {
      category: "Frameworks",
      items: [
        { name: "React", level: "92%" },
        { name: "Node.js", level: "88%" },
        { name: "Tailwind CSS", level: "85%" }
      ]
    },
    {
      category: "Tools",
      items: [
        { name: "Git", level: "95%" },
        { name: "SQL", level: "87%" },
        { name: "AWS", level: "83%" }
      ]
    }
  ];

  return (
    <div className="App">
      <header className={`header ${headerHidden ? 'hidden' : ''}`}>
        <div className="logo">
          <img src="/logo/Thlaes.png" alt="Thales Logo" />
        </div>
        <nav className={`menu-container ${menuActive ? 'active' : ''}`}>
          <ul className="menu">
            <li><a href="#about" className="botona" onClick={(e) => handleNavClick(e, '#about')}>.about()</a></li>
            <li><a href="#resume" className="botona" onClick={(e) => handleNavClick(e, '#resume')}>.resume()</a></li>
            <li><a href="#projects" className="botona" onClick={(e) => handleNavClick(e, '#projects')}>.projects()</a></li>
            <li><a href="#contact" className="botona" onClick={(e) => handleNavClick(e, '#contact')}>.contact()</a></li>
          </ul>
        </nav>
        <button className={`hamburger ${menuActive ? 'active' : ''}`} aria-label="Menu" onClick={toggleMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </header>

      <div className="intro-section">
        <div className="intro-header">
          <div className="line1"></div>
          <h1 className="greeting">Hi</h1>
        </div>
        <p className="name-intro">I'm <span className="name-highlight">Yassine Harroute</span></p>
        <p className="intro">
          I'm a <span className="hover-underline">fullstack developer</span> with <span className="hover-underline">2+ years of experience</span> building <span className="hover-underline">scalable web applications</span> and <span className="hover-underline">API integrations</span>.
        </p>
      </div>

      <div className="scroll-indicator">
        <div className="mouse"></div>
        <div className="scrolltext">Scroll</div>
      </div>

      <section id="about" className="about-section section">
        <h2 className="section-title">.about<span className="h2">("me")</span></h2>
        <div className="about-text">
          <p>Hi there! I'm Yassine Harroute, a fullstack developer based in Kenitra, Morocco. I specialize in building scalable web applications using React.js, Node.js, and modern databases. With over 2 years of experience, I've developed multiple responsive web applications with a focus on API integration and secure authentication systems.</p>
          
          <p>My technical expertise includes frontend technologies like React.js and Vue.js, backend development with Node.js and Express.js, and database management using PostgreSQL, MySQL, and MongoDB. I'm proficient with modern development tools including Git, Docker, and AWS, and I have experience implementing secure JWT authentication and optimizing database performance.</p>
          
          <p>Currently, I am focused on developing innovative web solutions and expanding my skill set in cloud technologies and DevSecOps practices. I am passionate about building efficient, scalable applications and continuously improving my craft as a developer.</p>
        </div>
      </section>

      <section id="projects" className="projects-section section">
        <h2 className="section-title">.projects<span className="h2">("my work")</span></h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech-stack">
                  {project.techStack.map((tech, techIndex) => (
                    <span key={techIndex}>{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.links.live && (
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-external-link-alt"></i> Visit Site
                    </a>
                  )}
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github"></i> Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="resume" className="resume-section section">
        <h1 className="main-resume-title">.resume<span className="title-bracket">("my journey")</span></h1>
        
        <div className="content-container">
          <div className="card-1">
            <div className="experience-content">
              <div className="job-header">
                <h3>Full Stack Web Developer</h3>
                <div className="date">2021 - 2023</div>
              </div>
              
              <div className="company">
                Web Development Company
                <a className="button" href="https://github.com/Thalesmar">
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
              
              <p style={{textAlign: 'left'}}>
                Led the development of multiple web applications using modern technologies. Focused on creating responsive, user-centric designs and implementing complex functionalities using modern frameworks.
              </p>
              
              <div className="project">
                <p style={{textAlign: 'left'}}>- Developed and maintained multiple full-stack applications using React, Node.js, and MongoDB</p>
                <span className="tags">React Node.js MongoDB Express</span>
              </div>
              
              <div className="project">
                <p style={{textAlign: 'left'}}>- Implemented responsive designs and optimized application performance</p>
                <span className="tags">HTML5 CSS3 JavaScript</span>
              </div>
              
              <div className="project">
                <p>- Created and integrated RESTful APIs for seamless data management</p>
                <span className="tags">Node.js Express MongoDB</span>
              </div>
              
              <div className="skillscards">
                <span>JavaScript</span>
                <span>React</span>
                <span>Node.js</span>
                <span>MongoDB</span>
                <span>HTML/CSS</span>
              </div>
            </div>
          </div>

          <div className="card-2">
            <div className="experience-content">
              <div className="job-header">
                <h3>Freelancer</h3>
                <div className="date">2024 - 2025</div>
              </div>
              <div className="company">
                Self-Employed
                <a className="button" href="https://github.com/Thalesmar">
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            
              <p>
                Working with various clients to develop custom web solutions. Projects include anime streaming platforms, community websites, and portfolio development.
              </p>
              
              <div className="project">
                <p>- Developed SoloLevelingSeason and RistoAnime platforms</p>
                <span className="tags">React Node.js MongoDB AWS</span>
              </div>
            
              <div className="project">
                <p>- Created custom CMS solutions and e-commerce integrations</p>
                <span className="tags">React Node.js Express MongoDB</span>
              </div>
            
              <div className="project">
                <p>- Implemented responsive designs and modern UI/UX practices</p>
                <span className="tags">HTML5 CSS3 JavaScript React</span>
              </div>
              
              <div className="skillscards">
                <span>React</span>
                <span>Node.js</span>
                <span>MongoDB</span>
                <span>AWS</span>
                <span>Express</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="skills-section section">
        <h2 className="section-title">.skills<span className="h2">()</span></h2>
        <div className="skills-container">
          {skills.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>{category.category}</h3>
              <div className="skill-items">
                {category.items.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar">
                      <div className="skill-progress" data-width={skill.level}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact section">
        <h2 className="section-title">.contact<span className="h2">()</span></h2>
        <p className="contact-text">I am always on the lookout for new challenges and opportunities to learn and grow. If you have a project or idea that you think I could help with, I would love to hear from you. Please feel free to get in touch via the contact button below or through any of the social media links.</p>
        <div className="hello-button">
          <a href="mailto:harrouteyassine573@gmail.com" className="hello-button-style">Say hello!</a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="logo-footer" onClick={scrollToTop}>
            <img src="/logo/Thlaes.png" alt="Thales Logo" />
          </div>
          
          <div className="credit-pos">
            <div className="credit-wrapper">
              <span className="CREDIT">Credit</span>
              <span className="ipeap">Epeap Kenitra</span>
            </div>
          </div>
        </div>

        <div className="mobile-footer-links">
          <div className="mobile-social-icons">
            <a href="https://github.com/Thalesmar" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/yassine-harroute-32323a355/" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://x.com/Thaleshr_" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com/thaleshr1" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        
        <div className="privacy">
          <span>2020-2024</span>
          <span className="line-middle">|</span>
          <span>Thales</span>
        </div>
      </footer>

      {/* Fixed position social icons */}
      <div className="right-fixed">
        <div className="social-icons">
          <a href="https://github.com/Thalesmar" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/yassine-harroute-32323a355/" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://x.com/Thaleshr_" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com/thaleshr1" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      {/* Fixed position email */}
      <div className="left-fixed">
        <a className="left-styles" href="mailto:harrouteyassine573@gmail.com">harrouteyassine573@gmail.com</a>
      </div>
    </div>
  );
}

export default App;