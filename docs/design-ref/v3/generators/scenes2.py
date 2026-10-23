from gen_pf import Iso,DARK,CY,BL,VI,isowrap
from gen_pf2 import srt,plane,sheet,ellring
AMB=('#ffd9a0','#c98a3a','#8f5f22')
def roof(I,x,y,z,w,d,h,rh,cols,cls='',style=''):
    P=I.P; m=y+d/2
    back=[P(x,y,z+h),P(x+w,y,z+h),P(x+w,m,z+h+rh),P(x,m,z+h+rh)]
    front=[P(x,y+d,z+h),P(x+w,y+d,z+h),P(x+w,m,z+h+rh),P(x,m,z+h+rh)]
    gab=[P(x+w,y,z+h),P(x+w,y+d,z+h),P(x+w,m,z+h+rh)]
    return f'<g class="{cls}" style="{style}"><polygon points="{I.pts(back)}" fill="{cols[2]}"/><polygon points="{I.pts(gab)}" fill="{cols[2]}"/><polygon points="{I.pts(front)}" fill="{cols[0]}"/><polyline points="{I.pts(front+[front[0]])}" fill="none" stroke="rgba(255,255,255,.3)" stroke-width=".7"/></g>'
def road(I,route,wd=.8,col='#22345a'):
    o=''
    for (x0,y0),(x1,y1) in zip(route,route[1:]):
        if x0==x1: q=[(x0-wd/2,min(y0,y1)-wd/2),(x0+wd/2,min(y0,y1)-wd/2),(x0+wd/2,max(y0,y1)+wd/2),(x0-wd/2,max(y0,y1)+wd/2)]
        else: q=[(min(x0,x1)-wd/2,y0-wd/2),(max(x0,x1)+wd/2,y0-wd/2),(max(x0,x1)+wd/2,y0+wd/2),(min(x0,x1)-wd/2,y0+wd/2)]
        o+=f'<polygon points="{I.pts([I.P(a,b,0.02) for a,b in q])}" fill="{col}" stroke="rgba(120,160,230,.18)" stroke-width=".7"/>'
    return o
def cub(w,d,h,sc,face,ox=0,oy=0):
    ex=(.866*sc,.5*sc); ey=(-.866*sc,.5*sc); ez=(0,-sc)
    def v(a,b,c): return (ox+a*ex[0]+b*ey[0]+c*ez[0], oy+a*ex[1]+b*ey[1]+c*ez[1])
    f=lambda pts:' '.join(f'{p[0]:.1f},{p[1]:.1f}' for p in pts)
    top=[v(0,0,h),v(w,0,h),v(w,d,h),v(0,d,h)]; left=[v(0,d,h),v(w,d,h),v(w,d,0),v(0,d,0)]; right=[v(w,0,h),v(w,d,h),v(w,d,0),v(w,0,0)]
    return f'<polygon points="{f(left)}" fill="{face[1]}"/><polygon points="{f(right)}" fill="{face[2]}"/><polygon points="{f(top)}" fill="{face[0]}"/>'
def vehicle(I,route,kind,d=5,l=0):
    if kind=='truck':
        inner=cub(1.0,.55,.42,17,BL,-9,6)+cub(.38,.55,.34,17,CY,9,7)
    else:
        inner=cub(.55,.55,.5,16,('#ffd9a0','#c98a3a','#8f5f22'),-4,4)
    return f'<g class="pk" style="offset-path:path(\'{I.path(route,.05)}\');--d:{d}s;--l:{l}s">{inner}</g>'
def sc_shop():
    I=Iso(23,146,58); o=I.floor(-1,-1,11,7)
    feed=[(1.9,2.4),(4.4,2.4)]; out=[(7.2,2.4),(9.0,2.4)]
    o+=road(I,[(0.8,2.4),(10,2.4)],.9)+I.line([(0.8,2.4),(10,2.4)],'#22d6f4',.35)
    b=[]
    for k in range(3): b.append((.1+k,I.box(0,.2+k*.9,0,.9,.8,.6+k*.15,DARK,'bob',f'--d:{3.2+k*.3}s;--l:{k*.3}s')))
    b.append((5.5,I.box(4.6,.5,0,2.6,2.2,1.3,('#c9d8ff','#4d68a8','#344c7e'),'bob','--d:4s')))
    b.append((5.6,roof(I,4.6,.5,0,2.6,2.2,1.3,.8,CY,'bob','--d:4s')))
    # awning stripes
    for k in range(4):
        b.append((6+k*.01,I.box(4.6+k*.65,2.7,.65,.32,.38,.08,(('#5fe6f8','#0f90b2','#096683') if k%2==0 else ('#c4aafd','#7249dc','#4e30a6')),'bob','--d:4s')))
    b+= [(9.5,I.box(8.9,3.6,0,1.8,1.6,.55,VI,'bob','--d:3.5s;--l:.4s')),(10,I.box(9.2,3.9,.55,1.2,1.0,.45,('#8f78e8','#4e35a8','#38257c'),'bob','--d:3.5s;--l:.7s'))]
    o+=srt(b)
    for k in range(3): o+=vehicle(I,[(0.9,2.4),(4.4,2.4)],'parcel',3.2,k*1.05)
    for k in range(3): o+=vehicle(I,[(7.1,2.4),(9.4,2.4),(9.4,3.7)],'parcel',3.2,k*1.05+.5)
    return isowrap(o,240)
