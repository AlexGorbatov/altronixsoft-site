import sys,json
LOGO=open('logo.svg').read()
def logo_svg(pfx,h):
    w=round(h*1042/902)
    return LOGO.replace('PFX',pfx).replace('width="W" height="H"',f'width="{w}" height="{h}"')
CSS="""
body{margin:0;background:#07101f;font-family:'Manrope',system-ui,sans-serif;color:#f7f9fc;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
a:focus-visible,button:focus-visible{outline:2px solid #22d6f4;outline-offset:3px;border-radius:8px}
.mono{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#8fdde8;font-weight:500}
.lbl{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#9aa9be;font-weight:500}
.h1{margin:0;font-weight:800;letter-spacing:-.045em;line-height:1.02;color:#f7f9fc}
.h2{margin:0;font-weight:700;letter-spacing:-.04em;line-height:1.1;color:#f7f9fc}
.card{background:linear-gradient(180deg,#0f1a30,#0b1428);border:1px solid rgba(255,255,255,.1);border-radius:16px;box-sizing:border-box;overflow:hidden}
.panel{background:#0b1428;border:1px solid rgba(255,255,255,.1);border-radius:12px;box-sizing:border-box}
.chip{display:inline-flex;align-items:center;height:28px;padding:0 12px;border:1px solid rgba(255,255,255,.14);border-radius:999px;font-size:13px;color:#f7f9fc;box-sizing:border-box;background:rgba(255,255,255,.02)}
.btn{display:inline-flex;align-items:center;justify-content:center;height:48px;min-height:44px;padding:0 24px;border-radius:12px;font-weight:700;font-size:14px;white-space:nowrap;box-sizing:border-box}
.btn-p{background:linear-gradient(90deg,#1a62dc,#5a40e0);color:#fff;border:1px solid rgba(255,255,255,.14)}
.btn-s{background:rgba(255,255,255,.04);color:#fff;border:1px solid rgba(255,255,255,.14)}
.navl{font-size:14px;font-weight:600;color:#bcc6d6;padding:12px 2px}
.navl.on{color:#fff;box-shadow:inset 0 -2px 0 #22d6f4}
.df{stroke-dasharray:4 4;animation:df 1.2s linear infinite}
@keyframes df{to{stroke-dashoffset:-8}}
.pl{animation:pl 2.4s ease-in-out infinite}
@keyframes pl{0%,100%{opacity:1}50%{opacity:.35}}
.rise{animation:rise .8s cubic-bezier(.2,.75,.2,1) both}
@keyframes rise{from{opacity:0;transform:translateY(12px)}}
.pk{offset-rotate:0deg;offset-distance:0;opacity:0;animation:pkmv var(--d,3.2s) linear infinite;animation-delay:var(--l,0s)}
@keyframes pkmv{0%{offset-distance:0;opacity:0}8%{opacity:1}92%{opacity:1}100%{offset-distance:100%;opacity:0}}
.bob{animation:bob var(--d,3.4s) ease-in-out infinite;animation-delay:var(--l,0s)}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
.gl{animation:gl 2.6s ease-in-out infinite;animation-delay:var(--l,0s)}
@keyframes gl{0%,100%{opacity:0}50%{opacity:.28}}
.ring{transform-box:fill-box;transform-origin:center;animation:ring 3s ease-out infinite;animation-delay:var(--l,0s)}
@keyframes ring{0%{transform:scale(.5);opacity:.8}100%{transform:scale(1.7);opacity:0}}
.tick{animation:tick 5s linear infinite;animation-delay:var(--l,0s);opacity:.25}
@keyframes tick{0%,100%{opacity:.25}10%,20%{opacity:1}35%{opacity:.25}}
@media (prefers-reduced-motion:reduce){.df,.pl,.rise,.pk,.bob,.gl,.ring,.tick{animation:none}.pk{opacity:1;offset-distance:50%}}
.gridbg{background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:64px 64px;-webkit-mask-image:radial-gradient(ellipse at 70% 20%,#000 20%,transparent 70%);mask-image:radial-gradient(ellipse at 70% 20%,#000 20%,transparent 70%)}
"""
FONTS='<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap">'
def page(title,w,h,body,css_extra=''):
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{title}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
{FONTS}
<style>{CSS}{css_extra}</style>
</helmet>
<div style="width:{w}px;height:{h}px;overflow:hidden;background:#07101f;position:relative;font-family:'Manrope',system-ui,sans-serif;color:#f7f9fc">
{body}
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":{w},"height":{h}}}}}'>
class Component extends DCLogic {{
renderVals() {{ return {{}}; }}
}}
</script>
</body>
</html>
'''
def brand(pfx,h=38):
    return f'<a href="#" aria-label="Altronix Software, home" style="display:inline-flex;align-items:center;gap:12px;min-height:44px">{logo_svg(pfx,h)}<span style="display:flex;flex-direction:column;gap:5px;line-height:1"><b style="font-size:19px;font-weight:800;letter-spacing:.05em;color:#fff">ALTRONIX</b><span style="font-size:8.5px;font-weight:600;letter-spacing:.924em;margin-right:-.924em;color:#bcd2f7">SOFTWARE</span></span></a>'
ARROW='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
import math
class Iso:
    def __init__(s,sc=20,ox=176,oy=34): s.sc,s.ox,s.oy=sc,ox,oy
    def P(s,x,y,z=0): return (s.ox+(x-y)*.866*s.sc, s.oy+(x+y)*.5*s.sc-z*s.sc)
    def pts(s,l): return ' '.join(f'{a:.1f},{b:.1f}' for a,b in l)
    def box(s,x,y,z,w,d,h,col,cls='',style='',gl=False,delay=0):
        t,l,r=col
        P=s.P
        top=[P(x,y,z+h),P(x+w,y,z+h),P(x+w,y+d,z+h),P(x,y+d,z+h)]
        left=[P(x,y+d,z+h),P(x+w,y+d,z+h),P(x+w,y+d,z),P(x,y+d,z)]
        right=[P(x+w,y,z+h),P(x+w,y+d,z+h),P(x+w,y+d,z),P(x+w,y,z)]
        g=f'<polygon class="gl" style="--l:{delay}s" points="{s.pts(top)}" fill="#fff"/>' if gl else ''
        return f'<g class="{cls}" style="{style}"><polygon points="{s.pts(left)}" fill="{l}"/><polygon points="{s.pts(right)}" fill="{r}"/><polygon points="{s.pts(top)}" fill="{t}"/>{g}<polyline points="{s.pts([top[0],top[1],top[2],top[3],top[0]])}" fill="none" stroke="rgba(255,255,255,.28)" stroke-width=".7"/></g>'
    def floor(s,x0,y0,x1,y1,step=1):
        o=''
        for i in range(int(x0),int(x1)+1,step):
            a,b=s.P(i,y0),s.P(i,y1); o+=f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}" y2="{b[1]:.1f}"/>'
        for j in range(int(y0),int(y1)+1,step):
            a,b=s.P(x0,j),s.P(x1,j); o+=f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}" y2="{b[1]:.1f}"/>'
        return f'<g stroke="rgba(120,160,230,.13)" stroke-width=".7">{o}</g>'
    def path(s,pl,z=.05): 
        return 'M'+' L'.join(f'{a:.1f} {b:.1f}' for a,b in (s.P(x,y,z) for x,y in pl))
    def line(s,pl,col='#22d6f4',op=.55):
        return f'<path class="df" d="{s.path(pl)}" fill="none" stroke="{col}" stroke-opacity="{op}" stroke-width="1.3" stroke-linejoin="round"/>'
    def pk(s,pl,col,d=3.4,l=0,r=3):
        return f'<g class="pk" style="offset-path:path(\'{s.path(pl,.3)}\');--d:{d}s;--l:{l}s"><circle r="{r*2.4}" fill="{col}" opacity=".22"/><circle r="{r}" fill="{col}"/></g>'
    def ring(s,x,y,rx,col,delay=0):
        cx,cy=s.P(x,y,0)
        return f'<ellipse class="ring" style="--l:{delay}s" cx="{cx:.1f}" cy="{cy:.1f}" rx="{rx}" ry="{rx*.5}" fill="none" stroke="{col}" stroke-width="1.2"/>'
DARK=('#2f4572','#1a2a4b','#121d36')
CY=('#5fe6f8','#0f90b2','#096683')
BL=('#5aa6ff','#1b66e0','#12449b')
VI=('#c4aafd','#7249dc','#4e30a6')
def isowrap(inner,vh=250): return f'<svg viewBox="0 0 400 {vh}" width="100%" style="display:block" role="img" aria-label="Simplified integration diagram, animated">{inner}</svg>'
def d_hybris():
    I=Iso(22,176,28); o=I.floor(-1,-1,11,8)
    ys=(0.6,2.6,4.6)
    for y in ys: o+=I.line([(1.8,y+.6),(4,y+.6),(4,3.6),(5,3.6)])
    o+=I.line([(7,3.6),(9,3.6)],'#8b5cf6',.7)
    # CI/CD track
    o+=I.line([(0.5,7.2),(10.5,7.2)],'#1a7cfb',.5)
    boxes=[]
    for i,y in enumerate(ys): boxes.append((0+y,I.box(0,y,0,1.8,1.2,.7,DARK,'bob',f'--d:{3.2+i*.4}s;--l:{i*.5}s')))
    boxes.append((7,I.box(5,2.6,0,2,2,1.5,CY,'bob','--d:4s',True,0)))
    for k in range(3): boxes.append((10+k,I.box(9,2.8,k*.9,1.8,1.6,.55,VI if k==1 else BL if k==2 else DARK,'bob',f'--d:3.6s;--l:{k*.3}s')))
    o+=I.ring(6,3.6,24,'#22d6f4',0)+I.ring(6,3.6,24,'#22d6f4',1.5)
    for _,b in sorted(boxes,key=lambda t:t[0]): o+=b
    for i,y in enumerate(ys): o+=I.pk([(1.8,y+.6),(4,y+.6),(4,3.6),(5,3.6)],'#5fe6f8',3.2,i*.9)
    o+=I.pk([(7,3.6),(9,3.6)],'#c4aafd',1.6,.6)
    for i in range(5):
        x=.8+i*2.35; c='#c4aafd' if i==4 else '#5fe6f8'; cx,cy=I.P(x,7.2,0)
        o+=f'<ellipse cx="{cx:.1f}" cy="{cy:.1f}" rx="7" ry="3.5" fill="#07101f" stroke="{c}" stroke-width="1.5"/><ellipse class="tick" style="--l:{i}s" cx="{cx:.1f}" cy="{cy:.1f}" rx="3" ry="1.5" fill="{c}"/>'
    o+=I.pk([(0.5,7.2),(10.5,7.2)],'#5aa6ff',5,0,2.6)
    for t,x,y in (('REST · SOAP',0,-.9),('DATA HUB',8.6,5.4),('CI/CD',-.2,8.4)):
        px,py=I.P(x,y,0); o+=f'<text x="{px:.0f}" y="{py:.0f}" font-family="JetBrains Mono,monospace" font-size="7.5" letter-spacing="1.1" fill="#9aa9be">{t}</text>'
    return isowrap(o)
def d_pim():
    I=Iso(18,172,24); o=I.floor(-1,-1,11,7)
    ys=(0.4,2.4,4.4)
    for y in ys: o+=I.line([(1.6,y+.6),(3.5,y+.6),(3.5,3.4),(4.6,3.4)])+I.line([(6.8,3.4),(8,3.4),(8,y+.6),(9.2,y+.6)],'#8b5cf6',.6)
    bx=[]
    for i,y in enumerate(ys):
        bx.append((y,I.box(0,y,0,1.6,1.2,.6,DARK,'bob',f'--d:{3.3+i*.3}s;--l:{i*.4}s')))
        bx.append((9.2+y,I.box(9.2,y,0,1.6,1.2,.6,('#8f78e8','#4e35a8','#38257c'),'bob',f'--d:{3.5+i*.3}s;--l:{i*.5+.3}s')))
    bx.append((6,I.box(4.6,2.6,0,2.2,1.8,1.4,CY,'bob','--d:4s',True)))
    o+=I.ring(5.7,3.5,22,'#22d6f4',0)
    for _,b in sorted(bx,key=lambda t:t[0]): o+=b
    for i,y in enumerate(ys):
        o+=I.pk([(1.6,y+.6),(3.5,y+.6),(3.5,3.4),(4.6,3.4)],'#5fe6f8',2.8,i*.8)+I.pk([(6.8,3.4),(8,3.4),(8,y+.6),(9.2,y+.6)],'#c4aafd',2.6,i*.8+1.2)
    return isowrap(o,230)
def d_log():
    I=Iso(20,150,34); o=I.floor(-1,-1,11,7)
    route=[(0.5,0.5),(0.5,3),(3.5,3),(3.5,1),(7,1),(7,5),(10,5)]
    o+=I.line(route,'#22d6f4',.5)
    stops=[(0.5,3),(3.5,1),(7,5),(10,5)]
    bx=[]
    for i,(x,y) in enumerate(stops):
        bx.append((x+y,I.box(x-.6,y-.6,0,1.2,1.2,1.0+i*.25,('#c4aafd','#7249dc','#4e30a6') if i==2 else CY,'bob',f'--d:{3.2+i*.3}s;--l:{i*.4}s',True,i*.5)))
    bx.append((1,I.box(-.1,-.1,0,1.2,1.2,.45,DARK)))
    for _,b in sorted(bx,key=lambda t:t[0]): o+=b
    o+=I.pk(route,'#5fe6f8',6,0,3.2)+I.pk(route,'#5fe6f8',6,3,3.2)
    for t,x,y in (('OPERATIONS',0,-1.2),):
        px,py=I.P(x,y,0); o+=f'<text x="{px:.0f}" y="{py:.0f}" font-family="JetBrains Mono,monospace" font-size="7.5" letter-spacing="1.1" fill="#9aa9be">{t}</text>'
    return isowrap(o,230)
def chips(l): return ''.join(f'<span class="chip">{x}</span>' for x in l)
def fact(k,v,extra=''): return f'<div style="{extra}"><div class="lbl" style="margin-bottom:6px">{k}</div><div style="font-size:15px;color:#f7f9fc;line-height:1.5">{v}</div></div>'
def nav(mobile):
    if mobile:
        return f'<header style="display:flex;align-items:center;justify-content:space-between;height:68px;padding:0 20px;border-bottom:1px solid rgba(255,255,255,.08)">{brand("m1",32)}<button aria-label="Open menu" style="width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.14);color:#fff;display:flex;align-items:center;justify-content:center"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button></header>'
    links=''.join(f'<a class="navl{" on" if n=="Work" else ""}" href="#">{n}</a>' for n in ('Services','Industries','Work','Process','About'))
    return f'<header style="display:flex;align-items:center;justify-content:space-between;height:76px;padding:0 120px;border-bottom:1px solid rgba(255,255,255,.08);position:relative"><div>{brand("d1",38)}</div><nav aria-label="Primary" style="display:flex;gap:32px">{links}</nav><a class="btn btn-p" href="#" style="height:44px">Send inquiry</a></header>'
def featured(m):
    pad='24px' if m else '40px'
    diag=f'<div class="panel" style="padding:{"8px" if m else "10px"};background:radial-gradient(ellipse at 50% 40%,#10203f,#0a1224)">{d_hybris()}</div>'
    txt=f'''<div style="display:flex;flex-direction:column;gap:{18 if not m else 16}px">
