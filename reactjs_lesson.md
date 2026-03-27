# Structured Learning Module: ReactJS CRUD Operations

## 1. Executive Summary
This learning module provides a comprehensive technical guide for the implementation of full-featured web applications utilizing React, TypeScript, and .NET Core. The curriculum is partitioned into two distinct instructional phases:
1. **Phase 1: Modular Technical Assignments (Modules 1–4)**: Focuses on building a personal website through discrete, cumulative skills. These assignments are managed within a single repository named `Finals_Assignment` through a sequential branching strategy (`finals_a1` → `finals_a2` → `finals_a3`).
2. **Phase 2: Integrated Final Case Study (Modules 5–7)**: Focuses on the production of a professional Todo Management System (`Finals_Q1–Q2`) in a dedicated repository.

---

## 2. Prerequisites and Environment Setup
The following environmental configurations are required for the successful completion of this module:
- Node.js runtime environment (version 18.0 or higher).
- Fundamental proficiency in ECMAScript (JavaScript) and React component architecture.
- Accessibility to a command-line interface (CLI).

---

# PHASE 1: MODULAR TECHNICAL ASSIGNMENTS

## Module 1: Infrastructure and Initialization
### Theoretical Context
The initialization of a modern React application is optimized through the use of Vite, a next-generation frontend build tool that leverages native ES modules and offers rapid Hot Module Replacement (HMR).

### Implementation Specification
```bash
# Project initialization
npx -y create-vite@latest ./my-crud-app --template react-ts
cd my-crud-app
npm install

# Dependency procurement
npm install react-router-dom@6 react-hook-form
```

### Technical Checkpoint 1: Environment Provisioning
Initialize the project using the specifications above. Verify local server availability via `npm run dev`.

---

## Module 2: Client-Side Routing Architecture
### Theoretical Context
Client-side routing is facilitated by the `react-router-dom` library, which enables the mapping of specific URLs to discrete React components.

#### Architectural Mapping Diagram
```text
  [ Browser URL ]
        |
        +-- /          --> [ Home Page Component ]
        +-- /about     --> [ About Me Component ]
        +-- /contact   --> [ Contact Me Component ]
        +-- (default)  --> [ 404 Error Component ]
```

### Implementation Specification
```tsx
// src/main.tsx
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

### Assignment: Finals_A1 - Personal Website Infrastructure
**Requirement**: Develop a structured personal website utilizing modular component architecture.
- Implement exactly three (3) primary pages: **Home**, **About Me**, and **Contact Me**.
- **Component Assembly**: Each page must be assembled using at least three (3) distinct modular components (e.g., `Header`, `Footer`, `HeroSection`, `BioContent`, `ContactForm`).
- **Navigation**: Create a persistent `Navbar` component that utilizes `NavLink` to implement dynamic "active" CSS styling.
- **Error Handling**: Implement a dedicated **404 Page** for non-existent routes.
- **Git Strategy**: Initialize a local repository named `Finals_Assignment`. Commit all changes to a new branch named `finals_a1` originating from `main` (or `master`).
- **Submission**: Push the `finals_a1` branch to GitHub under the `Finals_Assignment` repository.

---

## Module 3: Centralized State Management (Context API)
### Theoretical Context
Global state management is achieved via the React Context API, providing a mechanism for data distribution that circumvents prop-drilling—the inefficient manual passing of props through multiple intermediate components.

#### The Atmospheric Analogy: Understanding the Context
To conceptualize Context, imagine the application as a multi-story building. 
- **The Provider** is the centralized ventilation system. It "fills the air" with a specific state (e.g., Oxygen/Theme Data).
- **The Atmosphere** is the Context object itself. It exists everywhere within the building (the component tree) once the ventilation is active.
- **The Components** are the occupants of the building. Without Context, an occupant on the 5th floor would need to wait for oxygen to be passed hand-to-hand from the ground floor (Prop-Drilling). With Context, any occupant can simply "breathe" to access the state immediately.

#### Definition: The `useContext` Hook
If the `Provider` is the broadcaster, `useContext` is the **Receiver**. It is a specialized React Hook that allows a component to "tune in" to a specific Context. When a component calls `useContext(ThemeContext)`, it is essentially saying: *"I am consuming the current atmospheric state of the Theme ventilation system."*

#### Component Dependency Diagram
```text
  [ ThemeProvider (Global Atmosphere) ]
         |
    +----+----+----------+
    |         |          |
 [Navbar]  [Hero]     [Footer]
    |         |          |
    +---------+----------+------> (All consume via useContext)
```

### Implementation Specification
```tsx
// src/context/ThemeContext.tsx
import React, { createContext, useState, ReactNode } from "react";

