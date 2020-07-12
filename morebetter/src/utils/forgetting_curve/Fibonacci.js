const SEQUENCE = [1,2,3,5,8,13,21,55,89,144];

export const Fib = (num) => {
    let arr = [];
    let i = 0;
    
    while(SEQUENCE[i]-1 <= num){
        arr.push(SEQUENCE[i]-1);
        i++;
    }

    return arr;
}