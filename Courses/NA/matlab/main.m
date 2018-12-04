% main file 
% equation x^3 -2x^2 +1 = 0 with exact root alpha = 1.6180 \in (1,2)
clear all
clc

%  ========== input dialog box ===================
prompt = {'Enter function f(x) ','initial value xo = ','values of xo','value of xn','value of h'};
title = 'Input';
dims = [1 60];
definput = {'@(x,y)  x + y','1','0','0.5','0.1'}; 
default = definput;
answer = inputdlg(prompt,title,dims,definput);
y0 = str2num(answer{2});
x0 = str2num(answer{3});
xn = str2num(answer{4});
h = str2num(answer{5});
s = strcat('@(x)',answer(1));
myfn = str2func(char(s));
% myfn = str2func(char(answer(1)));
xspan = [x0 xn];




f = inline('x.^3 -2.*x.^2 +1');
fp = inline('3.*x.^2 - 4.*x');


x0 = 2; 
a = 1; b = 2; 
tol = 1e-3; 
it = 4; 


% p = bisection(f,a,b, it, tol);

[x,iter] = NewtonRaphson(x0,f,fp,it, tol)