<div class="mono">E-commerce</div>
<h3 class="h2" style="font-size:{26 if m else 34}px">SAP Hybris e-commerce platform</h3>
<p style="margin:0;font-size:16px;line-height:1.6;color:#bcc6d6">OCC web services, Solr search, promotions and integrations for a furniture and home decor retailer.</p>
<div style="border:1px solid rgba(34,214,244,.4);background:rgba(34,214,244,.07);border-radius:12px;padding:16px 18px"><div class="lbl" style="margin-bottom:8px;color:#8fdde8">Result</div><div style="font-size:16px;font-weight:600;line-height:1.5">Features were delivered on time through the CI/CD process, and the platform stayed stable under high load.</div></div>
<div style="display:grid;grid-template-columns:{"1fr 1fr" if m else "2fr 1fr 1fr"};gap:20px 24px;padding-top:6px;border-top:1px solid rgba(255,255,255,.1);padding-top:20px">{fact("Focus","OCC web services, Solr search and promotion rules","grid-column:1/-1" if m else "")}{fact("Team","5 people")}{fact("Duration","5 months")}</div>
<div><div class="lbl" style="margin-bottom:10px">Stack</div><div style="display:flex;flex-wrap:wrap;gap:8px">{chips(["SAP Hybris 2011","Java 11","Spring","OCC","Spartacus","Solr","Data Hub","CI/CD"])}</div></div>
<a href="#" style="display:inline-flex;align-items:center;gap:8px;min-height:44px;font-weight:700;font-size:15px;color:#22d6f4">Read the case study {ARROW}</a>
</div>'''
    if m: return f'<div class="card" style="padding:{pad};display:flex;flex-direction:column;gap:22px">{diag}{txt}</div>'
    return f'<div class="card" style="padding:{pad};display:grid;grid-template-columns:1fr 520px;gap:48px;align-items:start">{txt}<div style="position:sticky;top:0">{diag}<div style="margin-top:16px;font-size:13px;color:#9aa9be;line-height:1.5">Simplified, animated diagram. Systems and names are generalised to protect client confidentiality.</div></div></div>'
def small(label,title,desc,role,focus,stack,diag,m):
    return f'''<article class="card" style="display:flex;flex-direction:column">
