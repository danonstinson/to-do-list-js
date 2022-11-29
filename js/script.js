{
    let tasks = [];
    let hideDoneTasks = false;

    const setTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;

        render();
    };

    const clearInput = () => {
        const inputField = document.getElementById("input");
        inputField.value = "";
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        const onClickFocus = () => {
            document.getElementById("button").addEventListener("click", () => {
                document.getElementById("input").focus();
            })
        };
        onClickFocus();
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list ${task.done && hideDoneTasks === true ? "list--hidden" : ""}">
                    <button class="js-done list__button list__button--done">
                        ${task.done ? "✓" : ""}
                    </button>
                    <span class="list__item${task.done ? " list__item--done" : ""}">
                        ${task.content}
                    </span>
                    <button class="js-remove list__button list__button--remove">
                    🗑
                    </button>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderHideDoneButton = () => {
        let htmlHideDoneString = "";

        if (tasks.length !== 0) {
            htmlHideDoneString += `
                <button class="js-hideShowDone">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
                </button>
            `;
        }

        else {
            htmlHideDoneString += "";
        }

        document.querySelector(".js-hideDone").innerHTML = htmlHideDoneString;
    };

    const renderSetAllDoneButton = () => {
        let htmlSetTasksDoneString = "";

        if (tasks.length !== 0) {
            htmlSetTasksDoneString += `
                <button class="js-markAllDone" ${tasks.every(({ done }) => done) ? "disable" : ""}>Ukończ wszystkie
                </button>`;
        }

        else {
            htmlSetTasksDoneString += "";
        }

        document.querySelector(".js-allDone").innerHTML = htmlSetTasksDoneString;
    };

    const bindButtonsEvents = () => {
        hideDoneElement = document.querySelector(".js-hideShowDone");
        setAllDoneElement = document.querySelector(".js-markAllDone");

        if (hideDoneElement && setAllDoneElement) {
            setAllDoneElement.addEventListener("click", (event) => {
                event.preventDefault(event);
                setTasksDone();
            })

            hideDoneElement.addEventListener("click", (event) => {
                event.preventDefault(event);
                toggleHideDoneTasks();
            })
        }
    };

    const render = () => {
        renderTasks();
        renderHideDoneButton();
        renderSetAllDoneButton();

        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        clearInput();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
};