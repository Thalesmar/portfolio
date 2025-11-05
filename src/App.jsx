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
    // {
    //   title: "VisionUI",
    //   description: "A modern CSS framework and UI component library built with pure CSS. Features responsive design, customizable components, and modern design principles for building beautiful user interfaces.",
    //   techStack: ["CSS", "HTML", "JavaScript", "Responsive Design"],
    //   links: {
    //     github: "https://github.com/Thalesmar/VisionUI"
    //   }
    // },
    // {
    //   title: "Workout Tracker App",
    //   description: "A comprehensive fitness tracking application that helps users monitor their workouts, track progress, and maintain fitness goals. Features user authentication and data visualization.",
    //   techStack: ["CSS", "JavaScript", "HTML", "Local Storage"],
    //   links: {
    //     github: "https://github.com/Thalesmar/Workout-Tracker-App"
    //   }
    // },
    // {
    //   title: "JavaScript Fun Practice",
    //   description: "A collection of functional programming exercises and challenges in JavaScript. Forked from Zero to Mastery, featuring practical exercises to improve JavaScript skills and problem-solving abilities.",
    //   techStack: ["JavaScript", "Functional Programming", "ES6+", "Problem Solving"],
    //   links: {
    //     github: "https://github.com/Thalesmar/JS_Fun_Practice"
    //   }
    // },
    // {
    //   title: "JavaScript Color Picker",
    //   description: "An interactive color picker application built with vanilla JavaScript. Features real-time color selection, hex code generation, and a user-friendly interface for designers and developers.",
    //   techStack: ["JavaScript", "HTML", "CSS", "DOM Manipulation"],
    //   links: {
    //     github: "https://github.com/Thalesmar/JavaScript-Color-Picker"
    //   }
    // },
    // {
    //   title: "Gradient Background Generator",
    //   description: "A dynamic gradient background generator that creates beautiful color combinations. Users can customize colors, angles, and export CSS code for their projects.",
    //   techStack: ["JavaScript", "CSS", "HTML", "Color Theory"],
    //   links: {
    //     github: "https://github.com/Thalesmar/Gradient-Background"
    //   }
    // },
        {
      title: "SweetBite-Bakery-Fresh-Cakes-Pastries-Sandwiches",
      description: "A modern, responsive landing page for SweetBite Bakery built with React and Vite. Features a beautiful image slider, product categories, and dark mode support.",
      techStack: ["React", "CSS", "JavaScript", "Vite", "Responsive Design"],
      links: {
        live : "https://thalesmar.github.io/SweetBite-Bakery-Fresh-Cakes-Pastries-Sandwiches/",
        github: "https://github.com/Thalesmar/SweetBite-Bakery-Fresh-Cakes-Pastries-Sandwiches"
      }
    },
    {
      title: "Personal Portfolio",
      description: "A modern, responsive portfolio website showcasing my work and skills. Features smooth animations, interactive elements, and optimized performance for professional presentation.",
      techStack: ["React", "CSS", "JavaScript", "Responsive Design"],
      links: {
        live: "https://thales-2y8.pages.dev/",
        github: "https://github.com/Thalesmar/portfolio"
      }
    }
  ];

  const skills = [
    {
      category: "Programming Languages",
      items: [
        { name: "JavaScript/React", level: "92%" },
        { name: "Python", level: "85%" },
        {name: "C", level: "50%"},
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
    // {
    //   category: "Backend & DevOps",
    //   items: [
    //     { name: "Node.js/Express", level: "88%" },
    //     { name: "Docker/Kubernetes", level: "80%" },
    //     { name: "AWS/Cloud Platforms", level: "82%" }
    //   ]
    // }
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
            <li><a href="#about" className="botona" onClick={(e) => handleNavClick(e, '#skills-section')}>.skills()</a></li>
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
            I'm an aspiring <span className="hover-underline"> Web Developer</span> focused on building
            <span className="hover-underline"> real-world projects </span> and mastering
            <span className="hover-underline"> modern web technologies </span>. I specialize in
            <span className="hover-underline"> responsive interfaces </span> and aim to grow into
            <span className="hover-underline"> full-stack and DevSecOps development </span>.
        </p>
      </div>

      <div className="scroll-indicator">
        <div className="mouse"></div>
        <div className="scrolltext">Scroll</div>
      </div>

      <section id="about" className="about-section section">
        <h2 className="section-title">.about<span className="h2">("me")</span></h2>
        <div className="about-text">
          <p>I'm a Junior Software Engineer based in Morocco, passionate about web development and modern software solutions. I have experience building responsive and scalable web applications, and I'm continuously expanding my skills in full-stack development using the latest technologies.</p>

            <p>My current focus is on frontend development with React.js and JavaScript, and backend development with Node.js and Express.js. I have experience working with databases like MongoDB and SQL solutions, and I'm learning to work with development tools such as Git, Docker, and cloud platforms. I'm also exploring best practices in CI/CD, automated testing, and performance optimization.</p>

            <p>Currently, I'm looking for opportunities to grow as a Software Engineer, ideally in remote or hybrid roles. I enjoy contributing to innovative projects, learning new technologies, and improving my coding skills while following clean code principles and software design patterns. My goal is to become a well-rounded developer capable of delivering high-quality and maintainable software.</p>
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
          <div className="timeline-date">2022 - Present</div>
          <h3>Junior Web Developer</h3>
          <div className="timeline-company">Self-Taught / Portfolio Building</div>
          <p>
            Actively learning and building real-world web projects using modern
            technologies. Focusing on responsive UI, clean code, and improving
            problem-solving skills while transitioning to backend development.
          </p>
          <div className="timeline-tech">
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>React</span>
            <span>Git & GitHub</span>
          </div>
        </div>
      </div>

      <div className="timeline-item">
        <div className="timeline-dot"></div>
        <div className="timeline-content">
          <div className="timeline-date">2023 - 2024</div>
          <h3>Programming Foundations</h3>
          <div className="timeline-company">C Language & Algorithms</div>
          <p>
            Learned programming fundamentals, memory management, and algorithmic thinking
            using C. Developed problem-solving skills and a solid base in software logic.
          </p>
          <div className="timeline-tech">
            <span>C</span>
            <span>Algorithms</span>
            <span>Problem Solving</span>
          </div>
        </div>
      </div>

      <div className="timeline-item">
        <div className="timeline-dot"></div>
        <div className="timeline-content">
          <div className="timeline-date">2025 (Upcoming)</div>
          <h3>Full-Stack Developer Path</h3>
          <div className="timeline-company">Self-Taught Roadmap</div>
          <p>
            Starting backend development, focusing on Node.js, Express, databases, and deployment.
            Goal: build full-stack applications and strengthen DevSecOps fundamentals.
          </p>
          <div className="timeline-tech">
            <span>Node.js</span>
            <span>Express</span>
            <span>MongoDB</span>
            <span>APIs</span>
            <span>Linux</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

      <section className="skills-section section" id="skills-section">
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
        <p className="contact-text">I am always eager to take on new challenges and opportunities to learn and grow. If you have a project or idea where I could contribute, I would love to hear from you. Feel free to reach out via the contact button below or through any of my social media links.</p>
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
