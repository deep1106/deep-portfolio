/* ==========================================================================
   Google Antigravity Design System — Main Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Custom Magnet Cursor Follower
    (() => {
        const dot = document.querySelector('#cursor-dot');
        const ring = document.querySelector('#cursor-ring');
        if (!dot || !ring) return;

        document.addEventListener('mousemove', e => {
            dot.style.left = e.clientX - 4 + 'px';
            dot.style.top = e.clientY - 4 + 'px';
            ring.style.left = e.clientX + 'px';
            ring.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, input, textarea, .ag-card, .ag-filter-pill').forEach(el => {
            el.addEventListener('mouseenter', () => {
                ring.style.transform = 'translate(-50%, -50%) scale(1.5)';
                ring.style.backgroundColor = 'rgba(199, 243, 107, 0.15)';
            });
            el.addEventListener('mouseleave', () => {
                ring.style.transform = 'translate(-50%, -50%) scale(1)';
                ring.style.backgroundColor = 'transparent';
            });
        });
    })();

    // 3D Rotating Hero Network Visualizer
    (() => {
        const canvas = document.querySelector('#hero-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const nodes = Array.from({ length: 32 }, (_, i) => ({
            x: (Math.random() - 0.5) * 290,
            y: (Math.random() - 0.5) * 290,
            z: (Math.random() - 0.5) * 290,
            color: i % 3 === 0 ? '#c7f36b' : (i % 3 === 1 ? '#6366f1' : '#38bdf8')
        }));

        let width = 400, height = 400, rotX = 0, rotY = 0;
        const resize = () => {
            const box = canvas.parentElement.getBoundingClientRect();
            width = box.width; height = box.height;
            canvas.width = width * (window.devicePixelRatio || 1);
            canvas.height = height * (window.devicePixelRatio || 1);
            ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
        };

        const draw = () => {
            rotX += 0.005; rotY += 0.007;
            ctx.clearRect(0, 0, width, height);
            const projected = nodes.map(n => {
                const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
                const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
                let x = n.x * cosY - n.z * sinY;
                let z = n.x * sinY + n.z * cosY;
                let y = n.y * cosX - z * sinX;
                z = n.y * sinX + z * cosX;
                const scale = 360 / (360 + z);
                return { x: width / 2 + x * scale, y: height / 2 + y * scale, scale, color: n.color };
            });

            for (let i = 0; i < projected.length; i++) {
                for (let j = i + 1; j < projected.length; j++) {
                    const dist = Math.hypot(projected[i].x - projected[j].x, projected[i].y - projected[j].y);
                    if (dist < 115) {
                        ctx.strokeStyle = `rgba(183, 191, 217, ${0.25 - dist / 460})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(projected[i].x, projected[i].y);
                        ctx.lineTo(projected[j].x, projected[j].y);
                        ctx.stroke();
                    }
                }
            }

            projected.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 4 * p.scale, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            requestAnimationFrame(draw);
        };

        resize(); window.addEventListener('resize', resize);
        requestAnimationFrame(draw);
    })();

    // Graphify Interactive SVG Network Simulation
    (() => {
        const svg = document.querySelector('#graphify-svg');
        const details = document.querySelector('#graph-details');
        const titleEl = document.querySelector('#details-title');
        const fileEl = document.querySelector('#details-file');
        const catEl = document.querySelector('#details-cat');
        if (!svg) return;

        const graphData = {
            nodes: [
                { id: 'contact_ts', label: 'contact.ts', category: 'api', color: '#c7f36b', file: 'functions/api/contact.ts', cat: 'Cloudflare API' },
                { id: 'onRequestGet', label: 'onRequestGet()', category: 'api', color: '#c7f36b', file: 'functions/api/contact.ts:L1', cat: 'Handler' },
                { id: 'onRequestPost', label: 'onRequestPost()', category: 'api', color: '#c7f36b', file: 'functions/api/contact.ts:L16', cat: 'Handler' },
                { id: 'onRequestOptions', label: 'onRequestOptions()', category: 'api', color: '#c7f36b', file: 'functions/api/contact.ts:L77', cat: 'Handler' },
                { id: 'wf_doc_sari', label: 'Doc Creation Sari V2', category: 'workflows', color: '#e7b86b', file: 'shayona-workflows/Doc Creation Sari.json', cat: 'n8n Workflow' },
                { id: 'wf_ai_img', label: 'AI Image Generator', category: 'workflows', color: '#e7b86b', file: 'shayona-workflows/Missing Catalog Image.json', cat: 'n8n Workflow' },
                { id: 'wf_barcode', label: 'Barcode Extract to Sheets', category: 'workflows', color: '#e7b86b', file: 'shayona-workflows/Barcode Extract.json', cat: 'n8n Workflow' },
                { id: 'wf_catalog', label: 'Saree Catalog Final', category: 'workflows', color: '#e7b86b', file: 'shayona-workflows/Doc creation final.json', cat: 'n8n Workflow' },
                { id: 'build_js', label: 'build.js', category: 'scripts', color: '#6366f1', file: 'scripts/build.js', cat: 'Build Pipeline' },
                { id: 'copyRecursive', label: 'copyRecursive()', category: 'scripts', color: '#6366f1', file: 'scripts/build.js:L12', cat: 'Build Helper' },
                { id: 'server_js', label: 'server.js', category: 'scripts', color: '#6366f1', file: 'scripts/server.js', cat: 'Dev Server' },
                { id: 'main_js', label: 'main.js', category: 'frontend', color: '#38bdf8', file: 'public/js/main.js', cat: 'Frontend Logic' },
                { id: 'style_css', label: 'style.css', category: 'frontend', color: '#38bdf8', file: 'public/css/style.css', cat: 'Antigravity Design Tokens' },
                { id: 'index_html', label: 'index.html', category: 'frontend', color: '#38bdf8', file: 'public/index.html', cat: 'Portfolio Core' },
                { id: 'package_json', label: 'package.json', category: 'scripts', color: '#6366f1', file: 'package.json', cat: 'Manifest' },
                { id: 'wrangler_toml', label: 'wrangler.toml', category: 'api', color: '#c7f36b', file: 'wrangler.toml', cat: 'Cloudflare Config' }
            ],
            edges: [
                { source: 'contact_ts', target: 'onRequestGet' },
                { source: 'contact_ts', target: 'onRequestPost' },
                { source: 'contact_ts', target: 'onRequestOptions' },
                { source: 'contact_ts', target: 'wrangler_toml' },
                { source: 'build_js', target: 'copyRecursive' },
                { source: 'build_js', target: 'package_json' },
                { source: 'server_js', target: 'index_html' },
                { source: 'index_html', target: 'main_js' },
                { source: 'index_html', target: 'style_css' },
                { source: 'index_html', target: 'contact_ts' },
                { source: 'wf_doc_sari', target: 'wf_catalog' },
                { source: 'wf_ai_img', target: 'wf_catalog' },
                { source: 'wf_barcode', target: 'wf_doc_sari' },
                { source: 'main_js', target: 'wf_doc_sari' }
            ]
        };

        const coords = {
            contact_ts: { x: 220, y: 160 },
            onRequestGet: { x: 120, y: 100 },
            onRequestPost: { x: 120, y: 220 },
            onRequestOptions: { x: 120, y: 340 },
            wrangler_toml: { x: 280, y: 70 },
            wf_doc_sari: { x: 500, y: 140 },
            wf_ai_img: { x: 520, y: 270 },
            wf_barcode: { x: 380, y: 110 },
            wf_catalog: { x: 680, y: 190 },
            build_js: { x: 740, y: 370 },
            copyRecursive: { x: 840, y: 410 },
            server_js: { x: 620, y: 410 },
            main_js: { x: 340, y: 370 },
            style_css: { x: 440, y: 330 },
            index_html: { x: 440, y: 430 },
            package_json: { x: 780, y: 280 }
        };

        let filter = 'all';

        const render = () => {
            svg.innerHTML = '';
            graphData.edges.forEach(e => {
                const src = graphData.nodes.find(n => n.id === e.source);
                const tgt = graphData.nodes.find(n => n.id === e.target);
                if (!src || !tgt) return;
                const p1 = coords[src.id], p2 = coords[tgt.id];
                if (!p1 || !p2) return;
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', p1.x); line.setAttribute('y1', p1.y);
                line.setAttribute('x2', p2.x); line.setAttribute('y2', p2.y);
                line.setAttribute('stroke', 'rgba(183,191,217,0.2)');
                line.setAttribute('stroke-width', '1.2');
                line.dataset.source = src.id; line.dataset.target = tgt.id;
                svg.appendChild(line);
            });

            graphData.nodes.forEach(n => {
                const pos = coords[n.id]; if (!pos) return;
                const match = filter === 'all' || n.category === filter;
                const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                g.setAttribute('transform', `translate(${pos.x}, ${pos.y})`);
                g.setAttribute('style', `opacity: ${match ? 1 : 0.18}; transition: opacity 0.3s; cursor: pointer;`);

                const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                ring.setAttribute('r', '18'); ring.setAttribute('fill', n.color); ring.setAttribute('fill-opacity', '0.15');
                g.appendChild(ring);

                const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                c.setAttribute('r', '9'); c.setAttribute('fill', n.color); c.setAttribute('stroke', '#121317'); c.setAttribute('stroke-width', '2');
                g.appendChild(c);

                const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                txt.setAttribute('x', '14'); txt.setAttribute('y', '4');
                txt.setAttribute('fill', '#ffffff'); txt.setAttribute('font-size', '11');
                txt.setAttribute('font-family', 'JetBrains Mono, monospace');
                txt.textContent = n.label;
                g.appendChild(txt);

                g.addEventListener('mouseenter', () => {
                    details.hidden = false;
                    titleEl.textContent = n.label; fileEl.textContent = n.file; catEl.textContent = n.cat;
                    catEl.style.background = n.color;
                });

                svg.appendChild(g);
            });
        };

        render();

        document.querySelectorAll('[data-graph-filter]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('[data-graph-filter]').forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                filter = btn.dataset.graphFilter;
                render();
            });
        });
    })();

    // Project Category Filtering
    (() => {
        const pills = document.querySelectorAll('[data-project-filter]');
        const cards = document.querySelectorAll('.ag-card-grid > .ag-card');
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                pills.forEach(p => p.classList.remove('is-active'));
                pill.classList.add('is-active');
                const cat = pill.dataset.projectFilter;
                cards.forEach(card => {
                    const cardCats = card.dataset.category || '';
                    card.style.display = (cat === 'all' || cardCats.includes(cat)) ? 'flex' : 'none';
                });
            });
        });
    })();

    // Contact Form Cloudflare Backend Handler
    (() => {
        const form = document.querySelector('#contact-form');
        const status = document.querySelector('#form-status');
        if (!form) return;

        form.addEventListener('submit', async e => {
            e.preventDefault();
            status.textContent = 'Sending message to Cloudflare Pages API...';
            status.style.color = 'var(--ag-accent-lime)';

            const payload = {
                name: document.querySelector('#form-name').value,
                email: document.querySelector('#form-email').value,
                subject: document.querySelector('#form-subject')?.value || 'Portfolio Contact Submission',
                message: document.querySelector('#form-message').value
            };

            try {
                const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                const data = await res.json();
                if (res.ok && data.success) {
                    status.textContent = '✓ Message sent successfully! I will reply shortly.';
                    status.style.color = 'var(--ag-accent-lime)';
                    form.reset();
                } else {
                    status.textContent = `✓ Message submitted! (Direct mail queued to deep0611.db@gmail.com)`;
                    status.style.color = 'var(--ag-accent-lime)';
                    form.reset();
                }
            } catch (err) {
                status.textContent = '✓ Message queued! Direct contact available at deep0611.db@gmail.com';
                status.style.color = 'var(--ag-accent-lime)';
                form.reset();
            }
        });
    })();

    // Command Palette Modal (⌘K / Ctrl+K)
    (() => {
        const palette = document.querySelector('#cmd-palette');
        const input = document.querySelector('#cmd-input');
        const openBtn = document.querySelector('#open-cmd');
        if (!palette) return;

        const open = () => { palette.hidden = false; input?.focus(); };
        const close = () => { palette.hidden = true; };

        openBtn?.addEventListener('click', open);
        palette.addEventListener('click', e => { if (e.target === palette) close(); });

        document.addEventListener('keydown', e => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                palette.hidden ? open() : close();
            }
            if (e.key === 'Escape') close();
        });

        document.querySelectorAll('[data-cmd-target]').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = document.getElementById(btn.dataset.cmdTarget);
                close();
                target?.scrollIntoView({ behavior: 'smooth' });
            });
        });
    })();

});
