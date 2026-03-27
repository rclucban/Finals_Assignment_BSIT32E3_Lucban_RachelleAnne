# TodoApi - Backend (Finals_Q1)

## Setup and Execution
1. Navigate to `Finals_Q1/TodoApi`.
2. Run `dotnet restore`.
3. Run `dotnet run`.
4. The API will be available at `https://localhost:5001` (or the port specified in terminal).

## Architecture
- **In-Memory Store**: Uses a static `List<Todo>` for persistence during the session.
- **Controllers**: `TodosController` handles all CRUD endpoints.
- **Models**: `Todo` model with unique `Guid` identifiers.
- **CORS**: Configured to allow `http://localhost:5173`.
