import sys,json
import gen_pf as G
from gen_pf import Iso,DARK,CY,BL,VI,isowrap,ARROW,brand,chips,page
EXTRA='''
.tile{position:relative;transition:transform .35s cubic-bezier(.2,.75,.2,1),border-color .35s;box-sizing:border-box}
.tile:hover{transform:translateY(-4px);border-color:rgba(34,214,244,.45)}
.tile a.stretch::after{content:"";position:absolute;inset:0;z-index:2;border-radius:16px}
.tile .arrow{display:inline-block;transition:transform .3s}
.tile:hover .arrow{transform:translateX(4px)}
.tile .scene{transition:transform .5s cubic-bezier(.2,.75,.2,1)}
.tile .scene{transform-origin:50% 52%}
.grow{transform-box:fill-box;transform-origin:50% 100%;animation:grow var(--d,3.6s) ease-in-out infinite;animation-delay:var(--l,0s)}
@keyframes grow{0%,100%{transform:scaleY(.8)}50%{transform:scaleY(1)}}
.scan{animation:scan 2.4s ease-in-out infinite;animation-delay:var(--l,0s)}
@keyframes scan{0%,100%{opacity:.08}50%{opacity:.5}}
.spin{animation:df 1.2s linear infinite}
@media (prefers-reduced-motion:reduce){.grow,.scan{animation:none}}
'''
def plane(I,x,y0,y1,z0,z1,col='#22d6f4',delay=0):
    q=[I.P(x,y0,z0),I.P(x,y1,z0),I.P(x,y1,z1),I.P(x,y0,z1)]
    return f'<polygon class="scan" style="--l:{delay}s" points="{I.pts(q)}" fill="{col}" stroke="{col}" stroke-opacity=".7" stroke-width=".8"/>'
def sheet(I,route,d=3.4,l=0):
    return f'<g class="pk" style="offset-path:path(\'{I.path(route,.35)}\');--d:{d}s;--l:{l}s"><polygon points="-7,0 0,-3.8 7,0 0,3.8" fill="#dbe7ff"/><polygon points="-7,0 0,3.8 7,0 7,1.6 0,5.4 -7,1.6" fill="#7f94c4"/></g>'
def ellring(I,cx,cy,z,rx,col,dash=True):
    X,Y=I.P(cx,cy,z)
    return f'<ellipse class="{"df" if dash else ""}" cx="{X:.1f}" cy="{Y:.1f}" rx="{rx}" ry="{rx/2}" fill="none" stroke="{col}" stroke-opacity=".6" stroke-width="1.2"/>'
def srt(b): return ''.join(x for _,x in sorted(b,key=lambda t:t[0]))
def sc_compass():
    I=Iso(20,156,40); o=I.floor(-1,-1,11,7)
    b=[(0,I.box(0.4,0.2,0,9.4,5.6,.3,DARK))]
    pos=[(1.4,.9,1.3,CY),(4.2,.9,2.4,BL),(7,.9,1.7,VI),(1.4,3.6,2.7,BL),(4.2,3.6,1.9,CY),(7,3.6,1.4,('#8f78e8','#4e35a8','#38257c'))]
    for i,(x,y,h,c) in enumerate(pos): b.append((x+y+1,I.box(x,y,.3,1.6,1.6,h,c,'grow',f'--d:{3.4+i*.35}s;--l:{i*.45}s',h>2)))
    o+=ellring(I,5.1,3.1,.31,92,'#22d6f4')+ellring(I,5.1,3.1,.31,64,'#8b5cf6',False)
    o+=srt(b)
    loop=[(.8,.4),(9.4,.4),(9.4,5.6),(.8,5.6),(.8,.4)]
    o+=I.pk(loop,'#5fe6f8',9,0,2.8)+I.pk(loop,'#c4aafd',9,4.5,2.8)
    return isowrap(o,240)
def sc_rag():
    I=Iso(21,140,46); o=I.floor(-1,-1,11,7)
    route=[(1.4,3),(9.2,3)]
    o+=I.line(route)
    b=[]
    for k in range(3): b.append((2.2+k*.01,I.box(0,2.2,k*.32,1.8,1.6,.26,('#c9d6f5','#7f94c4','#5d729f'),'bob',f'--d:3.4s;--l:{k*.3}s')))
    for k in range(3): b.append((5+k*.01,I.box(2.9,2.1,k*.5,1.7,1.7,.34,BL if k==1 else DARK,'bob',f'--d:3.8s;--l:{k*.25}s')))
    b+= [(8,I.box(5.7,.9,0,.45,.45,2.3,DARK)),(9,I.box(5.7,4.2,0,.45,.45,2.3,DARK))]
    b.append((12,I.box(7.3,2.2,0,1.6,1.6,1.3,CY,'bob','--d:4s',True)))
    b.append((14,I.box(9.6,2.4,0,1.2,1.2,.5,VI,'bob','--d:3.2s;--l:.4s')))
    o+=srt(b)
    o+=plane(I,5.92,1.2,4.6,0,2.3)
    o+=I.ring(8.1,3,22,'#22d6f4',0)
    o+=I.pk(route,'#5fe6f8',4,0)+I.pk(route,'#5fe6f8',4,1.4)+I.pk(route,'#5fe6f8',4,2.8)
    return isowrap(o,240)
