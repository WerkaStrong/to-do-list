{
    const tasks = [];

    /* dodanie nowego zadania*/
    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    /* usuwanie zadania*/
    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    /* przekreślenie zadania - wpisuje przeciwnieństwo done*/
    const toogleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const bindEvents = () => {
        /*wyciąganie wszystkich przycisków usuwania */
        const removeButtons = document.querySelectorAll(".js-remove");

        /* iteracja po każdym przycisku */
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });




        /*wyciąganie wszystkich przycisków zadań wykonanych */
        const toogleDoneButtons = document.querySelectorAll(".js-done");

        /* iteracja po każdym przycisku */
        toogleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toogleTaskDone(index);
            });
        });
    }

    /* renderowanie - nadpisanie formularza w HTML */
    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li
                ${task.done ? " style=\"text-decoration: line-through\"" : ""}
                >
                <button class="js-done">zrobione?</button>
                <button class="js-remove">usuń</button>
                ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };


    /* działanie formularza */
    const onFormSubmit = (event) => {
        event.preventDefault();

        /* pobranie nowej wartości z usunięciem białych znaków z każdej strony*/
        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        /* brak wartości => wyjdz z funkcji*/
        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);

        const getFocus = () => {
            document.getElementById("myText").focus();
            myText.value = "";
        };

        getFocus();

    };


    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        /* zablokowanie wysyłania formularza */
        form.addEventListener("submit", onFormSubmit);
    };


    init();

}