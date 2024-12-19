
function lerp(a,b,t){
    return a+t*(b-a); // linear interpolation between a and b by t
}

function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}
// explain the above function
// The getIntersection function takes four arguments A, B, C, and D, which are objects with x and y properties.
// The function calculates the intersection point of two line segments AB and CD.
// The function first calculates the numerator of the t and u parameters of the parametric equations of the line segments.
// The function then calculates the denominator of the parametric equations.
// If the denominator is not zero, the function calculates the t and u parameters.
// If t and u are between 0 and 1, the function returns the intersection point.
// If there is no intersection, the function returns null.


function polyIntersect(poly1, poly2){
    for(let i=0;i<poly1.length;i++){
        const A=poly1[i];
        const B=poly1[(i+1)%poly1.length];
        for(let j=0;j<poly2.length;j++){
            const C=poly2[j];
            const D=poly2[(j+1)%poly2.length];
            if(getIntersection(A,B,C,D)){
                return true;
            }
        }
    }
    return false;
}

function sigmoid(x){
    return 1/(1+Math.exp(-x));
}

function getRGBA(value,yellow=0){
    const alpha = Math.abs(value);
    let R,G,B;
    if(yellow===1){
        R=255;
        G=255;
        B=0;
    }
    else{
    if(value>0){
    R=0;
    G=255;
    B=100;}
    else{
    R=255;
    G=65;
     B=0;
    }}
    return "rgba("+R+","+G+","+B+","+alpha+")";
}
