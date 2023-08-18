import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { collection, addDoc, getFirestore, onSnapshot, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";



const firebaseConfig = {
    apiKey: "AIzaSyDy37ECY8bBvF9oM0jGLjwtbKayKnJhOvA",
    authDomain: "test-e83b7.firebaseapp.com",
    projectId: "test-e83b7",
    storageBucket: "test-e83b7.appspot.com",
    messagingSenderId: "1095416575854",
    appId: "1:1095416575854:web:cdfedb3d0fde20ec4eb37f",
    measurementId: "G-4NJYL5YJ4R"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const ids = []





let btn = document.getElementById("btn")
btn.addEventListener('click', () => {
    let email = document.getElementById('email')
    let password = document.getElementById('password')

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("user==>", user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error==>", errorMessage)
        });
})

//TODOAPP
let getTodos = () => {
    onSnapshot(collection(db, "todos"), (data) => {
        data.docChanges().forEach((todo) => {
            ids.push(todo.doc.id)
            // console.log(ids)
            if (todo.type === 'removed') {
                var liElements = document.querySelectorAll("li[id^='todo.doc.id']");
                if (liElements.length > 0) {
                    liElements[0].remove();
                }
            }
            else if (todo.type === 'added') {
                var newTodo = document.getElementById('show-new-todo')
                const inputTodo = document.getElementById('input-todo')

                newTodo.innerHTML +=
                    `
                <li class="todo.doc.id">
                <input class="input-border mt-2" type="text" value="${todo.doc.data().value}" disabled>
                <button class="btn btn-primary" onclick="deleteBtn('${todo.doc.id}')" >Delete</button>
                <button class="btn btn-primary" onclick="editTodo(this,'${todo.doc.id}')">Edit</button>
                </li>
                `
                inputTodo.value = ''
                // console.log(newTodo)
            }
        })
    });
}
getTodos()

let addTodo = async () => {
    try {
        const inputTodo = document.getElementById('input-todo')

        const docRef = await addDoc(collection(db, "todos"), {
            value: inputTodo.value,
        });
        console.log("Document written with ID: ", docRef.id);
    }
    catch (err) {
        console.log(err)
    }
}



const deleteBtn = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    alert("Document Deleted")
}

let deleteAll = async() => {
    for(let i = 0; i<ids.length; i++){
        await deleteDoc(doc(db, "todos", ids[i]));
    }
    let ul = document.getElementById('show-new-todo')
    ul.innerHTML = ""
}

let edit = false
let editTodo = async (e, id) => {
    if (edit) {
        await updateDoc(doc(db, "todos", id), {
            value: e.parentNode.childNodes[1].value,
        });


        e.parentNode.childNodes[1].disabled = true
        e.parentNode.childNodes[1].blur()
        e.parentNode.childNodes[5].innerHTML = "Edit"
        edit = false
    }
    else {
        e.parentNode.childNodes[1].disabled = false
        e.parentNode.childNodes[1].focus()
        e.parentNode.childNodes[5].innerHTML = "Update"
        edit = true
    }
}
window.editTodo = editTodo
window.deleteAll = deleteAll
window.deleteBtn = deleteBtn
window.addTodo = addTodo
window.getTodos = getTodos



