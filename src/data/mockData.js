export const defaultWorkflows = [
    {
        id: 1,
        name: "Workflow 1",
        state: "Completed",
        nodes: [
            {
                id: 1,
                state: "Completed",
                title: "Title 1",
                content: "Content 1"
            },
            {
                id: 2,
                state: "Completed",
                title: "Title 2",
                content: "Content 2"
            },
            {
                id: 3,
                state: "Completed",
                title: "Title 3",
                content: "Content 3"
            },
            {
                id: 4,
                state: "Completed",
                title: "Title 4",
                content: "Content 4"
            }
        ]
    },
    {
        id: 2,
        name: "Workflow 2",
        state: "Pending",
        nodes: [
            {
                id: 1,
                state: "Completed",
                title: "Title 1",
                content: "Content 2"
            },
            {
                id: 2,
                state: "In-Progress",
                title: "Title 1",
                content: "Content 2"
            },
            {
                id: 3,
                state: "Pending",
                title: "Title 1",
                content: "Content 2"
            },
            {
                id: 4,
                state: "Pending",
                title: "Title 1",
                content: "Content 2"
            }
        ]
    }
]