// Reveal sections
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("active");
  });
},{threshold:.2});

document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));


// Skill bars
document.querySelectorAll(".progress").forEach(bar=>{
  const o=new IntersectionObserver(e=>{
    if(e[0].isIntersecting){
      bar.style.width = bar.dataset.width;
    }
  });
  o.observe(bar);
});


// Typing
const text="Computer Science Student • Developer • Entrepreneur";
let i=0;
function type(){
  if(i<text.length){
    typing.innerHTML+=text[i++];
    setTimeout(type,35);
  }
}
type();


// Active menu highlight
const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll("#menu a");

window.addEventListener("scroll",()=>{
  let current="";
  sections.forEach(sec=>{
    if(scrollY >= sec.offsetTop-120){
      current = sec.id;
    }
  });

  navLinks.forEach(a=>{
    a.classList.remove("active");
    if(a.getAttribute("href")==="#"+current){
      a.classList.add("active");
    }
  });
});


// Interactive particles
const c=document.getElementById("particles");
const ctx=c.getContext("2d");
c.width=innerWidth;
c.height=innerHeight;

let mouse={x:0,y:0};
onmousemove=e=>{mouse.x=e.x;mouse.y=e.y;}

let pts=[];
for(let i=0;i<85;i++){
  pts.push({
    x:Math.random()*c.width,
    y:Math.random()*c.height,
    vx:(Math.random()-.5)*.6,
    vy:(Math.random()-.5)*.6
  });
}

function draw(){
  ctx.clearRect(0,0,c.width,c.height);

  pts.forEach(p=>{
    let dx=mouse.x-p.x;
    let dy=mouse.y-p.y;
    let dist=Math.sqrt(dx*dx+dy*dy);

    if(dist<140){
      p.vx += dx/dist*0.015;
      p.vy += dy/dist*0.015;
    }

    p.x+=p.vx;
    p.y+=p.vy;

    if(p.x<0||p.x>c.width) p.vx*=-1;
    if(p.y<0||p.y>c.height) p.vy*=-1;

    ctx.beginPath();
    ctx.arc(p.x,p.y,2,0,Math.PI*2);
    ctx.fillStyle="#58a6ff";
    ctx.fill();
  });

  requestAnimationFrame(draw);
}
draw();

onresize=()=>{
  c.width=innerWidth;
  c.height=innerHeight;
};