def sc_agent():
    I=Iso(21,152,54); o=I.floor(-1,-1,11,7)
    core=(4.3,2.3)
    routes=[[(4.3,2.3+1),(4.3,5.2)],[(4.3,2.3),(4.3,.2)],[(3.3,3.1),(1.6,3.1)],[(5.3,3.1),(9.2,3.1)]]
    o+=I.line([(5.2,3.2),(9.0,3.2)],'#8b5cf6',.7)+I.line([(3.4,3.2),(1.8,3.2)])+I.line([(4.3,4.4),(4.3,6.3)])+I.line([(4.3,2.2),(4.3,-.4)])
    b=[(8,I.box(3.3,2.2,0,2,2,1.5,CY,'bob','--d:4s',True))]
    b.append((2,I.box(0,2.6,0,1.6,1.2,.6,DARK,'bob','--d:3.2s')))
    b.append((0,I.box(3.6,-1.8,0,1.4,1.2,.6,DARK,'bob','--d:3.5s;--l:.4s')))
    b.append((12,I.box(3.6,5.7,0,1.4,1.2,.6,DARK,'bob','--d:3.7s;--l:.8s')))
    b.append((14,I.box(9,2.6,0,1.6,1.2,.9,VI,'bob','--d:3.3s;--l:.2s',True)))
    o+=I.ring(4.3,3.2,26,'#22d6f4',0)+I.ring(4.3,3.2,26,'#22d6f4',1.5)
    o+=srt(b)
    for i,r in enumerate([[(3.4,3.2),(1.8,3.2)],[(4.3,2.2),(4.3,-.4)],[(4.3,4.4),(4.3,6.3)]]):
        o+=I.pk(r,'#5fe6f8',2.4,i*.7)+I.pk(r[::-1],'#9ad0ff',2.4,i*.7+1.2)
    o+=I.pk([(5.2,3.2),(9.0,3.2)],'#c4aafd',2.6,.5)+I.pk([(9.0,3.2),(5.2,3.2)],'#c4aafd',2.6,1.9)
    return isowrap(o,240)
def sc_docs():
    I=Iso(21,126,48); o=I.floor(-1,-1,11,7)
    route=[(1.6,3.1),(10,3.1)]
    o+=I.line(route)
    b=[]
    for k in range(4): b.append((2.3+k*.01,I.box(0,2.3,k*.3,1.6,1.6,.24,('#dbe7ff','#8197c7','#5f759f'),'bob',f'--d:3.4s;--l:{k*.25}s')))
    b+= [(7,I.box(4.2,1.3,0,.45,.45,2,DARK)),(9,I.box(4.2,4.6,0,.45,.45,2,DARK))]
    n=0
    for i in range(3):
        for j in range(3):
            h=.5+((i*3+j)%4)*.35
            b.append((7.8+i*1.3+j*1.2+3,I.box(7+i*1.2,1.5+j*1.2,0,.95,.95,h,CY if (i+j)%2==0 else (VI if (i+j)%3==0 else BL),'grow',f'--d:{3.2+n*.2}s;--l:{n*.3}s')));n+=1
    o+=srt(b)
    o+=plane(I,4.42,1.6,4.9,0,2)
    o+=''.join(sheet(I,[(1.8,3.1),(7,3.1)],4,k*1.3) for k in range(3))
    return isowrap(o,240)
