% Program Code of Newton-Raphson Method in MATLAB 
 
%% Method of Bisection for solving f(x)=0
clc 
clear all
close all
format long 
% Given function
f=@(x) x.^4 - 2*(x.^2) + 10*x + 1;
d=@(x) 4*(x.^3)-4*(x) + 10;

% % ploting the given function to find the convergence interval
% x=-10:0.01:10;
% plot(x,f(x),'.')
% hold on
% plot(x,0.*x,'r')
% plot(0.*x,x,'r')
% axis([-10 10 -10 10])
% grid on

%initial guesses and accuracy
x(1) =  .1;              % initial guess
error = 10^-10;          % accuracy till 3 decimal places


% iterations 
for i=1:100
x(i+1)=x(i)-((f(x(i))/d(x(i))));
err(i)=abs((x(i+1)-x(i))/x(i));
if err(i)<error
break
end
end
root=x(i)
x'