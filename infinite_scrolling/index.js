let container = document.querySelector('.container');

var cnt = 0;

container.addEventListener('scroll', () => {
    if ((container.scrollHeight - container.scrollTop - 600) < 10) {
        addStudent();
    }
})

function addStudent() {
    for (let i = 1; i <= 25; i++) {
        cnt++;
        let h2 = document.createElement('h2');
        h2.innerHTML = `Masai student ${cnt}`;
        container.appendChild(h2);
    }
}

addStudent();