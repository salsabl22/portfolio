import { useState, useEffect, useRef } from 'react'
import './App.css'
import { FaInstagram, FaLinkedin, FaGithub, FaExternalLinkAlt, FaEnvelope, FaMapPin, FaMoon, FaSun } from 'react-icons/fa';
import fotosalsa from './assets/fotosalsa.png';
import fotosalsa2 from './assets/fotosalsa2.png';
import resumePdf from './assets/Salsabila-resume.pdf';
import pojokreligi1 from './assets/pojokreligi1.png';
import pojokreligi2 from './assets/pojokreligi2.png';
import gestura1 from './assets/gestura1.png';
import gestura2 from './assets/gestura2.png';
import pixel1 from './assets/pixel1.png';
import pixel2 from './assets/pixel2.png';
import gemi from './assets/gemi.jpg';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true); 
  const [mounted, setMounted] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    about: false,
    projects: false,
    experience: false,
    contact: false,
  });
     
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const homeRef = useRef(null);
  const contactRef = useRef(null);

  const navigationItems = [
    { id: 'home', label:'Home'},
    { id: 'about', label:'About'},
    { id: 'projects', label:'Projects'},
    { id: 'experience', label:'Experience'},
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-200px 0px -200px 0px',
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        console.log(`Section ${entry.target.dataset.section} is intersecting:`, entry.isIntersecting, 'Ratio:', entry.intersectionRatio);
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          const sectionName = entry.target.dataset.section;
          setVisibleSections((prev) => {
            if (!prev[sectionName]) {
              return {
                ...prev,
                [sectionName]: true,
              };
            }
            return prev;  
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const refs = [homeRef, aboutRef, projectsRef, experienceRef, contactRef];
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
        console.log(`Observing ${ref.current.dataset.section}`);
      }
    });

    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2; // Use midpoint of viewport for active section detection
      let current = 'home';

      refs.forEach((ref) => {
        if (ref.current) {
          const sectionTop = ref.current.offsetTop;
          const sectionHeight = ref.current.offsetHeight;
          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = ref.current.dataset.section;
          }
        }
      });

      setActiveSection(current);

      // Existing logic for visibleSections
      refs.forEach((ref) => {
        if (ref.current) {
          const sectionTop = ref.current.offsetTop;
          const sectionHeight = ref.current.offsetHeight;
          if (scrollY > sectionTop + sectionHeight * 0.1) {
            const sectionName = ref.current.dataset.section;
            setVisibleSections((prev) => {
              if (!prev[sectionName]) {
                return {
                  ...prev,
                  [sectionName]: true,
                };
              }
              return prev;
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      refs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToRef = (ref) => {
    if (!ref || !ref.current) return;
    const NAVBAR_HEIGHT = 80; // px
    const top = ref.current.getBoundingClientRect().top + window.pageYOffset - NAVBAR_HEIGHT;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  };

  const handleNavClick = (id) => {
    setActiveSection(id);
    if (id !== 'home') {
      setVisibleSections((prev) => ({
        ...prev,
        [id]: true,
      }));
    }

    if (id === 'home') {
      scrollToRef(homeRef);
    } else if (id === 'about') {
      scrollToRef(aboutRef);
    } else if (id === 'projects') {
      scrollToRef(projectsRef);
    } else if (id === 'experience') {
      scrollToRef(experienceRef);
    } else if (id === 'contact') {
      scrollToRef(contactRef);
    }
  };
   
    
  const Home = () => (
    <div ref={homeRef} data-section="home" className="min-h-screen `bg-gradient-to-b ${isDarkMode ? 'from-black to-black' : 'from-white via-gray-100 to-blue-100'}` relative overflow-hidden">
      {/* Navigation */}
      <nav className={`flex justify-between items-center p-2 md:p-2 md:px-5 px-4 transition-all duration-1000 fixed top-0 left-0 right-0 z-50 backdrop-blur-sm ${isDarkMode ? 'bg-black/80 border-b border-purple-500/20' : 'bg-white/90 shadow-md border-b border-pink-400/20'} ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
        <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Salsabila.</div>
        <div className="hidden md:flex space-x-8">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-black hover:text-pink-400'} transition-colors ${
                activeSection === item.id ? 'text-pink-400 font-medium glow-effect' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex transform transition duration-300 hover:scale-110">
          <button
            onClick={() => handleNavClick('contact')}
            className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-all duration-300 shadow-lg shadow-pink-500/50"
          >
            Contact Me
          </button>
        </div>
      </nav>

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed top-20 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
          isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-black hover:bg-gray-200'
        }`}
      >
        {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>

      {/* Hero Section */}
      <div className="relative flex flex-col md:flex-row justify-center items-center gap-6 px-6 sm:px-6 md:px-8 pt-25 md:pt-25">
        {/* Hey Text*/}
        <div className={`static md:left-20 top-0 left-0 transform -translate-y-1/2 translate-x-0 z-10
          transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-light `text-${isDarkMode ? 'white' : 'black'}` glow-text">
            Hey,
          </h1>
        </div>

        {/* Profile Image - Center */}
        <div className={`flex transition-all duration-1000 delay-200 ${
          mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <img 
            src={fotosalsa} 
            alt="Profile Image" 
            className="w-64 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl shadow-purple-600/50 mask-b-from-20% mask-b-to-95% object-cover"
          />
        </div>

        {/* There Text - Right Side */}
        <div className={`static right-8 md:right-20 top-1/4 transform z-10
          transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-light `text-${isDarkMode ? 'white' : 'black'}` glow-text">
            there!
          </h1>
        </div>

        {/* Bottom Left Text */}
        <div className={`absolute left-4 top-[36rem] md:top-120 md:bottom-0 md:left-8 transition-all duration-1000 delay-300 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-left">
            <div className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-black `text-${isDarkMode ? 'white' : 'black'}` glow-text">I AM</div>
            <div className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-black `text-${isDarkMode ? 'white' : 'black'}` glow-text">SALSABILA</div>
          </div>
        </div>


        {/* Bottom Right Text */}
        <div className={`absolute right-4 top-[38rem] md:top-105 md:bottom-8 md:right-8 transition-all duration-1000 delay-300 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-right">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-pink-400 glow-text">FRONT</div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-pink-400 glow-text">END</div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-pink-400 glow-text">DEVELOPER</div>
          </div>
        </div>
      </div>

      
      {/* Mobile Navigation */}
      <div className={`md:hidden fixed bottom-4 left-0 right-0 px-4 bg-black/90 backdrop-blur-md rounded-full p-2 z-50 border border-purple-500/20 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="flex flex-wrap justify-center gap-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-2 py-2 rounded-full text-xs transition-colors ${
                activeSection === item.id 
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/50' 
                  : 'text-white hover:bg-gray-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // about section
  const About = () => {
    return (
      <section
        ref={aboutRef}
        data-section="about"
        className={`min-h-screen flex flex-col md:flex-row justify-center items-center bg-gradient-to-b ${isDarkMode ? 'from-black via-gray-900 to-purple-950' : 'from-white via-gray-100 to-purple-200'} gap-10 px-6 md:px-20 py-16 transition-all duration-1000 ${
          visibleSections.about ? 'opacity-100 translate-y-0 animate-fadeIn' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Foto di sebelah kiri */}
        <img 
         src={fotosalsa2} 
         alt="Profile Photo" 
         className="w-64 h-72 md:w-80 md:h-96 rounded-3xl flex-shrink-0 object-cover"
       />
       

        {/* Konten di sebelah kanan */}
        <div className="flex flex-col max-w-xl">
          <h2 className={`text-4xl font-extrabold mb-2 text-left ${isDarkMode ? 'text-white' : 'text-pink-500'} glow-text`}>GET TO KNOW ME</h2>
          <h3 className="text-pink-400 text-lg font-semibold mb-6 text-left">Salsabila – Front-End Developer</h3>
          <p className="`text-${isDarkMode ? 'gray-300' : 'black-300'}` mb-8 leading-relaxed text-justify">
            Hi! I'm Salsabila, an Informatics Engineering student with a strong interest in software engineering, artificial intelligence, data analytics, and digital transformation. I have experience developing AI-powered systems, web applications, and data-driven solutions through academic, organizational, and competition projects. Passionate about solving real-world problems with technology, I continuously explore innovative solutions that combine technical excellence, user experience, and business impact. I am particularly interested in how technology and data can drive innovation across industries, including financial services and capital markets.
          </p>

          {/* Button Download CV */}
          <a 
            href={resumePdf} 
            download 
            className="inline-block bg-gradient-to-r bg-pink-500 text-white font-bold px-6 py-3 rounded-full hover:scale-105 active:scale-105 hover:from-gray-800 hover:to-gray-800 transition-all duration-300 mb-6 max-w-max shadow-lg shadow-pink-500/50"
          >
            Download CV
          </a>

          {/* Social Media Icons */}
          <div className="flex space-x-6 text-2xl `text-${isDarkMode ? 'white' : 'black'}`">
            <a href="https://www.instagram.com/salsabl22_" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="hover:text-pink-400 transition-colors duration-300 hover:scale-110" />
            </a>
            <a href="https://www.linkedin.com/in/salsabilatech/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="hover:text-blue-400 transition-colors duration-300 hover:scale-110" />
            </a>
            <a href="https://github.com/salsabl22" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub className="hover:text-gray-300 transition-colors duration-300 hover:scale-110" />
            </a>
          </div>
        </div>
      </section>
    );
  };


  // projects section
  const Projects = () => {
    const [filter, setFilter] = useState('website'); 
    const [modalProject, setModalProject] = useState(null);
    const [currentImageIdx, setCurrentImageIdx] = useState(0);

    const projectsData = {
      website: [
        {
          id: 1,
          title: 'Pojok Religi',
          shortDesc: 'Built an AI-powered knowledge assistant designed to answer religious questions across multiple faiths using Large Language Models.',
          longDesc: `Built an AI-powered knowledge assistant designed to answer religious questions across multiple faiths using Large Language Models.`,
          images: [
            pojokreligi1,
            pojokreligi2,
          ],
          githubLink: 'https://github.com/salsabl22/pojok_religi',
          previewLink: 'https://website-project-1.demo',
        },
        {
          id: 2,
          title: 'Gestura',
          shortDesc: 'Developed a computer vision application capable of recognizing hand gestures and translating them into alphabet-based sign language using OpenCV and MediaPipe.',
          longDesc: `Developed a computer vision application capable of recognizing hand gestures and translating them into alphabet-based sign language using OpenCV and MediaPipe.`,
          images: [
            gestura1,
            gestura2,
          ],
          githubLink: 'https://github.com/salsabl22/gestura',
          previewLink: 'https://website-project-2.demo',
        },
        {
          id: 3,
          title: 'Pixelated Receiptify',
          shortDesc: 'Developed a Spotify analytics web application collaboration with my partner that generates downloadable pixel-art inspired music receipts based on user listening history.',
          longDesc: `Developed a Spotify analytics web application collaboration with my partner that generates downloadable pixel-art inspired music receipts based on user listening history.`,
          images: [
            pixel1,
            pixel2,
          ],
          githubLink: 'https://github.com/Edwin-Jaya/Pixelated-Receiptify',
          previewLink: 'https://website-project-2.demo',
        },
        {
          id: 4,
          title: 'Gemi AI',
          shortDesc: 'A collaboration project build an AI-powered personal finance assistant providing financial recommendations based on spending patterns and user queries.',
          longDesc: `A collaboration project build an AI-powered personal finance assistant providing financial recommendations based on spending patterns and user queries.`,
          images: [
            gemi
          ],
          githubLink: '',
          previewLink: 'https://website-project-2.demo',
        },
      ],
    };

    const currentProjects = filter === 'website' ? projectsData.website : projectsData.data;

    const closeModal = () => setModalProject(null);

    const nextImage = () => {
      if (!modalProject) return;
      setCurrentImageIdx((prev) => (prev + 1) % modalProject.images.length);
    };
    const prevImage = () => {
      if (!modalProject) return;
      setCurrentImageIdx((prev) => (prev - 1 + modalProject.images.length) % modalProject.images.length);
    };

    return (
      <section
        ref={projectsRef}
        data-section="projects"
        className={`min-h-screen flex flex-col justify-center items-center bg-gradient-to-b ${isDarkMode ? 'from-purple-950 via-gray-900 to-black' : 'from-purple-200 via-gray-100 to-white'} px-6 py-16 transition-all duration-1000 ${
          visibleSections.projects ? 'opacity-100 translate-y-0 animate-fadeIn' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Title & Subtitle */}
        <h2 className="text-4xl font-extrabold mb-2 text-${isDarkMode ? 'white' : 'black'} glow-text">PROJECTS</h2>
        <p className="text-center max-w-xl mb-8 `text-${isDarkMode ? 'white' : 'black'}`">
          Explore a selection of my recent projects, from innovative front-end designs to insightful data and machine learning solutions.
        </p>

        {/* Filter Buttons */}
        <div className="flex space-x-6 mb-12">
          <button
            onClick={() => setFilter('website')}
            className={`relative px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300 ${
              filter === 'website'
                ? `${isDarkMode ? ' bg-pink-500 text-white shadow-lg shadow-pink-500/50' : 'bg-white text-black shadow-lg shadow-gray-500/50'}`
                : `${isDarkMode ? 'bg-white text-black border-2 border-pink-400 shadow-sm hover:bg-gray-400' : 'bg-gray-200 text-gray-700 border border-pink-400 shadow-sm hover:bg-gray-300'}`
            }`}
          >
            Website
          </button>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl w-full">
          {currentProjects.map((project) => (
            <div 
              key={project.id}
              className={`rounded-lg border shadow-lg flex flex-col overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-105 ${isDarkMode ? 'bg-gray-800 border-purple-500/20 hover:border-pink-400' : 'bg-white border-pink-400/50 hover:border-pink-500'}`}
              style={{ boxShadow: '6px 8px 20px rgba(0,0,0,0.5)' }}
            >
              {/* Image */}
              <div className=" h-48 rounded-t-lg overflow-hidden">
                <img 
                  src={project.images[0]} 
                  alt={project.title} 
                  className="w-full h-full object-contain" 
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className={`font-bold text-lg mb-2 text-${isDarkMode ? 'white' : 'black'}`}>{project.title}</h3>
                <p className={`text-${isDarkMode ? 'gray-300' : 'gray-700'} flex-grow leading-relaxed`}>{project.shortDesc}</p>
                {/* Buttons Know More & Preview */}
                <div className="flex justify-start gap-4 mt-5 bg-transparent">
                  <button
                    onClick={() => {
                      setModalProject(project);
                      setCurrentImageIdx(0);
                    }}
                    className="bg-gradient-to-r bg-pink-500  text-white py-2 px-4 rounded-full font-semibold shadow-md hover:from-purple-800 hover:to-purple-800 transition-all duration-300 shadow-lg shadow-pink-500/50"
                  >
                    Know More
                  </button>

                  <a
                    href={project.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-pink-400 text-pink-400 py-2 px-4 rounded-full font-semibold flex items-center gap-2 hover:bg-pink-50 hover:text-black transition-all duration-300 shadow-sm"
                  >
                    Preview <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Popup */}
        {modalProject && (
          <div 
            className="fixed inset-0 bg-blur backdrop-blur-md flex justify-center items-center p-4 z-50"
            onClick={closeModal}
          >
            <div 
              className={`bg-${isDarkMode ? 'black' : 'white'} rounded-4xl max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative border border-${isDarkMode ? 'purple-500/20' : 'blue-400/20'}`}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={closeModal} 
                className="absolute top-4 right-4 text-gray-300 hover:text-white font-bold text-2xl"
                aria-label="Close modal"
              >
                &times;
              </button>

              {/* Title */}
              <h3 className={`text-3xl font-extrabold text-center mt-8 mb-6 px-6 text-${isDarkMode ? 'white' : 'black'}`}>{modalProject.title}</h3>
              {/* Carousel */}
              <div className="relative w-full max-w-3xl mx-auto">
                <img 
                  src={modalProject.images[currentImageIdx]} 
                  alt={`${modalProject.title} Image ${currentImageIdx + 1}`} 
                  className="w-full h-64 md:h-80 object-contain rounded-md shadow-md"
                />
                {modalProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute top-1/2 left-2 -translate-y-1/2 text-xl hover:scale-125 active:scale-125 font-extrabold text-white p-2 transition-colors"
                      aria-label="Previous image"
                    >
                      ⮜
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute top-1/2 right-2 -translate-y-1/2 text-xl hover:scale-125 active:scale-125 font-extrabold text-white p-2 transition-colors"
                      aria-label="Next image"
                    >
                      ⮞
                    </button>
                  </>
                )}
              </div>

              {/* Description and GitHub Link */}
              <div className="p-8 max-w-3xl mx-auto">
                <p className={`text-${isDarkMode ? 'gray-300' : 'gray-700'} mb-6 whitespace-pre-line`}>{modalProject.longDesc}</p>                <a 
                  href={modalProject.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500 text-white font-semibold rounded-full shadow-md hover:from-pink-600 hover:to-purple-600 hover:scale-105 active:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/50"
                >
                  <FaGithub size={24} /> View on GitHub
                </a>
              </div>
            </div>
          </div>
        )}

      </section>
    );
  };


  // experience section
  const Experience = () => {
    const experiences = [
      {
        year: '2022-2024',
        role: 'Staff of the Directorate of Program Planning and Development',
        company: 'Forum Generasi Berencana (GenRe) Kota Bandung',
        desc: 'Led a 5-member team while coordinating organizational programs and supporting human resource development initiatives.',
      },
      {
        year: '2023',
        role: 'Public Relations, Sponsorship, and Media Partner Division Staff',
        company: 'Election of GenRe Kota Bandung Ambassador',
        desc: 'Managed stakeholder relations and partnership outreach, securing 15+ media partners to support event promotion and execution.',
      },
      {
        year: '2023-2025',
        role: 'Member',
        company: 'CodeLabs UNIKOM',
        desc: 'Participated in software development activities and represented the organization in 5+ national and international technology competitions.',
      },
      {
        year: '2023-2027',
        role: 'Informatics Student',
        company: 'Universitas Komputer Indonesia',
        desc: 'Contributed to AI, web development, and data science initiatives, applying machine learning, NLP, and computer vision to real-world projects.',
      },
    ];

    return (
      <section
        ref={experienceRef}
        data-section="experience"
        className={`min-h-screen flex flex-col justify-center items-center bg-gradient-to-b ${isDarkMode ? 'from-black via-gray-900 to-purple-950' : 'from-white via-gray-100 to-purple-200'} px-6 py-16 transition-all duration-1000 ${
          visibleSections.experience ? 'opacity-100 translate-y-0 animate-fadeIn' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 `text-${isDarkMode ? 'white' : 'black'}` glow-text">EXPERIENCE</h2>
        <p className="`text-${isDarkMode ? 'white' : 'black'}` text-center mb-16 px-6 max-w-2xl text-sm md:text-base">
          My journey as a developer has been full of learning, creativity, and growth.
        </p>

        {/* Timeline Container */}
        <div className="relative w-full max-w-6xl">
          {/* Horizontal Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 rounded-full shadow-sm"></div>
          {/* Vertical Line for Mobile */}
          <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-400 via-purple-400 to-pink-400 rounded-full shadow-sm transform -translate-x-1/2"></div>

          {/* Timeline Items - Desktop (with train animation & duplication) */}
          <div className="hidden md:block relative overflow-hidden
            [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex md:flex-row flex-col md:justify-between items-center md:gap-8 gap-16 relative z-10 w-max animate-experience-train">
              {[...experiences, ...experiences].map((exp, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center md:w-1/3 text-center md:text-left transition-all duration-700 ease-out ${
                    visibleSections.experience
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Connector Dot */} {/* buat animasi */}
                  <div className="relative mb-6 md:mb-8 left-0 right-4.5">
                    <div className="w-6 h-6 bg-gradient-to-r bg-pink-500 rounded-full shadow-lg"></div>
                    <div className="absolute inset-0 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-30"></div>
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-400 font-medium md:hidden">
                      {exp.year}
                    </span>
                  </div>

                  {/* Content Box */}
                  <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-700 hover:border-pink-400 max-w-xs md:max-w-sm">
                    <span className="hidden md:inline-block text-sm text-gray-400 font-semibold mb-2">
                      {exp.year}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <h4 className="text-pink-400 font-semibold mb-3">{exp.company}</h4>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Items - Mobile (single list, centered) */}
          <div className="md:hidden relative z-10 flex flex-col items-center gap-16 w-full">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-center transition-all duration-700 ease-out w-full ${
                  visibleSections.experience
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Connector Dot */}
                <div className="relative mb-6">
                  <div className="w-6 h-6 bg-gradient-to-r bg-pink-500 rounded-full shadow-lg"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-30"></div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-400 font-medium">
                    {exp.year}
                  </span>
                </div>

                {/* Content Box */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-700 hover:border-pink-400 max-w-xs w-full">
                  <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                  <h4 className="text-pink-400 font-semibold mb-3">{exp.company}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  };

  // contact section
  const Contact = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
    });
   
    const handleSubmit = (e) => {
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        e.preventDefault();
        alert('Please fill in all fields.');
        return;
      }
      // Formspree akan handle submit setelah validasi
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
   
    return (
      <section
        ref={contactRef}
        data-section="contact"
        className={`min-h-screen flex flex-col justify-center items-center bg-gradient-to-b ${isDarkMode ? 'from-purple-950 via-gray-900 to-black' : 'from-purple-200 via-gray-100 to-white'} px-6 py-16 relative overflow-hidden transition-all duration-1000 ${
          visibleSections.contact ? 'opacity-100 translate-y-0 animate-fadeIn' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Title */}
        <h2 className={`text-4xl md:text-5xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-black'} glow-text z-10`}>CONTACT ME</h2>
        <p className={`text-center mb-12 px-6 max-w-2xl text-sm md:text-base z-10 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Let's connect! Feel free to reach out for collaborations, questions, or just to say hi.
        </p>

        {/* Main Content  */}
        <div className="flex flex-col md:flex-row gap-16 max-w-6xl w-full items-center z-10">
          {/* Contact Form */}
          <div className="md:w-1/2 w-full">
            <h3 className={`text-2xl font-bold mb-8 text-center md:text-left ${isDarkMode ? 'text-white' : 'text-black'}`}>Send a Message</h3>
            <form onSubmit={handleSubmit} action="https://formspree.io/f/xanrjddr" method="POST" className="space-y-8">
              <input type="hidden" name="_subject" value="New Contact Form Submission from Portfolio" />
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full pb-2 bg-transparent border-b-2 border-gray-600 focus:border-pink-400 text-white placeholder-gray-500 transition-colors duration-300 outline-none"
                  placeholder="Your Name"
                  value={formData.name} onChange={handleChange}
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full pb-2 bg-transparent border-b-2 border-gray-600 focus:border-pink-400 text-white placeholder-gray-500 transition-colors duration-300 outline-none"
                  placeholder="your.email@example.com"
                  value={formData.email} onChange={handleChange}
                />
              </div>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  className="w-full pb-2 bg-transparent border-b-2 border-gray-600 focus:border-pink-400 text-white placeholder-gray-500 transition-colors duration-300 outline-none resize-none"
                  placeholder="Your message here..."
                  value={formData.message} onChange={handleChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-pink-500/50"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & Social Media */}
          <div className="md:w-1/2 w-full flex flex-col items-center md:items-start space-y-12">
            {/* Contact Details - Floating Style */}
            <div className="text-center md:text-left">
              <h3 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FaEnvelope className="text-pink-400 text-2xl mt-1 flex-shrink-0" />
                  <div className="text-left md:text-left flex-1">
                    <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>Email</p>
                    <a href="mailto:salsabilaa2285@gmail.com" className={`${isDarkMode ? 'text-white' : 'text-black'} hover:text-pink-400 transition-colors font-medium`}>
                      salsabilaa2285@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FaMapPin />
                  </div>
                  <div className="text-left md:text-left flex-1">
                    <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>Location</p> 
                    <p className={`font-medium hover:text-pink-400 ${isDarkMode ? 'text-white' : 'text-black'}`}>Bandung, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="text-center md:text-left">
              <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Follow Me</h3>
              <div className="grid grid-cols-4 md:grid-cols-4 gap-8 justify-items-center md:justify-items-start">
                <a
                  href="https://www.instagram.com/salsabl22_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:text-pink-400 transition-all duration-300 text-4xl hover:scale-110 ${isDarkMode ? 'text-white' : 'text-black'}`}
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/in/salsabilatech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:text-pink-400 transition-all duration-300 text-4xl delay-200 hover:scale-110 ${isDarkMode ? 'text-white' : 'text-black'}`}
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/salsabl22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:text-pink-400 transition-all duration-300 text-4xl delay-500 hover:scale-110 ${isDarkMode ? 'text-white' : 'text-black'}`}
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="mailto:salsabilaa2285@gmail.com"
                  className={`hover:text-pink-400 transition-all duration-300 delay-700 text-4xl hover:scale-110 ${isDarkMode ? 'text-white' : 'text-black'}`}
                  aria-label="Email"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="overflow-x-hidden">
      <Home />
      <About />
      <Projects />
      <Experience />
      <Contact />
    </div>
  );
};

export default App;