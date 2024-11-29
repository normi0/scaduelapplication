// const user = fetch("https://jsonplaceholder.typicode.come/users");

// console.log(user);

// fetch("https://jsonplaceholder.typicode.come/users")
// .then(Response =>{
//     return Response.json();
// })
// .then(data =>{
//     console.log(user);
    
// })


        // const anotherview = document.getElementById("scad-view");
        // const view = document.getElementById("scad-view");
        // const button = document.getElementById(`scad-btn`);
        // let scads = [];
        // let editingIndex = null;
        
        // button.addEventListener("click", ()=>{
        //     const input = document.getElementById("scad-input").value;
        //     if (input.trim()=== "") {
        //         alert("please enter something");
        //         return;
        //     }
        //   const newDiv = document.createElement("div");
        //    newDiv.classList.add("new-div");
        //    const textSpan = document.createElement("span");
        //    textSpan.textContent = input;
        //    textSpan.style.textAlign = "start";
        // //    textSpan.style.width = "100%"; this to assure the span width size

        //    const doneButton = document.createElement("button");
        //    doneButton.textContent = "Done";
        //    doneButton.classList.add("btn");
        //    doneButton.addEventListener("click",()=>{
        //     textSpan.style.textDecoration = textSpan.style.textDecoration === 'line-through'?'none':'line-through';
        //    });
        //    const deleteButton = document.createElement("button");
        //    deleteButton.textContent= "Remove";
        //    deleteButton.classList.add("btn");
        //    deleteButton.addEventListener("click",()=>{
        //     view.removeChild(newDiv);
        //    });
        //    const modifyButton = document.createElement("button");
        //    modifyButton.textContent= "modify";
        //    modifyButton.classList.add("btn");
        //    modifyButton.addEventListener("click",()=>{
        //     const currentText = textSpan.textContent;
        //     document.getElementById("scad-input").value = currentText;
        //     button.textContent = "Apply";
        //     const currentDiv = newDiv;
        //     const currentTextSpan = textSpan;
        //     button.removeEventListener("click",addNewText);
        //     button.addEventListener("click",()=>{
        //         const updatedText = document.getElementById("scad-input");
        //         if (updatedText !== "") {
        //             currentTextSpan.textContent = updatedText;
        //             button.textContent="Add";
        //             button.removeEventListener("click",apply)
        //         }
        //     })
        //    });
        //    view.appendChild(newDiv);
        //    newDiv.appendChild(textSpan);
        //    newDiv.appendChild(doneButton);
        //    newDiv.appendChild(deleteButton);
        //    newDiv.appendChild(modifyButton);
        //    view.appendChild(newDiv);
        // })

        //getting the view button and the field that contain the text
        const view = document.getElementById("scad-view");
        const button = document.getElementById("scad-btn");
        const inputField = document.getElementById("scad-input");
        //declaire array and the index of the current scad 
        let scads=[];
        let editingIndex = null;
        //render scad so we refrech each time the content of the screen
        function renderScads() {
            view.innerHTML="";
            //scad ellement and its index so we add for each scad something
            scads.map((scad,index)=>{
                const newDiv = document.createElement("div");
                newDiv.classList.add("new-div");
                //place for the text to be wroten and its state in case we are finished the scad
                const textSpan = document.createElement("span");
                textSpan.textContent = scad.text;
                textSpan.style.textDecoration = scad.done ? "line-through":"none";
                // done button 
                const doneButton = createButton("done","btn",()=>{
                    scads[index].done =!scads[index].done;
                    renderScads();
                });
                const deleteButton = createButton("Remove","btn",()=>{
                    scads.splice(index,1);
                    renderScads();
                });
                const modifyButton = createButton("Modify","btn",()=>{
                    inputField.vlaue = scads[index].text;
                    button.textContent = "Apply";
                    editingIndex = index;
                });
                newDiv.appendChild(textSpan);
                newDiv.appendChild(doneButton);
                newDiv.appendChild(deleteButton);
                newDiv.appendChild(modifyButton);
                //append the div to the view
                view.appendChild(newDiv);

            });
        }

        function createButton(text,className,onClick) {
            const btn = document.createElement("button");
            btn.textContent = text;
            btn.classList.add(className);
            btn.style.fontSize= "16px";
            btn.addEventListener("click",onClick);
            return btn;
        }

        //add or apply shit on the scad
        button.addEventListener("click",()=>{
            const input = inputField.value.trim();
            if (input === "") {
                alert("please enter something");
                return;
            }
            if (button.textContent === "Apply") {
                scads[editingIndex].text = input;
                editingIndex = null;
                button.textContent = "Add";
            }
            else{
                scads.push({text:input,done:false});
            }
            inputField.value = "";
            renderScads();
        })

  
