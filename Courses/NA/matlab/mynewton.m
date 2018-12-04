function r=mynewton(f,a,n)
syms x;
z=f(x);
y=a;
for i=1:n    
    y(i+1)=y(i)-(z(i)/diff(z(i)));
end
r=y
end