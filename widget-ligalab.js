(function() {
    // 1. Configurações (Cores Originais Restauradas)
    const CONFIG = {
        phoneNumber: "351930450509",
        message: "Quero mais informações",
        brandColor: "#000000", // Preto sóbrio da Liga
        waColor: "#25D366",    // Verde WhatsApp original
        logoUrl: "https://lab.ligaportugal.pt/media/1003/logo_lp_lab.png"
    };

    // 2. Injetar Estilos (Design Limpo)
    const style = document.createElement('style');
    style.innerHTML = `
        #wa-widget-wrapper { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; z-index: 99999; position: fixed; bottom: 20px; right: 20px; }
        
        #wa-popup { 
            display: none; position: absolute; bottom: 80px; right: 0; width: 300px; 
            background: #fff; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); 
            overflow: hidden;
        }

        .wa-header { 
            background: ${CONFIG.brandColor}; padding: 15px; color: white; 
            display: flex; align-items: center; gap: 12px; 
        }

        .wa-logo-img { 
            width: 35px; height: 35px; background: white; border-radius: 50%; padding: 3px; 
        }

        .wa-body { padding: 20px; background: #e5ddd5; }
        
        .wa-bubble { 
            background: white; padding: 10px 15px; border-radius: 8px; border-top-left-radius: 0;
            font-size: 14px; color: #333; position: relative; box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .wa-time { display: block; font-size: 10px; color: #999; text-align: right; margin-top: 5px; }

        .wa-footer { padding: 10px; background: white; }
        
        .wa-btn-send { 
            display: block; background: ${CONFIG.waColor}; color: white; text-align: center; 
            padding: 12px; border-radius: 25px; text-decoration: none; font-weight: bold; font-size: 14px;
        }

        #wa-trigger-btn { 
            width: 60px; height: 60px; background: ${CONFIG.waColor}; border-radius: 50%; 
            display: flex; align-items: center; justify-content: center; cursor: pointer; 
            box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: none; transition: 0.3s;
        }
        #wa-trigger-btn.active { transform: rotate(90deg); background: #333; }
    `;
    document.head.appendChild(style);

    // 3. Estrutura HTML
    const widget = document.createElement('div');
    widget.id = 'wa-widget-wrapper';
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    widget.innerHTML = `
        <div id="wa-popup">
            <div class="wa-header">
                <img src="${CONFIG.logoUrl}" class="wa-logo-img">
                <div>
                    <div style="font-size: 14px; font-weight: bold;">Liga Portugal Lab</div>
                    <div style="font-size: 11px; opacity: 0.8;">Online</div>
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
                    Enviar Mensagem
                </a>
            </div>
        </div>
        <button id="wa-trigger-btn">
            <svg viewBox="0 0 448 512" width="30" height="30" fill="white">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.4 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.4-8.6-44.6-27.5-16.4-14.7-27.5-32.8-30.7-38.3-3.2-5.6-.4-8.6 2.4-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.4-29.9-17-41-4.5-10.9-9.1-9.4-12.4-9.6-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
        </button>
    `;

    document.body.appendChild(widget);

    // 4. Lógica de Abrir/Fechar
    const btn = document.getElementById('wa-trigger-btn');
    const popup = document.getElementById('wa-popup');

    btn.addEventListener('click', (e) => {
        const isHidden = popup.style.display === 'none' || popup.style.display === '';
        popup.style.display = isHidden ? 'block' : 'none';
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
