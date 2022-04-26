{
    const tasks = [
        {
            content: "zrobić zadanie",
            done: false,
        },
        {
            content: "obejrzeć lekcje",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li${task.done ? " style=\"text-decoration: line-through\"" : ""}>
                ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    }

    /* dodanie nowego zadania*/
    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const onFormSubmit = (event) => {
            event.preventDefault();

            /* pobranie nowej wartości z usunięciem białych znaków z każdej strony*/
            const newTaskContent = document.querySelector(".js-newTask").value.trim();
            
            /* brak wartości => wyjdz z funkcji*/
            if(newTaskContent === ""){
                return;
            }

            addNewTask(newTaskContent);

    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        /* zablokowanie wysyłania formularza */
        form.addEventListener("submit", onFormSubmit);
    };


    init();

}