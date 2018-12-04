function p = bisection(f,a,b, iter, tol)

% provide the equation you want to solve with R.H.S = 0 form. 
% Write the L.H.S by using inline function
% Give initial guesses.
% Solves it by method of bisection.
% A very simple code. But may come handy

if f(a)*f(b)>0 
    disp('Wrong choice !! ')
else
    p = (a + b)/2;
    err = abs(f(p));
    n = 1; 
%     while err > tol
while ( err > tol && n < iter )
        n = n+1;
   if f(a)*f(p)<0 
       b = p;
   else
       a = p;          
   end
    p = (a + b)/2 ;
   err = abs(f(p))
    end
end


