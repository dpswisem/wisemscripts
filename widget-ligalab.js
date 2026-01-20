(function() {
    // 1. Definições de Identidade Liga Portugal Lab
    const CONFIG = {
        phoneNumber: "351930450509",
        message: "Quero mais informações",
        primaryColor: "#0d1b2a", // Azul escuro profundo da Liga
        accentColor: "#c5a059",  // Dourado institucional
        waColor: "#25D366",      // Verde WhatsApp
        logoUrl: "https://lab.ligaportugal.pt/media/1003/logo_lp_lab.png" // Logo oficial
    };

    // 2. Estilos Customizados
    const style = document.createElement('style');
    style.innerHTML = `
        #wa-widget-wrapper { font-family: 'Poppins', sans-serif; z-index: 99999; position: fixed; bottom: 30px; right: 30px; }
        
        #wa-popup { 
            display: none; position: absolute; bottom: 85px; right: 0; width: 340px; 
            background: #fff; border-radius: 16px; box-shadow: 0 15px 50px rgba(0,0,0,0.3); 
            overflow: hidden; animation: waSlideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes waSlideUp { from { opacity: 0; transform: translateY(30px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
        
        .wa-header { 
            background: linear-gradient(135deg, ${CONFIG.primaryColor} 0%, #1b263b 100%); 
            padding: 20px; color: white; display: flex; align-items: center; gap: 15px;
            border-bottom: 3px solid ${CONFIG.accentColor};
        }

        .wa-logo-container { 
            width: 50px; height: 50px; background: white; border-radius: 50%; 
            display: flex; align-items: center; justify-content: center; padding: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        .wa-logo-container img { width: 100%; height: auto; object-fit: contain; }
        
        .wa-body { padding: 25px; background: #f0f2f5; position: relative; }
        .wa-bubble { 
            background: white; padding: 12px 18px; border-radius: 12px; border-top-left-radius: 0;
            font-size: 14px; color: #1b263b; box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .wa-time { display: block; font-size: 10px; color: #999; text-align: right; margin-top: 6px; }

        .wa-footer { padding: 15px; background: white; text-align: center; }
        .wa-btn-send { 
            display: flex; align-items: center; justify-content: center; gap: 10px;
            background: ${CONFIG.waColor}; color: white; text-decoration: none; 
            padding: 14px; border-radius: 30px; font-weight: 600; font-size: 15px;
            transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
        }
        .wa-btn-send:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4); }

        #wa-trigger-btn { 
            width: 65px; height: 65px; background: ${CONFIG.primaryColor}; border-radius: 50%; 
            display: flex; align-items: center; justify-content: center; cursor: pointer; 
            box-shadow: 0 6px 20px rgba(0,0,0,0.3); transition: 0.4s; border: 2px solid ${CONFIG.accentColor};
        }
        #wa-trigger-btn svg { transition: 0.3s; fill: ${CONFIG.accentColor}; }
        #wa-trigger-btn.active { background: #cc0000; border-color: white; }
        #wa-trigger-btn.active svg { transform: rotate(45deg); fill: white; }
    `;
    document.head.appendChild(style);

    // 3. Estrutura HTML
    const widget = document.createElement('div');
    widget.id = 'wa-widget-wrapper';
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    widget.innerHTML = `
        <div id="wa-popup">
            <div class="wa-header">
                <div class="wa-logo-container">
                    <img src="${CONFIG.logoUrl}" alt="Liga Portugal Lab">
                </div>
                <div>
                    <div style="font-size: 16px; font-weight: 700; letter-spacing: 0.5px;">LP LAB</div>
                    <div style="font-size: 11px; opacity: 0.9; display: flex; align-items: center; gap: 5px;">
                        <span style="width: 8px; height: 8px; background: #25D366; border-radius: 50%; display: inline-block;"></span>
                        Online agora
                    </div>
                </div>
            </div>
            <div class="wa-body">
                <div class="wa-bubble">
                    ${CONFIG.message}
                    <span class="wa-time">${timeStr}</span>
                </div>
            </div>
            <div class="wa-footer">
                <a href="https://wa.me/${CONFIG.phoneNumber}?text=${encodeURIComponent(CONFIG.message)}" 
                   target="_blank" class="wa-btn-send">
                    <span>Enviar Mensagem</span>
                </a>
            </div>
        </div>
        <button id="wa-trigger-btn">
            <svg viewBox="0 0 448 512" width="28" height="28">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.4 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.4-8.6-44.6-27.5-16.4-14.7-27.5-32.8-30.7-38.3-3.2-5.6-.4-8.6 2.4-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.4-29.9-17-41-4.5-10.9-9.1-9.4-12.4-9.6-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
        </button>
    `;

    document.body.appendChild(widget);

    // 4. Lógica de Interação
    const btn = document.getElementById('wa-trigger-btn');
    const popup = document.getElementById('wa-popup');

    btn.addEventListener('click', (e) => {
        const isOpen = popup.style.display === 'block';
        popup.style.display = isOpen ? 'none' : 'block';
        btn.classList.toggle('active');
        e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
        if (!widget.contains(e.target)) {
            popup.style.display = 'none';
            btn.classList.remove('active');
        }
    });
})();