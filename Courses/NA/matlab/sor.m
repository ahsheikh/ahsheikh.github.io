
% Successive Over Relaxation method to solve linear system Au = b
clear all 
clc
        

A=[ ];              % provide coefficient matrix A
b=[];         % Prove right hand side vector b
iter = 15;          % Total number of iterations, for e.g. 15

u= zeros(length(b),1);  % Initial guess, zero vector 
omega  = 1;             % Relaxation parameter 





D = diag(diag(A)); 
L =-tril(A,-1); 
U = -triu(A,1); 
M = (D-omega*L); 



for i=1:iter
u(:,i+1) = M\(((1-omega)*D + omega*U)*u(:,i)) + omega*(M\b); 
 
end

disp('Approximations of SOR in columns')
u