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

    // Add favicon - use relative path for GitHub Pages
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = './logo/favicon1.png';
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
      title: "VisionUI",
      description: "A modern CSS framework and UI component library built with pure CSS. Features responsive design, customizable components, and modern design principles for building beautiful user interfaces.",
      techStack: ["CSS", "HTML", "JavaScript", "Responsive Design"],
      links: {
        github: "https://github.com/Thalesmar/VisionUI"
      }
    },
    {
      title: "Workout Tracker App",
      description: "A comprehensive fitness tracking application that helps users monitor their workouts, track progress, and maintain fitness goals. Features user authentication and data visualization.",
      techStack: ["CSS", "JavaScript", "HTML", "Local Storage"],
      links: {
        github: "https://github.com/Thalesmar/Workout-Tracker-App"
      }
    },
    {
      title: "JavaScript Fun Practice",
      description: "A collection of functional programming exercises and challenges in JavaScript. Forked from Zero to Mastery, featuring practical exercises to improve JavaScript skills and problem-solving abilities.",
      techStack: ["JavaScript", "Functional Programming", "ES6+", "Problem Solving"],
      links: {
        github: "https://github.com/Thalesmar/JS_Fun_Practice"
      }
    },
    {
      title: "JavaScript Color Picker",
      description: "An interactive color picker application built with vanilla JavaScript. Features real-time color selection, hex code generation, and a user-friendly interface for designers and developers.",
      techStack: ["JavaScript", "HTML", "CSS", "DOM Manipulation"],
      links: {
        github: "https://github.com/Thalesmar/JavaScript-Color-Picker"
      }
    },
    {
      title: "Gradient Background Generator",
      description: "A dynamic gradient background generator that creates beautiful color combinations. Users can customize colors, angles, and export CSS code for their projects.",
      techStack: ["JavaScript", "CSS", "HTML", "Color Theory"],
      links: {
        github: "https://github.com/Thalesmar/Gradient-Background"
      }
    },
    {
      title: "Personal Portfolio",
      description: "A modern, responsive portfolio website showcasing my work and skills. Features smooth animations, interactive elements, and optimized performance for professional presentation.",
      techStack: ["React", "CSS", "JavaScript", "Responsive Design"],
      links: {
        live: "https://Thalesmar.github.io/portfolio",
        github: "https://github.com/Thalesmar/portfolio"
      }
    }
  ];

  const skills = [
    {
      category: "Programming Languages",
      items: [
        { name: "JavaScript/TypeScript", level: "92%" },
        { name: "Python", level: "85%" },
        { name: "HTML/CSS", level: "90%" }
      ]
    },
    {
      category: "Frontend Technologies",
      items: [
        { name: "React.js", level: "90%" },
        { name: "Next.js", level: "80%" },
        { name: "Tailwind CSS", level: "85%" }
      ]
    },
    {
      category: "Backend & DevOps",
      items: [
        { name: "Node.js/Express", level: "88%" },
        { name: "Docker/Kubernetes", level: "80%" },
        { name: "AWS/Cloud Platforms", level: "82%" }
      ]
    }
  ];

  return (
    <div className="App">
      <header className={`header ${headerHidden ? 'hidden' : ''}`}>
        <div className="logo">
          <img src="./logo/Thlaes.png" alt="Thales Logo" onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }} />
          <span style={{display: 'none'}} className='name-style'>Thales</span>
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
          I'm a <span className="hover-underline">Software Engineer</span> with <span className="hover-underline">3+ years of experience</span> building <span className="hover-underline">scalable web applications</span> and <span className="hover-underline">modern software solutions</span>.
        </p>
      </div>

      <div className="scroll-indicator">
        <div className="mouse"></div>
        <div className="scrolltext">Scroll</div>
      </div>

      <section id="about" className="about-section section">
        <h2 className="section-title">.about<span className="h2">("me")</span></h2>
        <div className="about-text">
          <p>I'm a passionate Software Engineer based in Morocco with over 3 years of experience in developing scalable web applications and modern software solutions. I specialize in full-stack development using cutting-edge technologies and best practices to deliver high-quality, maintainable code.</p>
          
          <p>My expertise encompasses frontend technologies like React.js and TypeScript, backend development with Node.js and Express.js, and database management using both SQL (PostgreSQL, MySQL) and NoSQL (MongoDB) solutions. I'm proficient with modern development tools including Git, Docker, and cloud platforms like AWS, and I have extensive experience implementing CI/CD pipelines, automated testing, and performance optimization strategies.</p>
          
          <p>Currently, I'm actively seeking new opportunities as a Software Engineer, preferably in remote or hybrid roles. I thrive in dynamic environments where I can contribute to innovative projects, mentor junior developers, and continuously expand my technical expertise. I'm passionate about clean code architecture, software design patterns, and staying current with emerging technologies in the ever-evolving software development landscape.</p>
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
        
        <div className="timeline-container">
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-date">2024 - Present</div>
                <h3>Software Engineer</h3>
                <div className="timeline-company">Freelance Developer</div>
                <p>Currently working as a freelance software engineer, developing custom web solutions and applications for various clients. Specializing in modern web technologies, scalable architecture, and cloud deployment solutions.</p>
                <div className="timeline-tech">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                  <span>Express</span>
                  <span>TypeScript</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-date">2022 - 2024</div>
                <h3>Full Stack Developer</h3>
                <div className="timeline-company">Web Development Agency</div>
                <p>Led the development of multiple full-stack web applications, focusing on scalable architecture and modern development practices. Implemented CI/CD pipelines and optimized application performance for enterprise clients.</p>
                <div className="timeline-tech">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>PostgreSQL</span>
                  <span>Docker</span>
                  <span>AWS</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-date">2021 - 2022</div>
                <h3>Frontend Developer</h3>
                <div className="timeline-company">Startup Company</div>
                <p>Developed responsive user interfaces and implemented modern frontend architectures. Collaborated with design teams to create intuitive user experiences and optimized web performance.</p>
                <div className="timeline-tech">
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>CSS3</span>
                  <span>Webpack</span>
                  <span>Git</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-date">2020 - 2021</div>
                <h3>Web Developer Intern</h3>
                <div className="timeline-company">Digital Agency</div>
                <p>Started my journey in web development, learning modern frameworks and best practices. Contributed to various client projects and gained hands-on experience with real-world applications.</p>
                <div className="timeline-tech">
                  <span>HTML5</span>
                  <span>CSS3</span>
                  <span>JavaScript</span>
                  <span>PHP</span>
                  <span>MySQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-container">
          <div className="card-1">
            <div className="experience-content">
              <div className="job-header">
                <h3>Software Engineer</h3>
                <div className="date">2024 - Present</div>
              </div>
              
              <div className="company">
                Freelance Developer
                <a className="button" href="https://github.com/Thalesmar">
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
              
              <p style={{textAlign: 'left'}}>
                Currently working as a freelance software engineer, developing custom web solutions and applications for various clients. Specializing in modern web technologies, scalable architecture, and cloud deployment solutions.
              </p>
              
              <div className="project">
                <p style={{textAlign: 'left'}}>- Developed and maintained multiple full-stack applications using React, Node.js, and MongoDB</p>
                <span className="tags">React Node.js MongoDB Express TypeScript</span>
              </div>
              
              <div className="project">
                <p style={{textAlign: 'left'}}>- Implemented responsive designs and optimized application performance for better user experience</p>
                <span className="tags">HTML5 CSS3 JavaScript Responsive Design</span>
              </div>
              
              <div className="project">
                <p>- Created and integrated RESTful APIs for seamless data management and third-party integrations</p>
                <span className="tags">Node.js Express MongoDB API Development</span>
              </div>
              
              <div className="skillscards">
                <span>React</span>
                <span>Node.js</span>
                <span>MongoDB</span>
                <span>TypeScript</span>
                <span>Express</span>
              </div>
            </div>
          </div>

          <div className="card-2">
            <div className="experience-content">
              <div className="job-header">
                <h3>Full Stack Developer</h3>
                <div className="date">2022 - 2024</div>
              </div>
              <div className="company">
                Web Development Agency
                <a className="button" href="https://github.com/Thalesmar">
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            
              <p>
                Led the development of multiple full-stack web applications, focusing on scalable architecture and modern development practices. Implemented CI/CD pipelines and optimized application performance for enterprise clients.
              </p>
              
              <div className="project">
                <p>- Developed enterprise-level applications with microservices architecture and containerization</p>
                <span className="tags">React Node.js PostgreSQL Docker AWS</span>
              </div>
            
              <div className="project">
                <p>- Implemented automated testing strategies and CI/CD pipelines for improved development workflow</p>
                <span className="tags">Jest Cypress GitHub Actions CI/CD</span>
              </div>
            
              <div className="project">
                <p>- Optimized database performance and implemented caching strategies for better scalability</p>
                <span className="tags">PostgreSQL Redis Performance Optimization</span>
              </div>
              
              <div className="skillscards">
                <span>React</span>
                <span>Node.js</span>
                <span>PostgreSQL</span>
                <span>Docker</span>
                <span>AWS</span>
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
            <img src="./logo/Thlaes.png" alt="Thales Logo" onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }} />
            <span style={{display: 'none'}} className='name-style'>Thales</span>
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