<div style="padding:{"14px 14px 0" if m else "18px 18px 0"}"><div class="panel" style="padding:6px;background:radial-gradient(ellipse at 50% 40%,#10203f,#0a1224)">{diag}</div></div>
<div style="padding:{"22px 20px 24px" if m else "26px 28px 30px"};display:flex;flex-direction:column;gap:16px;flex:1">
<div class="mono">{label}</div>
<h3 class="h2" style="font-size:{22 if m else 24}px">{title}</h3>
<p style="margin:0;font-size:15px;line-height:1.6;color:#bcc6d6">{desc}</p>
<div style="display:flex;flex-direction:column;gap:16px;border-top:1px solid rgba(255,255,255,.1);padding-top:18px">{fact("Role",role)}{fact("Focus",focus)}<div><div class="lbl" style="margin-bottom:10px">Stack</div><div style="display:flex;flex-wrap:wrap;gap:8px">{chips(stack)}</div></div></div>
</div></article>'''
def build(m):
    px='20px' if m else '120px'
    fl=''.join(f'<span class="chip" style="height:36px;padding:0 16px;font-weight:600;{"background:rgba(34,214,244,.1);border-color:rgba(34,214,244,.5);color:#fff" if i==0 else "color:#bcc6d6"}">{t}</span>' for i,t in enumerate(["All · 3","E-commerce","Product information","Logistics"]))
    hero=f'''<section style="position:relative;overflow:hidden;padding:{"36px 20px 28px" if m else "84px 120px 40px"}">
