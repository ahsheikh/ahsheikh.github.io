%% Method of Bisection for solving f(x)=0
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
a=2;
b=4;
f_a=f(a);
f_b=f(b);
% working principle of bisection method
if f_a*f_b>0, error('We must have f(a)f(b)<0!'); end
tol=1e-6;       % setting error tolerance
err=abs(b-a);    % initial error
   iter=0;       % start iterations
   while err>tol
   iter=iter+1;
   m=(a+b)/2;
   f_m=f(m);
   err=(m-a);
 if abs(err)<tol,  break
 elseif f_m*f_a>0, 
     a=m;f_a=f_m;
 else
     b=m;
 end
   
   end
   Iterations=iter
   root=b