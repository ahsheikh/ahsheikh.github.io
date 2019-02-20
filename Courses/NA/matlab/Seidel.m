
% Gauss Seidel method to solve linear system Au = b
clear all 
clc
        

A=[ ];              % provide coefficient matrix A
b=[];         % Prove right hand side vector b
iter = 15;          % Total number of iterations, for e.g. 15

u= zeros(length(b),1);  % Initial guess, zero vector


%  Solving with gauss seidel
L=tril(A,-1);
U=triu(A,1);
D=diag(diag(A));
for i=1:iter
    I=eye(2);
u(:,i+1)=inv(D+L)*(b-U*u(:,i));
end

disp('Approximations of Seidel in columns')
u