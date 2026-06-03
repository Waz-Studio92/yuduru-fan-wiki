function createNav(item) {
    const { tag, text, children, ...attrs } = item;
    const el = document.createElement(tag);

    Object.entries(attrs).forEach(([key, value]) => {

        if (value) {
            el.setAttribute(key, value);
        }
    });
    
    if (text) el.textContent = text;

    if (children) {
        children.forEach(child => el.append(createNav(child)));
    }
    return el;
}

    document.addEventListener('DOMContentLoaded', async () => {

    const setNav = () => { console.log('Nav initialized'); };

    const svg = document.querySelector('.load-svg');

    const svgNs = 'http://www.w3.org/2000/svg';
    const defs = document.createElementNS(svgNs,'defs');
    svg.appendChild(defs);

    const gradient = document.createElementNS(svgNs,'linearGradient');
    gradient.id = 'grad1';
    gradient.setAttribute('x1','0%');
    gradient.setAttribute('y1','0%');
    gradient.setAttribute('x2','100%');
    gradient.setAttribute('y2','100%');
    defs.appendChild(gradient);

    const startColor = document.createElementNS(svgNs,'stop');
    startColor.setAttribute('offset','0%');
    startColor.setAttribute('stop-color','#000080');
    gradient.appendChild(startColor);

    const endColor = document.createElementNS(svgNs,'stop');
    endColor.setAttribute('offset','100%');
    endColor.setAttribute('stop-color','#80ffff');
    gradient.appendChild(endColor);

    const circle = document.createElementNS(svgNs,'circle');
    circle.setAttribute('width','200');
    circle.setAttribute('height','200');
    circle.setAttribute('cx','95');
    circle.setAttribute('cy','95');
    circle.setAttribute('r','80');

    circle.setAttribute('fill','none');
    circle.setAttribute('stroke','url(#grad1)');
    circle.setAttribute('stroke-width','25');

    svg.appendChild(circle);

    svg.classList.add('is-loading');

    try {
        // 1. 設定ファイルの読み込み
        const response = await fetch('./assets/data/nav.json');
        if (!response.ok) throw new Error('Config load failed');
        const config = await response.json();
        
        config.parts.forEach(part => {

            const contentContainerId = part.id.replace('#','');
            const container = document.querySelector(part.id);

            const dataKey = part.dataKey;
            const dataList = config[dataKey];

            if (container && dataList) {
                dataList.forEach(data => container.appendChild(createNav(data)))
            }
        });

        setTimeout(() => {
            document.body.classList.add("is-show");
        }, 100);
        
        setTimeout(() => {
            svg.classList.remove('is-loading');
        }, 1200);
    } catch (e) {
        console.error(e)
        
        const errorText = document.createElement('p');
        errorText.className = 'error-text';
        errorText.textContent = 'データの読み込みに失敗しました。後でもう一度お試しください。';
        
        document.body.appendChild(errorText);
        
        setTimeout(() => {
            document.body.classList.add("is-show");
        }, 100);

        setTimeout(() => {
            svg.classList.remove('is-loading');
        }, 1200);
    }
    
    function setAccordion() {
    
        const titles = document.querySelectorAll('.accordion-title');
    
        titles.forEach(title => {
            title.addEventListener('click', () => {
    
                const content = title.nextElementSibling;
    
                if (content) {
                    content.classList.toggle('is-active');
                } else {
                    console.log("Error: Content not found for is title.");
                }
            });
        });
    }
    
    setAccordion();
});