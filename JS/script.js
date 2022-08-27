{
    let tasks = [];
    let hideDoneTasks = false;

    
    /* dodanie nowego zadania*/
    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    /* usuwanie zadania*/
    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    /* przekreślenie zadania - wpisuje przeciwnieństwo done*/
    const toogleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    };

    /* oznaczenie wszystkich zadań jako ukończone */
    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    /* przełączenie zadan z ukrytych na widoczne*/
    toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };


    const bindRemoveEvents= () => {
        /*wyciąganie wszystkich przycisków usuwania */
        const removeButtons = document.querySelectorAll(".js-remove");

        /* iteracja po każdym przycisku */
        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };



        const bindToggleDoneEvents = () => {
        /*wyciąganie wszystkich przycisków zadań wykonanych */
        const toogleDoneButtons = document.querySelectorAll(".js-toggleDone");

        /* iteracja po każdym przycisku */
        toogleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toogleTaskDone(taskIndex);
            });
        });
    };

    /* renderowanie zadań */
    const renderTasks = () => {
        const taskToHTML = task => `
            <li class="
            tasks__item${task.done && hideDoneTasks ? " tasks__item--hidden" : ""} js-task
            ">
                <button class="tasks__button tasks__button--toggleDone js-toggleDone"> 
                    ${task.done ? "✔" : ""}
                </button>
                <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
                    ${task.content}
                </span>
                <button class="js-remove tasks__button tasks__button--remove">
                    🗑
                </button>
            </li>
            `;

        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskToHTML).join("");
    };
    

    /* renderowanie przycisków dodanie html*/
    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
            <button class="buttons__button js-toggleHideDoneTasks">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="buttons__button js-markAllDone"
                ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button>
            `;
    };

    /* even lisenery ktore dodamy do przyscików, jak nie bedzie przysciku ukoncz zadania bedzie potrzebny if */
    const bindButtonsEvents = () => {
        const markAllDoneButtons = document.querySelector(".js-markAllDone");

        if (markAllDoneButtons){
            markAllDoneButtons.addEventListener("click", markAllTasksDone);
        }

        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");
    
        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        }
    
    };


    /* renderowanie - nadpisanie formularza w HTML */
    const render = () => {
        renderTasks();
        bindRemoveEvents();
        bindToggleDoneEvents();

        renderButtons();
        bindButtonsEvents();
    };


    /* działanie formularza */
    const onFormSubmit = (event) => {
        event.preventDefault();

        /* pobranie nowej wartości z usunięciem białych znaków z każdej strony*/
        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();
        
        /* dodanie funckji focus do przycisku dodającego zadanie*/
        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        /* zablokowanie wysyłania formularza */
        form.addEventListener("submit", onFormSubmit);
    };


    init();

}