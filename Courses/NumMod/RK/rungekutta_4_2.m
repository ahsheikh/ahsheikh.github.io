
% It calculates ODE using Runge-Kutta 4th order method
% we are solving ode dy/dt -2t, y(0) = 3 is initial condition. 

clc;                                               % Clears the screen
clear all;
y0 = 3;
h=0.1;                                             % step size
t = 0:h:2;                                         % Calculates upto y(3)
y = zeros(1,length(t)); 

y(1) = y0;                                          % initial condition
F_xy = @(t,y) -2*y ;                    % change the function as you desire

for i=1:(length(t)-1)                              % calculation loop
    k_1 = F_xy(t(i),y(i));
    k_2 = F_xy(t(i)+0.5*h,y(i)+0.5*h*k_1);
    k_3 = F_xy((t(i)+0.5*h),(y(i)+0.5*h*k_2));
    k_4 = F_xy((t(i)+h),(y(i)+k_3*h));

    y(i+1) = y(i) + (1/6)*(k_1+2*k_2+2*k_3+k_4)*h;  % main equation
end

yexact = 3*exp(-2*t) ; 

figure, 
plot(t,yexact,t,y);
legend('Exact','Approximate');
title('h=0.01')

error = norm(yexact - y); 