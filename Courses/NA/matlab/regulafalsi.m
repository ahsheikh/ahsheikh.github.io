function root = regulafalsi(f,a,b,tolerance)
if (nargin < 3)
    error('Wrong number of input arguments');
elseif (nargin == 3 || nargin == 4)
    i = 0;
    tol = 1e-6;
    g = 1;
    disp('Iteration       a          b          x          f(a)          f(b)             f(c)');
    disp('=========    =======    =======    =======    ==========    ==========       ========');
    while(g > tol)
        i = i + 1;
        if (f(a) == f(b))
            fprintf('Function has the same value on a and b on iteration %d\n', Iter);
            disp('Denominator in Regula falsi is zero');
            root = 'Regula falsi can''t compute the root';
            beep
            disp('Go for another iteration');
            return;
        end
        c = a - ((f(a)*(b-a))/(f(b) - f(a)));
        if(f(c)*f(a) > 0)
            b = c;
            g = f(b);
            root = b;
        else
            a = c;
            g = f(a);
            root = a;
        end
        fprintf('%3d%17.4f%11.4f%11.4f%14.4f%14.4f%14.4f\n', i,a,b,c,f(a),f(b),f(c));
        end
    elseif (nargin > 4)
    error('Too many input arguments');
end