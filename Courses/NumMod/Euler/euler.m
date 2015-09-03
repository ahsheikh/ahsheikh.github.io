%function t=t(n,t0,t1,y0)
function y=euler(n,t0,t1,y0)
h=(t1-t0)/n;
t(1)=t0;
y(1)=y0;
for i=1:n
t(i+1)=t(i)+h;
y(i+1)=y(i)+h*ex(t(i),y(i));
end;
V=[t',y']
plot(t,y)
title('Figure 1')