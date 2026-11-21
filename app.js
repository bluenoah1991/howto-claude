const books = {
  gmail: { edition:'Gmail', name:'订阅指南 · Gmail 版', description:'用 Google 账号注册 Claude，在 iPhone 上完成 Pro 订阅。', tint:'#f1e2d0', accent:'#774429' },
  proton: { edition:'Proton Mail', name:'订阅指南 · Proton Mail 版', description:'用 Proton 邮箱接收验证邮件，通过邮箱登录并订阅。', tint:'#e6e4ee', accent:'#55456c' },
  desktop: { edition:'Desktop', name:'Claude Desktop 使用指南', description:'配置本地网络，安装桌面客户端，完成首次登录与授权。', tint:'#e1e8dd', accent:'#445c45' }
};
const byId = id => document.getElementById(id);
for (const key of ['desktop','proton','gmail']) {
  const img = new Image();
  img.src = bookPages[key][0];
  img.alt = books[key].name;
  byId('stack').append(img);
}
for (const [key,book] of Object.entries(books)) {
  const card = document.createElement('article');
  card.className = 'card';
  card.style.setProperty('--tint',book.tint);
  card.style.setProperty('--accent',book.accent);
  card.innerHTML = `<a class="card-top" href="#read/${key}/0" aria-label="阅读${book.name}"><span>${book.edition}</span><img src="${bookPages[key][0]}" alt=""></a>
    <div class="card-body"><p class="meta">${bookPages[key].length} 页 · 图解手册</p><h3>${book.name}</h3><p class="desc">${book.description}</p>
    <div class="actions"><a href="#read/${key}/0">在线阅读 →</a><a href="books/${key}.pdf" download="${book.name}.pdf">下载 PDF ↓</a></div></div>`;
  byId('books').append(card);
}
const resources = {
  '购买代理 IP': [
    ['Proxy-Cheap','代理 IP 购买网站，可选购静态住宅（ISP）代理 IP。','https://www.proxy-cheap.com/'],
    ['IPRoyal','代理 IP 购买网站，提供住宅代理和 ISP 代理。','https://iproyal.com/'],
    ['NodeMaven','住宅代理 IP 购买网站，提供住宅代理套餐。','https://nodemaven.com/']
  ],
  '软件': [
    ['Chrovia PersonaHub','指纹浏览器，可为不同身份分别保存浏览器配置和登录状态。','https://console.getchrovia.com/zh/products/persona-hub'],
    ['Baton','中继代理软件，可将设备的网络请求经上游代理转发到指定出口。','https://baton.getchrovia.com/zh#download'],
    ['Baton 浏览器插件','Chrome 代理扩展，可在浏览器中管理代理连接。','https://chromewebstore.google.com/detail/baton/gcpdpgamadbohahegdkfagajneeibcni'],
    ['忍者蟹（ClawdNinja）','桌面应用启动器，可使用指定的代理启动 Claude Desktop。','https://github.com/ChroviaHQ/ClawdNinja/releases']
  ],
  '环境检测': [
    ['IPinfo','公网 IP 查询网站，可查看当前出口 IP、所在地区和运营商。','https://ipinfo.io/what-is-my-ip'],
    ['IP2Location','IP 地理位置查询网站，可按 IP 地址查询国家、城市和网络归属。','https://www.ip2location.com/demo'],
    ['Scamalytics','IP 欺诈风险评估网站，提供风险分数和等级。','https://scamalytics.com/'],
    ['IPQualityScore（IPQS）','IP 风险检测网站，可查询欺诈风险评分以及代理、VPN 检测结果。','https://www.ipqualityscore.com/ip-fraud-score-risk-checker'],
    ['Fingerprint Playground','浏览器指纹检测网站，可查看当前浏览器的识别信息和环境检测结果。','https://demo.fingerprint.com/playground']
  ],
  '邮箱与账号注册': [
    ['Google 账号','Google 账号注册页面，可创建 Gmail 邮箱并使用 Google 账号登录 Claude。','https://accounts.google.com/signup'],
    ['Proton Mail','电子邮箱服务，可创建 Proton 邮箱并接收 Claude 登录邮件。','https://proton.me/zh/mail'],
    ['Claude','Anthropic 的 AI 助手，可使用 Google 账号或邮箱注册和登录。','https://claude.ai/login'],
    ['Apple 账户（Apple ID）','Apple 账户注册页面，创建的账户可用于 App Store 下载和订阅。','https://account.apple.com/account']
  ],
  '礼品卡与付款': [
    ['PockytShop','电子礼品卡购买网站，可购买美区 Apple 礼品卡，为 Apple 账户充值。','https://shop.pockyt.io/goodsDetail/9WLYdh2/Apple%20Gift%20Card%20US/all']
  ]
};
for (const [group,items] of Object.entries(resources)) {
  const section = document.createElement('section');
  section.className = 'link-group';
  section.innerHTML = '<h3>'+group+'</h3>';
  for (const [name,description,url] of items) {
    const link = document.createElement('a');
    link.href=url; link.target='_blank'; link.rel='noopener noreferrer'; link.className='resource';
    link.innerHTML=`<span><strong>${name}</strong><small>${description}</small></span><b aria-hidden="true">↗</b>`;
    section.append(link);
  }
  byId('links').append(section);
}
const reader=byId('reader');
let currentBook, currentPage;
function move(n) {
  if(n<0 || n>=bookPages[currentBook].length) return;
  history.replaceState(null,'','#read/'+currentBook+'/'+n);
  displayPage();
}
function displayPage() {
  const match=location.hash.match(/^#read\/(gmail|proton|desktop)\/(\d+)$/);
  if(!match || Number(match[2])>=bookPages[match[1]].length) {
    if(reader.open) reader.close();
    return;
  }
  const key=match[1], n=Number(match[2]);
  const chapters=key==='desktop'?{1:'系统代理',2:'配置 Baton',7:'启动桌面端',8:'首次登录',13:'结束语'}:{1:'准备网络',7:'准备浏览器',15:'手机网络',25:'注册邮箱',29:'注册 Claude',31:'订阅与付款',39:'结束语'};
  if(key!==currentBook) {
    byId('jump').replaceChildren(...bookPages[key].map((_,i)=>new Option(i===0?'封面目录':'第 '+i+' 页'+(chapters[i]?' · '+chapters[i]:''),i)));
  }
  currentBook=key; currentPage=n;
  byId('rtitle').textContent=books[key].name;
  byId('page-img').src=bookPages[key][n];
  byId('page-img').alt=books[key].name+' · '+byId('jump').options[n].text;
  byId('jump').value=n; byId('prev').disabled=n===0; byId('next').disabled=n===bookPages[key].length-1;
  reader.querySelector('.paper').scrollTop=0;
  if(!reader.open) reader.showModal();
}
byId('prev').onclick=()=>move(currentPage-1);
byId('next').onclick=()=>move(currentPage+1);
byId('jump').onchange=e=>move(Number(e.target.value));
byId('close').onclick=()=>reader.close();
reader.addEventListener('close',()=>{if(location.hash.startsWith('#read/'))history.replaceState(null,'','#library')});
reader.addEventListener('keydown',e=>{
  if(e.target.tagName==='SELECT')return;
  if(e.key==='ArrowLeft')move(currentPage-1);
  if(e.key==='ArrowRight')move(currentPage+1);
});
window.addEventListener('hashchange',displayPage);
displayPage();
