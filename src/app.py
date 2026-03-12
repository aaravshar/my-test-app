from flask import Flask, request, jsonify, render_template, redirect, url_for, session, g
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import base64
import functools

app = Flask(__name__)
app.secret_key = 'super-secret-key-for-todo-app'

# In-memory user storage: {username: {"password_hash": ..., "api_key": ...}}
users = {}

# In-memory todo storage per user: {username: {todo_id: {title, done, created}}}
user_todos = {}


def get_api_key_for_username(username):
    """Generate a deterministic API key from the username (base64 encoded)."""
    return base64.b64encode(username.encode('utf-8')).decode('utf-8')


def get_current_user():
    """Get the current authenticated user from session or API key."""
    # Check session first
    if 'username' in session:
        username = session['username']
        if username in users:
            return username

    # Check API key header as fallback
    api_key = request.headers.get('X-Api-Key')
    if api_key:
        try:
            decoded_username = base64.b64decode(api_key.encode('utf-8')).decode('utf-8')
            if decoded_username in users:
                return decoded_username
        except Exception:
            pass

    return None


def login_required(f):
    """Decorator to require authentication for a route."""
    @functools.wraps(f)
    def decorated_function(*args, **kwargs):
        user = get_current_user()
        if user is None:
            if request.path.startswith('/api/'):
                return jsonify({"error": "Authentication required"}), 401
            return redirect(url_for('login'))
        g.username = user
        return f(*args, **kwargs)
    return decorated_function


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        if 'username' in session and session['username'] in users:
            return redirect(url_for('index'))
        return render_template("login.html", error=None)

    username = request.form.get("username", "").strip()
    password = request.form.get("password", "").strip()

    if username in users and check_password_hash(users[username]["password_hash"], password):
        session['username'] = username
        return redirect(url_for('index'))
    else:
        return render_template("login.html", error="Invalid username or password")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        if 'username' in session and session['username'] in users:
            return redirect(url_for('index'))
        return render_template("register.html", error=None)

    username = request.form.get("username", "").strip()
    password = request.form.get("password", "").strip()

    if not username or not password:
        return render_template("register.html", error="Username and password are required")

    if username in users:
        return render_template("register.html", error="Username already exists")

    api_key = get_api_key_for_username(username)
    users[username] = {
        "password_hash": generate_password_hash(password),
        "api_key": api_key,
    }
    user_todos[username] = {}

    return redirect(url_for('login'))


@app.route("/logout", methods=["GET", "POST"])
def logout():
    """Clear the session and redirect to the login page."""
    session.pop('username', None)
    return redirect(url_for('login'))


@app.route("/")
@login_required
def index():
    username = g.username
    todos = user_todos.get(username, {})

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
        username=username,
    )


@app.route("/add", methods=["POST"])
@login_required
def add_todo():
    username = g.username
    if username not in user_todos:
        user_todos[username] = {}

    title = request.form.get("title", "").strip()
    if title:
        tid = str(uuid.uuid4())[:8]
        user_todos[username][tid] = {
            "title": title,
            "done": False,
            "created": len(user_todos[username]),
        }
    return redirect(url_for("index"))


@app.route("/toggle/<todo_id>", methods=["POST"])
@login_required
def toggle_todo(todo_id):
    username = g.username
    todos = user_todos.get(username, {})
    if todo_id in todos:
        todos[todo_id]["done"] = not todos[todo_id]["done"]
    return redirect(url_for("index"))


@app.route("/delete/<todo_id>", methods=["POST"])
@login_required
def delete_todo(todo_id):
    username = g.username
    todos = user_todos.get(username, {})
    if todo_id in todos:
        del todos[todo_id]
    return redirect(url_for("index"))


@app.route("/api/todos")
@login_required
def api_todos():
    username = g.username
    todos = user_todos.get(username, {})
    result = []
    for tid, todo in todos.items():
        result.append({"id": tid, **todo})
    return jsonify(result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
