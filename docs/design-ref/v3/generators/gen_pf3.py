import sys,json
import gen_pf as G
import gen_pf2 as G2
from gen_pf import page
EXTRA3=G2.EXTRA+'''
@property --a{syntax:'<angle>';inherits:false;initial-value:35deg}
.fr{--c:#22d6f4;position:relative;display:block;padding:1px;border-radius:17px;background:conic-gradient(from var(--a),rgba(255,255,255,.16) 0 50%,var(--c) 78%,rgba(255,255,255,.16) 100%);animation:spin 7s linear infinite;transition:transform .35s cubic-bezier(.2,.75,.2,1),box-shadow .35s;box-sizing:border-box}
@keyframes spin{to{--a:395deg}}
.fr::before{content:"";position:absolute;inset:-8px;pointer-events:none;border-radius:20px;opacity:.5;transition:inset .35s,opacity .35s;background:linear-gradient(var(--c),var(--c)) 0 0/14px 1.5px no-repeat,linear-gradient(var(--c),var(--c)) 0 0/1.5px 14px no-repeat,linear-gradient(var(--c),var(--c)) 100% 0/14px 1.5px no-repeat,linear-gradient(var(--c),var(--c)) 100% 0/1.5px 14px no-repeat,linear-gradient(var(--c),var(--c)) 0 100%/14px 1.5px no-repeat,linear-gradient(var(--c),var(--c)) 0 100%/1.5px 14px no-repeat,linear-gradient(var(--c),var(--c)) 100% 100%/14px 1.5px no-repeat,linear-gradient(var(--c),var(--c)) 100% 100%/1.5px 14px no-repeat}
.fr:hover{transform:translateY(-4px);box-shadow:0 18px 40px -22px var(--c)}
.fr:hover::before{inset:-5px;opacity:1}
.fr{height:100%}
.fr .in{background:#0a1326;border-radius:16px;overflow:hidden;position:relative;height:100%;display:flex;flex-direction:column}
.fr .cap{flex:1;min-height:132px;box-sizing:border-box}
.fr .ttl{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fr .img{flex:none}
.fr .img{position:relative;overflow:hidden;background:radial-gradient(ellipse at 50% 45%,#10203f,#0a1224);border-bottom:1px solid rgba(255,255,255,.07)}
.fr .img .sc{width:100%;height:100%;transition:transform .6s cubic-bezier(.2,.75,.2,1)}
.fr:hover .img .sc{transform:scale(1.07)}
.fr .go{width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center;flex:none;color:#fff;transition:background .3s,border-color .3s,color .3s}
.fr:hover .go{background:var(--c);border-color:var(--c);color:#07101f}
.fr .go svg{transition:transform .3s}
.fr:hover .go svg{transform:rotate(-45deg)}
.fr a.stretch::after{border-radius:16px}
.dashed{border:1px dashed rgba(255,255,255,.22);border-radius:16px;box-sizing:border-box}
@media (prefers-reduced-motion:reduce){.fr{animation:none}}
'''
COL={'Client · NDA':'#8b5cf6','Open source':'#52d8ae','In development':'#22d6f4'}
TXT={'Client · NDA':'#b79bfd','Open source':'#52d8ae','In development':'#8fdde8'}
ARR='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
ARR_UP=ARR.replace('<svg ','<svg style="transform:rotate(-45deg)" ')
def card(t,i,h,m,big):
    c=COL[t['tag']]; tc=TXT[t['tag']]
    badge=f'<span style="display:inline-flex;align-items:center;gap:7px;height:24px;padding:0 10px;border:1px solid {c}66;border-radius:999px;background:rgba(7,16,31,.7);font-family:JetBrains Mono,monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:{tc}"><i style="width:6px;height:6px;border-radius:50%;background:{tc};display:block"></i>{t["tag"]}</span>'
    idx=f'<span style="font-family:JetBrains Mono,monospace;font-size:11px;letter-spacing:.12em;color:#8fdde8">{i+1:02d}</span>'
    scene=f'<div class="sc" style="transform:translateY({14 if big else 8}px) scale({1.0 if big else 1.04})">{t["scene"]()}</div>'
    cap_t=24 if big else 18
    caption=f'''<div class="cap" style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;padding:{"20px 24px 22px" if big else "16px 18px 18px"}">
<div style="min-width:0"><div class="ttl" style="font-weight:700;font-size:{cap_t if not m else 20}px;letter-spacing:-.03em;line-height:1.2">{t["title"]}</div>
<p style="margin:8px 0 0;min-height:43px;font-size:14px;line-height:1.55;color:#bcc6d6;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">{t["desc"]}</p><div style="margin-top:10px;font-family:JetBrains Mono,monospace;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:#9aa9be">{t["cat"]}</div></div>
<span class="go">{ARR}</span></div>'''
    return f'''<article class="fr" style="--c:{c}"><div class="in"><div class="img" style="height:{h}px"><div style="position:absolute;top:14px;left:16px;z-index:3">{idx}</div><div style="position:absolute;top:10px;right:12px;z-index:3">{badge}</div>{scene}</div>{caption}<a class="stretch" href="#" aria-label="Open project: {t["title"]}" style="position:absolute;inset:0;z-index:5;border-radius:16px"></a></div></article>'''
def nav_hero_pill(m,label='View all projects'):
    return f'<a href="#" style="display:inline-flex;align-items:center;gap:10px"><span style="display:inline-flex;align-items:center;height:48px;padding:0 22px;border:1px solid rgba(255,255,255,.28);border-radius:999px;font-weight:700;font-size:14px">{label}</span><span style="width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,.28);display:flex;align-items:center;justify-content:center;color:#22d6f4">{ARR_UP}</span></a>'
