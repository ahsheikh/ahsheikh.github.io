

% FDM solution of 2D Poisson eqation
% -Del u = f; f = 6xy(1-y) - 2*x^2;
% Dirichlets boundry conditions (BCs) on every boundry: 
% which are  u(x,o) = u(x,1) =0; 
%  u(0,y) = 0;  u(1,y) = y(1-y); 
% exact solution is u = y(1 - y) x^3
% Discretizing scheme : Standard 5 point finite discretization
% solver for linear system : Direct solver

% AH Sheikh


n = 300;  % number of points in each X and Y directions.
h = 1/(n+1);


A = gallery('poisson',n);    % function for constructing discrete 
                             % poisson matrix with dirichlet BCs.                    
 

                             
[X,Y] = meshgrid(h:h:1-h, h:h:1-h);
rhs =  6.*X.*Y.*(1-Y) - 2.*(X.^2);     
rhs = reshape(rhs',n^2,1);



fdm_sol = A\rhs; 

fdm_sol_mat = reshape(fdm_sol,n,n);


u_exact = Y.*(1 - Y).*(X.^3);
figure(1), subplot(1,2,1), imagesc(u_exact), title('Exact Sol'), 
hold on, subplot(1,2,2), imagesc(fdm_sol_mat'), title('FDM computed Sol'), hold off
