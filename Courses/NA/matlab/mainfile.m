% mainfile to call rungekutta or milne or other functions
clear all
clc

%  ========== input dialog box ===================
prompt = {'Enter function f(x,y) ','initial value yo = ','values of xo','value of xn','value of h'};
title = 'Input';
dims = [1 60];
definput = {'@(x,y)  x + y','1','0','0.5','0.1'}; 
default = definput;
answer = inputdlg(prompt,title,dims,definput);
y0 = str2num(answer{2});
x0 = str2num(answer{3});
xn = str2num(answer{4});
h = str2num(answer{5});
myfn = str2func(char(answer(1)));
xspan = [x0 xn];


% =============PROBLEM 1=================================
% solving ODE dy/dx = xy + y^2;   y(0) = 1; 
% myfn = inline('x.*y + y.^2');
% myfn = inline('1+y')
% y0 = 1; 
% xspan = [0 2];
% h = 0.1; 
% ============problem 2==================================
% Problem ODE dy/dx = 1+y, y=(0)= 2
myfn = inline('1 +  y + 0*x');
y0 = 2; 
xspan = [0 2];
h = 0.1; 

%================Calling RK  method============= 
[x_rk y_rk] = marunge(myfn,xspan,y0,h);
%================Calling Adams  method============= 
[x_adams y_adams]=maadams4(myfn,xspan,y0,h);

%======== Exact solution, y = 3*exp(x)-1==================
xvec = [xspan(1):h:xspan(2)];
exactsol = inline('3*exp(x)-1');
yvec = feval(exactsol,xvec);

% ===================Ploting =================

%===========Analytic_Solution==================
figure, 
subplot(3,1,1);
plot(xvec,yvec,'*:g'), 
legend('Analytical Solution')
hold on,
grid on
pause
%===========Adams_Bashforth_solution============
subplot(3,1,2);
plot(x_adams,y_adams, 's-b'), 
%legend('Analytical Solution','Adams Method')
legend('Adams Method')
hold on,
pause
%===========Adams_Bashforth_solution============
subplot(3,1,3);
plot(x_rk,y_rk,'o--r'), 
%legend('Analytical Solution','Adams Method','RungeKutta Method')
legend('RungeKutta Method')
pause
% plot(xvec,yvec,'*:g'), 
%legend('Adams Method','RungeKutta Method','Analytical Solution'), 
%
figure;
plot(xvec,yvec,'*:g'),
hold on
plot(x_adams,y_adams, 's-b'),
hold on
plot(x_rk,y_rk,'o--r')
legend('Adams Method','RungeKutta Method','Analytical Solution'),
hold off




