

clear all 
clc
        

A=[1 -2 2; 1 1 -1; -2 -2 1];              % provide matrix
v = ones(length(A),1);                  % Initial eigenvector, ones vector 
iter = 10;                              % number of iterations
tol = 10^-5; 


% function [vec,value]=power(start,A,toler)
%
%Power method for computing eigenvalues
%
dd=1;
x=v;
n=10;
while dd> tol
y=A*x
dd=abs(norm(x)-n);
n=norm(x)
x=y/n
end
vec=x;
value=n;


