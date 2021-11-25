export async function checkStatus() {
    const response = await fetch('https://interview-assignment.wafflehacks.tech/api/v1/health', {});
    return response;
}

export async function listTodos() {
    const response = await fetch('https://interview-assignment.wafflehacks.tech/api/v1/todos');
    return response;
}

export async function createTodo(ttl, desc="", du=null) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: ttl, 
            description: desc, 
            due: du })
    };
    const response = await fetch('https://interview-assignment.wafflehacks.tech/api/v1/todos', requestOptions);
    return response;
}

export async function retrieveTodo(id) {
    const response = await fetch(`https://interview-assignment.wafflehacks.tech/api/v1/todos/${id}`);
    return response;
}

export async function updateTodo(id, ttl, desc="", du=null, comp=false) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: ttl, 
            description: desc, 
            due: du,
            complete: comp })
    };
    const response = await fetch(`https://interview-assignment.wafflehacks.tech/api/v1/todos/${id}`, requestOptions);
    return response;
}

export async function deleteTodo(id) {
    const response = await fetch(`https://interview-assignment.wafflehacks.tech/api/v1/todos/${id}`, { method: 'DELETE' });
    return response;
}

export async function toggleTodo(id) {
    const response = await fetch(`https://interview-assignment.wafflehacks.tech/api/v1/todos/${id}/toggle`, { method: 'PATCH' });
    return response;
}
