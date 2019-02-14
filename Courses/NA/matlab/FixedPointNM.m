% x0=1.5; tol=0.01; 
% fn=@(x)log(x+2);
% 
% 
% old=x0+1;
% while abs(x0-old)>tol;old=x0
%     x0=feval(fn,old);end 
% fprintf('x0 is root of the given function');
% sol=x0

clear;
clc;

%# You function here
g=@(x) cos(x);

%# Start out iteration loop
x1 = 0;
x2 = g(x1);

iterations = 0;% # iteration counter

ezplot(g,[0,1]);
hold on 
ezplot('x',[[0,1]])

while (abs(x2-x1) > 1e-5 && iterations<100)
    plot([x1 x1], [x1 x2], 'k-')
    plot([x1 x2], [x2 x2], 'k--')
     %pause
    iterations = iterations + 1;
    x1 = x2;
    x2 = g(x1);
end
iterations 
[x1 x2]