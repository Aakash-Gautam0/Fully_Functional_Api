class Calculator{
    add(a:number, b:number):number{
        return a+b;
    }
    substract(a:number, b:number):number{
        return a-b;
    }
    mul(a:number, b:number):number{
        return a*b;
    }
    divide(a:number, b:number):number{
        if(b===0){
            throw new Error("Can not divide by zero.")
        }
        return a/b;
    }
}