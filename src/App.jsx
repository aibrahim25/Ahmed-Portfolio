import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Code, Database, Globe, Server, Smartphone, Award, Calendar, GraduationCap, Briefcase, User, Menu, X } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const cursorRef = useRef(null);

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over interactive elements
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button');
      
      setIsHoveringLink(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll effect for section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Section detection
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax effect setup
  useEffect(() => {
    const elements = document.querySelectorAll('[data-parallax]');
    
    const handleParallax = () => {
      elements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax'));
        const yPos = -(scrollY * speed);
        el.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };
    
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, [scrollY]);

  const scrollToSection = (section) => {
    setActiveSection(section.toLowerCase());
    setIsMenuOpen(false);
    document.getElementById(section.toLowerCase())?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const skills = [
    { category: 'Languages', items: ['C++', 'Python', 'Java', 'JavaScript', 'HTML/CSS', 'MySQL', 'OCaml', 'Bash'], icon: Code },
    { category: 'Libraries & Frameworks', items: ['React.js', 'Flask', 'Pandas', 'NumPy', 'Pytest', 'SFML'], icon: Database },
    { category: 'Databases', items: ['MySQL', 'DynamoDB', 'SQLite'], icon: Server },
    { category: 'Developer Tools', items: ['Git', 'Docker', 'AWS Lambda', 'Visual Studio', 'XCode', 'Postman'], icon: Globe },
    { category: 'Technologies', items: ['REST APIs', 'OOP', 'CI/CD Pipelines', 'Cloud Computing'], icon: Smartphone }
  ];

  const experiences = [
    {
      title: 'Research Assistant',
      company: 'University Of Massachusetts Lowell',
      period: 'Sep 2024 – Present',
      location: 'Lowell, MA',
      highlights: [
        'Developed Python-based web application for real-time weather data visualization',
        'Built automated data pipelines with hazard detection thresholds',
        'Created interactive dashboards using Matplotlib/Plotly for climate analysis',
        'Contributed to research with accessible visualizations for field decision-making'
      ]
    },
    {
      title: 'Software Engineering COOP',
      company: 'Flagship IT',
      period: 'Oct 2023 – May 2024',
      location: 'Wilmington, MA',
      highlights: [
        'Collaborated with 5 developers on 3 key features, reducing processing time by 15%',
        'Optimized chat application for 500+ concurrent users with 99% uptime',
        'Decreased system downtime by 25% through effective troubleshooting',
        'Led code review sessions, resolving 85% of defects within 24 hours'
      ]
    }
  ];

  const projects = [
    {
      title: 'Pain Prediction in Neuroscience',
      period: 'Mar 2025 – May 2025',
      description: 'AI model predicting pain levels from physiological sensor data using custom neural networks.',
      highlights: [
        'Achieved 85%+ accuracy in pain level classification',
        'Built neural network from scratch using NumPy',
        'Collaborated with neuroscience researchers for model explainability'
      ],
      tech: ['Python', 'NumPy', 'Machine Learning', 'Neural Networks']
    },
    {
      title: 'Serverless Web Application',
      period: 'Sep 2024 – Nov 2024',
      description: 'Scalable web application with serverless architecture and automated deployment.',
      highlights: [
        'Built with AWS Lambda, API Gateway, DynamoDB, and S3',
        'Implemented CI/CD pipeline using GitHub Actions',
        'Achieved zero-downtime updates with horizontal scaling'
      ],
      tech: ['AWS', 'React.js', 'DynamoDB', 'CI/CD', 'GitHub Actions']
    },
    {
      title: 'Mosque Website',
      period: 'Jan 2023 – Apr 2023',
      description: 'Responsive community website with modern design and optimized performance.',
      highlights: [
        '95% mobile compatibility across 20+ device types',
        'Reduced page load time by 35%',
        'Implemented 12+ interactive UI components'
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      link: 'https://wmccmosque.org/'
    }
  ];

  const navItems = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference bg-white"
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
          scale: isHoveringLink ? 2 : 1,
          opacity: isHoveringLink ? 0.7 : 0.5
        }}
        transition={{ type: 'spring', mass: 0.1 }}
      />

      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%'
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              Ahmed Ibrahim
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`relative overflow-hidden hover:text-blue-400 transition-colors duration-300 ${
                    activeSection === item.toLowerCase() ? 'text-blue-400' : 'text-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"
                      layoutId="navIndicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="md:hidden pb-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {navItems.map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left py-2 hover:text-blue-400 transition-colors duration-300"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear'
            }}
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div 
            className="mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1 mb-8"
              whileHover={{ scale: 1.05 }}
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                delay: 0.5,
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.7 }}
  >
    <img 
      src="/my-photo.png" 
      alt="Ahmed Ibrahim"
      className="w-full h-full object-cover"
    />
  </motion.div>
</div>
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear'
              }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-[length:200%_200%]"
            >
              Ahmed Ibrahim
            </motion.span>
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-3xl mb-6 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Software Engineer & Recent Graduate
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Passionate about building innovative solutions with modern technologies. 
            Recent Computer Science graduate with hands-on experience in full-stack development, 
            AI/ML, and cloud computing.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.a 
              href="mailto:ahmedmohsen007@outlook.com" 
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                <Mail className="mr-2" size={20} />
                Get In Touch
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
            <motion.button 
              onClick={() => scrollToSection('Projects')} 
              className="relative overflow-hidden border-2 border-blue-400 hover:bg-blue-400 hover:text-slate-900 px-8 py-3 rounded-full font-semibold transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View My Work</span>
              <span className="absolute inset-0 bg-blue-400 opacity-0 hover:opacity-20 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {[
              { icon: Linkedin, link: 'https://www.linkedin.com/in/ahmed00715' },
              { icon: Mail, link: 'mailto:ahmedmohsen007@outlook.com' },
              { icon: Phone, link: 'tel:978-242-4965' }
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
                whileHover={{ y: -5, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <item.icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} className="text-gray-400" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:shadow-lg hover:shadow-blue-400/20 transition-all"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <GraduationCap className="text-blue-400 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Education</h3>
                </div>
                <p className="text-gray-300 mb-2">Bachelor of Science in Computer Science</p>
                <p className="text-gray-400 mb-4">University of Massachusetts Lowell • May 2025</p>
                <p className="text-sm text-gray-400">
                  Relevant Coursework: Data Structures, Analysis of Algorithms, Cloud Computing, 
                  AI, Mobile Programming, Operating Systems, and more.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:shadow-lg hover:shadow-purple-400/20 transition-all"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <MapPin className="text-purple-400 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Location</h3>
                </div>
                <p className="text-gray-300">Boston, MA</p>
                <p className="text-gray-400 text-sm">Open to remote and on-site opportunities</p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div 
                className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 border border-white/10 hover:shadow-lg hover:shadow-blue-400/20 transition-all"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-400">My Journey</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  I'm a recent Computer Science graduate with a passion for creating innovative software solutions. 
                  My journey has taken me from learning the fundamentals of programming to building complex 
                  applications using cutting-edge technologies.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Through my co-op experience at Flagship IT and research work at UMass Lowell, I've gained 
                  hands-on experience in full-stack development, AI/ML, and cloud computing. I thrive in 
                  collaborative environments and enjoy solving complex problems with elegant solutions.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  I'm excited to bring my skills and enthusiasm to new challenges in the software engineering world.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-black/20 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            Experience
          </motion.h2>
          
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-2">{exp.title}</h3>
                    <p className="text-xl text-gray-300 mb-2">{exp.company}</p>
                    <p className="text-gray-400">{exp.location}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <motion.span 
                      className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full text-sm font-semibold"
                      whileHover={{ scale: 1.05 }}
                    >
                      {exp.period}
                    </motion.span>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {exp.highlights.map((highlight, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0" />
                      <span className="text-gray-300">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            Featured Projects
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/20"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-blue-400">{project.title}</h3>
                  {project.link && (
                    <motion.a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  )}
                </div>
                
                <p className="text-sm text-gray-400 mb-4">{project.period}</p>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {project.highlights.map((highlight, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-400">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <motion.span 
                      key={i} 
                      className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-3 py-1 rounded-full text-xs font-medium border border-blue-400/30 hover:border-blue-400/60 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-black/20 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            Technical Skills
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {skills.map((skillSet, index) => {
              const IconComponent = skillSet.icon;
              return (
                <motion.div 
                  key={index}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-6">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg mr-4"
                      whileHover={{ rotate: 15 }}
                      transition={{ type: 'spring' }}
                    >
                      <IconComponent size={24} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-blue-400">{skillSet.category}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {skillSet.items.map((skill, i) => (
                      <motion.span 
                        key={i} 
                        className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-3 py-2 rounded-lg text-sm font-medium border border-blue-400/30 hover:border-blue-400/60 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            Let's Connect
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I'm always interested in new opportunities and collaborations. 
            Feel free to reach out if you'd like to discuss potential projects or just connect!
          </motion.p>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.a 
              href="mailto:ahmedmohsen007@outlook.com" 
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <Mail className="mx-auto mb-4 text-blue-400" size={32} />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-400">ahmedmohsen007@outlook.com</p>
            </motion.a>
            
            <motion.a 
              href="tel:978-242-4965" 
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/20"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <Phone className="mx-auto mb-4 text-purple-400" size={32} />
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-400">978-242-4965</p>
            </motion.a>
            
            <motion.a 
              href="https://www.linkedin.com/in/ahmed00715" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <Linkedin className="mx-auto mb-4 text-blue-400" size={32} />
              <h3 className="text-lg font-semibold mb-2">LinkedIn</h3>
              <p className="text-gray-400">Connect with me</p>
            </motion.a>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-white/10 hover:shadow-lg hover:shadow-blue-400/20 transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Ready to Start Something Amazing?</h3>
            <p className="text-gray-300 mb-6">
              Whether you're looking for a dedicated team member, have an exciting project in mind, 
              or just want to chat about technology and innovation, I'd love to hear from you.
            </p>
            <motion.a 
              href="mailto:ahmedmohsen007@outlook.com" 
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full font-semibold transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Talk
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/40 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 md:mb-0">
              <motion.h3 
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Ahmed Ibrahim
              </motion.h3>
              <p className="text-gray-400 mt-1">Software Engineer & Problem Solver</p>
            </div>
            
            <div className="flex space-x-6">
              {[
                { icon: Linkedin, link: 'https://www.linkedin.com/in/ahmed00715', label: 'LinkedIn' },
                { icon: Mail, link: 'mailto:ahmedmohsen007@outlook.com', label: 'Email' },
                { icon: Phone, link: 'tel:978-242-4965', label: 'Phone' }
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : '_self'}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 p-3 rounded-full hover:bg-white/10"
                  whileHover={{ y: -5, scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={item.label}
                >
                  <item.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-8 pt-8 border-t border-white/10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-400">
              © 2025 Ahmed Ibrahim. Crafted with passion and modern web technologies.
            </p>
            <motion.div 
              className="mt-4 flex justify-center space-x-4 text-sm text-gray-500"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span>Built with React & Framer Motion</span>
              <span>•</span>
              <span>Deployed with ❤️</span>
            </motion.div>
          </motion.div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {scrollY > 500 && (
          <motion.button
            className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-lg hover:shadow-blue-400/50 transition-all duration-300 z-40"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown size={20} className="rotate-180" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Loading Screen Animation */}
      <AnimatePresence>
        {/* This could be added for initial load animation */}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;