def sc_pim():
    I=Iso(21,150,50); o=I.floor(-1,-1,11,7)
    ys=[.3,2.3,4.3]
    for y in ys: o+=I.line([(1.8,y+.5),(3.2,y+.5),(3.2,3.1),(4.4,3.1)],'#22d6f4',.5)
    b=[]
    for i,y in enumerate(ys): b.append((y,I.box(0,y,0,1.7,1.0,.35,('#3a5688','#1f3359','#16253f'),'bob',f'--d:{3.2+i*.3}s;--l:{i*.3}s',True,i*.7)))
    for k in range(4):
        face=CY if k==3 else (BL if k==2 else (('#8f78e8','#4e35a8','#38257c') if k==1 else DARK))
        b.append((7+k*.01,I.box(4.4,2.4,k*.55,1.9,1.5,.42,face,'bob',f'--d:{3.8}s;--l:{k*.2}s',k==3,0)))
    n=0
    for i in range(2):
        for j in range(2):
            b.append((10+i+j,I.box(8.2+i*1.5,1.4+j*1.7,0,1.2,1.3,.3,CY if (i+j)%2==0 else VI,'bob',f'--d:3.4s;--l:{n*.4}s',True,n*.6))); n+=1
    o+=I.line([(6.4,3.1),(7.4,3.1),(7.4,2.0),(8.2,2.0)],'#8b5cf6',.6)+I.line([(7.4,3.1),(7.4,4.6),(8.2,4.6)],'#8b5cf6',.6)
    o+=srt(b)
    for i,y in enumerate(ys): o+=I.pk([(1.8,y+.5),(3.2,y+.5),(3.2,3.1),(4.4,3.1)],'#5fe6f8',2.8,i*.8)
    o+=I.pk([(6.4,3.1),(7.4,3.1),(7.4,2.0),(8.2,2.0)],'#c4aafd',2.2,.4)+I.pk([(6.4,3.1),(7.4,3.1),(7.4,4.6),(8.2,4.6)],'#c4aafd',2.2,1.3)
    return isowrap(o,240)
def sc_logi():
    I=Iso(22,150,50); o=I.floor(-1,-1,11,7)
    R=[(1.8,1.2),(6.2,1.2),(6.2,4.8),(9.6,4.8)]
    o+=road(I,R,.9)+I.line(R,'#ffd9a0',.45)
    b=[]
    b.append((2,I.box(0,0,0,3,2.2,1.2,('#cfdcff','#4d68a8','#344c7e'),'', '')))
    b.append((2.1,roof(I,0,0,0,3,2.2,1.2,.6,VI)))
    for k in range(3): b.append((4+k*.01,I.box(.4+k*.9,2.19,0,.6,.02,.7,'#0a1224' if False else ('#0b1424','#0b1424','#0b1424'))))
    for k in range(2): b.append((6+k,I.box(3.6+k*.7,2.8,0,.6,.6,.35+k*.2,DARK,'bob',f'--d:{3+k*.4}s')))
    b.append((12,I.box(9.2,4.2,0,1.2,1.2,.9,VI,'bob','--d:3.4s;--l:.3s',True,.5)))
    b.append((8,I.box(5.7,5.4,0,1.0,1.0,.7,CY,'bob','--d:3.6s;--l:.6s',True,1.1)))
    b.append((7,I.box(6.9,.2,0,1.1,1.0,.5,CY,'bob','--d:3.2s',True,.2)))
    o+=srt(b)
    o+=I.ring(9.8,4.8,18,'#c4aafd',0)
    o+=vehicle(I,R,'truck',7,0)+vehicle(I,R,'truck',7,3.5)
    return isowrap(o,240)
