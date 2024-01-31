package lec1;
public class Define {
    public static int larger(int x, int y){
        if (x>y){
            return x;
        }
        return y;
    }
    public static void main(String[] args){
        System.out.println(larger(-5,1));
    }
}
/*
1. Functions must be declared as part of a class
2. A function that is part of a class is called a "method“
3. To define a fucntion in Java, we use "public static"
4. all parameters of a function must have a declared type, and the return value of the funciton must have a declared type
5. Function in Java return only one value.
 */