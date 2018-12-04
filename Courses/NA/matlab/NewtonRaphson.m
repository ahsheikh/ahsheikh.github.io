function [x,iter]=NewtonRaphson(x0,f,fp,it, tol)
% newton-raphson algorithm

if exist('it','var')
     % third parameter does not exist, so default it to something
      N = it;
else
    N = 20;        % define max. no. iterations and
end
 
if exist('tol','var')
     % third parameter does not exist, so default it to something
      eps = tol;
else
    eps = 1.e-5; %  error
 end
maxval = 10000.0;
 % define value for divergence
xx = x0;
while (N>0)
xn = xx-f(xx)/fp(xx);
if abs(f(xn))<eps
x=xn;iter=100-N;
return;
end;
if abs(f(xx))>maxval
% disp(['iterations = ',num2str(iter)]);
disp(['iterations = ',num2str(iter)]);
error('Solution diverges');
break;
end;
N = N - 1;
xx = xn;
end;
error('No convergence');
% break;
return;
% end function