// 1. Define the Atmosphere (Context Object)
type Theme = "light" | "dark" | "ocean" | "forest";
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. Define the Ventilation System (Provider)
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* 3. Distribute the atmosphere to the entire tree */}
      <div className={`theme-${theme} min-h-screen`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
```

### Assignment: Finals_A2 - Dynamic Multi-Theme Context
**Requirement**: Implement a dynamic theme switching system within your personal website.
- **Git Strategy**: Create a new branch named `finals_a2` originating directly from the `finals_a1` branch.
- **Theme Diversity**: Define at least three (3) distinct visual themes (e.g., "Midnight," "Emerald," "Solarized").
- **State Logic**: Utilize `ThemeContext` to manage the active theme globally.
- **Styling Autonomy**: The implementation of CSS classes and color palettes is left to the learner's creative discretion; however, the theme change must be visually evident across all components.
- **Submission**: Push the `finals_a2` branch to the `Finals_Assignment` repository on GitHub.

---

## Module 4: High-Performance Form Interactions
### Theoretical Context
The `react-hook-form` library is employed to facilitate performant, uncontrolled form management. 

#### Efficiency: Uncontrolled Components (`useForm`) vs. Controlled State (`useState`)
In a standard **Controlled Form** utilizing `useState`, every individual keystroke triggers a component-wide re-render as the state is updated. In contrast, `useForm` utilizes **Uncontrolled Components**, where the DOM maintains the input state. React only "collects" the data upon submission or specific validation triggers. This significantly reduces the reconciliation overhead, especially in complex forms.

### Implementation Specification (Contact Data Schema)
```tsx
// src/pages/Contact.tsx
import { useForm, SubmitHandler } from "react-hook-form";

type ContactValues = { sender: string; message: string };

const { register, handleSubmit, formState: { errors } } = useForm<ContactValues>();
```

### Assignment: Finals_A3 - Advanced Form Orchestration
**Requirement**: Develop a "Contact Me" interaction system.
- **Git Strategy**: Create a new branch named `finals_a3` originating directly from the `finals_a2` branch.
- **Form Schema**: Implement a form with `Sender Name` and `Message` fields.
- **UI Interaction**: Upon successful submission, do not use `alert()`. Instead, trigger a **Modal** that displays the `Sender` and `Message` in a decorated/styled manner.
- **Theme Compliance**: Ensure the global theme (from `Finals_A2`) is correctly applied to both the form inputs and the resulting submission modal.
- **Submission**: Push the `finals_a3` branch to the `Finals_Assignment` repository on GitHub.

---

## Phase 2 – Integrated Todo List Case Study (Finals_Q1 & Finals_Q2)

**Goal**: Build a production‑grade Todo Management System in a **dedicated new repository**, applying **all lessons covered so far** (routing, Context API, theming, form handling, etc.) as the culminating activity.

### Repository Layout
- Create a Git repository named `Finals_Q1` for the .NET Core Web API backend.
- Create a Git repository named `Finals_Q2` for the React + Vite Todo app frontend.



### Backend – Finals_Q1 (API)
**Technology**: .NET 6/7 Web API (C#)
**Project name**: `TodoApi`
**Functional specifications**:
- `GET /api/todos` – returns the list of todos.
- `POST /api/todos` – creates a new todo (`{ title:string, completed:boolean }`).
- `PUT /api/todos/{id}` – updates an existing todo.
- `DELETE /api/todos/{id}` – removes a todo.
- Store data in an **in‑memory** `List<Todo>` (no database required).
- Return appropriate HTTP status codes (`200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`).
- Configure **CORS** to allow requests from `http://localhost:5173` (the React dev server).
- Minimal validation: reject empty `title` values.

#### [NEW] Backend Scaffold (Finals_Q1)
```csharp
// Models/Todo.cs
public class Todo {
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public bool Completed { get; set; }
}

// Controllers/TodosController.cs
[ApiController]
[Route("api/[controller]")]
public class TodosController : ControllerBase {
    private static List<Todo> _todos = new();

    [HttpGet] public IActionResult Get() => Ok(_todos);
    [POST] ... [PUT] ... [DELETE] ... // Implement these
}
```

### Front‑end – Finals_Q2 (React Todo App)
**Technology**: Vite + React + TypeScript
**Scaffold**: `npm create vite@latest frontend --template react-ts`
**Core requirements**:
- **React Router** – implement routing with at least two routes: `/` (list) and `/about`.
- **TodoContext** – create a context to abstract CRUD operations against the backend API.
- **useTodos Hook** – provide a custom hook exposing the todo collection and CRUD functions.
- **UI Components** – define components: `TodoList`, `TodoItem`, `AddTodoForm`, `EditTodoModal`.
- **Immutability** – enforce immutable state updates; never mutate the collection directly.
- **Unique ID** – ensure each todo has a unique identifier (GUID or incremental).
- **Navigation** – perform programmatic navigation after successful CRUD actions.
- **Theming** – apply the shared `ThemeContext` from Phase 1 throughout the UI.
- **Technical Debt** – fix the three intentional bugs provided in the Technical Audit.

#### Architecture and Implementation Details

##### 1. Component Hierarchy
```text
  [ App ] (Router & Global Providers)
     |
     +-- [ Layout ] (Persistent Navbar & Theme Wrapper)
            |
            +-- [ TodoPage ] (Route: "/")
            |      |
            |      +-- [ AddTodoForm ] (uses react-hook-form)
            |      +-- [ TodoList ]
            |             |
            |             +-- [ TodoItem ]
            |                    |
            |                    +-- [ EditTodoModal ]
            |
            +-- [ AboutPage ] (Route: "/about")
```

##### 2. Implementation Workflow
1.  **Initialization**: Scaffold the project with Vite and install `react-router-dom`, `react-hook-form`, and `axios` (or use native `fetch`).
2.  **Context Setup**: Implement the `TodoProvider`. It must manage an array of `Todo` objects and provide methods for each CRUD operation that synchronize with the backend.
3.  **Routing**: Configure the `BrowserRouter` in `main.tsx` and define routes in `App.tsx`.
4.  **Component Development**:
    - `AddTodoForm`: Use `useForm` to handle input. On submit, call `addTodo` from context.
    - `TodoList`: Map over the `todos` from context and render `TodoItem`.
    - `TodoItem`: Display title and status. Provide "Toggle", "Delete", and "Edit" buttons.
    - `EditTodoModal`: A controlled component that appears when "Edit" is clicked, allowing title modification.

##### 3. API Synchronization Logic
- **GET**: Call on component mount (via `useEffect` in the Provider or Page).
- **POST/PUT/DELETE**: Perform the API call first. Only update the local React state *after* a successful (2xx) response from the server to ensure data integrity.

#### [NEW] Frontend Scaffold (Finals_Q2)
```tsx
// src/context/TodoContext.tsx
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  // Example: Synchronization with Backend
  const fetchTodos = async () => {
    const res = await fetch("http://localhost:5000/api/todos");
    if (res.ok) setTodos(await res.json());
  };

  const addTodo = async (title: string) => {
    const res = await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false })
    });
    if (res.ok) fetchTodos(); // Re-fetch or update state manually
  };

  return (
    <TodoContext.Provider value={{ todos, fetchTodos, addTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

// src/hooks/useTodos.ts
export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within TodoProvider");
  return context;
};
```

### Deliverables
- Initialize and push to a Git repository named `Finals_Q1` (Backend).
- Initialize and push to a Git repository named `Finals_Q2` (Frontend).
- Each repository must contain a `README.md` with:
  1. Setup and execution instructions (e.g., `dotnet run` or `npm run dev`).
  2. A summary of the architectural patterns used.
  3. Evidence of fixing the technical debt items.

### Assessment Criteria
- Correct implementation of all API endpoints with proper status codes.
- React frontend correctly synchronizes with the API via the `TodoContext`.
- Adherence to immutability and unique ID constraints.
- Resolution of the logical defects provided in the Technical Audit.
- Application of the global theme across all UI surfaces.
- Clear commit history demonstrating the development of `Finals_Q1` and `Finals_Q2`.


### Technical Audit (Finals_Q2 Debt)
Integrate and remediate the following defective logic within your `Finals_Q2` implementation:

```tsx
// 1. Defective filter logic (ID vs Title mismatch)
setTodos(prev => prev.filter(t => t.title !== id));

// 2. Defective update logic (Filter used instead of Map)
const updated = todos.filter(t => t.id === id ? { ...t, ...updates } : t);

// 3. Defective Reconciliation (Index used as key)
{todos.map((t, index) => <li key={index}>{t.title}</li>)}
```

---


## 8. Bonus Challenges (Advanced Tracks)
These challenges are optional and intended to test the upper limits of your architectural planning.

### Challenge A: The "Focus-Flow" Constraint
1.  **High-Pressure (Capacity)**: Max 5 active tasks. Disable "Add" and show warning if reached.
2.  **Sequential Integrity (FIFO)**: Tasks must be completed in order of creation.
3.  **Shadow Archive (Ghosting)**: Completed tasks vanish exactly 15 seconds after being toggled.

### Challenge B: Blockchain-Style Immutability (Full-Stack)
Implement a simplified blockchain ledger across both `Finals_Q1` (Backend) and `Finals_Q2` (Frontend):

**1. Backend Ledger (Finals_Q1)**:
- **Hashing Logic**: Every `POST` request must calculate a SHA-256 for the new Todo using its content and the `PreviousHash` of the latest list item.
- **Persistence**: Store the `Hash` and `PreviousHash` for every item in the `List<Todo>`.
- **Integrity Endpoint**: Add `GET /api/todos/verify`. This endpoint should traverse the entire list, recalculate hashes, and return a `200 OK` (Chain Valid) or `409 Conflict` (Chain Tampered) response.

**2. Frontend Validation (Finals_Q2)**:
- **Chain Verification**: On every render or state change, call the `verify` endpoint or implement a local `verifyChain()` function to detect discrepancies.
- **Visual Alert**: Display a prominent "REDACTED/TEMPERED" banner if the backend or frontend validation fails.
- **Mining Activity**: (Extra Credit) Require a "Proof of Work" (e.g., finding a hash starting with two zeros) on the frontend before the API accepts a `POST` or `PUT`.

---

---

## Conclusion
Completion of Phase 2 (Finals_Q1 & Finals_Q2) demonstrates the ability to design, implement, and integrate an enterprise-grade full‑stack CRUD system using ReactJS and .NET Core.

End of Masterclass.

