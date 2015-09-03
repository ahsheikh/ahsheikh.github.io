%% Example 1
% Solve y'(t)=-2y(t) with y0=3
y0 = 3;                  % Initial Condition
h = 0.1;% Time step
t = 0:h:2;               % t goes from 0 to 2 seconds.
yexact = 3*exp(-2*t)     % Exact solution (in general we won't know this)
ystar = zeros(size(t));  % Preallocate array (good coding practice)

ystar(1) = y0;           % Initial condition gives solution at t=0.
for i=1:(length(t)-1)
    k1 = -2*ystar(i);  % Previous approx for y gives approx for derivative
    ystar(i+1) = ystar(i) + k1*h; % Approximate solution for next value of y
end
figure, 
plot(t,yexact,t,ystar);
legend('Exact','Approximate');
title('h=0.01')