package lec3;

public class Intlist{
    public int first;
    public Intlist rest;

    public Intlist(int f, Intlist r) {
        first = f;
        rest = r;
    }

    /*return the ith item of this INtlist*/
    public int get(int i) {
        if (i == 0) {
            return first;
        }
        return this.rest.get(i - 1);
    }


    /*return the size of the list using...recursion!*/
    public int size() {
        if (rest == null) {
            return 1;
        }
        return 1 + this.rest.size();
    }

    public int iterativeSIze(){
        Intlist p = this;
        int totalSize = 0;
        while (p != null) {
            totalSize += 1;
            p = p.rest;
        }
        return totalSize;
    }

        public static void main(String[] args) {
        Intlist L = new Intlist(15,null);
        L = new Intlist(10, L);
        L = new Intlist(5, L);

        System.out.println(L.size());
        System.out.println(L.iterativeSIze());
        System.out.println((L.get(1)));
        /* Initial approach
        Intlist L = new Intlist();
        L.first = 5;
        L.rest = null;

        L.rest = new Intlist();
        L.rest.first = 10;

        L.rest.rest = new Intlist();
        L.rest.rest.first = 15;
       */
    }

}