def sc_gateway():
    I=Iso(21,140,46); o=I.floor(-1,-1,11,7)
    ins=[(1.9,3)]
    o+=I.line([(1.7,3.1),(3.5,3.1)])
    fan=[[(5.6,3.1),(6.8,3.1),(6.8,y+.6),(7.6,y+.6)] for y in (0.3,2.5,4.7)]
    for f in fan: o+=I.line(f,'#8b5cf6',.65)
    b=[(2,I.box(0,1.2,0,1.8,3.8,.5,DARK,'bob','--d:3.4s'))]
    b.append((8,I.box(3.5,2.1,0,2.1,2.1,1.3,BL,'bob','--d:3.8s',True)))
    for i,(y,h,c) in enumerate(((0.3,2.4,CY),(2.5,1.5,VI),(4.7,2,('#5aa6ff','#1b66e0','#12449b')))):
        b.append((9+y,I.box(7.6,y,0,1.8,1.4,h,c,'grow',f'--d:{3.4+i*.4}s;--l:{i*.5}s',True)))
    o+=I.ring(4.6,3.1,24,'#5aa6ff',0)
    o+=srt(b)
    for k in range(3): o+=I.pk([(1.7,3.1),(3.5,3.1)],'#5fe6f8',1.6,k*.5,2.4)
    for i,f in enumerate(fan): o+=I.pk(f,'#c4aafd' if i==1 else '#5fe6f8',2.6,i*.7+.4)
    return isowrap(o,240)
import scenes2 as S2
def full(svg): return svg.replace('width="100%" style="display:block"','width="100%" height="100%" style="display:block"')
TILES=[
 dict(w=2,cat='E-commerce',tag='Client · NDA',title='SAP Hybris e-commerce platform',desc='OCC web services, Solr search, promotions and integrations for a furniture and home decor retailer.',stack=['SAP Hybris','Java 11','Spring','Solr'],link='Read the case study',ext=False,scene=lambda:full(S2.sc_shop())),
 dict(w=1,cat='Product information',tag='Client · NDA',title='Product information platform',desc='Centralized product information, integrations and enterprise workflows.',stack=['Java','Spring','Enterprise APIs'],link='Read the case study',ext=False,scene=lambda:full(S2.sc_pim())),
 dict(w=1,cat='Logistics',tag='Client · NDA',title='Logistics operations platform',desc='Backend systems for logistics workflows, APIs and day-to-day operations.',stack=['Java','Spring','Cloud'],link='Read the case study',ext=False,scene=lambda:full(S2.sc_logi())),
 dict(w=2,cat='Own product · Management',tag='In development',title='Compass AI',desc='Management platform for IT service companies: a weekly ScoreCard across six business modules.',stack=['Java','Spring Modulith','Next.js'],link='[Product URL — confirm]',ext=True,scene=lambda:full(sc_compass())),
 dict(w=1,cat='AI · Retrieval',tag='Open source',title='Secure RAG',desc='Enterprise retrieval-augmented generation in Java, with access control in front of the model.',stack=['Java','RAG','GitHub'],link='View on GitHub',ext=True,scene=lambda:full(sc_rag())),
 dict(w=1,cat='AI · Agents',tag='In development',title='AI Business Workflow Agent',desc='An agent that runs a business workflow across systems, with a human approval step.',stack=['Java','Agents','Workflows'],link='[Repository URL]',ext=True,scene=lambda:full(sc_agent())),
 dict(w=2,cat='AI · Documents',tag='In development',title='AI Document Processing',desc='Turns incoming documents into structured, checked data that downstream systems can use.',stack=['Java','Extraction','Validation'],link='[Repository URL]',ext=True,scene=lambda:full(sc_docs())),
 dict(w=2,cat='AI · Infrastructure',tag='In development',title='LLM Gateway',desc='One entry point to several language models, with routing, limits and an audit trail.',stack=['Java','Routing','Audit'],link='[Repository URL]',ext=True,scene=lambda:full(sc_gateway())),
]
TAGC={'Client · NDA':('#b79bfd','rgba(183,155,253,.35)'),'Open source':('#52d8ae','rgba(82,216,174,.35)'),'In development':('#8fdde8','rgba(143,221,232,.35)')}
def tile(t,m):
    tc,tb=TAGC[t['tag']]
    st=chips(t['stack'])
    status=f'<span style="display:inline-flex;align-items:center;gap:8px;height:24px;padding:0 10px;border:1px solid {tb};border-radius:999px;font-family:JetBrains Mono,monospace;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:{tc}"><i style="width:6px;height:6px;border-radius:50%;background:{tc};display:block"></i>{t["tag"]}</span>'
    arrow='↗' if t['ext'] else '→'
    link=f'<a class="stretch" href="#" style="display:inline-flex;align-items:center;gap:8px;min-height:44px;font-weight:700;font-size:14px;color:#22d6f4">{t["link"]} <span class="arrow" aria-hidden="true">{arrow}</span></a>'
    z=1.2 if t["w"]==2 and not m else 1.12
    panel=f'<div class="scene" style="width:100%;height:100%;transform:scale({z})">{t["scene"]()}</div><div style="position:absolute;bottom:14px;left:14px;z-index:3">{status}</div>'
    pbg='position:relative;overflow:hidden;background:radial-gradient(ellipse at 50% 45%,#10203f,#0a1224)'
    text=f'''<div style="display:flex;flex-direction:column;gap:{12 if m else 14}px;padding:{"22px 20px 18px" if m else "26px 28px 20px"};flex:1">
<div><span class="mono">{t["cat"]}</span></div>
<h3 class="h2" style="font-size:{22 if m else (26 if t["w"]==2 else 22)}px">{t["title"]}</h3>
<p style="margin:0;font-size:15px;line-height:1.6;color:#bcc6d6">{t["desc"]}</p>
<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:2px">{st}</div>
<div style="margin-top:auto;padding-top:6px;border-top:1px solid rgba(255,255,255,.08)">{link}</div></div>'''
    if m:
        return f'<article class="card tile" style="display:flex;flex-direction:column"><div style="{pbg};aspect-ratio:400/240;border-bottom:1px solid rgba(255,255,255,.08)">{panel}</div>{text}</article>'
    if t['w']==2:
        return f'<article class="card tile" style="grid-column:span 2;display:grid;grid-template-columns:1fr 1.1fr"><div style="display:flex;flex-direction:column">{text}</div><div style="{pbg};border-left:1px solid rgba(255,255,255,.08);box-sizing:border-box">{panel}</div></article>'
    return f'<article class="card tile" style="display:flex;flex-direction:column"><div style="{pbg};aspect-ratio:400/250;flex:none;border-bottom:1px solid rgba(255,255,255,.08)">{panel}</div>{text}</article>'
