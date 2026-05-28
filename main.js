console.log("JS WORKING");
 // ==================== CUSTOM CURSOR ====================
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        });
        
        document.querySelectorAll('a, button, input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
        });
        
        // ==================== THREE.JS BACKGROUND ====================
        const canvas = document.getElementById('bg-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);
        
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 50;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x6366f1,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        camera.position.z = 5;
        
        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Animation
        function animate() {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.0003;
            particlesMesh.rotation.y += 0.0005;
            
            particlesMesh.rotation.x += mouseY * 0.0005;
            particlesMesh.rotation.y += mouseX * 0.0005;
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // ==================== NAVIGATION ====================
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('glass');
                navbar.classList.remove('py-4');
                navbar.classList.add('py-2');
            } else {
                navbar.classList.remove('glass');
                navbar.classList.add('py-4');
                navbar.classList.remove('py-2');
            }
            
            lastScroll = currentScroll;
        });
        
        // Mobile Menu
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
        
        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        
        // ==================== GSAP ANIMATIONS ====================
        gsap.registerPlugin(ScrollTrigger);
        
        // Reveal animations
        gsap.utils.toArray('.reveal').forEach(element => {
            gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });
        
        // Counter animation
        gsap.utils.toArray('.counter').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            
            ScrollTrigger.create({
                trigger: counter,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to({ val: 0 }, {
                        val: target,
                        duration: 2,
                        ease: 'power2.out',
                        onUpdate: function() {
                            counter.innerHTML = Math.round(this.targets()[0].val) + suffix;
                        }
                    });
                }
            });
        });
        
        // ==================== PROJECTS DATA ====================
        const projects = [
    {
        title: 'Jashoo - Spin & Earn Gaming Platform',
        category: 'Game Development / Monetization',
        image: 'img/hero.jpg',
        description: 'An interactive rewards-based gaming platform featuring a dynamic spin-wheel mechanic, real-time user authentication, and ad-based monetization.',
        tech: ['JavaScript', 'HTML5 Canvas', 'Firebase', 'CSS3'],
        link: 'https://jashoo.online'
    },
    {
        title: 'Oggy Janta Party (OJP) Official Portal',
        category: 'Web Development / UI Design',
        image: 'img/hero-img.png', // A modern creative template image
        description: 'A creative, community-focused fun web portal dedicated to the fictional "Oggy Janta Party", featuring vibrant UI layouts, structured interactive elements, and modern responsive design.',
        tech: ['HTML5', 'CSS3', 'JavaScript'],
        link: '#' // Agar iska koi deployment link ho toh yahan daal dena
    },
    {
        title: 'Farm2Earn - Digital Farming Simulator',
        category: 'Web Game / Digital Earning',
        image: 'img/preview.png',
        description: 'A simulation-based web application where users engage in virtual farming mechanics to manage resources and complete tasks to earn digital rewards.',
        tech: ['JavaScript', 'HTML5', 'CSS3', 'Firebase DB'],
        link: 'https://anuragbri.github.io/farm2earns/index.html'
    }
];
        
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    
    grid.innerHTML = projects.map((project, index) => {
        const techTags = project.tech.map(t => 
            `<span class="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-slate-300 backdrop-blur-sm">${t}</span>`
        ).join('');

        return `
            <div class="project-card glass-card rounded-2xl overflow-hidden border border-white/5 bg-slate-900/40 backdrop-blur-md hover:border-primary/30 transition-all duration-300 group reveal" style="animation-delay: ${index * 0.1}s">
                <div class="relative overflow-hidden aspect-video">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-sm text-[11px] font-medium px-3 py-1 rounded-full text-primary border border-white/10">
                        ${project.category}
                    </div>
                </div>
                <div class="p-6 space-y-3">
                    <h3 class="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">${project.title}</h3>
                    <p class="text-sm text-slate-400 leading-relaxed line-clamp-3">${project.description}</p>
                    <div class="flex flex-wrap gap-1.5 pt-2">
                        ${techTags}
                    </div>
                    <div class="pt-4 border-t border-white/5">
                        <a href="${project.link}" ${project.link !== '#' ? 'target="_blank"' : ''} class="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors group/link">
                            <span>View Project</span>
                            <svg class="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}
        
        renderProjects();
        
        // ==================== SKILLS DATA ====================
        const skills = [
    { name: 'HTML', level: 95 },
    { name: 'CSS', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'Firebase', level: 75 },
    { name: 'UI/UX Design', level: 35 } // Beginner level
];
        
        function renderSkills() {
            const container = document.getElementById('skills-container');
            container.innerHTML = skills.map((skill, index) => `
                <div class="skill-item" data-delay="${index * 0.1}">
                    <div class="flex justify-between mb-2">
                        <span class="text-white font-medium">${skill.name}</span>
                        <span class="text-primary font-bold">${skill.level}%</span>
                    </div>
                    <div class="skill-track h-2">
                        <div class="skill-fill" data-level="${skill.level}"></div>
                    </div>
                </div>
            `).join('');
        }
        
        renderSkills();
        
        // Animate skill bars on scroll
        ScrollTrigger.create({
            trigger: '#skills-container',
            start: 'top 80%',
            onEnter: () => {
                document.querySelectorAll('.skill-fill').forEach(bar => {
                    bar.style.width = bar.getAttribute('data-level') + '%';
                });
            }
        });
        
      
            
            // Submit Contact Form
            // Submit Contact Form
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-contact');
    const spinner = document.getElementById('contact-spinner');
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    btn.disabled = true;
    spinner.classList.remove('hidden');
    
    try {
        const { collection, addDoc, serverTimestamp } = window.firebaseFuncs;
        const db = window.firebaseDB;
        
        await addDoc(collection(db, 'contacts'), {
            name, email, subject, message,
            timestamp: serverTimestamp()
        });
        
        showToast('Message sent successfully! I\'ll get back to you soon.');
        e.target.reset();
    } catch (error) {
        showToast('Error sending message. Please try again.');
        console.error(error);
    } finally {
        btn.disabled = false;
        spinner.classList.add('hidden');
    }
});
       
        
        // Update visitor count display
        function updateVisitorCount(count) {
            const el = document.getElementById('visitor-count');
            if (el) {
                el.textContent = count === 0 ? 'Demo Mode' : `${count.toLocaleString()} visitors`;
            }
        }
        // Visitor Counter
async function initVisitorCounter() {
    const waitForFirebase = () => new Promise(resolve => {
        const check = () => window.firebaseDB ? resolve() : setTimeout(check, 100);
        check();
    });

    try {
        await waitForFirebase();
        
        const { doc, updateDoc, increment, onSnapshot } = window.firebaseFuncs;
        const db = window.firebaseDB;
        const counterRef = doc(db, 'visitors', 'counter');

        try {
            await updateDoc(counterRef, { count: increment(1) });
        } catch(e) {
            const { setDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            await setDoc(counterRef, { count: 1 });
        }

        onSnapshot(counterRef, (snap) => {
            if (snap.exists()) {
                updateVisitorCount(snap.data().count);
            }
        });
    } catch(err) {
        // Ad blocker ya network issue - silently hide counter
        const el = document.getElementById('visitor-count');
        if (el) el.closest('.visitor-counter').style.display = 'none';
    }
}

initVisitorCounter();
        // Show toast notification
        function showToast(message) {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toast-message');
            if (toast && toastMessage) {
                toastMessage.textContent = message;
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 4000);
            }
        }
        
        // Load more projects functionality
        const loadMoreBtn = document.getElementById('load-more-projects');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                showToast('More projects coming soon!');
            });
        }
        
        // Mobile menu toggle fix
        const menuBtnFix = document.getElementById('menu-btn');
        const mobileMenuFix = document.getElementById('mobile-menu');
        if (menuBtnFix && mobileMenuFix) {
            menuBtnFix.addEventListener('click', () => {
                const isOpen = mobileMenuFix.classList.contains('active');
                if (isOpen) {
                    mobileMenuFix.classList.remove('active');
                } else {
                    mobileMenuFix.classList.add('active');
                }
            });
        }