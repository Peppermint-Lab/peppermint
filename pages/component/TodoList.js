import { useEffect } from "react"


export default function TodoList() {

    useEffect(() => {
        fetch(`/api/todos/get`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => res.json())
            .then((res) => {
                console.table(res)
            })
    })

    return (
        <div>
            
        </div>
    )
}