<div class="gridbg" style="position:absolute;inset:0;pointer-events:none"></div>
<div style="position:absolute;left:{"-120px" if m else "820px"};top:-120px;width:{"420px" if m else "720px"};height:{"360px" if m else "520px"};background:radial-gradient(closest-side,rgba(26,124,251,.22),transparent);pointer-events:none"></div>
<div class="rise" style="position:relative;display:flex;flex-direction:column;gap:{16 if m else 20}px">
<div class="mono" style="display:flex;align-items:center;gap:12px"><span style="width:28px;height:1px;background:#22d6f4"></span>Selected work</div>
<h1 class="h1" style="font-size:{44 if m else 72}px">Client projects.</h1>
<p style="margin:0;font-size:{17 if m else 20}px;color:#bcc6d6;max-width:640px;line-height:1.5">Client names are confidential. Each project below is described by role, focus and stack.</p>
<div role="group" aria-label="Filter by industry" style="display:flex;flex-wrap:wrap;gap:10px;margin-top:8px">{fl}</div>
</div></section>'''
    two=f'<div style="display:grid;grid-template-columns:{"1fr" if m else "1fr 1fr"};gap:{20 if m else 28}px">'+small("Product information (PIM)","Product information platform","Centralized product information, integrations and enterprise workflows.","Backend and integration engineering","Data flows and workflow integrity",["Java","Spring","Enterprise APIs"],d_pim(),m)+small("Logistics","Logistics operations platform","Backend systems for logistics workflows, APIs and day-to-day operations.","Backend engineering","Operational workflows and API design",["Java","Spring","Cloud"],d_log(),m)+'</div>'
    steps=''.join(f'<div style="display:flex;align-items:center;gap:12px;{"" if m else "flex:1"}"><span class="mono" style="color:{"#b79bfd" if i==3 else "#8fdde8"}">0{i+1}</span><span style="font-weight:700;font-size:15px">{t}</span></div>' for i,t in enumerate(["Understand","Design","Build and prove","Launch and improve"]))
    proc=f'<div class="card" style="padding:{"20px" if m else "24px 32px"};display:flex;flex-direction:{"column" if m else "row"};gap:{14 if m else 24}px;align-items:{"flex-start" if m else "center"}"><div class="lbl" style="{"" if m else "width:200px"}">How every project runs</div>{steps}</div>'
    cta=f'''<section class="card" style="position:relative;padding:{"28px 22px" if m else "56px 64px"};display:flex;flex-direction:{"column" if m else "row"};justify-content:space-between;align-items:{"flex-start" if m else "center"};gap:{24 if m else 40}px;background:linear-gradient(120deg,#0f1a30,#10173a)">
