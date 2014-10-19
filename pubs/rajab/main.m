
% October 6, 2014 

clear all

% Parameters

dx = 0.1;
dt = 0.01;

xvec = [0:dx:1]; 
T = 1; 
tvec = [0:dt:1];
N = length(xvec);
M = length(tvec); 

eps = 0.1;  vo = 0.1; alpha = 0.01; omega = pi; 
v_t = eps*(vo + alpha.*sin(omega*tvec)); 
v_tt = (omega*eps*alpha).*cos(omega*tvec);

u = zeros(N,M);

u(1,:) = 0;                                 % boundary conditions at x = 0
u(N,:) = 0;                                 % boundary conditions at x = 1
u(:,1) = sin(pi*xvec);                      % initial condition at t = 0
u(:,2) = sin(pi*xvec);                      



% Start solution inside loop

for j = 3:1:M-1
    for i = 2:1:N-1                             % Space varialbe 
        u(i,j+1) = (dt*2) *( (2*u(i,j)- u(i,j-1))/(dt*2) - 2*v_t(j)*(u(i,j)-u(i+1,j-1) + u(i,j-1)- u(i,j))/(dt*dx) - ...
            (( (v_t(j))^2)-1).*(u(i+1,j) - 2*u(i,j) + u(i-1,j))/(dx^2) - v_tt(j).*(u(i+1,j) - u(i,j))/(dx) );
        
%         u(i,j+1) = (dt*2) *( (2*u(i,j)- u(i,j-1))/(dt*2) - 2*v_t.*(u(i,j)-u(i+1,j-1) + u(i,j-1)- u(i,j))/(dt*dx) - ...
%             ((v_t.^2)-1).*(u(i+1,j) - 2*u(i,j) + u(i-1,j))/(dx^2) - v_tt.*(u(i+1,j) - u(i,j))/(dx) );
    end
end

% Plotting 
 
figure, mesh(tvec,xvec,u)


% exact solution 



for j = 1:1:M
    for i = 1:1:N
        tau = eps*tvec(j);     
        Mye2 = exp(-2*alpha*tau); 
        Mye4 = exp(-4*alpha*tau) - 1;
        numer = (1+ ((cos(atand(tand(pi*(xvec(i)+tvec(j))/2 -...
            pi/4)*(exp(-2*alpha*tau)))))^2)*(exp(-4*alpha*tau)) );
        
        denom = (1+ ((cos(atand(tand(pi*(xvec(i)-tvec(j))/2 +...
            pi/4)*(exp(-2*alpha*tau)))))^2)*(exp(-4*alpha*tau)) );  
        
        u_exact(i,j) = ((2*exp(-2*alpha*tau))/(exp(4*(-alpha)*tau) -1) )*( log(numer./denom) );
    end
end
    

figure, mesh(tvec,xvec,u_exact), title('exact solution')