SEL=[0,3,4,5]
def selected(m):
    T=G2.TILES
    head=f'''<div style="display:flex;flex-direction:{"column" if m else "row"};justify-content:space-between;align-items:{"flex-start" if m else "flex-end"};gap:20px;margin-bottom:{28 if m else 40}px">
<div style="display:flex;flex-direction:column;gap:{14 if m else 18}px"><div class="mono" style="display:flex;align-items:center;gap:12px"><span style="width:28px;height:1px;background:#22d6f4"></span>Selected work</div>
<h2 class="h1" style="font-size:{40 if m else 64}px">Selected projects.</h2>
<p style="margin:0;font-size:{16 if m else 18}px;color:#bcc6d6;line-height:1.5;max-width:560px">Four of eight. Client systems under NDA, our own products and AI projects. Each one opens.</p></div>
{nav_hero_pill(m)}</div>'''
    cards=''.join(card(T[k],j,230 if m else 320,m,True) for j,k in enumerate(SEL))
    grid=f'<div style="display:grid;grid-template-columns:{"1fr" if m else "1fr 1fr"};gap:{22 if m else 32}px">{cards}</div>'
    return f'''<section style="position:relative;overflow:hidden;padding:{"48px 20px 56px" if m else "96px 120px 112px"}"><div class="gridbg" style="position:absolute;inset:0;pointer-events:none"></div>
<div style="position:absolute;left:{"-100px" if m else "-200px"};top:40%;width:600px;height:500px;background:radial-gradient(closest-side,rgba(139,92,246,.12),transparent);pointer-events:none"></div>
<div style="position:relative">{head}{grid}</div></section>'''
def works(m):
    T=G2.TILES
    fl=''.join(f'<span class="chip" style="height:34px;padding:0 15px;font-weight:600;{"background:rgba(34,214,244,.1);border-color:rgba(34,214,244,.5);color:#fff" if i==0 else "color:#bcc6d6"}">{x}</span>' for i,x in enumerate(["All · 8","Client work · 3","AI · 4","Products · 1"]))
    hero=f'''<section style="position:relative;overflow:hidden;padding:{"32px 20px 24px" if m else "72px 120px 36px"}"><div class="gridbg" style="position:absolute;inset:0;pointer-events:none"></div>
<div style="position:relative;display:flex;flex-direction:{"column" if m else "row"};justify-content:space-between;align-items:{"flex-start" if m else "flex-end"};gap:24px">
<div style="display:flex;flex-direction:column;gap:16px"><div class="mono" style="display:flex;align-items:center;gap:10px"><span style="width:8px;height:8px;border-radius:50%;background:#22d6f4"></span>Works</div>
<h1 class="h1" style="font-size:{44 if m else 72}px">Our portfolio.</h1></div>
<div style="display:flex;flex-direction:column;gap:14px;{"" if m else "align-items:flex-end;max-width:520px"}"><p style="margin:0;font-size:16px;color:#bcc6d6;line-height:1.55;{"" if m else "text-align:right"}">Client systems under NDA, our own products and open-source AI work. Statuses are shown on each project.</p>
<div style="display:flex;flex-wrap:wrap;gap:8px;{"" if m else "justify-content:flex-end"}">{fl}</div></div></div></section>'''
    cards=[card(t,i,200 if m else 290,m,not m) for i,t in enumerate(T)]
    cta=f'''<a href="#" class="dashed" style="display:flex;flex-direction:{"column" if m else "row"};justify-content:space-between;align-items:{"stretch" if m else "center"};gap:{0 if m else 40}px;grid-column:{"auto" if m else "span 2"};padding:{"22px" if m else "32px 40px"};min-height:{250 if m else 0}px;background:repeating-linear-gradient(135deg,rgba(255,255,255,.02) 0 10px,transparent 10px 20px)"><span class="mono" style="{"" if m else "white-space:nowrap"}">09 · Next</span><div style="{"" if m else "flex:1;max-width:640px"}"><div style="font-weight:700;font-size:22px;letter-spacing:-.03em;line-height:1.2;margin-bottom:10px">Your project could be next.</div><div style="font-size:14px;color:#bcc6d6;line-height:1.55;margin-bottom:16px">Describe the system and the problem. Start with a free 30-minute architecture check-up.</div><span style="display:inline-flex;align-items:center;gap:8px;font-weight:700;font-size:14px;color:#22d6f4">Send message {ARR}</span></div></a>'''
    grid=f'<div style="display:grid;grid-template-columns:{"1fr" if m else "1fr 1fr"};gap:{22 if m else 32}px">{"".join(cards)}{cta}</div>'
    base=G.build(m)
    k=base.index('<footer'); foot=base[k:]
    note='<p style="margin:0;font-size:13px;color:#9aa9be;line-height:1.6">Client project names are confidential; diagrams are simplified and generalised. Bracketed links are placeholders to confirm.</p>'
    main=f'<main style="padding:{"8px 20px 48px" if m else "12px 120px 96px"};display:flex;flex-direction:column;gap:{22 if m else 32}px">{grid}{note}</main>'
    return G.nav(m)+hero+main+foot
def sel_page(m):
    return selected(m)
if __name__=='__main__':
    out=sys.argv[1]; hs=json.loads(sys.argv[2])
    for name,fn,w,key,t in (('SelProj_Desktop',selected,1440,'sd','Selected projects — desktop'),('SelProj_Mobile',selected,390,'sm','Selected projects — mobile'),('Works_Desktop',works,1440,'wd','All projects — desktop'),('Works_Mobile',works,390,'wm','All projects — mobile')):
        m=w==390
        open(f'{out}/{name}.dc.html','w').write(page(t,w,hs[key],fn(m),EXTRA3))
