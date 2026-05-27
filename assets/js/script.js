function createNav(item) {
    const el = document.createElement(item.tag); //タグの作成
    if (item.type) el.type = item.type;
    if (item.id) el.id = item.id;
    if (item.for) el.htmlFor = item.for;
    if (item.class) el.className = item.class; // クラスの付与
    if (item.url) el.href = item.url; // itemが(a タグなら)URLを付与する
    if (item.text) el.textContent = `${item.text}`; // 中の文字を付与

    if (item.children) {
        item.children.forEach(child => {
            const childEl = createNav(child);
            el.appendChild(childEl);
        });
    }
    return el; // 出来た要素を返す
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
    circle.setAttribute('viewBox','0 0 0 0');
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
        const configResponse = await fetch('./assets/data/nav.json');
        if (!configResponse.ok) throw new Error('Config load failed');
        const config = await configResponse.json();
        
        config.headerContent.forEach(item => {
            const el = createNav(item);
            document.getElementById('header').appendChild(el);
        });
        
        config.footerContent.forEach(item => {
            const el = createNav(item);
            document.getElementById('footer').appendChild(el);
        });

        setTimeout(() => {
            document.body.classList.add("is-show");
        }, 100);
        
        setTimeout(() => {
            svg.classList.remove('is-loading');
        }, 1200);
    } catch (e) {
        console.error(e)

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