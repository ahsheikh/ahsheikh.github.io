%% Secant Method for solving f(x)=0
clc 
clear all
close all
format short 
% Given function
f=@(x)x-x.*log(x);
% ploting the given function to find the convergence interval
x=-10:0.01:10;
plot(x,f(x),'.')
hold on
plot(x,0.*x,'r')
plot(0.*x,x,'r')
axis([-10 10 -10 10])
grid on
%initial guesses
xx(1)=2; % a
xx(2)=3; % b
tol=1e-6;
%number of iterations
n=100000; 
for i=2:n,
xx(i+1)= (xx(i-1)*f(xx(i))-xx(i)*f(xx(i-1)))/(f(xx(i))-f(xx(i-1)));
err=(xx(i+1)-xx(i));
    if abs(err)<tol, break
    end
end
Iterations=i
root=xx(length(xx))