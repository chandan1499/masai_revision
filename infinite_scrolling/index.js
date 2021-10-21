// let container = document.querySelector('.container');

// var cnt = 0;

// container.addEventListener('scroll', () => {
//     if ((container.scrollHeight - container.scrollTop - 600) < 10) {
//         addStudent();
//     }
// })

// function addStudent() {
//     for (let i = 1; i <= 25; i++) {
//         cnt++;
//         let h2 = document.createElement('h2');
//         h2.innerHTML = `Masai student ${cnt}`;
//         container.appendChild(h2);
//     }
// }
 
// addStudent();


var input = "1 \n 62 \n 1347 3019 3811 5251 7541 9625 9774 12664 14211 15967 16585 18335 19765 22465 23759 24599 25871 27774 29458 31350 33248 34265 36917 37483 39424 40720 42261 44867 45421 48247 49220 50551 51690 53388 55223 57479 58154 59780 62572 63613 65113 66495 68143 70466 71294 73443 75382 76303 77584 80308 80769 82475 84230 85669 87664 89229 91463 92876 94028 96384 98263 98704"
var arr = [
    31264, 31258, 31228, 31187, 31125, 31046, 30958,
    30844, 30711, 30574, 30420, 30249, 30050, 29845,
    29619, 29371, 29110, 28831, 28539, 28240, 27926,
    27597, 27241, 26870, 26480, 26072, 25657, 25223,
    24781, 24323, 23849, 23350, 22831, 22298, 21759,
    21195, 20622, 20025, 19414, 18797, 18159, 17508,
    16838, 16144, 15435, 14721, 13988, 13231, 12465,
    11685, 10881, 10062,  9228,  8372,  7500,  6618,
     5716,  4809,  3877,  2928,  1970,   994
  ];

  input += "\n" + arr.join(" ");

  runProgram(input);

function runProgram(input) {
    var newInput = input.split(/[\r\n]+/);
    var t = Number(newInput[0]);
    for(let a=1; a<= t; a++){
        var n = Number(newInput[a*3-2]);
        var startPos = newInput[a*3-1].trim().split(" ").map(Number);
        var drink = newInput[a*3].trim().split(" ").map(Number);
        
        let suffixEnergy = [drink[n-1]];
        for(let i=n-2; i>=0; i--){
            suffixEnergy.push(drink[i] + suffixEnergy[suffixEnergy.length-1]);
        }
        
        suffixEnergy.reverse();
        suffixEnergy = drink;
        let ans = 0;
        for(let i=0; i<n; i++){
            if(startPos[i] + suffixEnergy[i] >= 100000){
                ans++;
            }
        }
        
        console.log(ans);
    }
    
  
    
  }
  