async function func() {
    const response = await fetch("./client/src/Constants/monaco-themes-master/Active4D.json");
    // client\src\Constants\monaco-themes-master\Active4D.json
    // test.js
    console.log(response);
}


func();