<div style="position:absolute;right:-60px;top:-80px;width:360px;height:260px;background:radial-gradient(closest-side,rgba(139,92,246,.28),transparent);pointer-events:none"></div>
<div style="position:relative;max-width:640px;display:flex;flex-direction:column;gap:12px"><h2 class="h2" style="font-size:{28 if m else 40}px">Describe the system and the problem.</h2><p style="margin:0;font-size:16px;color:#bcc6d6;line-height:1.6">Start with a free 30-minute architecture check-up.</p></div>
<div style="position:relative;display:flex;flex-direction:column;gap:12px;{"width:100%" if m else "align-items:flex-end"}"><a class="btn btn-p" href="#" style="{"width:100%" if m else ""}">Send message</a><span style="font-size:13px;color:#9aa9be">[Contact email — placeholder]</span></div></section>'''
    fl2=''.join(f'<a class="navl" href="#" style="font-size:14px">{n}</a>' for n in ('Services','Industries','Work','Process','About'))
    foot=f'''<footer style="border-top:1px solid rgba(255,255,255,.08);padding:{"28px 20px 36px" if m else "40px 120px 48px"};display:flex;flex-direction:{"column" if m else "row"};justify-content:space-between;align-items:{"flex-start" if m else "center"};gap:20px">{brand("f1",32)}<nav aria-label="Footer" style="display:flex;flex-wrap:wrap;gap:{"6px 20px" if m else "28px"}">{fl2}</nav><div style="font-size:13px;color:#9aa9be;line-height:1.6">Altronixsoft OÜ · Tallinn, Estonia<br>Privacy Policy · LinkedIn</div></footer>'''
    main=f'<main style="padding:{"0 20px" if m else "0 120px"};display:flex;flex-direction:column;gap:{20 if m else 28}px;margin-top:{8 if m else 16}px;padding-bottom:{48 if m else 96}px">{featured(m)}{two}{proc}{cta}</main>'
    return nav(m)+hero+main+foot
if __name__=='__main__':
    import os
    out=sys.argv[1]; hs=json.loads(sys.argv[2])
    for name,m,w,key in (('Portfolio_Desktop',False,1440,'d'),('Portfolio_Mobile',True,390,'m')):
        h=hs[key]
        t='Portfolio — desktop 1440' if not m else 'Portfolio — mobile 390'
        open(f'{out}/{name}.dc.html','w').write(page(t,w,h,build(m)))
