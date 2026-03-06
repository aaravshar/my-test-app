```python
from flask import Flask, request, jsonify, render_template, redirect, url_for
import uuid

app = Flask(__name__)

# In-memory todo storage
todos = {}


@app.route("/")
def index():
    filter_status = request.args.get("filter", "all")
    search_query = request.args.get("q", "").strip().lower()

    filtered = []
    for tid, todo in sorted(todos.items(), key=lambda x: x[1]["created"], reverse=True):
        if filter_status == "active" and todo["done"]:
            continue
        if filter_status == "completed" and not todo["done"]:
            continue
        if search_query and search_query not in todo["title"].lower():
            continue
        filtered.append({"id": tid, **todo})

    stats = {
        "total": len(todos),
        "active": sum(1 for t in todos.values() if not t["done"]),
        "completed": sum(1 for t in todos.values() if t["done"]),
    }

    return render_template(
        "index.html",
        todos=filtered,
        stats=stats,
        current_filter=filter_status,
        search_query=request.args.get("q", ""),
    )


@app.route("/add", methods=["POST"])
def add_todo():
    title = request.form.get("title", "").strip()
    if title:
        tid = str(uuid.uuid4())[:8]
        todos[tid] = {
            "title": title,
            "done": False,
            "created": len(todos),
        }
    return redirect(url_for("index"))


@app.route("/toggle/<todo_id>", methods=["POST"])
def toggle_todo(todo_id):
    if todo_id in todos:
        todos[todo_id]["done"] = not todos[todo_id]["done"]  # Fixed: properly toggle the done status
    return redirect(url_for("index"))


@app.route("/delete/<todo_id>", methods=["POST"])
def delete_todo(todo_id):
    if todo_id in todos:
        del todos[todo_id]  # Fixed: corrected the typo from 'todoss' to 'todos'
    return redirect(url_for("index"))


@app.route("/api/todos")
def api_todos():
    result = []
    for tid, todo in todos.items():
        result.append({"id": tid, **todo})
    return jsonify(result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
```