def build(m):
    base=G.build(m)
    # reuse header/footer/cta from G by slicing pieces
    nav=G.nav(m)
    fl=''.join(f'<span class="chip" style="height:36px;padding:0 16px;font-weight:600;{"background:rgba(34,214,244,.1);border-color:rgba(34,214,244,.5);color:#fff" if i==0 else "color:#bcc6d6"}">{x}</span>' for i,x in enumerate(["All · 8","Client work · 3","AI · 4","Products · 1"]))
    hero=f'''<section style="position:relative;overflow:hidden;padding:{"36px 20px 28px" if m else "84px 120px 40px"}">
<div class="gridbg" style="position:absolute;inset:0;pointer-events:none"></div>
<div style="position:absolute;left:{"-120px" if m else "820px"};top:-120px;width:{"420px" if m else "720px"};height:{"360px" if m else "520px"};background:radial-gradient(closest-side,rgba(26,124,251,.22),transparent);pointer-events:none"></div>
<div class="rise" style="position:relative;display:flex;flex-direction:column;gap:{16 if m else 20}px">
<div class="mono" style="display:flex;align-items:center;gap:12px"><span style="width:28px;height:1px;background:#22d6f4"></span>Portfolio</div>
<h1 class="h1" style="font-size:{44 if m else 72}px">Selected work.</h1>
<p style="margin:0;font-size:{17 if m else 20}px;color:#bcc6d6;max-width:720px;line-height:1.5">Client systems under NDA, our own products and open-source AI projects. Every tile opens the project.</p>
<div role="group" aria-label="Filter" style="display:flex;flex-wrap:wrap;gap:10px;margin-top:8px">{fl}</div></div></section>'''
    tiles=''.join(tile(t,m) for t in TILES)
    grid=f'<div style="display:grid;grid-template-columns:{"1fr" if m else "repeat(4,1fr)"};grid-auto-rows:{"auto" if m else "minmax(480px,auto)"};gap:{18 if m else 20}px">{tiles}</div>'
    note=f'<p style="margin:0;font-size:13px;color:#9aa9be;line-height:1.6">Client project names are confidential; diagrams are simplified and generalised. Statuses and links for projects marked in brackets are placeholders to confirm.</p>'
    i=base.index('<section class="card"'); j=base.index('</section>',i)+10
    cta=base[i:j]; k=base.index('<footer'); foot=base[k:]
    main=f'<main style="padding:{"0 20px" if m else "0 120px"};display:flex;flex-direction:column;gap:{20 if m else 28}px;margin-top:{8 if m else 16}px;padding-bottom:{48 if m else 96}px">{grid}{note}{cta}</main>'
    return nav+hero+main+foot
if __name__=='__main__':
    out=sys.argv[1]; hs=json.loads(sys.argv[2])
    for name,m,w,key in (('Portfolio2_Desktop',False,1440,'d'),('Portfolio2_Mobile',True,390,'m')):
        t='Portfolio v2 — desktop 1440' if not m else 'Portfolio v2 — mobile 390'
        open(f'{out}/{name}.dc.html','w').write(page(t,w,hs[key],build(m),EXTRA))
